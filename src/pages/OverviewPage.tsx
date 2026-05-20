import { type AgeTier, type LearningStats, type PartId } from "../types/content";

type OverviewPageProps = {
  age: AgeTier;
  selectedPart: PartId;
  partLabelMap: Record<PartId, string>;
  progressRatio: number;
  visitedCount: number;
  answeredCount: number;
  totalParts: number;
  partAccuracy: number;
  doctorAccuracy: number;
  learningStats: LearningStats;
  oneLineEssence: string;
  agePackQuestion: string;
  agePackExperimentTitle: string;
  agePackExperimentSteps: string[];
  agePackObserve: string;
  ageLens: {
    label: string;
    summary: string;
    checklist: string[];
  };
  trackSteps: string[];
  trackTitle: string;
  partOverview: {
    title: string;
    intro: Record<AgeTier, string>;
    layers: Array<{ key: string; text: string }>;
  };
  onSpeak: () => void;
  onStopSpeak: () => void;
  voiceStatus: string;
};

export function OverviewPage(props: OverviewPageProps) {
  const {
    age,
    selectedPart,
    partLabelMap,
    progressRatio,
    visitedCount,
    answeredCount,
    totalParts,
    partAccuracy,
    doctorAccuracy,
    learningStats,
    oneLineEssence,
    agePackQuestion,
    agePackExperimentTitle,
    agePackExperimentSteps,
    agePackObserve,
    ageLens,
    trackSteps,
    trackTitle,
    partOverview,
    onSpeak,
    onStopSpeak,
    voiceStatus,
  } = props;

  return (
    <div className="page-content">
      <div className="stat-grid">
        <div className="stat-card">
          <strong>{progressRatio}%</strong>
          <span>学习进度</span>
        </div>
        <div className="stat-card">
          <strong>{visitedCount}/{totalParts}</strong>
          <span>已探索部位</span>
        </div>
        <div className="stat-card">
          <strong>{answeredCount}/{totalParts}</strong>
          <span>已完成测验</span>
        </div>
        <div className="stat-card">
          <strong>{partAccuracy}%</strong>
          <span>部位测验正确率</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{partOverview.title}</h3>
            <p className="card-subtitle">当前学习部位：{partLabelMap[selectedPart]} · 年龄层：{age}岁</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary btn-sm" onClick={onSpeak}>
              🔊 播报奥秘
            </button>
            <button className="btn btn-outline btn-sm" onClick={onStopSpeak}>
              ⏹ 停止播报
            </button>
          </div>
        </div>
        <p>{partOverview.intro[age]}</p>
        
        <div style={{ marginTop: "16px" }}>
          <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>结构层次</h4>
          <div style={{ display: "grid", gap: "8px" }}>
            {partOverview.layers.map((layer) => (
              <div key={layer.key} style={{ display: "flex", gap: "12px", padding: "10px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontWeight: "600", color: "var(--accent-primary)", minWidth: "80px" }}>{layer.key}</span>
                <span style={{ color: "var(--text-secondary)" }}>{layer.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">奥秘一句话</h3>
        <div style={{ padding: "16px", background: "rgba(59, 130, 246, 0.1)", borderLeft: "4px solid var(--accent-primary)", borderRadius: "var(--radius-md)" }}>
          <p style={{ margin: "0", fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>{oneLineEssence}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">年龄表达镜头</h3>
        <span className="chip chip-primary">{ageLens.label}</span>
        <p style={{ marginTop: "12px", color: "var(--text-secondary)" }}>{ageLens.summary}</p>
        <ul style={{ marginTop: "12px", paddingLeft: "20px", display: "grid", gap: "8px" }}>
          {ageLens.checklist.map((item) => (
            <li key={item} style={{ color: "var(--text-secondary)" }}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">{trackTitle} · 主线时间线</h3>
        <ol style={{ marginTop: "12px", paddingLeft: "20px", display: "grid", gap: "12px" }}>
          {trackSteps.map((step, index) => (
            <li key={step} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", background: "var(--accent-primary)", color: "white", borderRadius: "50%", fontSize: "0.85rem", fontWeight: "600", flexShrink: "0" }}>
                {index + 1}
              </span>
              <span style={{ color: "var(--text-secondary)", paddingTop: "4px" }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <h3 className="card-title">当前年龄层关键问题</h3>
        <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>{agePackQuestion}</p>
      </div>

      <div className="card">
        <h3 className="card-title">{agePackExperimentTitle}</h3>
        <ol style={{ marginTop: "12px", paddingLeft: "20px", display: "grid", gap: "8px" }}>
          {agePackExperimentSteps.map((step) => (
            <li key={step} style={{ color: "var(--text-secondary)" }}>{step}</li>
          ))}
        </ol>
        <div style={{ marginTop: "16px", padding: "12px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontWeight: "600", color: "var(--accent-success)" }}>观察点：</span>
          <span style={{ color: "var(--text-secondary)" }}>{agePackObserve}</span>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">学习统计</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressRatio}%` }} />
        </div>
        <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>医生问答正确率</span>
            <p style={{ margin: "4px 0 0", fontSize: "1.5rem", fontWeight: "700", color: "var(--text-primary)" }}>{doctorAccuracy}%</p>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>场景主线完成</span>
            <p style={{ margin: "4px 0 0", fontSize: "1.5rem", fontWeight: "700", color: learningStats.storyCompleted ? "var(--accent-success)" : "var(--accent-warning)" }}>
              {learningStats.storyCompleted ? "已完成" : "进行中"}
            </p>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>就医主线完成</span>
            <p style={{ margin: "4px 0 0", fontSize: "1.5rem", fontWeight: "700", color: learningStats.illnessCompleted ? "var(--accent-success)" : "var(--accent-warning)" }}>
              {learningStats.illnessCompleted ? "已完成" : "进行中"}
            </p>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>语音状态</span>
            <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{voiceStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
