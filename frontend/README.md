# Frontend de ComFutura S.A.C.

Este directorio contiene la aplicación web del lado del cliente (Single-Page Application) para el portal corporativo de **ComFutura S.A.C.**

---

## 🛠️ Stack Tecnológico
La aplicación está desarrollada con un stack moderno y eficiente:
- **React 19** – Librería para interfaces de usuario declarativas.
- **Vite 6** – Herramienta de construcción y servidor de desarrollo ultra-veloz.
- **TypeScript 5** – Tipado seguro y robustez.
- **Tailwind CSS v4** – Framework CSS utilitario integrado de forma nativa a Vite mediante `@tailwindcss/vite`.
- **Framer Motion (`motion/react`)** – Animaciones y transiciones de alto rendimiento.
- **Lucide React** – Set completo de iconos consistentes de tipo SVG.
- **React Router DOM 7** – Enrutamiento declarativo del lado del cliente.

---

## 📁 Estructura del Código Fuente (`src/`)

- **`main.tsx`**: Punto de entrada de la aplicación que renderiza el componente raíz de React.
- **`App.tsx`**: Enrutador principal (`Routes`), animaciones de transición global de páginas (`AnimatePresence`), barra de navegación, pie de página y chatbot flotante.
- **`types.ts`**: Definición de interfaces TypeScript compartidas en la aplicación (Servicios, Proyectos, Trabajos, etc.).
- **`data.ts`**: Almacén estático de datos corporativos (información detallada de servicios, proyectos exitosos, ofertas de empleo, etc.).
- **`index.css`**: Configuración e importación de la tipografía "Inter" y directivas de Tailwind CSS.
- **`components/`**: Módulos interactivos que integran la interfaz:
  - `Hero.tsx`: Pantalla de bienvenida interactiva con videos o imágenes de fondo.
  - `Navbar.tsx` & `Footer.tsx`: Encabezado y pie de página institucionales con enlaces dinámicos.
  - `Stats.tsx`: Cifras y métricas de impacto de ComFutura S.A.C.
  - `Clients.tsx`: Logotipos de clientes de prestigio en carrusel.
  - `HomeAbout.tsx`: Introducción a la historia y trayectoria empresarial de la compañía.
  - `HomeSolutions.tsx`: Sección de servicios clave con acceso a sus detalles individuales.
  - `HomeCalculator.tsx`: Calculadora dinámica para cotizar servicios a la medida de forma interactiva.
  - `About.tsx`: Vista detallada de la empresa, su visión, misión y valores de marca.
  - `Services.tsx` & `ServiceDetail.tsx`: Catálogo completo y dinámico de los servicios de ingeniería de telecomunicaciones.
  - `Projects.tsx`: Portafolio interactivo de proyectos exitosos con filtros de búsqueda rápida.
  - `Careers.tsx`: Panel de bolsa de trabajo con vacantes, detalles de perfiles y carga/simulación de postulación.
  - `Blog.tsx` & `HomeBlogPreview.tsx`: Noticias de interés técnico, innovación y telecomunicaciones en Perú.
  - `Contact.tsx`: Vista de contacto institucional con formulario y simulación de envío.
  - `Portal.tsx`: Panel interactivo para clientes y proveedores con estadísticas de rendimiento NOC, KPIs de servicio, descargas de reportes y estado de facturas.
  - `ComfuChat.tsx`: Chatbot inteligente de soporte guiado y FAQs corporativas.

---

## 🚀 Comandos de Desarrollo

Asegúrate de estar en el directorio `frontend/` antes de ejecutar cualquiera de estos scripts:

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```
Levanta el servidor local en **`http://localhost:3000`**.

### Compilar para producción
```bash
npm run build
```
Genera la carpeta optimizada y minificada `/dist` lista para subir a producción.

### Validar tipos de TypeScript
```bash
npm run lint
```

### Limpiar caché de compilación
```bash
npm run clean
```

---

## 🎨 Cambiador de Temas (Theme Changer)
En la raíz de este directorio se encuentran los scripts `theme_changer.py` y `theme_changer.cjs`. Son herramientas de utilidad interna diseñadas para transformar las clases CSS oscuras por defecto a versiones de esquema claro en todos los componentes del frontend en segundos de forma segura.
