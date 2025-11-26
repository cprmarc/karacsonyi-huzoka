import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ez a beállítás kritikus a GitHub Pages működéséhez
  // A './' biztosítja, hogy a fájlok relatív útvonalon töltődjenek be
  base: './',
})