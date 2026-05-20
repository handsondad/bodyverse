import { buildAgeLens as buildAgeLensRaw } from "../data/age-lens";
import { buildQuizGuide as buildQuizGuideRaw } from "../data/age-lens";
import { tracks as tracksRaw } from "../data/core";
import {
  buildCueSheet as buildCueSheetRaw,
  buildNextStep as buildNextStepRaw,
  buildReviewConclusion as buildReviewConclusionRaw,
  buildTakeaways as buildTakeawaysRaw
} from "../data/cue";
import { bodyMysteryByPart as mysteryRaw } from "../data/mystery";
import { partContent as partsRaw, quizBank } from "../data/part";
import {
  metricLabels,
  miniLabMetricsByStage,
  storyDeepDive,
  storySceneByAge,
  storyStageKeys,
  storyStageLabels,
  storyStagePositions
} from "../data/story";
import { scienceDefaultsByAge } from "../data/science";
import { doctorQuizByAge, illnessByAge, illnessStageKeys, illnessStageLabels } from "../data/illness";
import {
  type AgeFocusPack,
  type AgeLens,
  type AgeTier,
  type CueItem,
  type DoctorQuiz,
  type IllnessStageKey,
  type IllnessStageSummary,
  type MisconceptionPack,
  type MysteryPack,
  type PartQuiz,
  type PartId,
  type PartOverview,
  type QuizGuide,
  type ScienceComputed,
  type ScienceInputs,
  type StoryMiniLab,
  type StoryStageKey,
  type StoryStageSummary,
  type Track,
  type TrackId
} from "../types/content";

const conflictHintByTrack: Record<TrackId, string> = {
  anatomy: "结构看起来完整，不代表功能一定稳定。还要结合传力效率和反馈修正一起判断。",
  story: "流程不是分段孤立的。前段效率变化会沿链路传递，并影响后续站点负荷。",
  science: "一次实验变化不等于机制成立。结论需要变量控制、重复观察和情境一致性。",
  illness: "体感好转不等于风险清零。恢复判断要看症状轨迹、持续时间和危险信号。"
};

const misconceptionByTrack: Record<
  TrackId,
  {
    wrong: string;
    rightByAge: Record<AgeTier, string>;
  }
> = {
  anatomy: {
    wrong: "只要外观看起来正常，结构和功能就一定都正常。",
    rightByAge: {
      "4-6": "看起来没问题不等于真的没问题，还要看它能不能顺顺利利把动作做出来。",
      "7-9": "外观正常只是起点，还要检查骨骼、关节、肌肉和神经是不是在同一节奏里配合。",
      "10-12": "外观信息不能替代功能评估，动作稳定性还取决于传力链效率与反馈修正质量。",
      "13+": "结构完整性与功能可靠性应分维度评估，需综合结构约束、协同效率与误差控制能力。"
    }
  },
  story: {
    wrong: "身体流程是独立分段的，前一站基本不会影响后一站。",
    rightByAge: {
      "4-6": "身体像接力跑，前面卡住了，后面就会更难跑。",
      "7-9": "每一站都连着下一站，前段处理质量会直接影响后段压力。",
      "10-12": "生理流程是连续链路，局部效率下降通常会向后传递并可能被放大。",
      "13+": "流程系统具有级联与耦合特征，前段扰动会改变后续节点负荷并影响整体稳态。"
    }
  },
  science: {
    wrong: "一次实验数值变化就能直接下机制或医学结论。",
    rightByAge: {
      "4-6": "一个数字变了，只是一个提示，还要再看看身体有没有其他变化。",
      "7-9": "实验数字要连着当时条件一起看，不能只看一个结果就立刻下结论。",
      "10-12": "有效解释需同时核对变量控制、测量误差与背景状态，再判断机制是否成立。",
      "13+": "单次观测只能提供局部证据，结论应建立在多变量约束、可重复性与情境一致性之上。"
    }
  },
  illness: {
    wrong: "症状稍微减轻就说明已经完全恢复了。",
    rightByAge: {
      "4-6": "感觉好一点是好事，但还要继续休息和观察，不能马上当作全好了。",
      "7-9": "症状变轻不代表痊愈，还要看会不会反复、有没有新的危险信号。",
      "10-12": "恢复判断应基于持续时间、变化趋势与风险指标，而非单次体感改善。",
      "13+": "恢复评估属于动态过程，需综合症状轨迹、风险分层、干预反馈与复发概率。"
    }
  }
};

const misconceptionLevelLabelByAge: Record<AgeTier, string> = {
  "4-6": "当前纠正深度：现象级（看得见、说得出）",
  "7-9": "当前纠正深度：流程级（前后因果）",
  "10-12": "当前纠正深度：机制级（变量与链路）",
  "13+": "当前纠正深度：系统级（证据与模型）"
};

const tracks = tracksRaw as Track[];
const parts = partsRaw as Record<PartId, PartOverview>;
const mystery = mysteryRaw as Record<PartId, MysteryPack>;

export { tracks, parts, mystery };

export function buildAgeLens(age: AgeTier, track: Track, agePack: AgeFocusPack): AgeLens {
  return buildAgeLensRaw(age, track, agePack) as AgeLens;
}

export function buildCueSheet(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack): CueItem[] {
  return buildCueSheetRaw(age, track, partPack, agePack) as CueItem[];
}

export function buildTakeaways(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack): string[] {
  return buildTakeawaysRaw(track, partPack, agePack, age) as string[];
}

export function buildReviewConclusion(age: AgeTier, track: Track, partPack: MysteryPack): string {
  return buildReviewConclusionRaw(age, track, partPack) as string;
}

export function buildNextStep(track: Track, age: AgeTier): string {
  return buildNextStepRaw(track, age) as string;
}

export function getTrack(id: TrackId): Track {
  return tracks.find((track) => track.id === id) ?? tracks[0];
}

export function buildMisconception(trackId: TrackId, age: AgeTier): MisconceptionPack {
  const trackPack = misconceptionByTrack[trackId];
  return {
    level: misconceptionLevelLabelByAge[age],
    wrong: trackPack.wrong,
    right: trackPack.rightByAge[age],
    conflictHint: conflictHintByTrack[trackId]
  };
}

export function getStoryStages(age: AgeTier): StoryStageSummary[] {
  return storyStageKeys.map((key, index) => ({
    key: key as StoryStageKey,
    label: storyStageLabels[key as StoryStageKey],
    position: storyStagePositions[index],
    sceneText: storySceneByAge[age][index]
  }));
}

export function getStoryDeepDive(stageKey: StoryStageKey, age: AgeTier): string[] {
  return storyDeepDive[stageKey][age] as string[];
}

export function getStoryMiniLab(stageKey: StoryStageKey, age: AgeTier): StoryMiniLab {
  const metrics = miniLabMetricsByStage[stageKey][age] as number[];
  return {
    title: `小实验：${storyStageLabels[stageKey]} 指标变化`,
    hint: `当前年龄层 ${age} 岁，下面是模拟指标。`,
    metrics: metricLabels.map((label, index) => ({
      label,
      value: metrics[index]
    }))
  };
}

export function getScienceDefaults(age: AgeTier): ScienceInputs {
  return scienceDefaultsByAge[age] as ScienceInputs;
}

export function calculateScienceMetrics(input: ScienceInputs): ScienceComputed {
  const mechanicalAdvantage = input.effortArm / Math.max(1, input.loadArm);
  const requiredForce = input.loadWeight / mechanicalAdvantage;
  const leverEfficiency = Math.min(100, Math.round((mechanicalAdvantage / 3) * 100));
  const cardiacOutput = (input.heartRate * input.strokeVolume) / 1000;
  const pressureIndex = Math.round((cardiacOutput * input.vascularResistance) / 8);
  const normalizedPressure = Math.max(0, Math.min(100, pressureIndex));

  return {
    mechanicalAdvantage,
    requiredForce,
    leverEfficiency,
    cardiacOutput,
    pressureIndex,
    normalizedPressure
  };
}

export function getIllnessStages(age: AgeTier): IllnessStageSummary[] {
  return illnessStageKeys.map((key) => ({
    key: key as IllnessStageKey,
    label: illnessStageLabels[key as IllnessStageKey],
    detail: illnessByAge[age][key as IllnessStageKey]
  }));
}

export function getDoctorQuiz(age: AgeTier, stageKey: IllnessStageKey): DoctorQuiz {
  return doctorQuizByAge[age][stageKey] as DoctorQuiz;
}

export function getDoctorQuizGuide(age: AgeTier, stageKey: IllnessStageKey): QuizGuide {
  const quiz = getDoctorQuiz(age, stageKey);
  return buildQuizGuideRaw(
    age,
    { title: "生病就医" },
    {
      question: quiz.question,
      checkpoint: illnessStageLabels[stageKey]
    }
  ) as QuizGuide;
}

export function getPartQuiz(age: AgeTier, partId: PartId): PartQuiz {
  return quizBank[partId][age] as PartQuiz;
}

export function getPartQuizGuide(age: AgeTier, trackId: TrackId, partId: PartId): QuizGuide {
  const track = getTrack(trackId);
  const quiz = getPartQuiz(age, partId);
  const agePack = mystery[partId].ageFocus[age];

  return buildQuizGuideRaw(
    age,
    track,
    {
      question: quiz.question,
      checkpoint: agePack.question
    }
  ) as QuizGuide;
}
