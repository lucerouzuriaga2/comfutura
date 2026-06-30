export interface SubService {
  title: string;
  features: string[];
  image?: string;
  icon?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image?: string;
  subServices?: SubService[];
  features: string[];
  basePrice: number;
  unitPrice: number;
  unitLabel: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Minería" | "Urbano" | "Rural" | "Corporativo" | "Infraestructura" | "Telefonía" | "Construcción";
  location: string;
  status: "COMPLETADO" | "EN PROGRESO" | "MANTENIMIENTO";
  year: string;
  scopeOfWork: string[];
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Tiempo Completo" | "Contratista" | "Híbrido";
  requirements: string[];
  description: string;
  salaryRange?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  priority: "Baja" | "Media" | "Alta" | "Crítica";
  category: "Conectividad" | "Fibra Óptica" | "Equipamiento" | "Facturación" | "Otros";
  status: "ABIERTO" | "EN PROCESO" | "RESUELTO";
  date: string;
  messages: {
    sender: "Cliente" | "Soporte Comfutura";
    text: string;
    timestamp: string;
  }[];
}

export interface TelemetryData {
  timestamp: string;
  latencyMs: number;
  bandwidthMbps: number;
  packetLossPercent: number;
  activeNodes: number;
}
