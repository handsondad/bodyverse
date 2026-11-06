import { useState } from "react";
import { DepthPicker } from "../components/journey/DepthPicker";
import { journeyList, journeyOfPart, type JourneyId } from "../data/journey-registry";
import { questionBubbles } from "../data/journeys";
import { mystery, parts } from "../lib/content-adapter";
import type { AgeTier, PartId, TrackId } from "../types/content";
import "../components/journey/Journey.css";

const lenses: { id: TrackId; icon: string; label: string }[] = [
  { id: "anatomy", icon: "🦴", label: "它长什么样" },
  { id: "story", icon: "📖", label: "它在做什么" },
  { id: "science", icon: "⚙️", label: "为什么会这样" },
  { id: "illness", icon: "🩺", label: "生病了会怎样" }
];

type Props = { part: PartId; age: AgeTier; setAge: (age: AgeTier) => void; onBack: () => void; onJourney: (id: JourneyId) => void };

export function PartPage(props: Props) {
  return <PartJourney key={`${props.part}-${props.age}`} {...props} />;
}

function PartJourney({ part, age, setAge, onBack, onJourney }: Props) {
  const ownJourney = journeyOfPart(part);
  const pack = mystery[part];
  const overview = parts[part];
  const focus = pack.ageFocus[age];
  const emoji = questionBubbles.find((bubble) => bubble.part === part)?.emoji ?? "✨";
  const [reached, setReached] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [done, setDone] = useState<boolean[]>(() => focus.experimentSteps.map(() => false));
  const [lens, setLens] = useState<TrackId>("anatomy");
  const lensInfo = lenses.find((item) => item.id === lens) ?? lenses[0];

  const proceed = (step: number) => (
    reached === step && <button type="button" className="part-next" onClick={() => setReached(step + 1)}>继续 ↓</button>
  );

  return (
    <div className="part-page">
      <header className="journey-top">
        <button type="button" className="journey-back" onClick={onBack}>← 回到身体部位</button>
        <div className="journey-question">
          <span>{emoji} {pack.title}</span>
          <h1>{focus.question}</h1>
        </div>
        <DepthPicker age={age} setAge={setAge} />
      </header>

      <ol className="part-steps">
        <li className="part-step">
          <h2>🤔 第一步：先猜一猜</h2>
          <p>{pack.intro}</p>
          {guessed
            ? <p className="part-reveal">💡 {pack.essenceByTrack?.story ?? pack.perspectives.story}</p>
            : <button type="button" className="part-action" onClick={() => setGuessed(true)}>我想好了，看看奥秘</button>}
          {guessed && proceed(0)}
        </li>

        {reached >= 1 && (
          <li className="part-step">
            <h2>🧪 第二步：动手试试 · {focus.experimentTitle}</h2>
            <ul className="part-checks">
              {focus.experimentSteps.map((step, index) => (
                <li key={step}>
                  <label>
                    <input type="checkbox" checked={done[index]} onChange={() => setDone(done.map((value, i) => i === index ? !value : value))} />
                    {step}
                  </label>
                </li>
              ))}
            </ul>
            {done.every(Boolean)
              ? <p className="part-reveal">👀 你可能发现：{focus.observe}</p>
              : <p className="lab-hint">做完一步就打个勾。不方便做也可以先跳过。</p>}
            {proceed(1)}
          </li>
        )}

        {reached >= 2 && (
          <li className="part-step">
            <h2>🔍 第三步：换个角度看</h2>
            <div className="lab-row" role="group" aria-label="换个角度">
              {lenses.map((item) => (
                <button key={item.id} type="button" aria-pressed={lens === item.id} onClick={() => setLens(item.id)}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
            <div className="part-lens" aria-live="polite">
              <strong>{lensInfo.icon} {lensInfo.label}</strong>
              <p>{pack.perspectives[lens]}</p>
              {pack.essenceByTrack?.[lens] && <p className="part-reveal">{pack.essenceByTrack[lens]}</p>}
            </div>
            {proceed(2)}
          </li>
        )}

        {reached >= 3 && (
          <li className="part-step">
            <h2>🧬 第四步：一层层看进去</h2>
            <p>{overview.intro[age]}</p>
            <ol className="part-layers">
              {overview.layers.map((layer) => <li key={layer.key}><strong>{layer.key}</strong>{layer.text}</li>)}
            </ol>
            {pack.funFacts && pack.funFacts.length > 0 && (
              <div className="part-facts">
                <strong>🎈 你知道吗？</strong>
                <ul>{pack.funFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              </div>
            )}
            <div className="part-cta">
              <p>{ownJourney ? "想看它在身体里一层层是怎么工作的吗？" : "🚧 这个奥秘的 3D 放大旅程还在建造中。想先体验一路放大到分子的感觉吗？"}</p>
              {(ownJourney ? [ownJourney] : journeyList).map((journey) => (
                <button key={journey.id} type="button" className="journey-in" onClick={() => onJourney(journey.id)}>
                  {journey.emoji} 去{journey.title}
                </button>
              ))}
            </div>
          </li>
        )}
      </ol>

      <p className="journey-safety">本页是教学内容，不用于诊断。身体不舒服请告诉大人或就医。</p>
    </div>
  );
}
