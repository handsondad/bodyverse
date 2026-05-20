import { type IllnessStageKey } from "../types/content";

type IllnessPanelProps = {
  selectedTrack: string;
  illnessStatus: string;
  illnessStages: Array<{ key: IllnessStageKey; label: string }>;
  illnessStepIndex: number;
  activeIllnessStage: IllnessStageKey;
  illnessDetailText: string;
  doctorGuide: {
    title: string;
    intro: string;
    checklist: string[];
  };
  doctorQuiz: {
    question: string;
    options: string[];
    answer: string;
  };
  selectedDoctorOption: string;
  doctorFeedback: { text: string; tone: string };
  onPlay: () => void;
  onReset: () => void;
  onJump: (index: number) => void;
  onAnswer: (option: string) => void;
};

export function IllnessPanel(props: IllnessPanelProps) {
  const {
    selectedTrack,
    illnessStatus,
    illnessStages,
    illnessStepIndex,
    activeIllnessStage,
    illnessDetailText,
    doctorGuide,
    doctorQuiz,
    selectedDoctorOption,
    doctorFeedback,
    onPlay,
    onReset,
    onJump,
    onAnswer
  } = props;

  return (
    <section className={`panel panel--wide panel--illness ${selectedTrack !== "illness" ? "is-disabled" : ""}`}>
      <div className="story-head">
        <h3>{selectedTrack === "illness" ? "生病就医模拟区" : "生病就医模拟区（切换到该主线激活）"}</h3>
        <div className="story-actions">
          <button type="button" className="chip" onClick={onPlay}>
            播放就医流程
          </button>
          <button type="button" className="chip" onClick={onReset}>
            重置
          </button>
        </div>
      </div>

      <p className="story-status">状态：{illnessStatus}</p>
      <p className="story-hint">
        {selectedTrack === "illness" ? "观察从感染到恢复的过程，并尝试医生决策问答。" : "当前不是生病就医主线，模拟区以只读方式展示。"}
      </p>

      <div className="illness-track">
        <div className="story-line" />
        {illnessStages.map((stage, index) => (
          <button
            key={stage.key}
            type="button"
            className={`illness-node ${illnessStepIndex === index ? "is-active" : ""} ${illnessStepIndex > index ? "is-done" : ""}`}
            style={{ left: `${10 + index * 28}%` }}
            onClick={() => onJump(index)}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div className="illness-grid">
        <div className="focus-box">
          <h4>阶段说明：{illnessStages.find((item) => item.key === activeIllnessStage)?.label}</h4>
          <p>{illnessDetailText}</p>
        </div>

        <div className="focus-box">
          <h4>医生决策问答：{illnessStages.find((item) => item.key === activeIllnessStage)?.label}</h4>
          <p className="quiz-guide-title">{doctorGuide.title}</p>
          <p>{doctorGuide.intro}</p>
          <ul className="checklist">
            {doctorGuide.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="quiz-question">Q：{doctorQuiz.question}</p>
          <div className="doctor-options">
            {doctorQuiz.options.map((option) => {
              const isCorrect = option === doctorQuiz.answer;
              const isSelected = option === selectedDoctorOption;
              const optionClass = selectedDoctorOption ? (isCorrect ? "is-correct" : isSelected ? "is-wrong" : "") : "";

              return (
                <button
                  key={option}
                  type="button"
                  className={`doctor-option ${optionClass}`}
                  disabled={Boolean(selectedDoctorOption)}
                  onClick={() => onAnswer(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {doctorFeedback.text ? <p className={`doctor-feedback ${doctorFeedback.tone}`}>{doctorFeedback.text}</p> : null}
        </div>
      </div>
    </section>
  );
}
