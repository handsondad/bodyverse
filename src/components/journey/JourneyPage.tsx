import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { JourneyDef } from "../../data/journey-registry";
import { useInView } from "../../hooks/useInView";
import { useMotionTimeline } from "../../hooks/useMotionTimeline";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { canUseWebGL } from "../../lib/heart-3d";
import type { AgeTier } from "../../types/content";
import type { ScaleId } from "../../types/exploration";
import { HeartScaleDiagram } from "../HeartScaleDiagram";
import { RunLab } from "../RunLab";
import { WebGLBoundary } from "../WebGLBoundary";
import { DepthPicker } from "./DepthPicker";
import { DepthCard, MysteryChain, OrganLab, ScaleLadder, ToggleLab } from "./JourneyParts";
import { StoryboardEditor } from "./StoryboardEditor";
import { TimelineBar } from "./TimelineBar";
import "./Journey.css";

const JourneyStage3D = lazy(() => import("./stage3d/JourneyStage3D"));

function loadVisited(journey: JourneyDef): Set<ScaleId> {
  try {
    const raw = window.localStorage.getItem(visitedKey(journey));
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids.filter((id): id is ScaleId => journey.stops.some((stop) => stop.id === id)) : []);
  } catch {
    return new Set();
  }
}

const visitedKey = (journey: JourneyDef) => `body-mystery-${journey.id}-journey-visited`;

type Props = {
  journey: JourneyDef;
  age: AgeTier;
  setAge: (age: AgeTier) => void;
  onBack: () => void;
  backLabel: string;
  onMore: () => void;
  initialStop?: ScaleId;
};

export function JourneyPage({ journey, age, setAge, onBack, backLabel, onMore, initialStop }: Props) {
  const [stopId, setStopId] = useState<ScaleId>(initialStop ?? "body");
  const [direction, setDirection] = useState<"in" | "out">("in");
  const [visited, setVisited] = useState(() => loadVisited(journey));
  const [running, setRunning] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [showLabels, setShowLabels] = useState(true);
  const [webgl] = useState(canUseWebGL);
  const reducedMotion = useReducedMotion();
  const [stageRef, inView] = useInView<HTMLDivElement>();
  const topRef = useRef<HTMLDivElement>(null);

  const { stops, nodes, organLab } = journey;
  const index = stops.findIndex((stop) => stop.id === stopId);
  const stop = stops[index];
  const node = nodes.find((item) => item.id === stopId) ?? nodes[0];
  const rate = running ? organLab.runRate : organLab.restRate;
  const duration = stopId === "organ" ? 60 / rate : stop.durationSeconds;
  const timeline = useMotionTimeline(duration, {
    active: inView && stopId !== "body",
    autoplay: !reducedMotion,
    initialSpeed: 0.25
  });
  const { reset, setPlaying, setSpeed } = timeline;

  useEffect(() => {
    setVisited((previous) => {
      if (previous.has(stopId)) return previous;
      const next = new Set(previous).add(stopId);
      try {
        window.localStorage.setItem(visitedKey(journey), JSON.stringify([...next]));
      } catch (error) {
        console.error("旅程进度保存失败", error);
      }
      return next;
    });
  }, [stopId, journey]);

  function goTo(id: ScaleId) {
    if (id === stopId) return;
    const target = stops.findIndex((item) => item.id === id);
    setDirection(target > index ? "in" : "out");
    setStopId(id);
    setToggles({});
    reset();
    setSpeed(id === "organ" || reducedMotion ? 0.25 : 0.5);
    if (!reducedMotion) setPlaying(true);
    topRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  const prev = stops[index - 1];
  const next = stops[index + 1];
  const legend = journey.legends[stopId];
  const stageLabel = useMemo(() => `${node.title}的放大动画：${stop.stages.map((item) => item.label).join("，")}`, [node.title, stop.stages]);
  const fallback = journey.id === "heart"
    ? <HeartScaleDiagram scale={stopId} />
    : <p className="stage-loading">这台设备暂时显示不了 3D 动画，右边的讲解和下面的小实验照样能用。</p>;

  return (
    <div className="journey">
      <header className="journey-top">
        <button type="button" className="journey-back" onClick={onBack}>← {backLabel}</button>
        <div className="journey-question">
          <span>{journey.emoji} {journey.title}</span>
          <h1>{journey.question}</h1>
        </div>
        <DepthPicker age={age} setAge={setAge} />
      </header>

      <div ref={topRef} className="journey-ladder-wrap">
        <ScaleLadder stops={stops} current={stopId} recommended={journey.recommended[age]} visited={visited} onSelect={goTo} />
      </div>

      <main className="journey-main">
        <section ref={stageRef} className="journey-stage-col" aria-label={`第 ${index + 1} 站：${stop.short}`}>
          {stopId === "body" ? (
            <div className={`journey-zoom zoom-${direction}`} key="body">
              <RunLab age={age} />
            </div>
          ) : (
            <>
              <div className={`journey-stage journey-zoom zoom-${direction}`} key={stopId}>
                <div className="stage-badges">
                  <span>📏 {stop.size}</span>
                  <button type="button" aria-pressed={showLabels} onClick={() => setShowLabels(!showLabels)}>
                    {showLabels ? "🏷️ 隐藏名字" : "🏷️ 显示名字"}
                  </button>
                </div>
                {webgl ? (
                  <WebGLBoundary name={`journey-${journey.id}-${stopId}`} fallback={fallback}>
                    <Suspense fallback={<div className="stage-loading">正在放大…</div>}>
                      <JourneyStage3D journey={journey.id} stop={stopId} phaseRef={timeline.phaseRef} toggles={toggles}
                        active={inView} showLabels={showLabels} label={stageLabel} />
                    </Suspense>
                  </WebGLBoundary>
                ) : fallback}
                {legend && (
                  <div className="stage-legend" aria-label="颜色说明">
                    {legend.map((item) => <span key={item.label}><i className="dot" style={{ background: item.color }} />{item.label}</span>)}
                  </div>
                )}
                <p className="stage-hint">👆 拖一拖转个角度，双指或滚轮可以拉近</p>
              </div>
              <TimelineBar timeline={timeline} stages={stop.stages} disabled={!webgl} />
              {stopId === "organ"
                ? <OrganLab lab={organLab} running={running} setRunning={setRunning} age={age} />
                : <ToggleLab stop={stop} toggles={toggles} question={node.question}
                    setToggle={(id, on) => setToggles((previous) => ({ ...previous, [id]: on }))} />}
            </>
          )}
        </section>

        <aside className="journey-explain">
          <DepthCard key={`${stopId}-${age}`} node={node} stop={stop} age={age} />
          <details className="parent-tip">
            <summary>👨‍👩‍👧 大人看这里</summary>
            <p>{stop.parentTip}</p>
          </details>
          <nav className="journey-steps" aria-label="换一层">
            {prev && <button type="button" className="journey-out" onClick={() => goTo(prev.id)}>← 退远一点：{prev.short}</button>}
            {next
              ? <button type="button" className="journey-in" onClick={() => goTo(next.id)}>🔍 再放大一层：{next.short} <small>{next.size}</small></button>
              : <p className="journey-end">🎉 这是最小的一层了。往下看看你的奥秘链吧！</p>}
          </nav>
        </aside>
      </main>

      <MysteryChain stops={stops} visited={visited} age={age} />

      {journey.storyboard && (
        <details className="journey-author">
          <summary>✍️ 我来当讲解员：画三格分镜，讲给别人听</summary>
          <StoryboardEditor age={age} />
        </details>
      )}

      <button type="button" className="journey-more" onClick={onMore}>🧪 还想动手？去看看在家就能做的小实验 →</button>

      <p className="journey-safety">本页是教学示意模型，不用于诊断。身体不舒服、喘不上气或胸闷，请马上告诉大人或就医。</p>
    </div>
  );
}
