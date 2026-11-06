import { useState } from "react";
import type { OrganLabConfig } from "../../data/journey-registry";
import { depthLevels, depthOf, sciencesOf, type ScaleStop } from "../../data/journeys";
import type { AgeTier } from "../../types/content";
import type { ExplorationNode, ScaleId } from "../../types/exploration";

export function ScaleLadder({ stops, current, recommended, visited, onSelect }: {
  stops: readonly ScaleStop[]; current: ScaleId; recommended: ScaleId; visited: ReadonlySet<ScaleId>; onSelect: (id: ScaleId) => void;
}) {
  const recommendedIndex = stops.findIndex((stop) => stop.id === recommended);
  return (
    <ol className="scale-ladder" aria-label="放大的层级">
      {stops.map((stop, index) => (
        <li key={stop.id} className={index > recommendedIndex ? "is-deeper" : ""}>
          {index > 0 && <span className="scale-zoom" aria-hidden="true">🔍</span>}
          <button type="button" aria-current={stop.id === current ? "step" : undefined} onClick={() => onSelect(stop.id)}>
            <span className="scale-emoji" aria-hidden="true">{visited.has(stop.id) ? "⭐" : stop.emoji}</span>
            <strong>{stop.short}</strong>
            <small>{stop.size}</small>
            {stop.id === recommended && <em>推荐先到这里</em>}
            {index === recommendedIndex + 1 && <em>好奇就继续 →</em>}
          </button>
        </li>
      ))}
    </ol>
  );
}

// Starts at the chosen depth; each "我还想知道" opens the next depth's explanation below it.
export function DepthCard({ node, stop, age }: { node: ExplorationNode; stop: ScaleStop; age: AgeTier }) {
  const start = depthLevels.findIndex((level) => level.tier === age);
  const [shown, setShown] = useState(start);
  const next = depthLevels[shown + 1];
  const [discipline, theme] = node.discipline.split("·").map((part) => part.trim());

  return (
    <article className="depth-card" aria-live="polite">
      <div className="science-chips">
        {sciencesOf(discipline).map((science) => <span key={science} className={`science science-${science}`}>{science}</span>)}
        {theme && <small>{theme}</small>}
      </div>
      <h2><span aria-hidden="true">{stop.emoji}</span> {node.title}</h2>
      {depthLevels.slice(start, shown + 1).map((level, index) => (
        <div key={level.tier} className={index === 0 ? "depth-text" : "depth-text is-deeper"}>
          <span className="depth-badge">{level.icon} {level.name}</span>
          <p>{node.text[level.tier]}</p>
        </div>
      ))}
      {next && (
        <button type="button" className="depth-more" onClick={() => setShown(shown + 1)}>
          🤔 我还想知道更多 <small>{next.icon} {next.name}</small>
        </button>
      )}
      <p className="depth-think"><strong>💭 想一想：</strong>{node.question}</p>
      <details className="depth-analogy">
        <summary>这个比喻哪里不对？</summary>
        <p>{node.analogyLimit}</p>
      </details>
    </article>
  );
}

type Prediction = "more" | "same" | "less";

export function OrganLab({ lab, running, setRunning, age }: { lab: OrganLabConfig; running: boolean; setRunning: (running: boolean) => void; age: AgeTier }) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const rate = running ? lab.runRate : lab.restRate;
  const total = lab.total(rate);
  const showMath = age === "10-12" || age === "13+";

  return (
    <div className="stage-lab">
      <p className="stage-lab-title">🧪 动手试试：{lab.question}</p>
      <div className="lab-row" role="group" aria-label="先猜一猜">
        {([["more", "变多"], ["same", "不变"], ["less", "变少"]] as const).map(([value, label]) => (
          <button key={value} type="button" aria-pressed={prediction === value} onClick={() => setPrediction(value)}>{label}</button>
        ))}
      </div>
      {prediction && (
        <>
          <div className="lab-row" role="group" aria-label="切换身体状态">
            <button type="button" aria-pressed={!running} onClick={() => setRunning(false)}>😌 安静时</button>
            <button type="button" aria-pressed={running} onClick={() => setRunning(true)}>🏃 跑步后</button>
          </div>
          <output className="lab-result">
            每分钟{lab.rateWord} <strong>{rate}</strong> 次，{lab.perUnit}，一分钟一共 <strong>{total.toLocaleString("zh-CN")}</strong> {lab.unit}。
            {showMath && <span>{lab.formula(rate, total)}</span>}
          </output>
          {running && (
            <p className="lab-feedback">
              {prediction === "more" ? "✅ 和你猜的一样！" : `🔎 看看数字：${lab.rateWord}得更快，一分钟的总量变多了。`}
              {lab.observe}
            </p>
          )}
        </>
      )}
      <p className="lab-note">教学模型数值，不是你的测量结果，也不是健康标准。</p>
    </div>
  );
}

export function ToggleLab({ stop, toggles, setToggle, question }: {
  stop: ScaleStop; toggles: Record<string, boolean>; setToggle: (id: string, on: boolean) => void; question: string;
}) {
  if (!stop.toggles.length) return null;
  const off = stop.toggles.filter((toggle) => toggles[toggle.id] === false);
  return (
    <div className="stage-lab">
      <p className="stage-lab-title">🧪 动手试试：{question}</p>
      <div className="lab-row">
        {stop.toggles.map((toggle) => {
          const on = toggles[toggle.id] !== false;
          return (
            <button key={toggle.id} type="button" aria-pressed={!on} onClick={() => setToggle(toggle.id, !on)}>
              {on ? `✂️ ${toggle.offLabel}` : `↩️ 恢复：${toggle.label}`}
            </button>
          );
        })}
      </div>
      {off.length > 0
        ? off.map((toggle) => <p key={toggle.id} className="lab-feedback">🔎 {toggle.whenOff}</p>)
        : <p className="lab-hint">先看正常的样子，再点上面的按钮“捣个乱”，比一比有什么不同。</p>}
    </div>
  );
}

export function MysteryChain({ stops, visited, age }: { stops: readonly ScaleStop[]; visited: ReadonlySet<ScaleId>; age: AgeTier }) {
  const done = stops.every((stop) => visited.has(stop.id));
  return (
    <section className="mystery-chain" aria-label="奥秘链">
      <h2>🔗 奥秘链 {done ? "· 全部串起来啦！" : `· 已找到 ${stops.filter((stop) => visited.has(stop.id)).length} / ${stops.length} 环`}</h2>
      <ol>
        {stops.map((stop) => (
          <li key={stop.id} className={visited.has(stop.id) ? "is-found" : ""}>
            <span aria-hidden="true">{visited.has(stop.id) ? stop.emoji : "❔"}</span>
            {visited.has(stop.id) ? stop.chain : `放大到「${stop.short}」找到这一环`}
          </li>
        ))}
      </ol>
      {done && (
        <p className="chain-tell">
          🗣️ 试着不看屏幕，把这条链从上到下讲给家人听。{depthOf(age).tier === "4-6" ? "讲到哪里卡住了，就回去再看一看。" : "能不能再补一句：每一环为什么会引起下一环？"}
        </p>
      )}
    </section>
  );
}
