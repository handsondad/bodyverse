import { createContext, useContext, useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const LabelLayerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export type SceneLabel = { text: string; at: THREE.Vector3; target?: THREE.Object3D | null };

// HTML name tags that follow 3D points, so children read "心房" on the part itself.
export function Labels({ items }: { items: readonly SceneLabel[] }) {
  const layer = useContext(LabelLayerContext);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const nodes = useRef<HTMLSpanElement[]>([]);
  const point = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const root = layer?.current;
    if (!root) return;
    nodes.current = items.map((item) => {
      const node = document.createElement("span");
      node.className = "stage-label";
      node.textContent = item.text;
      root.appendChild(node);
      return node;
    });
    return () => nodes.current.forEach((node) => node.remove());
  }, [items, layer]);

  useFrame(() => {
    items.forEach((item, index) => {
      const node = nodes.current[index];
      if (!node) return;
      if (item.target) item.target.localToWorld(point.copy(item.at));
      else point.copy(item.at);
      point.project(camera);
      node.style.opacity = point.z > 1 || item.target?.visible === false ? "0" : "1";
      node.style.transform = `translate(-50%, -50%) translate(${((point.x + 1) / 2) * size.width}px, ${((1 - point.y) / 2) * size.height}px)`;
    });
  });

  return null;
}

export const standard = (color: string, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0, ...extra });

// Particles inside see-through organs: drawn after them and kept at full colour, so O₂ stays recognisably cyan.
export const particleMaterial = (color: THREE.ColorRepresentation) =>
  new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, depthWrite: false, toneMapped: false });

export function StageLights() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#ffd9c0", 0.85]} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} />
      <directionalLight position={[-3, 2, -4]} intensity={1.1} color="#cfe6ff" />
    </>
  );
}

// A closed biconcave disc: thin centre, thick rim, about 2 units across.
export function createRedCellGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(1, 20, 12);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const rho = Math.min(1, Math.hypot(x, z));
    position.setY(i, Math.sign(y || 1) * Math.sqrt(Math.max(0, 1 - rho * rho)) * (0.19 + 0.57 * rho * rho));
  }
  geometry.computeVertexNormals();
  return geometry;
}

export function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}
