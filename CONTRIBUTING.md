# Guía de Contribución

¡Gracias por tu interés en contribuir a **Infohack**! 🛡️

## 🎯 Tipos de contribuciones

### 📝 Contenido educativo
- Tutoriales de ciberseguridad para principiantes
- Guías de seguridad para usuarios comunes
- Noticias de ciberseguridad con análisis
- Recursos y herramientas recomendadas

### 🛠️ Mejoras técnicas
- Corrección de bugs
- Mejoras de rendimiento
- Nuevas funcionalidades
- Mejoras de UX/UI

### 🌍 Traducciones
- Traducción de contenido existente
- Localización de la interfaz

## ⚖️ Principios éticos fundamentales

**IMPORTANTE**: Como plataforma educativa de ciberseguridad, seguimos estrictos principios éticos:

### ✅ Permitido
- Contenido educativo y explicativo
- Técnicas mostradas en entornos controlados
- Referencias a herramientas legítimas
- Explicaciones teóricas de vulnerabilidades
- Guías de mitigación y defensa

### ❌ Prohibido
- Exploits listos para usar en producción
- Malware o código malicioso
- Herramientas automatizadas de ataque
- Información que facilite actividades ilegales
- Contenido sin disclaimer educativo

## 📋 Proceso de contribución

### 1. Preparación
```bash
# Fork del repositorio
git clone https://github.com/tu-usuario/infohack.git
cd infohack

# Instalar dependencias
npm install

# Crear rama para tu contribución
git checkout -b feature/nombre-descriptivo
```

### 2. Desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev

# Hacer tus cambios...

# Verificar que todo funciona
npm run build
```

### 3. Contenido
Si contribuyes contenido, asegúrate de:

#### Para tutoriales:
- Incluir disclaimer: "**⚠️ Contenido educativo**: Usar únicamente en sistemas propios o con autorización explícita"
- Estructura clara: Introducción → Explicación → Laboratorio → Mitigación → Referencias
- Nivel de dificultad claramente marcado
- Usar entornos de laboratorio seguros (VMs, contenedores)

#### Para artículos de usuarios comunes:
- Lenguaje simple y accesible
- Pasos claros con capturas de pantalla
- Enfoque en prevención y protección
- Ejemplos prácticos del día a día

### 4. Envío
```bash
# Hacer commit con mensaje descriptivo
git add .
git commit -m "feat: añadir tutorial sobre XYZ"

# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear Pull Request en GitHub
```

## 📝 Plantillas de contenido

### Tutorial técnico
```markdown
---
title: "Título del Tutorial"
description: "Descripción breve"
level: "principiante|intermedio|avanzado"
tags: ["seguridad-web", "owasp", "laboratorio"]
author: "Tu nombre"
date: "2025-01-15"
---

# Título del Tutorial

**⚠️ Contenido educativo**: Usar únicamente en sistemas propios o con autorización explícita.

## Resumen para usuarios
[Explicación simple de qué es y por qué importa]

## Explicación técnica
[Detalles técnicos de la vulnerabilidad o técnica]

## Laboratorio práctico
[Pasos para reproducir en entorno controlado]

## Mitigación
[Cómo defenderse o solucionarlo]

## Referencias
- [Fuente 1]
- [Fuente 2]
```

### Artículo para usuarios comunes
```markdown
---
title: "Cómo proteger..."
description: "Guía práctica para..."
category: "protege-tus-datos"
difficulty: "fácil"
time: "5 minutos"
---

# Cómo proteger...

## ¿Por qué es importante?
[Explicación simple del riesgo]

## Pasos a seguir
1. [Paso 1 con imagen]
2. [Paso 2 con imagen]
3. [Paso 3 con imagen]

## ¿Cómo saber si funcionó?
[Verificación]

## Recursos adicionales
- [Enlaces útiles]
```

## 🔍 Revisión de contenido

Todos los contenidos pasan por revisión para verificar:

### ✅ Checklist ético
- [ ] Contiene disclaimer educativo visible
- [ ] No incluye exploits listos para producción
- [ ] Menciona uso en entornos controlados
- [ ] Incluye sección de mitigación/defensa
- [ ] Referencias a fuentes confiables

### ✅ Checklist técnico
- [ ] Información técnicamente correcta
- [ ] Actualizada con estándares actuales
- [ ] Ejemplos funcionales en laboratorio
- [ ] Código limpio y comentado
- [ ] Screenshots de calidad

### ✅ Checklist editorial
- [ ] Ortografía y gramática correctas
- [ ] Estructura clara y lógica
- [ ] Lenguaje apropiado para el público objetivo
- [ ] Metadatos completos

## 🚀 Configuración del entorno de desarrollo

### Dependencias
```bash
npm install
```

### Variables de entorno (si aplica)
```bash
cp .env.example .env
# Editar .env con tus valores
```

### Estructura de carpetas
```
src/content/
├── tutorials/          # Tutoriales técnicos
├── guides/             # Guías para usuarios comunes  
├── news/              # Noticias y análisis
└── resources/         # Recursos y herramientas
```

## 💬 Comunicación

- **Issues**: Para reportar bugs o proponer nuevas funcionalidades
- **Discussions**: Para preguntas generales y brainstorming
- **Pull Requests**: Para contribuciones de código/contenido

## 🏆 Reconocimiento

Los colaboradores serán reconocidos en:
- Página de créditos del sitio
- README del repositorio  
- Byline en artículos contribuidos

## ❓ Preguntas frecuentes

### ¿Puedo incluir herramientas de pentesting?
Sí, siempre que sean para uso educativo, con disclaimers apropiados y enfocadas en defensa.

### ¿Qué pasa si mi contenido es rechazado?
Recibirás feedback detallado para mejorarlo y podrás hacer las correcciones necesarias.

### ¿Puedo monetizar mi contenido aquí?
No, Infohack es un proyecto educativo sin fines de lucro.

---

**¡Gracias por ayudar a hacer la ciberseguridad más accesible para todos!** 🙏
