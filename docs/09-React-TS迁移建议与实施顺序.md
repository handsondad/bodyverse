# 09 React + TypeScript 迁移建议与实施顺序

## 结论
如果目标是把当前原型继续做成可长期维护的正式产品，React + TypeScript 是更合适的技术路线。

当前纯 JavaScript 静态方案并不是方向错误，而是基于当前环境约束作出的原型实现：
- 当前机器未安装 Node.js/npm/npx。
- 当前阶段的重点是先把“认识身体的奥秘”内容主轴打磨清楚。
- 纯静态方案可以更快验证内容结构、年龄梯度和页面联动。

因此，合理顺序不是“否定纯 JS”，而是：
1. 先用纯 JS 把内容基线锁定。
2. 再迁移到 React + TypeScript，承接后续产品化迭代。

## 为什么 React + TypeScript 更适合产品化

### 1. 更适合组件化拆分
当前页面已经天然具备组件边界：
- 年龄切换
- 部位选择
- 主线切换
- 奥秘区
- 回顾区
- 场景区
- 科学实验区
- 生病就医区

在纯 JS 里，这些区域主要依赖手动 DOM 查询和多个 render 函数协调；
在 React 中，可以更自然地拆成独立组件，通过 props 和 state 联动。

### 2. 更容易控制状态复杂度
当前状态已经不算简单，包含：
- 年龄层
- 当前部位
- 当前主线
- 场景播放状态
- 生病流程播放状态
- 实验参数
- 学习统计与进度

纯 JS 在功能少时足够直接，但随着状态继续增长，跨模块同步会越来越难。
React 更适合管理这种“多个区域同时依赖同一状态”的页面。

### 3. TypeScript 能减少内容接线错误
当前项目的核心是大量结构化内容数据：
- 部位数据
- 年龄层数据
- 主线数据
- 回顾与总结数据
- 题目与实验数据

TypeScript 可以把这些数据结构定义为明确类型，减少以下问题：
- 字段漏写
- 年龄层 key 拼错
- 主线名不一致
- 渲染函数取错字段

这对后续继续补内容尤其重要。

### 4. 更利于后续接入测试、埋点和工程化能力
如果后面要做这些事，React + TypeScript 路线会更顺：
- 单元测试与组件测试
- 路由与页面拆分
- 内容 schema 校验
- 埋点统计
- 构建优化与资源管理
- 团队协作开发

## 为什么当前不应立刻强切

### 1. 现在的核心风险不是框架，而是内容主轴跑偏
你之前多次指出的问题，本质不是“技术不对”，而是“内容在跑偏”。
所以前一阶段先把主题主轴、年龄梯度和一句话奥秘统一，这是对的。

### 2. 当前环境不支持直接启动 React 工程
当前机器没有 Node.js/npm/npx，无法直接初始化或运行 React + TypeScript 项目。
这意味着现在如果强行切换，会先卡在环境问题上，而不是继续产出内容。

### 3. 现在迁移，容易把注意力从内容打磨转到工程搭建
一旦开始搭工程，精力会自然转移到：
- 目录结构
- 构建配置
- lint/format
- 路由
- 类型定义
- 组件拆分

这些都重要，但不是当前最值得优先消耗时间的地方。

## 建议顺序

### 阶段 A：继续完成内容收口
当前优先级最高，继续做：
- 五个部位的观察任务统一
- 复述句统一
- 误区纠正语气统一
- 移动端阅读体验与文案节奏微调

目标：把当前内容基线再压实一轮。

### 阶段 B：准备 React + TypeScript 迁移设计
在不依赖 Node 的情况下，先完成迁移设计文档：
- 状态模型怎么映射
- 数据 schema 怎么定义类型
- 现有 feature 如何拆成组件
- 哪些模块先迁、哪些后迁

目标：先把迁移方案设计清楚，而不是直接开工后返工。

### 阶段 C：具备 Node 环境后正式迁移
环境就绪后建议技术栈：
- React
- TypeScript
- Vite
- CSS Modules 或现有样式渐进迁移
- ESLint + TypeScript 类型检查

目标：在不丢失现有内容成果的前提下完成工程化升级。

## 推荐迁移映射

### 现有模块到 React 组件
- `main.js` -> `App.tsx`
- `state.js` -> `useAppState` 或 context/store
- `dom.js` -> 删除，改为 React ref/props 驱动
- `features/part.js` -> `PartPanel`
- `features/tracks.js` -> `TrackPanel`
- `features/mystery.js` -> `MysteryPanel`
- `features/review.js` -> `ReviewPanel`
- `features/story.js` -> `StoryPanel`
- `features/science.js` -> `SciencePanel`
- `features/illness.js` -> `IllnessPanel`

### 现有数据到 TypeScript 类型
建议优先定义：
- `AgeTier`
- `TrackKey`
- `PartKey`
- `MysteryPack`
- `ReviewPack`
- `QuizQuestion`
- `ExperimentPlan`

## 最终建议
不是“不该用纯 JS”，而是“纯 JS 适合当前原型阶段，React + TypeScript 适合下一阶段产品化”。

如果继续做产品，我建议路线是：
1. 现在继续按当前基线把内容再压实一轮。
2. 同步产出 React + TypeScript 的迁移设计。
3. 等 Node 环境可用后，再开始正式迁移。
