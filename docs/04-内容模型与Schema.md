# 内容模型与 Schema（MVP）

## 1. 设计目标

- 一套内容数据支持四条主线与四年龄层。
- 节点可复用，避免重复制作。
- 支持后续从器官层扩展到细胞/分子层。

## 2. 核心对象

### Node（知识节点）

```json
{
  "id": "node_hand_001",
  "type": "anatomy",
  "title": "手部结构",
  "pathTags": ["anatomy", "science"],
  "tieredText": {
    "4-6": "这是我们的手，可以抓握和挥手。",
    "7-9": "手由骨骼、肌肉和神经协同工作。",
    "10-12": "手部关节与肌腱配合实现精细动作。",
    "13+": "手部运动涉及神经传导、力矩与反馈控制。"
  },
  "media": {
    "image": "assets/hand/overview.png",
    "model3d": "assets/hand/hand.glb",
    "animation": ["assets/hand/flexion.json"]
  },
  "narration": {
    "scriptId": "nar_hand_001",
    "audioByTier": {
      "4-6": "audio/4-6/nar_hand_001.mp3",
      "7-9": "audio/7-9/nar_hand_001.mp3",
      "10-12": "audio/10-12/nar_hand_001.mp3",
      "13+": "audio/13+/nar_hand_001.mp3"
    },
    "cues": "cues/nar_hand_001.json"
  },
  "quiz": {
    "4-6": [{ "q": "手可以做什么？", "type": "single" }],
    "7-9": [{ "q": "手部运动主要依赖哪些结构？", "type": "single" }],
    "10-12": [{ "q": "关节在手部运动中的作用是什么？", "type": "single" }],
    "13+": [{ "q": "力矩如何影响手部动作？", "type": "single" }]
  }
}
```

### Edge（节点关系）

```json
{
  "from": "node_body_001",
  "to": "node_hand_001",
  "relationType": "part_of",
  "pathType": "anatomy"
}
```

## 3. 推荐关系类型

- part_of：组成关系
- next_step：流程下一步
- explains：原理解释
- causes：病因关系
- deep_dive：深入学习关系
- used_in：在某场景中使用

## 4. 目录建议

```txt
data/
  nodes.json
  edges.json
  scripts/
  cues/
assets/
  anatomy/
  scenes/
  audio/
```

## 5. 验收要点

1. 同一节点可被不同主线引用。
2. 四年龄层内容字段完整。
3. 音频和 cue 可按节点 ID 对齐加载。
4. 节点关系可支持“继续深入”跳转。

## 6. 心脏探索样板的实际类型

本轮以 `src/types/exploration.ts` 为可执行类型定义，保留上面的通用图谱建议，不提前引入图数据库：

- `ExplorationNode`：尺度 ID、标题、学科、四年龄层讲解、追问、比喻边界。
- `src/data/heart-exploration.ts`：按全身、器官、组织、细胞、分子排列的五节点链，及每个年龄层的建议终点。建议不是访问限制。
- `HeartStoryboard`：版本、主题、创作年龄、标题、三格 `scenes`、后续问题、保存时间、本地草稿标记。
- `StoryboardScene`：`nodeId`（镜头尺度）、`visual`（画面描述）、`narration`（孩子自己的旁白）。

导出的 JSON 与本地存档共用 `HeartStoryboard` 结构；恢复时校验版本、枚举、字符串长度、三格数量及时间格式。当前不提供导入 UI。媒体审核、未来视频制作约束见 [心脏探索样板设计](17-心脏探索样板设计.md)。
