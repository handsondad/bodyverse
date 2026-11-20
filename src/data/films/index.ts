import { films as brain } from "./brain.ts";
import { films as breathe } from "./breathe.ts";
import { films as defend } from "./defend.ts";
import { films as digest } from "./digest.ts";
import { films as grow } from "./grow.ts";
import { films as heartBlood } from "./heart-blood.ts";
import { films as move } from "./move.ts";
import { films as senses } from "./senses.ts";
import { films as skin } from "./skin.ts";
import type { Film } from "./types";

export type { Film, FilmScene, Cue, LayerUse, Point, ViewId, LayerId } from "./types";

/**
 * 全部动画。只给测试和 tools/ 里的脚本用。
 * 页面代码不要引入这个文件：所有动画会被打成一个大包。页面用 load.ts 按身体部位加载。
 */
export const films: readonly Film[] = [...brain, ...senses, ...heartBlood, ...breathe, ...digest, ...skin, ...move, ...defend, ...grow];
