# 🛡️ InfoHack

<div align="center">

![InfoHack Banner](https://img.shields.io/badge/InfoHack-Ciberseguridad%20para%20todos-018a2c?style=for-the-badge)

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

**Plataforma educativa moderna sobre ciberseguridad construida con Astro**

[🌐 Demo en Vivo](https://www.infohack.info) • [📖 Documentación](docs/) • [🤝 Contribuir](CONTRIBUTING.md)

</div>

---

## 🎯 Sobre el Proyecto

**InfoHack** democratiza el conocimiento en ciberseguridad mediante contenido accesible, práctico y ético para:

- **👥 Usuarios comunes**: Guías paso a paso para proteger datos personales, crear contraseñas seguras, detectar phishing
- **🎓 Estudiantes y profesionales**: Tutoriales de hacking ético, conceptos técnicos explicados de forma clara
- **🔒 Entusiastas de la seguridad**: Noticias actualizadas, recursos curados y herramientas prácticas

### ✨ Características Principales

- 🔐 **Generador de Contraseñas Seguras**: Herramienta interactiva con análisis de fortaleza en tiempo real
- 📚 **Sistema de Contenidos Dinámico**: Guías, tutoriales y noticias gestionadas con Content Collections
- 🎨 **Componentes Reutilizables**: Sistema modular de componentes (ChecklistBox, TipCard, StepByStep)
- ⚡ **Rendimiento Optimizado**: SSG con Astro para carga ultrarrápida
- 🔒 **Seguridad Implementada**: Headers de seguridad, CSP, middleware personalizado
- 📱 **100% Responsive**: Diseño mobile-first con TailwindCSS
- ♿ **Accesible**: Semántica HTML5 y ARIA labels
- 🔍 **SEO Optimizado**: Sitemap automático, meta tags, RSS feed

## 🚀 Tech Stack

| Tecnología | Propósito |
|------------|-----------|
| **Astro 5.0** | Framework principal (SSG) |
| **React 18** | Componentes interactivos |
| **TypeScript** | Type safety y mejor DX |
| **TailwindCSS** | Estilos utility-first |
| **Content Collections** | Gestión de contenido con validación |
| **Vercel** | Deploy y hosting optimizado |


## � Estructura del Proyecto

```text
infohack/
├── public/
│   ├── favicon.svg
│   └── audio/                    # Audio para guías narradas
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── NavBar.astro
│   │   ├── FloatingAudioPlayer.astro
│   │   ├── PasswordGenerator.astro
│   │   └── content/             # Componentes de contenido
│   │       ├── StepByStep.astro
│   │       ├── ChecklistBox.astro
│   │       ├── TipCard.astro
│   │       └── WarningAlert.astro
│   ├── content/                 # Content Collections
│   │   ├── config.ts           # Schemas de validación
│   │   ├── guides/             # Guías prácticas
│   │   ├── tutorials/          # Tutoriales técnicos
│   │   ├── news/               # Noticias de ciberseguridad
│   │   └── resources/          # Recursos y herramientas
│   ├── layouts/                # Layouts base
│   ├── pages/                  # Páginas del sitio
│   ├── sections/               # Secciones (Header, Footer)
│   ├── middleware.ts           # Middleware de seguridad
│   └── styles/
├── docs/                       # Documentación del proyecto
└── scripts/                    # Scripts de automatización
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm

### Setup Local

```bash
# Clonar el repositorio
git clone https://github.com/juinerwd/infohack-web.git
cd infohack-web

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

El proyecto estará disponible en `http://localhost:4321`

## 🎨 Paleta de Colores

```css
--color-base: #0f1724;      /* Azul oscuro - Background principal */
--color-accent: #018a2c;    /* Verde - Acentos y CTAs */
--color-text: #e5e7eb;      /* Gris claro - Texto principal */
--color-border: #1f2937;    /* Gris oscuro - Bordes */
```

## 🏗️ Decisiones Técnicas

### ¿Por qué Astro?

- **Zero JS by default**: Solo carga JavaScript cuando es necesario
- **Islands Architecture**: Hidratación selectiva de componentes
- **Content Collections**: Type-safe content con validación en build time
- **Excelente DX**: Hot reload rápido, TypeScript integrado

### ¿Por qué React para componentes interactivos?

- **Familiaridad**: Ecosistema maduro y ampliamente conocido
- **Client directives**: `client:load`, `client:visible` para optimizar hidratación
- **Componentes con estado**: Ideal para el generador de contraseñas

### Arquitectura de Seguridad

```typescript
// middleware.ts - Headers de seguridad aplicados globalmente
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: Política restrictiva
- Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Rendimiento

- **Lighthouse Score**: 95+ en todas las métricas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Tamaño de bundle**: Optimizado con code splitting

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto sigue estrictas normas éticas de ciberseguridad.

### Formas de contribuir:

- 📝 Agregar o mejorar contenido educativo
- 🐛 Reportar bugs o problemas
- ✨ Proponer nuevas características
- 🌍 Traducir contenido
- 📖 Mejorar documentación

Lee nuestra [Guía de Contribución](CONTRIBUTING.md) para más detalles.

### Proceso rápido:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más información.

## 👨‍💻 Autor

**Juiner** - [@juinerwd](https://github.com/juinerwd)

## 🙏 Agradecimientos

- [Astro](https://astro.build) por el increíble framework
- [TailwindCSS](https://tailwindcss.com) por el sistema de diseño
- Comunidad de ciberseguridad por el conocimiento compartido

## 📞 Contacto

- 🌐 Website: [www.infohack.info](https://www.infohack.info)
- 📧 Email: [Página de contacto](https://www.infohack.info/contact)
- 💼 GitHub: [@juinerwd](https://github.com/juinerwd)

---

<div align="center">

**⭐ Si este proyecto te resulta útil, considera darle una estrella ⭐**

Hecho con ❤️ para la comunidad de ciberseguridad

[🔝 Volver arriba](#-infohack)

</div>

- ✅ Contenido educativo y responsable
- ❌ No exploits listos para producción
- ✅ Disclaimer visible en cada tutorial
- ✅ Promoción de responsible disclosure

Ver `CONTRIBUTING.md` para más detalles.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## ⚖️ Ética y responsabilidad

Todo el contenido tiene fines **únicamente educativos**. No usar en sistemas sin autorización explícita.

Para reportar vulnerabilidades de forma responsable: [responsible disclosure](mailto:security@infohack.dev)
