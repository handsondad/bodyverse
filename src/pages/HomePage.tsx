import { lazy, Suspense, useRef, useState, type CSSProperties } from "react";
import type { LensState, RunLabCue } from "../components/RunLab3D";
import { WebGLBoundary } from "../components/WebGLBoundary";
import { bodySystems, questionsIn, type BodySystemId } from "../data/questions";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL } from "../lib/heart-3d";
import { createBodyState } from "../lib/run-lab";
import "../components/RunLab.css";
import "../components/journey/Journey.css";
import "./Questions.css";

const RunLab3D = lazy(() => import("../components/RunLab3D"));

const chats: readonly (readonly [string, string])[] = [
  ["爸爸，我的身体里怎么有那么多奇怪的事？", "你发现一件，就问我一件，我们一起把原因找出来。"],
  ["打喷嚏、打嗝、起鸡皮疙瘩，都是身体自己动的！", "对！先看看发生了什么，再一层层往里找为什么。"],
  ["那能一直问到分子那么小吗？", "能！只要你还想知道，爸爸就接着往下讲。"]
];

type Props = {
  heard: readonly string[];
  onSystem: (id: BodySystemId) => void;
};

export function HomePage({ heard, onSystem }: Props) {
  const [webgl] = useState(canUseWebGL);
  const reducedMotion = useReducedMotion();
  const [stageRef, inView] = useInView<HTMLDivElement>();
  const [chat, setChat] = useState(0);
  const bodyRef = useRef(createBodyState());
  const lensRef = useRef<LensState>({ on: false, follow: true, x: 0, y: 0, r: 80 });
  const cueRef = useRef<RunLabCue>({ id: 0, clip: "Jump" });

  function talk() {
    cueRef.current = { id: cueRef.current.id + 1, clip: cueRef.current.id % 2 ? "Victory" : "Jump" };
    setChat((chat + 1) % chats.length);
  }

  const [nianLine, dadLine] = chats[chat];
  const flat = <div className="home-planet-flat" aria-hidden="true">👨🧒</div>;

  return (
    <div className="home">
      <header className="home-title">
        <h1><span aria-hidden="true">🚀</span> 身体奇遇记</h1>
        <p>小念一问，爸爸一答，钻进身体里看个明白</p>
      </header>

      <section aria-labelledby="home-duo-title">
        <h2 id="home-duo-title" className="home-section-title">小念和爸爸探索身体的奥秘</h2>
        <div ref={stageRef} className="home-planet">
          {webgl ? (
            <WebGLBoundary name="home-planet" fallback={flat}>
              <Suspense fallback={flat}>
                <RunLab3D character="nian" partner="dad" bodyRef={bodyRef} lensRef={lensRef} cueRef={cueRef}
                  reducedMotion={reducedMotion} active={inView} label="爸爸和小念站在小星球上，点他们会接着聊"
                  onCharacterTap={talk} onReady={() => undefined} />
              </Suspense>
            </WebGLBoundary>
          ) : flat}
          <button type="button" className="home-bubble is-nian" onClick={talk}><b>小念</b>{nianLine}</button>
          <button type="button" className="home-bubble is-dad" onClick={talk}><b>爸爸</b>{dadLine}</button>
        </div>
      </section>

      <section aria-labelledby="home-parts-title">
        <h2 id="home-parts-title" className="home-section-title">身体部位</h2>
        <div className="home-systems">
          {bodySystems.map((system) => {
            const list = questionsIn(system.id);
            const done = list.filter((question) => heard.includes(question.id)).length;
            return (
              <button key={system.id} type="button" className="system-card" style={{ "--bubble": system.color } as CSSProperties}
                onClick={() => onSystem(system.id)}>
                <span className="system-emoji" aria-hidden="true">{system.emoji}</span>
                <strong>{system.title}</strong>
                <small>{system.kidHook}</small>
                <span className="system-count">{list.length} 个问题{done > 0 && ` · ⭐ 看过 ${done}`} →</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
