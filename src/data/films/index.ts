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

export const films: readonly Film[] = [...brain, ...senses, ...heartBlood, ...breathe, ...digest, ...skin, ...move, ...defend, ...grow];

const byQuestion = new Map(films.map((film) => [film.question, film]));

export const filmFor = (questionId: string): Film | undefined => byQuestion.get(questionId);
