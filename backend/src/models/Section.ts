import { Schema, model, Document } from "mongoose";
import { ISection } from "../types";

export interface ISectionDocument extends ISection, Document {}

const SectionSchema = new Schema<ISectionDocument>(
  {
    key: {
      type: String,
      required: [true, "La clave de la sección es obligatoria"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "El título de la sección es obligatorio"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "El contenido de la sección es obligatorio"],
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Section = model<ISectionDocument>("Section", SectionSchema);
export default Section;
