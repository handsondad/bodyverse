import { type LearningStats } from "../types/content";

type ProgressQuizPanelProps = {
  progressRatio: number;
  visitedCount: number;
  answeredCount: number;
  totalParts: number;
  partAccuracy: number;
  doctorAccuracy: number;
  learningStats: LearningStats;
  partGuide: {
    title: string;
    intro: string;
    checklist: string[];
  };
  partQuiz: {
    question: string;
    options: string[];
    answer: string;
  };
  selectedPartOption: string;
  partFeedback: { text: string; tone: string };
  onAnswerPartQuiz: (option: string) => void;
};

export function ProgressQuizPanel(props: ProgressQuizPanelProps) {
  const {
    progressRatio,
    visitedCount,
    answeredCount,
    totalParts,
    partAccuracy,
    doctorAccuracy,
    learningStats,
    partGuide,
    partQuiz,
    selectedPartOption,
    partFeedback,
    onAnswerPartQuiz
  } = props;

  return (
    <>
      <section className="panel panel--progress">
        <h3>学习进度</h3>
        <p>综合进度 {progressRatio}%</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressRatio}%` }} />
        </div>
        <p className="progress-meta">
          已探索部位 {visitedCount}/{totalParts} · 已完成部位测验 {answeredCount}/{totalParts}
        </p>
        <ul className="checklist">
          <li>部位小测正确率：{partAccuracy}%</li>
          <li>医生问答正确率：{doctorAccuracy}%</li>
          <li>场景主线完成：{learningStats.storyCompleted ? "已完成" : "进行中"}</li>
          <li>就医主线完成：{learningStats.illnessCompleted ? "已完成" : "进行中"}</li>
        </ul>
      </section>

      <section className="panel panel--quiz">
        <h3>部位专项测验</h3>
        <p className="quiz-guide-title">{partGuide.title}</p>
        <p>{partGuide.intro}</p>
        <ul className="checklist">
          {partGuide.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="quiz-question">Q：{partQuiz.question}</p>
        <div className="doctor-options">
          {partQuiz.options.map((option) => {
            const isCorrect = option === partQuiz.answer;
            const isSelected = option === selectedPartOption;
            const optionClass = selectedPartOption ? (isCorrect ? "is-correct" : isSelected ? "is-wrong" : "") : "";

            return (
              <button
                key={option}
                type="button"
                className={`doctor-option ${optionClass}`}
                disabled={Boolean(selectedPartOption)}
                onClick={() => onAnswerPartQuiz(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {partFeedback.text ? <p className={`doctor-feedback ${partFeedback.tone}`}>{partFeedback.text}</p> : null}
      </section>
    </>
  );
}
