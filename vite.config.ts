import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 相对路径：部署在 GitHub Pages 的 /<仓库名>/ 子路径下也能找到资源（路由用的是 hash，不受影响）
  base: "./",
  plugins: [react()],
  build: {
    // three.js 核心单包约 670 kB（gzip ~170 kB），是按需懒加载的 3D 运行时
    chunkSizeWarningLimit: 720,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three/examples")) return "three-extras";
          if (id.includes("node_modules/three")) return "three-core";
          if (id.includes("node_modules/@react-three") || id.includes("node_modules/react-reconciler")) return "r3f";
          if (id.includes("/src/data/films/") || id.endsWith("anatomy-atlas.json") || id.endsWith("voice-manifest.json")) {
            return "films-data";
          }
        }
      }
    }
  }
});
