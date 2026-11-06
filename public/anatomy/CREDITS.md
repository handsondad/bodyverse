# 解剖图集来源

`public/anatomy/<视角>/<图层>.webp` 和 `src/data/anatomy-atlas.json` 由 `tools/atlas/` 从 BodyVista 的 `assets/full_body.glb` 渲染生成。

| 项目 | 说明 |
| --- | --- |
| 原始模型 | BodyVista `assets/full_body.glb`，共 2,900 个结构 |
| 模型来源 | Z-Anatomy（每个结构的来源记录在 BodyVista `catalog.json` 的 `source_attribution`） |
| 许可标记 | `Z-Anatomy CC-BY-SA-4.0 with per-source attribution and NC exceptions; research only` |
| 本项目处理 | 按图层挑选结构，重新上色；用正交相机按统一视角渲染成 1800×1350 的透明 WebP；去掉生殖器官及相关血管、神经和尿道；皮肤图层加了一条短裤 |

## 使用限制

- 这些图片是 Z-Anatomy 模型的衍生作品，按 CC BY-SA 4.0 需要署名并以相同方式共享。
- 源数据带有「非商用例外」和「仅限研究」的标记，BodyVista 自己也说明这些权限还没有逐条核实。家庭和非商业的学习使用之外，**公开发布或商用前必须先逐个来源核实许可**，必要时换成可商用的模型（例如 BodyParts3D 或自己绘制的图）。
- 图层都放在 `public/anatomy/` 下，动画只通过 `src/data/anatomy-atlas.json` 引用它们；要替换时，换掉这两处并重新跑 `node tools/atlas/server.mjs <BodyVista 路径>` 即可。

## 重新生成

```bash
node tools/atlas/server.mjs ../BodyVista
# 浏览器打开 http://localhost:5199/ ，等页面显示「完成」
# 只预览不写文件：http://localhost:5199/?view=chest&preview=lungs,heart
```

图层、视角和锚点的定义在 `tools/atlas/layers.js`。
