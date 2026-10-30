import type { PartId } from "../types/content";

// Object names follow the Blender naming convention in docs/18 so a future GLB can drop in.
export const bodyPartObjects: Readonly<Record<PartId, readonly string[]>> = {
  head: ["part_head"],
  heart: ["part_heart"],
  lungs: ["part_lungs"],
  stomach: ["part_stomach"],
  hand: ["part_hand_l", "part_hand_r"]
};

export function partFromObjectName(name: string): PartId | null {
  for (const [part, names] of Object.entries(bodyPartObjects) as Array<[PartId, readonly string[]]>) {
    if (names.includes(name)) return part;
  }
  return null;
}

// Pointer travel (px) above which a press is treated as a rotate drag, not a tap.
export const tapTolerancePx = 8;

// Organ centres inside the torso (body-local units). Body3D places organs here, and taps on
// empty torso space go to the nearest one so small fingers never tap "nothing".
export const torsoOrgans: ReadonlyArray<{ part: PartId; x: number; y: number }> = [
  { part: "lungs", x: -0.2, y: 0.3 },
  { part: "lungs", x: 0.2, y: 0.3 },
  { part: "heart", x: 0.06, y: 0.2 },
  { part: "stomach", x: 0.14, y: -0.24 }
];

export function nearestTorsoPart(x: number, y: number): PartId {
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw new RangeError("Torso point must be finite");
  let best = torsoOrgans[0];
  for (const organ of torsoOrgans) {
    if (Math.hypot(organ.x - x, organ.y - y) < Math.hypot(best.x - x, best.y - y)) best = organ;
  }
  return best.part;
}

export function isTap(pointerTravelPx: number): boolean {
  return Number.isFinite(pointerTravelPx) && pointerTravelPx <= tapTolerancePx;
}

export const breathPeriodSeconds = 3.5;

export function breathScale(elapsedSeconds: number): number {
  const phase = (elapsedSeconds / breathPeriodSeconds) * Math.PI * 2;
  return 1 + 0.07 * (1 - Math.cos(phase)) / 2;
}

export const popDurationSeconds = 0.5;

// Short "boing" when a part is chosen; settles back to 1.
export function selectPopScale(secondsSinceSelect: number): number {
  if (!(secondsSinceSelect >= 0) || secondsSinceSelect >= popDurationSeconds) return 1;
  return 1 + 0.22 * Math.sin((Math.PI * secondsSinceSelect) / popDurationSeconds);
}
