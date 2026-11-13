# AGENTS.md：给接手这个仓库的代码助手

## 这是什么

「🚀 身体奇遇记」：给 4–12 岁孩子的身体科普网站。小念（男孩）遇到一件身体上的怪事，问爸爸；爸爸回答，小念接着爸爸的话追问，5–8 轮一路讲到原理，最后小念用自己的话总结。每个问题都配一部讲解动画：解剖图集作底图，一场戏配一轮问答，小念和爸爸的配音把整段问答读出来，动画跟着声音走。

技术栈：React 18 + TypeScript（strict）+ Vite 5，3D 部分用 three + @react-three/fiber。Hash 路由，没有后端，所有内容都是 `src/data/` 里的 TypeScript 数据。

**写内容、写动画、调页面样式之前，先读 `skills/bodyverse-explainer/SKILL.md`**。那里写的是这个项目的讲法、画法和页面风格，照着做出来的东西才和现有内容是一个样子。

## 命令

需要 Node.js 22.18+，测试和脚本直接用 Node 的 TypeScript 类型擦除跑 `.ts` 文件。

| 命令 | 作用 |
|---|---|
| `npm run dev` | 开发服务器 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | 全部测试（`node --test tests/*.test.mjs`） |
| `npm run build` | 生产构建（按路由与 3D 引擎拆包输出到 `dist/`） |
| `npm run new-question -- <系统> <问题id> [标题] [--write]` | 生成新问题的问答 + 动画空白模板 |
| `node tests/dialogue-rules.mjs src/data/questions/<系统>.ts` | 检查问答写法 |
| `node tests/film-rules.mjs [src/data/films/<系统>.ts]` | 检查动画（含解剖底图、越界、标题/误会卡遮挡、标签互叠） |
| `node tools/atlas/anchors.mjs <视角>` | 列出某个视角的图层和器官锚点坐标 |
| `npm run voice [-- <问题id>...]` | 给新的或改过的问答句子配音（见下文） |
| `npm run film-shots -- <问题id>... [--mobile]` | 无头浏览器静音截出每场戏的关键画面 PNG |

交付前四个都要过：`npm run typecheck`、`npm test`、`node tests/film-rules.mjs`、`npm run build`。

## 地图

| 路由 | 页面 | 文件 |
|---|---|---|
| `#/` | 首页：标题、小念和爸爸的 3D 场景、9 个身体部位 | `src/pages/HomePage.tsx` |
| `#/topic/<系统>` | 一个部位的问题列表，按入门 / 进阶 / 挑战排 | `src/pages/QuestionListPage.tsx` |
| `#/q/<问题id>` | 一问一答 + 讲解动画 | `src/pages/QuestionPage.tsx` |
| `#/journey/<heart\|lungs>[/<尺度>]` | 全身 → 器官 → 组织 → 细胞 → 分子的 3D 放大旅程 | `src/components/journey/` |
| `#/part/<部位>` | 旧的部位页（心脏探索样板等） | `src/pages/PartPage.tsx` |

内容和引擎：

- `src/data/questions/<系统>.ts`：问题和问答，类型在 `types.ts`。9 个系统：`brain` `senses` `heart-blood` `breathe` `digest` `skin` `move` `defend` `grow`。新问题加进对应文件就会出现在列表里。
- `src/data/films/<系统>.ts`：每个问题一部动画，格式见 `types.ts`，汇总在 `index.ts`。
- `src/lib/film.ts`：时间线、镜头、锚点解析，全是纯函数；`src/components/film/FilmStage.tsx` 把某一时刻画成 SVG，`FilmPlayer.tsx` 管播放、拖动、分段和配音同步。
- `src/lib/narration.ts`：配音版时间线。按每轮问答的配音长度把对应的戏等比例拉长。
- `src/data/voice.ts` + `src/data/voice-manifest.json`：配音的时长和指纹；音频在 `public/voice/<问题id>/<轮次>-<nian|dad>.mp3`。
- `src/data/anatomy-atlas.json` + `public/anatomy/<视角>/<图层>.webp`：解剖图集。
- `tools/atlas/`：从 BodyVista 的 Z-Anatomy 模型渲染图集的工具。
- `tools/voice/`：配音生成工具。声音设置在 `voices.mjs`。
- `src/components/journey/`、`src/components/RunLab*.tsx`：3D 旅程和"跑一跑"实验，独立于问答和动画。

## 加一个新问题

可以先跑 `npm run new-question -- <系统> <问题id> "标题？" --write` 生成符合格式的空白骨架，再逐步填：

1. **问答**：写进 `src/data/questions/<系统>.ts`，跑 `node tests/dialogue-rules.mjs` 直到通过。
2. **动画**：写进 `src/data/films/<系统>.ts`，跑 `node tests/film-rules.mjs src/data/films/<系统>.ts` 直到通过。
3. **配音**：跑 `npm run voice -- <问题id>`，会生成音频并更新 manifest。要联网，需要 `python -m pip install edge-tts`，PATH 里要有 ffmpeg / ffprobe。
4. **测试**：`npm test`。`tests/films.test.mjs` 要求每个问题都有动画，`tests/voice.test.mjs` 要求每句话都有配音而且读的是现在的文字。改了问答里任何一个字，都要重新跑第 3 步。
5. **过目画面**：跑 `npm run film-shots -- <问题id> --mobile` 截出宽屏和手机宽度（390px）下每场戏的关键画面检查排版，再在浏览器里打开 `#/q/<问题id>` 听一遍配音节奏。

## 硬性规矩

- **孩子的内容**：
  - 不编数字。屏幕上的数字必须是爸爸台词里说过的。
  - 不用术语表里的词，见 `tests/dialogue-rules.mjs` 的 `jargon`。
  - 何时就医写在 `parentTip`。
  - 生殖相关的问题用 `parentGate`，要大人确认后才打开。
  - 图集里不渲染生殖器官，全身皮肤层穿着蓝色短裤，不要改掉。
- **小念是男孩**，用"他"；配音是 `zh-CN-YunxiaNeural`。爸爸是 `zh-CN-YunxiNeural`。
- **素材许可**：
  - 解剖图集来自 Z-Anatomy（经 BodyVista），CC-BY-SA 4.0，部分来源限非商业或仅限研究。家庭和非商业使用可以；公开发布或商用前，要按 `public/anatomy/CREDITS.md` 逐个来源核查。
  - 配音由微软 Edge 在线语音生成，同样只按非商业使用考虑。
  - 新素材要在对应的 `CREDITS.md` 和 `THIRD_PARTY_NOTICES.md` 里写明来源。
- **代码风格**：照周围代码写。中文注释只写代码本身表达不了的约束；改动要小而完整，不顺手重构无关代码。

## 已知的坑

- **`.ts` 扩展名**：Node 直接跑 `.ts`，所以 `src/data/` 和 `src/lib/` 里被测试导入的文件，相互导入时要写 `.ts` 扩展名（如 `./motion.ts`）。`tsconfig` 开了 `allowImportingTsExtensions`。
- **`.webp` 读不了**：图像读取工具打不开 `.webp`。要看图集图片或动画，在浏览器里打开开发服务器上的页面或图片，再截图。
- **手部视角**：皮肤模型比手指骨短，皮肤不能和骨骼、肌肉、血管同时出现，检查器会拦。
- **配音会串**：
  - 播放器同一时间只让一部动画出声，切到后台也会暂停。
  - 自己测试时别在多个标签页里开着有声动画，免得和用户正在看的页面串音。
  - 用浏览器测有声动画，测完把它暂停，或者离开问答页。
- **并行写文件**：几个代理同时往 `src/` 写大文件时，Vite 可能报 EBUSY 退出，重启 `npm run dev` 即可。
- **重新渲染图集**：需要旁边有 BodyVista 仓库（`node tools/atlas/server.mjs ../BodyVista`，然后浏览器打开 `http://localhost:5199`）。图集一变，所有动画的坐标都要重查，轻易不要动。
