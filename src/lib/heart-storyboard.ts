import type { AgeTier } from "../types/content";
import type { HeartStoryboard, ScaleId, StoryboardScene } from "../types/exploration";

export const heartDraftKey = "body-mystery-heart-storyboard-v1";
export const scenePrompts = [
  { nodeId: "body", visual: "画出跑步的人、肺和心脏", prompt: "跑步时，肌肉为什么需要更多氧气？" },
  { nodeId: "organ", visual: "用箭头画出心脏收缩时血液流动的方向", prompt: "心脏怎样帮助血液流动？" },
  { nodeId: "cell", visual: "放大心肌细胞，画出信号与收缩", prompt: "心肌细胞里，什么帮助收缩发生？" }
] satisfies Array<{ nodeId: ScaleId; visual: string; prompt: string }>;

export function createHeartDraft(age: AgeTier): HeartStoryboard {
  return {
    version: 1,
    topic: "heart",
    age,
    title: "我的心跳探险",
    scenes: scenePrompts.map(({ nodeId, visual }) => ({ nodeId, visual, narration: "" })),
    nextQuestion: "",
    savedAt: "",
    publication: "local-draft"
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function boundedText(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length <= max;
}

function isScene(value: unknown): value is StoryboardScene {
  return isRecord(value)
    && typeof value.nodeId === "string"
    && ["body", "organ", "tissue", "cell", "molecule"].includes(value.nodeId)
    && boundedText(value.visual, 300)
    && boundedText(value.narration, 500);
}

function isAgeTier(value: unknown): value is AgeTier {
  return value === "4-6" || value === "7-9" || value === "10-12" || value === "13+";
}

export function parseHeartDraft(raw: string): HeartStoryboard {
  const value: unknown = JSON.parse(raw);
  if (!isRecord(value) || value.version !== 1 || value.topic !== "heart"
    || !isAgeTier(value.age)
    || value.publication !== "local-draft"
    || !boundedText(value.title, 80) || !boundedText(value.nextQuestion, 300)
    || typeof value.savedAt !== "string" || !Number.isFinite(Date.parse(value.savedAt))
    || !Array.isArray(value.scenes) || value.scenes.length !== 3 || !value.scenes.every(isScene)) {
    throw new Error("草稿格式不正确，未恢复内容。");
  }
  return {
    version: 1,
    topic: "heart",
    age: value.age,
    title: value.title,
    scenes: value.scenes.map(({ nodeId, visual, narration }) => ({ nodeId, visual, narration })),
    nextQuestion: value.nextQuestion,
    savedAt: value.savedAt,
    publication: "local-draft"
  };
}

export function bloodFlowPerMinute(rate: number): number {
  if (!Number.isInteger(rate) || rate < 60 || rate > 140) {
    throw new Error("模型心率必须是 60 到 140 之间的整数。");
  }
  return rate * 50;
}
