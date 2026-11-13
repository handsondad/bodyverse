import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "stomach-growl",
    scenes: [
      {
        turn: 0,
        title: "咕噜声从哪来",
        view: "belly",
        layers: [
          { layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 },
          { layer: "largeIntestine", opacity: 0.5 }, { layer: "smallIntestine", motion: "churn", rate: 0.6 }, { layer: "stomach", motion: "churn", rate: 0.6 }
        ],
        camera: [{ t: 0, at: [610, 420], zoom: 1.2 }],
        duration: 9,
        cues: [
          { kind: "label", at: "stomach", text: "胃", from: 0.4 },
          { kind: "label", at: "smallIntestine", text: "肠子", from: 1 },
          { kind: "text", at: [600, 110], text: "一挤一挤往前推", size: "s", from: 1.8, to: 4.6 },
          { kind: "flow", path: ["stomach", [553, 262], [540, 320], "smallIntestine", [700, 560], [520, 620]], color: "#b9c4cf", from: 2.6, count: 8, speed: 180, size: 12 },
          { kind: "flow", path: ["stomach", [553, 262], [540, 320], "smallIntestine", [700, 560], [520, 620]], icon: "💧", from: 3, count: 3, speed: 180, size: 8 },
          { kind: "text", at: [600, 110], text: "咕噜——", size: "l", color: "#e5484d", from: 5.2 }
        ]
      },
      {
        turn: 1,
        title: "像挤牙膏一样",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 450], size: [1000, 160], color: "#ffd9b0", from: 0.3 },
          { kind: "sprite", icon: "🍚", path: [[300, 450], [1000, 450]], from: 1, travel: 6, size: 60 },
          { kind: "shape", shape: "rect", at: [230, 450], size: [44, 210], color: "#e5484d", motion: "shrink", over: 1, from: 1.4, to: 3.8 },
          { kind: "text", at: [300, 640], text: "后面一圈收紧", size: "s", from: 1.8, to: 3.8 },
          { kind: "arrow", path: [[380, 300], [640, 300]], text: "往前推", from: 2.4, to: 4.6 },
          { kind: "shape", shape: "rect", at: [520, 450], size: [44, 210], color: "#e5484d", motion: "shrink", over: 1, from: 4, to: 6 },
          { kind: "shape", shape: "rect", at: [800, 450], size: [44, 210], color: "#e5484d", motion: "shrink", over: 1, from: 5.8 },
          { kind: "text", at: [600, 160], text: "蠕动", size: "l", color: "#ff7a2f", from: 7.2 }
        ]
      },
      {
        turn: 2,
        title: "吃饱和饿了",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [330, 430], size: [300, 300], color: "#ffc75a", text: "塞满饭", from: 0.3 },
          { kind: "text", at: [330, 650], text: "声音被闷住", size: "s", color: "#7a6a55", from: 1.2 },
          { kind: "shape", shape: "circle", at: [870, 430], size: [300, 300], color: "#eef2f6", outline: true, from: 3 },
          { kind: "flow", path: [[780, 500], [870, 360], [960, 500], [780, 500]], color: "#b9c4cf", from: 3.6, count: 6, speed: 160, size: 16 },
          { kind: "sprite", icon: "💧", path: [[870, 500]], from: 4.2, size: 50, wobble: true },
          { kind: "text", at: [870, 650], text: "咕噜咕噜！", size: "m", color: "#e5484d", from: 5 }
        ]
      },
      {
        turn: 3,
        title: "空肚子大扫除",
        view: "belly",
        layers: [
          { layer: "skin", opacity: 0.35 },
          { layer: "largeIntestine", motion: "churn", rate: 1 }, { layer: "smallIntestine", motion: "churn", rate: 1 }, { layer: "stomach", motion: "churn", rate: 1 }
        ],
        camera: [{ t: 0, at: [610, 450], zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "⏰", path: [[300, 220]], from: 0.3, to: 2.6, size: 70, wobble: true },
          { kind: "text", at: [600, 110], text: "好久没吃了", size: "s", from: 0.6, to: 2.6 },
          { kind: "sprite", icon: "🧹", path: ["stomach", [553, 262], "smallIntestine", [460, 720], "colonEnd"], from: 2.6, travel: 4, size: 64 },
          { kind: "flow", path: ["stomach", [553, 262], "smallIntestine", [460, 720], "colonEnd"], color: "#b9c4cf", from: 2.9, to: 7, count: 10, speed: 320, size: 12 },
          { kind: "text", at: [600, 110], text: "这阵最响！", size: "l", color: "#e5484d", from: 5, to: 7 },
          { kind: "sprite", icon: "🍚", path: [[640, 40], "stomach"], from: 7.2, travel: 0.8, size: 56 },
          { kind: "text", at: [600, 110], text: "开饭：停止大扫除", size: "s", color: "#2f7d32", from: 7.8 }
        ]
      },
      {
        turn: 4,
        title: "肠子的第二大脑",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, { layer: "largeIntestine", opacity: 0.5 }, "smallIntestine"],
        camera: [{ t: 0, at: "smallIntestine", zoom: 2.4 }, { t: 2.6, at: "smallIntestine", zoom: 2.4 }, { t: 3.8, at: [600, 230], zoom: 2.1 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "smallIntestine", color: "#b48cff", from: 0.4, to: 3 },
          { kind: "shape", shape: "circle", at: "smallIntestine", size: [110, 130], color: "rgba(180,140,255,0.18)", outline: true, motion: "pulse", from: 0.8 },
          { kind: "label", at: "smallIntestine", text: "肠里的神经网", side: "right", color: "#7a4fd6", from: 1.2, to: 5.4 },
          { kind: "label", at: "brain", text: "大脑", side: "right", from: 3.8 },
          { kind: "flow", path: ["brainstem", [612, 200], "smallIntestine"], color: "#b48cff", from: 4.4, count: 6, speed: 160, size: 4 },
          { kind: "flow", path: ["smallIntestine", [596, 200], "brainstem"], color: "#ffcf3f", from: 4.8, count: 6, speed: 160, size: 4 },
          { kind: "sprite", icon: "😰", path: [{ a: "smallIntestine", dx: -80, dy: -30 }], from: 6.4, size: 30 },
          { kind: "text", at: [600, 800], text: "一紧张，肚子就闹", size: "s", from: 6.8 }
        ]
      },
      {
        turn: 5,
        title: "饥饿素报信",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, { layer: "heart", opacity: 0.7 }, { layer: "arteries", opacity: 0.4 }, "stomach"],
        camera: [{ t: 0, at: "stomach", zoom: 2.4 }, { t: 1.6, at: "stomach", zoom: 2.4 }, { t: 3, at: [605, 190], zoom: 2 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "stomach", from: 0.4, to: 3 },
          { kind: "label", at: "stomach", text: "胃空了一阵", side: "right", from: 0.7, to: 3.4 },
          { kind: "flow", path: ["stomach", "heart", "carotid", "hypothalamus"], color: "#b48cff", from: 1.6, to: 5.8, count: 7, speed: 120, size: 4 },
          { kind: "label", at: "heart", text: "饥饿素随血走", side: "left", color: "#7a4fd6", from: 2.2, to: 4.8 },
          { kind: "pulse", at: "hypothalamus", color: "#b48cff", radius: 40, from: 3.6 },
          { kind: "text", at: [600, 820], text: "该吃饭了！", size: "m", color: "#e5484d", from: 4.2 },
          { kind: "sprite", icon: "🍚", path: [{ a: "stomach", dx: 60, dy: 0 }], from: 6, size: 30 },
          { kind: "meter", at: [930, 140], label: "饥饿素", start: 0.9, end: 0.15, color: "#b48cff", from: 6.4, over: 2 }
        ]
      }
    ]
  },
  {
    question: "chew-sweet",
    scenes: [
      {
        turn: 0,
        title: "越嚼越甜",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "skeleton", opacity: 0.35 }, "mouth", "teeth"],
        camera: [{ t: 0, at: "tongue", zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🍞", path: [[110, 620], "teeth"], from: 0.3, travel: 1.2, to: 3.4, size: 60 },
          { kind: "highlight", at: "parotid", color: "#4fb6ff", from: 1.2, to: 3.6 },
          { kind: "label", at: "parotid", text: "口水", side: "top", color: "#2a7fc1", from: 1.4 },
          { kind: "flow", path: ["parotid", [450, 690], "tongue"], color: "#8fd3ff", from: 1.8, count: 6, speed: 110, size: 9 },
          { kind: "meter", at: [900, 130], label: "甜味", start: 0, end: 0.9, color: "#ffc75a", from: 2.6, over: 3.5 },
          { kind: "myth", wrong: "馒头里藏了糖", right: "是口水把馒头变甜的", from: 5 }
        ]
      },
      {
        turn: 1,
        title: "淀粉是糖链子",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🍞", path: [[200, 300]], from: 0.3, size: 110 },
          { kind: "text", at: [200, 430], text: "淀粉", size: "m", from: 0.8 },
          { kind: "arrow", path: [[290, 330], [420, 440]], text: "放大看", from: 1.4, to: 3.2 },
          { kind: "shape", shape: "pill", at: [720, 500], size: [680, 100], color: "#fff3d6", outline: true, from: 2.2 },
          { kind: "flow", path: [[400, 500], [1040, 500]], color: "#ffc75a", from: 2.6, count: 9, speed: 0, size: 26 },
          { kind: "text", at: [720, 640], text: "小糖手拉手", size: "s", from: 3.6 },
          { kind: "sprite", icon: "😐", path: [[720, 780]], from: 5.6, size: 70 }
        ]
      },
      {
        turn: 2,
        title: "甜味小开关",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 640], size: [260, 120], color: "#ffb3c1", text: "甜味开关", from: 0.3 },
          { kind: "sprite", icon: "🟡🟡", path: [[220, 240], [600, 560]], from: 1, travel: 1.4, to: 4.2, size: 44 },
          { kind: "pulse", at: [600, 640], color: "#2f7d32", radius: 120, from: 2.4, to: 4.2 },
          { kind: "text", at: [900, 640], text: "甜！", size: "l", color: "#2f7d32", from: 2.6, to: 4.2 },
          { kind: "sprite", icon: "🟡🟡🟡🟡🟡🟡🟡", path: [[600, 200], [600, 520], [600, 380]], from: 4.6, travel: 1.8, size: 44 },
          { kind: "text", at: [600, 250], text: "太大，碰不开", size: "s", color: "#7a6a55", from: 6.2 }
        ]
      },
      {
        turn: 3,
        title: "小剪刀剪链子",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "flow", path: [[180, 400], [1020, 400]], color: "#ffc75a", from: 0.3, to: 4.2, count: 11, speed: 0, size: 22 },
          { kind: "text", at: [600, 170], text: "口水里的淀粉酶", size: "m", color: "#2a7fc1", from: 0.8, to: 4.2 },
          { kind: "sprite", icon: "✂️", path: [[150, 330], [1050, 330]], from: 1.4, travel: 2.8, to: 4.4, size: 64 },
          { kind: "sprite", icon: "🟡🟡", path: [[300, 400]], from: 4.4, size: 44 },
          { kind: "sprite", icon: "🟡🟡🟡", path: [[900, 400]], from: 4.6, size: 44 },
          { kind: "shape", shape: "rect", at: [600, 680], size: [260, 110], color: "#ffb3c1", text: "甜味开关", from: 5 },
          { kind: "sprite", icon: "🟡🟡", path: [[600, 400], [600, 600]], from: 5.6, travel: 1, size: 44 },
          { kind: "pulse", at: [600, 680], color: "#2f7d32", radius: 120, from: 6.6 },
          { kind: "text", at: [900, 680], text: "甜！", size: "l", color: "#2f7d32", from: 6.8 }
        ]
      },
      {
        turn: 4,
        title: "水分子插进去",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [600, 120], text: "不是真剪刀", size: "s", color: "#7a6a55", from: 0.3, to: 3 },
          { kind: "sprite", icon: "🟡", path: [[540, 460]], from: 0.6, to: 3.4, size: 120 },
          { kind: "sprite", icon: "🟡", path: [[660, 460]], from: 0.6, to: 3.4, size: 120 },
          { kind: "shape", shape: "pill", at: [600, 280], size: [230, 90], color: "#8fd3ff", text: "淀粉酶", motion: "wiggle", from: 1.4 },
          { kind: "sprite", icon: "💧", path: [[900, 200], [600, 460]], from: 2.2, travel: 1.2, to: 3.6, size: 50 },
          { kind: "sprite", icon: "🟡", path: [[540, 460], [400, 480]], from: 3.4, travel: 0.8, size: 120 },
          { kind: "sprite", icon: "🟡", path: [[660, 460], [800, 480]], from: 3.4, travel: 0.8, size: 120 },
          { kind: "text", at: [600, 660], text: "啪，断开！", size: "m", color: "#e5484d", from: 3.8, to: 6 },
          { kind: "arrow", path: [[730, 280], [1020, 280]], text: "抓下一段", from: 6.2 },
          { kind: "text", at: [600, 760], text: "它自己一点没变", size: "s", color: "#2f7d32", from: 6.8 }
        ]
      },
      {
        turn: 5,
        title: "胃里剪刀停工",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "veins", opacity: 0.35 }, "esophagus", "smallIntestine", "stomach"],
        camera: [{ t: 0, at: [605, 250], zoom: 2.2 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🍞", path: ["tongue", [601, 140], "esophagus", [608, 268], "stomach"], from: 0.3, travel: 2, to: 3.4, size: 22 },
          { kind: "highlight", at: "stomach", color: "#8bc34a", from: 2, to: 5 },
          { kind: "label", at: "stomach", text: "胃酸很酸", side: "right", from: 2.3, to: 5.2 },
          { kind: "sprite", icon: "😵", path: [{ a: "stomach", dx: -45, dy: -10 }], from: 3.4, to: 5.2, size: 22 },
          { kind: "arrow", path: [{ a: "stomach", dx: -20, dy: 20 }, { a: "smallIntestine", dx: -10, dy: -20 }], from: 5.2 },
          { kind: "label", at: "smallIntestine", text: "一大批新剪刀", side: "right", from: 5.6 },
          { kind: "sprite", icon: "✂️", path: [{ a: "smallIntestine", dx: 10, dy: 20 }], from: 6, size: 24 },
          { kind: "flow", path: ["smallIntestine", [592, 300], "venaCava", "heart"], color: "#ffc75a", from: 6.8, count: 7, speed: 90, size: 4 },
          { kind: "text", at: [600, 820], text: "糖进到血里", size: "s", from: 7.2 }
        ]
      },
      {
        turn: 6,
        title: "细嚼还是猛吞",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "circle", at: [330, 430], size: [300, 250], color: "#ffcf9e", motion: "wiggle", from: 0.3 },
          { kind: "sprite", icon: "🍞", path: [[330, 140], [330, 430]], from: 0.8, travel: 0.9, size: 110 },
          { kind: "text", at: [330, 680], text: "大块：胃好累", size: "s", color: "#e5484d", from: 1.8 },
          { kind: "shape", shape: "circle", at: [870, 430], size: [300, 250], color: "#ffcf9e", from: 3.4 },
          { kind: "flow", path: [[780, 430], [960, 430]], color: "#ffc75a", from: 3.8, count: 8, speed: 50, size: 10 },
          { kind: "text", at: [870, 680], text: "糊糊：胃轻松", size: "s", color: "#2f7d32", from: 4.8 }
        ]
      }
    ]
  },
  {
    question: "burp",
    scenes: [
      {
        turn: 0,
        title: "嗝是汽水的气",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "mouth", opacity: 0.6 }, "esophagus", "stomach"],
        camera: [{ t: 0, at: [605, 200], zoom: 2.2 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🥤", path: [{ a: "tongue", dx: -70, dy: -10 }], from: 0.3, to: 3, size: 34 },
          { kind: "flow", path: ["tongue", [601, 140], "esophagus", [608, 268], "stomach"], color: "#c98a4b", from: 0.8, to: 3.4, count: 8, speed: 120, size: 4 },
          { kind: "sprite", icon: "🫧", path: [{ a: "stomach", dx: 5, dy: -5 }], from: 2, size: 26, wobble: true },
          { kind: "label", at: "stomach", text: "二氧化碳", side: "right", from: 2.4 },
          { kind: "flow", path: ["stomach", [608, 268], "esophagus", [601, 140], "tongue", { a: "tongue", dx: -60, dy: -10 }], color: "#b9c4cf", from: 4, count: 8, speed: 200, size: 5 },
          { kind: "text", at: [900, 150], text: "嗝——", size: "l", color: "#e5484d", from: 5.2 }
        ]
      },
      {
        turn: 1,
        title: "气被压进水里",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 520], size: [240, 440], color: "#ffe3b3", from: 0.3 },
          { kind: "flow", path: [[180, 520], [560, 520]], color: "#b9c4cf", from: 0.8, to: 3.8, count: 6, speed: 200, size: 13 },
          { kind: "arrow", path: [[190, 380], [450, 460]], text: "使劲压", from: 1, to: 3.8 },
          { kind: "arrow", path: [[1010, 380], [750, 460]], from: 1.2, to: 3.8 },
          { kind: "shape", shape: "rect", at: [600, 285], size: [150, 40], color: "#e5484d", from: 2.6, to: 5 },
          { kind: "text", at: [880, 250], text: "拧紧盖子", size: "s", from: 2.9, to: 5 },
          { kind: "flow", path: [[600, 640], [600, 290], [600, 60]], color: "#b9c4cf", from: 5.2, count: 10, speed: 170, size: 13 },
          { kind: "text", at: [850, 200], text: "呲——", size: "l", color: "#e5484d", from: 5.4 }
        ]
      },
      {
        turn: 2,
        title: "胃里暖，气跑快",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [330, 450], size: [290, 290], color: "#cfe8ff", text: "冰汽水", from: 0.3 },
          { kind: "flow", path: [[330, 580], [330, 330]], color: "#b9c4cf", from: 1, count: 3, speed: 45, size: 13 },
          { kind: "sprite", icon: "🌡️", path: [[870, 210]], from: 2.8, size: 80 },
          { kind: "shape", shape: "circle", at: [870, 450], size: [290, 290], color: "#ffc9a8", text: "暖暖的胃", motion: "wiggle", from: 3.2 },
          { kind: "flow", path: [[870, 590], [870, 300]], color: "#b9c4cf", from: 3.8, count: 12, speed: 280, size: 13 },
          { kind: "text", at: [870, 720], text: "气一起冒出来", size: "s", color: "#e5484d", from: 5.2 }
        ]
      },
      {
        turn: 3,
        title: "气往上浮",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "liver", opacity: 0.35 }, "esophagus", { layer: "stomach", motion: "churn", rate: 0.4 }],
        camera: [{ t: 0, at: "stomach", zoom: 2 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🫧", path: [[690, 285], [660, 140]], from: 0.6, travel: 2, to: 3.4, size: 34, wobble: true },
          { kind: "sprite", icon: "🫧", path: [[620, 270], [640, 150]], from: 1.2, travel: 2, to: 3.4, size: 28, wobble: true },
          { kind: "flow", path: [[720, 295], [660, 150]], color: "#b9c4cf", from: 1.8, count: 5, speed: 60, size: 9 },
          { kind: "text", at: [600, 830], text: "气比水轻", size: "s", from: 1, to: 4.4 },
          { kind: "label", at: [612, 142], text: "胃的入口在上面", side: "left", from: 3.2 },
          { kind: "label", at: [609, 50], text: "食管：通到嘴巴", side: "right", from: 4.6 },
          { kind: "arrow", path: [[625, 175], [612, 10]], color: "#8a96a3", text: "往上走", from: 5.6 }
        ]
      },
      {
        turn: 4,
        title: "胃口的小门",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "liver", opacity: 0.35 }, "esophagus", "stomach"],
        camera: [{ t: 0, at: "stomach", zoom: 2 }],
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [612, 145], size: [60, 20], color: "#e5484d", from: 0.4, to: 4.8 },
          { kind: "label", at: [612, 145], text: "小门关得紧", side: "left", from: 0.8, to: 4.8 },
          { kind: "flow", path: [[720, 290], [640, 165]], color: "#b9c4cf", from: 1.6, to: 5.6, count: 6, speed: 110, size: 9 },
          { kind: "shape", shape: "circle", at: "stomach", size: [270, 250], color: "rgba(185,196,207,0.35)", motion: "grow", over: 2, from: 2.4 },
          { kind: "text", at: [900, 820], text: "胃被撑起来", size: "s", from: 3, to: 5.2 },
          { kind: "shape", shape: "pill", at: [612, 145], size: [60, 20], color: "#ffd0d0", outline: true, from: 4.8 },
          { kind: "flow", path: [[650, 210], [612, 145], [609, -10]], color: "#b9c4cf", from: 5, count: 8, speed: 300, size: 10 },
          { kind: "text", at: [900, 150], text: "嗝——", size: "l", color: "#e5484d", from: 5.8 }
        ]
      },
      {
        turn: 5,
        title: "另一种嗝",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.4 }, { layer: "lungs", opacity: 0.5 }, { layer: "diaphragm", motion: "beat", rate: 0.6 }, "airway"],
        duration: 9,
        cues: [
          { kind: "text", at: [600, 90], text: "不是放气", size: "s", color: "#7a6a55", from: 0.3, to: 2.4 },
          { kind: "highlight", at: "diaphragm", color: "#ff9f43", from: 0.6, to: 3.6 },
          { kind: "label", at: "diaphragm", text: "膈肌：圆屋顶", side: "right", from: 1 },
          { kind: "pulse", at: [601, 470], color: "#ff5a5f", radius: 90, from: 2.4, to: 5.2 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi"], color: "#4fb6ff", from: 3, to: 4.8, count: 8, speed: 700, size: 12 },
          { kind: "shape", shape: "rect", at: [601, 30], size: [100, 26], color: "#e5484d", from: 4.4 },
          { kind: "text", at: [830, 120], text: "嗝！", size: "l", color: "#e5484d", from: 4.8 },
          { kind: "text", at: [600, 840], text: "是肌肉抽了一下", size: "s", from: 6.2 }
        ]
      },
      {
        turn: 6,
        title: "胃顶到膈肌",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.3 }, { layer: "diaphragm", opacity: 0.7 }, "esophagus", "stomach"],
        camera: [{ t: 0, at: [640, 200], zoom: 1.6 }],
        duration: 9,
        cues: [
          { kind: "flow", path: [[609, -20], [612, 140], "stomach"], color: "#c98a4b", from: 0.3, to: 2.8, count: 8, speed: 220, size: 10 },
          { kind: "shape", shape: "circle", at: "stomach", size: [260, 240], color: "rgba(185,196,207,0.4)", motion: "grow", over: 2, from: 1 },
          { kind: "label", at: "stomach", text: "胃胀鼓鼓", side: "right", from: 1.6 },
          { kind: "arrow", path: [[700, 120], [700, 40]], color: "#ff5a5f", text: "往上顶", from: 3.2 },
          { kind: "label", at: [560, 60], text: "膈肌", pos: [500, 130], color: "#c0392b", from: 3.6 },
          { kind: "pulse", at: [700, 45], color: "#ff5a5f", radius: 60, from: 4.2 },
          { kind: "text", at: [600, 820], text: "慢慢喝，少喝点", size: "s", color: "#2f7d32", from: 6 }
        ]
      }
    ]
  },
  {
    question: "fart",
    scenes: [
      {
        turn: 0,
        title: "人人都放屁",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[280, 420]], from: 0.3, to: 4.6, size: 120 },
          { kind: "sprite", icon: "👨👩", path: [[600, 420]], from: 0.9, to: 4.6, size: 110 },
          { kind: "sprite", icon: "🧑‍🏫🧑‍🔬", path: [[920, 420]], from: 1.5, to: 4.6, size: 110 },
          { kind: "text", at: [600, 200], text: "每个人都会", size: "m", from: 2.2, to: 4.6 },
          { kind: "sprite", icon: "😣", path: [[350, 430]], from: 4.8, size: 130 },
          { kind: "text", at: [350, 620], text: "憋着：胀", size: "s", color: "#e5484d", from: 5.2 },
          { kind: "arrow", path: [[480, 430], [700, 430]], color: "#8a96a3", text: "放出来", from: 6 },
          { kind: "sprite", icon: "😌", path: [[850, 430]], from: 6.8, size: 130 },
          { kind: "text", at: [850, 620], text: "舒服了", size: "s", color: "#2f7d32", from: 7.2 }
        ]
      },
      {
        turn: 1,
        title: "气的两个来源",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "mouth", opacity: 0.6 }, "esophagus", "stomach", { layer: "smallIntestine", opacity: 0.6 }, "largeIntestine"],
        camera: [{ t: 0, at: [605, 280], zoom: 2.2 }],
        duration: 9,
        cues: [
          { kind: "flow", path: ["tongue", [601, 140], "esophagus", [608, 268], "stomach", "smallIntestine"], color: "#b9c4cf", from: 0.4, to: 3.8, count: 9, speed: 120, size: 5 },
          { kind: "label", at: "tongue", text: "① 咽下的空气", side: "left", from: 0.8, to: 4 },
          { kind: "highlight", at: "largeIntestine", color: "#2f7d32", from: 3.6, to: 5.6 },
          { kind: "label", at: "largeIntestine", text: "② 大肠里的细菌", side: "right", color: "#2f7d32", from: 4 },
          { kind: "sprite", icon: "🦠", path: [{ a: "largeIntestine", dx: -48, dy: -40 }], from: 4.4, size: 18, wobble: true },
          { kind: "sprite", icon: "🦠", path: [{ a: "largeIntestine", dx: 50, dy: -50 }], from: 4.8, size: 18, wobble: true },
          { kind: "flow", path: [[550, 440], [552, 325], [655, 325], [655, 440], "colonEnd"], color: "#b9c4cf", from: 5.6, count: 10, speed: 90, size: 5 }
        ]
      },
      {
        turn: 2,
        title: "豆子走到大肠",
        view: "belly",
        layers: [
          { layer: "skin", opacity: 0.35 },
          { layer: "largeIntestine", motion: "churn" }, { layer: "smallIntestine", motion: "churn" }, "stomach"
        ],
        camera: [{ t: 0, at: [600, 470], zoom: 1.15 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🫘", path: ["stomach", [553, 262], "smallIntestine", [450, 770], [430, 450]], from: 0.3, travel: 3, to: 4.4, size: 50 },
          { kind: "label", at: "smallIntestine", text: "小肠拆不开", side: "right", from: 1.2, to: 4 },
          { kind: "sprite", icon: "🦠", path: [[430, 460]], from: 3.4, size: 50, wobble: true },
          { kind: "sprite", icon: "🦠", path: [[470, 360]], from: 3.8, size: 44, wobble: true },
          { kind: "label", at: [430, 420], text: "大肠里的细菌", side: "left", color: "#2f7d32", from: 4.2 },
          { kind: "flow", path: [[450, 780], [430, 330], [790, 300], [790, 780]], color: "#b9c4cf", from: 5, count: 12, speed: 160, size: 12 },
          { kind: "text", at: [600, 110], text: "豆子越多，气越多", size: "m", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "细菌是好帮手",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "🦠", path: [[300, 400]], from: 0.3, size: 120, wobble: true },
          { kind: "text", at: [300, 550], text: "好帮手", size: "s", color: "#2f7d32", from: 0.7 },
          { kind: "sprite", icon: "🫘", path: [[60, 400], [240, 400]], from: 1.1, travel: 0.9, to: 2.4, size: 60 },
          { kind: "shape", shape: "rect", at: [900, 400], size: [260, 140], color: "#ffd1b8", text: "大肠细胞", from: 2.4, to: 6.4 },
          { kind: "flow", path: [[380, 400], [760, 400]], color: "#ffc75a", from: 2.8, to: 6.4, count: 6, speed: 140, size: 11 },
          { kind: "text", at: [600, 300], text: "变出营养当能量", size: "s", from: 3.4, to: 6.4 },
          { kind: "sprite", icon: "🛡️", path: [[900, 400]], from: 6.6, size: 110 },
          { kind: "text", at: [900, 550], text: "学会认好坏细菌", size: "s", from: 7 },
          { kind: "text", at: [600, 790], text: "太多、跑错才惹麻烦", size: "s", color: "#ff5a5f", from: 8.6 }
        ]
      },
      {
        turn: 4,
        title: "臭味只有一点点",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [560, 440], size: [440, 340], color: "#e8edf2", from: 0.3 },
          { kind: "flow", path: [[410, 440], [560, 320], [710, 440], [560, 560], [410, 440]], color: "#b9c4cf", from: 0.6, count: 14, speed: 80, size: 14 },
          { kind: "text", at: [560, 130], text: "大部分：没味道", size: "s", from: 1.2, to: 4.4 },
          { kind: "flow", path: [[485, 380], [560, 320], [710, 440], [560, 560], [410, 440], [485, 380]], color: "#d4a017", from: 3, count: 2, speed: 80, size: 15 },
          { kind: "sprite", icon: "🥚", path: [[960, 320]], from: 3.6, to: 6.2, size: 80 },
          { kind: "text", at: [960, 440], text: "含硫：臭鸡蛋味", size: "s", color: "#a07800", from: 4, to: 6.2 },
          { kind: "sprite", icon: "🥩🥚", path: [[200, 760]], from: 6.4, size: 70 },
          { kind: "arrow", path: [[330, 740], [450, 620]], color: "#d4a017", text: "臭气多一点", from: 7 }
        ]
      },
      {
        turn: 5,
        title: "响和臭没关系",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 }, "largeIntestine"],
        camera: [{ t: 0, at: "colonEnd", zoom: 2.2 }],
        duration: 10,
        cues: [
          { kind: "flow", path: [[580, 600], "colonEnd", [609, 880]], color: "#b9c4cf", from: 0.4, count: 8, speed: 380, size: 12 },
          { kind: "pulse", at: [609, 862], color: "#ff9f43", radius: 50, rate: 3, from: 1.2 },
          { kind: "label", at: [609, 862], text: "肌肉被冲得抖", side: "right", from: 1.6 },
          { kind: "text", at: [600, 130], text: "气多、冲得急：响", size: "s", from: 3.2 },
          { kind: "myth", wrong: "屁越响就越臭", right: "响不响和臭不臭没关系", from: 5.2 }
        ]
      }
    ]
  },
  {
    question: "pee-water",
    scenes: [
      {
        turn: 0,
        title: "黄色被冲淡",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [330, 560], size: [180, 200], color: "#e6a700", text: "喝水少", from: 0.4 },
          { kind: "flow", path: [[260, 625], [400, 625]], color: "#8a5a00", from: 1, count: 6, speed: 0, size: 9 },
          { kind: "shape", shape: "rect", at: [870, 480], size: [180, 360], color: "#fff3b0", text: "喝水多", from: 2.6 },
          { kind: "flow", path: [[800, 610], [940, 610]], color: "#8a5a00", from: 3.2, count: 6, speed: 0, size: 9 },
          { kind: "text", at: [600, 820], text: "黄色一样多", size: "s", from: 4.4 },
          { kind: "sprite", icon: "🌙", path: [[330, 330]], from: 6, size: 80 }
        ]
      },
      {
        turn: 1,
        title: "黄色从哪来",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [250, 420], size: [200, 200], color: "#e5484d", text: "红细胞", from: 0.3, to: 2.8 },
          { kind: "text", at: [250, 600], text: "用几个月就旧了", size: "s", from: 1, to: 2.8 },
          { kind: "shape", shape: "circle", at: [250, 420], size: [200, 200], color: "#c9785a", text: "拆掉", motion: "shrink", over: 1.5, from: 2.8 },
          { kind: "shape", shape: "circle", at: [960, 260], size: [220, 150], color: "#d97a6c", text: "肾：尿", from: 3.6 },
          { kind: "shape", shape: "circle", at: [960, 640], size: [220, 150], color: "#e9a46a", text: "肠：便便", from: 3.9 },
          { kind: "flow", path: [[320, 400], [620, 360], [860, 280]], color: "#e6b800", from: 4.4, count: 7, speed: 160, size: 10 },
          { kind: "flow", path: [[320, 440], [620, 500], [860, 620]], color: "#e6b800", from: 4.8, count: 7, speed: 160, size: 10 }
        ]
      },
      {
        turn: 2,
        title: "肾：血的过滤器",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, { layer: "arteries", opacity: 0.35 }, "kidneys"],
        camera: [{ t: 0, at: [600, 520], zoom: 1.1 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "kidneyRight", from: 0.4, to: 3.6 },
          { kind: "highlight", at: "kidneyLeft", from: 0.4, to: 3.6 },
          { kind: "label", at: "kidneyRight", text: "肾：像蚕豆", side: "left", from: 0.8 },
          { kind: "flow", path: [[601, 120], [601, 300], "kidneyLeft"], color: "#e5484d", from: 2, to: 5, count: 6, speed: 160, size: 9 },
          { kind: "flow", path: [[601, 120], [601, 310], "kidneyRight"], color: "#e5484d", from: 2.2, to: 5, count: 6, speed: 160, size: 9 },
          { kind: "flow", path: ["kidneyLeft", [687, 310], [657, 600], "bladder"], color: "#ffd84d", from: 4.4, count: 7, speed: 150, size: 9 },
          { kind: "flow", path: ["kidneyRight", [527, 320], [540, 600], "bladder"], color: "#ffd84d", from: 4.6, count: 7, speed: 150, size: 9 },
          { kind: "label", at: "bladder", text: "膀胱：存尿", side: "right", from: 5.4 },
          { kind: "pulse", at: "bladder", color: "#e6a700", radius: 70, from: 6.6 },
          { kind: "text", at: [600, 110], text: "满了就想尿尿", size: "s", from: 7 }
        ]
      },
      {
        turn: 3,
        title: "先滤再捡回",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 250], size: [300, 120], color: "#f4a3a5", text: "血", from: 0.3 },
          { kind: "flow", path: [[300, 320], [300, 570]], color: "#4fb6ff", from: 0.8, to: 3.2, count: 10, speed: 160, size: 10 },
          { kind: "shape", shape: "rect", at: [300, 640], size: [300, 120], color: "#dbeeff", text: "滤出来", from: 1 },
          { kind: "arrow", path: [[460, 620], [620, 450], [460, 280]], color: "#2f7d32", text: "捡回糖盐和水", from: 3.2, to: 5.8 },
          { kind: "flow", path: [[460, 620], [620, 450], [460, 280]], color: "#ffc75a", from: 3.8, count: 7, speed: 150, size: 10 },
          { kind: "arrow", path: [[460, 680], [790, 680]], color: "#8a96a3", text: "剩下的", from: 5 },
          { kind: "shape", shape: "rect", at: [900, 680], size: [180, 110], color: "#ffd84d", text: "尿", motion: "grow", over: 1.2, from: 5.4 },
          { kind: "text", at: [600, 830], text: "滤得多，尿只一点", size: "s", from: 6.8 }
        ]
      },
      {
        turn: 4,
        title: "大脑在看着",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, { layer: "heart", opacity: 0.7 }, { layer: "arteries", opacity: 0.4 }, "kidneys"],
        camera: [{ t: 0, at: [600, 220], zoom: 1.6 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🥵", path: [{ a: "brain", dx: -130, dy: 20 }], from: 0.3, to: 3, size: 40 },
          { kind: "highlight", at: "brain", color: "#b48cff", from: 0.8 },
          { kind: "label", at: "brain", text: "血变浓了！", side: "right", from: 1.4, to: 4 },
          { kind: "flow", path: ["hypothalamus", "carotid", "heart", "kidneyLeft"], color: "#b48cff", from: 2.8, count: 8, speed: 110, size: 6 },
          { kind: "label", at: "heart", text: "抗利尿激素", side: "left", color: "#7a4fd6", from: 3.4, to: 6 },
          { kind: "label", at: "kidneyLeft", text: "多捡水回来", side: "right", from: 5 },
          { kind: "meter", at: [930, 800], label: "尿的黄色", start: 0.45, end: 0.9, color: "#e6a700", from: 6.4, over: 1.5 }
        ]
      },
      {
        turn: 5,
        title: "喝多了：少捡水",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "mouth", opacity: 0.6 }, "esophagus", { layer: "stomach", opacity: 0.6 }, "kidneys"],
        camera: [{ t: 0, at: [600, 260], zoom: 1.4 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🥛", path: [{ a: "tongue", dx: -70, dy: 0 }], from: 0.3, to: 3, size: 40 },
          { kind: "flow", path: ["tongue", [601, 140], "esophagus", [608, 268], "stomach"], color: "#4fb6ff", from: 0.6, to: 3, count: 8, speed: 150, size: 5 },
          { kind: "meter", at: [930, 150], label: "抗利尿激素", start: 0.8, end: 0.2, color: "#b48cff", from: 1.8, over: 2 },
          { kind: "flow", path: ["kidneyLeft", [625, 400], "bladder"], color: "#ffe680", from: 3.6, count: 9, speed: 110, size: 5 },
          { kind: "flow", path: ["kidneyRight", [578, 400], "bladder"], color: "#ffe680", from: 3.9, count: 9, speed: 110, size: 5 },
          { kind: "label", at: "bladder", text: "尿多、颜色浅", side: "right", from: 4.8 },
          { kind: "text", at: [600, 820], text: "血浓了：口渴", size: "s", color: "#ff5a5f", from: 6.8 }
        ]
      },
      {
        turn: 6,
        title: "别等口渴",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🏃⚽", path: [[260, 300]], from: 0.3, size: 100, wobble: true },
          { kind: "meter", at: [780, 260], label: "身体里的水", start: 0.9, end: 0.55, color: "#4fb6ff", from: 0.8, over: 3 },
          { kind: "text", at: [780, 390], text: "渴了＝已经缺水", size: "s", color: "#ff5a5f", from: 3.6 },
          { kind: "shape", shape: "pill", at: [350, 680], size: [300, 100], color: "#fff3b0", text: "淡黄刚好", from: 5 },
          { kind: "shape", shape: "pill", at: [850, 680], size: [300, 100], color: "#e6a700", text: "深黄：喝水", from: 5.6 },
          { kind: "sprite", icon: "✅", path: [[350, 570]], from: 6.4, size: 50 }
        ]
      }
    ]
  },
  {
    question: "full-run",
    scenes: [
      {
        turn: 0,
        title: "肚子正在忙",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "muscles", opacity: 0.5 }, { layer: "arteries", opacity: 0.4 }, { layer: "smallIntestine", opacity: 0.7 }, { layer: "stomach", motion: "churn", rate: 0.8 }],
        camera: [{ t: 0, at: [600, 450], zoom: 1.1 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "stomach", color: "#ffc75a", from: 0.4 },
          { kind: "label", at: "stomach", text: "装满饭在搅拌", side: "right", from: 0.8, to: 4 },
          { kind: "label", at: "quads", text: "腿：拼命干活", side: "left", from: 2.6 },
          { kind: "flow", path: ["heart", [605, 260], "stomach"], color: "#e5484d", from: 4, count: 5, speed: 70, size: 4 },
          { kind: "flow", path: ["heart", [600, 330], [585, 430], "femoralArtery", "quads"], color: "#e5484d", from: 4.3, count: 8, speed: 120, size: 4 },
          { kind: "text", at: [600, 110], text: "两边都要血", size: "m", color: "#e5484d", from: 5.6 },
          { kind: "sprite", icon: "😣", path: [{ a: "stomach", dx: 70, dy: -30 }], from: 6.8, size: 26 }
        ]
      },
      {
        turn: 1,
        title: "消化也要血",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "arteries", opacity: 0.5 }, { layer: "veins", opacity: 0.4 }, "stomach", { layer: "smallIntestine", motion: "churn" }],
        camera: [{ t: 0, at: [600, 320], zoom: 2 }],
        duration: 10,
        cues: [
          { kind: "flow", path: ["heart", [606, 260], [604, 330], "smallIntestine"], color: "#e5484d", from: 0.4, count: 8, speed: 100, size: 4 },
          { kind: "label", at: "smallIntestine", text: "要氧气和能量", side: "right", from: 1.2, to: 4.2 },
          { kind: "flow", path: ["smallIntestine", [592, 320], "venaCava", "heart"], color: "#ffc75a", from: 3.2, count: 8, speed: 100, size: 4 },
          { kind: "label", at: "venaCava", text: "运走营养", side: "left", color: "#b07800", from: 3.6, to: 6 },
          { kind: "meter", at: [930, 700], label: "肚子的血", start: 0.3, end: 0.65, color: "#e5484d", from: 5.4 },
          { kind: "meter", at: [930, 800], label: "别处的血", start: 0.7, end: 0.35, color: "#e5484d", from: 5.8 },
          { kind: "text", at: [270, 780], text: "血就那么多", size: "s", from: 6.6 }
        ]
      },
      {
        turn: 2,
        title: "跑起来先顾腿",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "muscles", opacity: 0.6 }, { layer: "arteries", opacity: 0.5 }, "stomach"],
        camera: [{ t: 0, at: [600, 450], zoom: 1.1 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[860, 200]], from: 0.3, to: 2.2, size: 70 },
          { kind: "meter", at: [930, 130], label: "腿要的氧气", start: 0.25, end: 0.95, color: "#ff9f43", from: 0.8, over: 1.6 },
          { kind: "flow", path: ["heart", [600, 330], [585, 430], "femoralArtery", "calf"], color: "#e5484d", from: 2.2, count: 16, speed: 260, size: 6 },
          { kind: "flow", path: ["heart", [605, 260], "stomach"], color: "#e5484d", from: 2.6, count: 2, speed: 50, size: 4 },
          { kind: "label", at: "femoralArtery", text: "血大多流到腿", side: "left", from: 3.4 },
          { kind: "label", at: "stomach", text: "血少，消化慢", side: "right", from: 5 },
          { kind: "sprite", icon: "😣", path: [{ a: "stomach", dx: 60, dy: -40 }], from: 6.6, size: 26 }
        ]
      },
      {
        turn: 3,
        title: "血管像水龙头",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [330, 380], size: [380, 120], color: "#f6b0b2", text: "收紧变细", motion: "shrink", over: 1.5, from: 0.4 },
          { kind: "flow", path: [[150, 380], [510, 380]], color: "#e5484d", from: 1, count: 3, speed: 90, size: 9 },
          { kind: "shape", shape: "pill", at: [870, 380], size: [380, 120], color: "#f6b0b2", text: "放松变粗", motion: "grow", over: 1.5, from: 2.4 },
          { kind: "flow", path: [[690, 380], [1050, 380]], color: "#e5484d", from: 3, count: 12, speed: 160, size: 11 },
          { kind: "arrow", path: [[330, 780], [330, 470]], color: "#b48cff", text: "大脑：拧小", from: 4.8 },
          { kind: "arrow", path: [[870, 780], [870, 470]], color: "#2f7d32", text: "肌肉：拧大", from: 6 }
        ]
      },
      {
        turn: 4,
        title: "岔气还是个谜",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "diaphragm", opacity: 0.4 }, { layer: "liver", opacity: 0.5 }, { layer: "stomach", motion: "churn", rate: 1.6 }],
        camera: [{ t: 0, at: [640, 260], zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "text", at: [600, 110], text: "科学家还在研究", size: "s", from: 0.3 },
          { kind: "sprite", icon: "❓", path: [{ a: "stomach", dx: 170, dy: -60 }], from: 0.6, to: 4, size: 60 },
          { kind: "arrow", path: [[880, 140], [880, 300], [880, 140]], color: "#ff9f43", text: "上下晃", from: 1.6, draw: 1.2 },
          { kind: "label", at: "stomach", text: "可能：胃在扯", side: "left", from: 2 },
          { kind: "shape", shape: "circle", at: "belly", size: [360, 400], color: "rgba(255,90,95,0.08)", outline: true, from: 4 },
          { kind: "label", at: "belly", text: "可能：薄膜被蹭", side: "left", from: 4.4 },
          { kind: "text", at: [600, 800], text: "吃越饱越容易", size: "m", color: "#ff5a5f", from: 6.6 }
        ]
      },
      {
        turn: 5,
        title: "岔气了怎么办",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[150, 420], [430, 420]], from: 0.3, travel: 1.6, to: 2.4, size: 110 },
          { kind: "sprite", icon: "🚶", path: [[430, 420]], from: 2.2, size: 110 },
          { kind: "text", at: [430, 580], text: "先慢下来", size: "s", from: 2.4 },
          { kind: "shape", shape: "circle", at: [830, 420], size: [220, 220], color: "#bfe3ff", text: "深吸慢呼", motion: "pulse", from: 3.6 },
          { kind: "text", at: [830, 600], text: "按一按、弯弯腰", size: "s", from: 5.2 },
          { kind: "text", at: [600, 810], text: "越来越疼：告诉大人", size: "s", color: "#ff5a5f", from: 6.8 }
        ]
      },
      {
        turn: 6,
        title: "饭后等多久",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🍚", path: [[160, 400]], from: 0.3, to: 7, size: 90 },
          { kind: "sprite", icon: "🚶", path: [[420, 330]], from: 0.9, size: 80 },
          { kind: "text", at: [420, 450], text: "散步没问题", size: "s", color: "#2f7d32", from: 1.3 },
          { kind: "count", at: [820, 330], label: "饭后过了", start: 0, end: 60, unit: "分钟左右", from: 2.6, over: 3 },
          { kind: "sprite", icon: "⚽", path: [[820, 530]], from: 5.4, size: 80 },
          { kind: "text", at: [820, 630], text: "再去踢球", size: "s", color: "#2f7d32", from: 5.8 },
          { kind: "text", at: [600, 800], text: "听听肚子的感觉", size: "m", from: 7.2 }
        ]
      }
    ]
  }
];
