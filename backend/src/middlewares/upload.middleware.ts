import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Configurar el almacenamiento de Cloudinary para Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "comfutura",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      // Limpiar el nombre original del archivo para usarlo como public_id seguro
      public_id: `${Date.now()}-${file.originalname
        .replace(/\.[^/.]+$/, "") // Remover extensión
        .replace(/[^a-zA-Z0-9]/g, "_")}`, // Reemplazar caracteres especiales con guion bajo
    };
  },
});

// Inicializar el middleware Multer con límites seguros
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Máximo 5MB
  },
  fileFilter: (req, file, cb) => {
    // Validar tipo mimetypes permitidos
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no válido. Solo se permiten JPG, JPEG, PNG y WEBP."));
    }
  },
});

export default upload;
