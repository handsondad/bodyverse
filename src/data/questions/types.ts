import type { ScaleId } from "../../types/exploration";
import type { JourneyId } from "../journey-registry";
import type { Science } from "../journeys";

/**
 * 小念 × 爸爸：问题驱动的讲解。
 * 小念从身体的现象发问，爸爸回答；小念接着爸爸刚说的话追问，一问一答一路讲到原理。
 * 从头读到尾，就能弄懂标题里的那个问题。
 */

export type BodySystemId = "brain" | "senses" | "heart-blood" | "breathe" | "digest" | "skin" | "move" | "defend" | "grow";

export type BodySystem = {
  id: BodySystemId;
  emoji: string;
  title: string;
  color: string;
  /** 小念眼里这一类是什么 */
  kidHook: string;
  /** 爸爸眼里这一类在讲哪个系统 */
  dadLens: string;
};

export const bodySystems: readonly BodySystem[] = [
  {
    id: "brain", emoji: "🧠", title: "大脑与神经", color: "#b48cff",
    kidHook: "为什么一定要睡觉？脚怎么会麻？摔一跤为什么会疼？",
    dadLens: "神经系统：感受器发现变化，神经把信号送到脊髓和大脑，大脑再下命令"
  },
  {
    id: "senses", emoji: "👀", title: "眼耳鼻舌与平衡", color: "#ff9f43",
    kidHook: "转圈会晕、鼻塞吃饭没味道、关了灯过一会儿又能看见……",
    dadLens: "感觉系统：不同的感受器把光、声音、气味分子和身体的运动变成神经信号"
  },
  {
    id: "heart-blood", emoji: "❤️", title: "心脏与血液", color: "#ff7a8a",
    kidHook: "跑完步心怦怦跳、手腕一跳一跳、撞到会乌青、紧张会脸红。",
    dadLens: "循环系统：心脏是泵，血管是路，血液里的红细胞运送氧气"
  },
  {
    id: "breathe", emoji: "🫁", title: "鼻子与肺", color: "#6cc4ff",
    kidHook: "打喷嚏、流鼻涕、打嗝、打哈欠、跑完步大口喘气。",
    dadLens: "呼吸系统：鼻子把关，膈肌拉动肺，肺泡里交换氧气和二氧化碳"
  },
  {
    id: "digest", emoji: "🍽️", title: "嘴巴、肚子与便便", color: "#ffc75a",
    kidHook: "肚子咕咕叫、馒头越嚼越甜、打饱嗝、放屁、尿尿颜色会变。",
    dadLens: "消化与排泄：把食物拆成小分子吸收，再把用不上的东西排出去"
  },
  {
    id: "skin", emoji: "🩹", title: "皮肤、汗和伤口", color: "#ff9fbf",
    kidHook: "起鸡皮疙瘩、出汗、结痂、泡水手会皱、剪指甲不疼。",
    dadLens: "皮肤是最大的器官：挡住外面的东西、调节体温、受伤后自己修补"
  },
  {
    id: "move", emoji: "💪", title: "骨头与肌肉", color: "#6fd39a",
    kidHook: "手指怎么一节一节弯？捏豆子为什么难？运动完第二天腿好酸。",
    dadLens: "运动系统：骨头是杠杆，关节是转轴，肌肉拉着肌腱让身体动起来"
  },
  {
    id: "defend", emoji: "🛡️", title: "生病与免疫", color: "#7fb3ff",
    kidHook: "为什么会发烧？为什么要洗手、打疫苗？有人为什么会过敏？",
    dadLens: "免疫系统：皮肤和黏膜是城墙，白细胞是卫兵，还会记住打过的敌人"
  },
  {
    id: "grow", emoji: "🌱", title: "长大与生命", color: "#9ed36a",
    kidHook: "肚脐从哪来？为什么换牙？为什么像爸爸妈妈？我是从哪来的？",
    dadLens: "生长、遗传与生命：细胞分裂长大，基因从爸爸妈妈各来一半"
  }
];

/** 问题列表里从简单到复杂的排序 */
export type Difficulty = 1 | 2 | 3;
export const difficultyLabel: Record<Difficulty, string> = { 1: "入门", 2: "进阶", 3: "挑战" };

export type ShowFrame = { icon: string; label: string };

/** 爸爸讲这一段时配的东西：图解步骤、3D 放大旅程，或以后补充的图片、视频 */
export type BeatShow =
  | { kind: "steps"; frames: readonly ShowFrame[] }
  | { kind: "journey"; journey: JourneyId; stop: ScaleId; label: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; alt: string; poster?: string };

export type DialogueTurn = {
  /** 小念：第一句说现象，之后每一句都接着爸爸上一句里的说法追问；最后一句用自己的话总结 */
  nian: string;
  /** 爸爸的回答 */
  dad: string;
  show?: BeatShow;
};

export type BodyQuestion = {
  id: string;
  system: BodySystemId;
  /** 列表上显示的问题，用小念的口吻 */
  title: string;
  /** 小念刚刚遇到的事 */
  trigger: string;
  difficulty: Difficulty;
  sciences: readonly Science[];
  /** 一问一答，从现象讲到原理 */
  dialogue: readonly DialogueTurn[];
  /** 给大人：补充背景、何时就医 */
  parentTip: string;
  /** 有这一项时，需要大人确认后再打开 */
  parentGate?: string;
};
