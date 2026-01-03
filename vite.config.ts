<<<<<<< HEAD
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'
>>>>>>> feature/dashboard-com-filtros-sparklines

export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
=======
  plugins: [react(),  tailwindcss()],
>>>>>>> feature/dashboard-com-filtros-sparklines
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
})
=======
});
>>>>>>> feature/dashboard-com-filtros-sparklines
