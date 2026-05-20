import { type AgeTier, type PartId, type TrackId } from "../types/content";

type HeaderControlsProps = {
  ageTiers: AgeTier[];
  age: AgeTier;
  setAge: (age: AgeTier) => void;
  tracks: Array<{ id: TrackId; title: string; description: string }>;
  selectedTrack: TrackId;
  setSelectedTrack: (track: TrackId) => void;
  partIds: PartId[];
  selectedPart: PartId;
  setSelectedPart: (part: PartId) => void;
  partLabelMap: Record<PartId, string>;
  onSpeak: () => void;
  onStopSpeak: () => void;
  voiceStatus: string;
};

export function HeaderControls(props: HeaderControlsProps) {
  const {
    ageTiers,
    age,
    setAge,
    tracks,
    selectedTrack,
    setSelectedTrack,
    partIds,
    selectedPart,
    setSelectedPart,
    partLabelMap,
    onSpeak,
    onStopSpeak,
    voiceStatus
  } = props;
  const activeTrack = tracks.find((item) => item.id === selectedTrack);
  const activePart = partLabelMap[selectedPart];

  return (
    <header className="hero shell">
      <p className="hero__badge">React + TypeScript 重构版</p>
      <h1>认识身体 · 奥秘探索舱</h1>
      <p className="hero__intro">围绕同一个部位，切换年龄层与主线表达，观察身体奥秘如何从现象理解走向系统推理。</p>
      <div className="hero-status" aria-label="当前学习上下文" role="status">
        <span className="hero-status__item">
          年龄层
          <strong>{age} 岁</strong>
        </span>
        <span className="hero-status__item">
          主线
          <strong>{activeTrack?.title ?? "未选择"}</strong>
        </span>
        <span className="hero-status__item">
          部位
          <strong>{activePart}</strong>
        </span>
      </div>

      <section className="picker-group" aria-label="年龄层选择">
        <h2>年龄层</h2>
        <div className="chip-row">
          {ageTiers.map((tier) => (
            <button key={tier} type="button" className={`chip ${age === tier ? "is-active" : ""}`} onClick={() => setAge(tier)}>
              {tier} 岁
            </button>
          ))}
        </div>
      </section>

      <section className="picker-group" aria-label="主线选择">
        <h2>主线</h2>
        <div className="track-grid">
          {tracks.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`track-card ${item.id === selectedTrack ? "is-active" : ""}`}
              onClick={() => setSelectedTrack(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="picker-group" aria-label="部位选择">
        <h2>部位</h2>
        <div className="chip-row">
          {partIds.map((partId) => (
            <button
              key={partId}
              type="button"
              className={`chip chip--part ${selectedPart === partId ? "is-active" : ""}`}
              onClick={() => setSelectedPart(partId)}
            >
              {partLabelMap[partId]}
            </button>
          ))}
        </div>
      </section>

      <section className="picker-group" aria-label="语音播报">
        <h2>语音播报</h2>
        <div className="voice-row">
          <button type="button" className="chip" onClick={onSpeak}>
            播报当前奥秘
          </button>
          <button type="button" className="chip" onClick={onStopSpeak}>
            停止播报
          </button>
          <p>{voiceStatus}</p>
        </div>
      </section>
    </header>
  );
}
