import { brainQuestions } from "./brain.ts";
import { breatheQuestions } from "./breathe.ts";
import { defendQuestions } from "./defend.ts";
import { digestQuestions } from "./digest.ts";
import { growQuestions } from "./grow.ts";
import { heartBloodQuestions } from "./heart-blood.ts";
import { moveQuestions } from "./move.ts";
import { sensesQuestions } from "./senses.ts";
import { skinQuestions } from "./skin.ts";
import { bodySystems, type BodyQuestion, type BodySystem, type BodySystemId } from "./types.ts";

export * from "./types.ts";

/** 新问题只要加进对应系统的文件，就会出现在这里 */
export const bodyQuestions: readonly BodyQuestion[] = [
  ...brainQuestions,
  ...sensesQuestions,
  ...heartBloodQuestions,
  ...breatheQuestions,
  ...digestQuestions,
  ...skinQuestions,
  ...moveQuestions,
  ...defendQuestions,
  ...growQuestions
];

/** 跨身体部位的知识串联（双向生效）：把不同系统背后相通的原理连成一张网 */
export const crossSystemPairs: readonly (readonly [string, string])[] = [
  ["bruise", "poop-brown"],
  ["blood-red", "red-lips"],
  ["lose-teeth", "tooth-cavity"],
  ["spicy-hot", "pain"],
  ["ears-pop", "runny-nose"],
  ["ears-pop", "earwax"],
  ["tears", "runny-nose"],
  ["eyes-closed-walk", "foot-asleep"],
  ["heart-run", "panting"],
  ["full-run", "heart-run"],
  ["shiver-cold", "fever"],
  ["sweat", "pee-water"],
  ["mosquito-bite", "pain"],
  ["good-bacteria", "fart"],
  ["sore-throat", "choke-cough"],
  ["nosebleed", "winter-breath"],
  ["growth", "why-sleep"],
  ["baby-bones", "where-from"],
  ["fingerprints", "wrinkly-water"],
  ["look-like", "blood-types"],
  ["aging", "sunburn-tan"],
  ["broken-bone", "scab"],
  ["leg-cramp", "foot-asleep"],
  ["pinch-bean", "dual-task"],
  ["handwash", "tooth-cavity"],
  ["vaccine", "memory"]
];

const byOrder = (a: BodyQuestion, b: BodyQuestion) => a.difficulty - b.difficulty;

export function questionsIn(system: BodySystemId): BodyQuestion[] {
  return bodyQuestions.filter((question) => question.system === system).sort(byOrder);
}

export function questionById(id: string): BodyQuestion | undefined {
  return bodyQuestions.find((question) => question.id === id);
}

export function systemById(id: string): BodySystem | undefined {
  return bodySystems.find((system) => system.id === id);
}

/** 同一系统里排在后面的问题，用作“小念还想问” */
export function nextQuestions(question: BodyQuestion, count = 3): BodyQuestion[] {
  const list = questionsIn(question.system).filter((item) => item.id !== question.id);
  const after = list.filter((item) => item.difficulty >= question.difficulty);
  return [...after, ...list.filter((item) => !after.includes(item))].slice(0, count);
}

/** 跨身体部位的关联问题：比如从“乌青变色”连到“便便为什么是棕色” */
export function linkedQuestions(question: BodyQuestion, count = 2): BodyQuestion[] {
  const seen = new Set<string>();
  const out: BodyQuestion[] = [];
  for (const [a, b] of crossSystemPairs) {
    const otherId = a === question.id ? b : b === question.id ? a : undefined;
    if (!otherId || seen.has(otherId)) continue;
    const target = questionById(otherId);
    if (target && target.system !== question.system) {
      seen.add(otherId);
      out.push(target);
    }
  }
  return out.slice(0, count);
}

/** 按关键词搜问题：优先匹配标题，其次触发场景和部位名，最后匹配问答正文 */
export function searchQuestions(rawQuery: string): BodyQuestion[] {
  const tokens = rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const scored: { question: BodyQuestion; score: number }[] = [];
  for (const question of bodyQuestions) {
    const systemTitle = systemById(question.system)?.title.toLowerCase() ?? "";
    const title = question.title.toLowerCase();
    const trigger = question.trigger.toLowerCase();
    const body = question.dialogue.map((turn) => `${turn.nian} ${turn.dad}`).join(" ").toLowerCase();
    const allIn = (text: string) => tokens.every((token) => text.includes(token));
    if (!allIn(`${title} ${trigger} ${systemTitle} ${body}`)) continue;
    const score = allIn(title) ? 3 : allIn(`${title} ${trigger} ${systemTitle}`) ? 2 : 1;
    scored.push({ question, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.question.difficulty - b.question.difficulty)
    .map((entry) => entry.question);
}

/** 随机抽一道适合直接打开的问题（优先抽还没看过的，避开需家长确认的题目） */
export function pickRandomQuestion(heard: readonly string[] = [], excludeId?: string): BodyQuestion {
  const openPool = bodyQuestions.filter((item) => !item.parentGate && item.id !== excludeId);
  const unheard = openPool.filter((item) => !heard.includes(item.id));
  const pool = unheard.length > 0 ? unheard : openPool.length > 0 ? openPool : bodyQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}
