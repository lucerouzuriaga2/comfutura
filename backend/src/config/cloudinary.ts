import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

// Cargar .env de forma robusta con ruta absoluta
dotenv.config({ path: path.resolve(__dirname, "../../.env"), override: true });

// Configurar el SDK de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("☁️ Cloudinary SDK Configurado");

export default cloudinary;
