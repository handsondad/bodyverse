// 讲解动画的规则检查：结构、时间、锚点，以及「在镜头里看不看得见」「同时出现的东西会不会太挤」。
// 用法：node tests/film-rules.mjs [src/data/films/<系统>.ts]
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { cameraAt, resolvePoint } from "../src/lib/film.ts";

export const atlas = JSON.parse(readFileSync(new URL("../src/data/anatomy-atlas.json", import.meta.url), "utf8"));

const limits = {
  sceneSeconds: [4, 14],
  filmSeconds: [30, 110],
  title: 12,
  label: 12,
  text: 14,
  myth: 18,
  shapeText: 6,
  arrowText: 10,
  countLabel: 8,
  zoom: [1, 2.6],
  busy: 8
};

const isTuple = (point) => Array.isArray(point);
const chars = (text) => [...text].length;

function inBox([x, y], box, margin = 0) {
  return x >= box.x - margin && x <= box.x + box.width + margin && y >= box.y - margin && y <= box.y + box.height + margin;
}

/** 跟 FilmStage 里的标签摆放一致：返回标签框中心和宽高（画面坐标） */
function labelBox(cue, view, k) {
  const [ax, ay] = resolvePoint(cue.at, view);
  const side = cue.side ?? (ax < 600 ? "left" : "right");
  const offset = { left: [-170 * k, -40 * k], right: [170 * k, -40 * k], top: [0, -120 * k], bottom: [0, 120 * k] }[side];
  const [px, py] = cue.pos ? resolvePoint(cue.pos, view) : [ax + offset[0], ay + offset[1]];
  const size = 30 * k;
  return { at: [px, py], width: chars(cue.text) * size + 28 * k, height: size + 20 * k };
}

function captionAt(point, view, camera) {
  if (!isTuple(point)) return resolvePoint(point, view);
  return [camera.x + (point[0] / 1200) * camera.width, camera.y + (point[1] / 900) * camera.height];
}

function cuePoints(cue) {
  switch (cue.kind) {
    case "label": return [cue.at, ...(cue.pos ? [cue.pos] : [])];
    case "highlight": return [cue.at];
    case "pulse": case "shape": case "text": case "count": case "meter": return [cue.at];
    case "flow": case "arrow": case "sprite": return cue.path;
    default: return [];
  }
}

/** 返回这部动画的问题列表，空数组表示通过 */
export function filmProblems(film, question) {
  const problems = [];
  const say = (where, text) => problems.push(`${film.question} ${where}：${text}`);
  if (!question) return [`${film.question}：找不到这个问题`];
  if (film.scenes.length < 4) say("全片", `至少要 4 场戏，现在 ${film.scenes.length} 场`);

  const total = film.scenes.reduce((sum, scene) => sum + scene.duration, 0);
  if (total < limits.filmSeconds[0] || total > limits.filmSeconds[1]) say("全片", `总长 ${total} 秒，应在 ${limits.filmSeconds.join("～")} 秒`);

  const turns = film.scenes.map((scene) => scene.turn);
  if (turns[0] !== 0) say("全片", "第一场戏要配第 0 轮问答");
  turns.forEach((turn, i) => {
    if (!Number.isInteger(turn) || turn < 0 || turn >= question.dialogue.length) say(`第${i + 1}场`, `turn ${turn} 超出对话范围`);
    if (i > 0 && turn < turns[i - 1]) say(`第${i + 1}场`, "场次要按对话顺序排列");
  });
  const covered = new Set(turns).size;
  if (covered < question.dialogue.length - 1) say("全片", `只配了 ${covered} 轮问答，对话有 ${question.dialogue.length} 轮，最多只能空一轮`);

  film.scenes.forEach((scene, i) => {
    const where = `第${i + 1}场「${scene.title}」`;
    const view = scene.view === "blank" ? undefined : atlas.views[scene.view];
    if (scene.view !== "blank" && !view) { say(where, `没有视角 ${scene.view}`); return; }
    if (chars(scene.title) > limits.title) say(where, `标题超过 ${limits.title} 个字`);
    if (scene.duration < limits.sceneSeconds[0] || scene.duration > limits.sceneSeconds[1]) say(where, `时长 ${scene.duration} 秒，应在 ${limits.sceneSeconds.join("～")} 秒`);
    if (scene.cues.length < 2) say(where, "至少要有 2 个动画元素");
    if (scene.view === "blank" && scene.layers?.length) say(where, "空白画布不能放解剖图层");
    if (view && !scene.layers?.length) say(where, "用了解剖视角就要放至少一个图层");
    for (const use of scene.layers ?? []) {
      const layer = typeof use === "string" ? use : use.layer;
      if (view && !view.layers[layer]) say(where, `视角 ${scene.view} 没有图层 ${layer}`);
    }
    if (scene.view === "hand") {
      const span = (use) => typeof use === "string" ? [0, scene.duration] : [use.from ?? 0, use.to ?? scene.duration];
      const uses = scene.layers ?? [];
      const skin = uses.filter((use) => (typeof use === "string" ? use : use.layer) === "skin");
      const inner = uses.filter((use) => (typeof use === "string" ? use : use.layer) !== "skin");
      const overlap = skin.some((a) => inner.some((b) => Math.min(span(a)[1], span(b)[1]) - Math.max(span(a)[0], span(b)[0]) > 0.6));
      if (overlap) say(where, "手部视角的皮肤模型比骨骼短，皮肤不能和其他图层同时出现，请分场或先淡出皮肤");
    }

    const keys = scene.camera ?? [];
    keys.forEach((key, j) => {
      if (key.zoom < limits.zoom[0] || key.zoom > limits.zoom[1]) say(where, `镜头放大 ${key.zoom} 倍，应在 ${limits.zoom.join("～")} 倍`);
      if (key.t < 0 || key.t > scene.duration) say(where, `镜头关键帧 t=${key.t} 超出时长`);
      if (j > 0 && key.t <= keys[j - 1].t) say(where, "镜头关键帧的时间要递增");
      try { resolvePoint(key.at, view); } catch (error) { say(where, `镜头：${error.message}`); }
    });

    scene.cues.forEach((cue, j) => {
      const at = `${where} 第${j + 1}个(${cue.kind})`;
      if (!(cue.from >= 0) || cue.from > scene.duration - 0.8) say(at, `from=${cue.from} 太晚或无效，这场戏只有 ${scene.duration} 秒`);
      if (cue.to !== undefined && (cue.to <= cue.from + 0.5 || cue.to > scene.duration)) say(at, `to=${cue.to} 无效`);

      const points = cuePoints(cue);
      if ((cue.kind === "flow" || cue.kind === "arrow") && points.length < 2) say(at, "路线至少要两个点");
      if (cue.kind === "sprite" && points.length < 1) say(at, "至少要一个点");
      if (cue.kind === "highlight" && typeof cue.at !== "string") say(at, "highlight 的 at 要写锚点名");
      let resolved;
      try {
        resolved = points.map((point) => resolvePoint(point, view));
      } catch (error) {
        say(at, error.message);
        return;
      }
      for (const [x, y] of resolved) if (x < -150 || x > 1350 || y < -150 || y > 1050) say(at, `坐标 (${x}, ${y}) 远在画面外`);

      const textLimit = { label: limits.label, text: limits.text, shape: limits.shapeText, arrow: limits.arrowText }[cue.kind];
      const text = cue.text ?? "";
      if (textLimit && chars(text) > textLimit) say(at, `文字「${text}」超过 ${textLimit} 个字`);
      if (cue.kind === "myth" && (chars(cue.wrong) > limits.myth || chars(cue.right) > limits.myth)) say(at, `误会卡每句不超过 ${limits.myth} 个字`);
      if ((cue.kind === "count" || cue.kind === "meter") && chars(cue.label) > limits.countLabel) say(at, `标题「${cue.label}」超过 ${limits.countLabel} 个字`);
      if (cue.kind === "meter" && [cue.start, cue.end].some((v) => v < 0 || v > 1)) say(at, "meter 的 start、end 要在 0～1");

      // 出现后半秒，镜头里要看得见
      const t = Math.min(cue.from + 0.5, scene.duration);
      const camera = cameraAt(scene.camera, t, view);
      const k = 1 / camera.zoom;
      const margin = 10 * k;
      if (cue.kind === "label") {
        const box = labelBox(cue, view, k);
        const [cx, cy] = box.at;
        const corners = [[cx - box.width / 2, cy - box.height / 2], [cx + box.width / 2, cy + box.height / 2]];
        if (!corners.every((corner) => inBox(corner, camera, margin))) say(at, `标签「${cue.text}」有一部分在镜头外，换个 side 或写 pos`);
        if (!inBox(resolved[0], camera)) say(at, `标签指着的位置在镜头外`);
      } else if (cue.kind === "text" || cue.kind === "count" || cue.kind === "meter") {
        const [x, y] = captionAt(cue.at, view, camera);
        const halfWidth = cue.kind === "text" ? (chars(cue.text) * { s: 34, m: 48, l: 72 }[cue.size ?? "m"] * k) / 2 : 150 * k;
        if (!inBox([x - halfWidth, y], camera, margin) || !inBox([x + halfWidth, y], camera, margin)) say(at, `「${cue.text ?? cue.label}」有一部分在镜头外`);
      } else if (cue.kind === "highlight" || cue.kind === "pulse" || cue.kind === "shape" || (cue.kind === "sprite" && resolved.length === 1)) {
        if (!inBox(resolved[0], camera)) say(at, "这个元素在镜头外");
      } else if (cue.kind === "sprite" || cue.kind === "arrow") {
        if (!inBox(resolved[resolved.length - 1], camera, 80 * k)) say(at, "路线的终点在镜头外");
      }
    });

    // 同一时刻出现的元素不要太多
    for (let t = 0.5; t < scene.duration; t += 0.5) {
      const shown = scene.cues.filter((cue) => cue.from <= t && (cue.to === undefined || cue.to > t)).length;
      if (shown > limits.busy) { say(where, `第 ${t} 秒同时有 ${shown} 个元素，太挤了（最多 ${limits.busy} 个）`); break; }
    }
  });
  return problems;
}

async function main() {
  const { bodyQuestions } = await import("../src/data/questions/index.ts");
  const files = process.argv.slice(2);
  const films = [];
  if (files.length) {
    for (const file of files) films.push(...(await import(pathToFileURL(file).href)).films);
  } else {
    films.push(...(await import("../src/data/films/index.ts")).films);
  }
  const byId = new Map(bodyQuestions.map((question) => [question.id, question]));
  const problems = films.flatMap((film) => filmProblems(film, byId.get(film.question)));
  if (problems.length) {
    console.log(problems.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`all ${films.length} films pass`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
