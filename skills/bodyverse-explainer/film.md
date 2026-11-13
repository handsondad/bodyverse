# 做讲解动画

动画写在 `src/data/films/<系统>.ts`，导出 `films: readonly Film[]`，类型见 `src/data/films/types.ts`。写完跑：

```
node tests/film-rules.mjs src/data/films/<系统>.ts
```

几个人或几个代理同时写时，每写完一部就保存并检查一次，不要攒一大段再写。

## 画面和坐标

- 画面固定是 1200×900。底图来自解剖图集 `public/anatomy/<视角>/<图层>.webp`，同一视角的图层完全对齐，可以随意叠。
- **锚点**是图集里量好的器官位置（中心点 + 外框）。可以写 `"heart"`，也可以写 `{ a: "heart", dx: 40, dy: -20 }` 加偏移，或者直接写坐标 `[x, y]`。查某个视角有哪些锚点：`node tools/atlas/anchors.mjs <视角>`。
- **两种坐标**：
  - `text`、`count`、`meter` 写数字坐标时是屏幕位置：镜头怎么推拉，它们都留在画面上那个位置，像字幕。
  - 其他元素的数字坐标都是图上的位置，会跟着镜头动。
- 空白画布 `view: "blank"` 不能放图层，只画示意图形，背景是奶油色。

| 视角 | 名称 | 图层 |
|---|---|---|
| `body` | 全身 | skin, teeth, skeleton, diaphragm, muscles, brain, nerves, heart, arteries, veins, lungs, airway, esophagus, stomach, smallIntestine, largeIntestine, liver, pancreas, mouth, kidneys, eyes, ears, immune |
| `head` | 头部正面 | skin, skeleton, muscles, brain, nerves, arteries, veins, airway, mouth, teeth, eyes, ears, immune |
| `headSide` | 头部侧面（脸朝左） | skin, skeleton, muscles, brain, nerves, arteries, veins, airway, esophagus, mouth, teeth, eyes, ears, immune |
| `chest` | 胸腔 | skin, skeleton, diaphragm, muscles, nerves, heart, arteries, veins, lungs, airway, esophagus, stomach, liver, immune |
| `belly` | 肚子 | skin, skeleton, diaphragm, muscles, arteries, veins, lungs, heart, esophagus, stomach, smallIntestine, largeIntestine, liver, pancreas, kidneys, immune |
| `hand` | 手 | skin, skeleton, muscles, nerves, arteries, veins |
| `arm` | 胳膊 | skin, skeleton, muscles, nerves, arteries, veins |
| `leg` | 腿 | skin, skeleton, muscles, nerves, arteries, veins |

图层的画法：
- 后写的图层画在上面。要看清里面的器官，就把皮肤、骨骼放在前面、调低透明度，比如 `{ layer: "skin", opacity: 0.35 }`；
- 比较扁的层要放在被它挡住的层前面：膈肌放在肺之前，不然肺会被盖住；
- `hand` 视角的皮肤比手指骨短，皮肤不能和其他图层同时出现（检查器会拦），要看里面就先用 `to` 收掉皮肤，或者换一场戏。

## 一场戏

```ts
{
  turn: 0,                     // 配第几轮问答（从 0 数）
  title: "灰尘钻进鼻子",        // ≤12 字，显示在画面角上和分段按钮上
  view: "headSide",
  layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, { layer: "brain", opacity: 0.55 }, "airway"],
  camera: [{ t: 0, at: "nose", zoom: 1.7 }, { t: 3.2, at: "nose", zoom: 1.7 }, { t: 4.6, at: [520, 480], zoom: 1.15 }],
  duration: 8,
  cues: [
    { kind: "sprite", icon: "🌸", path: [[60, 470], [180, 520], "nose"], from: 0.2, travel: 1.8, to: 3, spin: true, size: 44 },
    { kind: "highlight", at: "nose", from: 1.8 },
    { kind: "pulse", at: "nose", from: 2, color: "#ff5a5f", radius: 90 },
    { kind: "label", at: "nose", text: "鼻子里的报警线", side: "bottom", from: 2.3 },
    { kind: "flow", path: ["nose", [420, 470], "hypothalamus", "brainstem"], color: "#ffcf3f", from: 3.4, count: 7, speed: 260 },
    { kind: "label", at: "brain", text: "警报传到大脑", pos: [760, 170], from: 4.8 }
  ]
}
```

这一场的节奏：
1. 镜头先推近鼻子，花粉飘进鼻子；
2. 鼻子亮起来、起波纹，"报警线"的标签贴上去；
3. 镜头拉远，黄色的信号流向脑干，最后亮出"警报传到大脑"。

顺序和爸爸的台词一致。

## 元素

每个元素都有 `from`（出现，秒）和可选的 `to`（消失）。进场 0.45 秒，退场 0.25 秒，都是自动的。

| kind | 用来 | 关键字段 |
|---|---|---|
| `label` | 贴在器官上的标签，带引线 | `at`、`text` ≤12 字、`side`（left/right/top/bottom）或 `pos` |
| `highlight` | 一圈柔光，把注意力引到器官上 | `at` 必须是锚点名、`color`、`pad` |
| `pulse` | 往外扩的波纹：报警、信号、心跳 | `at`、`radius`、`rate`、`color` |
| `flow` | 一串小点（或图标）沿路线一直流：空气、血、神经信号 | `path` ≥2 点、`color`、`icon`、`count`、`speed`（`0` 是静止的点线） |
| `arrow` | 一笔画出的箭头，可带一句话 | `path`、`text` ≤10 字、`draw` 画多久 |
| `sprite` | 一个 emoji：一个点就原地弹出，几个点就沿路线走一趟 | `icon`、`path`、`travel`、`size`、`spin`、`wobble` |
| `shape` | 示意图形：细胞、小房间、肌肉块 | `shape`（circle/rect/pill）、`at`、`size`、`color`、`text` ≤6 字、`motion`（pulse/wiggle/grow/shrink）、`over`、`outline` |
| `text` | 一行大字点出关键词 | `at`（屏幕位置）、`text` ≤14 字、`size`（s/m/l）、`color` |
| `count` | 数字从 start 数到 end | `label` ≤8 字、`start`、`end`、`unit`、`over` |
| `meter` | 进度条从 start 到 end（0～1） | `label` ≤8 字、`color`、`over` |
| `myth` | 常见误会卡：先划掉错的，再亮出对的 | `wrong`、`right` 各 ≤18 字 |

图层可以带运动：`{ layer: "heart", motion: "beat", rate: 1.2 }`。`beat` 一缩一放，`breathe` 一鼓一瘪，`churn` 揉动。`rate` 是每秒几次。

## 检查器的规矩

- **数量和时长**：
  - 至少 4 场戏；第一场是第 0 轮，轮次按顺序走，最多空一轮问答不配戏；
  - 每场 4–14 秒，全片 30–110 秒。这是无声版的长度，开了声音会自动拉长；
  - 每场至少 2 个元素；同一时刻最多 8 个，实际写到 6 个以内最好。
- **时间**：`from` 不晚于结束前 0.8 秒；`to` 至少比 `from` 晚 0.5 秒。
- **镜头**：放大 1–2.6 倍，关键帧时间递增。
- **看得见、不打架**：
  - 除生殖起源题外，全片至少一场非 `blank` 的解剖底图戏；
  - 元素出现半秒后，标签整个要在镜头里，字幕要在画面里；
  - 路线、箭头、走动的图标，终点要在镜头里；
  - 不要放进左上角场次标题区（`x < 380, y < 95`），两个标签不能互叠，`myth` 卡出现时底部中间不要留字幕。
  - 被拦了就换 `side`、写 `pos`、加 `to` 收走，或者调镜头。
- **锚点和图层**：必须存在。

## 常用配方

- **"信号从 A 传到 B"**：A 上起 `pulse`，然后一条 `flow` 走到 B，再给 B 一个 `highlight` 和 `label`。
- **"一步步发生"**：用编号大字或 `sprite`，每 1–1.5 秒出一步，前一步用 `to` 收走，或者保留成一排。
- **"之前 / 之后"对比**：空白画布左右各一组 `shape`，下面各一行 `text`，如"直接吹：软绵绵"对"憋住再放：砰！"；右边那组晚 1–2 秒出现。
- **"多了 / 少了"**：两根 `meter` 上下排开，一根涨一根落；数字只用台词里说过的，没有数字就只用 `meter`。
- **"比方"**：先用 emoji 和图形把比方演出来（🚃 小火车运氧气），再切回解剖底图指出真实的器官。
- **"误会"**：先演一下错误的说法，再放 `myth` 卡；`myth` 卡会盖住画面中间，同时别放别的字。
- **辟谣或说"科学家还在研究"**：用 `text` 写"科学家还在研究"，再配两个"可能：……"的标签，别画成定论。

## 配色

| 颜色 | 用在 |
|---|---|
| `#ffcf3f` 黄 | 神经信号、警报流 |
| `#4fb6ff` 蓝 | 空气、氧气、水、凉 |
| `#e5484d` / `#ff5a5f` 红 | 血、疼、热、危险、划掉的错误说法 |
| `#b9c4cf` 灰 | 废气、二氧化碳、灰尘 |
| `#b48cff` / `#7a4fd6` 紫 | 大脑、记忆、免疫信号 |
| `#ff9f43` 橙 | 强调：箭头、高亮、进度条（站点主色） |
| `#2f7d32` 绿 | 正确的说法、好习惯、"✅" |
| `#7a6a55` 棕 | 次要说明文字 |
| `#ffe08a` `#ffd6bf` `#bfe3ff` `#fff3d6` | 示意图形的浅色填充 |

## 写完以后看一眼

检查器只管规则，管不了好不好看，所以写完要在浏览器里看：开 `#/q/<id>`，暂停后拖进度条到每场戏中间截图。
- 标签有没有指在对的器官上？这一步最容易出错，因为锚点是器官外框的中心，细长的器官要加偏移；
- 有没有元素叠在一起？
- 手机宽度（390px）下字看不看得清？舞台变窄时文字会自动放大到最多 1.6 倍，并且推回画面内。
