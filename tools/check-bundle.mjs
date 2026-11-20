// 构建后检查首屏要下载的脚本（入口和它预加载的包），npm run build 的最后一步。
// 首屏只该有 React、页面外壳和题目目录：3D 引擎、问答正文、动画数据都必须是按需加载的。
import { readFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const html = readFileSync(new URL("index.html", dist), "utf8");
const scripts = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^"]+\.js)"/g)].map((match) => match[1]);

const rules = [
  { found: (name) => /three|r3f/.test(name), why: "3D 引擎被首屏引用了（检查 vite.config.ts 的 manualChunks）" },
  { found: (name, code) => code.includes("dialogue:["), why: "问答正文被打进了首屏（页面代码要用 loadQuestion，不要引入 questions/all.ts 或各部位的问答文件）" },
  { found: (name, code) => code.includes("cues:["), why: "动画数据被打进了首屏（页面代码要用 loadFilm，不要引入 films/index.ts 或各部位的动画文件）" }
];

const problems = scripts.length === 0 ? ["dist/index.html 里没找到入口脚本"] : [];
let bytes = 0;
for (const name of scripts) {
  const code = readFileSync(new URL(name, dist), "utf8");
  bytes += Buffer.byteLength(code);
  for (const rule of rules) if (rule.found(name, code)) problems.push(`${name}：${rule.why}`);
}

if (problems.length > 0) {
  console.error(`首屏检查没通过：\n${problems.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`首屏检查通过：${scripts.length} 个脚本，共 ${(bytes / 1024).toFixed(0)} kB（未压缩）`);
}
