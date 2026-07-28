export type AgeTier = "4-6" | "7-9" | "10-12" | "13+";
export type TrackId = "anatomy" | "story" | "science" | "illness";
export type PartId = "head" | "heart" | "lungs" | "stomach" | "hand";

export type Track = {
  id: TrackId;
  title: string;
  description: string;
  steps: string[];
};

export type LayerItem = {
  key: string;
  text: string;
};

export type PartOverview = {
  title: string;
  intro: Record<AgeTier, string>;
  layers: LayerItem[];
};

export type AgeFocusPack = {
  question: string;
  experimentTitle: string;
  experimentSteps: string[];
  observe: string;
};

export type MysteryPack = {
  title: string;
  intro: string;
  perspectives: Record<TrackId, string>;
  essenceByTrack?: Partial<Record<TrackId, string>>;
  ageFocus: Record<AgeTier, AgeFocusPack>;
  funFacts?: string[];
};

export type AgeLens = {
  label: string;
  summary: string;
  checklist: string[];
};

export type CueItem = {
  phase: string;
  title: string;
  text: string;
};

export type MisconceptionPack = {
  level: string;
  wrong: string;
  right: string;
  conflictHint: string;
};

export type StoryStageKey = "mouth" | "stomach" | "smallIntestine" | "largeIntestine";

export type StoryStageSummary = {
  key: StoryStageKey;
  label: string;
  position: number;
  sceneText: string;
};

export type StoryMiniLab = {
  title: string;
  hint: string;
  metrics: Array<{
    label: string;
    value: number;
  }>;
};

export type ScienceInputs = {
  effortArm: number;
  loadArm: number;
  loadWeight: number;
  heartRate: number;
  strokeVolume: number;
  vascularResistance: number;
};

export type ScienceComputed = {
  mechanicalAdvantage: number;
  requiredForce: number;
  leverEfficiency: number;
  cardiacOutput: number;
  pressureIndex: number;
  normalizedPressure: number;
};

export type IllnessStageKey = "infection" | "response" | "diagnosis" | "recovery";

export type IllnessStageSummary = {
  key: IllnessStageKey;
  label: string;
  detail: string;
};

export type DoctorQuiz = {
  question: string;
  options: string[];
  answer: string;
  rationale: string;
};

export type QuizGuide = {
  title: string;
  intro: string;
  checklist: string[];
  success: string;
  retry: string;
};

export type PartQuiz = {
  question: string;
  options: string[];
  answer: string;
  rationale: string;
};

export type LearningStats = {
  partQuizAttempts: number;
  partQuizCorrect: number;
  doctorQuizAttempts: number;
  doctorQuizCorrect: number;
  storyCompleted: boolean;
  illnessCompleted: boolean;
  scienceAdjustments: number;
};
