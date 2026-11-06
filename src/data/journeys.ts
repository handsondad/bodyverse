import type { MotionStage } from "../lib/motion";
import type { AgeTier, PartId } from "../types/content";
import type { ScaleId } from "../types/exploration";

export type DepthLevel = { tier: AgeTier; icon: string; name: string; hint: string; ages: string };

// Age only picks how an explanation reads first; every child can always ask for the next depth.
export const depthLevels: readonly DepthLevel[] = [
  { tier: "4-6", icon: "🌱", name: "看一看", hint: "看到身体在做什么", ages: "约 4–6 岁" },
  { tier: "7-9", icon: "🔗", name: "连一连", hint: "找到谁和谁在接力", ages: "约 7–9 岁" },
  { tier: "10-12", icon: "🔬", name: "问为什么", hint: "用变量和机制解释", ages: "约 10–12 岁" },
  { tier: "13+", icon: "🧪", name: "讲原理", hint: "连到生物、化学、物理", ages: "13 岁以上 · 大人" }
];

export function depthOf(tier: AgeTier): DepthLevel {
  return depthLevels.find((level) => level.tier === tier) ?? depthLevels[1];
}

export type Science = "生物" | "物理" | "化学";

export function sciencesOf(discipline: string): Science[] {
  const head = discipline.split("·")[0];
  return (["生物", "物理", "化学"] as const).filter((science) => head.includes(science));
}

export type Toggle = { id: string; label: string; offLabel: string; whenOff: string };

export type ScaleStop = {
  id: ScaleId;
  short: string;
  emoji: string;
  size: string;
  /** One link in the cause chain shown at the end of the journey. */
  chain: string;
  stages: readonly MotionStage[];
  durationSeconds: number;
  toggles: readonly Toggle[];
  parentTip: string;
};

export const heartStops: readonly ScaleStop[] = [
  {
    id: "body", short: "全身", emoji: "🧒", size: "约 1 米",
    chain: "跑步时，腿上的肌肉更忙，要更多氧气",
    stages: [], durationSeconds: 1, toggles: [],
    parentTip: "可以先问孩子：跑完步摸摸胸口，和刚才有什么不一样？不需要真的去测心率，也不要为了验证而剧烈运动。"
  },
  {
    id: "organ", short: "心脏", emoji: "❤️", size: "像你的拳头那么大",
    chain: "心脏跳得更快，一分钟送出更多血",
    stages: [
      { start: 0, label: "心房收缩：把血挤进心室" },
      { start: 0.22, label: "心室收缩：把血推出去" },
      { start: 0.64, label: "心脏放松：血流回来" }
    ],
    durationSeconds: 60 / 80,
    toggles: [],
    parentTip: "心输出量 = 心率 × 每搏输出量。可以和孩子讨论：只看跳得快不快，够不够判断送了多少血？真实身体里每搏量也会变。"
  },
  {
    id: "tissue", short: "心肌组织", emoji: "🧱", size: "约 1 毫米",
    chain: "电信号一个传一个，让心肌细胞一起用力",
    stages: [
      { start: 0, label: "起搏的地方发出电信号" },
      { start: 0.12, label: "信号一个传一个" },
      { start: 0.4, label: "大家几乎一起收缩" },
      { start: 0.75, label: "放松，等下一个信号" }
    ],
    durationSeconds: 1.6,
    toggles: [{
      id: "links", label: "细胞连在一起", offLabel: "剪断细胞之间的连接",
      whenOff: "连接断了，信号传不过去：有的细胞先动、有的后动、有的干脆不动，整块心肌就使不上劲。"
    }],
    parentTip: "心肌细胞之间的“闰盘”里有缝隙连接，电信号能直接流到邻居细胞，所以心肌像一个整体收缩。"
  },
  {
    id: "cell", short: "心肌细胞", emoji: "🔋", size: "约 0.1 毫米，比头发丝还细",
    chain: "信号让钙离子涌出，启动细胞里的收缩结构",
    stages: [
      { start: 0, label: "电信号沿细胞膜传来" },
      { start: 0.12, label: "钙离子从“仓库”涌出" },
      { start: 0.3, label: "收缩结构启动，细胞变短" },
      { start: 0.62, label: "钙离子被收回，细胞放松" }
    ],
    durationSeconds: 2.4,
    toggles: [
      { id: "signal", label: "有电信号", offLabel: "关掉电信号", whenOff: "没有电信号，钙离子仓库不开门，细胞就不收缩。" },
      { id: "atp", label: "有能量（ATP）", offLabel: "关掉能量（ATP）", whenOff: "没有 ATP，收缩结构松不开，钙离子也收不回仓库，细胞放松不下来。" }
    ],
    parentTip: "兴奋—收缩耦联：动作电位 → 钙离子释放 → 肌丝相互作用。把钙离子泵回仓库同样要消耗 ATP，所以“放松”也需要能量。"
  },
  {
    id: "molecule", short: "分子", emoji: "⚛️", size: "只有几纳米",
    chain: "肌球蛋白拉着肌动蛋白滑动，ATP 让它们一次次重来",
    stages: [
      { start: 0, label: "钙离子打开结合位点" },
      { start: 0.15, label: "肌球蛋白头抓住肌动蛋白" },
      { start: 0.35, label: "头部摆动，拉着细丝滑向中间" },
      { start: 0.58, label: "ATP 让头部松开、重新“上膛”" },
      { start: 0.8, label: "钙离子离开，肌丝滑回放松" }
    ],
    durationSeconds: 4,
    toggles: [{ id: "atp", label: "有 ATP", offLabel: "关掉 ATP", whenOff: "没有 ATP，肌球蛋白头抓住肌动蛋白就松不开，肌丝卡住了。" }],
    parentTip: "横桥循环：结合 → 做功摆动 → ATP 结合使其解离 → ATP 水解让头部复位。肌丝本身不变短，是相互滑动。"
  }
];

export const restBeatRate = 80;
export const runBeatRate = 140;

export type QuestionBubble = { part: PartId; emoji: string; color: string };

export const questionBubbles: readonly QuestionBubble[] = [
  { part: "heart", emoji: "❤️", color: "#ff7a8a" },
  { part: "lungs", emoji: "🫁", color: "#6cc4ff" },
  { part: "stomach", emoji: "🍽️", color: "#ffc75a" },
  { part: "head", emoji: "🧠", color: "#b48cff" },
  { part: "hand", emoji: "🖐️", color: "#6fd39a" }
];
