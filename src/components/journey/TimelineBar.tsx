import { stageIndexAt, type MotionStage } from "../../lib/motion";
import type { MotionTimeline } from "../../hooks/useMotionTimeline";

const speeds = [
  { value: 0.25, label: "🐢 超慢" },
  { value: 0.5, label: "🚶 慢一点" },
  { value: 1, label: "🏃 真实节奏" }
];

export function TimelineBar({ timeline, stages, disabled }: { timeline: MotionTimeline; stages: readonly MotionStage[]; disabled?: boolean }) {
  const { phase, playing, speed, setPlaying, setSpeed, seek, step } = timeline;
  const current = stageIndexAt(stages, phase);

  return (
    <div className="timeline" aria-label="动画播放控制">
      <p className="timeline-caption" aria-live="polite">
        <span>{current + 1} / {stages.length}</span>
        {stages[current].label}
      </p>
      <ol className="timeline-stages">
        {stages.map((stage, index) => (
          <li key={stage.label}>
            <button type="button" aria-current={index === current ? "step" : undefined} disabled={disabled}
              onClick={() => {
                setPlaying(false);
                seek(stage.start + 0.02);
              }}>
              {index + 1}. {stage.label}
            </button>
          </li>
        ))}
      </ol>
      <div className="timeline-controls">
        <button type="button" className="timeline-play" aria-pressed={playing} disabled={disabled} onClick={() => setPlaying(!playing)}>
          {playing ? "❚❚ 暂停" : "▶ 播放"}
        </button>
        <button type="button" disabled={disabled} onClick={() => step(-1)} aria-label="后退一小步">◀</button>
        <button type="button" disabled={disabled} onClick={() => step(1)} aria-label="前进一小步">▶|</button>
        <input type="range" min={0} max={1000} value={Math.round(phase * 1000)} disabled={disabled}
          aria-label="拖动看每一刻" aria-valuetext={stages[current].label}
          onChange={(event) => {
            setPlaying(false);
            seek(Number(event.target.value) / 1000);
          }} />
        <div className="timeline-speeds" role="group" aria-label="播放速度">
          {speeds.map((option) => (
            <button key={option.value} type="button" aria-pressed={speed === option.value} disabled={disabled}
              onClick={() => setSpeed(option.value)}>{option.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
