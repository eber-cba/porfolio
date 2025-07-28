# Portafolio Personal

Este proyecto es un portafolio web personal desarrollado con Next.js que muestra habilidades, experiencia y proyectos de forma interactiva y moderna.

## 🚀 Características

- **Diseño Interactivo**: Animaciones fluidas con GSAP y Framer Motion
- **Interfaz Moderna**: Componentes estilizados con Material UI y NextUI
- **Secciones Completas**: Presentación, Sobre Mí, Habilidades, Experiencia y Contacto
- **Formulario de Contacto**: Integración con EmailJS para envío de mensajes
- **Responsive**: Adaptable a diferentes dispositivos y tamaños de pantalla
- **Efectos Visuales**: Partículas interactivas y transiciones animadas

## 🛠️ Tecnologías

### Frontend
- **Next.js**: Framework de React para renderizado del lado del servidor
- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **Material UI**: Sistema de diseño para componentes React
- **NextUI**: Biblioteca de componentes UI modernos
- **GSAP**: Biblioteca de animación JavaScript
- **Framer Motion**: Biblioteca de animaciones para React
- **React Tsparticles**: Efectos de partículas interactivas
- **Sass**: Preprocesador CSS

### Herramientas
- **EmailJS**: Servicio para enviar emails desde JavaScript
- **React Scroll**: Navegación suave entre secciones
- **SweetAlert2**: Alertas personalizadas y atractivas
- **Notistack**: Gestión de notificaciones tipo snackbar

## 📋 Estructura del Proyecto

```
porfolio/
│
├── components/           # Componentes reutilizables de la app
│   ├── ui/               # Componentes de interfaz (botones, modales, etc.)
│   ├── layout/           # Componentes de layout (Navbar, Layout, etc.)
│   ├── sections/         # Secciones principales (AboutMe, SobreMi, Habilidades, etc.)
│   └── ...
│
├── pages/                # Páginas de Next.js (rutas)
│   ├── api/              # Endpoints API
│   ├── _app.js           # Configuración global de la app
│   ├── _document.jsx     # Documento HTML base
│   └── index.js          # Página principal
│
├── public/               # Recursos estáticos (imágenes, PDFs, íconos)
│   ├── habilidades/      # Iconos de habilidades
│   ├── contacto/         # Iconos de contacto
│   ├── experiencia/      # Imágenes de experiencia
│   ├── yo.jpg            # Foto de perfil
│   └── ...
│
├── data/                 # Datos estructurados para el portafolio
│   ├── experiencesData.js # Información de experiencia laboral y académica
│   └── skillsData.js     # Información de habilidades técnicas
│
├── styles/               # Archivos de estilos globales y módulos CSS
│   ├── global.scss       # Estilos globales
│   ├── AboutMe.module.css
│   └── intro.module.css
│
├── utils/                # Utilidades y funciones auxiliares
│   └── smoothScroll.js   # Función para scroll suave
│
├── package.json          # Dependencias y scripts del proyecto
├── next.config.js        # Configuración de Next.js
├── README.md             # (Este archivo)
└── ...
```

## 🚀 Cómo ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/portafolio.git
   cd portafolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

5. **Iniciar en modo producción**
   ```bash
   npm start
   # o
   yarn start
   ```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📂 Descripción de Carpetas y Archivos

- **components/**: Contiene todos los componentes reutilizables organizados por tipo:
  - `ui/`: Componentes de interfaz como botones, modales, acordeones y tarjetas.
  - `layout/`: Componentes estructurales como Navbar y Layout general.
  - `sections/`: Secciones principales de la web (Intro, AboutMe, SobreMi, Habilidades, Contacto).

- **pages/**: Sistema de rutas de Next.js:
  - `index.js`: Página principal que carga el componente Intro.
  - `_app.js`: Configuración global y proveedores de contexto.
  - `_document.jsx`: Personalización del documento HTML base.
  - `api/`: Endpoints backend para funcionalidades específicas.

- **public/**: Recursos estáticos organizados por categorías:
  - `habilidades/`: Iconos y logos de tecnologías y herramientas.
  - `contacto/`: Iconos para la sección de contacto (GitHub, LinkedIn).
  - `experiencia/`: Imágenes relacionadas con experiencia laboral.
  - Archivos de favicon y manifiestos para PWA.

- **data/**: Datos estructurados para alimentar componentes dinámicos:
  - `experiencesData.js`: Información detallada sobre experiencia laboral y académica.
  - `skillsData.js`: Categorización y detalles de habilidades técnicas.

- **styles/**: Sistema de estilos con enfoque modular:
  - `global.scss`: Estilos globales y variables SCSS.
  - Módulos CSS específicos para cada componente principal.

- **utils/**: Funciones de utilidad:
  - `smoothScroll.js`: Implementación de scroll suave para navegación.

## 🔍 Secciones Principales

- **Intro**: Página de bienvenida con animaciones GSAP y efectos de partículas.
- **Sobre Mí**: Información personal y profesional con tabs para diferentes categorías.
- **Habilidades**: Visualización de tecnologías dominadas organizadas por categorías.
- **Experiencia**: Línea de tiempo interactiva con tarjetas de experiencia laboral y académica.
- **Contacto**: Formulario de contacto con validación e integración con EmailJS.

## 📱 Contacto

Puedes contactar al desarrollador a través del formulario en la sección de contacto del portafolio o mediante los enlaces a redes sociales disponibles en la misma sección.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 🖼️ Recursos en public/

- **Archivos principales**:
  - **yo.jpg**: Foto de perfil utilizada en la sección SobreMi.
  - **FullStack_Eber_Coronel.pdf**: Currículum vitae descargable desde la plataforma.
- **Carpetas de recursos**:
  - **contacto/**: SVG para enlaces a GitHub, LinkedIn y otras redes sociales.
  - **habilidades/**: Iconos SVG y PNG de tecnologías y herramientas.
  - **experiencia/**: Imágenes relacionadas a experiencias laborales o proyectos.
- **Favicons y compatibilidad**:
  - **favicon.ico**: Icono principal del sitio.
  - **favicon-16x16.png, favicon-32x32.png**: Variantes de diferentes tamaños.
  - **android-chrome-192x192.png, android-chrome-512x512.png**: Para dispositivos Android.
  - **apple-touch-icon.png**: Para dispositivos iOS.
  - **site.webmanifest**: Configuración para PWA.

## 🙏 Agradecimientos

Este proyecto fue desarrollado como parte de mi portafolio personal para mostrar mis habilidades y experiencia en desarrollo web. Agradezco a todos los que han contribuido con feedback y sugerencias para mejorar este proyecto.

## 🧩 Componentes principales

### Componentes de Layout
- **Layout.js**: Componente principal que envuelve toda la aplicación y proporciona estructura común.
- **Navbar.jsx**: Barra de navegación responsiva con enlaces a las diferentes secciones.

### Componentes de Secciones
- **Intro.jsx**: Sección de bienvenida con animaciones y efectos visuales.
- **AboutMe.jsx**: Presentación personal con información relevante.
- **SobreMi.jsx**: Sección detallada sobre experiencia y formación.
- **Habilidades.jsx**: Visualización de habilidades técnicas organizadas por categorías.
- **Contacto.jsx**: Formulario de contacto con validación e integración con EmailJS.

### Componentes UI
- **Particulas.jsx**: Efecto visual de partículas interactivas en el fondo.
- **ExperienceCard.jsx**: Tarjetas para mostrar experiencia laboral y académica.
- **ModalCv.jsx**: Modal para visualizar y descargar el CV.
- **LineaDeTime.jsx**: Línea de tiempo para mostrar la trayectoria profesional.
- **Acordion.jsx**: Componente de acordeón para mostrar información expandible.

---

> **Nota:** Este README debe actualizarse cuando se agreguen nuevas características, componentes o dependencias importantes al proyecto.
