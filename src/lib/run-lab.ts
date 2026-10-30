import type { AgeTier } from "../types/content";

// Teaching values for a cartoon model, not health standards for any real child.
export const restBpm = 90;
export const maxRunBpm = 150;
export const restBreaths = 20;
export const maxRunBreaths = 40;

export type BodyState = {
  effort: number;
  bpm: number;
  breaths: number;
  beatPhase: number;
  breathPhase: number;
  warmth: number;
  peakBpm: number;
};

export function createBodyState(): BodyState {
  return { effort: 0, bpm: restBpm, breaths: restBreaths, beatPhase: 0, breathPhase: 0, warmth: 0, peakBpm: restBpm };
}

function ease(current: number, target: number, dt: number, tau: number): number {
  return target + (current - target) * Math.exp(-dt / tau);
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Heart rate climbs within a few seconds of running but recovers more slowly after stopping.
export function stepBody(state: BodyState, dtSeconds: number, running: boolean): BodyState {
  const dt = Math.min(Math.max(dtSeconds, 0), 0.25);
  const effort = clamp01(ease(state.effort, running ? 1 : 0, dt, running ? 0.6 : 0.5));
  const targetBpm = restBpm + effort * (maxRunBpm - restBpm);
  const bpm = ease(state.bpm, targetBpm, dt, targetBpm > state.bpm ? 3.5 : 8);
  const exertion = (bpm - restBpm) / (maxRunBpm - restBpm);
  const breaths = restBreaths + clamp01(exertion) * (maxRunBreaths - restBreaths);
  const warmth = clamp01(state.warmth + dt * (effort > 0.5 ? 0.09 : -0.05));
  return {
    effort,
    bpm,
    breaths,
    beatPhase: (state.beatPhase + (dt * bpm) / 60) % 1,
    breathPhase: (state.breathPhase + (dt * breaths) / 60) % 1,
    warmth,
    peakBpm: Math.max(state.peakBpm, bpm)
  };
}

export function exertionOf(state: Pick<BodyState, "bpm">): number {
  return clamp01((state.bpm - restBpm) / (maxRunBpm - restBpm));
}

export function crossedBeat(previousPhase: number, nextPhase: number): boolean {
  return nextPhase < previousPhase;
}

// Lub-dub squeeze (0–1) for a beat phase: a strong first bump and a softer second one.
export function heartSqueeze(phase: number): number {
  const p = ((phase % 1) + 1) % 1;
  const bump = (center: number, width: number) => Math.exp(-(((p - center) / width) ** 2));
  return Math.min(1, bump(0.06, 0.06) + 0.55 * bump(0.26, 0.06));
}

// Chest expansion (0–1) across one breath: inhale over the first 40%, then exhale.
export function breathFill(phase: number): number {
  const p = ((phase % 1) + 1) % 1;
  return p < 0.4 ? Math.sin((p / 0.4) * (Math.PI / 2)) : Math.cos(((p - 0.4) / 0.6) * (Math.PI / 2));
}

export type Motion = { clip: "Idle" | "Walk" | "Run"; timeScale: number };

export function motionFor(effort: number): Motion {
  if (effort < 0.12) return { clip: "Idle", timeScale: 1 };
  if (effort < 0.5) return { clip: "Walk", timeScale: 0.8 + effort };
  return { clip: "Run", timeScale: 0.75 + effort * 0.45 };
}

export type Phase = "ready" | "running" | "recovering" | "rested";

export function phaseOf(state: BodyState, running: boolean): Phase {
  if (running) return "running";
  if (state.peakBpm < restBpm + 20) return "ready";
  return state.bpm > restBpm + 6 ? "recovering" : "rested";
}

export function speechFor(state: BodyState, running: boolean, name: string): string {
  const phase = phaseOf(state, running);
  if (phase === "running") {
    if (state.bpm > 130) return "呼……呼……我的心怦怦跳得好快！";
    if (state.bpm > 105) return "腿越跑越有劲，心也跳快啦！";
    return "出发！我们绕着小星球跑一圈！";
  }
  if (phase === "recovering") return "停下来休息一下……心跳正在慢慢变回来。";
  if (phase === "rested") return "我又平静啦！再跑一次，用透视镜看看身体里面？";
  return `我是${name}！按住下面的“跑起来”，带我去跑步吧！`;
}

// Tap-along pulse: BPM from the last few taps; a pause longer than 2 s starts a new count.
export function tapBpm(times: readonly number[]): number | null {
  const recent: number[] = [];
  for (let i = times.length - 1; i >= 0 && recent.length < 7; i -= 1) {
    if (recent.length && recent[0] - times[i] > 2000) break;
    recent.unshift(times[i]);
  }
  if (recent.length < 4) return null;
  const average = (recent[recent.length - 1] - recent[0]) / (recent.length - 1);
  return average > 0 ? Math.round(60000 / average) : null;
}

export type RhythmResult = "great" | "close" | "faster" | "slower";

export function rhythmFeedback(tapped: number, bpm: number): RhythmResult {
  const ratio = (tapped - bpm) / bpm;
  if (Math.abs(ratio) <= 0.08) return "great";
  if (Math.abs(ratio) <= 0.18) return "close";
  return ratio < 0 ? "faster" : "slower";
}

export const rhythmMessages: Record<RhythmResult, string> = {
  great: "太准了！你的手指和小心脏一个节奏！",
  close: "很接近啦，再仔细听一听。",
  faster: "心跳比你拍得快，拍快一点！",
  slower: "心跳比你拍得慢，拍慢一点。"
};

export function pushHistory(history: readonly number[], value: number, maxLength = 60): number[] {
  const next = [...history, value];
  return next.length > maxLength ? next.slice(next.length - maxLength) : next;
}

export type Guess = "faster" | "same" | "slower";

export const guessOptions: ReadonlyArray<{ value: Guess; label: string }> = [
  { value: "faster", label: "变快" },
  { value: "same", label: "不变" },
  { value: "slower", label: "变慢" }
];

export function guessFeedback(guess: Guess): string {
  return guess === "faster"
    ? "你猜对了！跑起来以后，心跳真的变快了。"
    : "看看刚才的数字：跑起来以后心跳变快了。猜错没关系，科学家也是这样一边猜一边看的。";
}

export const runLabExplain: Record<AgeTier, { why: string; lens: string; recover: string }> = {
  "4-6": {
    why: "跑步时，腿上的肌肉在使劲，它们饿了，要更多氧气。心脏就加油快快跳，把带着氧气的血送过去。",
    lens: "打开透视镜：红色小点是送氧气的血，跑得越快，小点跑得越快！",
    recover: "停下来以后，肌肉不那么饿了，心脏也慢慢歇一歇。"
  },
  "7-9": {
    why: "肌肉收缩要消耗氧气。跑步时肌肉用得多，大脑会让心脏跳得更快、肺呼吸得更快，送来更多氧气。",
    lens: "透视镜里：肺鼓起来吸进氧气，心脏把血泵出去，血顺着管子流到腿上的肌肉。",
    recover: "心跳不会一停下就变回去，而是一点点降下来，这段时间身体在“还账”。"
  },
  "10-12": {
    why: "肌肉细胞用氧气分解葡萄糖获得能量。运动时需氧量上升，神经系统和肾上腺素让心率和每搏输出量都增加，心输出量 = 心率 × 每搏输出量。",
    lens: "观察透视镜：呼吸频率和心率一起升高，血液循环加快，氧气更快地到达工作的肌肉。",
    recover: "停止运动后心率呈曲线下降，体能越好的人往往恢复得越快。"
  },
  "13+": {
    why: "运动时交感神经兴奋、副交感抑制减弱，窦房结放电加快；肌肉局部代谢产物让血管扩张，更多血流分配到骨骼肌。",
    lens: "透视镜只是示意：真实身体里，每搏输出量、血管口径和血流分配也在同时变化。",
    recover: "运动后心率恢复（HRR）常被用来评估心肺适能，但个体差异很大，不能用这个模型判断健康。"
  }
};
