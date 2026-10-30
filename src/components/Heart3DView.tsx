import { lazy, Suspense, useState } from "react";
import { canUseWebGL } from "../lib/heart-3d";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { HeartScaleDiagram } from "./HeartScaleDiagram";
import { WebGLBoundary } from "./WebGLBoundary";

const Heart3D = lazy(() => import("./Heart3D"));

type Heart3DViewProps = {
  rate: number;
  playing: boolean;
  onTogglePlay: () => void;
};

export function Heart3DView({ rate, playing, onTogglePlay }: Heart3DViewProps) {
  const [supported] = useState(canUseWebGL);
  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const reducedMotion = useReducedMotion();
  const flat = <HeartScaleDiagram scale="organ" />;

  if (!supported) {
    return (
      <>
        {flat}
        <p className="heart-note">这台设备暂不支持 3D 显示，已改用平面示意图。</p>
      </>
    );
  }

  return (
    <div className="heart-3d">
      <div className="heart-actions" role="group" aria-label="选择显示方式">
        <button type="button" aria-pressed={mode === "3d"} onClick={() => setMode("3d")}>3D 模型</button>
        <button type="button" aria-pressed={mode === "2d"} onClick={() => setMode("2d")}>平面图</button>
      </div>
      {mode === "2d" ? flat : (
        <figure className="heart-scale-figure">
          <WebGLBoundary name="3D 心脏模型" fallback={flat}>
            <Suspense fallback={<p className="heart-3d-loading">正在搬来 3D 心脏……</p>}>
              <Heart3D
                rate={rate}
                animate={playing && !reducedMotion}
                label={`可旋转的 3D 卡通心脏，红色管道送出血液，蓝色管道送回血液。${playing && !reducedMotion ? `正在按每分钟 ${rate} 次跳动。` : "心跳示意静止。"}`}
              >
                <button type="button" aria-pressed={playing} onClick={onTogglePlay} disabled={reducedMotion}>
                  {playing ? "暂停心跳" : "让它跳起来"}
                </button>
              </Heart3D>
            </Suspense>
          </WebGLBoundary>
          <figcaption>
            用手指拖动可以转一转、捏合可以放大。蓝色带血液流回，红色带血液送出；心跳快慢跟随下方“模型心率”。
            {reducedMotion && " 已按系统“减少动态效果”设置保持静止。"}
            卡通示意，不按真实形状或比例绘制，也不表示瓣膜和心腔。
          </figcaption>
        </figure>
      )}
    </div>
  );
}
