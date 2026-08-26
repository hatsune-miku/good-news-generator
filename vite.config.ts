import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// GitHub Pages publishes this project under /good-news-generator/.
// Keep the development server at / so local development remains unchanged.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/good-news-generator/" : "/",
  plugins: [react()],
}));
