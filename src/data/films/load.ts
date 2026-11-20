import type { BodySystemId } from "../questions/types.ts";
import type { Film } from "./types.ts";

/** 动画按身体部位拆包：一个问题的动画写在它所属部位的文件里，打开问题时只下载那个部位的 */
const loaders: Record<BodySystemId, () => Promise<{ films: readonly Film[] }>> = {
  brain: () => import("./brain.ts"),
  senses: () => import("./senses.ts"),
  "heart-blood": () => import("./heart-blood.ts"),
  breathe: () => import("./breathe.ts"),
  digest: () => import("./digest.ts"),
  skin: () => import("./skin.ts"),
  move: () => import("./move.ts"),
  defend: () => import("./defend.ts"),
  grow: () => import("./grow.ts")
};

export async function loadFilm(question: { id: string; system: BodySystemId }): Promise<Film | undefined> {
  const { films } = await loaders[question.system]();
  return films.find((film) => film.question === question.id);
}
