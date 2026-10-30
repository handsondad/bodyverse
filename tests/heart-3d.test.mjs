import assert from "node:assert/strict";
import { test } from "node:test";
import { beatPeriodSeconds, beatScale, canUseWebGL, flowProgress } from "../src/lib/heart-3d.ts";

test("3D beat period follows the model heart rate and rejects out-of-range rates", () => {
  assert.equal(beatPeriodSeconds(60), 1);
  assert.equal(beatPeriodSeconds(120), 0.5);
  for (const rate of [59, 141, NaN, Infinity]) {
    assert.throws(() => beatPeriodSeconds(rate));
  }
});

test("3D beat matches the CSS keyframes: rest, squeeze, rebound, rest", () => {
  const rate = 60;
  assert.equal(beatScale(0, rate), 1);
  assert.ok(Math.abs(beatScale(0.25, rate) - 0.9) < 1e-9);
  assert.ok(Math.abs(beatScale(0.5, rate) - 1.03) < 1e-9);
  assert.ok(Math.abs(beatScale(1, rate) - 1) < 1e-9);
  assert.ok(Math.abs(beatScale(1.25, rate) - beatScale(0.25, rate)) < 1e-9);
  for (let t = 0; t < 2; t += 0.01) {
    const scale = beatScale(t, 140);
    assert.ok(scale >= 0.9 - 1e-9 && scale <= 1.03 + 1e-9);
  }
});

test("faster heart rate squeezes sooner", () => {
  assert.ok(Math.abs(beatScale(0.125, 120) - 0.9) < 1e-9);
  assert.ok(beatScale(0.125, 60) > 0.9);
});

test("blood dots stay on their vessel and move faster at higher rates", () => {
  for (let t = 0; t < 10; t += 0.37) {
    const p = flowProgress(t, 140, 0.75);
    assert.ok(p >= 0 && p < 1);
  }
  assert.ok(flowProgress(0.5, 120, 0) > flowProgress(0.5, 60, 0));
});

test("WebGL detection safely reports unsupported outside the browser", () => {
  assert.equal(canUseWebGL(), false);
});
