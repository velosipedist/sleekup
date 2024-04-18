const fs = require('fs');
const path = require('path');
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  return {
    root: './src',
    build: {
      outDir: path.resolve(__dirname,
        mode === 'production' ? 'build' : 'build-dev'),
      emptyOutDir: false,
      sourcemap: false,
      cssCodeSplit: false,
      copyPublicDir: false,
      minify: mode === 'production',
      assetsInlineLimit: Infinity,
      lib: { name: 'page', entry: 'src/page.js', formats: ['iife'] },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          format: 'iife',
          name: 'page',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
        },
        input: {
          page: 'src/page.js',
        },
      },
    },
    plugins: [
      {
        name: 'copy-manifest',
        enforce: 'post',
        async writeBundle () {
          await fs.promises.copyFile(
            path.resolve(__dirname, 'src', 'manifest.json'),
            path.resolve(__dirname,
              mode === 'production' ? 'build' : 'build-dev',
              'manifest.json',
            ),
          );
        },
      },
    ],
  };
});