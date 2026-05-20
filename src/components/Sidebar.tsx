import { type AgeTier, type PartId, type TrackId } from "../types/content";

type SidebarProps = {
  ageTiers: AgeTier[];
  age: AgeTier;
  setAge: (age: AgeTier) => void;
  tracks: Array<{ id: TrackId; title: string; description: string }>;
  selectedTrack: TrackId;
  setSelectedTrack: (track: TrackId) => void;
  partIds: PartId[];
  selectedPart: PartId;
  setSelectedPart: (part: PartId) => void;
  partLabelMap: Record<PartId, string>;
  currentPage: string;
  onPageChange: (page: string) => void;
};

const navItems = [
  { id: "overview", label: "学习概览", icon: "📊" },
  { id: "story", label: "场景故事", icon: "🎬" },
  { id: "science", label: "科学实验", icon: "🔬" },
  { id: "illness", label: "就医模拟", icon: "🏥" },
  { id: "audit", label: "抽查工作台", icon: "📋" },
];

export function Sidebar(props: SidebarProps) {
  const {
    ageTiers,
    age,
    setAge,
    tracks,
    selectedTrack,
    setSelectedTrack,
    partIds,
    selectedPart,
    setSelectedPart,
    partLabelMap,
    currentPage,
    onPageChange,
  } = props;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>身体奥秘探索舱</h1>
        <p>交互式学习系统</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? "is-active" : ""}`}
            onClick={() => onPageChange(item.id)}
          >
            <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-section-title">年龄层</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 4px" }}>
            {ageTiers.map((tier) => (
              <button
                key={tier}
                className={`nav-item ${age === tier ? "is-active" : ""}`}
                onClick={() => setAge(tier)}
              >
                <span>{tier} 岁</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-section-title">学习部位</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 4px" }}>
            {partIds.map((partId) => (
              <button
                key={partId}
                className={`nav-item ${selectedPart === partId ? "is-active" : ""}`}
                onClick={() => setSelectedPart(partId)}
              >
                <span>{partLabelMap[partId]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-section-title">学习主线</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 4px" }}>
            {tracks.map((track) => (
              <button
                key={track.id}
                className={`nav-item ${selectedTrack === track.id ? "is-active" : ""}`}
                onClick={() => setSelectedTrack(track.id)}
              >
                <span>{track.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
