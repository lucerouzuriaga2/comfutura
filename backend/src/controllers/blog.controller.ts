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
