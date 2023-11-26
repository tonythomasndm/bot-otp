import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'bot-otp.onrender.com',
    https: true,
  },
  plugins: [react()],
})
