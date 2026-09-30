import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    host: '0.0.0.0', // Permite conexiones desde fuera del contenedor
    port: 3000,
    watch: {
      usePolling: true, // Requerido en entornos Docker para detectar cambios de archivos
    },
  },
});
