import { useEffect, useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { breath, clamp01, smooth, wrap01 } from "../../../lib/motion";
import { createRedCellGeometry, Labels, particleMaterial, seeded, standard, type SceneLabel } from "./shared";

const center = new THREE.Vector3(0.2, -0.1, 0);
const poor = new THREE.Color("#9c3566");
const rich = new THREE.Color("#e8283c");
const cellsPerVessel = 9;

/** How much oxygen blood has picked up by the time it is a fraction `t` along a capillary. */
function oxygenation(t: number, many: boolean) {
  return smooth((t - 0.28) / 0.35) * (many ? 1 : 0.3);
}

type Puff = { from: THREE.Vector3; to: THREE.Vector3; start: number };

function buildAlveoli() {
  const random = seeded(23);
  const root = new THREE.Group();
  const sac = standard("#ffb3c1", { transparent: true, opacity: 0.42, depthWrite: false });

  const bronchiole = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.4, 1.75, 0), new THREE.Vector3(-1.3, 1.05, 0), new THREE.Vector3(-0.45, 0.4, 0)
  ]), 24, 0.13, 12, false), standard("#f6d2cc", { transparent: true, opacity: 0.7 }));

  // Small sacs spread on a shell around the end of the airway, leaving the airway side open.
  const inward = new THREE.Vector3(-1, 1, 0).normalize();
  const smallSacs: THREE.Mesh[] = [];
  const total = 18;
  for (let k = 0; k < total; k += 1) {
    const y = 1 - (2 * (k + 0.5)) / total;
    const r = Math.sqrt(1 - y * y);
    const dir = new THREE.Vector3(Math.cos(k * 2.4) * r, y, Math.sin(k * 2.4) * r);
    if (dir.dot(inward) > 0.75) continue;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 16), sac);
    mesh.position.copy(center).addScaledVector(dir, 0.62);
    mesh.renderOrder = 2;
    smallSacs.push(mesh);
  }
  const bigSac = new THREE.Mesh(new THREE.SphereGeometry(0.98, 32, 24), sac);
  bigSac.position.copy(center);
  bigSac.renderOrder = 2;
  const sacs = new THREE.Group();
  sacs.add(...smallSacs);
  root.add(bronchiole, sacs, bigSac);

  // Capillaries hug the cluster: in at lower left, around the bottom, out at upper right.
  const vessels = [0.7, 0, -0.65].map((z) => {
    const radius = Math.sqrt(Math.max(0.35, 1.0 - z * z)) + 0.14;
    const points = [center.clone().add(new THREE.Vector3(-2.3, -1.35, z))];
    for (let j = 0; j <= 8; j += 1) {
      const angle = THREE.MathUtils.lerp(-2.5, 1.0, j / 8);
      points.push(center.clone().add(new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), z)));
    }
    points.push(center.clone().add(new THREE.Vector3(2.2, 1.4, z)));
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 80, 0.07, 8, false);
    geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 3), 3));
    const tube = new THREE.Mesh(geometry, standard("#ffffff", { vertexColors: true, transparent: true, opacity: 0.55 }));
    const cells = new THREE.InstancedMesh(createRedCellGeometry(), standard("#ffffff", { roughness: 0.4 }), cellsPerVessel);
    cells.frustumCulled = false;
    for (let i = 0; i < cellsPerVessel; i += 1) cells.setColorAt(i, poor);
    root.add(tube, cells);
    return { curve, tube, cells };
  });

  const insideSac = (many: boolean) => {
    const base = many ? smallSacs[Math.floor(random() * smallSacs.length)].position : center;
    return base.clone().add(new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).multiplyScalar(many ? 0.3 : 1));
  };
  const onVessel = (from: number, to: number) => vessels[Math.floor(random() * vessels.length)].curve.getPointAt(from + random() * (to - from));
  const makePuffs = (many: boolean) => ({
    oxygen: Array.from({ length: many ? 32 : 9 }, (): Puff => ({ from: insideSac(many), to: onVessel(0.3, 0.6), start: 0.2 + random() * 0.22 })),
    carbon: Array.from({ length: many ? 24 : 7 }, (): Puff => ({ from: onVessel(0.25, 0.55), to: insideSac(many), start: 0.55 + random() * 0.18 }))
  });
  const puffs = { true: makePuffs(true), false: makePuffs(false) };
  const oxygen = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 8, 6), particleMaterial("#8fe3ff"), 32);
  const carbon = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 8, 6), particleMaterial("#555a66"), 24);
  for (const mesh of [oxygen, carbon]) {
    mesh.frustumCulled = false;
    mesh.renderOrder = 3;
    root.add(mesh);
  }

  const labels: SceneLabel[] = [
    { text: "细支气管：空气从这里来", at: new THREE.Vector3(-1.75, 1.55, 0), target: root },
    { text: "肺泡", at: smallSacs[2].position.clone().add(new THREE.Vector3(0, 0.42, 0)), target: sacs },
    { text: "大泡", at: new THREE.Vector3(0, 1.1, 0), target: bigSac },
    { text: "缺氧的血流进来", at: vessels[0].curve.getPointAt(0.02).add(new THREE.Vector3(0, -0.25, 0)), target: root },
    { text: "毛细血管", at: vessels[0].curve.getPointAt(0.45).add(new THREE.Vector3(0, -0.25, 0.1)), target: root },
    { text: "带着氧气流出去", at: vessels[0].curve.getPointAt(0.97).add(new THREE.Vector3(0, 0.25, 0)), target: root }
  ];
  return { root, sacs, bigSac, vessels, puffs, oxygen, carbon, labels };
}

export function AlveoliScene({ phaseRef, many }: { phaseRef: MutableRefObject<number>; many: boolean }) {
  const scene = useMemo(buildAlveoli, []);
  const scratch = useMemo(() => ({ object: new THREE.Object3D(), color: new THREE.Color() }), []);

  useEffect(() => {
    scene.sacs.visible = many;
    scene.bigSac.visible = !many;
    for (const vessel of scene.vessels) {
      const colors = vessel.tube.geometry.attributes.color as THREE.BufferAttribute;
      const ring = 9;
      for (let i = 0; i < colors.count; i += 1) {
        scratch.color.copy(poor).lerp(rich, oxygenation(Math.floor(i / ring) / 80, many)).toArray(colors.array, i * 3);
      }
      colors.needsUpdate = true;
    }
  }, [many, scene, scratch]);

  useFrame(() => {
    const p = phaseRef.current;
    const swell = 1 + 0.06 * breath(p);
    scene.sacs.children.forEach((sac) => sac.scale.setScalar(swell));
    scene.bigSac.scale.setScalar(swell);

    for (const vessel of scene.vessels) {
      for (let i = 0; i < cellsPerVessel; i += 1) {
        const t = wrap01(i / cellsPerVessel + p);
        vessel.curve.getPointAt(t, scratch.object.position);
        scratch.object.rotation.set(i * 1.3 + p * 6, i * 0.7, 0);
        scratch.object.scale.setScalar(0.085);
        scratch.object.updateMatrix();
        vessel.cells.setMatrixAt(i, scratch.object.matrix);
        vessel.cells.setColorAt(i, scratch.color.copy(poor).lerp(rich, oxygenation(t, many)));
      }
      vessel.cells.instanceMatrix.needsUpdate = true;
      if (vessel.cells.instanceColor) vessel.cells.instanceColor.needsUpdate = true;
    }

    const set = scene.puffs[`${many}`];
    const place = (mesh: THREE.InstancedMesh, list: Puff[]) => {
      for (let i = 0; i < mesh.count; i += 1) {
        const puff = list[i];
        const s = puff ? clamp01((p - puff.start) / 0.2) : 0;
        if (puff) scratch.object.position.lerpVectors(puff.from, puff.to, smooth(s));
        scratch.object.rotation.set(0, 0, 0);
        scratch.object.scale.setScalar(puff && s > 0 && s < 1 ? 1 : 0);
        scratch.object.updateMatrix();
        mesh.setMatrixAt(i, scratch.object.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    };
    place(scene.oxygen, set.oxygen);
    place(scene.carbon, set.carbon);
  });

  return (
    <>
      <primitive object={scene.root} />
      <Labels items={scene.labels} />
    </>
  );
}
