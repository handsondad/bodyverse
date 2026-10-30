# 3D 动画与 Blender 接入研究

> 范围与边界沿用 [docs/17](17-心脏探索样板设计.md) 的媒体收录规则。P0、P1 已实施，见文末“实施状态”。

## 结论

Blender 是**离线制作工具**，不是网页运行时：在 Blender 里建模、绑骨、做动画，导出 glTF/GLB，再由网页端的 three.js（React Three Fiber）实时渲染和交互。也可以用 Blender 预渲染短视频。

本项目是 React 网页，three.js 就是浏览器里的交互引擎，不需要改用 Unity 或 Godot：

- 改用它们等于重写现有的主线、年龄分层、心脏样板和工作台。
- Unity 网页包通常有几十 MB，在手机和 iPad Safari 上表现不佳。
- 只有将来要做上架 App 或重游戏化交互时，才值得换引擎。GLB 资产可以直接复用。

## 三条路线，混合使用

| 路线 | 做法 | 适合的位置 |
| --- | --- | --- |
| 实时 3D | Blender → GLB → React Three Fiber | 器官旋转、心跳、呼吸、手部抓握、人体图点选 |
| 预渲染视频 | Blender 渲染 MP4/WebM | 场景故事（食物旅程）、分镜成片 |
| 2D 矢量动画 | Rive / Lottie | 吉祥物向导、低龄界面反馈 |

## 儿童向美术风格

- 风格化、卡通化：圆润、低面数、明亮纯色；避免写实肌肉、血管纹理，低龄儿童可能害怕。
- 卡通着色（`MeshToonMaterial` 三阶色调），或在 Blender 中烘焙光照。
- 始终标注“卡通示意，不按真实形状或比例”，与心脏样板口径一致。

## 模型来源与许可

| 来源 | 许可 | 建议 |
| --- | --- | --- |
| MakeHuman / MPFB2（Blender 扩展） | 导出素材 CC0 | 首选做儿童身体外壳，可调年龄，自带骨骼 |
| Z-Anatomy | CC BY-SA 4.0（源自 BodyParts3D） | 仅作造型参考；直接使用须署名，衍生模型也须按 CC BY-SA 共享 |
| BodyParts3D（DBCLS） | CC BY-SA 2.1 日本 | 同上 |
| 自建器官 | 自有 | 推荐，结构简单、风格统一、无许可风险 |
| 模型站、AI 生成 3D、Unity 资产商店 | 逐个不同 | 逐个核对许可，按 docs/17 记录来源后才能用 |

## Blender 制作约定（与代码对齐）

- 对象名对应 `PartId`：`part_heart`、`part_lungs`、`part_stomach`、`part_head`、`part_hand_l`、`part_hand_r`；血管为 `vessel_outflow`、`vessel_inflow`。
- 动作名：`heart_beat`、`lungs_breathe`、`stomach_churn`、`hand_grip`、`idle_wave`。
- 镜头空物体：`cam_body`、`cam_organ`（对应 `ScaleId`）；`stage_mouth` 等（对应 `StoryStageKey`）。
- 心跳、呼吸、胃蠕动用形态键（glTF morph targets）；手部和角色动作用骨骼。
- 导出：GLB，+Y 朝上，应用变换；单个器官 5k–15k 三角面，整个场景 ≤ 100k；贴图 ≤ 1024 并转 KTX2；用 `gltf-transform` 做 Draco/meshopt 压缩；单个场景 ≤ 2–3 MB。
- 命令行可复现导出：`blender -b heart.blend -P scripts/export_glb.py`。

## 实施状态

### P0：3D 心脏（已完成）

心脏样板“心脏（器官）”尺度显示可旋转的 3D 卡通心脏：

- 心跳节奏与 CSS 心跳关键帧一致，速度跟随“模型心率”滑杆（60–140 次/分钟）；红色血管送出、蓝色血管流回，血流小球速度随心率变化。
- 与原有“播放心跳示意”共用播放状态；只能旋转和有限缩放，不能平移，提供“回到正面”。
- 提供“3D 模型 / 平面图”切换。WebGL 不可用或 3D 加载失败时，自动改用原 SVG 示意图。
- 系统开启“减少动态效果”时保持静止，播放按钮禁用。
- 3D 代码按需懒加载，不进入首屏包。首屏 JS 仍约 79 KB（gzip）；3D 分包约 226 KB（gzip），主要是 three.js 与 React Three Fiber 本身。无动画时按需渲染，节省电量。

当前心脏由代码生成（`src/components/Heart3D.tsx`），无外部模型资源。相关代码：

- `src/lib/heart-3d.ts`：心跳缩放、血流位置、WebGL 检测，测试见 `tests/heart-3d.test.mjs`。
- `src/components/Heart3DView.tsx`：显示方式切换、降级、错误边界、减少动态。
- 依赖：`three@0.169`、`@react-three/fiber@8`。项目是 React 18，不能升级到 Fiber 9（需要 React 19）。

### 换成 Blender 模型

1. 在 Blender 中按上方约定制作 `part_heart`（形态键动作 `heart_beat`）和两条血管，导出压缩后的 `public/models/heart.glb`。
2. 在 `Heart3D.tsx` 中用 `useGLTF`（`@react-three/drei@9`）或 three 的 `GLTFLoader` 加载，替换 `HeartModel` 中的生成几何体。按对象名取网格，用 `beatScale` 驱动形态键权重或动画播放速度（心率 ÷ 60）。
3. 按 docs/17 登记模型来源与审核状态，再进入儿童展示端。

### P1：3D 人体图（已完成）

首页人体图默认显示可旋转的 3D 卡通小朋友，原部位按钮保留不变：

- 衣服半透明，能看到肺、心脏、胃；点头、手、器官可选中，与上方按钮同步。点到躯干里的空隙时选最近的器官，小手不会“点空”；拖动旋转不会误选（指针移动超过 8px 视为拖动）。
- 选中的器官发橙光、弹一下，并画在衣服前面；底部提示条显示“点一下：…”或“已选：…”，触屏上也有反馈。
- 待机时小人轻轻浮动，心脏跳动、肺部呼吸；离开视口或开启“减少动态效果”时停止并按需渲染。
- 提供“看平面图 / 看 3D 小人”切换；WebGL 不可用或加载失败时自动显示原 SVG。
- 心脏、胃按卡通比例放大，便于点选，界面注明“不按真实形状或比例绘制”。
- 与 3D 心脏共用 three.js 分包，首屏 JS 仍约 79 KB（gzip）。

相关代码：

- `src/lib/body-3d.ts`：对象名与部位映射、器官中心与最近器官、点按判定、呼吸与选中动画，测试见 `tests/body-3d.test.mjs`。
- `src/components/Body3D.tsx`：场景；对象名按上方 Blender 约定命名，换成 GLB 时按名称取对象即可接上点选与动画。
- `src/components/HumanBodyMap.tsx`：懒加载、切换、降级、视口暂停。
- `src/components/three-shared.tsx`、`WebGLBoundary.tsx`：心脏与人体共用的卡通渐变、心形几何、受限旋转控制和错误边界。

换成 Blender 人体：用 MPFB2 生成儿童外壳（CC0），器官自建，按约定命名后导出 `public/models/body.glb`；在 `Body3D.tsx` 中加载并替换生成的几何体，保留 `torso_catch` 隐形面（或在 GLB 中提供同名平面），器官位置同步到 `torsoOrgans`。

### P1.5：互动重设计——“和小豆一起跑一跑”（已完成首个样板）

P0/P1 的反馈是：代码拼出的造型丑、动画只有缩放、3D 只是换了皮的菜单，感受不到身体的奥秘。问题不在引擎，而在**美术来源、动画方式和交互设计**，所以继续用网页 three.js（React Three Fiber），不迁移到 Unity/Godot：

- 现有 React 应用、测试和部署全部复用；首屏不需要下载引擎运行时（Unity/Godot 网页包通常 10 MB 以上，Godot C# 不能导出网页）。
- 角色与动画是标准 glTF，以后真要换 Godot/Unity 可以直接带走。

做法：

- **真角色、真动画**：Quaternius Ultimate Animated Character（CC0）的男孩/女孩，保留 Idle/Walk/Run/Jump/Victory 等 9 个骨骼动画，经 glTF-Transform 裁剪、重采样、量化到约 0.73 MB/个，见 `public/models/CREDITS.md`。代码只负责卡通材质、描边、表情（眨眼、脸红、出汗）和视线跟随。
- **因果玩法**：先猜（变快/不变/变慢）→ 按住按钮让角色在小星球上跑，心率、呼吸平滑上升 → 松手后慢慢恢复。曲线显示最近 30 秒，孩子亲眼看到“恢复需要时间”。
- **透视镜**：一个可拖动的放大镜，用模板缓冲（stencil）只在镜片里画第二层：跳动的心脏、随呼吸鼓起的肺、跑步时发光的腿部肌肉，以及红/蓝血管里按心率流动的血细胞。默认自动对准心脏。
- **多感官**：WebAudio 合成“咚-哒”心跳声（无需音频文件）；“跟着心跳拍”小游戏比较孩子拍的节奏和角色心率；戳角色会跳起来说话。
- **兜底**：减少动态效果时放慢场景、停掉视差；不支持 WebGL 时退回 emoji 舞台，仪表、曲线和讲解照常可用。

代码：`src/lib/run-lab.ts`（纯逻辑，`tests/run-lab.test.mjs`）、`src/lib/heartbeat-audio.ts`、`src/components/RunLab.tsx`（界面）、`src/components/RunLab3D.tsx`（场景与透视合成）、`src/components/run-lab/rig.ts`（角色装配）、`src/components/run-lab/world.tsx`（小星球）。

踩坑记录：three.js 的 `AnimationMixer` 只在动画值变化时才写回骨骼，若某骨骼轨道是常量（如 Idle 的 Head），在其上叠加的 `rotateY` 会逐帧累积导致转头失控。做法是每帧在 `mixer.update` 前恢复上一帧的动画姿态（`rig.headPose`）。

### 后续阶段

| 阶段 | 内容 | 验收 |
| --- | --- | --- |
| P2 复制玩法到其他器官 | 按“猜—做—透视看—感受”同一套路：喂角色吃东西看消化、吹蒲公英看肺、闭眼摸物看大脑与手 | 每个样板都有可操作的因果，孩子能用自己的话说出结论 |
| P3 故事成片 | Blender 按分镜 `nodeId` / `visual` / `narration` 本地渲染短片 | 解剖、因果、旁白一致，通过儿童适宜性审核 |

## 风险

- 许可：CC BY-SA 模型的衍生作品也必须按相同许可共享。
- 性能：低端平板可能卡顿，靠降级到平面图兜底。
- 科学审核：卡通化不等于可以画错；位置、相对大小和因果仍需生理学审核。
- 触屏：3D 区域会接管单指拖动，页面需从区域外滚动，因此画布高度保持适中。
- 隐私：孩子的草稿不得自动发送给第三方生成服务；Blender 本地渲染不涉及上传。
