import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "src/admin_dashboard/src",
  plugins: [react()],
  build: {
    outDir: "../../../dist/admin_dashboard",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/admin_dashboard/src"),
    },
  },
  server: {
    port: 5173,
  },
});
