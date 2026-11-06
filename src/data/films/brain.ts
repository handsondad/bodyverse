import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "why-sleep",
    scenes: [
      {
        turn: 0,
        title: "睡着也很忙",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "muscles", opacity: 0.5 }, "brain"],
        camera: [{ t: 0, at: [600, 450], zoom: 1 }, { t: 4.6, at: [600, 450], zoom: 1 }, { t: 5.8, at: "brain", zoom: 2.4 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "💤", path: [{ a: "brain", dx: 110, dy: -10 }], from: 0.3, to: 4.6, size: 54, wobble: true },
          { kind: "highlight", at: "quads", from: 1, to: 4.6, color: "#2f7d32" },
          { kind: "label", at: "quads", text: "肌肉在修补", side: "left", from: 1.3, to: 4.6, color: "#2f7d32" },
          { kind: "label", at: "tibia", text: "夜里长个子", side: "left", from: 2.4, to: 4.6, color: "#2f7d32" },
          { kind: "highlight", at: "brain", from: 5.8, color: "#b48cff", pad: 10 },
          { kind: "label", at: "brain", text: "大脑最忙", side: "right", from: 6.2, color: "#7a4fd6" },
          { kind: "pulse", at: "brain", from: 6.4, color: "#ffcf3f", radius: 50 },
          { kind: "text", at: [600, 800], text: "睡够了：有劲又开心", size: "m", color: "#2f7d32", from: 7.2 }
        ]
      },
      {
        turn: 1,
        title: "记忆搬进书柜",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.3 }, { layer: "brain", opacity: 0.75 }, "eyes"],
        camera: [{ t: 0, at: "brain", zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "flow", path: ["eye", [600, 450]], icon: "📖", from: 0.3, to: 3.2, count: 4, speed: 160, size: 14 },
          { kind: "sprite", icon: "🎒", path: [[600, 450]], from: 1, size: 60 },
          { kind: "label", at: [600, 450], text: "海马体：小书包", side: "bottom", from: 1.5 },
          { kind: "text", at: [600, 90], text: "睡着后：重放几遍", size: "s", color: "#5a86dc", from: 3.4, to: 6.6 },
          { kind: "pulse", at: [600, 450], from: 3.8, to: 5.6, color: "#ffcf3f", radius: 70, rate: 1.5 },
          { kind: "flow", path: [[600, 450], [680, 320], [760, 200]], color: "#ffcf3f", from: 4.8, count: 6, speed: 200 },
          { kind: "sprite", icon: "🗄️", path: [[760, 200]], from: 5.6, size: 60 },
          { kind: "label", at: [760, 200], text: "大脑外层：大书柜", side: "top", from: 6 },
          { kind: "text", at: [600, 820], text: "熬夜背书：记不牢", size: "s", color: "#ff5a5f", from: 7.6 }
        ]
      },
      {
        turn: 2,
        title: "一夜轮好几圈",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "myth", wrong: "睡觉就是大脑关机", right: "大脑换一种方式干活", from: 0.3, to: 3.4 },
          { kind: "shape", shape: "pill", at: [200, 260], size: [170, 70], color: "#cfe3ff", text: "浅睡", from: 1 },
          { kind: "arrow", path: [[270, 300], [420, 540]], color: "#5a86dc", text: "越睡越沉", from: 2, to: 4.6 },
          { kind: "shape", shape: "circle", at: [480, 600], size: [190, 120], color: "#9db7e8", text: "深睡", from: 2.6 },
          { kind: "text", at: [480, 720], text: "长个子 修肌肉", size: "s", color: "#2f7d32", from: 3.8 },
          { kind: "arrow", path: [[570, 560], [730, 310]], color: "#b48cff", text: "转到做梦", from: 4.8, to: 6.2 },
          { kind: "shape", shape: "pill", at: [800, 260], size: [170, 70], color: "#e4d4ff", text: "做梦", from: 5.4 },
          { kind: "sprite", icon: "👀", path: [[800, 170]], from: 5.8, to: 7.2, size: 56, wobble: true },
          { kind: "text", at: [820, 370], text: "理记忆 平心情", size: "s", color: "#7a4fd6", from: 6.4 },
          { kind: "arrow", path: [[890, 300], [1020, 460], [760, 820], [260, 820], [180, 320]], color: "#ff9f43", text: "一夜轮好几圈", from: 7.4, draw: 1.4 }
        ]
      },
      {
        turn: 3,
        title: "深睡大扫除",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "🐭", path: [[150, 130]], from: 0.3, to: 5, size: 64 },
          { kind: "shape", shape: "circle", at: [300, 450], size: [380, 380], color: "#ffc4d0", text: "脑细胞", from: 0.9 },
          { kind: "shape", shape: "circle", at: [900, 450], size: [380, 380], color: "#ffc4d0", text: "脑细胞", from: 1.1 },
          { kind: "text", at: [600, 110], text: "深睡时", size: "m", color: "#5a86dc", from: 2, to: 5 },
          { kind: "shape", shape: "rect", at: [600, 450], size: [240, 520], color: "#bfe3ff", motion: "grow", over: 2.2, from: 2.4 },
          { kind: "flow", path: [[600, 200], [600, 760]], color: "#4fb6ff", from: 4.6, count: 10, speed: 380, size: 11 },
          { kind: "flow", path: [[600, 300], [600, 820]], color: "#8d7b68", from: 5.2, to: 7.2, count: 5, speed: 380, size: 13 },
          { kind: "text", at: [600, 110], text: "冲走白天的垃圾", size: "m", color: "#4a7fb0", from: 5.4, to: 7.2 },
          { kind: "text", at: [600, 110], text: "人是否一样？还在研究", size: "s", color: "#7a6a55", from: 7.4 }
        ]
      },
      {
        turn: 4,
        title: "睡不够会怎样",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [600, 110], text: "少睡一晚", size: "m", from: 0.3, to: 5 },
          { kind: "sprite", icon: "🥱", path: [[600, 450]], from: 0.6, to: 5, size: 150 },
          { kind: "shape", shape: "pill", at: [300, 300], size: [200, 74], color: "#ffe08a", text: "走神", from: 1.4, to: 5 },
          { kind: "shape", shape: "pill", at: [900, 300], size: [200, 74], color: "#ffe08a", text: "记不住", from: 2, to: 5 },
          { kind: "shape", shape: "pill", at: [300, 620], size: [200, 74], color: "#ffb3b5", text: "发脾气", from: 2.6, to: 5 },
          { kind: "meter", at: [900, 620], label: "反应速度", start: 1, end: 0.35, color: "#ff5a5f", from: 3.2, to: 5 },
          { kind: "text", at: [600, 110], text: "长期睡不够：易生病", size: "m", from: 5.2, to: 7.2 },
          { kind: "sprite", icon: "🤒", path: [[600, 450]], from: 5.4, to: 7.2, size: 150 },
          { kind: "sprite", icon: "😑", path: [[600, 450]], from: 7.4, size: 150 },
          { kind: "text", at: [600, 110], text: "睁着眼偷偷打盹", size: "m", color: "#ff5a5f", from: 7.6 },
          { kind: "sprite", icon: "💤", path: [[730, 330]], from: 8, size: 56, wobble: true }
        ]
      },
      {
        turn: 5,
        title: "睡多久才够",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🛌", path: [[600, 340]], from: 0.3, to: 5.4, size: 130 },
          { kind: "text", at: [600, 170], text: "每天睡 9～12 小时", size: "m", color: "#5a86dc", from: 0.6, to: 5.4 },
          { kind: "sprite", icon: "⏰", path: [[420, 580]], from: 2.2, to: 5.4, size: 100 },
          { kind: "text", at: [600, 730], text: "同一时间睡和起", size: "s", from: 2.6, to: 5.4 },
          { kind: "label", at: [420, 580], text: "生物钟", side: "left", from: 3.4, to: 5.4, color: "#2f7d32" },
          { kind: "sprite", icon: "📱", path: [[460, 540]], from: 5.6, size: 110 },
          { kind: "flow", path: [[520, 500], [700, 380]], color: "#ffe066", from: 6, count: 5, speed: 160, size: 12 },
          { kind: "sprite", icon: "🧠", path: [[760, 350]], from: 6.2, size: 90 },
          { kind: "text", at: [600, 730], text: "亮光：还是白天？", size: "s", color: "#ff9f43", from: 6.8 }
        ]
      }
    ]
  },
  {
    question: "foot-asleep",
    scenes: [
      {
        turn: 0,
        title: "脚没有真睡着",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.3 }, "nerves", "brain"],
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [562, 720], size: [90, 36], color: "#a58b72", motion: "pulse", from: 0.4, to: 5.2 },
          { kind: "flow", path: ["foot", [560, 770]], color: "#ffcf3f", from: 1.2, to: 5.2, count: 3, speed: 70, size: 9 },
          { kind: "label", at: [562, 720], text: "神经被压住", side: "right", from: 1.8, to: 5.2, color: "#ff5a5f" },
          { kind: "label", at: "brain", text: "大脑：没消息", side: "right", from: 3, to: 5.2 },
          { kind: "label", at: "foot", text: "木木的", side: "left", from: 3.8, to: 5.2 },
          { kind: "sprite", icon: "🚶", path: [[800, 700]], from: 5.4, size: 80 },
          { kind: "flow", path: ["foot", "knee", "sciatic", [585, 390], "spinalCord", "brain"], color: "#ffcf3f", from: 5.6, count: 8, speed: 260 },
          { kind: "text", at: [900, 840], text: "动一动就好", size: "s", color: "#2f7d32", from: 6.2 },
          { kind: "highlight", at: "brain", from: 6.8, color: "#2f7d32", pad: 12 }
        ]
      },
      {
        turn: 1,
        title: "神经是电话线",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.3 }, "nerves", "brain"],
        duration: 8.5,
        cues: [
          { kind: "label", at: "sciatic", text: "神经：电话线", side: "left", from: 0.5, to: 3.4, color: "#b8860b" },
          { kind: "label", at: "spinalCord", text: "脊髓", side: "right", from: 1.6 },
          { kind: "sprite", icon: "🪶", path: [[460, 880], "foot"], from: 2.6, travel: 1, to: 4.4, size: 50 },
          { kind: "flow", path: ["foot", "knee", "sciatic", [585, 390], "spinalCord", "brain"], color: "#ffcf3f", from: 3.4, count: 10, speed: 240 },
          { kind: "pulse", at: "knee", from: 3.8, to: 5.6, color: "#ffcf3f", radius: 40 },
          { kind: "pulse", at: "sciatic", from: 4.4, to: 6.2, color: "#ffcf3f", radius: 40 },
          { kind: "pulse", at: "spinalCord", from: 5, to: 6.8, color: "#ffcf3f", radius: 40 },
          { kind: "highlight", at: "brain", from: 6.2, color: "#ffcf3f", pad: 12 },
          { kind: "label", at: "brain", text: "脚被摸了！", side: "right", from: 6.6 }
        ]
      },
      {
        turn: 2,
        title: "神经也要力气",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "myth", wrong: "神经就是一根铜线", right: "神经是一长条活细胞", from: 0.3, to: 3 },
          { kind: "shape", shape: "pill", at: [600, 330], size: [920, 64], color: "#ffe08a", text: "神经细胞", from: 0.8 },
          { kind: "shape", shape: "pill", at: [600, 520], size: [920, 50], color: "#f6b0b2", text: "小血管", from: 2 },
          { kind: "flow", path: [[140, 520], [1060, 520]], color: "#e5484d", from: 2.4, to: 5.6, count: 8, speed: 200, size: 9 },
          { kind: "text", at: [600, 430], text: "血送来氧气养料", size: "s", color: "#2f7d32", from: 3, to: 5.6 },
          { kind: "flow", path: [[140, 330], [1060, 330]], color: "#ffcf3f", from: 3.4, to: 5.6, count: 8, speed: 260, size: 9 },
          { kind: "arrow", path: [[600, 110], [600, 280]], color: "#8d6e4f", text: "腿压着", from: 5.8, draw: 0.6 },
          { kind: "flow", path: [[140, 520], [560, 520]], color: "#e5484d", from: 6.4, count: 4, speed: 60, size: 9 },
          { kind: "flow", path: [[140, 330], [560, 330]], color: "#ffcf3f", from: 6.6, count: 3, speed: 60, size: 9 },
          { kind: "text", at: [600, 430], text: "没力气，信号传不动", size: "s", color: "#ff5a5f", from: 7.4 }
        ]
      },
      {
        turn: 3,
        title: "神经醒来乱响",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "arteries", opacity: 0.8 }, "nerves"],
        camera: [{ t: 0, at: [600, 650], zoom: 1.5 }],
        duration: 9.5,
        cues: [
          { kind: "flow", path: [[620, 320], [612, 454], [600, 620], [598, 800]], color: "#e5484d", from: 0.4, count: 10, speed: 300 },
          { kind: "label", at: [600, 620], text: "血流回来了", side: "right", from: 0.8, to: 4, color: "#e5484d" },
          { kind: "pulse", at: "foot", from: 2.2, color: "#ffcf3f", radius: 80, rate: 2 },
          { kind: "sprite", icon: "📻", path: [[880, 640]], from: 3, size: 72, wobble: true },
          { kind: "flow", path: ["foot", [650, 760], [560, 700], [660, 640], [570, 580], [640, 520], [600, 460]], color: "#ffcf3f", from: 3.6, to: 7.4, count: 9, speed: 280, size: 8 },
          { kind: "flow", path: [[540, 880], [580, 800], [640, 760], [600, 700]], icon: "🐜", from: 5.2, to: 7.4, count: 4, speed: 60, size: 12 },
          { kind: "text", at: [600, 90], text: "又麻又刺，像蚂蚁爬", size: "m", color: "#ff5a5f", from: 5.6, to: 7.4 },
          { kind: "flow", path: ["foot", "calf", "knee", [630, 300]], color: "#ffcf3f", from: 7.6, count: 6, speed: 200 },
          { kind: "text", at: [600, 90], text: "几分钟后就稳了", size: "m", color: "#2f7d32", from: 7.8 }
        ]
      },
      {
        turn: 4,
        title: "为什么站不稳",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, "nerves", "brain"],
        duration: 10,
        cues: [
          { kind: "flow", path: ["foot", "knee", "sciatic", [585, 390], "spinalCord", "brain"], color: "#ffcf3f", from: 0.3, to: 3.6, count: 8, speed: 260 },
          { kind: "label", at: "foot", text: "脚踩在哪儿", side: "left", from: 0.6, to: 3.6 },
          { kind: "label", at: { a: "foot", dy: -45 }, text: "脚腕弯成啥样", side: "right", from: 1.2, to: 3.6 },
          { kind: "flow", path: ["foot", [560, 770]], color: "#ffcf3f", from: 3.8, count: 3, speed: 70, size: 9 },
          { kind: "label", at: "brain", text: "脚在哪儿？", side: "right", from: 4.4, color: "#ff5a5f" },
          { kind: "sprite", icon: "😵‍💫", path: [[800, 450]], from: 5, to: 7.8, size: 90, wobble: true },
          { kind: "flow", path: ["brain", "spinalCord", [585, 390], "sciatic", [560, 640]], color: "#ff9f43", from: 6, count: 5, speed: 200 },
          { kind: "label", at: "knee", text: "使不上劲", side: "left", from: 6.6, color: "#ff9f43" },
          { kind: "text", at: [880, 840], text: "先坐着，动动脚趾", size: "s", color: "#2f7d32", from: 8 }
        ]
      },
      {
        turn: 5,
        title: "什么时候看医生",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.6 }, { layer: "nerves", opacity: 0.8 }],
        duration: 9.5,
        cues: [
          { kind: "text", at: [880, 120], text: "偶尔压一会儿：没事", size: "s", color: "#2f7d32", from: 0.4, to: 3.6 },
          { kind: "flow", path: ["foot", "knee", "sciatic", [585, 390], "spinalCord", "brain"], color: "#ffcf3f", from: 0.8, to: 3.6, count: 8, speed: 260 },
          { kind: "sprite", icon: "✅", path: [[790, 640]], from: 1.4, to: 3.6, size: 70 },
          { kind: "sprite", icon: "📅", path: [[800, 560]], from: 3.8, to: 6.6, size: 70 },
          { kind: "text", at: [880, 120], text: "天天压、一直麻：看医生", size: "s", color: "#ff9f43", from: 4, to: 6.6 },
          { kind: "sprite", icon: "🧑‍⚕️", path: [[930, 560]], from: 4.6, to: 6.6, size: 70 },
          { kind: "shape", shape: "rect", at: [515, 450], size: [170, 840], color: "rgba(255, 90, 95, 0.3)", outline: true, from: 6.8 },
          { kind: "text", at: [880, 120], text: "半边突然麻：马上说", size: "s", color: "#ff5a5f", from: 7.2 },
          { kind: "sprite", icon: "🗣️", path: [[850, 450]], from: 7.8, size: 80 }
        ]
      }
    ]
  },
  {
    question: "pain",
    scenes: [
      {
        turn: 0,
        title: "疼是身体警报",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "skeleton", opacity: 0.3 }],
        camera: [{ t: 0, at: [580, 560], zoom: 1.2 }, { t: 1.2, at: "knee", zoom: 2 }],
        duration: 8,
        cues: [
          { kind: "pulse", at: "knee", from: 0.3, to: 5.2, color: "#ff5a5f", radius: 60 },
          { kind: "highlight", at: "knee", from: 0.6, color: "#ff5a5f", pad: 14 },
          { kind: "label", at: "knee", text: "这里受伤了！", side: "left", from: 1, color: "#ff5a5f" },
          { kind: "sprite", icon: "🚨", path: [{ a: "knee", dx: 110, dy: -60 }], from: 2, to: 5.2, size: 56, wobble: true },
          { kind: "sprite", icon: "🛑", path: [{ a: "knee", dx: 120, dy: 80 }], from: 3.6, size: 54 },
          { kind: "sprite", icon: "🩹", path: ["knee"], from: 5.4, size: 44 },
          { kind: "text", at: [600, 820], text: "保护它，慢慢长好", size: "m", color: "#2f7d32", from: 5.8 }
        ]
      },
      {
        turn: 1,
        title: "小哨兵报警",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.3 }, "nerves", "brain"],
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "💂", path: [{ a: "knee", dx: -60, dy: 10 }], from: 0.4, to: 3.6, size: 44 },
          { kind: "label", at: "knee", text: "皮肤里的小哨兵", side: "left", from: 0.8, to: 3.6 },
          { kind: "sprite", icon: "🔥", path: [{ a: "knee", dx: 90, dy: -50 }], from: 1.6, to: 3.6, size: 44 },
          { kind: "sprite", icon: "💥", path: [{ a: "knee", dx: 100, dy: 0 }], from: 2, to: 3.6, size: 44 },
          { kind: "sprite", icon: "🌵", path: [{ a: "knee", dx: 90, dy: 50 }], from: 2.4, to: 3.6, size: 44 },
          { kind: "pulse", at: "knee", from: 3.2, to: 6, color: "#ff5a5f", radius: 50 },
          { kind: "flow", path: ["knee", "sciatic", [585, 390], "spinalCord", "brain"], color: "#ff5a5f", from: 3.8, count: 8, speed: 240 },
          { kind: "label", at: "spinalCord", text: "脊髓", side: "right", from: 4.6 },
          { kind: "highlight", at: "brain", from: 5.8, color: "#ff5a5f", pad: 12 },
          { kind: "label", at: "brain", text: "大脑：好疼！", side: "right", from: 6.2, color: "#ff5a5f" }
        ]
      },
      {
        turn: 2,
        title: "先缩手后觉疼",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.3 }, { layer: "muscles", opacity: 0.4 }, "nerves", "brain"],
        camera: [{ t: 0, at: [540, 300], zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "♨️", path: [{ a: "fingerTip", dx: -60, dy: 30 }], from: 0.3, to: 3, size: 56 },
          { kind: "pulse", at: "fingerTip", from: 0.8, to: 3, color: "#ff5a5f", radius: 50 },
          { kind: "flow", path: ["fingerTip", "wrist", "forearm", "medianNerve", [560, 190], [597, 190]], color: "#ff5a5f", from: 1, count: 6, speed: 300 },
          { kind: "highlight", at: "spinalCord", from: 1.8, to: 4, color: "#ff9f43", pad: 8 },
          { kind: "label", at: "spinalCord", text: "脊髓直接下令", side: "right", from: 2, to: 5.2, color: "#ff9f43" },
          { kind: "flow", path: [[597, 200], [540, 230], "biceps"], color: "#ff9f43", from: 2.6, to: 5.2, count: 5, speed: 260 },
          { kind: "label", at: "biceps", text: "缩手！", side: "left", from: 3, to: 5.2, color: "#ff9f43" },
          { kind: "text", at: [600, 120], text: "这叫反射", size: "m", color: "#ff9f43", from: 3.6, to: 5.2 },
          { kind: "flow", path: [[597, 190], [600, 120], "brain"], color: "#ff5a5f", from: 5.4, count: 4, speed: 100 },
          { kind: "highlight", at: "brain", from: 6.4, color: "#ff5a5f", pad: 10 },
          { kind: "label", at: "brain", text: "过一会儿：好烫！", side: "right", from: 6.8, color: "#ff5a5f" },
          { kind: "text", at: [600, 820], text: "少烫一会儿，少受伤", size: "s", color: "#2f7d32", from: 7.8 }
        ]
      },
      {
        turn: 3,
        title: "快路和慢路",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🦵", path: [[100, 430]], from: 0.3, size: 90 },
          { kind: "sprite", icon: "🧠", path: [[1100, 430]], from: 0.5, size: 90 },
          { kind: "shape", shape: "pill", at: [600, 300], size: [860, 70], color: "#ffd36b", text: "粗，有外皮", outline: true, from: 1 },
          { kind: "flow", path: [[180, 300], [1020, 300]], color: "#ff5a5f", from: 1.8, to: 4.9, count: 4, speed: 700, size: 13 },
          { kind: "text", at: [600, 190], text: "先到：尖尖地疼", size: "s", color: "#ff5a5f", from: 2.4, to: 4.9 },
          { kind: "shape", shape: "pill", at: [600, 560], size: [860, 44], color: "#f3c27a", text: "细，没外皮", from: 4.4 },
          { kind: "flow", path: [[180, 560], [1020, 560]], color: "#c77d4a", from: 5, count: 4, speed: 140, size: 9 },
          { kind: "text", at: [600, 670], text: "后到：闷闷地疼", size: "s", color: "#a0653a", from: 5.8 }
        ]
      },
      {
        turn: 4,
        title: "揉揉就不那么疼",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [640, 450], size: [110, 300], color: "#d9c7b0", text: "脊髓门口", from: 0.3 },
          { kind: "flow", path: [[100, 560], [640, 450], [1100, 450]], color: "#ff5a5f", from: 1, to: 4.4, count: 9, speed: 260 },
          { kind: "meter", at: [960, 200], label: "疼", start: 0, end: 0.9, color: "#ff5a5f", from: 1.4, to: 4.4 },
          { kind: "sprite", icon: "🤲", path: [[150, 330]], from: 3, to: 6.6, size: 70, wobble: true },
          { kind: "flow", path: [[200, 340], [640, 450], [1100, 450]], color: "#5cb85c", from: 3.4, count: 8, speed: 260 },
          { kind: "flow", path: [[100, 560], [620, 460]], color: "#ff5a5f", from: 4.4, count: 6, speed: 260 },
          { kind: "flow", path: [[660, 450], [1100, 450]], color: "#ff5a5f", from: 4.6, count: 2, speed: 260 },
          { kind: "meter", at: [960, 200], label: "疼", start: 0.9, end: 0.45, color: "#ff5a5f", from: 4.6 },
          { kind: "text", at: [600, 800], text: "别盯着伤口，疼会轻", size: "m", color: "#2f7d32", from: 6.8 }
        ]
      },
      {
        turn: 5,
        title: "不会疼更危险",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 110], text: "天生不会疼：极少", size: "m", from: 0.3 },
          { kind: "sprite", icon: "👅", path: [[250, 380]], from: 1.2, size: 90 },
          { kind: "sprite", icon: "🦴", path: [[600, 380]], from: 1.8, size: 90 },
          { kind: "sprite", icon: "♨️", path: [[950, 380]], from: 2.4, size: 90 },
          { kind: "text", at: [600, 540], text: "受伤了都不知道", size: "m", color: "#ff5a5f", from: 3.4 },
          { kind: "myth", wrong: "不会疼多好呀", right: "疼在保护我们", from: 5.4 }
        ]
      }
    ]
  },
  {
    question: "dual-task",
    scenes: [
      {
        turn: 0,
        title: "心思被占满了",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[260, 480]], from: 0.3, size: 150 },
          { kind: "meter", at: [700, 150], label: "能用的心思", start: 0, end: 0.9, color: "#b48cff", from: 1.4, over: 1.8 },
          { kind: "sprite", icon: "💬", path: [[390, 320]], from: 1.6, size: 80, wobble: true },
          { kind: "sprite", icon: "⚽", path: [[1100, 300], [700, 380], [300, 400]], from: 3.6, travel: 2, spin: true, size: 64 },
          { kind: "sprite", icon: "💥", path: [[300, 400]], from: 5.6, size: 70 },
          { kind: "text", at: [600, 800], text: "看球、伸手慢一点点", size: "m", color: "#ff5a5f", from: 6.4 }
        ]
      },
      {
        turn: 1,
        title: "自动挡和要想的事",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🚶", path: [[460, 360]], from: 0.3, to: 2.8, size: 100 },
          { kind: "sprite", icon: "😋", path: [[740, 360]], from: 0.8, to: 2.8, size: 100 },
          { kind: "text", at: [600, 540], text: "练过上万次：自动挡", size: "m", color: "#2f7d32", from: 1.3, to: 2.8 },
          { kind: "shape", shape: "circle", at: [600, 600], size: [220, 220], color: "#e4d4ff", text: "总指挥", from: 3 },
          { kind: "sprite", icon: "⚽", path: [[330, 300]], from: 3.6, size: 90 },
          { kind: "arrow", path: [[380, 350], [520, 520]], color: "#4fb6ff", from: 4, draw: 0.6 },
          { kind: "sprite", icon: "🗣️", path: [[870, 300]], from: 4.6, size: 90 },
          { kind: "arrow", path: [[820, 350], [680, 520]], color: "#ff9f43", from: 5, draw: 0.6 },
          { kind: "text", at: [600, 150], text: "两件都要想一想", size: "m", color: "#7a4fd6", from: 5.8 }
        ]
      },
      {
        turn: 2,
        title: "总指挥要排队",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 420], size: [220, 220], color: "#e4d4ff", text: "总指挥", from: 0.3 },
          { kind: "text", at: [600, 140], text: "一次只拿一个主意", size: "m", color: "#7a4fd6", from: 0.9, to: 3.2 },
          { kind: "shape", shape: "pill", at: [250, 700], size: [170, 64], color: "#ffe08a", text: "说话", from: 1.8 },
          { kind: "shape", shape: "pill", at: [450, 700], size: [170, 64], color: "#bfe3ff", text: "接球", from: 2.2 },
          { kind: "arrow", path: [[250, 660], [500, 500]], color: "#ff9f43", text: "先想说话", from: 3.4, to: 5.4 },
          { kind: "arrow", path: [[450, 660], [560, 540]], color: "#4fb6ff", text: "再换接球", from: 5.6 },
          { kind: "sprite", icon: "⏳", path: [[790, 360]], from: 6.2, size: 80, wobble: true },
          { kind: "text", at: [600, 840], text: "每换一次，多花一点时间", size: "s", color: "#ff5a5f", from: 6.8 }
        ]
      },
      {
        turn: 3,
        title: "慢一点冲很远",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "text", at: [600, 110], text: "只慢零点几秒", size: "m", from: 0.3, to: 3.6 },
          { kind: "sprite", icon: "⚽", path: [[150, 300], [1050, 300]], from: 0.8, to: 3.6, travel: 1.2, spin: true, size: 70 },
          { kind: "arrow", path: [[600, 390], [1000, 390]], color: "#ff5a5f", text: "飞出一大截", from: 1.8, to: 3.6 },
          { kind: "sprite", icon: "🚲", path: [[120, 480], [560, 480]], from: 3.8, to: 7.6, travel: 1.4, size: 80 },
          { kind: "text", at: [820, 480], text: "早捏刹车", size: "s", color: "#2f7d32", from: 4.4, to: 7.6 },
          { kind: "sprite", icon: "🚲", path: [[120, 660], [860, 660]], from: 4.6, to: 7.6, travel: 1.8, size: 80 },
          { kind: "arrow", path: [[560, 750], [860, 750]], color: "#ff5a5f", text: "晚一下多冲", from: 5.8, to: 7.6 },
          { kind: "sprite", icon: "🚸", path: [[450, 420]], from: 7.8, size: 130 },
          { kind: "sprite", icon: "📵", path: [[750, 420]], from: 8.2, size: 110 },
          { kind: "text", at: [600, 620], text: "车可不会等你", size: "m", color: "#ff5a5f", from: 8.6 }
        ]
      },
      {
        turn: 4,
        title: "用尺子测反应",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 430], size: [70, 420], color: "#ffe08a", text: "尺", from: 0.3 },
          { kind: "sprite", icon: "🤏", path: [[300, 180]], from: 0.6, size: 80 },
          { kind: "label", at: [300, 230], text: "大人捏住上端", side: "right", from: 1, to: 4.6 },
          { kind: "label", at: [300, 630], text: "手指在最下面", side: "right", from: 1.8, to: 4.6 },
          { kind: "arrow", path: [[440, 260], [440, 520]], color: "#ff9f43", text: "一松手", from: 2.8, to: 4.6 },
          { kind: "text", at: [300, 820], text: "刻度越大越慢", size: "s", from: 3.6 },
          { kind: "meter", at: [850, 360], label: "专心夹", start: 0, end: 0.3, color: "#2f7d32", from: 5, over: 1.2 },
          { kind: "meter", at: [850, 560], label: "边心算边夹", start: 0, end: 0.65, color: "#ff5a5f", from: 6.2, over: 1.2 },
          { kind: "text", at: [850, 700], text: "更大，还忽大忽小", size: "s", color: "#ff5a5f", from: 7.6 }
        ]
      },
      {
        turn: 5,
        title: "练熟变自动挡",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "myth", wrong: "他们有两个总指挥", right: "大家都只有一个", from: 0.3, to: 3.6 },
          { kind: "shape", shape: "circle", at: [600, 330], size: [200, 200], color: "#e4d4ff", text: "总指挥", from: 0.8, to: 3.6 },
          { kind: "sprite", icon: "🎹", path: [[300, 360]], from: 3.8, size: 120 },
          { kind: "sprite", icon: "💬", path: [[420, 230]], from: 4.4, to: 8, size: 64, wobble: true },
          { kind: "text", at: [300, 540], text: "老师：弹琴成自动挡", size: "s", color: "#2f7d32", from: 5 },
          { kind: "sprite", icon: "🎹", path: [[900, 360]], from: 5.8, size: 120 },
          { kind: "sprite", icon: "😵‍💫", path: [[1020, 230]], from: 6.2, to: 8, size: 64, wobble: true },
          { kind: "text", at: [900, 540], text: "刚学：顾不过来", size: "s", color: "#ff5a5f", from: 6.6 },
          { kind: "text", at: [600, 760], text: "危险的事只做一件", size: "m", color: "#ff5a5f", from: 8.2 }
        ]
      }
    ]
  },
  {
    question: "dream",
    scenes: [
      {
        turn: 0,
        title: "身体躺在床上",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🛌", path: [[380, 600]], from: 0.3, size: 170 },
          { kind: "text", at: [380, 760], text: "身体一直躺在床上", size: "s", from: 0.8 },
          { kind: "flow", path: [[440, 540], [560, 450], [640, 400]], color: "#b48cff", from: 2, count: 4, speed: 120, size: 7 },
          { kind: "shape", shape: "circle", at: [810, 300], size: [380, 260], color: "#efe6ff", motion: "pulse", from: 2.4 },
          { kind: "sprite", icon: "🦸", path: [[690, 330], [920, 250]], from: 3, travel: 2.5, size: 70 },
          { kind: "text", at: [810, 500], text: "大脑编的小故事", size: "m", color: "#7a4fd6", from: 4, to: 6.4 },
          { kind: "text", at: [810, 500], text: "画面声音都像真的", size: "m", color: "#7a4fd6", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "谁在编故事",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.3 }, { layer: "brain", opacity: 0.8 }],
        camera: [{ t: 0, at: "brain", zoom: 1.3 }],
        duration: 9,
        cues: [
          { kind: "pulse", at: [850, 360], from: 0.4, color: "#ffcf3f", radius: 70 },
          { kind: "label", at: [850, 360], text: "管画面", side: "top", from: 0.7, to: 3.8 },
          { kind: "pulse", at: [620, 430], from: 1.4, to: 6, color: "#ffcf3f", radius: 60 },
          { kind: "label", at: [620, 430], text: "管声音", side: "bottom", from: 1.7, to: 3.8 },
          { kind: "pulse", at: [540, 480], from: 2.4, to: 6, color: "#ff7aa8", radius: 50 },
          { kind: "label", at: [540, 480], text: "管心情", side: "left", from: 2.7, to: 3.8 },
          { kind: "shape", shape: "circle", at: [390, 260], size: [170, 140], color: "rgba(90, 134, 220, 0.35)", from: 4 },
          { kind: "sprite", icon: "💤", path: [[390, 260]], from: 4.2, size: 50, wobble: true },
          { kind: "label", at: [390, 260], text: "管想对不对", side: "top", from: 4.6, color: "#5a86dc" },
          { kind: "sprite", icon: "🦸", path: [[1000, 220], [800, 140]], from: 6, travel: 2, size: 60 },
          { kind: "text", at: [600, 830], text: "飞起来也不觉得怪", size: "m", color: "#7a4fd6", from: 6.4 }
        ]
      },
      {
        turn: 2,
        title: "肌肉被锁住",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "muscles", opacity: 0.7 }, "eyes", "brain"],
        camera: [{ t: 0, at: "eye", zoom: 2.6 }, { t: 3.4, at: "eye", zoom: 2.6 }, { t: 4.8, at: [600, 450], zoom: 1 }],
        duration: 9.5,
        cues: [
          { kind: "highlight", at: "eye", from: 0.4, to: 3.6, color: "#4fb6ff", pad: 6 },
          { kind: "sprite", icon: "👀", path: [{ a: "eye", dx: 70, dy: -30 }], from: 0.8, to: 3.6, size: 34, wobble: true },
          { kind: "label", at: "eye", text: "眼睛飞快转", side: "right", from: 1.2, to: 3.6, color: "#4a7fb0" },
          { kind: "pulse", at: "brain", from: 2, to: 4.6, color: "#ffcf3f", radius: 40 },
          { kind: "sprite", icon: "🔒", path: [[770, 560]], from: 5.2, size: 80 },
          { kind: "highlight", at: "quads", from: 5.6, color: "#5a86dc" },
          { kind: "highlight", at: "biceps", from: 5.8, color: "#5a86dc" },
          { kind: "label", at: "quads", text: "肌肉放松", side: "left", from: 6.2, color: "#5a86dc" },
          { kind: "sprite", icon: "🦸", path: [[720, 70]], from: 7, size: 50, wobble: true },
          { kind: "text", at: [600, 830], text: "只在脑子里飞", size: "m", color: "#7a4fd6", from: 7.4 }
        ]
      },
      {
        turn: 3,
        title: "醒来一下动不了",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "sprite", icon: "🧠", path: [[350, 300]], from: 0.3, to: 6.8, size: 110 },
          { kind: "text", at: [350, 430], text: "脑子醒了", size: "s", color: "#2f7d32", from: 0.8, to: 6.8 },
          { kind: "sprite", icon: "🔒", path: [[800, 300]], from: 1.4, to: 4.4, size: 110 },
          { kind: "text", at: [800, 430], text: "锁还没打开", size: "s", color: "#5a86dc", from: 1.8, to: 4.4 },
          { kind: "text", at: [600, 620], text: "一小会儿动不了，不危险", size: "m", from: 2.6, to: 6.8 },
          { kind: "sprite", icon: "🔓", path: [[800, 300]], from: 4.6, to: 6.8, size: 110 },
          { kind: "text", at: [800, 430], text: "很快自己打开", size: "s", color: "#2f7d32", from: 4.8, to: 6.8 },
          { kind: "sprite", icon: "🗣️", path: [[380, 400]], from: 7, size: 110 },
          { kind: "sprite", icon: "👋", path: [[560, 400]], from: 7.4, size: 100, wobble: true },
          { kind: "text", at: [600, 600], text: "锁不灵：梦里喊、挥手", size: "m", color: "#ff9f43", from: 7.8 },
          { kind: "sprite", icon: "🧑‍⚕️", path: [[860, 400]], from: 8.4, size: 110 },
          { kind: "text", at: [860, 520], text: "看医生", size: "s", color: "#ff9f43", from: 8.8 }
        ]
      },
      {
        turn: 4,
        title: "梦不能预言",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "myth", wrong: "梦在告诉我以后的事", right: "梦不能预言", from: 0.3, to: 3.4 },
          { kind: "text", at: [200, 110], text: "白天的材料", size: "s", from: 0.6, to: 5.4 },
          { kind: "shape", shape: "circle", at: [620, 340], size: [360, 250], color: "#efe6ff", from: 0.8 },
          { kind: "sprite", icon: "🦖", path: [[150, 200], [550, 320]], from: 1, travel: 1.4, size: 70 },
          { kind: "sprite", icon: "📝", path: [[150, 420], [690, 370]], from: 1.6, travel: 1.4, size: 70 },
          { kind: "text", at: [620, 530], text: "打乱了重新拼", size: "s", color: "#7a4fd6", from: 3, to: 5.4 },
          { kind: "sprite", icon: "🎲", path: [[960, 520]], from: 5.6, size: 90 },
          { kind: "text", at: [960, 650], text: "偶尔碰巧", size: "s", from: 6 },
          { kind: "text", at: [600, 800], text: "碰巧的事更容易记住", size: "m", color: "#7a4fd6", from: 6.8 }
        ]
      },
      {
        turn: 5,
        title: "做梦有什么用",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "❓", path: [[600, 200]], from: 0.3, to: 4.6, size: 110 },
          { kind: "text", at: [600, 330], text: "科学家还没完全弄清", size: "s", from: 0.8, to: 4.6 },
          { kind: "shape", shape: "pill", at: [270, 480], size: [220, 74], color: "#e4d4ff", text: "整理记忆", from: 1.6, to: 4.6 },
          { kind: "shape", shape: "pill", at: [270, 590], size: [220, 74], color: "#ffd6e0", text: "消化心情", from: 2, to: 4.6 },
          { kind: "shape", shape: "pill", at: [930, 530], size: [220, 74], color: "#e8e2d6", text: "顺带冒出", from: 3, to: 4.6 },
          { kind: "sprite", icon: "😴", path: [[600, 220]], from: 4.8, size: 90 },
          { kind: "flow", path: [[150, 400], [1050, 400]], icon: "💭", from: 5, to: 7.6, count: 5, speed: 150, size: 18 },
          { kind: "text", at: [600, 580], text: "每晚都做好几个梦", size: "m", color: "#7a4fd6", from: 5.4 },
          { kind: "sprite", icon: "💭", path: [[600, 400]], from: 7.8, size: 90 },
          { kind: "text", at: [600, 700], text: "醒来大多忘了", size: "s", from: 7.8 }
        ]
      }
    ]
  },
  {
    question: "memory",
    scenes: [
      {
        turn: 0,
        title: "沙滩上的脚印",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 90], text: "忘记很正常", size: "m", from: 0.4 },
          { kind: "shape", shape: "rect", at: [600, 600], size: [1100, 360], color: "#f3e2b8", from: 0.3 },
          { kind: "sprite", icon: "👣", path: [[200, 600], [600, 600]], from: 0.8, to: 5.2, travel: 1.6, size: 60 },
          { kind: "meter", at: [600, 220], label: "脚印深浅", start: 0, end: 0.4, color: "#c79a4a", from: 1.6, to: 3.4, over: 1 },
          { kind: "flow", path: [[1150, 520], [100, 520]], icon: "🌊", from: 3, to: 5.2, count: 3, speed: 300, size: 18 },
          { kind: "meter", at: [600, 220], label: "脚印深浅", start: 0.4, end: 0.15, color: "#c79a4a", from: 3.4, to: 5.8, over: 1.2 },
          { kind: "flow", path: [[150, 640], [1050, 640]], icon: "👣", from: 5.4, count: 4, speed: 200, size: 16 },
          { kind: "meter", at: [600, 220], label: "脚印深浅", start: 0.15, end: 0.95, color: "#c79a4a", from: 5.8, over: 2.2 },
          { kind: "text", at: [600, 820], text: "多走几遍，脚印变深", size: "m", color: "#2f7d32", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "一起亮，连得牢",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [600, 90], text: "神经细胞手拉手", size: "m", from: 0.3, to: 2.8 },
          { kind: "shape", shape: "circle", at: [250, 480], size: [130, 130], color: "#e8dcc8", from: 0.6, to: 3.6 },
          { kind: "shape", shape: "circle", at: [600, 300], size: [130, 130], color: "#e8dcc8", from: 0.9, to: 3.6 },
          { kind: "shape", shape: "circle", at: [950, 480], size: [130, 130], color: "#e8dcc8", from: 1.2, to: 3.6 },
          { kind: "flow", path: [[250, 480], [600, 300], [950, 480]], color: "#c9b8a6", from: 1.6, to: 5.4, count: 5, speed: 80, size: 5 },
          { kind: "sprite", icon: "📜", path: [[600, 680]], from: 3, size: 70 },
          { kind: "shape", shape: "circle", at: [250, 480], size: [130, 130], color: "#ffcf3f", from: 3.6 },
          { kind: "shape", shape: "circle", at: [600, 300], size: [130, 130], color: "#ffcf3f", from: 3.8 },
          { kind: "shape", shape: "circle", at: [950, 480], size: [130, 130], color: "#ffcf3f", from: 4 },
          { kind: "flow", path: [[250, 480], [600, 300], [950, 480]], color: "#ffcf3f", from: 5.2, count: 8, speed: 220, size: 10 },
          { kind: "text", at: [600, 820], text: "一起亮过，连接变强", size: "m", color: "#2f7d32", from: 5.8, to: 7.6 },
          { kind: "text", at: [600, 820], text: "一个亮，别的跟着亮", size: "m", color: "#b8860b", from: 7.8 }
        ]
      },
      {
        turn: 2,
        title: "遗忘曲线",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "shape", shape: "circle", at: [350, 400], size: [130, 130], color: "#ffcf3f", from: 0.3, to: 4.2 },
          { kind: "shape", shape: "circle", at: [850, 400], size: [130, 130], color: "#ffcf3f", from: 0.5, to: 4.2 },
          { kind: "flow", path: [[350, 400], [850, 400]], color: "#ffcf3f", from: 0.8, to: 2.6, count: 6, speed: 150, size: 8 },
          { kind: "text", at: [600, 250], text: "刚连上，还很嫩", size: "s", from: 1, to: 4.2 },
          { kind: "flow", path: [[350, 400], [850, 400]], color: "#d8c9b4", from: 2.6, to: 4.2, count: 2, speed: 60, size: 4 },
          { kind: "text", at: [600, 560], text: "不用就变弱", size: "s", color: "#ff5a5f", from: 2.8, to: 4.2 },
          { kind: "arrow", path: [[150, 760], [150, 140]], color: "#7a6a55", text: "记得多少", from: 4.4, draw: 0.6 },
          { kind: "arrow", path: [[150, 760], [1100, 760]], color: "#7a6a55", text: "时间", from: 4.6, draw: 0.6 },
          { kind: "arrow", path: [[160, 170], [240, 400], [330, 520], [450, 590], [650, 640], [1050, 670]], color: "#ff5a5f", from: 5.4, draw: 2 },
          { kind: "label", at: [260, 440], text: "头一两天掉最快", side: "right", from: 6.4, color: "#ff5a5f" },
          { kind: "label", at: [850, 655], text: "后来慢下来", side: "top", from: 7.4 },
          { kind: "text", at: [700, 200], text: "遗忘曲线", size: "m", color: "#ff5a5f", from: 8.2 }
        ]
      },
      {
        turn: 3,
        title: "间隔复习",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "arrow", path: [[150, 760], [150, 100]], color: "#7a6a55", text: "记得多少", from: 0.3, to: 6.4, draw: 0.6 },
          { kind: "arrow", path: [[150, 760], [1100, 760]], color: "#7a6a55", text: "时间", from: 0.5, to: 6.4, draw: 0.6 },
          { kind: "arrow", path: [[160, 170], [230, 380], [300, 470], [300, 175], [420, 320], [520, 380], [520, 175], [700, 290], [820, 320], [820, 175], [1080, 230]], color: "#2f7d32", from: 1, to: 6.4, draw: 3.6 },
          { kind: "sprite", icon: "🔁", path: [[300, 120]], from: 2.1, to: 4.8, size: 44 },
          { kind: "sprite", icon: "🔁", path: [[520, 120]], from: 2.8, to: 4.8, size: 44 },
          { kind: "sprite", icon: "🔁", path: [[820, 120]], from: 3.4, to: 4.8, size: 44 },
          { kind: "text", at: [650, 600], text: "复习一次，平一点", size: "m", color: "#2f7d32", from: 5, to: 6.4 },
          { kind: "text", at: [300, 260], text: "一天背 20 遍", size: "m", color: "#ff5a5f", from: 6.6 },
          { kind: "meter", at: [300, 450], label: "记得多久", start: 0, end: 0.3, color: "#ff5a5f", from: 7 },
          { kind: "text", at: [900, 260], text: "分几天背几遍", size: "m", color: "#2f7d32", from: 7.6 },
          { kind: "meter", at: [900, 450], label: "记得多久", start: 0, end: 0.9, color: "#2f7d32", from: 8, over: 1.5 }
        ]
      },
      {
        turn: 4,
        title: "自己考自己",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "📖", path: [[300, 300]], from: 0.3, to: 3.8, size: 110 },
          { kind: "text", at: [300, 450], text: "光看：效果一般", size: "s", color: "#7a6a55", from: 0.8, to: 3.8 },
          { kind: "sprite", icon: "📕", path: [[850, 300]], from: 1.8, to: 3.8, size: 110 },
          { kind: "sprite", icon: "🤔", path: [[970, 220]], from: 2.3, to: 3.8, size: 70 },
          { kind: "text", at: [850, 450], text: "合上书，自己考自己", size: "s", color: "#2f7d32", from: 2.8, to: 3.8 },
          { kind: "shape", shape: "circle", at: [300, 500], size: [130, 130], color: "#ffcf3f", from: 4 },
          { kind: "shape", shape: "circle", at: [900, 500], size: [130, 130], color: "#ffcf3f", from: 4.2 },
          { kind: "flow", path: [[300, 500], [900, 500]], color: "#ffcf3f", from: 4.6, to: 6, count: 4, speed: 120, size: 5 },
          { kind: "text", at: [600, 300], text: "用力想起来", size: "m", color: "#b8860b", from: 5, to: 7.6 },
          { kind: "flow", path: [[300, 500], [900, 500]], color: "#ffcf3f", from: 6, count: 8, speed: 220, size: 10 },
          { kind: "text", at: [600, 700], text: "路又走一遍，更牢", size: "s", color: "#2f7d32", from: 6.4 },
          { kind: "text", at: [600, 300], text: "背给爸妈听也算", size: "m", color: "#b8860b", from: 7.8 },
          { kind: "sprite", icon: "👨‍👧", path: [[600, 170]], from: 8, size: 80 }
        ]
      },
      {
        turn: 5,
        title: "睡觉帮你加固",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.3 }, { layer: "brain", opacity: 0.8 }],
        camera: [{ t: 0, at: "brain", zoom: 1.3 }],
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "😴", path: [[250, 150]], from: 0.3, to: 5.4, size: 70 },
          { kind: "text", at: [600, 90], text: "睡着后：再放几遍", size: "s", color: "#5a86dc", from: 0.6, to: 5.4 },
          { kind: "pulse", at: [600, 450], from: 1.2, color: "#ffcf3f", radius: 70, rate: 1.5 },
          { kind: "label", at: [600, 450], text: "白天新学的", side: "bottom", from: 1.6, to: 5.4 },
          { kind: "flow", path: [[600, 450], [680, 320], [760, 200]], color: "#ffcf3f", from: 2.6, count: 8, speed: 220, size: 10 },
          { kind: "label", at: [760, 200], text: "重要连接加固", side: "top", from: 3.4, to: 5.4, color: "#2f7d32" },
          { kind: "sprite", icon: "🌙", path: [[250, 150]], from: 5.6, to: 7.4, size: 70 },
          { kind: "text", at: [600, 820], text: "睡前背，早上再背", size: "m", color: "#2f7d32", from: 5.6, to: 7.4 },
          { kind: "sprite", icon: "☀️", path: [[1000, 150]], from: 6.4, to: 7.4, size: 70 },
          { kind: "sprite", icon: "🦉", path: [[250, 150]], from: 7.6, size: 70 },
          { kind: "text", at: [600, 820], text: "熬夜背：第二天易忘", size: "m", color: "#ff5a5f", from: 7.6 }
        ]
      }
    ]
  }
];
