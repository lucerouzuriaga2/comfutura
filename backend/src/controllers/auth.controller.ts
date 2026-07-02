import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

// Generar Token JWT
const generateToken = (id: string, email: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET || "comfutura_dev_secret_key_987654321_abc";
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
  
  return jwt.sign({ id, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
};

// @desc    Iniciar sesión de Administrador
// @route   POST /api/v1/auth/login
// @access  Público
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validar entrada
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Por favor, proporcione un correo electrónico y contraseña.",
      });
      return;
    }

    // Buscar administrador por correo
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Credenciales incorrectas.",
      });
      return;
    }

    // Comparar contraseñas
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Credenciales incorrectas.",
      });
      return;
    }

    // Generar token
    const token = generateToken(admin._id.toString(), admin.email);

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor al iniciar sesión.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Obtener perfil del administrador autenticado
// @route   GET /api/v1/auth/me
// @access  Privado
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({
        success: false,
        message: "No autorizado.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener el perfil.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Registrar un nuevo Administrador
// @route   POST /api/v1/auth/register
// @access  Privado (Solo administradores existentes pueden registrar otros)
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Validar si el email ya existe
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400).json({
        success: false,
        message: "El correo electrónico ya está registrado.",
      });
      return;
    }

    // Crear nuevo admin
    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Administrador registrado exitosamente.",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor al registrar administrador.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// @desc    Sembrar administrador inicial (si no hay ninguno)
// Autoseeder interno para el arranque seguro
export const seedInitialAdmin = async (): Promise<void> => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.INITIAL_ADMIN_EMAIL || "admin@comfutura.com";
      const password = process.env.INITIAL_ADMIN_PASSWORD || "AdminComFutura2026!";
      
      await Admin.create({
        name: "Administrador ComFutura",
        email,
        password,
      });
      console.log(`🚀 Administrador Inicial creado exitosamente (${email})`);
    } else {
      console.log("ℹ️ Base de datos ya cuenta con administradores registrados.");
    }
  } catch (error) {
    console.error("❌ Error al autosembrar el administrador inicial:", error);
  }
};
