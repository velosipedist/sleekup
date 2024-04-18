import { defineConfig } from 'vite';


export default defineConfig(({ mode, command }) => {
  return {
    root: './src',
    build: {
      outDir: mode === 'production' ? '../build' : '../build-dev',
      emptyOutDir: false,
      sourcemap: false,
      cssCodeSplit: false,
      copyPublicDir: false,
      minify: mode === 'production',
      assetsInlineLimit: Infinity,
      lib: {
        entry: 'popup.html',
        name: 'popup',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          format: 'iife',
          name: 'popup',
          entryFileNames: '[name].js',
        },
      },
    },
  };
});