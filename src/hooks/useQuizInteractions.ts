import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import { type DoctorQuiz, type LearningStats, type PartId, type PartQuiz, type QuizGuide } from "../types/content";

type FeedbackState = {
  text: string;
  tone: string;
};

type QuizInteractionsOptions = {
  selectedPart: PartId;
  setLearningStats: Dispatch<SetStateAction<LearningStats>>;
  setAnsweredParts: Dispatch<SetStateAction<PartId[]>>;
};

type QuizInteractions = {
  selectedDoctorOption: string;
  doctorFeedback: FeedbackState;
  selectedPartOption: string;
  partFeedback: FeedbackState;
  resetDoctorInteraction: () => void;
  resetPartInteraction: () => void;
  answerDoctorQuiz: (option: string, doctorQuiz: DoctorQuiz, doctorGuide: QuizGuide) => void;
  answerPartQuiz: (option: string, partQuiz: PartQuiz, partGuide: QuizGuide) => void;
};

export function useQuizInteractions(options: QuizInteractionsOptions): QuizInteractions {
  const { selectedPart, setLearningStats, setAnsweredParts } = options;
  const [selectedDoctorOption, setSelectedDoctorOption] = useState("");
  const [doctorFeedback, setDoctorFeedback] = useState<FeedbackState>({ text: "", tone: "" });
  const [selectedPartOption, setSelectedPartOption] = useState("");
  const [partFeedback, setPartFeedback] = useState<FeedbackState>({ text: "", tone: "" });

  const resetDoctorInteraction = useCallback(() => {
    setSelectedDoctorOption("");
    setDoctorFeedback({ text: "", tone: "" });
  }, []);

  const resetPartInteraction = useCallback(() => {
    setSelectedPartOption("");
    setPartFeedback({ text: "", tone: "" });
  }, []);

  const answerDoctorQuiz = useCallback(
    (option: string, doctorQuiz: DoctorQuiz, doctorGuide: QuizGuide) => {
      if (selectedDoctorOption) return;
      setSelectedDoctorOption(option);

      const correct = option === doctorQuiz.answer;
      setLearningStats((prev) => ({
        ...prev,
        doctorQuizAttempts: prev.doctorQuizAttempts + 1,
        doctorQuizCorrect: prev.doctorQuizCorrect + (correct ? 1 : 0)
      }));

      if (correct) {
        setDoctorFeedback({
          text: `判断正确。${doctorQuiz.rationale} ${doctorGuide.success}`,
          tone: "ok"
        });
        return;
      }

      setDoctorFeedback({
        text: `这次不对，建议答案：${doctorQuiz.answer}。${doctorQuiz.rationale} ${doctorGuide.retry}`,
        tone: "bad"
      });
    },
    [selectedDoctorOption, setLearningStats]
  );

  const answerPartQuiz = useCallback(
    (option: string, partQuiz: PartQuiz, partGuide: QuizGuide) => {
      if (selectedPartOption) return;
      setSelectedPartOption(option);

      const correct = option === partQuiz.answer;
      setLearningStats((prev) => ({
        ...prev,
        partQuizAttempts: prev.partQuizAttempts + 1,
        partQuizCorrect: prev.partQuizCorrect + (correct ? 1 : 0)
      }));

      if (correct) {
        setAnsweredParts((prev) => {
          if (prev.includes(selectedPart)) return prev;
          return [...prev, selectedPart];
        });
        setPartFeedback({
          text: `答对了。${partQuiz.rationale} ${partGuide.success}`,
          tone: "ok"
        });
        return;
      }

      setPartFeedback({
        text: `这次不对，正确答案是：${partQuiz.answer}。${partQuiz.rationale} ${partGuide.retry}`,
        tone: "bad"
      });
    },
    [selectedPart, selectedPartOption, setAnsweredParts, setLearningStats]
  );

  return {
    selectedDoctorOption,
    doctorFeedback,
    selectedPartOption,
    partFeedback,
    resetDoctorInteraction,
    resetPartInteraction,
    answerDoctorQuiz,
    answerPartQuiz
  };
}