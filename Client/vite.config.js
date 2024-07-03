import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_URL, API_KEY } = process.env;

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_BASE_URL": JSON.stringify(API_BASE_URL),
    "process.env.API_KEY": JSON.stringify(API_KEY),
  },
});
