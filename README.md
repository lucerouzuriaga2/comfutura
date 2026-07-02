# ComFutura S.A.C. — Portal Corporativo y Plataforma de Servicios

¡Bienvenido al repositorio central de **ComFutura S.A.C.**! 📡✨

ComFutura S.A.C. es una empresa líder en ingeniería y servicios de telecomunicaciones en Perú. Esta plataforma web interactiva y moderna actúa como portal corporativo, calculadora de cotizaciones, portafolio de proyectos y panel de gestión (Portal de Clientes/Proveedores).

---

## 📁 Estructura del Repositorio

El proyecto está organizado en una arquitectura multiproyecto (monorepo simplificado):

```text
comfutura/
├── backend/            # API & Backend Services (Preparado para Node.js, Express y Mongoose)
│   └── README.md       # Documentación de backend
└── frontend/           # Aplicación Web Frontend (SPA)
    ├── public/         # Recursos públicos, imágenes y assets corporativos
    ├── src/            # Código fuente en React + TypeScript
    │   ├── components/ # Componentes interactivos modulares
    │   ├── App.tsx     # Enrutamiento y estructura principal
    │   ├── data.ts     # Base de conocimiento y base de datos estática
    │   ├── types.ts    # Definiciones de interfaces TypeScript
    │   └── main.tsx    # Punto de entrada de React
    ├── package.json    # Dependencias y scripts de construcción
    ├── tsconfig.json   # Configuración de TypeScript
    └── vite.config.ts  # Configuración del empaquetador Vite
```

---

## 🌟 Características Clave

La plataforma está diseñada con una experiencia de usuario (UX) fluida, animaciones sutiles y diseño totalmente responsivo (móvil y escritorio):

1. **Página de Inicio Dinámica (`/`)**:
   - **Hero Section**: Introducción impactante con llamados a la acción (CTA) directos.
   - **Carrusel de Clientes**: Logotipos de socios estratégicos y marcas con las que trabaja la empresa.
   - **Estadísticas (Stats)**: Métricas clave del negocio que demuestran la trayectoria de ComFutura.
   - **Nosotros Preview**: Breve reseña histórica y valores corporativos.
   - **Servicios Principales**: Resumen visual de los servicios técnicos ofrecidos.
   - **Home Calculator**: ¡Calculadora inteligente de presupuestos! Permite a prospectos estimar costos de tendido de fibra óptica, enlaces MW y soporte técnico en tiempo real.
   - **Formulario de Contacto**: Formulario interactivo integrado para consultas directas.

2. **Nosotros (`/nosotros`)**:
   - Información exhaustiva sobre la misión, visión, historia y equipo humano técnico de ComFutura S.A.C.

3. **Servicios y Detalle Técnico (`/servicios` & `/servicios/:id`)**:
   - Catálogo técnico interactivo que detalla:
     - **Implementación de Equipos de Telecomunicaciones:** Nodos Nokia/Huawei, montaje de racks, antenas 2G/3G/4G, etc.
     - **Instalación de Enlaces MW (Microondas):** Radioenlaces, estudios de línea de vista (LOS) y comisionamiento.
     - **Instalación de Fibra Óptica:** Fusión de fibra, certificación OTDR, tendido aéreo y subterráneo.
     - **Obras Civiles y Eléctricas:** Infraestructura de soporte, pozos de tierra, sistemas de respaldo energético.
     - **Servicios Generales y Mantenimiento NOC:** Monitoreo 24/7 y asistencia técnica ante emergencias.

4. **Portafolio de Proyectos (`/proyectos`)**:
   - Galería interactiva de proyectos exitosamente ejecutados (e.g., Toromocho LTE, Fibra Andes, Amazonas Satelital, Lima Troncal, etc.) con filtros por tipo de servicio.

5. **Portal de Clientes y Proveedores (`/portal`)**:
   - Panel simulado con login seguro, visualización de KPIs del servicio (NOC / ANS), gestor de documentos descargables, estado de facturas y reportes de incidentes activos.

6. **Bolsa de Trabajo (`/careers`)**:
   - Buscador y filtrador de vacantes disponibles para ingenieros, técnicos de campo y personal de soporte. Incluye simulación interactiva de postulación con carga de CV.

7. **Blog de Innovación (`/blog`)**:
   - Artículos tecnológicos sobre tendencias de telecomunicaciones en el Perú (5G Rural, IoT en la agricultura, aseguramiento de la calidad ISO 9001).

8. **Chatbot "Comfu" (`ComfuChat`)**:
   - Asistente flotante automatizado de IA / base de conocimientos que ayuda a los usuarios a navegar por la web, solicitar soporte, cotizar o enviar su CV de manera inmediata.

---

## 🛠️ Tecnologías del Frontend

La aplicación web ha sido construida utilizando herramientas modernas de desarrollo frontend para garantizar un rendimiento óptimo y escalabilidad:

- **React 19** – Librería para interfaces de usuario declarativas y reactivas.
- **Vite 6** – Empaquetador y entorno de desarrollo ultra-rápido.
- **TypeScript 5** – Tipado estático para asegurar la robustez del código.
- **Tailwind CSS v4** – Framework de estilos utilitarios integrado con el plugin `@tailwindcss/vite` para estilos sumamente modernos y flexibles.
- **Framer Motion (`motion/react`)** – Biblioteca de animaciones de alto rendimiento para transiciones fluidas de páginas y elementos.
- **Lucide React** – Conjunto de iconos vectoriales limpios y coherentes.
- **React Router DOM 7** – Manejo fluido del enrutamiento del lado del cliente.

---

## 🚦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu máquina local:
- **Node.js** (Versión 18.x o superior recomendada)
- **npm** (Viene integrado con Node.js) o **yarn**

---

## 🚀 Instalación y Uso Local

Sigue estos pasos sencillos para clonar y ejecutar el entorno de desarrollo local:

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd comfutura
```

### 2. Configurar el Frontend
Navega a la carpeta del frontend e instala las dependencias necesarias:
```bash
cd frontend
npm install
```

### 3. Ejecutar en Modo Desarrollo
Inicia el servidor local de Vite:
```bash
npm run dev
```
La aplicación estará disponible para previsualizar en tu navegador en:
👉 **`http://localhost:3000`**

### 4. Compilar para Producción
Para generar los archivos estáticos optimizados listos para desplegar:
```bash
npm run build
```
La salida se compilará en la carpeta `frontend/dist/`.

---

## ⚙️ Scripts Disponibles en Frontend

En la carpeta `frontend/`, puedes ejecutar los siguientes scripts mediante npm:

- `npm run dev`: Levanta el servidor de desarrollo local en `http://localhost:3000`.
- `npm run build`: Compila y empaqueta la aplicación para producción en la carpeta `/dist`.
- `npm run preview`: Previsualiza localmente la compilación de producción.
- `npm run clean`: Limpia la carpeta de distribución (`dist/`) y limpia el servidor compilado si lo hubiera.
- `npm run lint`: Ejecuta el verificador de tipos de TypeScript (`tsc --noEmit`).

---

## 🎨 Herramientas Adicionales: Cambiador de Temas

El proyecto incluye scripts automatizados en la raíz de `frontend/` para facilitar la migración y cambio de clases visuales en masa:
- **`theme_changer.py`** (Script en Python)
- **`theme_changer.cjs`** (Script en Node.js CommonJS)

Estos scripts buscan automáticamente clases CSS oscuras en los componentes de React (`src/components/About.tsx`, `Services.tsx`, `Projects.tsx`, etc.) y las reemplazan por esquemas de temas claros equivalentes basados en Tailwind, facilitando el cambio de estilo de forma global en segundos.

---

## 🔒 Licencia y Créditos

Este portal ha sido desarrollado para fines institucionales de **ComFutura S.A.C.** Todos los derechos sobre los assets visuales, logotipos y nombres de proyectos pertenecen a sus respectivos dueños y a ComFutura S.A.C.
