import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IAdmin } from "../types";

export interface IAdminDocument extends IAdmin, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdminDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor, introduce un correo válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook para encriptar la contraseña si ha sido modificada
AdminSchema.pre("save", async function (next) {
  const admin = this as IAdminDocument;

  if (!admin.isModified("password") || !admin.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = (await bcrypt.hash(admin.password, salt)) as string;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para verificar contraseñas
AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const Admin = model<IAdminDocument>("Admin", AdminSchema);
export default Admin;
