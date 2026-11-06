export const restBreathRate = 20;
export const runBreathRate = 40;
/** Teaching value: air moved per breath, fixed so the child compares only breathing speed. */
export const tidalVolumeLitres = 0.5;

export function ventilationPerMinute(rate: number): number {
  if (!Number.isInteger(rate) || rate < 10 || rate > 60) {
    throw new RangeError(`呼吸频率必须是 10–60 之间的整数，收到 ${rate}`);
  }
  return rate * tidalVolumeLitres;
}
