import { Schema, model, Document } from "mongoose";
import { IProject } from "../types";

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: {
      type: String,
      required: [true, "El título del proyecto es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción del proyecto es obligatoria"],
    },
    client: {
      type: String,
      required: [true, "El nombre del cliente es obligatorio"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "La imagen del proyecto es obligatoria"],
    },
    category: {
      type: String,
      required: [true, "La categoría del proyecto es obligatoria"],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, "Debe especificar al menos una tecnología"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = model<IProjectDocument>("Project", ProjectSchema);
export default Project;
