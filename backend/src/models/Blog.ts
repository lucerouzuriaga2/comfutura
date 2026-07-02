import { Schema, model, Document } from "mongoose";
import { IBlog } from "../types";

export interface IBlogDocument extends IBlog, Document {}

const BlogSchema = new Schema<IBlogDocument>(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "El contenido es obligatorio"],
    },
    author: {
      type: String,
      required: [true, "El autor es obligatorio"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "La imagen del blog es obligatoria"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook para autogenerar el slug basado en el título si es necesario
BlogSchema.pre("validate", function (next) {
  if (this.title && (!this.slug || this.isModified("title"))) {
    this.slug = this.title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Reemplaza espacios con guiones
      .replace(/[^\w\-]+/g, "") // Remueve caracteres no alfanuméricos
      .replace(/\-\-+/g, "-") // Reemplaza múltiples guiones con uno solo
      .replace(/^-+/, "") // Remueve guiones al inicio
      .replace(/-+$/, ""); // Remueve guiones al final
  }
  next();
});

export const Blog = model<IBlogDocument>("Blog", BlogSchema);
export default Blog;
