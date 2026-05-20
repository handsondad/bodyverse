import { type AgeFocusPack, type AgeLens, type AgeTier, type QuizGuide, type Track } from "../types/content";

type LensConfig = {
  label: string;
  summary: string;
  questionMode: string;
  experimentMode: string;
  conclusionMode: string;
};

type QuizFocus = {
  question: string;
  checkpoint: string;
};

const ageLensByAge: Record<AgeTier, LensConfig> = {
  "4-6": {
    label: "现象观察型",
    summary: "先看到明显变化，再说出身体哪里在工作。",
    questionMode: "问题要具体、能直接看到。",
    experimentMode: "实验以简单动作和直接观察为主。",
    conclusionMode: "结论要能用一句生活化的话讲明白。"
  },
  "7-9": {
    label: "流程连接型",
    summary: "先找起点，再说身体是怎样一步步接力的。",
    questionMode: "问题强调前后顺序和谁影响谁。",
    experimentMode: "实验以对比和记录前后变化为主。",
    conclusionMode: "结论要说清楚流程和协同关系。"
  },
  "10-12": {
    label: "机制验证型",
    summary: "先提出变量，再看机制链路怎样解释结果。",
    questionMode: "问题要能引出变量、约束和反馈。",
    experimentMode: "实验强调控制变量和对照验证。",
    conclusionMode: "结论要能对应机制链路和观察证据。"
  },
  "13+": {
    label: "系统推理型",
    summary: "先定义系统边界，再讨论证据、模型和例外。",
    questionMode: "问题要能推动系统分析和边界讨论。",
    experimentMode: "实验强调多变量、模型化和反推解释。",
    conclusionMode: "结论要包含条件、证据和适用范围。"
  }
};

export function buildAgeLens(age: AgeTier, track: Track, agePack: AgeFocusPack): AgeLens {
  const lens = ageLensByAge[age];
  return {
    label: lens.label,
    summary: `${track.title}在 ${age} 岁层更适合用“${lens.label}”方式理解。${lens.summary}`,
    checklist: [
      `怎么问：围绕“${agePack.question}”，按“${lens.questionMode}”来组织表达。`,
      `怎么做：用“${agePack.experimentTitle}”验证，并保持“${lens.experimentMode}”。`,
      `怎么收：最后回到“${lens.conclusionMode}”，而不是只记零散知识点。`
    ]
  };
}

export function buildQuizGuide(age: AgeTier, track: Pick<Track, "title">, focus: QuizFocus): QuizGuide {
  const lens = ageLensByAge[age];
  return {
    title: `${track.title} · ${lens.label}答题法`,
    intro: `这道题不要只猜答案，要按“${lens.label}”方式回答当前检查点：${focus.question}`,
    checklist: [
      `答题前：先想清楚“${lens.questionMode}”是否已经覆盖到题目重点。`,
      `答题时：把注意力放在“${focus.checkpoint}”，不要只记表面词语。`,
      `答题后：再用“${lens.conclusionMode}”把原因完整说一遍。`
    ],
    success: `答对后，别停在答案本身，再用一句话解释为什么它符合“${lens.label}”的理解方式。`,
    retry: `如果答错了，先别急着重选，回到“${focus.checkpoint}”，按“${lens.summary}”重新判断。`
  };
}