import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const catalogScript = fileURLToPath(new URL("./tools/catalog.mjs", import.meta.url));

/** 题目目录（src/data/questions/catalog.ts）是从问答数据生成的：启动、构建和改动问答文件时自动重新生成 */
function questionCatalog(): Plugin {
  const generate = () => execFileSync(process.execPath, [catalogScript], { stdio: "inherit" });
  return {
    name: "bodyverse-question-catalog",
    buildStart: generate,
    handleHotUpdate({ file }) {
      if (!file.includes("/src/data/questions/") || file.endsWith("/catalog.ts")) return;
      try {
        generate();
      } catch {
        // 问答文件写到一半时生成会失败，错误已经打印出来；下次保存再试，不让开发服务器退出
      }
    }
  };
}

export default defineConfig({
  // 相对路径：部署在 GitHub Pages 的 /<仓库名>/ 子路径下也能找到资源（路由用的是 hash，不受影响）
  base: "./",
  plugins: [questionCatalog(), react()],
  build: {
    // three.js 核心单包约 670 kB（gzip ~170 kB），是按需懒加载的 3D 运行时
    chunkSizeWarningLimit: 720,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React 必须自己成包：Rollup 会把手动分包模块的依赖一起带走，
          // 不单列的话 React 会被并进 r3f 包，首屏就得先下载整个 three.js
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          if (id.includes("node_modules/three/examples")) return "three-extras";
          if (id.includes("node_modules/three")) return "three-core";
          if (id.includes("node_modules/@react-three") || id.includes("node_modules/react-reconciler")) return "r3f";
        }
      }
    }
  }
});
