import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { PartId } from "../types/content";
import { beatScale } from "../lib/heart-3d";
import { breathScale, isTap, nearestTorsoPart, partFromObjectName, selectPopScale, torsoOrgans } from "../lib/body-3d";
import { createHeartGeometry, createToonGradient, KidOrbitControls, type OrbitControls } from "./three-shared";

type Body3DProps = {
  selectedPart: PartId;
  onPartSelect: (part: PartId) => void;
  partLabelMap: Record<PartId, string>;
  animate: boolean;
  label: string;
  children?: ReactNode;
};

const skin = "#ffd6b3";
const highlight = new THREE.Color("#ff9f43");
const torsoCatchName = "torso_catch";
// Lift the child above the orbit target so the tip pill fits under the feet.
const bodyLift = 0.25;
// The selected organ renders after the frosted shirt (renderOrder 2) so it shows bright and untinted.
const selectedRenderOrder = 3;
const lungOrgans = torsoOrgans.filter((organ) => organ.part === "lungs");
const heartAt = torsoOrgans.find((organ) => organ.part === "heart")!;
const stomachAt = torsoOrgans.find((organ) => organ.part === "stomach")!;
const bodyOrbitLimits = {
  minDistance: 4.2,
  maxDistance: 8,
  minPolarAngle: Math.PI / 3,
  maxPolarAngle: (Math.PI * 2) / 3,
  minAzimuthAngle: -Math.PI / 2.5,
  maxAzimuthAngle: Math.PI / 2.5
};

type SceneProps = Omit<Body3DProps, "label" | "children" | "partLabelMap"> & {
  hovered: PartId | null;
  onHover: (part: PartId | null) => void;
};

function BodyScene({ selectedPart, onPartSelect, animate, hovered, onHover }: SceneProps) {
  const gradient = useMemo(createToonGradient, []);
  const heartGeometry = useMemo(createHeartGeometry, []);
  const bodyRef = useRef<THREE.Group>(null);
  const parts = useRef(new Map<string, THREE.Group>());
  const selectedAt = useRef(-Infinity);
  const clock = useThree((state) => state.clock);
  const domElement = useThree((state) => state.gl.domElement);

  useEffect(() => {
    selectedAt.current = clock.getElapsedTime();
  }, [selectedPart, clock]);

  useEffect(() => {
    domElement.style.cursor = hovered ? "pointer" : "grab";
  }, [domElement, hovered]);

  useFrame(({ clock: frameClock }) => {
    const t = frameClock.getElapsedTime();
    if (bodyRef.current) bodyRef.current.position.y = bodyLift + (animate ? Math.sin(t * 1.6) * 0.03 : 0);
    for (const [name, group] of parts.current) {
      const part = partFromObjectName(name);
      let scale = 1;
      if (animate && part === "heart") scale *= beatScale(t, 80);
      if (animate && part === "lungs") scale *= breathScale(t);
      if (animate && part === selectedPart) scale *= selectPopScale(t - selectedAt.current);
      group.scale.setScalar(scale);
    }
  });

  const register = (name: string) => (group: THREE.Group | null) => {
    if (group) parts.current.set(name, group);
    else parts.current.delete(name);
  };

  // One handler on the body root: the nearest hit wins, child meshes (eyes, hair) resolve to
  // their named part group, and the hidden torso catch plane resolves to the nearest organ.
  const resolvePart = (event: ThreeEvent<PointerEvent | MouseEvent>): PartId | null => {
    if (event.object.name === torsoCatchName && bodyRef.current) {
      const local = bodyRef.current.worldToLocal(event.point.clone());
      return nearestTorsoPart(local.x, local.y);
    }
    for (let node: THREE.Object3D | null = event.object; node; node = node.parent) {
      const part = partFromObjectName(node.name);
      if (part) return part;
    }
    return null;
  };

  const rootHandlers = {
    onClick: (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const part = resolvePart(event);
      if (part && isTap(event.delta)) onPartSelect(part);
    },
    onPointerMove: (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      onHover(resolvePart(event));
    },
    onPointerOut: () => onHover(null)
  };

  const toon = (part: PartId | null, color: string, extra: Partial<THREE.MeshToonMaterialParameters> = {}) => {
    const glow = part === selectedPart ? 0.7 : part !== null && part === hovered ? 0.3 : 0;
    const front = part !== null && part === selectedPart ? { transparent: true } : {};
    return <meshToonMaterial color={color} gradientMap={gradient} emissive={highlight} emissiveIntensity={glow} {...front} {...extra} />;
  };
  const orderFor = (part: PartId) => (part === selectedPart ? selectedRenderOrder : 0);

  return (
    <group ref={bodyRef} position={[0, bodyLift, 0]} {...rootHandlers}>
      <group name="part_head" ref={register("part_head")} position={[0, 1.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          {toon("head", skin)}
        </mesh>
        <mesh position={[0, 0.02, -0.03]} rotation={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.585, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
          {toon("head", "#4a3728")}
        </mesh>
        {[-0.18, 0.18].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.05, 0.5]}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial color="#333" />
            </mesh>
            <mesh position={[x + 0.025, 0.08, 0.565]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#fff" />
            </mesh>
            <mesh position={[x * 1.65, -0.12, 0.44]} scale={[1, 0.6, 0.4]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#ffb6c1" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.12, 0.52]} rotation={[0.25, 0, Math.PI]}>
          <torusGeometry args={[0.12, 0.022, 8, 24, Math.PI]} />
          <meshBasicMaterial color="#d16b6b" />
        </mesh>
      </group>

      <mesh raycast={() => null} renderOrder={2}>
        <capsuleGeometry args={[0.5, 0.5, 8, 32]} />
        {toon(null, "#4a90d9", { transparent: true, opacity: 0.3, depthWrite: false })}
      </mesh>

      <mesh name={torsoCatchName} position={[0, 0, -0.15]} scale={[0.45, 0.7, 1]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial visible={false} side={THREE.DoubleSide} />
      </mesh>

      <group name="part_lungs" ref={register("part_lungs")} renderOrder={orderFor("lungs")} position={[0, lungOrgans[0].y, 0.02]}>
        {lungOrgans.map(({ x }) => (
          <mesh key={x} position={[x, 0, 0]} scale={[0.17, 0.3, 0.14]}>
            <sphereGeometry args={[1, 24, 24]} />
            {toon("lungs", "#8ecae6")}
          </mesh>
        ))}
      </group>

      {/* Heart and stomach are drawn larger than life so small fingers can hit them. */}
      <group name="part_heart" ref={register("part_heart")} renderOrder={orderFor("heart")} position={[heartAt.x, heartAt.y, 0.27]}>
        <mesh geometry={heartGeometry} scale={0.19}>
          {toon("heart", "#ef5a78")}
        </mesh>
      </group>

      <group name="part_stomach" ref={register("part_stomach")} renderOrder={orderFor("stomach")} position={[stomachAt.x, stomachAt.y, 0.12]} rotation={[0, 0, 0.5]}>
        <mesh scale={[0.26, 0.18, 0.14]}>
          <sphereGeometry args={[1, 24, 24]} />
          {toon("stomach", "#ffcf7a")}
        </mesh>
      </group>

      {([["part_hand_l", 1], ["part_hand_r", -1]] as const).map(([name, side]) => (
        <group key={name} position={[0.5 * side, 0.42, 0]} rotation={[0, 0, 0.35 * side]}>
          <mesh position={[0, -0.38, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
            {toon(null, skin)}
          </mesh>
          <group name={name} ref={register(name)} position={[0, -0.8, 0]}>
            <mesh>
              <sphereGeometry args={[0.18, 24, 24]} />
              {toon("hand", skin)}
            </mesh>
          </group>
        </group>
      ))}

      {[-0.22, 0.22].map((x) => (
        <group key={x}>
          <mesh position={[x, -1.12, 0]}>
            <capsuleGeometry args={[0.16, 0.5, 8, 16]} />
            {toon(null, "#ff6b6b")}
          </mesh>
          <mesh position={[x, -1.58, 0.07]} scale={[0.2, 0.12, 0.28]}>
            <sphereGeometry args={[1, 16, 16]} />
            {toon(null, "#5a5a5a")}
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Body3D({ selectedPart, onPartSelect, partLabelMap, animate, label, children }: Body3DProps) {
  const controlsRef = useRef<OrbitControls | null>(null);
  const [hovered, setHovered] = useState<PartId | null>(null);

  return (
    <>
      <div className="body-3d-canvas" role="img" aria-label={label}>
        <Canvas
          frameloop={animate ? "always" : "demand"}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.1, 6.2], fov: 40 }}
          gl={{ antialias: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 4, 5]} intensity={1.5} />
          <BodyScene selectedPart={selectedPart} onPartSelect={onPartSelect} animate={animate} hovered={hovered} onHover={setHovered} />
          <KidOrbitControls controlsRef={controlsRef} limits={bodyOrbitLimits} />
        </Canvas>
        <div className="body-3d-tip" aria-hidden="true">
          {hovered ? `点一下：${partLabelMap[hovered]}` : `已选：${partLabelMap[selectedPart]}`}
        </div>
      </div>
      <div className="body-3d-actions">
        {children}
        <button type="button" onClick={() => controlsRef.current?.reset()}>回到正面</button>
      </div>
    </>
  );
}
