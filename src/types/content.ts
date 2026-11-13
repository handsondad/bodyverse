export type AgeTier = "4-6" | "7-9" | "10-12" | "13+";
export type TrackId = "anatomy" | "story" | "science" | "illness";
export type PartId = "head" | "heart" | "lungs" | "stomach" | "hand";

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
