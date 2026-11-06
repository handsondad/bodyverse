import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { bump, smooth } from "../../../lib/motion";
import { Labels, seeded, standard, type SceneLabel } from "./shared";

const columns = 5;
const rows = 3;
const spacingX = 0.95;
const spacingY = 0.62;
const spark = new THREE.Color("#ffd23f");

type Cell = { group: THREE.Group; x0: number; linked: number; unlinked: number; silent: boolean; material: THREE.MeshStandardMaterial };

function buildTissue() {
  const random = seeded(5);
  const root = new THREE.Group();
  root.position.x = 0.35;
  const capsule = new THREE.CapsuleGeometry(0.2, 0.5, 8, 20);
  capsule.rotateZ(Math.PI / 2);
  const nucleus = new THREE.SphereGeometry(0.075, 16, 12);
  const nucleusMat = standard("#7b4fa8");
  const cells: Cell[] = [];
  const width = (columns - 1) * spacingX + spacingX / 2;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x0 = column * spacingX + (row % 2) * (spacingX / 2) - width / 2;
      const material = standard("#ff8f9e", { emissive: spark, emissiveIntensity: 0 });
      const group = new THREE.Group();
      group.position.set(x0, (row - 1) * spacingY, 0);
      const body = new THREE.Mesh(capsule, material);
      const core = new THREE.Mesh(nucleus, nucleusMat);
      core.position.z = 0.15;
      group.add(body, core);
      root.add(group);
      const along = (x0 + width / 2) / width;
      cells.push({ group, x0, linked: 0.04 + 0.3 * along + 0.015 * row, unlinked: 0.05 + 0.5 * random(), silent: random() < 0.35, material });
    }
  }

  const discMat = standard("#ffd23f", { emissive: spark, emissiveIntensity: 0.2 });
  const discs: THREE.Mesh[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns - 1; column += 1) {
      const disc = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.3), discMat);
      disc.position.set((column + 0.5) * spacingX + (row % 2) * (spacingX / 2) - width / 2, (row - 1) * spacingY, 0);
      root.add(disc);
      discs.push(disc);
    }
  }

  const pacemaker = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), standard("#ffe27a", { emissive: spark, emissiveIntensity: 0 }));
  pacemaker.position.set(-width / 2 - 0.75, 0, 0);
  const wave = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 2.2),
    new THREE.MeshBasicMaterial({ color: spark, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  root.add(pacemaker, wave);

  const labels: SceneLabel[] = [
    { text: "起搏的地方", at: new THREE.Vector3(0, 0.32, 0), target: pacemaker },
    { text: "一个心肌细胞", at: new THREE.Vector3(0, 0.34, 0), target: cells[columns * 2 + 2].group },
    { text: "细胞之间的连接", at: new THREE.Vector3(0, -0.3, 0), target: discs[1] },
    { text: "电信号", at: new THREE.Vector3(0, 1.2, 0), target: wave }
  ];
  return { root, cells, discs, discMat, pacemaker, wave, width, labels };
}

export function TissueScene({ phaseRef, linked }: { phaseRef: MutableRefObject<number>; linked: boolean }) {
  const tissue = useMemo(buildTissue, []);

  useFrame(() => {
    const p = phaseRef.current;
    (tissue.pacemaker.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 * bump(p, 0.001, 0.03, 0.12);
    const waveMat = tissue.wave.material as THREE.MeshBasicMaterial;
    waveMat.opacity = linked ? 0.65 * bump(p, 0.02, 0.06, 0.38) : 0;
    tissue.wave.visible = waveMat.opacity > 0.02;
    tissue.wave.position.x = THREE.MathUtils.lerp(-tissue.width / 2 - 0.5, tissue.width / 2 + 0.4, smooth((p - 0.03) / 0.33));

    for (const cell of tissue.cells) {
      const arrival = linked ? cell.linked : cell.unlinked;
      const reached = linked || !cell.silent;
      const excite = reached ? bump(p, arrival, arrival + 0.03, arrival + 0.12) : 0;
      const squeeze = reached ? bump(p, arrival + 0.05, arrival + 0.2, arrival + 0.42) : 0;
      cell.material.emissiveIntensity = 0.9 * excite;
      cell.group.scale.set(1 - 0.2 * squeeze, 1 + 0.12 * squeeze, 1 + 0.12 * squeeze);
      cell.group.position.x = cell.x0 * (1 - 0.06 * squeeze);
    }
    for (const disc of tissue.discs) disc.scale.y = linked ? 1 : 0.35;
    tissue.discMat.color.set(linked ? "#ffd23f" : "#b9b1a8");
  });

  return (
    <>
      <primitive object={tissue.root} />
      <Labels items={tissue.labels} />
    </>
  );
}
