import assert from "node:assert/strict";
import { test } from "node:test";
import {
  breathFill, createBodyState, crossedBeat, exertionOf, guessFeedback, heartSqueeze, maxRunBpm, motionFor,
  phaseOf, pushHistory, restBpm, rhythmFeedback, speechFor, stepBody, tapBpm
} from "../src/lib/run-lab.ts";

function simulate(state, seconds, running) {
  let next = state;
  for (let t = 0; t < seconds; t += 0.05) next = stepBody(next, 0.05, running);
  return next;
}

test("running raises heart rate and breathing toward the teaching maximum", () => {
  const rested = createBodyState();
  assert.equal(rested.bpm, restBpm);
  const ran = simulate(rested, 15, true);
  assert.ok(ran.bpm > 140 && ran.bpm <= maxRunBpm, `bpm ${ran.bpm}`);
  assert.ok(ran.breaths > 35, `breaths ${ran.breaths}`);
  assert.ok(ran.effort > 0.99);
  assert.ok(ran.warmth > 0.9);
  assert.equal(motionFor(ran.effort).clip, "Run");
});

test("recovery is slower than the climb, so a recovery curve is visible", () => {
  const ran = simulate(createBodyState(), 15, true);
  const climbAfter3 = simulate(createBodyState(), 3, true).bpm - restBpm;
  const dropAfter3 = ran.bpm - simulate(ran, 3, false).bpm;
  assert.ok(dropAfter3 < climbAfter3, `drop ${dropAfter3} climb ${climbAfter3}`);
  const later = simulate(ran, 60, false);
  assert.ok(Math.abs(later.bpm - restBpm) < 2);
  assert.equal(later.peakBpm, ran.peakBpm);
});

test("phase and speech follow ready → running → recovering → rested", () => {
  const rested = createBodyState();
  assert.equal(phaseOf(rested, false), "ready");
  assert.match(speechFor(rested, false, "小豆"), /小豆/);
  const ran = simulate(rested, 10, true);
  assert.equal(phaseOf(ran, true), "running");
  assert.match(speechFor(ran, true, "小豆"), /好快/);
  const recovering = simulate(ran, 2, false);
  assert.equal(phaseOf(recovering, false), "recovering");
  assert.equal(phaseOf(simulate(ran, 60, false), false), "rested");
});

test("beat phase advances at the heart rate and wraps once per beat", () => {
  let state = { ...createBodyState(), bpm: 120 };
  let beats = 0;
  for (let i = 0; i < 100; i += 1) {
    const next = stepBody(state, 0.01, false);
    if (crossedBeat(state.beatPhase, next.beatPhase)) beats += 1;
    state = next;
  }
  assert.ok(beats >= 1 && beats <= 2);
});

test("large frame gaps are capped so a background tab does not jump the model", () => {
  const next = stepBody(createBodyState(), 30, true);
  assert.ok(next.bpm < restBpm + 10);
});

test("squeeze and breath curves stay in 0–1 with a lub-dub peak", () => {
  for (let p = 0; p <= 1; p += 0.01) {
    assert.ok(heartSqueeze(p) >= 0 && heartSqueeze(p) <= 1);
    assert.ok(breathFill(p) >= -1e-9 && breathFill(p) <= 1 + 1e-9);
  }
  assert.ok(heartSqueeze(0.06) > 0.95);
  assert.ok(heartSqueeze(0.26) > 0.5 && heartSqueeze(0.26) < 0.7);
  assert.ok(heartSqueeze(0.7) < 0.01);
  assert.ok(Math.abs(breathFill(0.4) - 1) < 1e-9);
});

test("motion picks idle, walk then run as effort rises", () => {
  assert.equal(motionFor(0).clip, "Idle");
  assert.equal(motionFor(0.3).clip, "Walk");
  assert.equal(motionFor(0.9).clip, "Run");
  assert.ok(motionFor(1).timeScale > motionFor(0.6).timeScale);
  assert.equal(exertionOf({ bpm: maxRunBpm }), 1);
  assert.equal(exertionOf({ bpm: 0 }), 0);
});

test("tap-along BPM needs four taps and restarts after a long pause", () => {
  assert.equal(tapBpm([0, 500, 1000]), null);
  assert.equal(tapBpm([0, 500, 1000, 1500]), 120);
  assert.equal(tapBpm([0, 500, 1000, 1500, 5000, 5400, 5800]), null);
  assert.equal(tapBpm([0, 500, 1000, 1500, 5000, 5400, 5800, 6200]), 150);
});

test("rhythm feedback tells the child which way to adjust", () => {
  assert.equal(rhythmFeedback(120, 124), "great");
  assert.equal(rhythmFeedback(105, 120), "close");
  assert.equal(rhythmFeedback(80, 140), "faster");
  assert.equal(rhythmFeedback(150, 100), "slower");
});

test("history keeps only the latest samples and guesses get kind feedback", () => {
  let history = [];
  for (let i = 0; i < 70; i += 1) history = pushHistory(history, i, 60);
  assert.equal(history.length, 60);
  assert.equal(history[0], 10);
  assert.match(guessFeedback("faster"), /猜对/);
  assert.match(guessFeedback("slower"), /没关系/);
});
