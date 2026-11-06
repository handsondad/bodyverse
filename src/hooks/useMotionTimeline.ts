import { useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import { advancePhase, stepPhase, wrap01 } from "../lib/motion";

export type MotionTimeline = {
  /** Read every frame by 3D scenes; never triggers a React render. */
  phaseRef: MutableRefObject<number>;
  /** Throttled copy of the phase for sliders and captions. */
  phase: number;
  playing: boolean;
  speed: number;
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  seek: (phase: number) => void;
  step: (direction?: 1 | -1) => void;
  reset: () => void;
};

const uiIntervalMs = 80;

export function useMotionTimeline(durationSeconds: number, { active = true, autoplay = true, initialSpeed = 1 } = {}): MotionTimeline {
  const phaseRef = useRef(0);
  const durationRef = useRef(durationSeconds);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const [speed, setSpeed] = useState(initialSpeed);
  durationRef.current = durationSeconds;

  useEffect(() => {
    if (!playing || !active) return;
    let frame = 0;
    let last = performance.now();
    let lastUi = 0;
    const tick = (now: number) => {
      phaseRef.current = advancePhase(phaseRef.current, (now - last) / 1000, durationRef.current, speed);
      last = now;
      if (now - lastUi > uiIntervalMs) {
        lastUi = now;
        setPhase(phaseRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, active, speed]);

  const seek = useCallback((next: number) => {
    phaseRef.current = wrap01(next);
    setPhase(phaseRef.current);
  }, []);

  const step = useCallback((direction: 1 | -1 = 1) => {
    setPlaying(false);
    seek(stepPhase(phaseRef.current, direction));
  }, [seek]);

  const reset = useCallback(() => seek(0), [seek]);

  return { phaseRef, phase, playing, speed, setPlaying, setSpeed, seek, step, reset };
}
