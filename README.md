# 🚀 身体奇遇记

给 4–12 岁孩子的身体科普网站。小念（男孩）遇到一件身体上的怪事，问爸爸；爸爸回答，小念接着爸爸的话追问，5–8 轮一路讲到原理，最后小念用自己的话总结。每个问题都配一部有配音的讲解动画。

在线访问：<https://handsondad.github.io/bodyverse/>

## 网站里有什么

- **首页**：标题、小念和爸爸的 3D 场景、关键词即搜框与「🎲 随便问一题」，以及 9 个身体部位：大脑与神经、眼耳鼻舌与平衡、心脏与血液、鼻子与肺、嘴巴肚子与便便、皮肤汗和伤口、骨头与肌肉、生病与免疫、长大与生命。
- **问题列表**：每个部位的问题按入门、进阶、挑战三档排好，一共 75 个问题，听过的会做标记。
- **一问一答**：从头读到尾就能弄懂标题里的问题。页尾除了同部位追问，还把相通原理串到别的身体部位（比如从乌青变色连到便便的颜色）；底部有折叠的「给大人」提示；「我是从哪里来的」「人为什么会变老」要大人确认后才打开。
- **讲解动画**：
  - 一场戏配一轮问答，播到哪一轮，那一轮的问答就亮起来；点回答下面的「🎬 看动画」可以直接跳到那一段。
  - 底图是解剖图集，有全身、头部正面、头部侧面、胸腔、肚子、手、胳膊、腿 8 个视角，骨头、肌肉、血管、器官分层叠放，可以单独亮起来、跳动、鼓起。
  - 画面随时可以暂停、拖进度条。
- **配音**：小念和爸爸把整段问答读出来，正在说话的气泡会亮起来，动画跟着声音走，一部大约 3 分钟。播放器右下角的 🔊 可以关掉声音，回到 1 分钟左右的无声版。
- **3D 放大旅程**：心脏和肺的相关回答能跳进「全身 → 器官 → 组织 → 细胞 → 分子」的逐层放大，开头还有「和小念一起跑一跑」的心跳实验。

## 本地运行

需要 Node.js 22.18+（测试直接用 Node 跑 `.ts` 文件）。

```bash
npm install
npm run dev
```

| 命令 | 作用 |
|---|---|
| `npm run dev` | 开发服务器 |
| `npm run typecheck` | 类型检查 |
| `npm test` | 全部测试 |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run new-question -- <系统> <问题id> [标题] [--write]` | 生成新问题的问答与动画模板 |
| `npm run voice [-- <问题id>...]` | 给新的或改过的问答配音 |
| `npm run film-shots -- <问题id>... [--mobile]` | 自动截出每场动画的关键画面供快速过目 |

## 部署

推送到 `main` 后，`.github/workflows/deploy.yml` 会跑测试、构建，并发布到 GitHub Pages。仓库 Settings → Pages 的 Source 要选 **GitHub Actions**。

资源用的是相对路径，路由用的是 `#/...`，所以放在任何子路径下都能打开，刷新也不会 404。

## 加新内容

- 给代码助手的说明：[AGENTS.md](AGENTS.md)，包括项目地图、加一个新问题的 5 个步骤、硬性规矩和已知的坑。
- 讲法、画法和页面风格：[skills/bodyverse-explainer/SKILL.md](skills/bodyverse-explainer/SKILL.md)，问答、动画、页面样式的细则分别在同目录的 `dialogue.md`、`film.md`、`design.md`。

简单说，一个新问题要做四件事：在 `src/data/questions/` 写问答，在 `src/data/films/` 写动画，跑 `npm run voice -- <问题id>` 配音，最后跑 `npm test`。问答和动画各有检查脚本：

```bash
node tests/dialogue-rules.mjs src/data/questions/<系统>.ts
node tests/film-rules.mjs src/data/films/<系统>.ts
```

## 目录

| 位置 | 内容 |
|---|---|
| `src/pages/` | 首页、问题列表、问答页 |
| `src/data/questions/` | 问答，一个身体部位一个文件 |
| `src/data/films/` | 讲解动画，一个身体部位一个文件 |
| `src/lib/film.ts`、`src/components/film/` | 动画引擎和播放器 |
| `src/lib/narration.ts`、`src/data/voice.ts` | 配音时间线 |
| `src/components/journey/` | 3D 放大旅程 |
| `public/anatomy/` | 解剖图集图层 |
| `public/voice/` | 配音音频 |
| `tools/atlas/`、`tools/voice/` | 生成图集和配音的工具，外加 `new-question.mjs` 模板生成与 `film-shots.mjs` 自动截图 |
| `tests/` | 测试和内容检查脚本 |
| `skills/` | 内容和风格的 skill |

## 素材和许可

- **解剖图集**：由 BodyVista 的 Z-Anatomy 模型渲染，CC BY-SA 4.0，部分来源带「非商用」「仅限研究」标记。详见 [public/anatomy/CREDITS.md](public/anatomy/CREDITS.md)。
- **配音**：微软 Edge 在线语音（edge-tts）生成，只按非商业使用考虑。
- **3D 角色**：CC0 模型，见 [public/models/CREDITS.md](public/models/CREDITS.md)。

完整清单见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。这个网站按家庭和非商业学习使用制作，商用前要逐个核实素材许可。
