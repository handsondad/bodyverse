import { useState, useEffect, useMemo } from "react";
import {
  buildAgeLens,
  buildCueSheet,
  buildNextStep,
  buildReviewConclusion,
  buildTakeaways,
  getDoctorQuiz,
  getDoctorQuizGuide,
  getIllnessStages,
  getPartQuiz,
  getPartQuizGuide,
  getStoryDeepDive,
  getStoryMiniLab,
  getStoryStages,
  getTrack,
  mystery,
  parts,
  tracks
} from "./lib/content-adapter";
import { SimpleHomePage } from "./pages/SimpleHomePage";
import { OverviewPage } from "./pages/OverviewPage";
import { StoryPage } from "./pages/StoryPage";
import { SciencePage } from "./pages/SciencePage";
import { IllnessPage } from "./pages/IllnessPage";
import { AuditPage, type IssueTag } from "./pages/AuditPage";
import { useLearningOverview } from "./hooks/useLearningOverview";
import { usePersistedViewState } from "./hooks/usePersistedViewState";
import { useQuizInteractions } from "./hooks/useQuizInteractions";
import { useScienceExperiment } from "./hooks/useScienceExperiment";
import { useTimedStagePlayback } from "./hooks/useTimedStagePlayback";
import { useVoiceNarration } from "./hooks/useVoiceNarration";
import { type AgeTier, type IllnessStageSummary, type PartId, type StoryStageSummary, type TrackId } from "./types/content";

const ageTiers: AgeTier[] = ["4-6", "7-9", "10-12", "13+"];
const partIds: PartId[] = ["head", "heart", "lungs", "stomach", "hand"];
const issueTags: IssueTag[] = ["口径冲突", "年龄跳级", "流程断裂", "证据不足"];
const issueTagClassMap: Record<IssueTag, string> = {
  口径冲突: "chip-danger",
  年龄跳级: "chip-warning",
  流程断裂: "chip-primary",
  证据不足: "chip-success"
};

type AuditEntry = {
  entryId: string;
  week: string;
  part: PartId;
  age: AgeTier;
  track: TrackId;
  tag: IssueTag;
  issue: string;
  fixId: string | null;
  closed: boolean;
  deleted: boolean;
  createdAt: string;
  deletedAt?: string;
};

const auditStorageKey = "body-mystery-audit-entries";
const reportTemplateStorageKey = "body-mystery-report-template";

function getIsoWeekId(date: Date): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function makeEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function App() {
  const {
    age,
    setAge,
    selectedTrack,
    setSelectedTrack,
    selectedPart,
    setSelectedPart,
    visitedParts,
    answeredParts,
    setAnsweredParts,
    learningStats,
    setLearningStats,
    markPartVisited
  } = usePersistedViewState();
  
  const { voiceStatus, speak, stop } = useVoiceNarration(age);
  
  const {
    selectedDoctorOption,
    doctorFeedback,
    selectedPartOption,
    partFeedback,
    resetDoctorInteraction,
    resetPartInteraction,
    answerDoctorQuiz,
    answerPartQuiz
  } = useQuizInteractions({
    selectedPart,
    setLearningStats,
    setAnsweredParts
  });
  
  const { scienceInput, scienceMetrics, updateScienceInput } = useScienceExperiment({ age, setLearningStats });
  
  const [currentPage, setCurrentPage] = useState("overview");
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>(() => {
    try {
      const raw = window.localStorage.getItem(auditStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Partial<AuditEntry>[];
      if (!Array.isArray(parsed)) return [];
      return parsed.map((entry) => ({
        entryId: entry.entryId ?? makeEntryId(),
        week: entry.week ?? getIsoWeekId(new Date()),
        part: entry.part ?? "head",
        age: entry.age ?? "10-12",
        track: entry.track ?? "science",
        tag: entry.tag ?? "口径冲突",
        issue: entry.issue ?? "无",
        fixId: entry.fixId ?? null,
        closed: entry.closed ?? true,
        deleted: entry.deleted ?? false,
        createdAt: entry.createdAt ?? new Date().toISOString(),
        deletedAt: entry.deletedAt
      }));
    } catch {
      return [];
    }
  });
  const [reportTemplate, setReportTemplate] = useState<"leader" | "research">(() => {
    const saved = window.localStorage.getItem(reportTemplateStorageKey);
    return saved === "research" ? "research" : "leader";
  });

  const track = useMemo(() => getTrack(selectedTrack), [selectedTrack]);
  const partOverview = parts[selectedPart];
  const mysteryPack = mystery[selectedPart];
  const agePack = mysteryPack.ageFocus[age] as unknown as { question: string; experimentTitle: string; experimentSteps: string[]; observe: string };
  const ageLens = buildAgeLens(age, track, agePack);
  const cueSheet = buildCueSheet(age, track, mysteryPack, agePack);
  const oneLineEssence = mysteryPack.essenceByTrack?.[selectedTrack] ?? mysteryPack.perspectives[selectedTrack];
  
  const storyStages = getStoryStages(age);
  const storyPlayback = useTimedStagePlayback<StoryStageSummary["key"], StoryStageSummary>({
    enabled: selectedTrack === "story",
    steps: storyStages,
    defaultKey: "mouth",
    intervalMs: 900,
    idleStatus: "待播放",
    inactiveStatus: "请先切换到场景故事",
    playingStatus: "播放中...",
    jumpedStatus: "已切换到站点",
    completedStatus: "播放完成",
    idleDetail: "等待播放，展示每一站的过程说明。",
    getDetail: (stage) => stage.sceneText,
    onComplete: () => {
      setLearningStats((prev) => ({ ...prev, storyCompleted: true }));
    }
  });
  const storyMiniLab = getStoryMiniLab(storyPlayback.activeKey, age);
  const storyDeepDive = getStoryDeepDive(storyPlayback.activeKey, age);
  
  const illnessStages = getIllnessStages(age);
  const illnessPlayback = useTimedStagePlayback<IllnessStageSummary["key"], IllnessStageSummary>({
    enabled: selectedTrack === "illness",
    steps: illnessStages,
    defaultKey: "infection",
    intervalMs: 1050,
    idleStatus: "待播放",
    inactiveStatus: "请先切换到生病就医",
    playingStatus: "播放中...",
    jumpedStatus: "已切换到阶段",
    completedStatus: "播放完成",
    idleDetail: "等待播放或点击阶段节点查看说明。",
    getDetail: (stage) => stage.detail,
    onComplete: () => {
      setLearningStats((prev) => ({ ...prev, illnessCompleted: true }));
    }
  });
  
  const doctorQuiz = getDoctorQuiz(age, illnessPlayback.activeKey);
  const doctorGuide = getDoctorQuizGuide(age, illnessPlayback.activeKey);
  const partQuiz = getPartQuiz(age, selectedPart);
  const partGuide = getPartQuizGuide(age, selectedTrack, selectedPart);
  
  const { partLabelMap, totalParts, progressRatio, partAccuracy, doctorAccuracy } = useLearningOverview({
    partIds,
    visitedParts,
    answeredParts,
    learningStats
  });

  useEffect(() => {
    resetDoctorInteraction();
  }, [age, illnessPlayback.activeKey, resetDoctorInteraction]);

  useEffect(() => {
    markPartVisited(selectedPart);
  }, [markPartVisited, selectedPart]);

  useEffect(() => {
    resetPartInteraction();
  }, [age, selectedPart, selectedTrack, resetPartInteraction]);

  useEffect(() => {
    window.localStorage.setItem(auditStorageKey, JSON.stringify(auditEntries));
  }, [auditEntries]);

  useEffect(() => {
    window.localStorage.setItem(reportTemplateStorageKey, reportTemplate);
  }, [reportTemplate]);

  const pageTitleMap: Record<string, { title: string; subtitle: string }> = {
    overview: { title: "学习概览", subtitle: "掌握学习进度与核心知识点" },
    story: { title: "场景故事", subtitle: "体验食物在体内的奇妙旅程" },
    science: { title: "科学实验", subtitle: "探索身体的力学与生理奥秘" },
    illness: { title: "就医模拟", subtitle: "了解生病与康复的全过程" },
    audit: { title: "抽查工作台", subtitle: "管理抽查记录与生成周报" },
  };

  const currentPageInfo = pageTitleMap[currentPage] || pageTitleMap.overview;

  const handleSpeak = () => {
    speak(`${mysteryPack.title}。${oneLineEssence}。${agePack.question}`);
  };

  const [showSettings, setShowSettings] = useState(false);

  const bottomNavItems = [
    { id: "anatomy" as TrackId, label: "分层解剖", icon: "🧬" },
    { id: "story" as TrackId, label: "场景故事", icon: "📖" },
    { id: "science" as TrackId, label: "科学原理", icon: "🔬" },
    { id: "illness" as TrackId, label: "生病就医", icon: "🏥" },
  ];

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="page-header">
          <div className="page-header-title-group">
            <h2>身体奥秘探索舱</h2>
            <p className="page-header-subtitle">交互式学习系统</p>
          </div>
          <div className="user-avatar" onClick={() => setShowSettings(true)}>
            <span className="user-avatar-icon">👤</span>
          </div>
        </header>

        <SimpleHomePage
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          partLabelMap={partLabelMap}
          age={age}
          setAge={setAge}
        />
      </main>

      <nav className="bottom-nav">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${selectedTrack === item.id ? "is-active" : ""}`}
            onClick={() => setSelectedTrack(item.id)}
          >
            <span className="bottom-nav-item-icon">{item.icon}</span>
            <span className="bottom-nav-item-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>设置</h3>
              <button className="modal-close" onClick={() => setShowSettings(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>选择年龄层</label>
                <select value={age} onChange={(e) => setAge(e.target.value as AgeTier)}>
                  {ageTiers.map((tier) => (
                    <option key={tier} value={tier}>{tier} 岁</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>选择身体部位</label>
                <select value={selectedPart} onChange={(e) => setSelectedPart(e.target.value as PartId)}>
                  {partIds.map((part) => (
                    <option key={part} value={part}>{partLabelMap[part]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowSettings(false)}>
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
