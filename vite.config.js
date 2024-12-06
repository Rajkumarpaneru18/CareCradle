import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    port: 5173, // Updated to match the devcontainer.json port
    host: true, // Ensures the dev server binds to 0.0.0.0 for container accessibility
  },
});
