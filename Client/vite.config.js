import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE_URL = "http://localhost:5000";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGJhMTg3NzkyOTViMjRmZmNlZjk5MTBhMDAyMTU1ZCIsInN1YiI6IjY1NTE1OGVlZWE4NGM3MTA5MjI1Mjg4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETuLDtIAzzzar9IyjxFs9WqmRA3So8E0zR45SXbqksw";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_BASE_URL": JSON.stringify(API_BASE_URL),
    "process.env.API_KEY": JSON.stringify(API_KEY),
  },
});
