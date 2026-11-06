import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { smooth } from "../../../lib/motion";
import { Labels, standard, type SceneLabel } from "./shared";

const actinY = 0.45;
const actinLength = 1.5;
const restHalfLength = 2.05;
const slideDistance = 0.4;
const cocked = 0.55;
const stroked = -0.45;
const neckLength = 0.33;

type Head = { group: THREE.Group; side: 1 | -1; lag: number };

function buildSarcomere() {
  const root = new THREE.Group();
  const thick = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2, 16), standard("#d94b6a"));
  thick.rotation.z = Math.PI / 2;
  root.add(thick);

  const beadGeometry = new THREE.SphereGeometry(0.052, 12, 8);
  const actinMat = standard("#f2b84b");
  const tropoMat = standard("#36b3a4");
  const ionMat = standard("#2f8cff", { emissive: new THREE.Color("#2f8cff"), emissiveIntensity: 0.7 });
  const ionGeometry = new THREE.SphereGeometry(0.035, 10, 8);
  const ions: THREE.Mesh[] = [];
  const tropomyosins: THREE.Mesh[] = [];
  const zMat = standard("#6a3a9a");
  // Each half: a Z line with its thin filaments pointing toward the middle.
  const halves = ([-1, 1] as const).map((side) => {
    const half = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.5, 0.5), zMat);
    half.add(disc);
    const filaments = [actinY, -actinY].map((y) => {
      const filament = new THREE.Group();
      filament.position.y = y;
      for (let k = 0; k < 15; k += 1) {
        for (const twist of [0, Math.PI]) {
          const bead = new THREE.Mesh(beadGeometry, actinMat);
          bead.position.set(-side * (0.06 + k * 0.1), 0.028 * Math.sin(k * 0.9 + twist), 0.028 * Math.cos(k * 0.9 + twist));
          filament.add(bead);
        }
      }
      const tropo = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, actinLength, 6), tropoMat);
      tropo.rotation.z = Math.PI / 2;
      tropo.position.set(-side * actinLength / 2, Math.sign(y) * 0.06, 0.03);
      filament.add(tropo);
      tropomyosins.push(tropo);
      for (let k = 0; k < 4; k += 1) {
        const ion = new THREE.Mesh(ionGeometry, ionMat);
        ion.position.set(-side * (0.3 + k * 0.33), Math.sign(y) * 0.1, 0.08);
        filament.add(ion);
        ions.push(ion);
      }
      half.add(filament);
      return filament;
    });
    root.add(half);
    return { half, side, disc, filaments };
  });

  const neckGeometry = new THREE.CylinderGeometry(0.022, 0.022, neckLength, 8);
  neckGeometry.translate(0, neckLength / 2, 0);
  const headGeometry = new THREE.SphereGeometry(0.068, 14, 10);
  const headMat = standard("#ff8a5c");
  const heads: Head[] = [];
  for (const side of [-1, 1] as const) {
    for (let k = 0; k < 4; k += 1) {
      for (const up of [true, false]) {
        const group = new THREE.Group();
        group.position.set(side * (0.25 + k * 0.2), up ? 0.08 : -0.08, 0);
        if (!up) group.rotation.x = Math.PI;
        const neck = new THREE.Mesh(neckGeometry, headMat);
        const ball = new THREE.Mesh(headGeometry, headMat);
        ball.position.y = neckLength + 0.03;
        group.add(neck, ball);
        root.add(group);
        heads.push({ group, side, lag: (k % 3) * 0.02 });
      }
    }
  }

  const atpMat = new THREE.MeshBasicMaterial({ color: "#ffe14d" });
  const atps = heads.filter((_, i) => i % 2 === 0).map((head) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), atpMat);
    const target = head.group.position.clone().add(new THREE.Vector3(0, Math.sign(head.group.position.y) * 0.3, 0.05));
    const start = target.clone().add(new THREE.Vector3(head.side * 0.3, Math.sign(target.y) * 0.9, 0.4));
    root.add(mesh);
    return { mesh, start, target };
  });

  const labels: SceneLabel[] = [
    { text: "Z 线", at: new THREE.Vector3(0, 0.95, 0), target: halves[0].disc },
    { text: "肌动蛋白（细丝）", at: new THREE.Vector3(0.6, -0.24, 0), target: halves[0].filaments[1] },
    { text: "肌球蛋白（粗丝）", at: new THREE.Vector3(0, 0, 0.25), target: null },
    { text: "肌球蛋白头", at: new THREE.Vector3(0, neckLength + 0.2, 0.1), target: heads[11].group },
    { text: "钙离子", at: new THREE.Vector3(0, 0.16, 0.1), target: ions[9] }
  ];
  return { root, halves, heads, atps, ions, tropomyosins, labels };
}

export function MoleculeScene({ phaseRef, atp }: { phaseRef: MutableRefObject<number>; atp: boolean }) {
  const sarcomere = useMemo(buildSarcomere, []);

  useFrame(() => {
    const p = phaseRef.current;
    const calcium = atp ? smooth(p / 0.1) * (1 - smooth((p - 0.8) / 0.12)) : 1;
    const slide = atp ? smooth((p - 0.35) / 0.23) * (1 - smooth((p - 0.8) / 0.18)) : 1;
    const halfLength = restHalfLength - slideDistance * slide;
    for (const { half, side } of sarcomere.halves) half.position.x = side * halfLength;
    for (const ion of sarcomere.ions) ion.scale.setScalar(calcium);
    for (const tropo of sarcomere.tropomyosins) tropo.position.z = 0.03 + 0.04 * calcium;

    for (const head of sarcomere.heads) {
      const q = p - head.lag;
      const attached = atp ? smooth((q - 0.15) / 0.15) * (1 - smooth((q - 0.58) / 0.08)) : 1;
      const swing = atp ? smooth((q - 0.35) / 0.2) * (1 - smooth((q - 0.62) / 0.15)) : 1;
      head.group.rotation.z = -head.side * THREE.MathUtils.lerp(cocked, stroked, swing);
      head.group.scale.setScalar(0.8 + 0.2 * attached);
    }

    const arriving = smooth((p - 0.5) / 0.1);
    for (const particle of sarcomere.atps) {
      particle.mesh.visible = atp && p > 0.5 && p < 0.72;
      particle.mesh.position.lerpVectors(particle.start, particle.target, arriving);
      particle.mesh.scale.setScalar(p > 0.64 ? 1.6 - (p - 0.64) * 10 : 1);
    }
  });

  return (
    <>
      <primitive object={sarcomere.root} />
      <Labels items={sarcomere.labels} />
    </>
  );
}
