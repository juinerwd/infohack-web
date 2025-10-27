# Plan de tareas — Proyecto **Infohack**

> Documento: lista de tareas estilo *todo* para desarrollar el sitio informativo Infohack (Astro). Organizado por fases y áreas: técnico, contenido, diseño, seguridad y lanzamiento.

---

## ✅ Resumen rápido

- Objetivo: Sitio informativo sobre ciberseguridad orientado a **usuarios comunes** y **principiantes/intermedios**. Implementación inicial con **Astro** (sitio estático).
- MVP: contenido para usuarios comunes + contenido para principiantes, sección de recursos y noticias, embeds de YouTube, deploy en Vercel/Netlify.

---

# Lista de tareas (formato: checklist)

## Fase 0 — Preparación ✅
- [x] Crear repositorio en GitHub: `infohack-web` (incluir README con objetivo y licencia)
- [x] Configurar _branching_ (main, develop)
- [x] Crear proyecto en Astro (template base)
- [x] Añadir .gitignore, LICENSE, CODE_OF_CONDUCT.md, CONTRIBUTING.md
- [x] Definir paleta de colores y tipografías (usaremos: `#0f1724` base, `#018a2c` acento)

## Fase 1 — MVP (Infraestructura y despliegue)
### Configuración técnica ✅
- [x] Inicializar Astro + Tailwind CSS
- [x] Configurar Astro Content Collections para: `tutorials`, `news`, `resources`
- [x] Crear layout base (`BaseLayout.astro`) y `BlogLayout.astro`
- [x] Componentes: NavBar, Footer, Card, PostList, Hero, Tag, SearchInput (placeholder)
- [x] Configurar SEO básico: `<head>` dinámico, OpenGraph, Twitter Card
- [x] Generar sitemap.xml y RSS feed
- [x] Configurar deploy en Vercel (o Netlify) y conectar al repo
- [ ] Añadir CI básico (GitHub Actions) para build y tests de linter

**✅ Correcciones técnicas realizadas:**
- [x] Arreglar compatibilidad con Tailwind CSS 4
- [x] Solucionar problemas de contraste de texto en todos los componentes
- [x] Reemplazar clases personalizadas por clases nativas de Tailwind
- [x] Configurar URLs canónicas y metadatos SEO
- [x] Implementar página de inicio funcional con contenido de ejemplo

**✅ Páginas y funcionalidades implementadas:**
- [x] Páginas de colección: `/guides`, `/tutorials`, `/news`, `/resources`
- [x] Páginas dinámicas individuales para cada tipo de contenido
- [x] BlogLayout con metadatos técnicos para tutoriales (prerequisites, tools, labEnvironment)
- [x] Sistema de RSS feed funcional con disclaimers éticos
- [x] Sitemap automático con filtrado
- [x] Componente Card actualizado para soportar todas las propiedades

### Contenido inicial (crear archivos Markdown)
- [ ] Crear 3–5 artículos **Protege tus datos** (usuarios comunes):
  - [x] Contraseñas seguras (pasos + ejemplos)
  - [x] Activar 2FA — WhatsApp / Gmail / Facebook
  - [x] Detectar phishing en correos y WhatsApp
  - [ ] Seguridad en Wi‑Fi públicas y routers domésticos
  - [ ] Banca en línea segura (consejos prácticos)
- [ ] Crear 3 artículos **Aprende ciberseguridad** (principiante/intermedio):
  - [ ] Qué es el hacking ético (conceptos y ética)
  - [ ] Laboratorio seguro: cómo montar VMs (VirtualBox/VMware)
  - [ ] OWASP Top 10 explicado para principiantes
- [ ] Crear 3 entradas de `news` con lenguaje simple (ejemplos de incidentes y cómo protegerse)
- [ ] Añadir 8–10 recursos (canales de YouTube, cursos gratuitos, documentación)

### UI / UX mínimas
- [x] Hero en home con CTA: “Soy usuario / Quiero aprender”
- [ ] Página: Protege tus datos (colección con tarjetas)
- [ ] Página: Aprende ciberseguridad (colección con tarjetas)
- [ ] Página: Tutoriales (lista, filtros por nivel)
- [ ] Página: Recursos (lista de enlaces categorizados)
- [ ] Página: Noticias (blog list)
- [ ] Página: Contacto (formulario con Formspree o Netlify Forms)
- [ ] Footer con aviso legal y enlace a responsible disclosure

### Seguridad del sitio
- [ ] Forzar HTTPS (por hosting)
- [ ] Añadir Content Security Policy (CSP) básica
- [ ] Sanitizar y limitar campos de formulario
- [ ] Habilitar 2FA en cuentas de administrador (GitHub/Vercel)

## Fase 2 — Funcionalidades y comunidad
### Contenido y editorial
- [ ] Definir calendario editorial: publicar 1 tutorial + 1 noticia por semana
- [ ] Crear plantillas Markdown para tutorial con la estructura: resumen (usuario), explicación técnica, laboratorio, mitigación, referencias
- [ ] Redactar plantilla de aviso legal/ética para cada tutorial

### Funcionalidades
- [ ] Implementar etiquetas y taxonomía (nivel, categoría)
- [ ] Implementar búsqueda (Lunr.js o Algolia)
- [ ] Crear formulario para **enviar tutoriales** (envío moderado por email / GitHub PR)
- [ ] Integrar newsletter (Mailchimp/Resend)
- [ ] Implementar RSS y meta tags para compartir

### Moderación y colaboración
- [ ] Definir proceso de revisión para contribuciones (checklist de ética)
- [ ] Crear plantilla de Pull Request para contribuciones de tutoriales
- [ ] Crear página "Cómo colaborar" con pasos claros

## Fase 3 — Comunidad & mejoras (avanzado)
- [ ] Evaluar autenticación ligera (Supabase/Auth) para colaboradores
- [ ] Panel simple para colaboradores (subir borrador y meta datos)
- [ ] Comentarios con Giscus (usando GitHub Discussions)
- [ ] Sistema de valoraciones / votos para tutoriales
- [ ] Analytics respetuoso con la privacidad (Matomo o GA con consentimiento)

## Lanzamiento — Checklist final
- [ ] Revisar todos los textos legales (aviso legal, privacidad)
- [ ] Revisión de contenido sensible (no publicar exploits listos)
- [ ] Test de rendimiento (Lighthouse) — objetivo: FCP rápido
- [ ] Revisar SEO (meta tags, schema.org en artículos)
- [ ] Probar formularios y workflows de contribución
- [ ] Hacer deploy final y verificar dominios / HTTPS
- [ ] Anunciar lanzamiento en redes y correo

## Mantenimiento y métricas
- [ ] Establecer métricas clave (KPI): tráfico orgánico, tiempo en página, suscriptores, envíos de contribuciones
- [ ] Revisar y actualizar contenido crítico cada 3–6 meses
- [ ] Backup periódico del repo y assets

## Seguridad editorial (normas importantes) ✅
- [x] Incluir disclaimer visible en cada tutorial: "Contenido educativo — no usar en sistemas sin autorización"
- [x] Prohibir la publicación de payloads/exploits que puedan usarse directamente en producción  
- [x] Promover responsible disclosure: correo y/o formulario dedicado

**✅ Implementado en:**
- Footer con disclaimer ético visible
- BlogLayout con disclaimer automático para tutoriales
- Enlaces a responsible disclosure en footer
- Código de conducta con normas éticas específicas

## Tareas opcionales / futuras ideas
- [ ] Traducción al inglés (i18n)
- [ ] Versionado de contenidos (historial de cambios visible)
- [ ] Integración con plataformas de aprendizaje (LMS) si se quiere monetizar en el futuro
- [ ] Podcast corto sobre noticias de ciberseguridad

---

### Notas finales
- Prioriza lanzar rápido con contenido claro para **usuarios comunes** y luego ampliar la sección técnica.
- Mantén siempre la cláusula ética visible y el proceso de contribución moderado.

*Fin del plan.*

