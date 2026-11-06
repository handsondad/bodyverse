import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { breath, clamp01, smooth } from "../../../lib/motion";
import { Labels, particleMaterial, seeded, standard, type SceneLabel } from "./shared";

type Point = [number, number, number];

const freshAir = new THREE.Color("#8fe3ff");
const usedAir = new THREE.Color("#b7a9c9");
const carina: Point = [0, 0.95, 0];

// A lung is a squashed sphere with a flatter inner side, resting on the diaphragm.
function createLungGeometry(side: 1 | -1) {
  const geometry = new THREE.SphereGeometry(1, 40, 28);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    let x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    if (x * side < 0) x *= 0.45;
    const taper = y > 0 ? 1 - 0.35 * y * y : 1;
    position.setXYZ(i, x * 0.82 * taper, y * 1.12 + (y < -0.6 ? (y + 0.6) * -0.35 : 0), z * 0.68 * taper);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function tube(points: Point[], radius: number, material: THREE.Material) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 12, false), material);
}

function buildLungs() {
  const random = seeded(11);
  const root = new THREE.Group();
  root.position.y = -0.1;
  const airway = standard("#f6d2cc");

  const trachea = tube([[0, 2.25, 0], [0, 1.6, 0], carina], 0.11, airway);
  root.add(trachea);
  for (let k = 0; k < 7; k += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.018, 8, 24), standard("#fff4e8"));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 2.1 - k * 0.16, 0);
    root.add(ring);
  }

  const lungs = ([-1, 1] as const).map((side) => {
    const mesh = new THREE.Mesh(createLungGeometry(side), standard("#ff9fb3", { transparent: true, opacity: 0.6, depthWrite: false }));
    mesh.position.set(side * 0.78, 0, 0);
    mesh.renderOrder = 2;
    root.add(mesh);
    // Bronchi branch into each lung so children see the "upside-down tree".
    const main: Point = [side * 0.5, 0.55, 0];
    root.add(tube([carina, main], 0.075, airway));
    for (const [dx, dy] of [[0.25, 0.45], [0.35, -0.1], [0.2, -0.65]]) {
      const end: Point = [side * (0.5 + dx), 0.55 + dy - 0.35, 0.05];
      root.add(tube([main, [side * (0.55 + dx * 0.5), 0.5 + dy * 0.4, 0], end], 0.04, airway));
    }
    return mesh;
  });

  const ribs = Array.from({ length: 6 }, (_, k) => {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(1, 0.03, 8, 48), standard("#f5ecd8", { transparent: true, opacity: 0.2, depthWrite: false }));
    rib.rotation.x = Math.PI / 2 + 0.25;
    rib.position.y = 1.05 - k * 0.32;
    const width = 1.15 + 0.35 * Math.sin(((k + 1) / 7) * Math.PI);
    rib.scale.set(width, 0.62 * width, 1);
    rib.userData.width = width;
    root.add(rib);
    return rib;
  });

  const diaphragm = new THREE.Mesh(new THREE.SphereGeometry(1.7, 40, 16, 0, Math.PI * 2, 0, 0.85), standard("#d9604f", { side: THREE.DoubleSide }));
  diaphragm.scale.set(1.25, 0.7, 0.62);
  diaphragm.position.y = -2.25;
  root.add(diaphragm);

  // Each air puff follows its own path from the mouth down the trachea into one lung.
  const count = 70;
  const paths = Array.from({ length: count }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    const target: Point = [side * (0.4 + random() * 0.85), -0.8 + random() * 1.5, (random() - 0.5) * 0.6];
    const main: Point = [side * 0.45, 0.55, 0];
    return {
      curve: new THREE.CatmullRomCurve3([[0, 2.75, 0.2], [0, 2.25, 0], carina, main, target].map((p) => new THREE.Vector3(...(p as Point)))),
      delay: random() * 0.35
    };
  });
  const airMaterial = particleMaterial(freshAir);
  const air = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 8, 6), airMaterial, count);
  air.frustumCulled = false;
  air.renderOrder = 3;
  root.add(air);

  const labels: SceneLabel[] = [
    { text: "气管", at: new THREE.Vector3(0.32, 1.75, 0), target: root },
    { text: "右肺", at: new THREE.Vector3(-1.05, 0.55, 0.3), target: root },
    { text: "左肺", at: new THREE.Vector3(1.05, 0.55, 0.3), target: root },
    { text: "支气管：像倒过来的树", at: new THREE.Vector3(0, 0.62, 0.3), target: root },
    { text: "膈肌：吸气时往下拉", at: new THREE.Vector3(0, 1.25, 0.9), target: diaphragm },
    { text: "肋骨", at: new THREE.Vector3(1.55, 0.4, 0), target: root }
  ];
  return { root, lungs, ribs, diaphragm, paths, air, airMaterial, labels };
}

export function LungsScene({ phaseRef }: { phaseRef: MutableRefObject<number> }) {
  const scene = useMemo(buildLungs, []);
  const scratch = useMemo(() => ({ object: new THREE.Object3D(), lastPhase: -1 }), []);

  useFrame(() => {
    const p = phaseRef.current;
    if (p === scratch.lastPhase) return;
    scratch.lastPhase = p;
    const b = breath(p);

    // The lungs stretch downward exactly as far as the diaphragm drops, so they stay resting on it.
    scene.lungs.forEach((lung) => {
      lung.scale.set(1 + 0.1 * b, 1 + 0.18 * b, 1 + 0.1 * b);
      lung.position.y = -0.18 * b;
    });
    scene.diaphragm.scale.y = 0.7 * (1 - 0.22 * b);
    scene.diaphragm.position.y = -2.25 - 0.05 * b;
    scene.ribs.forEach((rib, k) => {
      const lift = 1 + 0.06 * b * (1 - k / 8);
      rib.scale.set(rib.userData.width * lift, 0.62 * rib.userData.width * lift, 1);
    });

    // Puffs ride the breath itself: in while the chest grows, back out while it shrinks.
    scene.airMaterial.color.copy(freshAir).lerp(usedAir, smooth((p - 0.42) / 0.12));
    scene.paths.forEach((path, i) => {
      const s = clamp01((b - path.delay) / (1 - path.delay));
      path.curve.getPoint(s, scratch.object.position);
      scratch.object.scale.setScalar(s < 0.02 ? 0 : 1);
      scratch.object.updateMatrix();
      scene.air.setMatrixAt(i, scratch.object.matrix);
    });
    scene.air.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <primitive object={scene.root} />
      <Labels items={scene.labels} />
    </>
  );
}
