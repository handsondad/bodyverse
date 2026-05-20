import { type IllnessStageKey } from "../types/content";

type IllnessPageProps = {
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

export function IllnessPage(props: IllnessPageProps) {
  const {
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
    onAnswer,
  } = props;

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">生病就医模拟区</h3>
          <div className="page-actions">
            <button className="btn btn-primary" onClick={onPlay}>
              ▶ 播放就医流程
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              🔄 重置
            </button>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span className="chip chip-warning">状态</span>
          <span style={{ color: "var(--text-secondary)" }}>{illnessStatus}</span>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          观察从感染到恢复的过程，并尝试医生决策问答。
        </p>

        <div className="timeline-track">
          <div className="timeline-line" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {illnessStages.map((stage, index) => (
              <button
                key={stage.key}
                className={`timeline-node ${illnessStepIndex === index ? "is-active" : ""} ${illnessStepIndex > index ? "is-done" : ""}`}
                onClick={() => onJump(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="timeline-node-dot" />
                <span className="timeline-node-label">{stage.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        <div className="card">
          <h3 className="card-title">阶段说明：{illnessStages.find((item) => item.key === activeIllnessStage)?.label}</h3>
          <p style={{ color: "var(--text-secondary)" }}>{illnessDetailText}</p>
        </div>

        <div className="card">
          <h3 className="card-title">👩⚕️ 医生决策问答</h3>
          
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "var(--accent-primary)" }}>{doctorGuide.title}</h4>
            <p style={{ margin: "0 0 12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>{doctorGuide.intro}</p>
            <ul style={{ margin: "0", paddingLeft: "20px", display: "grid", gap: "6px" }}>
              {doctorGuide.checklist.map((item) => (
                <li key={item} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ margin: "0 0 12px", fontWeight: "600", color: "var(--text-primary)" }}>Q：{doctorQuiz.question}</p>
            
            <div style={{ display: "grid", gap: "10px" }}>
              {doctorQuiz.options.map((option) => {
                const isCorrect = option === doctorQuiz.answer;
                const isSelected = option === selectedDoctorOption;
                const optionClass = selectedDoctorOption ? (isCorrect ? "is-correct" : isSelected ? "is-wrong" : "") : "";

                return (
                  <button
                    key={option}
                    className={`quiz-option ${optionClass}`}
                    disabled={Boolean(selectedDoctorOption)}
                    onClick={() => onAnswer(option)}
                  >
                    <div className="quiz-option-radio" />
                    <span className="quiz-option-content">{option}</span>
                  </button>
                );
              })}
            </div>

            {doctorFeedback.text && (
              <div className={`feedback-box ${doctorFeedback.tone === "ok" ? "success" : "error"}`}>
                {doctorFeedback.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
