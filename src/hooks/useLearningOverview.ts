import { useMemo } from "react";
import { mystery } from "../lib/content-adapter";
import { type LearningStats, type PartId } from "../types/content";

type LearningOverviewOptions = {
  partIds: PartId[];
  visitedParts: PartId[];
  answeredParts: PartId[];
  learningStats: LearningStats;
};

type LearningOverview = {
  partLabelMap: Record<PartId, string>;
  totalParts: number;
  progressRatio: number;
  partAccuracy: number;
  doctorAccuracy: number;
};

export function useLearningOverview(options: LearningOverviewOptions): LearningOverview {
  const { partIds, visitedParts, answeredParts, learningStats } = options;

  const partLabelMap = useMemo(
    () =>
      partIds.reduce(
        (acc, id) => {
          acc[id] = mystery[id].title;
          return acc;
        },
        {} as Record<PartId, string>
      ),
    [partIds]
  );

  const totalParts = partIds.length;
  const progressRatio = Math.round(((visitedParts.length / totalParts) * 0.65 + (answeredParts.length / totalParts) * 0.35) * 100);
  const partAccuracy = learningStats.partQuizAttempts
    ? Math.round((learningStats.partQuizCorrect / learningStats.partQuizAttempts) * 100)
    : 0;
  const doctorAccuracy = learningStats.doctorQuizAttempts
    ? Math.round((learningStats.doctorQuizCorrect / learningStats.doctorQuizAttempts) * 100)
    : 0;

  return {
    partLabelMap,
    totalParts,
    progressRatio,
    partAccuracy,
    doctorAccuracy
  };
}