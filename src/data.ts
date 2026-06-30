import { Service, Project, JobListing } from "./types";

export const SERVICES: Service[] = [
  {
    id: "telecom-equip",
    title: "Implementación de Equipos de Telecomunicaciones",
    description: "Instalación y configuración de equipos activos y pasivos para redes de telecomunicaciones, garantizando operatividad y cumplimiento de estándares internacionales.",
    iconName: "Server",
    features: [
      "Configuración de routers y switches",
      "Integración de sistemas de energía",
      "Comisionamiento y pruebas",
      "Documentación técnica as-built"
    ],
    basePrice: 5000,
    unitPrice: 1200,
    unitLabel: "Equipos",
    image: "/telecom_equip_service.png"
  },
  {
    id: "mw-links",
    title: "Instalación de Enlaces MW",
    description: "Diseño, suministro e instalación de radioenlaces de microondas para transmisión de datos de alta capacidad con línea de vista.",
    iconName: "Radio",
    features: [
      "Estudios de línea de vista (LOS)",
      "Alineamiento de antenas",
      "Pruebas de BER y latencia",
      "Gestión de frecuencias"
    ],
    basePrice: 8000,
    unitPrice: 3500,
    unitLabel: "Enlaces",
    image: "/mw_link_service.png"
  },
  {
    id: "fiber-optic",
    title: "Instalación de Fibra Óptica",
    description: "Tendido, fusión y certificación de redes de fibra óptica aéreas y subterráneas, para backbone y última milla.",
    iconName: "Cable",
    features: [
      "Canalización subterránea y aérea",
      "Empalmes por fusión",
      "Certificación con OTDR",
      "Mantenimiento preventivo"
    ],
    basePrice: 2500,
    unitPrice: 450,
    unitLabel: "Kilómetros",
    image: "/fiber_optic_service.png"
  },
  {
    id: "structured-cabling",
    title: "Instalación de Cableado Estructurado",
    description: "Diseño e implementación de sistemas de cableado estructurado Categoría 6, 6A y 7 para edificios corporativos y centros de datos.",
    iconName: "Cpu",
    features: [
      "Diseño de topología de red",
      "Instalación de gabinetes y racks",
      "Certificación de puntos de red",
      "Ordenamiento y peinado de cables"
    ],
    basePrice: 1500,
    unitPrice: 65,
    unitLabel: "Puntos",
    image: "/structured_cabling_service.png"
  },
  {
    id: "civil-works",
    title: "Obras Civiles",
    description: "Ejecución de obras civiles menores y mayores para infraestructura de telecomunicaciones, incluyendo fundaciones y zanjas.",
    iconName: "Server",
    features: [
      "Construcción de bases de concreto",
      "Apertura y cierre de zanjas",
      "Mantenimiento de vías de acceso",
      "Adecuación de sitios"
    ],
    basePrice: 4000,
    unitPrice: 800,
    unitLabel: "Metros cuadrados",
    image: "/civil_works_service.png"
  },
  {
    id: "electrical-works",
    title: "Obras Eléctricas",
    description: "Instalaciones eléctricas industriales, tableros de control y sistemas de puesta a tierra para sitios de telecomunicaciones.",
    iconName: "Cpu",
    features: [
      "Sistemas de puesta a tierra (SPAT)",
      "Instalación de pararrayos",
      "Tableros de transferencia",
      "Certificación eléctrica"
    ],
    basePrice: 3000,
    unitPrice: 500,
    unitLabel: "Puntos",
    image: "/electrical_works_service.png"
  },
  {
    id: "general-services",
    title: "Servicios Generales",
    description: "Mantenimiento integral de instalaciones, climatización, seguridad y limpieza de sitios críticos y corporativos.",
    iconName: "CheckCircle2",
    features: [
      "Mantenimiento de aires acondicionados",
      "Control de plagas y limpieza",
      "Sistemas de videovigilancia",
      "Gestión de accesos"
    ],
    basePrice: 1000,
    unitPrice: 200,
    unitLabel: "Meses",
    image: "/general_services_maintenance.png"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "fibra-interoceanica",
    title: "Anillo de Fibra Óptica Interoceánica Sur",
    description: "Despliegue de más de 350 km de fibra óptica monomodo conectando centros de control minero a través de la Cordillera de los Andes, soportando duras condiciones climáticas.",
    image: "/fibra_andes.png",
    category: "Minería",
    location: "Arequipa - Puno, Perú",
    status: "COMPLETADO",
    year: "2025",
    scopeOfWork: [
      "Ingeniería de detalle y permisos gubernamentales",
      "Soplado de fibra óptica en ducto PEAD",
      "Empalmes por fusión y pruebas de reflectometría (OTDR)",
      "Instalación de shelters con energía solar híbrida"
    ]
  },
  {
    id: "red-inalambrica-toromocho",
    title: "Red LTE Privada y Telemetría - Chinalco Toromocho",
    description: "Implementación de cobertura LTE de misión crítica para camiones autónomos y sensores IoT en una de las minas a tajo abierto más altas del mundo a 4,800 msnm.",
    image: "/toromocho_lte.png",
    category: "Minería",
    location: "Junín, Perú",
    status: "COMPLETADO",
    year: "2024",
    scopeOfWork: [
      "Instalación de 4 estaciones base LTE robustecidas",
      "Integración con el sistema de despacho autónomo de la mina",
      "Sensores IoT para monitoreo de fatiga y telemetría de neumáticos",
      "SLA de soporte de campo 24/7/365 con ingenieros residentes"
    ]
  },
  {
    id: "troncal-lima-este",
    title: "Red Troncal Metropolitana y Anillo Redundante Lima-Este",
    description: "Ampliación del anillo de fibra óptica metropolitano para proveer conectividad redundante a importantes parques industriales y distritos logísticos.",
    image: "/lima_troncal.png",
    category: "Urbano",
    location: "Lima Metropolitana, Perú",
    status: "MANTENIMIENTO",
    year: "2025",
    scopeOfWork: [
      "Canalización subterránea mediante micro-zanja",
      "Tendido de cable de fibra óptica de 288 hilos",
      "Configuración de equipos activos DWDM de última generación",
      "Pruebas de atenuación y estabilidad a largo plazo"
    ]
  },
  {
    id: "satelital-amazonas",
    title: "Conectividad Satelital y Radioenlace Microondas Alto Amazonas",
    description: "Proyecto de inclusión digital y conectividad para comunidades aisladas y campamentos de exploración biológica mediante radioenlaces IP combinados con terminales satelitales LEO.",
    image: "/amazonas_satelital.png",
    category: "Rural",
    location: "Loreto, Perú",
    status: "EN PROGRESO",
    year: "2026",
    scopeOfWork: [
      "Instalación de terminales satelitales Starlink Business / OneWeb",
      "Despliegue de mástiles telescópicos de microondas de baja potencia",
      "Sistemas de energía solar autónomos con baterías de Litio",
      "Habilitación de hotspots comunitarios con portal cautivo"
    ]
  }
];

export const JOBS: JobListing[] = [
  {
    id: "ing-telecom",
    title: "Ingeniero Residente de Telecomunicaciones (ISO 9001)",
    department: "Operaciones y Proyectos",
    location: "Arequipa (Régimen Minero)",
    type: "Tiempo Completo",
    requirements: [
      "Ingeniero Electrónico o de Telecomunicaciones colegiado y habilitado",
      "Mínimo 4 años de experiencia en supervisión de proyectos de fibra óptica y redes de microondas",
      "Certificaciones vigentes en Cisco CCNA o similar, y conocimiento de la norma ISO 9001:2015",
      "Capacidad para trabajar bajo régimen minero 14x7 en gran altitud"
    ],
    description: "Buscamos un Ingeniero Residente para liderar la operación del sistema de comunicaciones de nuestro cliente minero líder. Garantizará el cumplimiento del SLA y la mejora continua de procesos según estándares de calidad corporativos."
  },
  {
    id: "tec-fibra",
    title: "Técnico Especialista en Fusión y Empalme de Fibra Óptica",
    department: "Fuerza de Campo",
    location: "Lima (Con viajes a provincias)",
    type: "Contratista",
    requirements: [
      "Educación técnica completa en Electrónica, Redes o carreras afines",
      "Experiencia comprobada en empalmes por fusión con alineación por núcleo",
      "Manejo avanzado de OTDR (Exfo, Viavi) e interpretación de trazas de atenuación",
      "Licencia de conducir vigente (Indispensable A-I o superior)"
    ],
    description: "Serás responsable de la ejecución técnica en campo para tendidos de fibra óptica aéreos y canalizados, fusiones en cajas de empalme, y certificación de enlaces para nuestros clientes más exigentes."
  },
  {
    id: "sup-ehs",
    title: "Supervisor de Seguridad, Salud y Medio Ambiente (EHS)",
    department: "Seguridad y Calidad",
    location: "Nacional (Multisede)",
    type: "Tiempo Completo",
    requirements: [
      "Profesional titulado en Ingeniería de Seguridad, Minas o afines",
      "Especialización en Seguridad y Salud Ocupacional (mínimo 120 horas)",
      "Experiencia supervisando trabajos de alto riesgo en altura y electricidad",
      "Conocimiento sólido de la normativa peruana de SST Ley 29783"
    ],
    description: "Asegurar el cumplimiento estricto de las políticas de prevención de accidentes en nuestros frentes de trabajo de tendido de cables en postes e instalación de torres de telecomunicaciones a nivel nacional."
  }
];
