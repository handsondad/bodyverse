import assert from "node:assert/strict";
import { test } from "node:test";
import { bodyPartObjects, breathScale, isTap, nearestTorsoPart, partFromObjectName, selectPopScale, torsoOrgans } from "../src/lib/body-3d.ts";

test("every body part maps to named 3D objects and back", () => {
  assert.deepEqual(Object.keys(bodyPartObjects).sort(), ["hand", "head", "heart", "lungs", "stomach"]);
  for (const [part, names] of Object.entries(bodyPartObjects)) {
    assert.ok(names.length > 0);
    for (const name of names) assert.equal(partFromObjectName(name), part);
  }
  assert.equal(partFromObjectName("part_hand_l"), "hand");
  assert.equal(partFromObjectName("part_hand_r"), "hand");
  assert.equal(partFromObjectName("shirt"), null);
  assert.equal(partFromObjectName(""), null);
});

test("short presses select, rotate drags do not", () => {
  assert.equal(isTap(0), true);
  assert.equal(isTap(8), true);
  assert.equal(isTap(9), false);
  assert.equal(isTap(NaN), false);
});

test("breathing stays gentle and returns to rest each cycle", () => {
  assert.equal(breathScale(0), 1);
  assert.ok(Math.abs(breathScale(3.5) - 1) < 1e-9);
  assert.ok(Math.abs(breathScale(1.75) - 1.07) < 1e-9);
  for (let t = 0; t < 10; t += 0.1) {
    const scale = breathScale(t);
    assert.ok(scale >= 1 - 1e-9 && scale <= 1.07 + 1e-9);
  }
});

test("taps on empty torso space go to the nearest organ", () => {
  for (const organ of torsoOrgans) assert.equal(nearestTorsoPart(organ.x, organ.y), organ.part);
  assert.equal(nearestTorsoPart(-0.4, 0.6), "lungs");
  assert.equal(nearestTorsoPart(0.4, 0.6), "lungs");
  assert.equal(nearestTorsoPart(0.05, 0.12), "heart");
  assert.equal(nearestTorsoPart(-0.35, -0.55), "stomach");
  assert.equal(nearestTorsoPart(0.3, -0.6), "stomach");
  assert.throws(() => nearestTorsoPart(NaN, 0), RangeError);
  assert.throws(() => nearestTorsoPart(0, Infinity), RangeError);
});

test("selection pop is brief and settles to normal size", () => {
  assert.equal(selectPopScale(0), 1);
  assert.ok(selectPopScale(0.25) > 1.2);
  assert.equal(selectPopScale(0.5), 1);
  assert.equal(selectPopScale(5), 1);
  assert.equal(selectPopScale(-1), 1);
  assert.equal(selectPopScale(-Infinity), 1);
  assert.equal(selectPopScale(Infinity), 1);
});
