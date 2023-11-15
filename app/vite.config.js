import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:4001'
    //   }
    // },
    port: 3000
  }
})
