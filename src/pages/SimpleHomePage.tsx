import { type PartId, type TrackId } from "../types/content";
import { HumanBodyMap } from "../components/HumanBodyMap";
import { mystery } from "../lib/content-adapter";

const trackIcons: Record<TrackId, string> = {
  anatomy: "🧬",
  story: "📖",
  science: "🔬",
  illness: "🏥",
};

const trackTitles: Record<TrackId, string> = {
  anatomy: "分层解剖",
  story: "场景故事",
  science: "科学原理",
  illness: "生病就医",
};

type SimpleHomePageProps = {
  selectedPart: PartId;
  setSelectedPart: (part: PartId) => void;
  selectedTrack: TrackId;
  setSelectedTrack: (track: TrackId) => void;
  partLabelMap: Record<PartId, string>;
  age: string;
};

export function SimpleHomePage(props: SimpleHomePageProps) {
  const { selectedPart, setSelectedPart, selectedTrack, setSelectedTrack, partLabelMap, age } = props;

  const currentMystery = mystery[selectedPart];
  const essence = currentMystery.essenceByTrack?.[selectedTrack] || currentMystery.perspectives[selectedTrack];
  const perspective = currentMystery.perspectives[selectedTrack];

  const agePack = currentMystery.ageFocus[age as keyof typeof currentMystery.ageFocus];

  return (
    <div className="simple-home">
      <div className="home-section body-section">
        <HumanBodyMap
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
          partLabelMap={partLabelMap}
        />
      </div>

      <div className="home-section content-section">
        <div className="mystery-card">
          <div className="mystery-title">
            {partLabelMap[selectedPart]}的奥秘
          </div>
          <div className="mystery-content">
            {essence}
          </div>
        </div>

        <div className="essence-card">
          <div className="essence-header">
            <div className="essence-icon" style={{ backgroundColor: "rgba(76, 175, 80, 0.15)" }}>
              {trackIcons[selectedTrack]}
            </div>
            <div className="essence-title">{trackTitles[selectedTrack]}</div>
          </div>
          <div className="essence-text">
            {perspective}
          </div>
        </div>

        {agePack && (
          <div className="essence-card">
            <div className="essence-header">
              <div className="essence-icon" style={{ backgroundColor: "rgba(255, 152, 0, 0.15)" }}>
                🎯
              </div>
              <div className="essence-title">探索问题</div>
            </div>
            <div className="essence-text">
              <strong>{agePack.question}</strong>
            </div>
          </div>
        )}

        {agePack && agePack.experimentTitle && (
          <div className="essence-card">
            <div className="essence-header">
              <div className="essence-icon" style={{ backgroundColor: "rgba(96, 165, 250, 0.15)" }}>
                🧪
              </div>
              <div className="essence-title">{agePack.experimentTitle}</div>
            </div>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              {agePack.experimentSteps.map((step, index) => (
                <li key={index} className="essence-text" style={{ marginBottom: "8px" }}>
                  <strong>{index + 1}.</strong> {step}
                </li>
              ))}
            </ul>
            <div className="essence-text" style={{ marginTop: "12px", fontStyle: "italic", color: "#66bb6a" }}>
              💡 {agePack.observe}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}