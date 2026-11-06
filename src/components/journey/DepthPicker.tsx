import { depthLevels } from "../../data/journeys";
import type { AgeTier } from "../../types/content";

export function DepthPicker({ age, setAge }: { age: AgeTier; setAge: (age: AgeTier) => void }) {
  return (
    <div className="depth-picker" role="group" aria-label="讲解深度">
      <span className="depth-picker-title">讲解深度</span>
      {depthLevels.map((level) => (
        <button key={level.tier} type="button" aria-pressed={age === level.tier} title={`${level.ages} · ${level.hint}`}
          onClick={() => setAge(level.tier)}>
          <span aria-hidden="true">{level.icon}</span>{level.name}
          <small>{level.ages}</small>
        </button>
      ))}
    </div>
  );
}
