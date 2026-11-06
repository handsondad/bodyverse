// 解剖图集渲染工具：本地起一个小服务器，浏览器打开 http://localhost:5199/ 后
// 自动从 BodyVista 的 full_body.glb 里挑出器官，按统一相机渲染成对齐的图层，
// 再把 WebP 图片写到 public/anatomy/，把锚点写到 src/data/anatomy-atlas.json。
//
// 用法：node tools/atlas/server.mjs [BodyVista 仓库路径]
import { createReadStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const bodyVista = resolve(process.argv[2] ?? join(root, "../BodyVista"));
const port = 5199;

const routes = {
  "/": join(root, "tools/atlas/index.html"),
  "/render.js": join(root, "tools/atlas/render.js"),
  "/layers.js": join(root, "tools/atlas/layers.js"),
  "/model.glb": join(bodyVista, "assets/full_body.glb"),
  "/catalog.json": join(bodyVista, "catalog.json")
};
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".glb": "model/gltf-binary" };

for (const file of [routes["/model.glb"], routes["/catalog.json"]]) {
  if (!existsSync(file)) throw new Error(`找不到 ${file}，请把 BodyVista 仓库路径作为参数传进来`);
}

function readBody(req) {
  return new Promise((done, fail) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => done(Buffer.concat(chunks)));
    req.on("error", fail);
  });
}

function inside(base, path) {
  const full = normalize(join(base, path));
  if (!full.startsWith(base)) throw new Error(`拒绝写到 ${base} 之外：${path}`);
  return full;
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${port}`);
  try {
    if (req.method === "POST" && url.pathname === "/save") {
      const file = inside(join(root, "public/anatomy"), url.searchParams.get("path") ?? "");
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, await readBody(req));
      console.log("写入", file);
      res.end("ok");
      return;
    }
    if (req.method === "POST" && url.pathname === "/atlas") {
      const file = join(root, "src/data/anatomy-atlas.json");
      writeFileSync(file, await readBody(req));
      console.log("写入", file);
      res.end("ok");
      return;
    }
    const file = url.pathname.startsWith("/three/")
      ? inside(join(root, "node_modules/three"), url.pathname.slice("/three/".length))
      : routes[url.pathname];
    if (!file || !existsSync(file)) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    res.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
    res.setHeader("Cache-Control", "no-store");
    createReadStream(file).pipe(res);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end(String(error));
  }
}).listen(port, () => console.log(`解剖图集工具：http://localhost:${port}/`));
