import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

interface JwtPayload {
  id: string;
  email: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  // Verificar si el token viene en las cabeceras de autorización
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Acceso denegado. No se proporcionó un token de autenticación.",
    });
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "comfutura_dev_secret_key_987654321_abc";
    
    // Verificar firma del token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Obtener administrador asociado al token
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Acceso no autorizado. El administrador no existe.",
      });
      return;
    }

    // Adjuntar la información del admin a la petición
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Sesión inválida o expirada. Por favor inicie sesión nuevamente.",
    });
  }
};
