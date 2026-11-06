import assert from "node:assert/strict";
import { test } from "node:test";
import { bodyQuestions, bodySystems, nextQuestions, questionById, questionsIn } from "../src/data/questions/index.ts";
import { dialogueProblems, sharedWords, topicWords } from "./dialogue-rules.mjs";

test("question ids are unique and every question belongs to a known system", () => {
  const ids = bodyQuestions.map((question) => question.id);
  assert.equal(new Set(ids).size, ids.length);
  const systems = new Set(bodySystems.map((system) => system.id));
  for (const question of bodyQuestions) assert.ok(systems.has(question.system), question.id);
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
  for (const question of bodyQuestions) {
    const related = nextQuestions(question);
    assert.ok(related.length >= 1, question.id);
    assert.ok(related.every((item) => item.system === question.system && item.id !== question.id), question.id);
  }
});
