import { brainQuestions } from "./brain.ts";
import { breatheQuestions } from "./breathe.ts";
import { defendQuestions } from "./defend.ts";
import { digestQuestions } from "./digest.ts";
import { growQuestions } from "./grow.ts";
import { heartBloodQuestions } from "./heart-blood.ts";
import { moveQuestions } from "./move.ts";
import { sensesQuestions } from "./senses.ts";
import { skinQuestions } from "./skin.ts";
import type { BodyQuestion } from "./types.ts";

/**
 * 全部问题连同问答正文。只给测试和 tools/ 里的脚本用。
 * 页面代码不要引入这个文件：正文会被打进首屏。页面用 index.ts 的题目目录和 load.ts 的按需加载。
 */
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
