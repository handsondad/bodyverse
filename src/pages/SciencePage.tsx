import { type ScienceInputs } from "../types/content";

type SciencePageProps = {
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

export function SciencePage(props: SciencePageProps) {
  const { scienceInput, scienceMetrics, onUpdate } = props;

  return (
    <div className="page-content">
      <div className="card">
        <h3 className="card-title">科学原理实验区</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          通过调节参数，观察杠杆效率和心脏压力的变化。
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        <div className="card">
          <h3 className="card-title">⚙️ 杠杆实验</h3>
          
          <div className="slider-control">
            <label>
              <span>动力臂</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.effortArm}</span>
            </label>
            <input
              type="range"
              min={20}
              max={50}
              step={1}
              value={scienceInput.effortArm}
              onChange={(event) => onUpdate("effortArm", Number(event.target.value))}
            />
          </div>

          <div className="slider-control">
            <label>
              <span>阻力臂</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.loadArm}</span>
            </label>
            <input
              type="range"
              min={10}
              max={40}
              step={1}
              value={scienceInput.loadArm}
              onChange={(event) => onUpdate("loadArm", Number(event.target.value))}
            />
          </div>

          <div className="slider-control">
            <label>
              <span>负重</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.loadWeight}N</span>
            </label>
            <input
              type="range"
              min={10}
              max={40}
              step={1}
              value={scienceInput.loadWeight}
              onChange={(event) => onUpdate("loadWeight", Number(event.target.value))}
            />
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--accent-success)", borderRadius: "var(--radius-md)" }}>
            <p style={{ margin: "0", color: "var(--accent-success)", fontWeight: "500" }}>
              机械优势 {scienceMetrics.mechanicalAdvantage.toFixed(2)}，提起 {scienceInput.loadWeight}N 负重约需 {scienceMetrics.requiredForce.toFixed(1)}N 动力。
            </p>
          </div>

          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>杠杆效率</span>
              <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{scienceMetrics.leverEfficiency}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${scienceMetrics.leverEfficiency}%` }} />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">❤️ 心脏压力演示</h3>
          
          <div className="slider-control">
            <label>
              <span>心率</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.heartRate} bpm</span>
            </label>
            <input
              type="range"
              min={60}
              max={140}
              step={1}
              value={scienceInput.heartRate}
              onChange={(event) => onUpdate("heartRate", Number(event.target.value))}
            />
          </div>

          <div className="slider-control">
            <label>
              <span>每搏量</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.strokeVolume} ml</span>
            </label>
            <input
              type="range"
              min={40}
              max={120}
              step={1}
              value={scienceInput.strokeVolume}
              onChange={(event) => onUpdate("strokeVolume", Number(event.target.value))}
            />
          </div>

          <div className="slider-control">
            <label>
              <span>血管阻力</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>{scienceInput.vascularResistance}</span>
            </label>
            <input
              type="range"
              min={70}
              max={150}
              step={1}
              value={scienceInput.vascularResistance}
              onChange={(event) => onUpdate("vascularResistance", Number(event.target.value))}
            />
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "rgba(59, 130, 246, 0.1)", border: "1px solid var(--accent-primary)", borderRadius: "var(--radius-md)" }}>
            <p style={{ margin: "0", color: "var(--accent-primary)", fontWeight: "500" }}>
              心输出量约 {scienceMetrics.cardiacOutput.toFixed(1)} L/min，压力指数 {scienceMetrics.pressureIndex}。
            </p>
          </div>

          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>压力指数</span>
              <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{scienceMetrics.normalizedPressure}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${scienceMetrics.normalizedPressure}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
