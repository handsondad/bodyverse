import { type StoryStageKey } from "../types/content";

type StoryPanelProps = {
  selectedTrack: string;
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

export function StoryPanel(props: StoryPanelProps) {
  const {
    selectedTrack,
    storyStages,
    sceneStepIndex,
    activeStoryStage,
    storyDetailText,
    storyDeepDive,
    storyMiniLab,
    sceneStatus,
    onPlay,
    onReset,
    onJump
  } = props;

  return (
    <section className="panel panel--wide panel--story">
      <div className="story-head">
        <h3>场景动画舱</h3>
        <div className="story-actions">
          <button type="button" className="chip" onClick={onPlay}>
            播放场景动画
          </button>
          <button type="button" className="chip" onClick={onReset}>
            重置
          </button>
        </div>
      </div>
      <p className="story-status">状态：{sceneStatus}</p>
      <p className="story-hint">
        {selectedTrack === "story" ? "口腔 -> 胃部 -> 小肠 -> 大肠，观察食物流动与变化。" : "当前不是场景故事主线，切换后可播放动画。"}
      </p>

      <div className="story-track">
        <div className="story-line" />
        {storyStages.map((stage, index) => (
          <button
            key={stage.key}
            type="button"
            className={`story-node ${sceneStepIndex === index ? "is-active" : ""} ${sceneStepIndex > index ? "is-done" : ""}`}
            style={{ left: `${stage.position}%` }}
            onClick={() => onJump(index)}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <p className="story-detail">{storyDetailText}</p>

      <div className="story-tabs">
        {storyStages.map((stage, index) => (
          <button
            key={`tab-${stage.key}`}
            type="button"
            className={`stage-tab ${activeStoryStage === stage.key ? "is-active" : ""}`}
            onClick={() => onJump(index)}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div className="story-grid">
        <div className="focus-box">
          <h4>站点机制：{storyStages.find((item) => item.key === activeStoryStage)?.label}</h4>
          <ul className="checklist">
            {storyDeepDive.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="focus-box">
          <h4>{storyMiniLab.title}</h4>
          <p>{storyMiniLab.hint}</p>
          <div className="meter-list">
            {storyMiniLab.metrics.map((metric) => (
              <div key={metric.label} className="meter-row">
                <span>{metric.label}</span>
                <div className="meter-track">
                  <div className="meter-fill" style={{ width: `${metric.value}%` }} />
                </div>
                <span>{metric.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
