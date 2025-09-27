// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://infohack.dev', // URL del sitio en producción
  vite: {
    plugins: [tailwindcss()],
  },
});