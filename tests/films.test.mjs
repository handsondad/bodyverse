import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { bodyQuestions } from "../src/data/questions/index.ts";
import { films } from "../src/data/films/index.ts";
import { cameraAt, envelope, pointAlong, sceneAt, totalDuration } from "../src/lib/film.ts";
import { buildTemplates } from "../tools/new-question.mjs";
import { atlas, filmProblems } from "./film-rules.mjs";

const byId = new Map(bodyQuestions.map((question) => [question.id, question]));

test("每部动画都通过规则检查", () => {
  for (const film of films) assert.deepEqual(filmProblems(film, byId.get(film.question)), [], film.question);
});

test("每个问题都有讲解动画", () => {
  const have = new Set(films.map((film) => film.question));
  assert.deepEqual(bodyQuestions.filter((question) => !have.has(question.id)).map((question) => question.id), []);
});

test("一个问题只有一部动画", () => {
  const ids = films.map((film) => film.question);
  assert.equal(new Set(ids).size, ids.length);
});

test("动画用到的图集图片都在", () => {
  for (const film of films) {
    for (const scene of film.scenes) {
      for (const use of scene.layers ?? []) {
        const layer = typeof use === "string" ? use : use.layer;
        assert.ok(existsSync(new URL(`../public/anatomy/${scene.view}/${layer}.webp`, import.meta.url)), `${film.question} ${scene.view}/${layer}`);
      }
    }
  }
});

test("图集每个视角都是 1200×900，图层和锚点的中心在画面附近", () => {
  assert.equal(atlas.width, 1200);
  assert.equal(atlas.height, 900);
  for (const view of Object.values(atlas.views)) {
    for (const anchor of Object.values(view.anchors)) {
      const [x, y] = anchor.at;
      assert.ok(x >= 0 && x <= 1200 && y >= 0 && y <= 900, anchor.label);
    }
  }
});

test("时间线是时间的纯函数：同一时刻同一帧", () => {
  const film = films[0];
  const total = totalDuration(film);
  assert.deepEqual(sceneAt(film, 0), { index: 0, local: 0 });
  assert.equal(sceneAt(film, total + 5).index, film.scenes.length - 1);
  const second = film.scenes[0].duration + 0.5;
  assert.deepEqual(sceneAt(film, second), { index: 1, local: 0.5 });
  assert.equal(envelope(0.9, 1), 0);
  assert.ok(envelope(3, 1) > 0.99);
  assert.ok(envelope(10, 1, 4) < 0.01);
  assert.deepEqual(pointAlong([[0, 0], [100, 0], [100, 100]], 0.75), [100, 50]);
  const camera = cameraAt([{ t: 0, at: [600, 450], zoom: 2 }], 1);
  assert.deepEqual([camera.width, camera.height, camera.x, camera.y], [600, 450, 300, 225]);
  const edge = cameraAt([{ t: 0, at: [0, 0], zoom: 2 }], 0);
  assert.deepEqual([edge.x, edge.y], [0, 0]);
});

test("规则检查会拦住缺解剖底图、挡左上角标题、挡底部误会卡和标签互叠", () => {
  const sampleQuestion = { dialogue: Array.from({ length: 5 }, () => ({ nian: "？", dad: "答" })) };
  const baseScene = (turn) => ({
    turn, title: "示意", view: "blank", duration: 8,
    cues: [
      { kind: "sprite", icon: "✨", path: [[600, 450]], from: 0.3 },
      { kind: "text", at: [600, 500], text: "关键词", from: 1 }
    ]
  });
  const blankFilm = { question: "demo-test", scenes: [0, 1, 2, 3].map(baseScene) };
  assert.ok(filmProblems(blankFilm, sampleQuestion).some((msg) => msg.includes("解剖底图")));

  const overlapFilm = {
    question: "demo-test",
    scenes: [
      {
        turn: 0, title: "解剖场", view: "chest", layers: ["heart"], duration: 8,
        cues: [
          { kind: "text", at: [200, 60], text: "挡住标题", from: 0.4 },
          { kind: "text", at: [600, 820], text: "挡住误会卡", from: 1 },
          { kind: "myth", wrong: "错的", right: "对的", from: 2 },
          { kind: "label", at: "heart", text: "标签一", side: "right", from: 0.5 },
          { kind: "label", at: "heart", text: "标签二", side: "right", from: 0.8 }
        ]
      },
      baseScene(1), baseScene(2), baseScene(3)
    ]
  };
  const issues = filmProblems(overlapFilm, sampleQuestion);
  assert.ok(issues.some((msg) => msg.includes("场次标题")));
  assert.ok(issues.some((msg) => msg.includes("误会卡")));
  assert.ok(issues.some((msg) => msg.includes("叠在一起")));
});

test("new-question 生成的 9 个系统动画模板都符合规则", async () => {
  const { bodySystems } = await import("../src/data/questions/index.ts");
  for (const sys of bodySystems) {
    const { questionSnippet, filmSnippet } = buildTemplates({ system: sys.id, id: `tmpl-${sys.id}`, title: "为什么会这样？" });
    const q = Function(`return (${questionSnippet})`)();
    const f = Function(`return (${filmSnippet})`)();
    assert.deepEqual(filmProblems(f, q), [], sys.id);
  }
});

