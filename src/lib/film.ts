import type { CameraKey, Film, Point } from "../data/films/types";
import { clamp01, smooth } from "./motion.ts";

// 讲解动画的时间线：画面上的一切都是时间 t 的纯函数。同一个 t 永远是同一帧，
// 所以能暂停、拖动进度条，也能直接从某一场戏开始。

export const FRAME = { width: 1200, height: 900 } as const;

export type Vec = readonly [number, number];
export type AtlasBox = { readonly label: string; readonly at: readonly number[]; readonly box: readonly number[] };
export type AtlasView = {
  readonly label: string;
  readonly dir: string;
  readonly layers: Readonly<Record<string, AtlasBox>>;
  readonly anchors: Readonly<Record<string, AtlasBox>>;
};

/** 到达用长尾的 ease-out，推拉镜头两头都缓，弹出用一点回弹 */
export const ease = {
  expoOut: (x: number) => (x >= 1 ? 1 : 1 - 2 ** (-10 * clamp01(x))),
  inOut: (x: number) => {
    const t = clamp01(x);
    return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  },
  backOut: (x: number) => {
    const t = clamp01(x) - 1;
    return 1 + 2.4 * t ** 3 + 1.4 * t ** 2;
  },
  smooth
};

export const enterSeconds = 0.45;
export const exitSeconds = 0.25;

/**
 * 元素的可见度：from 之后用 expo-out 淡入，to 之后淡出（退场比进场短）。
 * 不写 to 的元素一直留到这场戏结束。
 */
export function envelope(t: number, from: number, to?: number): number {
  if (t < from) return 0;
  const enter = ease.expoOut((t - from) / enterSeconds);
  if (to === undefined || t <= to) return enter;
  return enter * (1 - smooth((t - to) / exitSeconds));
}

export function anchorOf(view: AtlasView | undefined, name: string): AtlasBox {
  const anchor = view?.anchors[name] ?? view?.layers[name];
  if (!anchor) throw new RangeError(`这个视角里没有锚点「${name}」`);
  return anchor;
}

export function resolvePoint(point: Point, view?: AtlasView): Vec {
  if (typeof point === "string") {
    const [x, y] = anchorOf(view, point).at;
    return [x, y];
  }
  if ("a" in point) {
    const [x, y] = anchorOf(view, point.a).at;
    return [x + (point.dx ?? 0), y + (point.dy ?? 0)];
  }
  return point;
}

export function pathLength(points: readonly Vec[]): number {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  return length;
}

/** 按路程取路线上的点，u 从 0 到 1 */
export function pointAlong(points: readonly Vec[], u: number): Vec {
  if (!points.length) throw new RangeError("路线至少要有一个点");
  if (points.length === 1) return points[0];
  const total = pathLength(points);
  let left = clamp01(u) * total;
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const segment = Math.hypot(x1 - x0, y1 - y0);
    if (left <= segment || i === points.length - 1) {
      const k = segment > 0 ? Math.min(1, left / segment) : 0;
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    left -= segment;
  }
  return points[points.length - 1];
}

export function totalDuration(film: Film): number {
  return film.scenes.reduce((sum, scene) => sum + scene.duration, 0);
}

export function sceneStart(film: Film, index: number): number {
  let start = 0;
  for (let i = 0; i < index; i += 1) start += film.scenes[i].duration;
  return start;
}

/** 全片时间 → 第几场戏、这场戏里的时间 */
export function sceneAt(film: Film, time: number): { index: number; local: number } {
  if (!film.scenes.length) throw new RangeError("动画至少要有一场戏");
  let start = 0;
  for (let index = 0; index < film.scenes.length; index += 1) {
    const { duration } = film.scenes[index];
    if (time < start + duration || index === film.scenes.length - 1) {
      return { index, local: Math.min(Math.max(time - start, 0), duration) };
    }
    start += duration;
  }
  return { index: 0, local: 0 };
}

export type Camera = { x: number; y: number; width: number; height: number; zoom: number };

const fullFrame: Camera = { x: 0, y: 0, width: FRAME.width, height: FRAME.height, zoom: 1 };

function frameAround([cx, cy]: Vec, zoom: number): Camera {
  const z = Math.max(1, zoom);
  const width = FRAME.width / z;
  const height = FRAME.height / z;
  const x = Math.min(Math.max(cx - width / 2, 0), FRAME.width - width);
  const y = Math.min(Math.max(cy - height / 2, 0), FRAME.height - height);
  return { x, y, width, height, zoom: z };
}

/** 镜头关键帧之间两头缓地推拉；第一帧之前停在第一帧，最后一帧之后停在最后一帧 */
export function cameraAt(keys: readonly CameraKey[] | undefined, t: number, view?: AtlasView): Camera {
  if (!keys?.length) return fullFrame;
  const frames = keys.map((key) => ({ t: key.t, at: resolvePoint(key.at, view), zoom: key.zoom }));
  if (t <= frames[0].t) return frameAround(frames[0].at, frames[0].zoom);
  for (let i = 1; i < frames.length; i += 1) {
    const a = frames[i - 1];
    const b = frames[i];
    if (t <= b.t) {
      const k = ease.inOut((t - a.t) / Math.max(b.t - a.t, 1e-6));
      return frameAround([a.at[0] + (b.at[0] - a.at[0]) * k, a.at[1] + (b.at[1] - a.at[1]) * k], a.zoom + (b.zoom - a.zoom) * k);
    }
  }
  const last = frames[frames.length - 1];
  return frameAround(last.at, last.zoom);
}

/** 图层的周期运动，返回缩放（以图层中心为准） */
export function layerMotion(motion: "beat" | "breathe" | "churn" | undefined, t: number, rate?: number): { sx: number; sy: number } {
  if (!motion) return { sx: 1, sy: 1 };
  if (motion === "beat") {
    const q = (t * (rate ?? 1.2)) % 1;
    const squeeze = q < 0.18 ? smooth(q / 0.18) : q < 0.45 ? 1 - smooth((q - 0.18) / 0.27) : 0;
    const s = 1 - 0.07 * squeeze;
    return { sx: s, sy: s };
  }
  if (motion === "breathe") {
    const q = (t * (rate ?? 0.3)) % 1;
    const fill = q < 0.4 ? smooth(q / 0.4) : 1 - smooth((q - 0.4) / 0.6);
    return { sx: 1 + 0.035 * fill, sy: 1 + 0.07 * fill };
  }
  const phase = Math.sin(t * (rate ?? 0.5) * Math.PI * 2);
  return { sx: 1 + 0.035 * phase, sy: 1 - 0.035 * phase };
}
