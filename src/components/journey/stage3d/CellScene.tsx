import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { bump, smooth, wrap01 } from "../../../lib/motion";
import { Labels, seeded, standard, type SceneLabel } from "./shared";

const fibrilRows = [-0.36, 0, 0.36];
const sarcomeres = 9;
const sarcomereLength = 0.36;
const spark = new THREE.Color("#ffd23f");

function buildCell() {
  const random = seeded(17);
  const root = new THREE.Group();
  const membrane = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 3, 12, 40),
    standard("#ffb3c1", { transparent: true, opacity: 0.26, depthWrite: false, side: THREE.DoubleSide }));
  membrane.rotation.z = Math.PI / 2;
  root.add(membrane);

  const band = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const zLine = new THREE.BoxGeometry(0.025, 0.25, 0.25);
  const bandMat = standard("#c2415b");
  const zMat = standard("#6a3a9a");
  const coreMat = standard("#ffc8d1");
  const fibrilParts: Array<{ mesh: THREE.Mesh; x0: number }> = [];
  const fibrils = fibrilRows.map((y) => {
    const fibril = new THREE.Group();
    fibril.position.y = y;
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, sarcomeres * sarcomereLength, 12), coreMat);
    core.rotation.z = Math.PI / 2;
    fibril.add(core);
    for (let i = 0; i < sarcomeres; i += 1) {
      const center = (i - (sarcomeres - 1) / 2) * sarcomereLength;
      for (const [geometry, material, x0] of [[band, bandMat, center], [zLine, zMat, center + sarcomereLength / 2]] as const) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x0;
        fibril.add(mesh);
        fibrilParts.push({ mesh, x0 });
      }
    }
    root.add(fibril);
    return { fibril, core };
  });

  const storeMat = standard("#7cc0ff", { transparent: true, opacity: 0.7 });
  const stores = [-0.18, 0.18].map((y) => {
    const points = Array.from({ length: 12 }, (_, i) => new THREE.Vector3(-1.7 + (3.4 * i) / 11, y + 0.03 * Math.sin(i * 1.7), 0.14));
    const store = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, 0.035, 8, false), storeMat);
    root.add(store);
    return store;
  });

  const ionGeometry = new THREE.SphereGeometry(0.035, 10, 8);
  const ionMat = standard("#2f8cff", { emissive: new THREE.Color("#2f8cff"), emissiveIntensity: 0.6 });
  const ions = Array.from({ length: 40 }, (_, i) => {
    const mesh = new THREE.Mesh(ionGeometry, ionMat);
    const home = new THREE.Vector3(-1.6 + 3.2 * random(), i % 2 ? 0.18 : -0.18, 0.14);
    const out = home.clone().add(new THREE.Vector3((random() - 0.5) * 0.2, (random() - 0.5) * 0.3, (random() - 0.5) * 0.45));
    root.add(mesh);
    return { mesh, home, out };
  });

  const mitoGeometry = new THREE.CapsuleGeometry(0.1, 0.3, 6, 16);
  mitoGeometry.rotateZ(Math.PI / 2);
  const mitoMat = standard("#ffa04d");
  const atpGeometry = new THREE.SphereGeometry(0.03, 8, 6);
  const atpMat = new THREE.MeshBasicMaterial({ color: "#ffe14d", transparent: true });
  const mitochondria = ([[-1.15, 0.58, 0.18], [0.35, 0.58, -0.15], [1.2, -0.58, 0.15], [-0.45, -0.6, -0.1]] as const).map(([x, y, z]) => {
    const mesh = new THREE.Mesh(mitoGeometry, mitoMat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    const sparks = Array.from({ length: 3 }, () => {
      const atp = new THREE.Mesh(atpGeometry, atpMat);
      root.add(atp);
      return atp;
    });
    return { mesh, sparks, to: new THREE.Vector3(x + 0.1, y * 0.35, 0) };
  });

  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), standard("#9b6fd0", { transparent: true, opacity: 0.85 }));
  nucleus.position.set(0.2, 0, 0.6);
  nucleus.scale.set(0.42, 0.26, 0.1);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.035, 8, 64),
    new THREE.MeshBasicMaterial({ color: spark, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  ring.rotation.y = Math.PI / 2;
  root.add(nucleus, ring);

  const labels: SceneLabel[] = [
    { text: "细胞膜", at: new THREE.Vector3(-1.9, 0.75, 0), target: null },
    { text: "收缩结构", at: new THREE.Vector3(1.55, 0.12, 0), target: fibrils[1].fibril },
    { text: "钙离子“仓库”", at: new THREE.Vector3(-1.2, 0.05, 0.14), target: stores[0] },
    { text: "线粒体：制造 ATP", at: new THREE.Vector3(0, 0.2, 0), target: mitochondria[0].mesh },
    { text: "细胞核", at: new THREE.Vector3(0, 0, 1.2), target: nucleus }
  ];
  return { root, fibrilParts, ions, mitochondria, ring, labels };
}

export function CellScene({ phaseRef, signal, atp }: { phaseRef: MutableRefObject<number>; signal: boolean; atp: boolean }) {
  const cell = useMemo(buildCell, []);

  useFrame(() => {
    const p = phaseRef.current;
    const ringMat = cell.ring.material as THREE.MeshBasicMaterial;
    ringMat.opacity = signal ? 0.9 * bump(p, 0.001, 0.04, 0.16) : 0;
    cell.ring.position.x = THREE.MathUtils.lerp(-2.3, 2.3, smooth(p / 0.14));

    // Without ATP the calcium cannot be pumped back and the fibrils cannot let go, so the cell stays short.
    const released = !signal ? 0 : atp ? smooth((p - 0.12) / 0.1) * (1 - smooth((p - 0.62) / 0.25)) : 1;
    const squeeze = !signal ? 0 : atp ? bump(p, 0.24, 0.42, 0.85) : 1;
    for (const ion of cell.ions) {
      ion.mesh.position.lerpVectors(ion.home, ion.out, released);
      ion.mesh.scale.setScalar(0.6 + 0.6 * released);
    }
    for (const part of cell.fibrilParts) part.mesh.position.x = part.x0 * (1 - 0.14 * squeeze);
    cell.root.scale.set(1 - 0.12 * squeeze, 1 + 0.05 * squeeze, 1 + 0.05 * squeeze);

    for (const mito of cell.mitochondria) {
      mito.sparks.forEach((atpSpark, k) => {
        const t = wrap01(p * 2 + k / 3);
        atpSpark.visible = atp;
        atpSpark.position.lerpVectors(mito.mesh.position, mito.to, t);
        atpSpark.scale.setScalar(1.4 * (1 - t) + 0.3);
      });
    }
  });

  return (
    <>
      <primitive object={cell.root} />
      <Labels items={cell.labels} />
    </>
  );
}
