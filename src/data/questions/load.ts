import type { BodyQuestion, BodySystemId } from "./types.ts";

/** 问答正文按身体部位拆包：打开哪个部位的问题，才下载哪个部位的正文 */
const loaders: Record<BodySystemId, () => Promise<readonly BodyQuestion[]>> = {
  brain: () => import("./brain.ts").then((module) => module.brainQuestions),
  senses: () => import("./senses.ts").then((module) => module.sensesQuestions),
  "heart-blood": () => import("./heart-blood.ts").then((module) => module.heartBloodQuestions),
  breathe: () => import("./breathe.ts").then((module) => module.breatheQuestions),
  digest: () => import("./digest.ts").then((module) => module.digestQuestions),
  skin: () => import("./skin.ts").then((module) => module.skinQuestions),
  move: () => import("./move.ts").then((module) => module.moveQuestions),
  defend: () => import("./defend.ts").then((module) => module.defendQuestions),
  grow: () => import("./grow.ts").then((module) => module.growQuestions)
};

/** 取一个问题的完整内容（问答正文和给大人的话） */
export async function loadQuestion(info: { id: string; system: BodySystemId }): Promise<BodyQuestion> {
  const list = await loaders[info.system]();
  const found = list.find((question) => question.id === info.id);
  if (!found) throw new Error(`问题 ${info.id} 不在 ${info.system} 的问答文件里`);
  return found;
}

/** 每个问题的问答正文（小写），按问题 id 取 */
export type SearchText = ReadonlyMap<string, string>;

/** 全部问答正文，给首页搜索用；用到搜索框时才加载 */
export async function loadSearchText(): Promise<SearchText> {
  const lists = await Promise.all(Object.values(loaders).map((load) => load()));
  return new Map(lists.flat().map((question) => [
    question.id,
    question.dialogue.map((turn) => `${turn.nian} ${turn.dad}`).join(" ").toLowerCase()
  ]));
}
