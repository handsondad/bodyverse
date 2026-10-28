import type { AgeTier } from "./content";

export type ScaleId = "body" | "organ" | "tissue" | "cell" | "molecule";

export type ExplorationNode = {
  id: ScaleId;
  title: string;
  discipline: string;
  text: Record<AgeTier, string>;
  question: string;
  analogyLimit: string;
};

export type StoryboardScene = {
  nodeId: ScaleId;
  visual: string;
  narration: string;
};

export type HeartStoryboard = {
  version: 1;
  topic: "heart";
  age: AgeTier;
  title: string;
  scenes: StoryboardScene[];
  nextQuestion: string;
  savedAt: string;
  publication: "local-draft";
};
