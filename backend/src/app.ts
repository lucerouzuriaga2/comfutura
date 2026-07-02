import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Cargar .env de forma robusta con ruta absoluta
dotenv.config({ path: path.resolve(__dirname, "../.env"), override: true });

// Importar Rutas
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import projectRoutes from "./routes/project.routes";
import sectionRoutes from "./routes/section.routes";

const app: Application = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de prueba de salud
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Servidor de ComFutura S.A.C. operando normalmente. 🚀",
    timestamp: new Date(),
  });
});

// Vincular Rutas de la API (Prefijo v1)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/sections", sectionRoutes);

// Middleware para manejo de rutas no encontradas (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "El recurso solicitado no existe en este servidor.",
  });
});

// Middleware global de control de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error no controlado detectado:", err);
  res.status(500).json({
    success: false,
    message: "Ha ocurrido un error interno en el servidor.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
