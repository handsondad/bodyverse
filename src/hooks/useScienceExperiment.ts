import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { calculateScienceMetrics, getScienceDefaults } from "../lib/content-adapter";
import { type AgeTier, type LearningStats, type ScienceComputed, type ScienceInputs } from "../types/content";

type ScienceExperimentState = {
  scienceInput: ScienceInputs;
  scienceMetrics: ScienceComputed;
  updateScienceInput: <K extends keyof ScienceInputs>(key: K, value: number) => void;
};

type ScienceExperimentOptions = {
  age: AgeTier;
  setLearningStats: Dispatch<SetStateAction<LearningStats>>;
};

export function useScienceExperiment(options: ScienceExperimentOptions): ScienceExperimentState {
  const { age, setLearningStats } = options;
  const [scienceInput, setScienceInput] = useState<ScienceInputs>(getScienceDefaults(age));

  useEffect(() => {
    setScienceInput(getScienceDefaults(age));
  }, [age]);

  const scienceMetrics = useMemo(() => calculateScienceMetrics(scienceInput), [scienceInput]);

  const updateScienceInput = useCallback(
    <K extends keyof ScienceInputs>(key: K, value: number) => {
      setScienceInput((prev) => ({
        ...prev,
        [key]: value
      }));
      setLearningStats((prev) => ({
        ...prev,
        scienceAdjustments: prev.scienceAdjustments + 1
      }));
    },
    [setLearningStats]
  );

  return {
    scienceInput,
    scienceMetrics,
    updateScienceInput
  };
}