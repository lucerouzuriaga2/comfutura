import app from "./app";
import { connectDB } from "./config/db";
import { seedInitialAdmin } from "./controllers/auth.controller";
import { seedInitialBlogs } from "./controllers/blog.controller";

// Recargar servidor con nuevas variables .env
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // 1. Conectar a la base de datos
  await connectDB();

  // 2. Sembrar el administrador inicial en la BD (si es una instalación nueva)
  await seedInitialAdmin();

  // 3. Sembrar los artículos de blog iniciales (si no hay ninguno)
  await seedInitialBlogs();

  // 4. Iniciar escucha del servidor Express
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en modo [${process.env.NODE_ENV || "development"}] en el puerto ${PORT}`);
    console.log(`👉 http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("❌ Fallo catastrófico al iniciar el servidor:", error);
  process.exit(1);
});
