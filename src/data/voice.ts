import type { Speaker } from "../lib/narration";
import manifest from "./voice-manifest.json";
import type { BodyQuestion } from "./questions/types";

/** 小念和爸爸的配音，由 `npm run voice` 生成到 public/voice/ */
export type FilmVoice = {
  readonly turnCount: number;
  readonly lengthOf: (turn: number, who: Speaker) => number | undefined;
  readonly src: (turn: number, who: Speaker) => string;
};

const clips = (manifest as { clips: Record<string, { hash: string; seconds: number }> }).clips;
const base = import.meta.env.BASE_URL;

export function voiceFor(question: BodyQuestion): FilmVoice | undefined {
  const key = (turn: number, who: Speaker) => `${question.id}/${turn}-${who}`;
  if (!clips[key(0, "nian")]) return undefined;
  return {
    turnCount: question.dialogue.length,
    lengthOf: (turn, who) => clips[key(turn, who)]?.seconds,
    src: (turn, who) => `${base}voice/${key(turn, who)}.mp3`
  };
}
