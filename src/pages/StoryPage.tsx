import { type StoryStageKey } from "../types/content";

type StoryPageProps = {
  storyStages: Array<{ key: StoryStageKey; label: string; position: number }>;
  sceneStepIndex: number;
  activeStoryStage: StoryStageKey;
  storyDetailText: string;
  storyDeepDive: string[];
  storyMiniLab: {
    title: string;
    hint: string;
    metrics: Array<{ label: string; value: number }>;
  };
  sceneStatus: string;
  onPlay: () => void;
  onReset: () => void;
  onJump: (index: number) => void;
};

export function StoryPage(props: StoryPageProps) {
  const {
    storyStages,
    sceneStepIndex,
    activeStoryStage,
    storyDetailText,
    storyDeepDive,
    storyMiniLab,
    sceneStatus,
    onPlay,
    onReset,
    onJump,
  } = props;

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">场景动画舱</h3>
          <div className="page-actions">
            <button className="btn btn-primary" onClick={onPlay}>
              ▶ 播放场景动画
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              🔄 重置
            </button>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span className="chip chip-primary">状态</span>
          <span style={{ color: "var(--text-secondary)" }}>{sceneStatus}</span>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          口腔 -&gt; 胃部 -&gt; 小肠 -&gt; 大肠，观察食物流动与变化。
        </p>

        <div className="timeline-track">
          <div className="timeline-line" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {storyStages.map((stage, index) => (
              <button
                key={stage.key}
                className={`timeline-node ${sceneStepIndex === index ? "is-active" : ""} ${sceneStepIndex > index ? "is-done" : ""}`}
                onClick={() => onJump(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="timeline-node-dot" />
                <span className="timeline-node-label">{stage.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px", padding: "16px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
          <p style={{ margin: "0", color: "var(--text-secondary)" }}>{storyDetailText}</p>
        </div>
      </div>

      <div className="tabs">
        {storyStages.map((stage, index) => (
          <button
            key={`tab-${stage.key}`}
            className={`tab ${activeStoryStage === stage.key ? "is-active" : ""}`}
            onClick={() => onJump(index)}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        <div className="card">
          <h3 className="card-title">站点机制：{storyStages.find((item) => item.key === activeStoryStage)?.label}</h3>
          <ul style={{ marginTop: "12px", paddingLeft: "20px", display: "grid", gap: "8px" }}>
            {storyDeepDive.map((line) => (
              <li key={line} style={{ color: "var(--text-secondary)" }}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title">{storyMiniLab.title}</h3>
          <p style={{ color: "var(--text-secondary)" }}>{storyMiniLab.hint}</p>
          <div style={{ marginTop: "16px" }}>
            {storyMiniLab.metrics.map((metric) => (
              <div key={metric.label} className="metric-bar">
                <span className="metric-label">{metric.label}</span>
                <div className="metric-track">
                  <div className="metric-fill" style={{ width: `${metric.value}%` }} />
                </div>
                <span className="metric-value">{metric.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
