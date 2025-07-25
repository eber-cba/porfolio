# Portfolio - Organización del Proyecto

## Estructura de Carpetas

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
│   ├── Eber_Coronel_CV.pdf, Fullstack_EberCoronel_cv.pdf # CVs
│   └── ...
│
├── styles/               # Archivos de estilos globales y módulos CSS
│   ├── global.scss       # Estilos globales
│   ├── AboutMe.module.css
│   └── intro.module.css
│
├── package.json          # Dependencias y scripts del proyecto
├── next.config.js        # Configuración de Next.js
├── README.md             # (Este archivo)
└── ...
```

## Descripción de Carpetas y Archivos

- **components/**: Contiene todos los componentes reutilizables. Se recomienda agruparlos en subcarpetas por tipo:
  - `ui/`: Botones, modales, etc.
  - `layout/`: Navbar, Layout general.
  - `sections/`: Secciones principales de la web (AboutMe, SobreMi, Habilidades, etc.)
- **pages/**: Todas las páginas y rutas de la app. `index.js` es la página principal. `api/` contiene endpoints backend.
- **public/**: Imágenes, PDFs, íconos y recursos estáticos. Subcarpetas para organizar por tipo de recurso.
- **styles/**: Estilos globales y módulos CSS para componentes específicos.
- **package.json**: Lista de dependencias y scripts.
- **next.config.js**: Configuración de Next.js.

## Recursos en public/

- **yo.jpg**: Foto de perfil utilizada en la sección SobreMi.
- **habilidades/**: Iconos SVG y PNG de tecnologías y herramientas.
- **contacto/**: Iconos de redes sociales y contacto.
- **experiencia/**: Imágenes relacionadas a experiencias laborales o proyectos.
- **Eber_Coronel_CV.pdf, Fullstack_EberCoronel_cv.pdf**: Archivos PDF del currículum.

## Componentes principales

- **AboutMe.jsx**: Sección de presentación personal.
- **SobreMi.jsx**: Sección con tabs de información, muestra la foto de perfil.
- **Habilidades.jsx**: Sección de habilidades técnicas.
- **Contacto.jsx**: Formulario y datos de contacto.
- **Navbar.jsx**: Barra de navegación principal.
- **Intro.jsx**: Pantalla de bienvenida.
- **ModalCv.jsx, ModalExperiencia.jsx**: Modales para mostrar información adicional.
- **Acordion.jsx, LineaDeTime.jsx, BotonExperiencia.jsx, Particulas.jsx**: Otros componentes de UI y secciones.

## Organización sugerida

- Agrupa los componentes en subcarpetas según su función (ui, layout, sections).
- Mantén los recursos estáticos organizados en subcarpetas dentro de public/.
- Usa módulos CSS para estilos específicos de componentes.

---

**¡Recuerda actualizar este archivo si agregas nuevas carpetas o componentes importantes!**
