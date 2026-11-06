import { useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { bump, clamp01, pulseTravel, wrap01 } from "../../../lib/motion";
import { createHeartGeometry } from "../../three-shared";
import { createRedCellGeometry, Labels, standard, type SceneLabel } from "./shared";

type Point = [number, number, number];
type VesselSpec = { points: Point[]; radius: number; color: string; rich: boolean; pushedByBeat: boolean };

// Points run in the direction blood flows. Left/right follow the child's own body, as seen from the front.
const vesselSpecs: VesselSpec[] = [
  { points: [[0.12, 0.5, 0.05], [0.16, 1.15, 0.05], [0.5, 1.5, -0.12], [0.92, 1.3, -0.32], [1.02, 0.7, -0.5], [1.02, -0.7, -0.55]], radius: 0.14, color: "#ff5468", rich: true, pushedByBeat: true },
  { points: [[-0.14, 0.55, 0.28], [-0.22, 1.02, 0.3], [-0.78, 1.22, 0.1], [-1.7, 1.05, -0.15]], radius: 0.12, color: "#6f8ff5", rich: false, pushedByBeat: true },
  { points: [[-0.62, 1.85, -0.22], [-0.6, 1.3, -0.2], [-0.55, 0.95, -0.18]], radius: 0.11, color: "#6f8ff5", rich: false, pushedByBeat: false },
  { points: [[-0.62, -1.55, -0.72], [-0.62, -0.5, -0.72], [-0.55, 0.45, -0.38]], radius: 0.12, color: "#6f8ff5", rich: false, pushedByBeat: false },
  { points: [[1.78, 0.95, -0.48], [1.25, 0.82, -0.42], [0.78, 0.74, -0.34]], radius: 0.1, color: "#ff5468", rich: true, pushedByBeat: false }
];

const labelSpecs: Array<[string, Point]> = [
  ["右心房", [-0.95, 0.62, 0.15]],
  ["左心房", [0.98, 0.55, 0]],
  ["心室：最有力的“泵”", [0, -0.25, 0.6]],
  ["主动脉 → 去全身", [0.55, 1.72, -0.12]],
  ["肺动脉 → 去肺", [-1.45, 1.32, -0.1]],
  ["从全身回来", [-0.62, 2.02, -0.22]],
  ["从肺回来", [1.68, 1.15, -0.48]]
];

const glow = new THREE.Color("#ffb347");
const rightSide = new THREE.Color("#8d8cf0");
const leftSide = new THREE.Color("#ff5d75");

function buildVentricles() {
  const geometry = createHeartGeometry();
  geometry.scale(0.85, 0.85, 0.85);
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < position.count; i += 1) {
    color.copy(rightSide).lerp(leftSide, THREE.MathUtils.smoothstep(position.getX(i), -0.18, 0.18)).toArray(colors, i * 3);
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = standard("#ffffff", { vertexColors: true, emissive: glow, emissiveIntensity: 0 });
  return { mesh: new THREE.Mesh(geometry, material), original: Float32Array.from(position.array as Float32Array), top: box.max.y, height: box.max.y - box.min.y };
}

function buildVessel(spec: VesselSpec, cellGeometry: THREE.BufferGeometry) {
  const curve = new THREE.CatmullRomCurve3(spec.points.map((p) => new THREE.Vector3(...p)), false, "centripetal");
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, spec.radius, 16, false),
    standard(spec.color, { transparent: true, opacity: 0.42, depthWrite: false }));
  const count = Math.max(6, Math.round(curve.getLength() / 0.16));
  const cells = new THREE.InstancedMesh(cellGeometry, standard(spec.rich ? "#e8283c" : "#9c3566", { roughness: 0.4 }), count);
  cells.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cells.frustumCulled = false;
  return { spec, curve, tube, cells, count };
}

export function HeartScene({ phaseRef }: { phaseRef: MutableRefObject<number> }) {
  const scene = useMemo(() => {
    const ventricles = buildVentricles();
    const atria = [
      { at: [-0.5, 0.78, -0.18] as Point, color: rightSide },
      { at: [0.52, 0.74, -0.32] as Point, color: leftSide }
    ].map(({ at, color }) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 24), standard(`#${color.getHexString()}`, { emissive: glow, emissiveIntensity: 0 }));
      mesh.position.set(...at);
      mesh.scale.set(1, 0.85, 0.9);
      return mesh;
    });
    const cellGeometry = createRedCellGeometry();
    const vessels = vesselSpecs.map((spec) => buildVessel(spec, cellGeometry));
    const root = new THREE.Group();
    root.add(ventricles.mesh, ...atria, ...vessels.flatMap((vessel) => [vessel.tube, vessel.cells]));
    root.position.y = -0.2;
    const labels: SceneLabel[] = labelSpecs.map(([text, at]) => ({ text, at: new THREE.Vector3(...at), target: root }));
    return { root, ventricles, atria, vessels, labels };
  }, []);

  const scratch = useMemo(() => ({
    point: new THREE.Vector3(), tangent: new THREE.Vector3(), side: new THREE.Vector3(), lift: new THREE.Vector3(),
    object: new THREE.Object3D(), spin: new THREE.Quaternion(), up: new THREE.Vector3(0, 1, 0), across: new THREE.Vector3(1, 0, 0), lastPhase: -1
  }), []);

  useFrame(() => {
    const p = phaseRef.current;
    if (p === scratch.lastPhase) return;
    scratch.lastPhase = p;
    const atrialSqueeze = bump(p, 0.02, 0.12, 0.24);
    const ventricularSqueeze = bump(p, 0.22, 0.38, 0.66);

    for (const atrium of scene.atria) {
      atrium.scale.set(1 - 0.14 * atrialSqueeze, 0.85 * (1 - 0.16 * atrialSqueeze), 0.9 * (1 - 0.14 * atrialSqueeze));
      (atrium.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.45 * atrialSqueeze;
    }

    // The apex rises toward the base, the middle narrows and the walls twist a little, like wringing a towel.
    const { mesh, original, top, height } = scene.ventricles;
    const out = mesh.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < out.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const z = original[i + 2];
      const u = clamp01((top - y) / height);
      const narrow = 1 - 0.1 * ventricularSqueeze * Math.sin(Math.PI * Math.min(1, u * 1.2));
      const twist = 0.28 * ventricularSqueeze * u;
      const cos = Math.cos(twist);
      const sin = Math.sin(twist);
      out[i] = (x * cos - z * sin) * narrow;
      out[i + 1] = y + (top - y) * 0.1 * ventricularSqueeze;
      out[i + 2] = (x * sin + z * cos) * narrow;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
    (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 * ventricularSqueeze;

    for (const vessel of scene.vessels) {
      // Arteries surge while the ventricles push; veins keep flowing back between beats.
      const travel = vessel.spec.pushedByBeat ? 2 * pulseTravel(p, 0.22, 0.62) : p;
      for (let i = 0; i < vessel.count; i += 1) {
        const lane = i % 3;
        const u = wrap01((i + travel + lane * 0.33) / vessel.count);
        vessel.curve.getPointAt(u, scratch.point);
        vessel.curve.getTangentAt(u, scratch.tangent).normalize();
        scratch.side.crossVectors(scratch.tangent, Math.abs(scratch.tangent.y) > 0.9 ? scratch.across : scratch.up).normalize();
        scratch.lift.crossVectors(scratch.tangent, scratch.side);
        const angle = i * 2.4;
        const radial = vessel.spec.radius * (0.15 + 0.22 * lane);
        scratch.object.position.copy(scratch.point)
          .addScaledVector(scratch.side, Math.cos(angle) * radial)
          .addScaledVector(scratch.lift, Math.sin(angle) * radial);
        scratch.object.quaternion.setFromUnitVectors(scratch.up, scratch.tangent);
        scratch.object.quaternion.multiply(scratch.spin.setFromAxisAngle(scratch.up, angle + p * 6.28));
        scratch.object.scale.setScalar(vessel.spec.radius * 0.42);
        scratch.object.updateMatrix();
        vessel.cells.setMatrixAt(i, scratch.object.matrix);
      }
      vessel.cells.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <primitive object={scene.root} />
      <Labels items={scene.labels} />
    </>
  );
}
