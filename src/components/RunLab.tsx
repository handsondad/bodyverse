import { lazy, Suspense, useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { AgeTier } from "../types/content";
import { canUseWebGL } from "../lib/heart-3d";
import { HeartbeatAudio } from "../lib/heartbeat-audio";
import {
  createBodyState, crossedBeat, exertionOf, guessFeedback, guessOptions, heartSqueeze, maxRunBpm, phaseOf, pushHistory,
  restBpm, rhythmFeedback, rhythmMessages, runLabExplain, speechFor, stepBody, tapBpm, type Guess, type Phase, type RhythmResult
} from "../lib/run-lab";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { WebGLBoundary } from "./WebGLBoundary";
import type { CharacterId, LensState, RunLabCue } from "./RunLab3D";
import "./RunLab.css";

const RunLab3D = lazy(() => import("./RunLab3D"));
const names: Record<CharacterId, string> = { xiaodou: "小豆", xiaomi: "小米" };
const quips = ["哈哈，好痒！", "嘿！我在这儿！", "再戳我一下试试？"];
const observedBpm = restBpm + 30;

type Hud = { bpm: number; breaths: number; phase: Phase; speech: string };

function Sparkline({ values }: { values: number[] }) {
  const low = restBpm - 10;
  const high = maxRunBpm + 5;
  const y = (value: number) => 40 - ((value - low) / (high - low)) * 36;
  const points = values.map((value, index) => `${(index / 59) * 150},${y(value).toFixed(1)}`).join(" ");
  return (
    <svg className="run-lab-spark" viewBox="0 0 150 44" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" x2="150" y1={y(restBpm)} y2={y(restBpm)} />
      {values.length > 1 && <polyline points={points} />}
    </svg>
  );
}

export function RunLab({ age }: { age: AgeTier }) {
  const [supported] = useState(canUseWebGL);
  const reducedMotion = useReducedMotion();
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const [character, setCharacter] = useState<CharacterId>("xiaodou");
  const [ready, setReady] = useState(false);
  const [guess, setGuess] = useState<Guess | null>(null);
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState(false);
  const [lensOn, setLensOn] = useState(false);
  const [lensFollow, setLensFollow] = useState(true);
  const [lensUsed, setLensUsed] = useState(false);
  const [hud, setHud] = useState<Hud>({ bpm: restBpm, breaths: 20, phase: "ready", speech: "" });
  const [history, setHistory] = useState<number[]>([]);
  const [peak, setPeak] = useState(restBpm);
  const [quip, setQuip] = useState<string | null>(null);
  const [rhythm, setRhythm] = useState<{ tapped: number; bpm: number; result: RhythmResult } | null>(null);

  const bodyRef = useRef(createBodyState());
  const runningRef = useRef(false);
  const soundRef = useRef(false);
  const lensRef = useRef<LensState>({ on: false, follow: true, x: 0, y: 0, r: 80 });
  const cueRef = useRef<RunLabCue>({ id: 0, clip: "Jump" });
  const audioRef = useRef<HeartbeatAudio | null>(null);
  const heartIconRef = useRef<HTMLSpanElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tapsRef = useRef<number[]>([]);
  const lastVictoryRef = useRef(0);
  const name = names[character];

  const stopRun = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!inView) {
      stopRun();
      return;
    }
    let frame = 0;
    let last = performance.now();
    let lastHud = 0;
    let lastSample = 0;
    const tick = (now: number) => {
      const previous = bodyRef.current;
      const next = stepBody(previous, (now - last) / 1000, runningRef.current);
      last = now;
      bodyRef.current = next;
      if (crossedBeat(previous.beatPhase, next.beatPhase) && soundRef.current) audioRef.current?.beat(next.bpm, 0.6 + 0.4 * exertionOf(next));
      if (heartIconRef.current) heartIconRef.current.style.transform = `scale(${1 + 0.3 * heartSqueeze(next.beatPhase)})`;
      const lens = lensRef.current;
      const ring = lensRingRef.current;
      if (ring) {
        ring.style.width = ring.style.height = `${lens.r * 2}px`;
        ring.style.transform = `translate(${lens.x - lens.r}px, ${lens.y - lens.r}px)`;
      }
      if (now - lastHud > 200) {
        lastHud = now;
        setHud((current) => {
          const bpm = Math.round(next.bpm);
          const phase = phaseOf(next, runningRef.current);
          const speech = speechFor(next, runningRef.current, names[character]);
          const breaths = Math.round(next.breaths);
          return current.bpm === bpm && current.phase === phase && current.speech === speech && current.breaths === breaths
            ? current : { bpm, breaths, phase, speech };
        });
        setPeak(Math.round(next.peakBpm));
      }
      if (now - lastSample > 500) {
        lastSample = now;
        setHistory((values) => pushHistory(values, next.bpm, 60));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, character, stopRun]);

  useEffect(() => {
    if (!quip) return;
    const timer = window.setTimeout(() => setQuip(null), 1800);
    return () => window.clearTimeout(timer);
  }, [quip]);

  useEffect(() => () => audioRef.current?.dispose(), []);

  const startRun = () => {
    if (!guess) return;
    runningRef.current = true;
    setRunning(true);
  };

  const toggleSound = async () => {
    if (soundRef.current) {
      soundRef.current = false;
      setSound(false);
      return;
    }
    const audio = (audioRef.current ??= new HeartbeatAudio());
    const ok = await audio.resume().catch(() => false);
    soundRef.current = ok;
    setSound(ok);
  };

  const toggleLens = () => {
    const on = !lensRef.current.on;
    lensRef.current.on = on;
    lensRef.current.follow = true;
    setLensFollow(true);
    setLensOn(on);
    if (on) setLensUsed(true);
  };

  const dragLens = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    lensRef.current.x = Math.min(rect.width, Math.max(0, event.clientX - rect.left));
    lensRef.current.y = Math.min(rect.height, Math.max(0, event.clientY - rect.top));
    if (lensRef.current.follow) {
      lensRef.current.follow = false;
      setLensFollow(false);
    }
  };

  const cue = (clip: RunLabCue["clip"]) => {
    cueRef.current = { id: cueRef.current.id + 1, clip };
  };

  const tapAlong = () => {
    const now = performance.now();
    tapsRef.current = [...tapsRef.current.slice(-10), now];
    if (soundRef.current) audioRef.current?.pop();
    const tapped = tapBpm(tapsRef.current);
    if (!tapped) {
      setRhythm(null);
      return;
    }
    const bpm = Math.round(bodyRef.current.bpm);
    const result = rhythmFeedback(tapped, bpm);
    setRhythm({ tapped, bpm, result });
    if (result === "great" && now - lastVictoryRef.current > 4000) {
      lastVictoryRef.current = now;
      cue("Victory");
    }
  };

  const onCharacterTap = useCallback(() => setQuip(quips[Math.floor(Math.random() * quips.length)]), []);
  const onReady = useCallback(() => setReady(true), []);

  const observed = peak >= observedBpm;
  const explain = runLabExplain[age];
  const missions = [
    { label: "猜一猜", done: guess !== null },
    { label: "按住跑", done: observed },
    { label: "透视看", done: lensUsed },
    { label: "拍心跳", done: rhythm?.result === "great" || rhythm?.result === "close" }
  ];
  const speech = quip ?? hud.speech;
  const flatStage = (
    <div className="run-lab-flat" aria-hidden="true">
      <span style={{ fontSize: `${4 + exertionOf({ bpm: hud.bpm }) * 2}rem` }}>{hud.phase === "running" ? "🏃" : "🧒"}</span>
    </div>
  );

  return (
    <section ref={rootRef} className="run-lab" aria-labelledby="run-lab-title">
      <header className="run-lab-head">
        <div>
          <p className="heart-kicker">身体小实验 · 跑步时身体里发生了什么</p>
          <h3 id="run-lab-title">和{name}一起跑一跑</h3>
        </div>
        <div className="run-lab-friends" role="group" aria-label="选择跑步伙伴">
          {(Object.keys(names) as CharacterId[]).map((id) => (
            <button key={id} type="button" aria-pressed={character === id} onClick={() => {
              if (id === character) return;
              setReady(false);
              setCharacter(id);
            }}>{names[id]}</button>
          ))}
        </div>
      </header>

      <ol className="run-lab-missions" aria-label="小任务">
        {missions.map((mission, index) => (
          <li key={mission.label} className={mission.done ? "is-done" : ""}>
            <span>{mission.done ? "⭐" : index + 1}</span>{mission.label}
          </li>
        ))}
      </ol>

      <div ref={stageRef} className={`run-lab-stage ${hud.phase === "running" ? "is-running" : ""}`}>
        {supported ? (
          <WebGLBoundary name="跑步小实验 3D 场景" fallback={flatStage}>
            <Suspense fallback={null}>
              <RunLab3D character={character} bodyRef={bodyRef} lensRef={lensRef} cueRef={cueRef}
                reducedMotion={reducedMotion} active={inView} onCharacterTap={onCharacterTap} onReady={onReady}
                label={`${name}站在一颗小星球上，${hud.phase === "running" ? "正在奔跑" : "正在休息"}，模型心跳每分钟约 ${hud.bpm} 次。`} />
            </Suspense>
          </WebGLBoundary>
        ) : flatStage}
        {supported && !ready && <p className="run-lab-loading">{name}正在赶来……</p>}

        <p className="run-lab-bubble" aria-live="polite">{speech}</p>

        <div className="run-lab-hud" aria-label="身体仪表">
          <div><span ref={heartIconRef} className="run-lab-heart" aria-hidden="true">❤️</span><strong>{hud.bpm}</strong><small>次心跳/分</small></div>
          <div><span aria-hidden="true">🫁</span><strong>{hud.breaths}</strong><small>次呼吸/分</small></div>
          <Sparkline values={history} />
          <small className="run-lab-spark-label">心跳曲线 · 最近 30 秒</small>
        </div>

        {lensOn && (
          <div ref={lensRingRef} className="run-lab-lens" role="slider" tabIndex={0} aria-label="透视镜，拖动它看身体里面"
            aria-valuetext={lensFollow ? "对准心脏" : "自由移动"}
            onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
            onPointerMove={dragLens}>
            <span>透视镜</span>
          </div>
        )}
      </div>

      {!guess ? (
        <div className="run-lab-guess">
          <strong>先猜一猜：{name}跑起来以后，心跳会怎样？</strong>
          <div className="run-lab-row">
            {guessOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => setGuess(option.value)}>{option.label}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="run-lab-controls">
          <button type="button" className="run-lab-go" aria-pressed={running}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              startRun();
            }}
            onPointerUp={stopRun} onPointerCancel={stopRun} onLostPointerCapture={stopRun} onBlur={stopRun}
            onKeyDown={(event) => {
              if ((event.key === " " || event.key === "Enter") && !event.repeat) {
                event.preventDefault();
                startRun();
              }
            }}
            onKeyUp={(event) => {
              if (event.key === " " || event.key === "Enter") stopRun();
            }}
            onContextMenu={(event) => event.preventDefault()}>
            <span aria-hidden="true">🏃</span>{running ? "加油，跑跑跑！" : "按住跑起来"}
          </button>
          <div className="run-lab-row">
            <button type="button" aria-pressed={lensOn} onClick={toggleLens} disabled={!supported}>🔍 透视镜</button>
            {lensOn && !lensFollow && (
              <button type="button" onClick={() => {
                lensRef.current.follow = true;
                setLensFollow(true);
              }}>对准心脏</button>
            )}
            <button type="button" aria-pressed={sound} onClick={toggleSound}>{sound ? "🔊 心跳声开" : "🔈 听心跳"}</button>
            <button type="button" className="run-lab-tap" onClick={tapAlong}>👆 跟着心跳拍</button>
          </div>
        </div>
      )}

      <div className="run-lab-notes" aria-live="polite">
        {lensOn && <p>🔍 {explain.lens}</p>}
        {rhythm && <p>👆 你拍的是 {rhythm.tapped} 次/分，{name}的心跳约 {rhythm.bpm} 次/分。{rhythmMessages[rhythm.result]}</p>}
        {!rhythm && guess && <p>👆 听着心跳声或看着跳动的 ❤️，连续拍 4 下以上，看看你能不能跟上。</p>}
        {guess && observed && (
          <div className="run-lab-why">
            <p><strong>{guessFeedback(guess)}</strong>（最高约 {peak} 次/分）</p>
            <p><strong>为什么？</strong>{explain.why}</p>
            {hud.phase === "recovering" || hud.phase === "rested" ? <p><strong>停下来以后：</strong>{explain.recover}</p> : null}
          </div>
        )}
      </div>
      <p className="heart-note">
        动画角色和数字都是教学示意值（安静约 {restBpm}、奔跑最高 {maxRunBpm} 次/分），不是你的测量结果，也不是儿童健康标准。
        想自己感受心跳，请在大人陪伴下进行；身体不舒服时请马上告诉大人。
        {reducedMotion && " 已按系统“减少动态效果”设置放慢场景运动。"}
      </p>
    </section>
  );
}
