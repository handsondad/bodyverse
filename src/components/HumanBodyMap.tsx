import { type PartId } from "../types/content";

const bodyParts: Array<{ id: PartId; label: string; x: number; y: number }> = [
  { id: "head", label: "头部与感知", x: 50, y: 8 },
  { id: "heart", label: "心脏与循环", x: 50, y: 35 },
  { id: "lungs", label: "肺部与呼吸", x: 50, y: 28 },
  { id: "stomach", label: "胃部与消化", x: 50, y: 52 },
  { id: "hand", label: "手部动作", x: 25, y: 38 },
];

type HumanBodyMapProps = {
  selectedPart: PartId;
  onPartSelect: (part: PartId) => void;
  partLabelMap: Record<PartId, string>;
};

export function HumanBodyMap(props: HumanBodyMapProps) {
  const { selectedPart, onPartSelect, partLabelMap } = props;

  return (
    <div className="body-map-container">
      <div className="body-map">
        <svg viewBox="0 0 100 120" className="body-svg">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <ellipse cx="50" cy="12" rx="10" ry="12" fill="#fbbf24" />
          
          <path
            d="M40 24 Q50 20 60 24 L65 35 L68 50 L65 65 Q60 80 50 85 Q40 80 35 65 L32 50 L35 35 Z"
            fill="url(#bodyGradient)"
            stroke="#1e40af"
            strokeWidth="0.5"
          />
          
          <path
            d="M35 35 Q20 40 15 55"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M65 35 Q80 40 85 55"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M35 65 Q25 80 30 95"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M65 65 Q75 80 70 95"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {bodyParts.map((part) => (
            <g key={part.id}>
              <circle
                cx={part.x}
                cy={part.y}
                r="6"
                fill={selectedPart === part.id ? "#10b981" : "#ffffff"}
                stroke={selectedPart === part.id ? "#059669" : "#60a5fa"}
                strokeWidth="2"
                filter={selectedPart === part.id ? "url(#glow)" : ""}
                className="part-node"
                onClick={() => onPartSelect(part.id)}
              />
              <text
                x={part.x}
                y={part.y + 12}
                textAnchor="middle"
                fontSize="4"
                fill={selectedPart === part.id ? "#10b981" : "#374151"}
                fontWeight="600"
                className="part-label"
              >
                {partLabelMap[part.id]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="body-map-legend">
        <div className="legend-title">点击身体部位开始探索</div>
        <div className="legend-items">
          {bodyParts.map((part) => (
            <button
              key={part.id}
              className={`legend-item ${selectedPart === part.id ? "is-active" : ""}`}
              onClick={() => onPartSelect(part.id)}
            >
              <span className="legend-dot" style={{ backgroundColor: selectedPart === part.id ? "#10b981" : "#60a5fa" }} />
              <span>{partLabelMap[part.id]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}