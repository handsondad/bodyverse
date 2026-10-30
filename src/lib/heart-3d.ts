// Keyframes mirror the CSS `heart-beat` animation so 2D and 3D beat identically.
const beatKeyframes: ReadonlyArray<readonly [phase: number, scale: number]> = [
  [0, 1],
  [0.25, 0.9],
  [0.5, 1.03],
  [1, 1]
];

export const minModelRate = 60;
export const maxModelRate = 140;

export function beatPeriodSeconds(rate: number): number {
  if (!Number.isFinite(rate) || rate < minModelRate || rate > maxModelRate) {
    throw new RangeError(`心率需在 ${minModelRate}–${maxModelRate} 次/分钟之间`);
  }
  return 60 / rate;
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

export function beatScale(elapsedSeconds: number, rate: number): number {
  const period = beatPeriodSeconds(rate);
  const phase = (((elapsedSeconds % period) + period) % period) / period;
  for (let i = 1; i < beatKeyframes.length; i += 1) {
    const [endPhase, endScale] = beatKeyframes[i];
    if (phase <= endPhase) {
      const [startPhase, startScale] = beatKeyframes[i - 1];
      const progress = smoothstep((phase - startPhase) / (endPhase - startPhase));
      return startScale + (endScale - startScale) * progress;
    }
  }
  return 1;
}

// Position (0–1) of a flowing blood dot along its vessel; flow speeds up with heart rate.
export function flowProgress(elapsedSeconds: number, rate: number, offset: number): number {
  const loopsPerSecond = rate / 60 / 4;
  const value = (elapsedSeconds * loopsPerSecond + offset) % 1;
  return value < 0 ? value + 1 : value;
}

export function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
