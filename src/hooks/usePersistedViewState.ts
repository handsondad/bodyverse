import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { type AgeTier } from "../types/content";

const STORAGE_KEY = "body-mystery-react-state";

function isAgeTier(value: unknown): value is AgeTier {
  return value === "4-6" || value === "7-9" || value === "10-12" || value === "13+";
}

function loadSavedAge(): AgeTier | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { age?: unknown };
    return isAgeTier(parsed.age) ? parsed.age : null;
  } catch {
    return null;
  }
}

type PersistedViewState = {
  age: AgeTier;
  setAge: Dispatch<SetStateAction<AgeTier>>;
};

export function usePersistedViewState(): PersistedViewState {
  const [age, setAge] = useState<AgeTier>(() => loadSavedAge() ?? "7-9");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ age }));
  }, [age]);

  return { age, setAge };
}
