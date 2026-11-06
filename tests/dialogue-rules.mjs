// Rules every 小念 × 爸爸 dialogue must follow. Run on one file while writing content:
//   node tests/dialogue-rules.mjs src/data/questions/brain.ts
import { pathToFileURL } from "node:url";
import { lungStops } from "../src/data/lungs-journey.ts";
import { heartStops } from "../src/data/journeys.ts";

export const journeyStops = { heart: heartStops.map((stop) => stop.id), lungs: lungStops.map((stop) => stop.id) };

export const jargon = /ATP|IgA|SCN9A|Aδ|pH|髓过氧化物酶|胆红素|血红素|壶腹|受体|神经元|潮气量|通气量|轴突/;

// Bigrams made only of these characters say nothing about the topic.
const filler = new Set("的了吗呢吧呀啊哦嘛是我你他她它们这那就也都还又在有和么什怎为个一不没会要说想看能可以得很太好真再");

/** Two-character words in `line` that carry meaning, e.g. 膈肌, 氧气, 肺泡. */
export function topicWords(line) {
  const words = new Set();
  const chars = [...line];
  for (let i = 0; i < chars.length - 1; i += 1) {
    const a = chars[i];
    const b = chars[i + 1];
    if (!/\p{Script=Han}/u.test(a) || !/\p{Script=Han}/u.test(b)) continue;
    if (filler.has(a) || filler.has(b)) continue;
    words.add(a + b);
  }
  return words;
}

export function sharedWords(question, answer) {
  return [...topicWords(question)].filter((word) => answer.includes(word));
}

export function dialogueProblems(question) {
  const problems = [];
  const say = (message) => problems.push(`${question.id}: ${message}`);
  for (const old of ["beats", "tags", "guess", "tryIt", "analogyLimit"]) if (old in question) say(`remove the old field "${old}"`);
  if (!/？/.test(question.title)) say("title must be a question with ？");
  const turns = question.dialogue ?? [];
  if (turns.length < 5 || turns.length > 8) say(`needs 5–8 turns, has ${turns.length}`);
  turns.forEach((turn, index) => {
    const last = index === turns.length - 1;
    if (!turn.nian || !turn.dad) say(`turn ${index + 1} needs both lines`);
    if (!last && !/？/.test(turn.nian)) say(`turn ${index + 1}: 小念 should ask a question with ？`);
    if (last && !/懂了|明白了/.test(turn.nian)) say("last turn: 小念 sums up in his own words, starting with 我懂了/我明白了");
    if (index > 0) {
      const shared = sharedWords(turn.nian, turns[index - 1].dad);
      if (shared.length === 0) say(`turn ${index + 1}: 小念's question must pick up a word from 爸爸's previous answer`);
    }
    if (turn.dad.length < 20 || turn.dad.length > 170) say(`turn ${index + 1}: 爸爸's answer is ${turn.dad.length} chars (20–170)`);
    for (const line of [turn.nian, turn.dad]) if (jargon.test(line)) say(`turn ${index + 1}: avoid jargon ${line.match(jargon)[0]}`);
    if (turn.show?.kind === "journey" && !journeyStops[turn.show.journey]?.includes(turn.show.stop)) {
      say(`turn ${index + 1}: unknown journey stop ${turn.show.journey}/${turn.show.stop}`);
    }
    if (turn.show?.kind === "steps" && turn.show.frames.length < 2) say(`turn ${index + 1}: steps need 2+ frames`);
  });
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const files = process.argv.slice(2);
  let total = 0;
  for (const file of files) {
    const module = await import(pathToFileURL(file).href);
    for (const list of Object.values(module)) {
      if (!Array.isArray(list)) continue;
      for (const question of list) {
        const problems = dialogueProblems(question);
        total += problems.length;
        for (const problem of problems) console.log(problem);
      }
    }
  }
  console.log(total ? `${total} problem(s)` : "all dialogues pass");
  process.exitCode = total ? 1 : 0;
}
