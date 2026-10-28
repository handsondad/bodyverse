import assert from "node:assert/strict";
import { test } from "node:test";
import { heartNodes, recommendedScale } from "../src/data/heart-exploration.ts";
import { bloodFlowPerMinute, createHeartDraft, parseHeartDraft } from "../src/lib/heart-storyboard.ts";

test("all five scales cover every age with a question and analogy boundary", () => {
  assert.deepEqual(heartNodes.map((node) => node.id), ["body", "organ", "tissue", "cell", "molecule"]);
  for (const age of ["4-6", "7-9", "10-12", "13+"]) {
    assert.ok(heartNodes.some((node) => node.id === recommendedScale[age]));
    for (const node of heartNodes) {
      assert.ok(node.text[age].length > 15);
      assert.ok(node.question);
      assert.ok(node.analogyLimit);
    }
  }
});

test("model uses the exact fixed-volume formula, including both slider limits", () => {
  assert.equal(bloodFlowPerMinute(60), 3000);
  assert.equal(bloodFlowPerMinute(80), 4000);
  assert.equal(bloodFlowPerMinute(140), 7000);
  for (const rate of [-1, 59, 141, NaN, Infinity, 80.5]) {
    assert.throws(() => bloodFlowPerMinute(rate));
  }
});

test("storyboards are independent editable drafts with three structured scenes", () => {
  const first = createHeartDraft("4-6");
  const second = createHeartDraft("13+");
  first.scenes[0].narration = "我的解释";
  assert.equal(second.scenes[0].narration, "");
  assert.equal(first.scenes.length, 3);
  assert.equal(first.publication, "local-draft");
  assert.equal(first.age, "4-6");
});

test("saved storyboard round trips without losing text, scales or age", () => {
  const draft = createHeartDraft("10-12");
  draft.savedAt = "2026-10-28T10:00:00.000Z";
  draft.scenes[2] = { nodeId: "molecule", visual: "放大肌丝", narration: "ATP 参与收缩循环。" };
  draft.nextQuestion = "心脏为什么不会随意停下来？";
  assert.deepEqual(parseHeartDraft(JSON.stringify(draft)), draft);
});

test("malformed and unsupported saved data is explicitly rejected", () => {
  const saved = { ...createHeartDraft("7-9"), savedAt: new Date().toISOString() };
  assert.throws(() => parseHeartDraft("{"));
  for (const patch of [
    { version: 2 }, { topic: "head" }, { age: ["7-9"] }, { age: "adult" },
    { publication: "public" }, { savedAt: "" }, { scenes: [] },
    { title: "x".repeat(81) }, { nextQuestion: "x".repeat(301) },
    { scenes: [null, ...saved.scenes.slice(1)] },
    { scenes: [{ ...saved.scenes[0], nodeId: ["body"] }, ...saved.scenes.slice(1)] },
    { scenes: [{ ...saved.scenes[0], narration: "x".repeat(501) }, ...saved.scenes.slice(1)] }
  ]) {
    assert.throws(() => parseHeartDraft(JSON.stringify({ ...saved, ...patch })));
  }
});
