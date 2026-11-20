import assert from "node:assert/strict";
import { test } from "node:test";
import { bodyQuestions } from "../src/data/questions/all.ts";
import {
  bodySystems, crossSystemPairs, linkedQuestions, loadQuestion, loadSearchText, nextQuestions, pickRandomQuestion,
  questionById, questionCatalog, questionsIn, searchQuestions
} from "../src/data/questions/index.ts";
import { catalogRows } from "../tools/catalog.mjs";
import { dialogueProblems, sharedWords, topicWords } from "./dialogue-rules.mjs";

test("question ids are unique and every question belongs to a known system", () => {
  const ids = bodyQuestions.map((question) => question.id);
  assert.equal(new Set(ids).size, ids.length);
  const systems = new Set(bodySystems.map((system) => system.id));
  for (const question of bodyQuestions) assert.ok(systems.has(question.system), question.id);
});

test("题目目录和问答数据一致：改了问答要重新生成（npm run catalog）", () => {
  assert.deepEqual(questionCatalog, catalogRows(bodyQuestions));
});

test("每个问题的正文都能按所属部位加载到", async () => {
  for (const question of bodyQuestions) {
    assert.equal(await loadQuestion(question), question, `${question.id} 不在 src/data/questions/${question.system}.ts`);
  }
});

test("every body part has at least four questions, listed from easy to hard", () => {
  for (const system of bodySystems) {
    const list = questionsIn(system.id);
    assert.ok(list.length >= 4, `${system.id} has ${list.length}`);
    assert.equal(list[0].difficulty, 1, system.id);
    for (let i = 1; i < list.length; i += 1) assert.ok(list[i].difficulty >= list[i - 1].difficulty, system.id);
  }
});

test("every dialogue is a chain of follow-ups that ends with 小念 summing up", () => {
  const problems = bodyQuestions.flatMap((question) => dialogueProblems(question));
  assert.deepEqual(problems, []);
});

test("the follow-up check looks at meaning words, not filler", () => {
  const words = topicWords("膈肌为什么会自己抽一下？");
  assert.ok(words.has("膈肌") && !words.has("什么") && !words.has("一下"));
  assert.deepEqual(sharedWords("那为什么呢？", "这是为什么呢"), []);
  assert.deepEqual(sharedWords("膈肌在哪儿？", "肺下面有一块肌肉，叫膈肌"), ["膈肌"]);
});

test("sensitive questions are gated for grown-ups", () => {
  for (const id of ["where-from", "aging"]) assert.ok(questionById(id)?.parentGate, id);
});

test("related questions stay in the same body part", () => {
  for (const question of questionCatalog) {
    const related = nextQuestions(question);
    assert.ok(related.length >= 1, question.id);
    assert.ok(related.every((item) => item.system === question.system && item.id !== question.id), question.id);
  }
});

test("cross-system links connect existing questions from different body parts symmetrically", () => {
  for (const [aId, bId] of crossSystemPairs) {
    const a = questionById(aId);
    const b = questionById(bId);
    assert.ok(a, `unknown question ${aId}`);
    assert.ok(b, `unknown question ${bId}`);
    assert.notEqual(a.system, b.system, `${aId} and ${bId} are in the same system`);
    assert.ok(linkedQuestions(a, 10).some((item) => item.id === bId), `${aId} -> ${bId}`);
    assert.ok(linkedQuestions(b, 10).some((item) => item.id === aId), `${bId} -> ${aId}`);
  }
});

test("search ranks title matches first and random picker avoids parent-gated questions", () => {
  assert.deepEqual(searchQuestions("   "), []);
  const spicy = searchQuestions("辣椒");
  assert.equal(spicy[0]?.id, "spicy-hot");
  for (let i = 0; i < 30; i += 1) {
    const pick = pickRandomQuestion([], "sneeze");
    assert.ok(!pick.parentGate && pick.id !== "sneeze");
  }
});

test("search reaches into the dialogue text once it has been loaded", async () => {
  assert.ok(!searchQuestions("海马体").some((item) => item.id === "why-sleep"), "海马体只出现在正文里");
  const bodies = await loadSearchText();
  assert.equal(bodies.size, bodyQuestions.length);
  assert.ok(searchQuestions("海马体", bodies).some((item) => item.id === "why-sleep"));
  assert.equal(searchQuestions("辣椒", bodies)[0]?.id, "spicy-hot");
});
