import { lazy, Suspense, useState } from "react";
import { type PartId } from "../types/content";
import { canUseWebGL } from "../lib/heart-3d";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { WebGLBoundary } from "./WebGLBoundary";

const Body3D = lazy(() => import("./Body3D"));

type HumanBodyMapProps = {
  selectedPart: PartId;
  onPartSelect: (part: PartId) => void;
  partLabelMap: Record<PartId, string>;
};

export function HumanBodyMap(props: HumanBodyMapProps) {
  const { selectedPart, onPartSelect, partLabelMap } = props;
  const [supported] = useState(canUseWebGL);
  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const reducedMotion = useReducedMotion();
  const [mapRef, inView] = useInView<HTMLDivElement>();
  const flat = <BodySvg selectedPart={selectedPart} />;
  const show3d = supported && mode === "3d";

  return (
    <div className="body-map-container">
      <div className="body-map-legend">
        <div className="legend-title">🎯 选择身体部位</div>
        <div className="legend-items">
          <button
            onClick={() => onPartSelect("head")}
            className={`legend-item ${selectedPart === "head" ? "is-active" : ""}`}
          >
            <span className="legend-emoji">🧠</span>
            <span className="legend-label">{partLabelMap["head"]}</span>
          </button>
          <button
            onClick={() => onPartSelect("heart")}
            className={`legend-item ${selectedPart === "heart" ? "is-active" : ""}`}
          >
            <span className="legend-emoji">❤️</span>
            <span className="legend-label">{partLabelMap["heart"]}</span>
          </button>
          <button
            onClick={() => onPartSelect("lungs")}
            className={`legend-item ${selectedPart === "lungs" ? "is-active" : ""}`}
          >
            <span className="legend-emoji">🌬️</span>
            <span className="legend-label">{partLabelMap["lungs"]}</span>
          </button>
          <button
            onClick={() => onPartSelect("stomach")}
            className={`legend-item ${selectedPart === "stomach" ? "is-active" : ""}`}
          >
            <span className="legend-emoji">🍽️</span>
            <span className="legend-label">{partLabelMap["stomach"]}</span>
          </button>
          <button
            onClick={() => onPartSelect("hand")}
            className={`legend-item ${selectedPart === "hand" ? "is-active" : ""}`}
          >
            <span className="legend-emoji">🖐️</span>
            <span className="legend-label">{partLabelMap["hand"]}</span>
          </button>
        </div>
      </div>

      <div ref={mapRef} className={`body-map ${show3d ? "body-map--3d" : ""}`}>
        {show3d ? (
          <WebGLBoundary name="3D 人体模型" fallback={flat}>
            <Suspense fallback={flat}>
              <Body3D
                selectedPart={selectedPart}
                onPartSelect={onPartSelect}
                partLabelMap={partLabelMap}
                animate={inView && !reducedMotion}
                label={`3D 卡通小朋友，衣服是半透明的，能看到肺、心脏和胃；也可以点头和手。当前选中：${partLabelMap[selectedPart]}。也可以用上方按钮选择部位。`}
              >
                <button type="button" onClick={() => setMode("2d")}>看平面图</button>
              </Body3D>
            </Suspense>
          </WebGLBoundary>
        ) : flat}
      </div>
      {supported && mode === "2d" && (
        <div className="body-3d-actions">
          <button type="button" onClick={() => setMode("3d")}>看 3D 小人</button>
        </div>
      )}
      <p className="body-map-note">
        {show3d ? "点身体部位可以选择，拖动可以转一转；卡通示意，器官位置大致对应，不按真实形状或比例绘制。" : "卡通示意，不按真实形状或比例绘制。"}
      </p>
    </div>
  );
}

function BodySvg({ selectedPart }: { selectedPart: PartId }) {
  return (
        <svg viewBox="0 0 100 140" className="body-svg" role="img" aria-label="卡通人体平面示意图">
          <ellipse cx="50" cy="8" rx="16" ry="4" fill="#4a3728" />
          
          <circle cx="38" cy="6" rx="7" ry="6" fill="#4a3728" />
          <circle cx="62" cy="6" rx="7" ry="6" fill="#4a3728" />
          
          <circle cx="50" cy="22" r="16" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="2" />
          
          <circle cx="43" cy="18" r="4" fill="#333" />
          <circle cx="57" cy="18" r="4" fill="#333" />
          <circle cx="44" cy="17" r="1.5" fill="#fff" />
          <circle cx="58" cy="17" r="1.5" fill="#fff" />
          
          <path d="M44 26 Q50 32 56 26" fill="none" stroke="#d16b6b" strokeWidth="2" strokeLinecap="round" />
          
          <circle cx="38" cy="24" r="3" fill="#ffb6c1" opacity="0.6" />
          <circle cx="62" cy="24" r="3" fill="#ffb6c1" opacity="0.6" />
          
          <path d="M40 38 L32 68 L42 72 L58 72 L68 68 L60 38 Q50 44 40 38" fill="#4a90d9" stroke="#3d7ac0" strokeWidth="1.5" />
          
          <line x1="50" y1="38" x2="50" y2="72" stroke="#3d7ac0" strokeWidth="1" strokeDasharray="3 2" />
          
          <ellipse cx="30" cy="55" rx="7" ry="8" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1.5" />
          <circle cx="25" cy="52" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          <circle cx="30" cy="50" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          <circle cx="35" cy="52" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          
          <ellipse cx="70" cy="55" rx="7" ry="8" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1.5" />
          <circle cx="65" cy="52" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          <circle cx="70" cy="50" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          <circle cx="75" cy="52" r="3" fill="#ffd6b3" stroke="#f0c5a0" strokeWidth="1" />
          
          <ellipse cx="45" cy="92" rx="8" ry="15" fill="#ff6b6b" stroke="#e65c5c" strokeWidth="1.5" />
          <ellipse cx="55" cy="92" rx="8" ry="15" fill="#ff6b6b" stroke="#e65c5c" strokeWidth="1.5" />
          
          <ellipse cx="43" cy="108" rx="5" ry="4" fill="#5a5a5a" />
          <ellipse cx="57" cy="108" rx="5" ry="4" fill="#5a5a5a" />

          {selectedPart === "head" && (
            <circle cx="50" cy="22" r="18" fill="none" stroke="#ff9f43" strokeWidth="3" strokeDasharray="4 2" />
          )}
          
          {selectedPart === "heart" && (
            <path d="M47 45 C43 41 40 44 43 49 L47 52 L51 49 C54 44 51 41 47 45" fill="#ff6b6b" stroke="#ff9f43" strokeWidth="2" />
          )}
          
          {selectedPart === "lungs" && (
            <g>
              <ellipse cx="42" cy="45" rx="8" ry="7" fill="#8ecae6" stroke="#ff9f43" strokeWidth="2" />
              <ellipse cx="58" cy="45" rx="8" ry="7" fill="#8ecae6" stroke="#ff9f43" strokeWidth="2" />
            </g>
          )}
          
          {selectedPart === "stomach" && (
            <ellipse cx="50" cy="58" rx="9" ry="7" fill="#ffe4b5" stroke="#ff9f43" strokeWidth="2" />
          )}
          
          {selectedPart === "hand" && (
            <g>
              <circle cx="30" cy="55" r="10" fill="none" stroke="#ff9f43" strokeWidth="3" />
              <circle cx="70" cy="55" r="10" fill="none" stroke="#ff9f43" strokeWidth="3" />
            </g>
          )}
        </svg>
  );
}