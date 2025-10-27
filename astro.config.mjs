// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://infohack.dev', // URL del sitio en producción
  integrations: [sitemap({
    // Configurar páginas a incluir/excluir del sitemap
    filter: (page) => 
      !page.includes('/admin/') && 
      !page.includes('/draft/') &&
      !page.includes('/404'),
    // Configurar changefreq y priority
    changefreq: 'weekly',
    priority: 0.7,
    // Configurar lastmod basado en el tipo de página
    lastmod: new Date(),
  }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Configuración del servidor para desarrollo
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});