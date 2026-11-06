import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { clamp01, smooth, TAU, wrap01 } from "../../../lib/motion";
import { createRedCellGeometry, Labels, particleMaterial, seeded, standard, type SceneLabel } from "./shared";

const poor = new THREE.Color("#9c3566");
const rich = new THREE.Color("#e8283c");
const height = 3.8;
const capillaryRadius = 0.85;
const wallWidth = (thin: boolean) => (thin ? 0.16 : 0.6);

type Mover = {
  group: THREE.Group;
  from: THREE.Vector3;
  to: THREE.Vector3;
  start: number;
  rank: number;
  extra: boolean;
};

function buildExchange() {
  const random = seeded(37);
  const root = new THREE.Group();
  root.position.x = -0.35;

  const air = new THREE.Mesh(new THREE.BoxGeometry(2.4, height, 1.2), new THREE.MeshBasicMaterial({ color: "#bfe9ff", transparent: true, opacity: 0.08, depthWrite: false }));
  air.position.x = -1.55;
  const wall = new THREE.Group();
  const outer = new THREE.Mesh(new THREE.BoxGeometry(1, height, 1.2), standard("#f7a1b5", { transparent: true, opacity: 0.85 }));
  const middle = new THREE.Mesh(new THREE.BoxGeometry(0.35, height * 0.999, 1.21), standard("#e9849b"));
  wall.add(outer, middle);
  const capillary = new THREE.Mesh(new THREE.CylinderGeometry(capillaryRadius, capillaryRadius, height, 36, 1, true),
    standard("#ff6b7f", { transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }));
  root.add(air, wall, capillary);

  const discGeometry = createRedCellGeometry();
  const cells = Array.from({ length: 3 }, () => {
    const cell = new THREE.Group();
    const disc = new THREE.Mesh(discGeometry, standard("#9c3566", { roughness: 0.4 }));
    disc.scale.setScalar(0.42);
    disc.rotation.x = Math.PI / 2.4;
    cell.add(disc);
    root.add(cell);
    return { cell, material: disc.material as THREE.MeshStandardMaterial };
  });

  const oxygenAtom = new THREE.SphereGeometry(0.07, 14, 10);
  const carbonAtom = new THREE.SphereGeometry(0.08, 14, 10);
  const oxygenMat = particleMaterial("#8fe3ff");
  const carbonMat = standard("#555a66");
  const makeO2 = () => {
    const group = new THREE.Group();
    for (const dx of [-0.065, 0.065]) {
      const atom = new THREE.Mesh(oxygenAtom, oxygenMat);
      atom.position.x = dx;
      group.add(atom);
    }
    return group;
  };
  const makeCO2 = () => {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(carbonAtom, carbonMat));
    for (const dx of [-0.13, 0.13]) {
      const atom = new THREE.Mesh(oxygenAtom, oxygenMat);
      atom.position.x = dx;
      atom.scale.setScalar(0.9);
      group.add(atom);
    }
    return group;
  };
  const airPoint = () => new THREE.Vector3(-2.6 + random() * 2.1, (random() - 0.5) * (height - 0.5), (random() - 0.5) * 0.8);
  const bloodPoint = () => new THREE.Vector3((random() - 0.5) * 1.1, (random() - 0.5) * (height - 0.5), (random() - 0.5) * 0.8);

  // Blood positions are stored relative to the capillary centre, which moves when the wall thickens.
  const oxygen: Mover[] = Array.from({ length: 30 }, (_, i) => ({
    group: makeO2(), from: airPoint(), to: bloodPoint(), start: 0.05 + random() * 0.45, rank: i === 0 ? 0.99 : random(), extra: false
  }));
  const carbon: Mover[] = [
    ...Array.from({ length: 16 }, (_, i) => ({ group: makeCO2(), from: bloodPoint(), to: airPoint(), start: 0.38 + random() * 0.3, rank: i === 0 ? 0 : random(), extra: false })),
    ...Array.from({ length: 10 }, () => ({ group: makeCO2(), from: airPoint(), to: airPoint(), start: 0, rank: 1, extra: true }))
  ];
  for (const mover of [...oxygen, ...carbon]) root.add(mover.group);

  const labels: SceneLabel[] = [
    { text: "肺泡里：氧气多", at: new THREE.Vector3(-1.55, height / 2 + 0.3, 0), target: root },
    { text: "很薄的墙", at: new THREE.Vector3(0, height / 2 + 0.3, 0), target: wall },
    { text: "血液里：氧气少", at: new THREE.Vector3(0, height / 2 + 0.3, 0), target: capillary },
    { text: "红细胞", at: new THREE.Vector3(0.5, 0.3, 0), target: cells[1].cell },
    { text: "氧气 O₂", at: new THREE.Vector3(0, 0.2, 0), target: oxygen[0].group },
    { text: "二氧化碳 CO₂", at: new THREE.Vector3(0, 0.22, 0), target: carbon[0].group }
  ];
  return { root, wall, capillary, cells, oxygen, carbon, labels };
}

export function ExchangeScene({ phaseRef, fresh, thin }: { phaseRef: MutableRefObject<number>; fresh: boolean; thin: boolean }) {
  const scene = useMemo(buildExchange, []);
  const scratch = useMemo(() => ({ entry: new THREE.Vector3(), exit: new THREE.Vector3(), to: new THREE.Vector3(), from: new THREE.Vector3() }), []);

  useFrame(() => {
    const p = phaseRef.current;
    const w = wallWidth(thin);
    const bloodX = w / 2 + capillaryRadius;
    scene.wall.scale.x = w;
    scene.capillary.position.x = bloodX;
    const efficiency = (thin ? 1 : 0.45) * (fresh ? 1 : 0.3);
    const crossTime = thin ? 0.22 : 0.42;
    const fadeOut = 1 - smooth((p - 0.9) / 0.1);
    const fadeIn = smooth(p / 0.04);

    scene.cells.forEach(({ cell, material }, k) => {
      const travel = wrap01(p + k / 3);
      cell.position.set(bloodX + 0.12 * Math.sin(TAU * travel + k), height / 2 - 0.2 - travel * (height - 0.4), 0.1 * k - 0.1);
      material.color.copy(poor).lerp(rich, smooth(travel / 0.8) * efficiency);
    });

    const move = (list: Mover[], towardBlood: boolean, chance: number) => {
      list.forEach((mover, i) => {
        const present = mover.extra ? !fresh : fresh || !towardBlood || i < list.length * 0.4;
        mover.group.visible = present;
        if (!present) return;
        const jitter = 0.05;
        const wobbleX = jitter * Math.sin(TAU * 3 * p + i);
        const wobbleY = jitter * Math.cos(TAU * 2 * p + i * 1.7);
        mover.group.rotation.set(i, 0, i + TAU * 2 * p);
        // Positions on the blood side follow the capillary as the wall changes thickness.
        scratch.from.copy(mover.from);
        scratch.to.copy(mover.to);
        if (towardBlood) scratch.to.x += bloodX;
        else if (!mover.extra) scratch.from.x += bloodX;
        const crosses = !mover.extra && mover.rank < chance;
        if (!crosses) {
          mover.group.position.set(scratch.from.x + wobbleX, scratch.from.y + wobbleY, scratch.from.z);
          mover.group.scale.setScalar(1);
          return;
        }
        const s = clamp01((p - mover.start) / crossTime);
        const y = scratch.from.y * 0.6 + scratch.to.y * 0.4;
        scratch.entry.set(towardBlood ? -w / 2 : w / 2, y, scratch.from.z);
        scratch.exit.set(towardBlood ? w / 2 : -w / 2, y, scratch.from.z);
        const position = mover.group.position;
        if (s < 0.4) position.lerpVectors(scratch.from, scratch.entry, smooth(s / 0.4));
        else if (s < 0.7) position.lerpVectors(scratch.entry, scratch.exit, (s - 0.4) / 0.3);
        else position.lerpVectors(scratch.exit, scratch.to, smooth((s - 0.7) / 0.3));
        if (s < 0.4 || s >= 1) position.x += wobbleX;
        position.y += s < 0.4 || s >= 1 ? wobbleY : 0;
        mover.group.scale.setScalar(Math.max(0.001, Math.min(fadeIn, s > 0.5 ? fadeOut : 1)));
      });
    };
    move(scene.oxygen, true, (thin ? 0.8 : 0.35) * (fresh ? 1 : 0.4));
    move(scene.carbon, false, (thin ? 0.8 : 0.35) * (fresh ? 1 : 0.5));
  });

  return (
    <>
      <primitive object={scene.root} />
      <Labels items={scene.labels} />
    </>
  );
}
