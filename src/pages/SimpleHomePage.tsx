import { useState } from "react";
import { type PartId, type TrackId } from "../types/content";
import { HumanBodyMap } from "../components/HumanBodyMap";
import { mystery } from "../lib/content-adapter";

const trackIcons: Record<TrackId, string> = {
  anatomy: "🧬",
  story: "📖",
  science: "🔬",
  illness: "🏥",
};

const trackTitles: Record<TrackId, string> = {
  anatomy: "分层解剖",
  story: "场景故事",
  science: "科学原理",
  illness: "生病就医",
};

const trackColors: Record<TrackId, string> = {
  anatomy: "rgba(166, 108, 255, 0.15)",
  story: "rgba(255, 159, 67, 0.15)",
  science: "rgba(107, 203, 119, 0.15)",
  illness: "rgba(77, 150, 255, 0.15)",
};

type SimpleHomePageProps = {
  selectedPart: PartId;
  setSelectedPart: (part: PartId) => void;
  selectedTrack: TrackId;
  setSelectedTrack: (track: TrackId) => void;
  partLabelMap: Record<PartId, string>;
  age: string;
};

export function SimpleHomePage(props: SimpleHomePageProps) {
  const { selectedPart, setSelectedPart, selectedTrack, setSelectedTrack, partLabelMap, age } = props;

  const currentMystery = mystery[selectedPart];
  const essence = currentMystery.essenceByTrack?.[selectedTrack] || currentMystery.perspectives[selectedTrack];
  const perspective = currentMystery.perspectives[selectedTrack];

  const agePack = currentMystery.ageFocus[age as keyof typeof currentMystery.ageFocus];

  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="simple-home">
      <div className="home-section body-section">
        <div className="section-header">
          <h2 className="section-title">
            👋 你好，小探险家！
          </h2>
          <p className="section-subtitle">选择一个身体部位开始探索吧！</p>
        </div>
        <HumanBodyMap
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
          partLabelMap={partLabelMap}
        />
      </div>

      <div className="home-section content-section">
        <div className="mystery-card">
          <div className="mystery-decoration">✨</div>
          <div className="mystery-title">
            {partLabelMap[selectedPart]}的奥秘
          </div>
          <div className="mystery-content">
            {essence}
          </div>
          <div className="mystery-sparkles">
            <span className="sparkle">⭐</span>
            <span className="sparkle" style={{ animationDelay: "0.3s" }}>✨</span>
            <span className="sparkle" style={{ animationDelay: "0.6s" }}>🌟</span>
          </div>
        </div>

        <div 
          className="essence-card track-card"
          onClick={() => toggleCard("track")}
          style={{ cursor: "pointer" }}
        >
          <div className="essence-header">
            <div className="essence-icon" style={{ backgroundColor: trackColors[selectedTrack] }}>
              {trackIcons[selectedTrack]}
            </div>
            <div className="essence-title-row">
              <div className="essence-title">{trackTitles[selectedTrack]}</div>
              <span className="expand-icon">{expandedCard === "track" ? "▼" : "▶"}</span>
            </div>
          </div>
          <div className="essence-text">
            {perspective}
          </div>
          {expandedCard === "track" && (
            <div className="track-options">
              {Object.entries(trackIcons).map(([key, icon]) => (
                <button
                  key={key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTrack(key as TrackId);
                  }}
                  className={`track-option-btn ${selectedTrack === key ? "is-active" : ""}`}
                >
                  <span className="track-option-icon">{icon}</span>
                  <span className="track-option-label">{trackTitles[key as TrackId]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {agePack && (
          <div className="essence-card question-card">
            <div className="essence-header">
              <div className="essence-icon" style={{ backgroundColor: "rgba(255, 152, 0, 0.15)" }}>
                🎯
              </div>
              <div className="essence-title">探索问题</div>
            </div>
            <div className="essence-text question-text">
              <strong>"{agePack.question}"</strong>
            </div>
          </div>
        )}

        {agePack && agePack.experimentTitle && (
          <div 
            className="essence-card experiment-card"
            onClick={() => toggleCard("experiment")}
            style={{ cursor: "pointer" }}
          >
            <div className="essence-header">
              <div className="essence-icon" style={{ backgroundColor: "rgba(96, 165, 250, 0.15)" }}>
                🧪
              </div>
              <div className="essence-title-row">
                <div className="essence-title">{agePack.experimentTitle}</div>
                <span className="expand-icon">{expandedCard === "experiment" ? "▼" : "▶"}</span>
              </div>
            </div>
            {expandedCard === "experiment" && (
              <>
                <ul className="experiment-steps">
                  {agePack.experimentSteps.map((step, index) => (
                    <li key={index} className="experiment-step">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="observe-tip">
                  💡 <strong>观察一下：</strong>{agePack.observe}
                </div>
              </>
            )}
          </div>
        )}

        <div className="fun-facts-card">
          <div className="fun-facts-header">
            <span className="fun-facts-icon">🎈</span>
            <span className="fun-facts-title">趣味小知识</span>
          </div>
          <div className="fun-facts-content">
            {currentMystery.funFacts && currentMystery.funFacts.length > 0 ? (
              <div className="fun-facts-list">
                {currentMystery.funFacts.slice(0, 2).map((fact, index) => (
                  <div key={index} className="fun-fact-item">
                    <span className="fact-bullet">🌟</span>
                    <span className="fact-text">{fact}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-facts">点击不同的身体部位发现更多有趣知识！</p>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .section-header {
          text-align: center;
          margin-bottom: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(255, 217, 61, 0.1), rgba(255, 159, 67, 0.05));
          border-radius: 20px;
          border: 2px solid rgba(255, 217, 61, 0.2);
        }
        
        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #5d4e37;
          margin: 0 0 8px;
          font-family: 'Comic Neue', cursive;
        }
        
        .section-subtitle {
          font-size: 0.95rem;
          color: #8b7a5c;
          margin: 0;
        }
        
        .mystery-card {
          position: relative;
          overflow: hidden;
        }
        
        .mystery-decoration {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 1.5rem;
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .mystery-sparkles {
          position: absolute;
          bottom: 12px;
          left: 16px;
          display: flex;
          gap: 8px;
        }
        
        .sparkle {
          font-size: 1rem;
          animation: float-up 2s ease-in-out infinite;
        }
        
        .essence-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .expand-icon {
          font-size: 0.75rem;
          color: #b8a88a;
          transition: transform 0.3s ease;
        }
        
        .track-card:hover {
          transform: translateX(4px);
        }
        
        .track-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 2px dashed #ffe0cc;
        }
        
        .track-option-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255, 240, 230, 0.5);
          border: 2px solid #ffe0cc;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Comic Neue', cursive;
          color: #8b7a5c;
        }
        
        .track-option-btn:hover {
          border-color: #ff9f43;
          transform: translateY(-2px);
        }
        
        .track-option-btn.is-active {
          background: linear-gradient(135deg, rgba(255, 159, 67, 0.15), rgba(255, 111, 107, 0.1));
          border-color: #ff9f43;
          color: #ff9f43;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 159, 67, 0.2);
        }
        
        .track-option-icon {
          font-size: 1.3rem;
        }
        
        .track-option-label {
          font-weight: 700;
        }
        
        .question-card {
          background: linear-gradient(145deg, #fff9e8, #fff5e0);
          border-color: rgba(255, 217, 61, 0.3);
        }
        
        .question-text {
          font-size: 1.05rem;
          color: #5d4e37;
        }
        
        .experiment-card {
          background: linear-gradient(145deg, #f0f8ff, #e8f4ff);
          border-color: rgba(96, 165, 250, 0.3);
        }
        
        .experiment-steps {
          margin: 16px 0 0;
          padding-left: 0;
          list-style: none;
        }
        
        .experiment-step {
          display: flex;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          margin-bottom: 8px;
          border: 1px solid #e0f0ff;
        }
        
        .step-number {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #4d96ff, #6bcb77);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        
        .step-text {
          color: #5d4e37;
          font-size: 0.95rem;
        }
        
        .observe-tip {
          margin-top: 16px;
          padding: 12px 14px;
          background: rgba(255, 217, 61, 0.1);
          border-radius: 12px;
          color: #5d4e37;
          font-size: 0.95rem;
          border-left: 4px solid #ffd93d;
        }
        
        .fun-facts-card {
          background: linear-gradient(135deg, rgba(166, 108, 255, 0.08), rgba(255, 102, 210, 0.05));
          border: 2px solid rgba(166, 108, 255, 0.2);
          border-radius: 24px;
          padding: 20px;
          margin-top: 8px;
        }
        
        .fun-facts-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        
        .fun-facts-icon {
          font-size: 1.4rem;
        }
        
        .fun-facts-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #5d4e37;
          font-family: 'Comic Neue', cursive;
        }
        
        .fun-facts-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .fun-fact-item {
          display: flex;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
        }
        
        .fact-bullet {
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .fact-text {
          color: #5d4e37;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .no-facts {
          color: #b8a88a;
          font-size: 0.95rem;
          text-align: center;
          margin: 0;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes float-up {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}