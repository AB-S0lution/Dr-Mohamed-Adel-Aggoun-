import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname);

export default defineConfig({
  base: '/Dr-Mohamed-Adel-Aggoun-/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        cabinet: resolve(root, 'le-cabinet.html'),
        specialites: resolve(root, 'specialites.html'),
        conseils: resolve(root, 'conseils-sante.html'),
        faq: resolve(root, 'faq.html'),
        horaires: resolve(root, 'horaires-acces.html'),
        contact: resolve(root, 'contact.html'),
        mentions: resolve(root, 'mentions-legales.html'),
        confidentialite: resolve(root, 'confidentialite.html'),
        notFound: resolve(root, '404.html'),
      },
    },
  },
});
