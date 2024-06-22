import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE_URL = "http://localhost:5000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_BASE_URL": JSON.stringify(API_BASE_URL),
  },
});
