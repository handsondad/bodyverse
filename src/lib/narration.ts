import type { CameraKey, Cue, Film, FilmScene, LayerUse } from "../data/films/types";

// 配音版时间线：小念和爸爸把每一轮问答读出来，动画跟着声音走。
// 一场戏（或配同一轮问答的几场戏）要等这几句读完，所以按声音的长度把整场戏等比例拉长：
// 元素出现、消失、镜头推拉、数字和图形变化都跟着放慢；心跳、呼吸、流动这些循环动作保持原速。

export type Speaker = "nian" | "dad";

/** 一句配音在全片时间线上的位置（秒） */
export type SpokenLine = { readonly turn: number; readonly who: Speaker; readonly start: number; readonly seconds: number };

/** 第 turn 轮里 who 那句话读多少秒；没有配音返回 undefined */
export type LineLength = (turn: number, who: Speaker) => number | undefined;

/** 开口前、一问一答之间、两轮之间、最后一句之后各留的空（秒） */
export const narrationGaps = { lead: 0.4, between: 0.35, afterTurn: 0.7, tail: 0.8 } as const;

const scaled = (value: number | undefined, factor: number) => (value === undefined ? undefined : value * factor);

function stretchCue(cue: Cue, factor: number): Cue {
  const timed = { ...cue, from: cue.from * factor, to: scaled(cue.to, factor) };
  if (cue.kind === "count" || cue.kind === "meter" || cue.kind === "shape") return { ...timed, over: (cue.over ?? 2) * factor } as Cue;
  return timed as Cue;
}

function stretchLayer(use: LayerUse, factor: number): LayerUse {
  if (typeof use === "string") return use;
  return { ...use, from: scaled(use.from, factor), to: scaled(use.to, factor) };
}

/** 把一场戏的时间轴拉长 factor 倍 */
export function stretchScene(scene: FilmScene, factor: number): FilmScene {
  if (factor === 1) return scene;
  return {
    ...scene,
    duration: scene.duration * factor,
    layers: scene.layers?.map((use) => stretchLayer(use, factor)),
    camera: scene.camera?.map((key): CameraKey => ({ ...key, t: key.t * factor })),
    cues: scene.cues.map((cue) => stretchCue(cue, factor))
  };
}

/**
 * 给动画配上整段问答的声音。每场戏读它那一轮；动画没配到的轮次（通常是最后小念的总结）
 * 接在前一场戏后面读。缺任何一句配音就返回 undefined，播放器退回无声版。
 */
export function narrateFilm(film: Film, turnCount: number, lengthOf: LineLength): { film: Film; lines: SpokenLine[] } | undefined {
  const groups: { turn: number; scenes: FilmScene[] }[] = [];
  for (const scene of film.scenes) {
    const last = groups[groups.length - 1];
    if (last && last.turn === scene.turn) last.scenes.push(scene);
    else groups.push({ turn: scene.turn, scenes: [scene] });
  }

  const scenes: FilmScene[] = [];
  const lines: SpokenLine[] = [];
  let start = 0;
  for (let g = 0; g < groups.length; g += 1) {
    const { turn, scenes: group } = groups[g];
    const next = groups[g + 1]?.turn;
    const end = next === undefined ? turnCount : next > turn ? next : turn + 1;

    let cursor = narrationGaps.lead;
    for (let spoken = turn; spoken < end; spoken += 1) {
      for (const who of ["nian", "dad"] as const) {
        const seconds = lengthOf(spoken, who);
        if (seconds === undefined) return undefined;
        lines.push({ turn: spoken, who, start: start + cursor, seconds });
        cursor += seconds + (who === "nian" ? narrationGaps.between : narrationGaps.afterTurn);
      }
    }
    const needed = cursor - narrationGaps.afterTurn + narrationGaps.tail;
    const planned = group.reduce((sum, scene) => sum + scene.duration, 0);
    const factor = Math.max(1, needed / planned);
    for (const scene of group) scenes.push(stretchScene(scene, factor));
    start += planned * factor;
  }
  return { film: { ...film, scenes }, lines };
}

/** 全片时间 time 时正在读（或刚读完）的那一句 */
export function lineAt(lines: readonly SpokenLine[], time: number): { line: SpokenLine; speaking: boolean } | undefined {
  let found: SpokenLine | undefined;
  for (const line of lines) {
    if (line.start > time) break;
    found = line;
  }
  return found && { line: found, speaking: time < found.start + found.seconds };
}
