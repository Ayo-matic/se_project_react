import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Base path reset to "/" for this sprint: BrowserRouter matches routes
  // against the root, and the GitHub Pages deployment is intentionally not
  // updated for Project 11 (json-server only runs locally).
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
