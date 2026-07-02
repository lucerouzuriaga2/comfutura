import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

// Cargar .env de forma robusta con ruta absoluta
dotenv.config({ path: path.resolve(__dirname, "../../.env"), override: true });

// Configurar servidores DNS públicos para garantizar la resolución de registros SRV de MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("⚠️ Advertencia: No se pudieron configurar los servidores DNS públicos:", dnsErr);
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/comfutura";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`📡 MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};
