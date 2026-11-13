// 自动用无头 Edge / Chrome 打开 #/q/<问题id>（静音），截取每场戏的关键画面 PNG，方便快速过目排版。
// 用法：
//   npm run film-shots -- sneeze
//   npm run film-shots -- dual-task look-like aging --mobile
//   npm run film-shots -- sneeze --out ./shots
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { films } from "../src/data/films/index.ts";
import { sceneStart } from "../src/lib/film.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function findBrowser() {
  const env = process.env.BROWSER_BIN;
  if (env && existsSync(env)) return env;
  const candidates = process.platform === "win32"
    ? [
        join(process.env.ProgramFiles ?? "C:\\Program Files", "Microsoft\\Edge\\Application\\msedge.exe"),
        join(process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)", "Microsoft\\Edge\\Application\\msedge.exe"),
        join(process.env.ProgramFiles ?? "C:\\Program Files", "Google\\Chrome\\Application\\chrome.exe"),
        join(process.env.LOCALAPPDATA ?? "", "Google\\Chrome\\Application\\chrome.exe")
      ]
    : process.platform === "darwin"
      ? [
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        ]
      : ["/usr/bin/google-chrome", "/usr/bin/microsoft-edge", "/usr/bin/chromium", "/usr/bin/chromium-browser"];
  const hit = candidates.find((p) => p && existsSync(p));
  if (!hit) throw new Error("找不到 Edge 或 Chrome，可设置环境变量 BROWSER_BIN 指向浏览器可执行文件");
  return hit;
}

function launchBrowser(bin, userDataDir) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(bin, [
      "--headless=new",
      "--disable-gpu",
      "--mute-audio",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${userDataDir}`,
      "--remote-debugging-port=0",
      "about:blank"
    ], { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    const timer = setTimeout(() => reject(new Error(`浏览器启动超时：${stderr.slice(-300)}`)), 15000);
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolvePromise({ child, wsUrl: match[1] });
      }
    });
    child.on("error", (err) => { clearTimeout(timer); reject(err); });
  });
}

class CdpSession {
  constructor(ws) {
    this.ws = ws;
    this.seq = 0;
    this.pending = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(String(event.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject: fail } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) fail(new Error(msg.error.message));
        else ok(msg.result);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.seq;
    return new Promise((ok, fail) => {
      this.pending.set(id, { resolve: ok, reject: fail });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
}

const safeSlug = (text) => text.replace(/[\\/:*?"<>|\s]+/g, "-").slice(0, 20);

const args = process.argv.slice(2);
const withMobile = args.includes("--mobile");
const outIdx = args.indexOf("--out");
const outBase = outIdx >= 0 && args[outIdx + 1] ? resolve(args[outIdx + 1]) : join(tmpdir(), "bodyverse-shots");
const ids = args.filter((arg, i) => !arg.startsWith("--") && (outIdx < 0 || i !== outIdx + 1));

if (ids.length === 0) {
  console.log("用法：npm run film-shots -- <问题id>... [--mobile] [--out <目录>]");
  process.exit(1);
}

const byId = new Map(films.map((f) => [f.question, f]));
for (const id of ids) {
  if (!byId.has(id)) {
    console.error(`找不到问题 "${id}" 的动画`);
    process.exit(1);
  }
}

const vite = await createServer({ root, server: { port: 0, host: "127.0.0.1" }, logLevel: "error" });
await vite.listen();
const port = vite.httpServer.address().port;
const origin = `http://127.0.0.1:${port}`;

const profileDir = mkdtempSync(join(tmpdir(), "bodyverse-headless-"));
const browserBin = findBrowser();
const { child: browserProc, wsUrl } = await launchBrowser(browserBin, profileDir);

try {
  const ws = new WebSocket(wsUrl);
  await new Promise((ok, fail) => { ws.addEventListener("open", ok, { once: true }); ws.addEventListener("error", fail, { once: true }); });
  const cdp = new CdpSession(ws);
  const { targetId } = await cdp.send("Target.createTarget", { url: `${origin}/#/` });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => cdp.send(method, params, sessionId);

  await page("Page.enable");
  await page("Runtime.enable");

  const evalJs = async (expression) => {
    const res = await page("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (res.exceptionDetails) throw new Error(res.exceptionDetails.text);
    return res.result?.value;
  };

  const viewports = [
    { tag: "wide", width: 1280, height: 900, mobile: false, scale: 1.5 },
    ...(withMobile ? [{ tag: "mobile", width: 390, height: 844, mobile: true, scale: 2 }] : [])
  ];

  for (const id of ids) {
    const film = byId.get(id);
    const dir = join(outBase, id);
    mkdirSync(dir, { recursive: true });

    for (const vp of viewports) {
      await page("Emulation.setDeviceMetricsOverride", {
        width: vp.width, height: vp.height, deviceScaleFactor: vp.scale, mobile: vp.mobile
      });
      await page("Page.navigate", { url: `${origin}/#/q/${id}` });
      await evalJs(`(async () => {
        localStorage.setItem("bodyverse-film-voice", "off");
        sessionStorage.setItem("body-mystery-parent-ok-${id}", "1");
        location.reload();
      })()`);
      await evalJs(`new Promise((resolve, reject) => {
        const deadline = Date.now() + 12000;
        const poll = () => {
          const range = document.querySelector('.film-controls input[type="range"]');
          if (range) {
            const playBtn = document.querySelector('.film-play');
            if (playBtn && playBtn.getAttribute('aria-label') === '暂停') playBtn.click();
            resolve(true);
          } else if (Date.now() > deadline) reject(new Error('等待播放器超时'));
          else setTimeout(poll, 80);
        };
        poll();
      })`);

      for (let i = 0; i < film.scenes.length; i += 1) {
        const scene = film.scenes[i];
        const targetTime = sceneStart(film, i) + scene.duration * 0.72;
        const rect = await evalJs(`(async () => {
          const range = document.querySelector('.film-controls input[type="range"]');
          const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
          setter.call(range, String(${targetTime.toFixed(2)}));
          range.dispatchEvent(new Event('input', { bubbles: true }));
          range.dispatchEvent(new Event('change', { bubbles: true }));
          await Promise.all(
            Array.from(document.querySelectorAll('.film-stage image')).map((node) => {
              const href = node.getAttribute('href');
              if (!href) return Promise.resolve();
              const img = new Image();
              img.src = href;
              return img.decode().catch(() => undefined);
            })
          );
          await new Promise((r) => setTimeout(r, 140));
          const box = document.querySelector('.film').getBoundingClientRect();
          return { x: Math.max(0, box.x), y: Math.max(0, box.y), width: box.width, height: box.height };
        })()`);
        const { data } = await page("Page.captureScreenshot", {
          format: "png",
          clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 }
        });
        const prefix = viewports.length > 1 ? `${vp.tag}-` : "";
        const file = join(dir, `${prefix}${String(i + 1).padStart(2, "0")}-${safeSlug(scene.title)}.png`);
        writeFileSync(file, Buffer.from(data, "base64"));
        console.log(file);
      }
    }
  }
  ws.close();
} finally {
  browserProc.kill();
  await vite.close();
  try { rmSync(profileDir, { recursive: true, force: true }); } catch { /* Windows 偶发句柄延迟释放 */ }
}
