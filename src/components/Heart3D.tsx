import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { beatScale, flowProgress } from "../lib/heart-3d";
import { createHeartGeometry, createToonGradient, KidOrbitControls, type OrbitControls } from "./three-shared";

type Heart3DProps = {
  rate: number;
  animate: boolean;
};

const dotsPerVessel = 4;
const heartOrbitLimits = { minDistance: 3.2, maxDistance: 7 };

// Outflow leaves the heart; inflow curve is ordered from the body back into the heart.
const outflowCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.1, 0.45, 0),
  new THREE.Vector3(0.15, 1.1, 0),
  new THREE.Vector3(0.55, 1.35, 0),
  new THREE.Vector3(0.95, 1.1, 0),
  new THREE.Vector3(1.15, 0.5, 0)
]);
const inflowCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1.25, 0.45, 0.15),
  new THREE.Vector3(-1.1, 1.05, 0.15),
  new THREE.Vector3(-0.7, 1.25, 0.15),
  new THREE.Vector3(-0.35, 0.95, 0.15),
  new THREE.Vector3(-0.3, 0.45, 0.15)
]);

function HeartModel({ rate, animate }: Heart3DProps) {
  const heartRef = useRef<THREE.Mesh>(null);
  const outDots = useRef<Array<THREE.Mesh | null>>([]);
  const inDots = useRef<Array<THREE.Mesh | null>>([]);
  const gradient = useMemo(createToonGradient, []);
  const heartGeometry = useMemo(createHeartGeometry, []);
  const outflowGeometry = useMemo(() => new THREE.TubeGeometry(outflowCurve, 48, 0.12, 16, false), []);
  const inflowGeometry = useMemo(() => new THREE.TubeGeometry(inflowCurve, 48, 0.12, 16, false), []);

  useFrame(({ clock }) => {
    const elapsed = animate ? clock.getElapsedTime() : 0;
    heartRef.current?.scale.setScalar(animate ? beatScale(elapsed, rate) : 1);
    for (let i = 0; i < dotsPerVessel; i += 1) {
      const offset = i / dotsPerVessel;
      const progress = animate ? flowProgress(elapsed, rate, offset) : offset + 0.12;
      outDots.current[i]?.position.copy(outflowCurve.getPointAt(progress));
      inDots.current[i]?.position.copy(inflowCurve.getPointAt(progress));
    }
  });

  return (
    <group position={[0, -0.35, 0]}>
      <mesh ref={heartRef} name="part_heart" geometry={heartGeometry}>
        <meshToonMaterial color="#ef5a78" gradientMap={gradient} />
      </mesh>
      <mesh name="vessel_outflow" geometry={outflowGeometry}>
        <meshToonMaterial color="#e2384f" gradientMap={gradient} />
      </mesh>
      <mesh name="vessel_inflow" geometry={inflowGeometry}>
        <meshToonMaterial color="#4d96ff" gradientMap={gradient} />
      </mesh>
      {Array.from({ length: dotsPerVessel }, (_, i) => (
        <group key={i}>
          <mesh ref={(mesh) => { outDots.current[i] = mesh; }}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshToonMaterial color="#ff9aa8" gradientMap={gradient} />
          </mesh>
          <mesh ref={(mesh) => { inDots.current[i] = mesh; }}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshToonMaterial color="#9cc8ff" gradientMap={gradient} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Heart3D({ rate, animate, label, children }: Heart3DProps & { label: string; children?: ReactNode }) {
  const controlsRef = useRef<OrbitControls | null>(null);

  return (
    <>
      <div className="heart-3d-canvas" role="img" aria-label={label}>
        <Canvas
          frameloop={animate ? "always" : "demand"}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.2, 4.6], fov: 40 }}
          gl={{ antialias: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1.6} />
          <HeartModel rate={rate} animate={animate} />
          <KidOrbitControls controlsRef={controlsRef} limits={heartOrbitLimits} />
        </Canvas>
      </div>
      <div className="heart-actions">
        {children}
        <button type="button" onClick={() => controlsRef.current?.reset()}>回到正面</button>
      </div>
    </>
  );
}
