import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { type AgeTier, type LearningStats, type PartId, type TrackId } from "../types/content";

const STORAGE_KEY = "body-mystery-react-state";

export type SavedViewState = {
  age: AgeTier;
  selectedTrack: TrackId;
  selectedPart: PartId;
  visitedParts: PartId[];
  answeredParts: PartId[];
  stats: LearningStats;
};

export const defaultStats: LearningStats = {
  partQuizAttempts: 0,
  partQuizCorrect: 0,
  doctorQuizAttempts: 0,
  doctorQuizCorrect: 0,
  storyCompleted: false,
  illnessCompleted: false,
  scienceAdjustments: 0
};

function isAgeTier(value: string): value is AgeTier {
  return value === "4-6" || value === "7-9" || value === "10-12" || value === "13+";
}

function isTrackId(value: string): value is TrackId {
  return value === "anatomy" || value === "story" || value === "science" || value === "illness";
}

function isPartId(value: string): value is PartId {
  return value === "head" || value === "heart" || value === "lungs" || value === "stomach" || value === "hand";
}

function normalizePartList(input: unknown): PartId[] {
  if (!Array.isArray(input)) return [];
  return input.filter((item): item is PartId => typeof item === "string" && isPartId(item));
}

function normalizeStats(input: unknown): LearningStats {
  if (!input || typeof input !== "object") return defaultStats;
  const stats = input as Partial<LearningStats>;
  return {
    partQuizAttempts: Number(stats.partQuizAttempts || 0),
    partQuizCorrect: Number(stats.partQuizCorrect || 0),
    doctorQuizAttempts: Number(stats.doctorQuizAttempts || 0),
    doctorQuizCorrect: Number(stats.doctorQuizCorrect || 0),
    storyCompleted: Boolean(stats.storyCompleted),
    illnessCompleted: Boolean(stats.illnessCompleted),
    scienceAdjustments: Number(stats.scienceAdjustments || 0)
  };
}

function loadSavedState(): SavedViewState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SavedViewState>;
    if (!parsed.age || !parsed.selectedTrack || !parsed.selectedPart) return null;
    if (!isAgeTier(parsed.age) || !isTrackId(parsed.selectedTrack) || !isPartId(parsed.selectedPart)) return null;

    return {
      age: parsed.age,
      selectedTrack: parsed.selectedTrack,
      selectedPart: parsed.selectedPart,
      visitedParts: normalizePartList(parsed.visitedParts),
      answeredParts: normalizePartList(parsed.answeredParts),
      stats: normalizeStats(parsed.stats)
    };
  } catch {
    return null;
  }
}

type PersistedViewState = {
  age: AgeTier;
  setAge: Dispatch<SetStateAction<AgeTier>>;
  selectedTrack: TrackId;
  setSelectedTrack: Dispatch<SetStateAction<TrackId>>;
  selectedPart: PartId;
  setSelectedPart: Dispatch<SetStateAction<PartId>>;
  visitedParts: PartId[];
  setVisitedParts: Dispatch<SetStateAction<PartId[]>>;
  answeredParts: PartId[];
  setAnsweredParts: Dispatch<SetStateAction<PartId[]>>;
  learningStats: LearningStats;
  setLearningStats: Dispatch<SetStateAction<LearningStats>>;
  markPartVisited: (partId: PartId) => void;
};

export function usePersistedViewState(): PersistedViewState {
  const [initialState] = useState<SavedViewState | null>(() => loadSavedState());
  const [age, setAge] = useState<AgeTier>(initialState?.age ?? "7-9");
  const [selectedTrack, setSelectedTrack] = useState<TrackId>(initialState?.selectedTrack ?? "anatomy");
  const [selectedPart, setSelectedPart] = useState<PartId>(initialState?.selectedPart ?? "hand");
  const [visitedParts, setVisitedParts] = useState<PartId[]>(
    initialState?.visitedParts.length ? initialState.visitedParts : [initialState?.selectedPart ?? "hand"]
  );
  const [answeredParts, setAnsweredParts] = useState<PartId[]>(initialState?.answeredParts ?? []);
  const [learningStats, setLearningStats] = useState<LearningStats>(initialState?.stats ?? defaultStats);

  useEffect(() => {
    const snapshot: SavedViewState = {
      age,
      selectedTrack,
      selectedPart,
      visitedParts,
      answeredParts,
      stats: learningStats
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [age, selectedTrack, selectedPart, visitedParts, answeredParts, learningStats]);

  const markPartVisited = useCallback((partId: PartId) => {
    setVisitedParts((prev) => {
      if (prev.includes(partId)) return prev;
      return [...prev, partId];
    });
  }, []);

  return {
    age,
    setAge,
    selectedTrack,
    setSelectedTrack,
    selectedPart,
    setSelectedPart,
    visitedParts,
    setVisitedParts,
    answeredParts,
    setAnsweredParts,
    learningStats,
    setLearningStats,
    markPartVisited
  };
}