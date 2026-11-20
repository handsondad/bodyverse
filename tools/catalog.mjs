// 从问答数据生成题目目录 src/data/questions/catalog.ts。
// 目录只有标题、场景、难度这些列表和搜索用得到的信息，不带问答正文，所以首屏只加载它。
// npm run dev / build / test 会自动跑；也可以手动：npm run catalog
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { bodyQuestions } from "../src/data/questions/all.ts";

const catalogFile = new URL("../src/data/questions/catalog.ts", import.meta.url);

export function catalogRows(questions = bodyQuestions) {
  return questions.map((question) => ({
    id: question.id,
    system: question.system,
    title: question.title,
    trigger: question.trigger,
    difficulty: question.difficulty,
    sciences: [...question.sciences],
    turns: question.dialogue.length,
    hasJourney: question.dialogue.some((turn) => turn.show?.kind === "journey"),
    ...(question.parentGate ? { parentGate: question.parentGate } : {})
  }));
}

export function catalogSource(questions = bodyQuestions) {
  return [
    "// 由 tools/catalog.mjs 从问答数据生成，不要手改。改了问答以后运行：npm run catalog",
    'import type { QuestionInfo } from "./types.ts";',
    "",
    "export const questionCatalog: readonly QuestionInfo[] = [",
    catalogRows(questions).map((row) => `  ${JSON.stringify(row)}`).join(",\n"),
    "];",
    ""
  ].join("\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const next = catalogSource();
  const current = existsSync(catalogFile) ? readFileSync(catalogFile, "utf8").replace(/\r\n/g, "\n") : "";
  if (current !== next) {
    writeFileSync(catalogFile, next);
    console.log(`题目目录已更新：${bodyQuestions.length} 个问题`);
  }
}
