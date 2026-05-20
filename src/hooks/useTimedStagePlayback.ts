import { useEffect, useMemo, useRef, useState } from "react";

type StageLike<TKey extends string> = {
  key: TKey;
};

type TimedStagePlaybackOptions<TKey extends string, TStage extends StageLike<TKey>> = {
  enabled: boolean;
  steps: TStage[];
  defaultKey: TKey;
  intervalMs: number;
  idleStatus: string;
  inactiveStatus: string;
  playingStatus: string;
  jumpedStatus: string;
  completedStatus: string;
  idleDetail: string;
  getDetail: (stage: TStage) => string;
  onComplete?: () => void;
};

type TimedStagePlaybackResult<TKey extends string> = {
  focusedKey: TKey;
  stepIndex: number;
  status: string;
  activeKey: TKey;
  detailText: string;
  play: () => void;
  reset: (nextStatus?: string) => void;
  jumpTo: (index: number) => void;
};

export function useTimedStagePlayback<TKey extends string, TStage extends StageLike<TKey>>(
  options: TimedStagePlaybackOptions<TKey, TStage>
): TimedStagePlaybackResult<TKey> {
  const {
    enabled,
    steps,
    defaultKey,
    intervalMs,
    idleStatus,
    inactiveStatus,
    playingStatus,
    jumpedStatus,
    completedStatus,
    idleDetail,
    getDetail,
    onComplete
  } = options;

  const [focusedKey, setFocusedKey] = useState<TKey>(defaultKey);
  const [stepIndex, setStepIndex] = useState(-1);
  const [status, setStatus] = useState(idleStatus);
  const timerRef = useRef<number | null>(null);

  function clearTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function reset(nextStatus = idleStatus) {
    clearTimer();
    setStepIndex(-1);
    setStatus(nextStatus);
  }

  function jumpTo(index: number) {
    if (!enabled) {
      setStatus(inactiveStatus);
      return;
    }

    clearTimer();
    setStepIndex(index);
    setFocusedKey(steps[index].key);
    setStatus(jumpedStatus);
  }

  function play() {
    if (!enabled) {
      setStatus(inactiveStatus);
      return;
    }

    clearTimer();
    setStepIndex(0);
    setFocusedKey(steps[0].key);
    setStatus(playingStatus);

    let index = 0;
    timerRef.current = window.setInterval(() => {
      index += 1;
      if (index >= steps.length) {
        clearTimer();
        onComplete?.();
        setStatus(completedStatus);
        return;
      }
      setStepIndex(index);
      setFocusedKey(steps[index].key);
    }, intervalMs);
  }

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      reset(inactiveStatus);
      return;
    }
    setStatus(idleStatus);
  }, [enabled, idleStatus, inactiveStatus]);

  useEffect(() => {
    if (!enabled) return;
    if (stepIndex < 0) {
      setFocusedKey(defaultKey);
      return;
    }
    setFocusedKey(steps[stepIndex].key);
  }, [defaultKey, enabled, stepIndex, steps]);

  const activeKey = useMemo(() => steps[Math.max(stepIndex, 0)]?.key ?? focusedKey, [focusedKey, stepIndex, steps]);
  const detailText = useMemo(() => (stepIndex < 0 ? idleDetail : getDetail(steps[stepIndex])), [getDetail, idleDetail, stepIndex, steps]);

  return {
    focusedKey,
    stepIndex,
    status,
    activeKey,
    detailText,
    play,
    reset,
    jumpTo
  };
}