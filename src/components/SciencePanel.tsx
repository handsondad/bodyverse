import { type ScienceInputs } from "../types/content";

type SciencePanelProps = {
  selectedTrack: string;
  scienceInput: ScienceInputs;
  scienceMetrics: {
    mechanicalAdvantage: number;
    requiredForce: number;
    leverEfficiency: number;
    cardiacOutput: number;
    pressureIndex: number;
    normalizedPressure: number;
  };
  onUpdate: <K extends keyof ScienceInputs>(key: K, value: number) => void;
};

export function SciencePanel(props: SciencePanelProps) {
  const { selectedTrack, scienceInput, scienceMetrics, onUpdate } = props;

  return (
    <section className={`panel panel--wide panel--science ${selectedTrack !== "science" ? "is-disabled" : ""}`}>
      <h3>{selectedTrack === "science" ? "科学原理实验区" : "科学原理实验区（切换到科学主线激活）"}</h3>
      <p className="story-hint">
        {selectedTrack === "science" ? "通过调节参数，观察杠杆效率和心脏压力的变化。" : "当前不是科学原理主线，实验区以只读方式展示。"}
      </p>

      <div className="science-grid">
        <div className="focus-box">
          <h4>杠杆实验</h4>
          <label className="control-row">
            <span>动力臂：{scienceInput.effortArm}</span>
            <input type="range" min={20} max={50} step={1} value={scienceInput.effortArm} onChange={(event) => onUpdate("effortArm", Number(event.target.value))} />
          </label>
          <label className="control-row">
            <span>阻力臂：{scienceInput.loadArm}</span>
            <input type="range" min={10} max={40} step={1} value={scienceInput.loadArm} onChange={(event) => onUpdate("loadArm", Number(event.target.value))} />
          </label>
          <label className="control-row">
            <span>负重：{scienceInput.loadWeight}N</span>
            <input type="range" min={10} max={40} step={1} value={scienceInput.loadWeight} onChange={(event) => onUpdate("loadWeight", Number(event.target.value))} />
          </label>
          <p className="science-result">
            机械优势 {scienceMetrics.mechanicalAdvantage.toFixed(2)}，提起 {scienceInput.loadWeight}N 负重约需 {scienceMetrics.requiredForce.toFixed(1)}N 动力。
          </p>
          <div className="meter-track">
            <div className="meter-fill" style={{ width: `${scienceMetrics.leverEfficiency}%` }} />
          </div>
        </div>

        <div className="focus-box">
          <h4>心脏压力演示</h4>
          <label className="control-row">
            <span>心率：{scienceInput.heartRate} bpm</span>
            <input type="range" min={60} max={140} step={1} value={scienceInput.heartRate} onChange={(event) => onUpdate("heartRate", Number(event.target.value))} />
          </label>
          <label className="control-row">
            <span>每搏量：{scienceInput.strokeVolume} ml</span>
            <input type="range" min={40} max={120} step={1} value={scienceInput.strokeVolume} onChange={(event) => onUpdate("strokeVolume", Number(event.target.value))} />
          </label>
          <label className="control-row">
            <span>血管阻力：{scienceInput.vascularResistance}</span>
            <input
              type="range"
              min={70}
              max={150}
              step={1}
              value={scienceInput.vascularResistance}
              onChange={(event) => onUpdate("vascularResistance", Number(event.target.value))}
            />
          </label>
          <p className="science-result">
            心输出量约 {scienceMetrics.cardiacOutput.toFixed(1)} L/min，压力指数 {scienceMetrics.pressureIndex}。
          </p>
          <div className="meter-track">
            <div className="meter-fill" style={{ width: `${scienceMetrics.normalizedPressure}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
