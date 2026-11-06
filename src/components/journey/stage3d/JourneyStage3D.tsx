import { useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import type { JourneyId } from "../../../data/journey-registry";
import type { ScaleId } from "../../../types/exploration";
import { KidOrbitControls, type OrbitControls } from "../../three-shared";
import { AlveoliScene } from "./AlveoliScene";
import { CellScene } from "./CellScene";
import { ExchangeScene } from "./ExchangeScene";
import { HeartScene } from "./HeartScene";
import { HemoglobinScene } from "./HemoglobinScene";
import { LungsScene } from "./LungsScene";
import { MoleculeScene } from "./MoleculeScene";
import { LabelLayerContext, StageLights } from "./shared";
import { TissueScene } from "./TissueScene";

export type StageToggles = Record<string, boolean>;
type StageStop = Exclude<ScaleId, "body">;

type Props = {
  journey: JourneyId;
  stop: StageStop;
  phaseRef: MutableRefObject<number>;
  toggles: StageToggles;
  active: boolean;
  showLabels: boolean;
  label: string;
};

type View = { position: [number, number, number]; minDistance: number; maxDistance: number };
type SceneSpec = { view: View; render: (phaseRef: MutableRefObject<number>, on: (id: string) => boolean) => ReactNode };

const view = (position: View["position"], minDistance = 3, maxDistance = 9): View => ({ position, minDistance, maxDistance });

const scenes: Record<JourneyId, Record<StageStop, SceneSpec>> = {
  heart: {
    organ: { view: view([0.35, 0.4, 4.8]), render: (phaseRef) => <HeartScene phaseRef={phaseRef} /> },
    tissue: { view: view([0, 0.5, 6.3], 3.2), render: (phaseRef, on) => <TissueScene phaseRef={phaseRef} linked={on("links")} /> },
    cell: { view: view([0, 0.8, 5.6]), render: (phaseRef, on) => <CellScene phaseRef={phaseRef} signal={on("signal")} atp={on("atp")} /> },
    molecule: { view: view([0, 0.6, 5.8]), render: (phaseRef, on) => <MoleculeScene phaseRef={phaseRef} atp={on("atp")} /> }
  },
  lungs: {
    organ: { view: view([0.3, 0.3, 6.8]), render: (phaseRef) => <LungsScene phaseRef={phaseRef} /> },
    tissue: { view: view([0, 0.4, 6]), render: (phaseRef, on) => <AlveoliScene phaseRef={phaseRef} many={on("many")} /> },
    cell: { view: view([0, 0.3, 6.6]), render: (phaseRef, on) => <ExchangeScene phaseRef={phaseRef} fresh={on("fresh")} thin={on("thin")} /> },
    molecule: { view: view([0, 0.4, 6]), render: (phaseRef, on) => <HemoglobinScene phaseRef={phaseRef} noCO={on("noCO")} /> }
  }
};

export default function JourneyStage3D({ journey, stop, phaseRef, toggles, active, showLabels, label }: Props) {
  const controlsRef = useRef<OrbitControls | null>(null);
  const labelLayer = useRef<HTMLDivElement>(null);
  const spec = scenes[journey][stop];
  const on = (id: string) => toggles[id] !== false;

  return (
    <div className="stage-3d" role="img" aria-label={label}>
      <Canvas key={`${journey}-${stop}`} dpr={[1, 2]} frameloop={active ? "always" : "never"} resize={{ offsetSize: true }}
        camera={{ position: spec.view.position, fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <StageLights />
        <LabelLayerContext.Provider value={labelLayer}>
          {spec.render(phaseRef, on)}
        </LabelLayerContext.Provider>
        <KidOrbitControls controlsRef={controlsRef} limits={{
          minDistance: spec.view.minDistance, maxDistance: spec.view.maxDistance,
          minPolarAngle: Math.PI / 3.2, maxPolarAngle: Math.PI / 1.6,
          minAzimuthAngle: -Math.PI / 2.6, maxAzimuthAngle: Math.PI / 2.6
        }} />
      </Canvas>
      <div ref={labelLayer} className={`stage-labels ${showLabels ? "" : "is-hidden"}`} aria-hidden="true" />
      <button type="button" className="stage-reset" onClick={() => controlsRef.current?.reset()}>回到正面</button>
    </div>
  );
}
