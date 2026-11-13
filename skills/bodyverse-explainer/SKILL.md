---
name: bodyverse-explainer
description: >-
  Writes new 身体奇遇记 content in the house style: a 小念 × 爸爸 question-and-answer dialogue,
  a matching narrated explainer animation on the anatomy atlas, the voice clips, and page UI
  that fits the existing warm, kid-friendly design. Use when adding or revising a body question,
  writing or fixing an explainer film (src/data/films), generating narration, adding a body system,
  or styling pages in the bodyverse repo, or when the user mentions 小念, 爸爸, 讲解动画, 配音,
  解剖图集, 身体部位 or 新问题.
---

# 身体奇遇记：写问答、做讲解动画

目标只有一个：孩子从头听到尾，就真的弄懂了标题里的那个问题。问答负责把道理讲对、讲顺，动画负责让孩子"看见"道理，配音让孩子不认字也能跟着听。三样东西讲同一件事，节奏一致。

## 先弄清楚

- 仓库结构、命令、硬性规矩见根目录 `AGENTS.md`。
- 问答怎么写：[dialogue.md](dialogue.md)
- 动画怎么做（数据格式、元素、配方、排版）：[film.md](film.md)
- 页面风格（颜色、字体、圆角、气泡、卡片）：[design.md](design.md)

## 做一个新问题

照这个清单走，每一步过了检查再走下一步：

```
- [ ] 1. 选题与骨架：小念真会遇到的一件事，可先跑 npm run new-question -- <系统> <问题id> "标题？" --write 生成模板
- [ ] 2. 问答：写进 src/data/questions/<系统>.ts → node tests/dialogue-rules.mjs <文件> 通过
- [ ] 3. 核对科学：每个说法都站得住；拿不准的写"科学家还不完全确定"；不编数字
- [ ] 4. 分镜：每轮问答一场戏，先列出每场的视角、出现顺序和那一句台词
- [ ] 5. 动画：写进 src/data/films/<系统>.ts → node tests/film-rules.mjs <文件> 通过
- [ ] 6. 配音：npm run voice -- <问题id>
- [ ] 7. npm run typecheck && npm test && npm run build
- [ ] 8. 画面与声音验收：npm run film-shots -- <问题id> --mobile 看宽屏和手机排版，再开 #/q/<问题id> 从头听一遍
```

## 讲法（问答）

- **小念是男孩**，7 岁左右，好奇、爱追问。他说话像孩子："它怎么自己就跑出来了？"
- **爸爸**温和、具体、不说教。先打一个孩子生活里的比方（报警线、传送带、汽水瓶），再说出真名一次（"……叫神经"）。
- **一条追问链**：每个追问都接着爸爸上一句里的一个词往深里问。顺序一般是：是什么 → 谁在管、在哪儿 → 怎么发生 → 为什么非得这样 → 常见误会或特殊情况 → 我能做什么。
- **最后一轮**：小念说"我懂了！"，用自己的话把因果链串一遍；爸爸夸一句，再给一个好习惯。
- **诚实**：不确定的就说不确定，谣言要明确说是谣言。何时该看医生写在 `parentTip`，不写进对话。

细则、长度限制和完整例子见 [dialogue.md](dialogue.md)。

## 画法（动画）

动画的做法学自 HyperFrames：每一帧只由时间 t 决定；一张图逐步长出来；说到哪个部件，哪个部件才出现。

1. **一轮问答一场戏**，场次顺序和问答一致。最后的总结轮可以不配戏，配音会接在最后一场后面读。
2. **视角跟着问题走**：
   - 问"在哪儿、谁在管"，用解剖底图（`body`、`headSide`、`chest`……）；
   - 问"怎么发生、为什么"，用空白画布画示意图（`blank`）；
   - 每部动画**至少一场解剖底图的戏**，让孩子知道说的是身体哪里。生殖相关的问题例外，只用示意图。
3. **逐步长出来**：
   - 先给底图，再按爸爸台词的顺序一个个加元素，间隔 0.6–1.5 秒；
   - 标签贴在器官上，不放图例；
   - 旧的元素用 `to` 收走，任何时刻不超过 6 个，检查器的上限是 8 个。
4. **比方要画出来**：
   - 爸爸说"像汽水瓶"，就画一个被压紧的圆，再"砰"地放开；
   - 爸爸说"传送带"，就让小点沿路线一直流。
5. **活的器官要动**：心脏用 `beat`，肺用 `breathe`，胃用 `churn`。镜头先给全景，说到哪个部件就推近（最多 2.6 倍），讲完关系再拉远。
6. **误会要翻过来**：爸爸辟谣的那一轮放 `myth` 卡，先划掉错的，再亮出对的。
7. **字要少**：标签 ≤12 字，大字 ≤14 字，场次标题 ≤12 字。屏幕上的字是关键词，完整的话交给配音和旁边的对话。

数据格式、每种元素的用法、常用配方和配色见 [film.md](film.md)。

## 配音

- `npm run voice -- <问题id>` 用 edge-tts 生成每一句：小念是 `zh-CN-YunxiaNeural`，爸爸是 `zh-CN-YunxiNeural`（-5%）。只有新的或改过的句子会重新生成。
- 播放器打开声音时，按配音长度把每场戏等比例拉长（`src/lib/narration.ts`），所以写动画时只管按原始节奏排；元素出现的先后顺序要和爸爸台词的先后一致，拉长以后才对得上。
- 问答改了字，配音就过期了，`npm test` 会报出来，重新跑 `npm run voice`。

## 验收

- 检查器全过：`node tests/dialogue-rules.mjs`、`node tests/film-rules.mjs`、`npm test`。
- 浏览器里开着声音从头看一遍，确认三件事：
  - 每个标签都指在对的器官上；
  - 爸爸说到某个东西时，它正好出现；
  - 手机宽度下字看得清、不挤。
- 测完把有声动画暂停，或者离开问答页，别留着它和别的页面串音。
