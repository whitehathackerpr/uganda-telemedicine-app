import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: [
      'axios',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@babel/runtime': '@babel/runtime/helpers',
      '@babel/runtime/helpers': '@babel/runtime/helpers',
      '@babel/runtime/helpers/esm': '@babel/runtime/helpers/esm',
      '@babel/runtime/helpers/esm/extends': '@babel/runtime/helpers/esm/extends',
      '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose': '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose',
      '@babel/runtime/helpers/esm/inheritsLoose': '@babel/runtime/helpers/esm/inheritsLoose',
      '@babel/runtime/helpers/esm/assertThisInitialized': '@babel/runtime/helpers/esm/assertThisInitialized',
      '@babel/runtime/helpers/esm/interopRequireDefault': '@babel/runtime/helpers/esm/interopRequireDefault',
    },
  },
})
