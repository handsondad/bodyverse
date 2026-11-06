# 第三方声明

## BodyVista（MIT）

`src/lib/motion.ts` 中的相位曲线（`bump`、`breath`、`pulseTravel` 等）和"相位驱动教学动画"的做法参考并改写自 BodyVista。

```
MIT License

Copyright (c) 2026 FreedomAI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Z-Anatomy 解剖模型（经 BodyVista）

问答页讲解动画用的解剖图层（`public/anatomy/`）是从 BodyVista 附带的 Z-Anatomy 模型渲染出来的，**不在 MIT 授权范围内**。放大旅程里的 3D 场景没有用这些模型，仍然在运行时由代码生成。源数据标记为 `CC-BY-SA-4.0 with per-source attribution and NC exceptions; research only`，公开发布或商用前需要逐个来源核实许可。来源、处理方式和替换方法见 `public/anatomy/CREDITS.md`。

## HyperFrames（Apache-2.0）

讲解动画的做法参考了 HyperFrames（heygen-com/hyperframes）的动效指南：画面是时间 t 的纯函数、可以拖动和暂停；到达用长尾 ease-out、退场比进场短；"一张图逐步长出来"，标签贴在它指的部件上。只借鉴了思路，没有复制代码。

## 配音（Microsoft Edge 在线语音）

`public/voice/` 里的小念和爸爸的配音由 [edge-tts](https://github.com/rany2/edge-tts)（GPL-3.0，只在生成时使用，不随网站发布）调用微软 Edge"大声朗读"的在线神经语音生成：小念 `zh-CN-YunxiaNeural`，爸爸 `zh-CN-YunxiNeural`。这项服务没有为批量生成音频单独给出授权条款，所以这些音频只按家庭和非商业用途考虑；公开发布或商用前，应改用有明确商用授权的语音服务（如 Azure AI Speech）重新生成。

## 3D 角色

3D 角色模型的来源见 `public/models/CREDITS.md`。
