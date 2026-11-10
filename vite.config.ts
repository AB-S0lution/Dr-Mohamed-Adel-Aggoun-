import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves 404.html for any unknown path. Shipping a copy of the
// built index.html under that name lets the client router handle deep links
// and refreshes instead of showing GitHub's own 404 page.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    enforce: 'post',
    apply: 'build',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (index && index.type === 'asset') {
        this.emitFile({ type: 'asset', fileName: '404.html', source: index.source });
      }
    },
  };
}

export default defineConfig({
  base: '/Dr-Mohamed-Adel-Aggoun-/',
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    assetsInlineLimit: 2048,
  },
});
