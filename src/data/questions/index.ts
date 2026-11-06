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
