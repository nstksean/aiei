import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.tsx/*.jsx",
  })],
  server:{
    host: '0.0.0.0',
    watch:{
      usePolling: true 
    }
  }
})
