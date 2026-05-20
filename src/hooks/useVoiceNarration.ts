import { useCallback, useEffect, useRef, useState } from "react";
import { type AgeTier } from "../types/content";

type VoiceNarrationState = {
  voiceStatus: string;
  speak: (text: string) => void;
  stop: () => void;
};

export function useVoiceNarration(age: AgeTier): VoiceNarrationState {
  const [voiceStatus, setVoiceStatus] = useState("未播放");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) {
      setVoiceStatus("当前浏览器不支持语音播报");
      return;
    }
    window.speechSynthesis.cancel();
    setVoiceStatus("已停止");
    utteranceRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!window.speechSynthesis) {
        setVoiceStatus("当前浏览器不支持语音播报");
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = age === "4-6" ? 0.88 : age === "7-9" ? 0.93 : 1;
      utterance.onstart = () => setVoiceStatus("正在播报");
      utterance.onend = () => setVoiceStatus("播报完成");
      utterance.onerror = () => setVoiceStatus("播报失败，请重试");
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [age]
  );

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    voiceStatus,
    speak,
    stop
  };
}