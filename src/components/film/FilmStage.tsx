import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import atlasJson from "../../data/anatomy-atlas.json";
import type { Cue, FilmScene, LayerUse, Point, ViewId } from "../../data/films/types";
import {
  anchorOf, cameraAt, ease, envelope, FRAME, layerMotion, pathLength, pointAlong, resolvePoint,
  type AtlasView, type Camera, type Vec
} from "../../lib/film";
import { smooth } from "../../lib/motion";

const atlas = atlasJson as unknown as { width: number; height: number; views: Record<ViewId, AtlasView> };
const base = import.meta.env.BASE_URL;

export const layerSrc = (view: ViewId, layer: string) => `${base}anatomy/${view}/${layer}.webp`;

export function viewOf(scene: FilmScene): AtlasView | undefined {
  return scene.view === "blank" ? undefined : atlas.views[scene.view];
}

const normalize = (use: LayerUse) => (typeof use === "string" ? { layer: use } : use);
const ink = "#4a3b2a";

/**
 * 标签、箭头、大字保持屏幕上的大小不变，k = 1 / 镜头放大倍数。
 * ui 在 k 的基础上再按舞台实际宽度放大文字，窄屏上也看得清。
 */
type Ctx = { view?: AtlasView; t: number; k: number; ui: number; alpha: number; camera: Camera };

/** 舞台小于这个宽度（CSS 像素）时放大文字，最多放大 maxLegibility 倍 */
const comfortableWidth = 560;
const maxLegibility = 1.6;

/** 字幕性质的元素：坐标写数字时是屏幕位置，写锚点时跟着器官 */
function captionPoint(point: Point, ctx: Ctx): Vec {
  if (typeof point === "string" || !Array.isArray(point)) return resolvePoint(point, ctx.view);
  const [sx, sy] = point as Vec;
  return [ctx.camera.x + (sx / FRAME.width) * ctx.camera.width, ctx.camera.y + (sy / FRAME.height) * ctx.camera.height];
}

/** 大字和计数牌常常几块并排，只放大一半，免得互相挤到 */
const captionScale = (ctx: Ctx) => ctx.k * Math.sqrt(ctx.ui / ctx.k);

/** 放大后的文字块不能被画面边缘裁掉 */
function keepInside([x, y]: Vec, halfWidth: number, halfHeight: number, ctx: Ctx): Vec {
  const { camera } = ctx;
  const margin = 6 * ctx.ui;
  const clamp = (value: number, low: number, high: number) => (low > high ? (low + high) / 2 : Math.min(Math.max(value, low), high));
  return [
    clamp(x, camera.x + halfWidth + margin, camera.x + camera.width - halfWidth - margin),
    clamp(y, camera.y + halfHeight + margin, camera.y + camera.height - halfHeight - margin)
  ];
}

function Label({ cue, ctx }: { cue: Extract<Cue, { kind: "label" }>; ctx: Ctx }) {
  const { k, ui, alpha } = ctx;
  const [ax, ay] = resolvePoint(cue.at, ctx.view);
  const side = cue.side ?? (ax < 600 ? "left" : "right");
  const offset: Record<string, Vec> = { left: [-170 * ui, -40 * ui], right: [170 * ui, -40 * ui], top: [0, -120 * ui], bottom: [0, 120 * ui] };
  const size = 30 * ui;
  const width = cue.text.length * size + 28 * ui;
  const height = size + 20 * ui;
  const [px, py] = keepInside(cue.pos ? resolvePoint(cue.pos, ctx.view) : [ax + offset[side][0], ay + offset[side][1]], width / 2, height / 2, ctx);
  const pop = ease.backOut((ctx.t - cue.from) / 0.45);
  const color = cue.color ?? ink;
  return (
    <g opacity={alpha}>
      <line x1={ax} y1={ay} x2={px} y2={py} stroke={color} strokeWidth={3 * k} strokeDasharray={`${8 * k} ${6 * k}`} />
      <circle cx={ax} cy={ay} r={8 * k} fill="#fff" stroke={color} strokeWidth={4 * k} />
      <g transform={`translate(${px} ${py}) scale(${Math.max(pop, 0.01)})`}>
        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={height / 2} fill="#fff" stroke={color} strokeWidth={3 * k} />
        <text className="film-text" fontSize={size} textAnchor="middle" dominantBaseline="central" fill={color}>{cue.text}</text>
      </g>
    </g>
  );
}

function Highlight({ cue, ctx }: { cue: Extract<Cue, { kind: "highlight" }>; ctx: Ctx }) {
  const [x0, y0, x1, y1] = anchorOf(ctx.view, cue.at).box;
  const pad = cue.pad ?? 18;
  const color = cue.color ?? "#ffb300";
  const glow = 0.8 + 0.2 * Math.sin(ctx.t * 4);
  return (
    <ellipse
      cx={(x0 + x1) / 2} cy={(y0 + y1) / 2} rx={(x1 - x0) / 2 + pad} ry={(y1 - y0) / 2 + pad}
      fill={color} fillOpacity={0.16 * glow} stroke={color} strokeWidth={5 * ctx.k}
      strokeDasharray={`${16 * ctx.k} ${10 * ctx.k}`} strokeDashoffset={-ctx.t * 40 * ctx.k} opacity={ctx.alpha}
    />
  );
}

function Pulse({ cue, ctx }: { cue: Extract<Cue, { kind: "pulse" }>; ctx: Ctx }) {
  const [x, y] = resolvePoint(cue.at, ctx.view);
  const color = cue.color ?? "#ff5a5f";
  const radius = cue.radius ?? 70;
  const rate = cue.rate ?? 1.2;
  const rings = [0, 1, 2].map((i) => {
    const phase = (((ctx.t - cue.from) * rate + i / 3) % 1 + 1) % 1;
    return <circle key={i} cx={x} cy={y} r={radius * phase} fill="none" stroke={color} strokeWidth={6 * ctx.k} opacity={(1 - phase) * ctx.alpha} />;
  });
  return <g>{rings}<circle cx={x} cy={y} r={10 * ctx.k} fill={color} opacity={ctx.alpha} /></g>;
}

function Flow({ cue, ctx }: { cue: Extract<Cue, { kind: "flow" }>; ctx: Ctx }) {
  const points = cue.path.map((point) => resolvePoint(point, ctx.view));
  const length = Math.max(pathLength(points), 1);
  const count = cue.count ?? 8;
  const speed = cue.speed ?? 220;
  const size = cue.size ?? 10;
  const color = cue.color ?? "#ff5a5f";
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const u = ((((ctx.t - cue.from) * speed) / length + i / count) % 1 + 1) % 1;
        const [x, y] = pointAlong(points, u);
        const edge = Math.min(1, u / 0.08, (1 - u) / 0.08);
        return cue.icon ? (
          <text key={i} x={x} y={y} fontSize={size * 2.6} textAnchor="middle" dominantBaseline="central" opacity={ctx.alpha * edge}>{cue.icon}</text>
        ) : (
          <circle key={i} cx={x} cy={y} r={size} fill={color} stroke="#fff" strokeWidth={2.5} opacity={ctx.alpha * edge} />
        );
      })}
    </g>
  );
}

function partialPath(points: readonly Vec[], progress: number): Vec[] {
  const total = pathLength(points);
  const target = total * progress;
  const out: Vec[] = [points[0]];
  let walked = 0;
  for (let i = 1; i < points.length; i += 1) {
    const segment = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    if (walked + segment >= target) {
      const k = segment > 0 ? (target - walked) / segment : 0;
      out.push([points[i - 1][0] + (points[i][0] - points[i - 1][0]) * k, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * k]);
      return out;
    }
    walked += segment;
    out.push(points[i]);
  }
  return out;
}

function Arrow({ cue, ctx }: { cue: Extract<Cue, { kind: "arrow" }>; ctx: Ctx }) {
  const { k } = ctx;
  const points = cue.path.map((point) => resolvePoint(point, ctx.view));
  const progress = ease.inOut((ctx.t - cue.from) / (cue.draw ?? 0.8));
  const drawn = partialPath(points, Math.max(progress, 0.001));
  const color = cue.color ?? "#ff7a2f";
  const tip = drawn[drawn.length - 1];
  const prev = drawn.length > 1 ? drawn[drawn.length - 2] : points[0];
  const angle = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
  const head = 26 * k;
  const wing = (turn: number): Vec => [tip[0] - head * Math.cos(angle + turn), tip[1] - head * Math.sin(angle + turn)];
  const mid = pointAlong(points, 0.5);
  return (
    <g opacity={ctx.alpha}>
      <polyline points={drawn.map((p) => p.join(",")).join(" ")} fill="none" stroke="#fff" strokeWidth={15 * k} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={drawn.map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth={8 * k} strokeLinecap="round" strokeLinejoin="round" />
      {progress > 0.05 && <polygon points={[tip, wing(0.5), wing(-0.5)].map((p) => p.join(",")).join(" ")} fill={color} stroke="#fff" strokeWidth={3 * k} strokeLinejoin="round" />}
      {cue.text && progress > 0.6 && (
        <text className="film-text" x={mid[0]} y={mid[1] - 30 * ctx.ui} fontSize={28 * ctx.ui} textAnchor="middle" fill={color} opacity={smooth((progress - 0.6) / 0.4)}>{cue.text}</text>
      )}
    </g>
  );
}

function Sprite({ cue, ctx }: { cue: Extract<Cue, { kind: "sprite" }>; ctx: Ctx }) {
  const points = cue.path.map((point) => resolvePoint(point, ctx.view));
  const local = ctx.t - cue.from;
  const [x, y] = points.length === 1 ? points[0] : pointAlong(points, ease.inOut(local / (cue.travel ?? 2)));
  const scale = points.length === 1 ? Math.max(ease.backOut(local / 0.5), 0.01) : 1;
  const rotate = cue.spin ? local * 160 : cue.wobble ? Math.sin(local * 6) * 10 : 0;
  return (
    <text
      x={0} y={0} fontSize={cue.size ?? 56} textAnchor="middle" dominantBaseline="central" opacity={ctx.alpha}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    >
      {cue.icon}
    </text>
  );
}

function Shape({ cue, ctx }: { cue: Extract<Cue, { kind: "shape" }>; ctx: Ctx }) {
  const [x, y] = resolvePoint(cue.at, ctx.view);
  const [w, h] = cue.size;
  const local = ctx.t - cue.from;
  let scale = Math.max(ease.backOut(local / 0.5), 0.01);
  let rotate = 0;
  if (cue.motion === "pulse") scale *= 1 + 0.06 * Math.sin(local * 5);
  if (cue.motion === "wiggle") rotate = Math.sin(local * 7) * 5;
  if (cue.motion === "grow") scale *= 0.35 + 0.65 * ease.inOut(local / (cue.over ?? 2));
  if (cue.motion === "shrink") scale *= 1 - 0.55 * ease.inOut(local / (cue.over ?? 2));
  const stroke = cue.outline ? { stroke: ink, strokeWidth: 4, strokeDasharray: "12 8" } : { stroke: "#fff", strokeWidth: 4 };
  const body =
    cue.shape === "circle" ? <ellipse cx={0} cy={0} rx={w / 2} ry={h / 2} fill={cue.color} {...stroke} />
      : <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={cue.shape === "pill" ? h / 2 : Math.min(18, h / 4)} fill={cue.color} {...stroke} />;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={ctx.alpha}>
      {body}
      {cue.text && <text className="film-text" fontSize={Math.min(30, h * 0.4, (w * 1.6) / cue.text.length)} textAnchor="middle" dominantBaseline="central" fill={ink}>{cue.text}</text>}
    </g>
  );
}

function BigText({ cue, ctx }: { cue: Extract<Cue, { kind: "text" }>; ctx: Ctx }) {
  const size = { s: 34, m: 48, l: 72 }[cue.size ?? "m"] * captionScale(ctx);
  const chars = [...cue.text];
  const [x, y] = keepInside(captionPoint(cue.at, ctx), (chars.length * size) / 2, size / 2, ctx);
  return (
    <text className="film-text film-big" x={x} y={y} fontSize={size} textAnchor="middle" dominantBaseline="central" fill={cue.color ?? ink} opacity={ctx.alpha}>
      {chars.map((char, i) => (
        <tspan key={i} opacity={smooth((ctx.t - cue.from - i * 0.05) / 0.15)}>{char}</tspan>
      ))}
    </text>
  );
}

function Count({ cue, ctx }: { cue: Extract<Cue, { kind: "count" }>; ctx: Ctx }) {
  const [x, y] = captionPoint(cue.at, ctx);
  const value = cue.start + (cue.end - cue.start) * ease.inOut((ctx.t - cue.from) / (cue.over ?? 2));
  const { k } = ctx;
  return (
    <g opacity={ctx.alpha} transform={`translate(${x} ${y})`}>
      <rect x={-150 * k} y={-70 * k} width={300 * k} height={140 * k} rx={28 * k} fill="#fff" stroke={ink} strokeWidth={3 * k} />
      <text className="film-text" y={-34 * k} fontSize={Math.min(26 * captionScale(ctx), (270 * k) / [...cue.label].length)} textAnchor="middle" fill="#7a6a55">{cue.label}</text>
      <text className="film-text film-big" y={22 * k} fontSize={58 * k} textAnchor="middle" fill={ink}>
        {Math.round(value)}<tspan fontSize={24 * k}> {cue.unit ?? ""}</tspan>
      </text>
    </g>
  );
}

function Meter({ cue, ctx }: { cue: Extract<Cue, { kind: "meter" }>; ctx: Ctx }) {
  const [x, y] = captionPoint(cue.at, ctx);
  const { k } = ctx;
  const value = cue.start + (cue.end - cue.start) * ease.inOut((ctx.t - cue.from) / (cue.over ?? 2));
  const width = 280 * k;
  return (
    <g opacity={ctx.alpha} transform={`translate(${x - width / 2} ${y})`}>
      <text className="film-text" y={-14 * k} fontSize={Math.min(26 * captionScale(ctx), width / [...cue.label].length)} fill={ink}>{cue.label}</text>
      <rect width={width} height={28 * k} rx={14 * k} fill="#fff" stroke={ink} strokeWidth={3 * k} />
      <rect width={Math.max(width * Math.min(Math.max(value, 0), 1), 0)} height={28 * k} rx={14 * k} fill={cue.color ?? "#4fb6ff"} />
    </g>
  );
}

function renderCue(cue: Cue, ctx: Ctx): ReactNode {
  switch (cue.kind) {
    case "label": return <Label cue={cue} ctx={ctx} />;
    case "highlight": return <Highlight cue={cue} ctx={ctx} />;
    case "pulse": return <Pulse cue={cue} ctx={ctx} />;
    case "flow": return <Flow cue={cue} ctx={ctx} />;
    case "arrow": return <Arrow cue={cue} ctx={ctx} />;
    case "sprite": return <Sprite cue={cue} ctx={ctx} />;
    case "shape": return <Shape cue={cue} ctx={ctx} />;
    case "text": return <BigText cue={cue} ctx={ctx} />;
    case "count": return <Count cue={cue} ctx={ctx} />;
    case "meter": return <Meter cue={cue} ctx={ctx} />;
    case "myth": return null;
  }
}

function Myth({ cue, t }: { cue: Extract<Cue, { kind: "myth" }>; t: number }) {
  const local = t - cue.from;
  const strike = smooth((local - 0.9) / 0.5);
  const right = smooth((local - 1.6) / 0.4);
  return (
    <div className="film-myth" style={{ opacity: envelope(t, cue.from, cue.to) }}>
      <span className="film-myth-wrong" style={{ "--strike": strike } as CSSProperties}>❌ {cue.wrong}</span>
      <span className="film-myth-right" style={{ opacity: right }}>✅ {cue.right}</span>
    </div>
  );
}

type Props = {
  scene: FilmScene;
  /** 这场戏里的时间（秒） */
  t: number;
  previous?: FilmScene;
  isLast: boolean;
  number: number;
};

export function FilmStage({ scene, t, previous, isLast, number }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(comfortableWidth);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width || comfortableWidth));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  const view = viewOf(scene);
  const camera = cameraAt(scene.camera, t, view);
  const k = 1 / camera.zoom;
  const ui = k * Math.min(Math.max(comfortableWidth / stageWidth, 1), maxLegibility);
  const sceneFade = isLast ? 1 : 1 - smooth((t - (scene.duration - 0.3)) / 0.3);
  const sharedView = previous && previous.view === scene.view;
  const previousLayers = new Set((previous?.layers ?? []).map((use) => normalize(use).layer));

  return (
    <div ref={stageRef} className="film-stage" data-view={scene.view}>
      <svg viewBox={`${camera.x} ${camera.y} ${camera.width} ${camera.height}`} role="img" aria-label={scene.title}>
        {scene.view !== "blank" && (scene.layers ?? []).map((use) => {
          const { layer, opacity = 1, from, to, motion, rate } = normalize(use);
          const box = view?.layers[layer];
          if (!box) return null;
          const fade = from === undefined && sharedView && previousLayers.has(layer) ? (to === undefined || t <= to ? 1 : envelope(t, 0, to)) : envelope(t, from ?? 0, to);
          const { sx, sy } = layerMotion(motion, t, rate);
          const [cx, cy] = box.at;
          return (
            <image
              key={layer} href={layerSrc(scene.view as ViewId, layer)} x={0} y={0} width={1200} height={900} opacity={opacity * fade}
              transform={motion ? `translate(${cx} ${cy}) scale(${sx} ${sy}) translate(${-cx} ${-cy})` : undefined}
            />
          );
        })}
        {scene.cues.map((cue, index) => {
          const alpha = envelope(t, cue.from, cue.to) * sceneFade;
          if (alpha <= 0.001) return null;
          return <g key={index}>{renderCue(cue, { view, t, k, ui, alpha, camera })}</g>;
        })}
      </svg>
      <span className="film-title"><b>{number}</b>{scene.title}</span>
      {scene.cues.map((cue, index) => (cue.kind === "myth" && t >= cue.from ? <Myth key={index} cue={cue} t={t} /> : null))}
    </div>
  );
}
