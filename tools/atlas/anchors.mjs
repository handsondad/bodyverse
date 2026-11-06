// 打印图集里某个视角（不写就全部）的图层和锚点，写动画时查坐标用。
// 用法：node tools/atlas/anchors.mjs [body|head|headSide|chest|belly|hand|arm|leg]
import { readFileSync } from "node:fs";

const atlas = JSON.parse(readFileSync(new URL("../../src/data/anatomy-atlas.json", import.meta.url), "utf8"));
const only = process.argv[2];

for (const [id, view] of Object.entries(atlas.views)) {
  if (only && id !== only) continue;
  console.log(`\n## ${id}（${view.label}，${view.dir === "side" ? "从左侧看，脸朝画面左边" : "从正面看，身体的右边在画面左边"}）`);
  console.log(`图层：${Object.keys(view.layers).join(" ")}`);
  console.log("锚点            中心(x,y)    包围盒 x0,y0,x1,y1");
  for (const [name, anchor] of Object.entries(view.anchors)) {
    console.log(`${name.padEnd(16)}${anchor.at.join(",").padEnd(13)}${anchor.box.join(",")}  ${anchor.label}`);
  }
}
