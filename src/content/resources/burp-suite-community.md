---
title: "Burp Suite Community Edition - Herramienta esencial para pentesting web"
description: "Plataforma integrada para realizar pruebas de seguridad en aplicaciones web. La versión gratuita incluye funcionalidades básicas pero potentes."
category: "herramientas"
tags: ["burp-suite", "pentesting", "web", "proxy", "scanner"]
author: "Equipo Infohack"
publishDate: 2025-01-11
featured: true
ethicalDisclaimer: true
---

# Burp Suite Community Edition

Burp Suite es una de las herramientas más populares y utilizadas para pruebas de seguridad en aplicaciones web. La edición Community es gratuita y ofrece funcionalidades fundamentales para empezar en el pentesting web.

## ¿Qué es Burp Suite?

Es una plataforma integrada que actúa como proxy entre tu navegador y la aplicación web objetivo, permitiendo interceptar, modificar y analizar todo el tráfico HTTP/HTTPS.

## Funcionalidades principales (Community Edition)

### 🔍 **Proxy**
- Intercepta y modifica requests/responses HTTP
- Historial completo de tráfico
- Configuración de reglas de interceptación

### 🕷️ **Spider/Crawler**
- Mapeo automático de la aplicación
- Descubrimiento de endpoints
- Análisis de estructura de sitios

### 🔄 **Repeater**
- Envío manual de requests
- Modificación de parámetros
- Análisis de responses

### 📊 **Sequencer**
- Análisis de aleatoriedad en tokens
- Evaluación de session IDs
- Detección de patrones predecibles

## Instalación

1. **Descargar**: Visita [portswigger.net](https://portswigger.net/burp/communitydownload)
2. **Requisitos**: Java 11 o superior
3. **Configuración**: Configurar proxy en navegador (127.0.0.1:8080)

## Primeros pasos

### Configuración básica
1. Ejecutar Burp Suite
2. Crear proyecto temporal
3. Configurar proxy del navegador
4. Instalar certificado CA de Burp

### Workflow básico
1. **Navegar** por la aplicación objetivo
2. **Revisar** el tráfico en Proxy > HTTP history
3. **Enviar** requests interesantes al Repeater
4. **Modificar** parámetros para buscar vulnerabilidades

## Diferencias con la versión Pro

| Funcionalidad | Community | Professional |
|---------------|-----------|--------------|
| Proxy | ✅ | ✅ |
| Spider | ✅ | ✅ |
| Repeater | ✅ | ✅ |
| Sequencer | ✅ | ✅ |
| Scanner automático | ❌ | ✅ |
| Intruder (completo) | ⚠️ Limitado | ✅ |
| Extensiones | ✅ | ✅ |
| Soporte técnico | ❌ | ✅ |

## Recursos de aprendizaje

- **Web Security Academy**: [portswigger.net/web-security](https://portswigger.net/web-security)
- **Documentación oficial**: Muy completa y actualizada
- **Laboratorios gratuitos**: Para practicar vulnerabilidades web

## ⚠️ Uso ético

**Importante**: Solo utiliza Burp Suite en aplicaciones que:
- Te pertenezcan
- Tengas autorización explícita para probar
- Sean laboratorios/CTFs diseñados para pruebas

El uso no autorizado puede ser ilegal y tener consecuencias legales graves.
