// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // We use our own global styles
    }),
    react(),
    mdx(),
  ],
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
