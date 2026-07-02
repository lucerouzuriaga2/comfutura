import { Request, Response } from "express";
import Project from "../models/Project";

// @desc    Obtener todos los proyectos
// @route   GET /api/v1/projects
// @access  Público
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los proyectos.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Obtener un proyecto por su ID
// @route   GET /api/v1/projects/:id
// @access  Público
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: `No se encontró ningún proyecto con el ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el proyecto.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Crear un nuevo proyecto
// @route   POST /api/v1/projects
// @access  Privado (Admin)
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, client, category, technologies } = req.body;

    // Verificar si se subió la imagen del proyecto
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Por favor, proporcione una imagen representativa para el proyecto.",
      });
      return;
    }

    const imagePath = req.file.path; // URL de Cloudinary devuelta por el cargador

    // Procesar tecnologías si se envían como string o array
    const techsArray = technologies
      ? (Array.isArray(technologies) ? technologies : technologies.split(",").map((t: string) => t.trim()))
      : [];

    const newProject = await Project.create({
      title,
      description,
      client,
      image: imagePath,
      category,
      technologies: techsArray,
    });

    res.status(201).json({
      success: true,
      message: "Proyecto creado exitosamente en el portafolio.",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el proyecto.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Actualizar un proyecto existente
// @route   PUT /api/v1/projects/:id
// @access  Privado (Admin)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    let project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "No se encontró el proyecto solicitado para actualización.",
      });
      return;
    }

    const updateData = { ...req.body };

    // Si se subió una nueva imagen, reemplazar la anterior en el objeto de datos
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Procesar tecnologías si se envían como string o array
    if (updateData.technologies && typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies.split(",").map((t: string) => t.trim());
    }

    project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Proyecto actualizado con éxito.",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el proyecto.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Eliminar un proyecto del portafolio
// @route   DELETE /api/v1/projects/:id
// @access  Privado (Admin)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "No se encontró el proyecto solicitado para eliminación.",
      });
      return;
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Proyecto eliminado exitosamente del portafolio de ComFutura.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el proyecto.",
      error: error instanceof Error ? error.message : error,
    });
  }
};
