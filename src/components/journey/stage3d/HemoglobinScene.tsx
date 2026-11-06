import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { bump, smooth, TAU } from "../../../lib/motion";
import { Labels, particleMaterial, seeded, standard, type SceneLabel } from "./shared";

type Point = [number, number, number];

const empty = new THREE.Color("#5a2a5e");
const withOxygen = new THREE.Color("#ff3344");
const withCO = new THREE.Color("#ff8fb0");
// The first oxygen takes longest to bind; once the shape shifts, the rest follow quickly.
const bindWindows: Array<[number, number]> = [[0.02, 0.15], [0.17, 0.24], [0.2, 0.27], [0.23, 0.3]];
const releaseWindows: Array<[number, number]> = [[0.66, 0.76], [0.69, 0.79], [0.72, 0.82], [0.75, 0.85]];

function createBlobGeometry(seed: number) {
  const geometry = new THREE.SphereGeometry(0.6, 36, 26);
  const position = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < position.count; i += 1) {
    v.fromBufferAttribute(position, i);
    const n = 1 + 0.07 * Math.sin(3.1 * v.x + seed) * Math.sin(4.3 * v.y + seed * 2) + 0.05 * Math.cos(5.2 * v.z + seed);
    v.multiplyScalar(n);
    position.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function buildHemoglobin() {
  const random = seeded(41);
  const root = new THREE.Group();
  const dimers = [new THREE.Group(), new THREE.Group()];
  root.add(...dimers);

  const chainSpecs: Array<{ at: Point; color: string; dimer: number; name: string }> = [
    { at: [-0.5, 0.48, 0.28], color: "#f08a9a", dimer: 0, name: "α" },
    { at: [0.5, 0.48, -0.28], color: "#a98bea", dimer: 0, name: "β" },
    { at: [0.5, -0.48, 0.28], color: "#f08a9a", dimer: 1, name: "α" },
    { at: [-0.5, -0.48, -0.28], color: "#a98bea", dimer: 1, name: "β" }
  ];
  const hemeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 24);
  const ironGeometry = new THREE.SphereGeometry(0.065, 14, 10);
  const ironMat = standard("#c98a4b", { metalness: 0.4 });
  const seats = chainSpecs.map((spec, k) => {
    const chain = new THREE.Mesh(createBlobGeometry(k * 1.7), standard(spec.color, { roughness: 0.7 }));
    chain.position.set(...spec.at);
    dimers[spec.dimer].add(chain);
    const dir = new THREE.Vector3(spec.at[0], spec.at[1], 0).normalize().multiplyScalar(0.75).add(new THREE.Vector3(0, 0, 0.85)).normalize();
    const material = standard("#5a2a5e", { emissive: "#ff2030", emissiveIntensity: 0 });
    const heme = new THREE.Mesh(hemeGeometry, material);
    heme.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    heme.position.copy(chain.position).addScaledVector(dir, 0.56);
    heme.add(new THREE.Mesh(ironGeometry, ironMat));
    dimers[spec.dimer].add(heme);
    const seat = new THREE.Object3D();
    seat.position.set(0, 0.16, 0);
    heme.add(seat);
    return { heme, seat, material, dir };
  });

  const oxygenAtom = new THREE.SphereGeometry(0.085, 14, 10);
  const oxygenMat = particleMaterial("#8fe3ff");
  const carbonMat = standard("#555a66");
  const makeO2 = () => {
    const group = new THREE.Group();
    for (const dx of [-0.08, 0.08]) {
      const atom = new THREE.Mesh(oxygenAtom, oxygenMat);
      atom.position.x = dx;
      group.add(atom);
    }
    return group;
  };
  const oxygen = seats.map(({ dir }, k) => {
    const group = makeO2();
    root.add(group);
    return {
      group,
      from: dir.clone().multiplyScalar(2.3).add(new THREE.Vector3((random() - 0.5) * 0.6, (random() - 0.5) * 0.6, 0)),
      to: dir.clone().multiplyScalar(2.5).add(new THREE.Vector3(k % 2 ? 0.6 : -0.6, -0.7, 0.4))
    };
  });

  // Carbon monoxide: one carbon and one oxygen, parked on three of the four seats.
  const monoxide = seats.slice(1).map(({ seat }) => {
    const group = new THREE.Group();
    const carbon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), carbonMat);
    const atom = new THREE.Mesh(oxygenAtom, oxygenMat);
    atom.position.y = 0.16;
    group.add(carbon, atom);
    group.position.y = 0.04;
    seat.add(group);
    return group;
  });

  // The working-muscle surroundings: extra CO₂ and acid (H⁺) drift in, and it gets warmer.
  const surroundings = new THREE.Group();
  const drifting = Array.from({ length: 16 }, (_, i) => {
    const acid = i % 2 === 0;
    const mesh = acid
      ? new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), particleMaterial("#ffe14d"))
      : (() => {
        const group = new THREE.Group();
        group.add(new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), carbonMat));
        for (const dx of [-0.13, 0.13]) {
          const atom = new THREE.Mesh(oxygenAtom, oxygenMat);
          atom.position.x = dx;
          atom.scale.setScalar(0.8);
          group.add(atom);
        }
        return group;
      })();
    const angle = (i / 16) * TAU;
    const far = new THREE.Vector3(Math.cos(angle) * 3.4, Math.sin(angle) * 2.2, (random() - 0.5) * 1.2);
    const near = far.clone().multiplyScalar(0.5 + random() * 0.12);
    surroundings.add(mesh);
    return { mesh, far, near };
  });
  const warmth = new THREE.PointLight("#ff9a3c", 0, 6);
  warmth.position.set(0, 0.5, 2.2);
  root.add(surroundings, warmth);

  const labels: SceneLabel[] = [
    { text: "血红蛋白：4 条链", at: new THREE.Vector3(0, 1.45, 0), target: root },
    { text: "血红素：含铁的“座位”", at: new THREE.Vector3(0, 0.3, 0), target: seats[0].heme },
    { text: "氧气 O₂", at: new THREE.Vector3(0, 0.22, 0), target: oxygen[0].group },
    { text: "一氧化碳：占座不走", at: new THREE.Vector3(0, 0.45, 0), target: monoxide[1] },
    { text: "肌肉里：二氧化碳多、更热", at: new THREE.Vector3(0, -1.7, 0.4), target: surroundings }
  ];
  return { root, dimers, seats, oxygen, monoxide, surroundings, drifting, warmth, labels };
}

export function HemoglobinScene({ phaseRef, noCO }: { phaseRef: MutableRefObject<number>; noCO: boolean }) {
  const scene = useMemo(buildHemoglobin, []);
  const seatPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = phaseRef.current;
    const poisoned = !noCO;
    const fade = Math.min(smooth(p / 0.03), 1 - smooth((p - 0.92) / 0.08));

    const bound = scene.oxygen.map((_, k) => {
      const [b0, b1] = bindWindows[k];
      const [r0, r1] = releaseWindows[k];
      const blocked = poisoned && k > 0;
      const on = blocked ? 0 : smooth((p - b0) / (b1 - b0));
      const off = blocked ? 0 : smooth((p - r0) / (r1 - r0));
      return { on, off, blocked, b0, b1, level: blocked ? 1 : on * (1 - off) };
    });
    const relaxed = bound.reduce((sum, item) => sum + item.level, 0) / bound.length;
    scene.dimers[0].rotation.z = 0.12 * relaxed;
    scene.dimers[1].rotation.z = -0.12 * relaxed;
    scene.dimers[0].position.y = 0.04 * relaxed;
    scene.root.updateMatrixWorld();

    scene.oxygen.forEach((o2, k) => {
      const { on, off, blocked, b0, b1 } = bound[k];
      scene.seats[k].seat.getWorldPosition(seatPoint);
      const position = o2.group.position;
      if (blocked) {
        // Tries to sit down, finds the seat taken, drifts back.
        position.lerpVectors(o2.from, seatPoint, 0.6 * bump(p, b0, b1, Math.min(0.99, b1 + 0.12)));
      } else if (off > 0) {
        position.lerpVectors(seatPoint, o2.to, off);
      } else {
        position.lerpVectors(o2.from, seatPoint, on);
      }
      if (on < 1 || off > 0 || blocked) {
        position.x += 0.05 * Math.sin(TAU * 3 * p + k);
        position.y += 0.05 * Math.cos(TAU * 2 * p + k * 1.3);
      }
      o2.group.rotation.set(k, 0, k + TAU * p * 2);
      o2.group.scale.setScalar(Math.max(0.001, blocked || (on > 0 && off < 1) ? 1 : fade));

      const seat = scene.seats[k];
      const coOnSeat = poisoned && k > 0;
      seat.material.color.copy(empty).lerp(coOnSeat ? withCO : withOxygen, coOnSeat ? 1 : on * (1 - off));
      seat.material.emissiveIntensity = coOnSeat ? 0.15 : 0.35 * on * (1 - off);
    });
    scene.monoxide.forEach((group) => { group.visible = poisoned; });

    const muscle = bump(p, 0.5, 0.66, 0.93);
    scene.surroundings.visible = muscle > 0.02;
    scene.drifting.forEach(({ mesh, far, near }, i) => {
      mesh.position.lerpVectors(far, near, smooth(muscle));
      mesh.position.y += 0.04 * Math.sin(TAU * 2 * p + i);
      mesh.rotation.z = i + TAU * p;
    });
    scene.warmth.intensity = 3 * muscle;
  });

  return (
    <>
      <primitive object={scene.root} />
      <Labels items={scene.labels} />
    </>
  );
}
