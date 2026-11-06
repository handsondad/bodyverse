import assert from "node:assert/strict";
import { test } from "node:test";
import { heartNodes } from "../src/data/heart-exploration.ts";
import { depthLevels, heartStops } from "../src/data/journeys.ts";
import { lungNodes, lungStops } from "../src/data/lungs-journey.ts";
import { restBreathRate, runBreathRate, ventilationPerMinute } from "../src/lib/lung-model.ts";

const ladder = ["body", "organ", "tissue", "cell", "molecule"];
const journeys = [["heart", heartStops, heartNodes], ["lungs", lungStops, lungNodes]];

test("every journey walks the same five-scale ladder with a matching explanation per stop", () => {
  for (const [name, stops, nodes] of journeys) {
    assert.deepEqual(stops.map((stop) => stop.id), ladder, name);
    assert.deepEqual(nodes.map((node) => node.id), ladder, name);
  }
});

test("every explanation has text for all four depths, a question and an analogy limit", () => {
  for (const [name, , nodes] of journeys) {
    for (const node of nodes) {
      for (const level of depthLevels) assert.ok(node.text[level.tier]?.length > 10, `${name}/${node.id}/${level.tier}`);
      assert.ok(node.question.endsWith("？"), `${name}/${node.id} question`);
      assert.ok(node.analogyLimit.length > 10, `${name}/${node.id} analogy`);
      assert.ok(node.discipline.includes("·"), `${name}/${node.id} discipline`);
    }
  }
});

test("animated stops have ascending captions starting at zero and unique toggles", () => {
  for (const [name, stops] of journeys) {
    for (const stop of stops.filter((item) => item.id !== "body")) {
      const starts = stop.stages.map((stage) => stage.start);
      assert.equal(starts[0], 0, `${name}/${stop.id}`);
      starts.forEach((start, index) => index > 0 && assert.ok(start > starts[index - 1] && start < 1, `${name}/${stop.id}`));
      assert.ok(stop.durationSeconds > 0);
      const ids = stop.toggles.map((toggle) => toggle.id);
      assert.equal(new Set(ids).size, ids.length, `${name}/${stop.id} toggles`);
      for (const toggle of stop.toggles) assert.ok(toggle.whenOff.length > 10);
    }
  }
});

test("ventilation doubles when the breathing rate doubles and rejects impossible rates", () => {
  assert.equal(ventilationPerMinute(restBreathRate), 10);
  assert.equal(ventilationPerMinute(runBreathRate), 2 * ventilationPerMinute(restBreathRate));
  assert.throws(() => ventilationPerMinute(5), RangeError);
  assert.throws(() => ventilationPerMinute(20.5), RangeError);
});
