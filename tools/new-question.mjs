// 生成一个新问题的问答 + 动画空白模板，省去手抄字段和查默认视角。
// 用法：
//   npm run new-question -- <系统> <问题id> [标题]          打印模板到终端
//   npm run new-question -- <系统> <问题id> [标题] --write  直接追加到对应数据文件末尾
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { bodyQuestions, bodySystems } from "../src/data/questions/index.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const presets = {
  brain: { view: "headSide", layers: '[{ layer: "skin", opacity: 0.3 }, { layer: "skeleton", opacity: 0.35 }, "brain"]', anchor: "brain", anchorLabel: "大脑" },
  senses: { view: "headSide", layers: '[{ layer: "skin", opacity: 0.35 }, "eyes", "brain"]', anchor: "eye", anchorLabel: "眼睛" },
  "heart-blood": { view: "chest", layers: '[{ layer: "skin", opacity: 0.3 }, { layer: "lungs", opacity: 0.35 }, { layer: "heart", motion: "beat", rate: 1.2 }, "arteries"]', anchor: "heart", anchorLabel: "心脏" },
  breathe: { view: "chest", layers: '[{ layer: "skin", opacity: 0.3 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.35 }, "airway"]', anchor: "lungs", anchorLabel: "肺" },
  digest: { view: "belly", layers: '[{ layer: "skin", opacity: 0.35 }, { layer: "liver", opacity: 0.4 }, "esophagus", { layer: "stomach", motion: "churn", rate: 0.4 }]', anchor: "stomach", anchorLabel: "胃" },
  skin: { view: "arm", layers: '["skin"]', anchor: "wrist", anchorLabel: "皮肤" },
  move: { view: "leg", layers: '[{ layer: "skin", opacity: 0.3 }, "skeleton", "muscles"]', anchor: "quads", anchorLabel: "肌肉" },
  defend: { view: "body", layers: '[{ layer: "skin", opacity: 0.35 }, "immune"]', anchor: "lymphNeck", anchorLabel: "淋巴结" },
  grow: { view: "body", layers: '[{ layer: "skin", opacity: 0.55 }, { layer: "skeleton", opacity: 0.4 }, "heart"]', anchor: "heart", anchorLabel: "身体" }
};

export function buildTemplates({ system, id, title = "为什么会这样？" }) {
  const validSystems = new Set(bodySystems.map((item) => item.id));
  if (!validSystems.has(system)) {
    throw new Error(`未知系统 "${system}"，可选：${[...validSystems].join(" ")}`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    throw new Error(`问题 id "${id}" 只能用小写字母、数字和短横线，例如 foot-asleep`);
  }
  if (bodyQuestions.some((item) => item.id === id)) {
    throw new Error(`问题 id "${id}" 已经存在`);
  }
  const normalizedTitle = title.includes("？") ? title : `${title}？`;
  const preset = presets[system];

  const questionSnippet = `  {
    id: "${id}", system: "${system}", difficulty: 1, sciences: ["生物"],
    title: "${normalizedTitle}",
    trigger: "小念刚遇到的具体场景（一句话）",
    dialogue: [
      {
        nian: "爸爸，${normalizedTitle}",
        dad: "先用一句话直接回答原因，再打一个生活里的比方，说出部位真名（比如${preset.anchorLabel}）。"
      },
      {
        // 追问必须用上爸爸上一句里的一个词
        nian: "${preset.anchorLabel}在哪里？它是怎么管的？",
        dad: "接着讲它在身体哪里、谁在配合它干活。"
      },
      {
        nian: "它们配合的时候，一步一步发生了什么？",
        dad: "把过程按先后顺序拆成两三步讲清楚。",
        show: { kind: "steps", frames: [{ icon: "1️⃣", label: "第一步" }, { icon: "2️⃣", label: "第二步" }, { icon: "3️⃣", label: "第三步" }] }
      },
      {
        nian: "为什么一步一步非得这样？有人说……是真的吗？",
        dad: "讲背后的原因，或者点名辟除一个常见误会：有人说……，那是误会，其实……"
      },
      {
        nian: "原来不是那样！那平时我该怎么做才好？",
        dad: "给一个孩子自己能做到的日常好习惯。"
      },
      {
        nian: "我懂了！把刚才的因果链用自己的话串一遍，所以才会这样！",
        dad: "夸一句，再补一个有趣的小冷知识或小提醒。"
      }
    ],
    parentTip: "补充背景，写清楚什么情况下需要带孩子看医生。"
  }`;

  const filmSnippet = `  {
    question: "${id}",
    scenes: [
      {
        turn: 0,
        title: "现象从哪儿来",
        view: "${preset.view}",
        layers: ${preset.layers},
        duration: 8,
        cues: [
          { kind: "highlight", at: "${preset.anchor}", from: 0.4 },
          { kind: "label", at: "${preset.anchor}", text: "${preset.anchorLabel}", side: "right", from: 1 },
          { kind: "text", at: [600, 810], text: "核心原因关键词", from: 3.2 }
        ]
      },
      {
        turn: 1,
        title: "谁在管这件事",
        view: "${preset.view}",
        layers: ${preset.layers},
        duration: 8,
        cues: [
          { kind: "pulse", at: "${preset.anchor}", color: "#ffcf3f", from: 0.4 },
          { kind: "label", at: "${preset.anchor}", text: "在这里工作", side: "left", from: 1.2 }
        ]
      },
      {
        turn: 2,
        title: "一步步怎么发生",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "pill", at: [300, 440], size: [240, 100], color: "#ffe08a", text: "第一步", from: 0.4 },
          { kind: "arrow", path: [[440, 440], [740, 440]], text: "接着", from: 1.4 },
          { kind: "shape", shape: "pill", at: [900, 440], size: [240, 100], color: "#bfe3ff", text: "第二步", from: 2.2 }
        ]
      },
      {
        turn: 3,
        title: "常见误会",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🤔", path: [[600, 320]], size: 120, from: 0.3 },
          { kind: "myth", wrong: "常见错误说法（≤18字）", right: "真实情况（≤18字）", from: 1.6 }
        ]
      },
      {
        turn: 4,
        title: "平时怎么做",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "✅", path: [[600, 360]], size: 110, from: 0.4 },
          { kind: "text", at: [600, 620], text: "日常好习惯关键词", color: "#2f7d32", from: 1.4 }
        ]
      }
    ]
  }`;

  return { questionSnippet, filmSnippet, preset };
}

function appendToArrayFile(filePath, snippet) {
  const src = readFileSync(filePath, "utf8");
  const idx = src.lastIndexOf("];");
  if (idx < 0) throw new Error(`找不到数组结尾 "];"：${filePath}`);
  const before = src.slice(0, idx).trimEnd();
  const comma = before.endsWith("[") ? "" : ",";
  writeFileSync(filePath, `${before}${comma}\n${snippet}\n${src.slice(idx)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const positional = args.filter((arg) => !arg.startsWith("--"));
  const [system, id, title] = positional;
  if (!system || !id) {
    console.log("用法：npm run new-question -- <系统> <问题id> [标题] [--write]");
    console.log(`系统可选：${bodySystems.map((item) => item.id).join(" ")}`);
    process.exitCode = 1;
  } else {
    const { questionSnippet, filmSnippet, preset } = buildTemplates({ system, id, title });
    const qFile = `src/data/questions/${system}.ts`;
    const fFile = `src/data/films/${system}.ts`;
    if (write) {
      appendToArrayFile(join(root, qFile), questionSnippet);
      appendToArrayFile(join(root, fFile), filmSnippet);
      console.log(`已追加模板到 ${qFile} 和 ${fFile}`);
    } else {
      console.log(`// === 1. 问答模板（加进 ${qFile}）===\n${questionSnippet}\n`);
      console.log(`// === 2. 动画模板（加进 ${fFile}）===\n${filmSnippet}\n`);
    }
    console.log("下一步清单：");
    console.log(`  1. 查这个视角的锚点：node tools/atlas/anchors.mjs ${preset.view}`);
    console.log(`  2. 改完问答跑检查：  node tests/dialogue-rules.mjs ${qFile}`);
    console.log(`  3. 改完动画跑检查：  node tests/film-rules.mjs ${fFile}`);
    console.log(`  4. 生成配音：        npm run voice -- ${id}`);
    console.log(`  5. 截关键画面过目：  npm run film-shots -- ${id} --mobile`);
    console.log("  6. 全量验证：        npm run typecheck && npm test && npm run build");
  }
}
