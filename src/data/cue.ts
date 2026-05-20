import { type AgeFocusPack, type AgeTier, type CueItem, type MysteryPack, type Track, type TrackId } from "../types/content";

type CueOptions = {
  conflictHint?: string;
};

type NarrationItem = CueItem & {
  narration: string;
};

type BeatItem = {
  time: string;
  shot: string;
};

type VoiceItem = {
  text: string;
  pause: string;
};

type TrackMemoryFn = (partTitle: string) => string;

export const ageDepthByAge: Record<AgeTier, string> = {
  "4-6": "用看得见、摸得着的方式理解身体变化。",
  "7-9": "开始建立前后顺序和接力关系。",
  "10-12": "重点理解机制链路和变量影响。",
  "13+": "把现象提升为系统分析和模型理解。"
};

const ageSummaryPrefix: Record<AgeTier, string> = {
  "4-6": "像讲故事一样记住：",
  "7-9": "用接力流程来记：",
  "10-12": "用机制链路来记：",
  "13+": "用系统模型来记："
};

const trackMemoryById: Record<TrackId, Record<AgeTier, TrackMemoryFn>> = {
  anatomy: {
    "4-6": (partTitle) => `${partTitle}像一个小团队一起工作，不是一个零件自己完成。`,
    "7-9": (partTitle) => `${partTitle}要看骨骼、关节、肌肉和神经怎么接力配合。`,
    "10-12": (partTitle) => `${partTitle}动作质量由结构约束、传力路径和反馈控制共同决定。`,
    "13+": (partTitle) => `${partTitle}应理解为结构-控制耦合系统，而不是单结构决定论。`
  },
  story: {
    "4-6": (partTitle) => `${partTitle}像闯关接力，前一站没做好，后一站会更辛苦。`,
    "7-9": (partTitle) => `${partTitle}要沿流程看前后顺序，站点间是连续影响关系。`,
    "10-12": (partTitle) => `${partTitle}的流程具备级联特征，局部效率下降会向后传递。`,
    "13+": (partTitle) => `${partTitle}应放入完整过程网络，关注扰动传播与系统稳态。`
  },
  science: {
    "4-6": (partTitle) => `${partTitle}要看“变了什么”，再说“为什么会变”。`,
    "7-9": (partTitle) => `${partTitle}要把实验现象和身体反应一步步连起来。`,
    "10-12": (partTitle) => `${partTitle}需要用变量、过程与结果对应来验证解释。`,
    "13+": (partTitle) => `${partTitle}要通过变量建模与证据约束完成机制解释。`
  },
  illness: {
    "4-6": (partTitle) => `${partTitle}不舒服时要看信号变化，不能只看一会儿感觉。`,
    "7-9": (partTitle) => `${partTitle}相关症状要结合持续时间和趋势判断。`,
    "10-12": (partTitle) => `${partTitle}风险判断需要“症状强度 + 时间 + 危险信号”一起看。`,
    "13+": (partTitle) => `${partTitle}应采用动态风险分层，而非单次体感判断。`
  }
};

const reviewConclusionByTrack: Record<TrackId, Record<AgeTier, TrackMemoryFn>> = {
  anatomy: {
    "4-6": (partTitle) => `分层解剖结论：${partTitle}是很多小伙伴一起配合，不是一个地方单独在动。`,
    "7-9": (partTitle) => `分层解剖结论：${partTitle}要按“结构-传力-控制”接力关系理解，缺一环动作都会受影响。`,
    "10-12": (partTitle) => `分层解剖结论：${partTitle}的动作质量由结构约束、传力效率与反馈校正共同决定。`,
    "13+": (partTitle) => `分层解剖结论：${partTitle}属于结构力学与神经控制耦合系统，应以整体模型评估其稳定性与效率。`
  },
  story: {
    "4-6": (partTitle) => `场景故事结论：${partTitle}像接力赛，前面做不好，后面会更难。`,
    "7-9": (partTitle) => `场景故事结论：${partTitle}必须放在完整流程里看，每一站都会影响下一站。`,
    "10-12": (partTitle) => `场景故事结论：${partTitle}存在级联影响，局部效率变化会沿链路传递并放大。`,
    "13+": (partTitle) => `场景故事结论：${partTitle}应以系统流程视角分析扰动传播、反馈调节与稳态变化。`
  },
  science: {
    "4-6": (partTitle) => `科学原理结论：${partTitle}要先看现象，再说原因，不能只背答案。`,
    "7-9": (partTitle) => `科学原理结论：${partTitle}要把“条件变化-身体反应-结果变化”连起来理解。`,
    "10-12": (partTitle) => `科学原理结论：${partTitle}的解释需由变量控制与机制证据共同支持。`,
    "13+": (partTitle) => `科学原理结论：${partTitle}应在多变量约束下进行机制建模，单次观测仅构成局部证据。`
  },
  illness: {
    "4-6": (partTitle) => `生病就医结论：${partTitle}不舒服时要持续观察，感觉好一点也不能马上大意。`,
    "7-9": (partTitle) => `生病就医结论：${partTitle}相关症状要看“持续多久、有没有变重、有没有危险信号”。`,
    "10-12": (partTitle) => `生病就医结论：${partTitle}判断应结合强度、时长和风险指标，避免单点体感误判。`,
    "13+": (partTitle) => `生病就医结论：${partTitle}需采用动态风险分层与证据更新策略，及时评估优于被动等待。`
  }
};

export function buildCueSheet(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack, options: CueOptions = {}): CueItem[] {
  const mechanismFocus = options.conflictHint
    ? `${ageDepthByAge[age]} 同时记住：${options.conflictHint}`
    : `${track.title}这一步，重点是${ageDepthByAge[age]}`;
  const reviewConclusion = buildReviewConclusion(age, track, partPack);

  return [
    { phase: "00-06s", title: "进入主题", text: partPack.intro },
    { phase: "06-12s", title: "锁定主线", text: partPack.perspectives[track.id] },
    { phase: "12-18s", title: "机制聚焦", text: mechanismFocus },
    { phase: "18-24s", title: "验证问题", text: `围绕“${agePack.question}”展开，并用“${agePack.experimentTitle}”验证。` },
    { phase: "24-30s", title: "回到结论", text: `回到同一口径：${reviewConclusion}` }
  ];
}

export function buildNarrationScript(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack, options: CueOptions = {}): NarrationItem[] {
  return buildCueSheet(age, track, partPack, agePack, options).map((cue) => ({
    ...cue,
    narration: `${cue.title}：${cue.text}`
  }));
}

export function buildBeatScript(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack, options: CueOptions = {}): BeatItem[] {
  return buildCueSheet(age, track, partPack, agePack, options).map((cue) => ({
    time: cue.phase,
    shot: `${cue.title}：${cue.text}`
  }));
}

export function buildVoiceScript(age: AgeTier, track: Track, partPack: MysteryPack, agePack: AgeFocusPack, options: CueOptions = {}): VoiceItem[] {
  const pauses = ["0.4s", "0.4s", "0.5s", "0.5s", "0.6s"];

  return buildNarrationScript(age, track, partPack, agePack, options).map((cue, index) => ({
    text: cue.narration,
    pause: pauses[index] || "0.4s"
  }));
}

export function buildTakeaways(track: Track, partPack: MysteryPack, agePack: AgeFocusPack, age: AgeTier): string[] {
  const trackMemoryPack = trackMemoryById[track.id];
  const trackMemory = trackMemoryPack[age] || ((partTitle: string) => `${partTitle}要放在系统协同中理解。`);
  const prefix = ageSummaryPrefix[age] || "这轮要记住：";

  return [
    `${prefix}${trackMemory(partPack.title)}`,
    `${partPack.title}的本轮核心提醒：${partPack.intro}`,
    `这一轮最值得记住的观察结论：${agePack.observe}`
  ];
}

export function buildReviewConclusion(age: AgeTier, track: Track, partPack: MysteryPack): string {
  const makerPack = reviewConclusionByTrack[track.id];
  const maker = makerPack[age];
  if (maker) return maker(partPack.title);
  return `${track.title}这条主线在 ${age} 岁层级下的正式结论是：${partPack.title}需要放在身体系统协同中理解，而不是孤立看一个点。`;
}

export function buildNextStep(track: Track, age: AgeTier): string {
  const lastStep = track.steps[track.steps.length - 1];
  return `当前这一轮完成后，下一步优先回看“${lastStep}”，并再切换一个年龄层（当前 ${age} 岁）对照同一身体奥秘的表达深度。`;
}