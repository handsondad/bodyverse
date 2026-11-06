import { bloodFlowPerMinute } from "../lib/heart-storyboard";
import { ventilationPerMinute, restBreathRate, runBreathRate } from "../lib/lung-model";
import type { AgeTier, PartId } from "../types/content";
import type { ExplorationNode, ScaleId } from "../types/exploration";
import { heartNodes, heartQuestion, recommendedScale } from "./heart-exploration";
import { heartStops, restBeatRate, runBeatRate, type ScaleStop } from "./journeys";
import { lungNodes, lungQuestion, lungStops } from "./lungs-journey";

export type JourneyId = "heart" | "lungs";
export type LegendItem = { color: string; label: string };

/** The organ stop compares rest and running with one fixed amount per beat or breath. */
export type OrganLabConfig = {
  question: string;
  restRate: number;
  runRate: number;
  rateWord: string;
  perUnit: string;
  unit: string;
  total: (rate: number) => number;
  formula: (rate: number, total: number) => string;
  observe: string;
};

export type JourneyDef = {
  id: JourneyId;
  part: PartId;
  emoji: string;
  title: string;
  question: string;
  stops: readonly ScaleStop[];
  nodes: readonly ExplorationNode[];
  recommended: Record<AgeTier, ScaleId>;
  organLab: OrganLabConfig;
  legends: Partial<Record<ScaleId, readonly LegendItem[]>>;
  storyboard: boolean;
};

const richBlood = "#e8283c";
const poorBlood = "#9c3566";
export const oxygenColor = "#8fe3ff";
export const carbonColor = "#555a66";

export const journeys: Record<JourneyId, JourneyDef> = {
  heart: {
    id: "heart", part: "heart", emoji: "❤️", title: "心脏奥秘之旅", question: heartQuestion,
    stops: heartStops, nodes: heartNodes, recommended: recommendedScale,
    organLab: {
      question: "每次送出的血一样多，跳得更快时，一分钟送出的血会怎样？",
      restRate: restBeatRate, runRate: runBeatRate, rateWord: "跳", perUnit: "每次送出约 50 毫升", unit: "毫升",
      total: bloodFlowPerMinute,
      formula: (rate, total) => `心输出量 = 心率 × 每搏输出量 = ${rate} × 50 = ${total} 毫升/分钟`,
      observe: "注意看动画：红细胞在血管里跑得更勤了。真实身体里，每次送出的血量也会变，不是心跳越快越好。"
    },
    legends: { organ: [{ color: richBlood, label: "带着很多氧气" }, { color: poorBlood, label: "氧气已经送出去了" }] },
    storyboard: true
  },
  lungs: {
    id: "lungs", part: "lungs", emoji: "🫁", title: "呼吸奥秘之旅", question: lungQuestion,
    stops: lungStops, nodes: lungNodes, recommended: recommendedScale,
    organLab: {
      question: "每次吸进的空气一样多，呼吸更快时，一分钟吸进的空气会怎样？",
      restRate: restBreathRate, runRate: runBreathRate, rateWord: "呼吸", perUnit: "每次吸进约 0.5 升", unit: "升",
      total: ventilationPerMinute,
      formula: (rate, total) => `每分通气量 = 呼吸频率 × 潮气量 = ${rate} × 0.5 = ${total} 升/分钟`,
      observe: "注意看动画：膈肌一上一下更勤了。真实身体里跑步时每次也吸得更深；如果呼吸又快又浅，很多空气只在气管里进出，反而不划算。"
    },
    legends: {
      organ: [{ color: oxygenColor, label: "吸进来的新鲜空气" }, { color: "#b7a9c9", label: "要呼出去的气（二氧化碳多）" }],
      tissue: [{ color: poorBlood, label: "缺氧的血" }, { color: richBlood, label: "带上氧气的血" }],
      cell: [{ color: oxygenColor, label: "氧气 O₂" }, { color: carbonColor, label: "二氧化碳 CO₂（中间是碳）" }],
      molecule: [{ color: "#5a2a5e", label: "空着的血红素" }, { color: "#ff3344", label: "坐上氧气" }, { color: "#ff8fb0", label: "被一氧化碳占住" }]
    },
    storyboard: false
  }
};

export const journeyList: readonly JourneyDef[] = [journeys.heart, journeys.lungs];

export function journeyOfPart(part: PartId): JourneyDef | undefined {
  return journeyList.find((journey) => journey.part === part);
}

export function isJourneyId(value: string | undefined): value is JourneyId {
  return value === "heart" || value === "lungs";
}
