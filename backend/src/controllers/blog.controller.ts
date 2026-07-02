import { Request, Response } from "express";
import Blog from "../models/Blog";

// @desc    Obtener todos los artículos de blog
// @route   GET /api/v1/blogs
// @access  Público
export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los artículos de blog.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Obtener un artículo por su slug
// @route   GET /api/v1/blogs/:slug
// @access  Público
export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: `No se encontró ningún artículo con el slug: ${slug}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el artículo de blog.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Crear un artículo de blog
// @route   POST /api/v1/blogs
// @access  Privado (Admin)
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author, tags } = req.body;

    // Verificar si se subió un archivo de imagen a través del middleware de Cloudinary/Multer
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Por favor, suba una imagen de portada para el blog.",
      });
      return;
    }

    const imagePath = req.file.path; // URL de Cloudinary devuelta por el cargador

    // El slug se autogenerará con el hook 'validate' definido en el modelo
    const newBlog = await Blog.create({
      title,
      content,
      author,
      image: imagePath,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim())) : [],
    });

    res.status(201).json({
      success: true,
      message: "Artículo de blog creado con éxito.",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el artículo de blog.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Actualizar un artículo de blog
// @route   PUT /api/v1/blogs/:id
// @access  Privado (Admin)
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    let blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "No se encontró el artículo de blog solicitado.",
      });
      return;
    }

    const updateData = { ...req.body };

    // Si se subió una nueva imagen, reemplazar la anterior en el objeto de datos
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Procesar tags si se envían como string o array
    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t: string) => t.trim());
    }

    // Actualizar documento de blog (los hooks de validación se ejecutarán de nuevo)
    blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Artículo de blog actualizado correctamente.",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el artículo de blog.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Eliminar un artículo de blog
// @route   DELETE /api/v1/blogs/:id
// @access  Privado (Admin)
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "No se encontró el artículo de blog solicitado para eliminación.",
      });
      return;
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Artículo de blog eliminado exitosamente de la base de datos.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el artículo de blog.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Sembrar artículos de blog iniciales (si no hay ninguno)
export const seedInitialBlogs = async (): Promise<void> => {
  try {
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const initialBlogs = [
        {
          title: "Desafíos del despliegue 5G en zonas rurales",
          content: `El despliegue de redes móviles de quinta generación (5G) en entornos rurales de la accidentada geografía peruana plantea retos significativos que van más allá del suministro de espectro radioeléctrico. 

La topografía andina exige el despliegue de radioenlaces microondas IP de alta capacidad combinados con topologías de red en anillo redundantes para mitigar el impacto de posibles averías físicas en el cableado de fibra de transporte. 

Adicionalmente, el suministro de energía representa un obstáculo primordial en zonas aisladas sin conexión a la red de distribución comercial. Comfutura responde a este desafío mediante el diseño e instalación de estaciones base híbridas autosuficientes, alimentadas mediante paneles solares de alta eficiencia de última generación combinados con bancos de almacenamiento con baterías de Litio de larga duración. Esta metodología no solo reduce la huella de carbono, sino que garantiza un SLA operativo ininterrumpido del 99.9% incluso en condiciones invernales severas.`,
          author: "Ing. Carlos Mendoza",
          image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800",
          tags: ["Infraestructura", "5G", "Telecomunicaciones"],
        },
        {
          title: "IoT y Telemetría en la gestión hídrica",
          content: `La gestión y preservación del recurso hídrico en la gran minería es una prioridad corporativa e institucional de primer orden. Los sistemas modernos de telemetría IoT industrial permiten la recopilación de datos de caudal, presión, turbidez y pH en tiempo real en cuencas de captación a altitudes extremas.

A través de la integración de gateways de comunicación LoRaWAN de largo alcance de ultra-bajo consumo con terminales de transmisión por satélite de órbita baja (LEO), Comfutura ha implementado sistemas automatizados capaces de transmitir telemetría sin interrupción directo a consolas centralizadas SCADA de control operacional.

Esto permite a las compañías mineras predecir anomalías hídricas de inmediato, optimizar el reciclaje de agua industrial y auditar el estricto cumplimiento ambiental de manera transparente y eficiente bajo estándares de calidad gubernamentales.`,
          author: "Ing. Milagros Cáceres",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
          tags: ["Telemetría", "IoT", "Minería"],
        },
        {
          title: "Nuestra renovación de certificación ISO 9001",
          content: `Nos enorgullece anunciar que Comunicación Futura S.A.C. ha renovado satisfactoriamente su certificación de Calidad ISO 9001:2015 para todas nuestras divisiones operativas de Ingeniería de Detalle, Tendido de Fibra Óptica, Construcción de Estaciones Base de Telecomunicaciones y Mantenimiento de Campo.

La auditoría, ejecutada por un organismo de certificación internacional independiente, validó la robustez de nuestros protocolos de control de calidad operacional, la capacitación técnica permanente de nuestras cuadrillas y la alta satisfacción de nuestro portafolio de clientes del sector minero e industrial.

Esta renovación no es solo un sello formal, sino el reflejo diario de nuestro compromiso inquebrantable de entregar infraestructura de alto rendimiento libre de fallas, donde la precisión matemática rige cada uno de nuestros procesos.`,
          author: "Dra. Sofía Valdivia",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
          tags: ["Institucional", "Calidad", "ISO 9001"],
        }
      ];

      await Blog.create(initialBlogs);
      console.log("🚀 Artículos de blog iniciales creados exitosamente en MongoDB Atlas.");
    } else {
      console.log("ℹ️ La colección de blogs ya cuenta con artículos registrados.");
    }
  } catch (error) {
    console.error("❌ Error al autosembrar los artículos de blog iniciales:", error);
  }
};
