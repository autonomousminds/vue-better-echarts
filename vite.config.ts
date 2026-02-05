import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
    }),
    // Inject CSS into JS bundle so it auto-loads when components are imported
    // This eliminates the need for consuming apps to manually import CSS
    cssInjectedByJsPlugin({
      // Use top-head to ensure our styles load early
      topExecutionPriority: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueEChartsCharts',
      formats: ['es', 'umd'],
      fileName: (format) => `vue-better-echarts.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts'
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  }
});
