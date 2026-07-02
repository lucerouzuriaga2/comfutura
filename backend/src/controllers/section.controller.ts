import { Request, Response } from "express";
import Section from "../models/Section";

// @desc    Obtener todas las secciones dinámicas
// @route   GET /api/v1/sections
// @access  Público
export const getAllSections = async (req: Request, res: Response): Promise<void> => {
  try {
    const sections = await Section.find();
    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las secciones.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Obtener una sección específica por su clave única
// @route   GET /api/v1/sections/:key
// @access  Público
export const getSectionByKey = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;

  try {
    const section = await Section.findOne({ key: key.toLowerCase() });

    if (!section) {
      res.status(404).json({
        success: false,
        message: `No se encontró ninguna sección con la clave: ${key}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener la sección dinámica.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Crear o actualizar (Upsert) una sección por su clave única
// @route   POST /api/v1/sections/:key
// @access  Privado (Admin)
export const upsertSection = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;
  const { title, content, metadata } = req.body;

  try {
    if (!title || !content) {
      res.status(400).json({
        success: false,
        message: "Por favor, proporcione un título y contenido para la sección.",
      });
      return;
    }

    // Buscar y actualizar, o crear (upsert) si no existe
    const section = await Section.findOneAndUpdate(
      { key: key.toLowerCase() },
      {
        title,
        content,
        metadata: metadata || {},
      },
      {
        new: true, // Retornar el documento actualizado
        upsert: true, // Crear si no existe
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sección dinámica guardada correctamente.",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al guardar la sección dinámica.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Eliminar una sección dinámica
// @route   DELETE /api/v1/sections/:key
// @access  Privado (Admin)
export const deleteSection = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;

  try {
    const section = await Section.findOne({ key: key.toLowerCase() });

    if (!section) {
      res.status(404).json({
        success: false,
        message: `No se encontró la sección: ${key} para eliminar.`,
      });
      return;
    }

    await section.deleteOne();

    res.status(200).json({
      success: true,
      message: `Sección dinámica '${key}' eliminada con éxito de la base de datos.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar la sección dinámica.",
      error: error instanceof Error ? error.message : error,
    });
  }
};
