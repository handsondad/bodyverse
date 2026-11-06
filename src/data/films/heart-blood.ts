import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "pulse",
    scenes: [
      {
        turn: 0,
        title: "心脏一挤，手腕一跳",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "arteries", opacity: 0.9 }, { layer: "heart", motion: "beat", rate: 1.2 }],
        camera: [{ t: 0, at: "heart", zoom: 2.4 }, { t: 2.6, at: "heart", zoom: 2.4 }, { t: 4, at: [540, 330], zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "heart", from: 0.4, to: 3.4, color: "#e5484d" },
          { kind: "label", at: "heart", text: "心脏咚地一挤", side: "right", from: 0.9, color: "#e5484d" },
          { kind: "pulse", at: "heart", from: 1.4, color: "#e5484d", radius: 40, rate: 1.2 },
          { kind: "flow", path: ["heart", "aorta", [575, 175], [515, 190], "humerus", [488, 330], "radialArtery", "wrist"], color: "#e5484d", from: 3.2, count: 9, speed: 160, size: 6 },
          { kind: "pulse", at: "radialArtery", from: 4.6, color: "#e5484d", radius: 36, rate: 1.2 },
          { kind: "label", at: "radialArtery", text: "这一鼓：脉搏", side: "left", from: 5.2 },
          { kind: "sprite", icon: "☝️", path: [{ a: "wrist", dx: -40, dy: 10 }], from: 6, size: 40 }
        ]
      },
      {
        turn: 1,
        title: "动脉一鼓一缩",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, "arteries", { layer: "heart", motion: "beat", rate: 1.2 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "aorta", from: 0.4, to: 3.2, color: "#e5484d", pad: 14 },
          { kind: "label", at: "aorta", text: "动脉像气球皮", side: "right", from: 0.9, to: 3.2 },
          { kind: "pulse", at: "carotid", from: 3.2, color: "#e5484d", radius: 40 },
          { kind: "label", at: "carotid", text: "脖子", side: "left", from: 3.5 },
          { kind: "pulse", at: "radialArtery", from: 4.4, color: "#e5484d", radius: 40 },
          { kind: "label", at: "radialArtery", text: "手腕", side: "left", from: 4.7 },
          { kind: "pulse", at: { a: "foot", dy: -10 }, from: 5.6, color: "#e5484d", radius: 40 },
          { kind: "label", at: { a: "foot", dy: -10 }, text: "脚背", side: "right", from: 5.9 }
        ]
      },
      {
        turn: 2,
        title: "跑得快的是波",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [620, 260], size: [820, 18], color: "#c9a27a", from: 0.3, to: 4.2 },
          { kind: "sprite", icon: "✋", path: [[180, 260]], from: 0.6, to: 4.2, size: 80 },
          { kind: "sprite", icon: "〰️", path: [[240, 245], [1010, 245]], from: 1.3, to: 4.2, travel: 0.9, size: 70 },
          { kind: "text", at: [620, 400], text: "波一下就到那头", from: 2.2, to: 4.2 },
          { kind: "shape", shape: "pill", at: [620, 560], size: [860, 90], color: "#f6c1c1", text: "动脉", from: 4.4 },
          { kind: "sprite", icon: "❤️", path: [[150, 560]], from: 4.8, size: 80 },
          { kind: "sprite", icon: "〰️", path: [[230, 540], [1020, 540]], from: 5.4, travel: 0.6, size: 64 },
          { kind: "pulse", at: [1050, 560], from: 6, color: "#e5484d", radius: 60 },
          { kind: "sprite", icon: "🔴", path: [[230, 590], [360, 590]], from: 5.4, travel: 3, size: 40 },
          { kind: "text", at: [400, 730], text: "血才走一小段", color: "#e5484d", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "浅浅的，下面有骨头",
        view: "arm",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "skeleton", opacity: 0.7 }, "arteries"],
        camera: [{ t: 0, at: "radialArtery", zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "radialArtery", from: 0.4, color: "#e5484d", pad: 10 },
          { kind: "label", at: "radialArtery", text: "离皮肤很近", side: "right", from: 0.9 },
          { kind: "label", at: { a: "forearm", dx: 30, dy: 90 }, text: "下面垫着骨头", side: "right", from: 2.2 },
          { kind: "sprite", icon: "☝️", path: [{ a: "radialArtery", dx: -20, dy: 60 }], from: 3.6, size: 70 },
          { kind: "pulse", at: "radialArtery", from: 4.2, color: "#e5484d", radius: 50 },
          { kind: "label", at: { a: "radialArtery", dx: -20, dy: -80 }, text: "大拇指这一侧", side: "left", from: 5.6 }
        ]
      },
      {
        turn: 4,
        title: "静脉为什么不跳",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [230, 360], size: [320, 80], color: "#e5484d", text: "动脉", from: 0.3 },
          { kind: "pulse", at: [230, 360], from: 0.8, to: 5.2, color: "#e5484d", radius: 90 },
          { kind: "shape", shape: "rect", at: [600, 360], size: [260, 120], color: "#f8d7da", text: "细小血管", outline: true, from: 2, motion: "wiggle" },
          { kind: "meter", at: [600, 600], label: "冲劲", start: 1, end: 0.15, color: "#ff9f43", from: 2.6, over: 3 },
          { kind: "shape", shape: "pill", at: [970, 360], size: [320, 80], color: "#5a86dc", text: "静脉", from: 4.2 },
          { kind: "flow", path: [[820, 360], [1120, 360]], color: "#5a86dc", from: 4.6, count: 5, speed: 60, size: 10 },
          { kind: "text", at: [970, 500], text: "又慢又平：不跳", color: "#5a86dc", size: "s", from: 5.6 }
        ]
      },
      {
        turn: 5,
        title: "跑完步跳得更快",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "muscles", opacity: 0.5 }, "arteries", { layer: "heart", motion: "beat", rate: 2.4 }],
        camera: [{ t: 0, at: [600, 420], zoom: 1.4 }],
        duration: 11,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[800, 260]], from: 0.3, to: 3.4, size: 70, wobble: true },
          { kind: "highlight", at: "quads", from: 0.8, to: 3.4, color: "#ff9f43" },
          { kind: "label", at: "quads", text: "腿要更多氧气", side: "left", from: 1.2 },
          { kind: "flow", path: ["heart", "aorta", [604, 300], [600, 400], [580, 430], "femoralArtery", "quads"], color: "#e5484d", from: 2, count: 12, speed: 380, size: 6 },
          { kind: "pulse", at: "radialArtery", from: 3.6, color: "#e5484d", radius: 36, rate: 2.4 },
          { kind: "meter", at: [930, 640], label: "脉搏快慢", start: 0.4, end: 0.9, color: "#e5484d", from: 4, to: 6.8, over: 2 },
          { kind: "meter", at: [930, 640], label: "休息一会儿", start: 0.9, end: 0.45, color: "#2f7d32", from: 7, over: 2.4 }
        ]
      },
      {
        turn: 6,
        title: "用食指和中指摸",
        view: "arm",
        layers: [{ layer: "skin", opacity: 0.6 }, "arteries"],
        camera: [{ t: 0, at: "radialArtery", zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "radialArtery", from: 0.4, to: 3.2, color: "#e5484d", pad: 10 },
          { kind: "sprite", icon: "✌️", path: [{ a: "radialArtery", dx: -90, dy: 40 }], from: 0.8, size: 80 },
          { kind: "label", at: "radialArtery", text: "食指中指按", side: "right", from: 1.3 },
          { kind: "sprite", icon: "👍", path: [[240, 520]], from: 3.4, size: 70 },
          { kind: "pulse", at: [240, 520], from: 3.8, color: "#ff5a5f", radius: 60 },
          { kind: "text", at: [600, 110], text: "拇指自己也会跳", color: "#ff5a5f", from: 4.3 },
          { kind: "text", at: [600, 820], text: "小孩心跳本来就快", size: "s", color: "#2f7d32", from: 6.2 }
        ]
      }
    ]
  },
  {
    question: "blood-red",
    scenes: [
      {
        turn: 0,
        title: "血里的红细胞",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🩸", path: [[260, 430]], from: 0.3, size: 150 },
          { kind: "arrow", path: [[380, 430], [560, 430]], from: 1.2, text: "放大看" },
          { kind: "shape", shape: "circle", at: [830, 430], size: [440, 440], color: "#fde8e8", outline: true, from: 1.8 },
          { kind: "flow", path: [[660, 330], [960, 300], [1000, 470], [820, 600], [660, 520], [660, 330]], color: "#e5484d", from: 2.4, count: 14, speed: 60, size: 22 },
          { kind: "label", at: [830, 430], text: "红细胞", pos: [830, 720], color: "#e5484d", from: 3.4 },
          { kind: "text", at: [600, 830], text: "一小滴里就有上亿个", size: "s", from: 4.6 }
        ]
      },
      {
        turn: 1,
        title: "血红蛋白和铁",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [400, 450], size: [420, 420], color: "#e5484d", from: 0.3 },
          { kind: "shape", shape: "circle", at: [400, 450], size: [220, 220], color: "#f7b0b0", motion: "grow", over: 1, from: 1.2 },
          { kind: "label", at: [470, 380], text: "血红蛋白", pos: [400, 150], from: 1.8 },
          { kind: "shape", shape: "circle", at: [400, 450], size: [76, 76], color: "#9c3b25", text: "铁", from: 2.8 },
          { kind: "text", at: [400, 790], text: "带铁的这块显红色", size: "s", from: 3.4, to: 4.8 },
          { kind: "flow", path: [[1150, 450], [520, 450]], color: "#4fb6ff", from: 5, count: 6, speed: 220, size: 14 },
          { kind: "text", at: [880, 300], text: "抱住氧气", color: "#4fb6ff", from: 5.4 }
        ]
      },
      {
        turn: 2,
        title: "鲜红和暗红",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [300, 400], size: [240, 240], color: "#e5484d", text: "鲜红", from: 0.3 },
          { kind: "flow", path: [[100, 260], [300, 400]], color: "#4fb6ff", from: 0.8, to: 3.4, count: 5, speed: 120, size: 12 },
          { kind: "text", at: [300, 600], text: "抱着氧气", from: 1.2 },
          { kind: "arrow", path: [[460, 400], [720, 400]], from: 2.8, text: "送出氧气" },
          { kind: "shape", shape: "circle", at: [900, 400], size: [240, 240], color: "#8e1b2b", from: 3.6 },
          { kind: "text", at: [900, 600], text: "暗红，像樱桃🍒", from: 4.2 },
          { kind: "myth", wrong: "送完氧气的血变成蓝色", right: "血一直是红的，只是深浅不同", from: 6 }
        ]
      },
      {
        turn: 3,
        title: "光在变魔术",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 620], size: [1000, 340], color: "#f6d3b8", from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 660], size: [260, 90], color: "#8e1b2b", from: 0.7 },
          { kind: "sprite", icon: "💡", path: [[600, 110]], from: 1.1, size: 80 },
          { kind: "arrow", path: [[560, 170], [600, 610]], color: "#e5484d", text: "红光被吃掉", from: 1.8, to: 6, draw: 1 },
          { kind: "arrow", path: [[720, 170], [880, 560], [1000, 200]], color: "#e5484d", text: "反射回来", from: 3.2, to: 6, draw: 1.2 },
          { kind: "sprite", icon: "👀", path: [[1050, 140]], from: 4.4, size: 70 },
          { kind: "shape", shape: "pill", at: [600, 660], size: [280, 100], color: "#7fa6e6", motion: "grow", over: 1.6, from: 6.2 },
          { kind: "text", at: [600, 300], text: "一比：这儿看着发青", color: "#5a86dc", from: 7 }
        ]
      },
      {
        turn: 4,
        title: "针管里是暗红",
        view: "arm",
        layers: [{ layer: "skin", opacity: 0.5 }, "veins"],
        camera: [{ t: 0, at: [490, 520], zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "label", at: [485, 515], text: "手上的静脉", side: "right", from: 0.5, to: 5.4 },
          { kind: "sprite", icon: "💉", path: [[800, 380], [540, 490]], from: 1.2, travel: 1.2, size: 70 },
          { kind: "shape", shape: "pill", at: [720, 700], size: [220, 60], color: "#8e1b2b", motion: "grow", over: 1.2, from: 2.8 },
          { kind: "text", at: [600, 820], text: "暗红色，一点也不蓝", from: 3.6 },
          { kind: "myth", wrong: "静脉里流着蓝色的血", right: "画成蓝色只为和动脉好区分", from: 5.6 }
        ]
      },
      {
        turn: 5,
        title: "真有蓝色的血",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[300, 260]], from: 0.3, size: 110 },
          { kind: "shape", shape: "circle", at: [300, 480], size: [200, 200], color: "#e5484d", text: "铁", from: 0.8 },
          { kind: "text", at: [300, 670], text: "血红蛋白：红", from: 1.4 },
          { kind: "sprite", icon: "🐙🦑", path: [[900, 260]], from: 2.8, size: 100 },
          { kind: "shape", shape: "circle", at: [900, 480], size: [200, 200], color: "#3d7bd9", text: "铜", from: 3.6 },
          { kind: "text", at: [900, 670], text: "血蓝蛋白：蓝", color: "#3d7bd9", from: 4.4 }
        ]
      }
    ]
  },
  {
    question: "heart-run",
    scenes: [
      {
        turn: 0,
        title: "心脏在加班",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "muscles", opacity: 0.5 }, "arteries", { layer: "heart", motion: "beat", rate: 2.4 }],
        camera: [{ t: 0, at: [600, 400], zoom: 1.3 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[840, 250]], from: 0.3, to: 3.4, size: 80, wobble: true },
          { kind: "highlight", at: "quads", from: 0.9, color: "#ff9f43" },
          { kind: "label", at: "quads", text: "腿要好多氧气", side: "left", from: 1.3 },
          { kind: "flow", path: ["heart", "aorta", [604, 300], [600, 400], [580, 430], "femoralArtery", "quads"], color: "#e5484d", from: 2.4, count: 12, speed: 380, size: 6 },
          { kind: "pulse", at: "heart", from: 3.4, color: "#e5484d", radius: 50, rate: 2.4 },
          { kind: "label", at: "heart", text: "跳得越快送得越多", side: "right", from: 3.8, color: "#e5484d" }
        ]
      },
      {
        turn: 1,
        title: "肌肉做的泵",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.3 }, { layer: "lungs", opacity: 0.3 }, { layer: "heart", motion: "beat", rate: 1.2 }],
        camera: [{ t: 0, at: "heart", zoom: 2 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "✊", path: [[880, 150]], from: 0.3, to: 3, size: 70 },
          { kind: "text", at: [600, 90], text: "跟拳头差不多大", from: 0.7, to: 3 },
          { kind: "label", at: "atriumRight", text: "右心房", side: "left", from: 1.6, to: 5 },
          { kind: "label", at: "ventricleLeft", text: "左心室", side: "right", from: 2.2, to: 5 },
          { kind: "label", at: "atriumLeft", text: "左心房", side: "top", from: 2.8, to: 5 },
          { kind: "label", at: "ventricleRight", text: "右心室", side: "bottom", from: 3.4, to: 5 },
          { kind: "flow", path: ["venaCava", "atriumRight", "ventricleRight", "pulmonaryTrunk"], color: "#5a86dc", from: 5.2, count: 7, speed: 140, size: 7 },
          { kind: "label", at: { a: "ventricleRight", dx: -45, dy: -55 }, text: "单向小门", side: "left", from: 5.6 },
          { kind: "flow", path: ["ventricleLeft", "aorta", [625, 70]], color: "#e5484d", from: 6.4, count: 7, speed: 140, size: 7 },
          { kind: "text", at: [600, 820], text: "一挤推出，一松装满", from: 7 }
        ]
      },
      {
        turn: 2,
        title: "起搏点发电",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.3 }, { layer: "lungs", opacity: 0.3 }, { layer: "heart", motion: "beat", rate: 1.2 }],
        camera: [{ t: 0, at: "heart", zoom: 2 }],
        duration: 9,
        cues: [
          { kind: "pulse", at: { a: "atriumRight", dx: -5, dy: -80 }, from: 0.4, color: "#ffcf3f", radius: 50 },
          { kind: "label", at: { a: "atriumRight", dx: -5, dy: -80 }, text: "起搏点：小闹钟", side: "left", from: 0.9 },
          { kind: "flow", path: [{ a: "atriumRight", dx: -5, dy: -80 }, "atriumRight", "ventricleRight", "ventricleLeft"], color: "#ffcf3f", from: 2.4, count: 8, speed: 200, size: 7 },
          { kind: "flow", path: [{ a: "atriumRight", dx: -5, dy: -80 }, "atriumLeft", "ventricleLeft"], color: "#ffcf3f", from: 2.8, count: 6, speed: 200, size: 7 },
          { kind: "text", at: [600, 820], text: "电信号一个传一个", color: "#b08900", from: 3.6 },
          { kind: "text", at: [900, 150], text: "咚！", size: "l", color: "#e5484d", from: 5.6 }
        ]
      },
      {
        turn: 3,
        title: "大脑踩油门",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, { layer: "nerves", opacity: 0.5 }, { layer: "kidneys", opacity: 0.8 }, { layer: "heart", motion: "beat", rate: 2.4 }],
        camera: [{ t: 0, at: [600, 200], zoom: 1.8 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "brain", from: 0.4, to: 3.4, color: "#b48cff", pad: 10 },
          { kind: "label", at: "brain", text: "大脑", side: "right", from: 0.8, color: "#7a4fd6" },
          { kind: "flow", path: ["brain", "brainstem", [604, 150], "heart"], color: "#ffcf3f", from: 1.6, count: 7, speed: 120, size: 5 },
          { kind: "flow", path: [{ a: "kidneyLeft", dy: -28 }, [640, 270], "heart"], color: "#ff9f43", from: 3.6, count: 6, speed: 90, size: 5 },
          { kind: "label", at: { a: "kidneyLeft", dy: -28 }, text: "肾上腺素", side: "right", from: 4 },
          { kind: "pulse", at: "heart", from: 5.4, color: "#e5484d", radius: 36, rate: 2.4 },
          { kind: "text", at: [600, 820], text: "跳得更快更有劲", color: "#e5484d", from: 6 }
        ]
      },
      {
        turn: 4,
        title: "钙是一把钥匙",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 430], size: [1000, 300], color: "#fde3e3", outline: true, from: 0.3, to: 6.4 },
          { kind: "shape", shape: "pill", at: [600, 430], size: [420, 50], color: "#b34a2e", from: 0.6, to: 6.4 },
          { kind: "shape", shape: "pill", at: [300, 430], size: [340, 26], color: "#f2a3a3", from: 0.9, to: 6.4 },
          { kind: "shape", shape: "pill", at: [900, 430], size: [340, 26], color: "#f2a3a3", from: 1.2, to: 6.4 },
          { kind: "label", at: [600, 430], text: "两种很细的丝", pos: [600, 200], from: 1.6, to: 3.2 },
          { kind: "sprite", icon: "⚡", path: [[600, 160]], from: 2.6, to: 3.6, size: 80 },
          { kind: "flow", path: [[600, 60], [600, 400]], icon: "🔑", from: 3.6, to: 4.9, count: 4, speed: 200, size: 14 },
          { kind: "text", at: [600, 780], text: "钙像一把钥匙", from: 3.8, to: 4.9 },
          { kind: "arrow", path: [[150, 560], [420, 560]], text: "往中间拉", from: 5, to: 6.4 },
          { kind: "arrow", path: [[1050, 560], [780, 560]], from: 5.2, to: 6.4 },
          { kind: "shape", shape: "rect", at: [600, 430], size: [760, 300], color: "#fde3e3", outline: true, from: 6.6 },
          { kind: "shape", shape: "pill", at: [600, 430], size: [420, 50], color: "#b34a2e", from: 6.6 },
          { kind: "shape", shape: "pill", at: [420, 430], size: [340, 26], color: "#f2a3a3", from: 6.8 },
          { kind: "shape", shape: "pill", at: [780, 430], size: [340, 26], color: "#f2a3a3", from: 6.8 },
          { kind: "text", at: [600, 780], text: "细胞缩短了", color: "#e5484d", from: 7.6 }
        ]
      },
      {
        turn: 5,
        title: "丝上的小马达",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 330], size: [900, 26], color: "#f2a3a3", from: 0.3, to: 5.8 },
          { kind: "shape", shape: "pill", at: [600, 430], size: [760, 56], color: "#b34a2e", from: 0.6, to: 5.8 },
          { kind: "shape", shape: "circle", at: [600, 375], size: [64, 64], color: "#ffcf3f", motion: "wiggle", from: 1.2, to: 5.8 },
          { kind: "label", at: [600, 375], text: "小手像小马达", pos: [900, 200], from: 1.6, to: 5.8 },
          { kind: "flow", path: [[1040, 330], [160, 330]], color: "#e5484d", from: 2.4, to: 5.8, count: 10, speed: 120, size: 6 },
          { kind: "text", at: [600, 600], text: "抓、拉、松、再抓", from: 2.8, to: 5.8 },
          { kind: "sprite", icon: "🍚", path: [[220, 330]], from: 6, size: 90 },
          { kind: "flow", path: [[220, 560], [560, 470]], color: "#4fb6ff", from: 6.4, count: 5, speed: 120, size: 10 },
          { kind: "sprite", icon: "❤️", path: [[750, 450]], from: 7, size: 170, wobble: true },
          { kind: "flow", path: [[640, 330], [750, 300], [860, 340], [880, 470], [750, 600]], color: "#e5484d", from: 7.6, count: 8, speed: 120, size: 8 },
          { kind: "text", at: [600, 790], text: "心脏自己也要氧气", from: 8.2 }
        ]
      },
      {
        turn: 6,
        title: "太快反而装不满",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [330, 200], text: "合适的快慢", color: "#2f7d32", from: 0.3 },
          { kind: "meter", at: [330, 380], label: "每下装血", start: 0, end: 0.95, color: "#e5484d", from: 0.8, over: 1.6 },
          { kind: "text", at: [870, 200], text: "太快了", color: "#ff5a5f", from: 2.6 },
          { kind: "meter", at: [870, 380], label: "装不满", start: 0, end: 0.45, color: "#e5484d", from: 3.2, over: 0.6 },
          { kind: "text", at: [870, 520], text: "推出的血少", size: "s", color: "#ff5a5f", from: 4.2 },
          { kind: "meter", at: [600, 700], label: "休息后心跳", start: 0.9, end: 0.4, color: "#2f7d32", from: 6, over: 2.4 }
        ]
      }
    ]
  },
  {
    question: "blush",
    scenes: [
      {
        turn: 0,
        title: "不是发烧，是脸红",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.9 }, { layer: "arteries", opacity: 0.6, from: 1 }],
        camera: [{ t: 0, at: "face", zoom: 1.3 }],
        duration: 9,
        cues: [
          { kind: "flow", path: [[470, 860], [460, 640], [480, 540]], color: "#e5484d", from: 0.8, count: 7, speed: 120, size: 8 },
          { kind: "flow", path: [[730, 860], [740, 640], [720, 540]], color: "#e5484d", from: 0.8, count: 7, speed: 120, size: 8 },
          { kind: "label", at: { a: "face", dx: -150, dy: 20 }, text: "小血管张大", side: "left", from: 1.6 },
          { kind: "highlight", at: "face", from: 2.4, to: 6.4, color: "#ff7a8a" },
          { kind: "text", at: [600, 110], text: "又红又烫", color: "#ff5a5f", from: 3.2 },
          { kind: "sprite", icon: "♨️", path: [{ a: "face", dx: 260, dy: -80 }], from: 3.8, to: 5.8, size: 60 },
          { kind: "text", at: [600, 820], text: "过一会儿就退", color: "#2f7d32", from: 6.4 }
        ]
      },
      {
        turn: 1,
        title: "脸颊皮薄血管浅",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [320, 380], size: [400, 60], color: "#f6d3b8", text: "脸颊：皮薄", from: 0.3 },
          { kind: "flow", path: [[130, 440], [510, 440]], color: "#e5484d", from: 0.9, count: 12, speed: 90, size: 10 },
          { kind: "text", at: [320, 600], text: "一红就看得出", color: "#e5484d", from: 1.8 },
          { kind: "shape", shape: "rect", at: [880, 420], size: [400, 160], color: "#f6d3b8", text: "手背", from: 3.2 },
          { kind: "flow", path: [[690, 540], [1070, 540]], color: "#e5484d", from: 3.8, count: 4, speed: 90, size: 10 },
          { kind: "text", at: [880, 660], text: "不太会红", from: 4.6 }
        ]
      },
      {
        turn: 2,
        title: "交感神经忙起来",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, { layer: "nerves", opacity: 0.6 }, { layer: "heart", motion: "beat", rate: 2 }],
        camera: [{ t: 0, at: [580, 240], zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "brain", from: 0.4, to: 2.6, color: "#b48cff", pad: 10 },
          { kind: "flow", path: ["brain", "brainstem", "spinalCord"], color: "#ffcf3f", from: 1, count: 7, speed: 100, size: 5 },
          { kind: "label", at: "spinalCord", text: "交感神经", side: "right", from: 1.4 },
          { kind: "pulse", at: "heart", from: 2.8, color: "#e5484d", radius: 36, rate: 2 },
          { kind: "sprite", icon: "💦", path: [{ a: "wrist", dx: -20 }], from: 3.6, size: 34 },
          { kind: "highlight", at: "face", from: 4.4, color: "#ff7a8a", pad: 8 },
          { kind: "text", at: [600, 820], text: "心跳快·出汗·脸红", from: 5.2 }
        ]
      },
      {
        turn: 3,
        title: "身体的警报员",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🚨", path: [[600, 210]], from: 0.3, size: 110 },
          { kind: "pulse", at: [600, 210], from: 0.7, color: "#ff5a5f", radius: 120 },
          { kind: "sprite", icon: "🐅", path: [[280, 470]], from: 1.6, size: 120 },
          { kind: "text", at: [300, 670], text: "很久以前：打或跑", size: "s", from: 2.2 },
          { kind: "sprite", icon: "🧒🎤", path: [[900, 470]], from: 3.8, size: 110 },
          { kind: "text", at: [900, 670], text: "现在：大家看我", size: "s", from: 4.4 }
        ]
      },
      {
        turn: 4,
        title: "越想别红越红",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 220], size: [220, 130], color: "#ffd6dc", text: "别红！", from: 0.3, to: 6 },
          { kind: "arrow", path: [[700, 290], [830, 470]], from: 0.9, to: 6 },
          { kind: "shape", shape: "circle", at: [880, 560], size: [220, 130], color: "#ffd6dc", text: "更在意", from: 1.4, to: 6 },
          { kind: "arrow", path: [[760, 600], [440, 600]], from: 2, to: 6 },
          { kind: "shape", shape: "circle", at: [320, 560], size: [220, 130], color: "#ff9aa8", text: "更紧张", from: 2.5, to: 6 },
          { kind: "arrow", path: [[370, 470], [500, 290]], from: 3.1, to: 6 },
          { kind: "sprite", icon: "😮‍💨", path: [[330, 400]], from: 6.2, size: 130 },
          { kind: "text", at: [330, 600], text: "慢慢吸口气", from: 6.6 },
          { kind: "sprite", icon: "📖", path: [[870, 400]], from: 7, size: 120 },
          { kind: "text", at: [870, 600], text: "想着故事", from: 7.4 },
          { kind: "meter", at: [600, 780], label: "警报声", start: 0.9, end: 0.2, color: "#2f7d32", from: 8, over: 1.6 }
        ]
      },
      {
        turn: 5,
        title: "只有人会害羞脸红",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🐱🐶", path: [[320, 300]], from: 0.3, size: 100 },
          { kind: "text", at: [320, 480], text: "害怕：心跳快", from: 1 },
          { kind: "text", at: [320, 580], text: "害羞：不脸红", color: "#ff5a5f", from: 2.2 },
          { kind: "sprite", icon: "😳", path: [[880, 300]], from: 3.4, size: 120 },
          { kind: "text", at: [880, 480], text: "人：会脸红", color: "#e5484d", from: 4 },
          { kind: "text", at: [600, 780], text: "最属于人的表情", from: 5.4 }
        ]
      },
      {
        turn: 6,
        title: "也许是诚实信号",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 110], text: "科学家还在研究", size: "s", color: "#7a6a55", from: 0.3 },
          { kind: "sprite", icon: "😳", path: [[300, 400]], from: 0.8, size: 140 },
          { kind: "text", at: [300, 600], text: "装不出、藏不住", size: "s", from: 1.5 },
          { kind: "arrow", path: [[460, 400], [740, 400]], text: "别人看见", from: 2.8 },
          { kind: "sprite", icon: "🤗", path: [[900, 400]], from: 3.8, size: 140 },
          { kind: "text", at: [900, 600], text: "更愿意原谅", color: "#2f7d32", from: 4.4 }
        ]
      }
    ]
  },
  {
    question: "bruise",
    scenes: [
      {
        turn: 0,
        title: "皮下漏了点血",
        view: "leg",
        layers: [{ layer: "skeleton", opacity: 0.4 }, { layer: "skin", opacity: 0.7 }],
        camera: [{ t: 0, at: "tibia", zoom: 1.8 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "💥", path: [{ a: "tibia", dx: 60, dy: -60 }], from: 0.5, to: 2, size: 70 },
          { kind: "shape", shape: "circle", at: { a: "tibia", dy: -40 }, size: [110, 80], color: "#7b4a9e", motion: "grow", over: 1.6, from: 1.4 },
          { kind: "label", at: { a: "tibia", dy: -40 }, text: "皮下漏了点血", side: "right", from: 2.4 },
          { kind: "text", at: [600, 110], text: "不是坏了，在变好", color: "#2f7d32", from: 4.6 }
        ]
      },
      {
        turn: 1,
        title: "巨噬细胞来打扫",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "flow", path: [[120, 250], [300, 420], [160, 620], [320, 760]], color: "#e5484d", from: 0.3, to: 3.6, count: 7, speed: 40, size: 18 },
          { kind: "label", at: [300, 420], text: "漏出的红细胞", pos: [320, 120], from: 0.8, to: 3.6 },
          { kind: "shape", shape: "circle", at: [780, 450], size: [320, 270], color: "#f3e2a9", text: "巨噬细胞", motion: "pulse", from: 2 },
          { kind: "text", at: [780, 660], text: "特别能吃", from: 2.6 },
          { kind: "flow", path: [[160, 450], [700, 450]], color: "#e5484d", from: 3.8, count: 6, speed: 160, size: 18 },
          { kind: "text", at: [600, 820], text: "吞进去，慢慢拆开", from: 5 }
        ]
      },
      {
        turn: 2,
        title: "红变绿、绿变黄",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [210, 420], size: [220, 220], color: "#b0506a", text: "血红蛋白", from: 0.3 },
          { kind: "arrow", path: [[340, 420], [460, 420]], from: 1.6 },
          { kind: "shape", shape: "circle", at: [600, 420], size: [220, 220], color: "#5aa469", text: "绿色的", from: 2.2 },
          { kind: "arrow", path: [[730, 420], [850, 420]], from: 3.6 },
          { kind: "shape", shape: "circle", at: [990, 420], size: [220, 220], color: "#f2c94c", text: "黄色的", from: 4.2 },
          { kind: "text", at: [600, 720], text: "带铁那块被改造", from: 5.4 }
        ]
      },
      {
        turn: 3,
        title: "运到肝脏回收",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "veins", opacity: 0.5 }, { layer: "largeIntestine", opacity: 0.6 }, "liver"],
        camera: [{ t: 0, at: [580, 520], zoom: 1.2 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: { a: "tibia", dy: -40 }, from: 0.3, to: 3.4, color: "#f2c94c", radius: 40 },
          { kind: "flow", path: [{ a: "tibia", dy: -40 }, "knee", "femoralArtery", [590, 380], "liver"], color: "#f2c94c", from: 0.8, count: 9, speed: 160, size: 6 },
          { kind: "highlight", at: "liver", from: 1.8, color: "#a0522d" },
          { kind: "label", at: "liver", text: "肝脏：回收站", side: "right", from: 2.2 },
          { kind: "flow", path: ["liver", "largeIntestine", "colonEnd"], color: "#b5895a", from: 3.6, count: 6, speed: 90, size: 6 },
          { kind: "label", at: "colonEnd", text: "跟着便便排出", side: "right", from: 4.2 },
          { kind: "text", at: [600, 90], text: "铁留下做新红细胞", color: "#e5484d", from: 5.6 }
        ]
      },
      {
        turn: 4,
        title: "一两周慢慢消失",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "arrow", path: [[150, 720], [1050, 720]], text: "一两个星期", draw: 1.2, from: 0.3 },
          { kind: "sprite", icon: "📅", path: [[150, 650], [1050, 650]], from: 0.8, travel: 7, size: 50 },
          { kind: "shape", shape: "circle", at: [600, 380], size: [300, 220], color: "#6b3fa0", text: "青紫", from: 1, to: 3 },
          { kind: "shape", shape: "circle", at: [600, 380], size: [300, 220], color: "#6aa84f", text: "发绿", from: 3, to: 5 },
          { kind: "shape", shape: "circle", at: [600, 380], size: [300, 220], color: "#f2c94c", text: "变黄", motion: "shrink", over: 2, from: 5, to: 7 },
          { kind: "sprite", icon: "✨", path: [[600, 380]], from: 7.2, size: 100 },
          { kind: "text", at: [600, 130], text: "撞得越重越久", size: "s", color: "#7a6a55", from: 7.8 }
        ]
      },
      {
        turn: 5,
        title: "小腿前面肉少",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "muscles", opacity: 0.5 }, "skeleton"],
        camera: [{ t: 0, at: "tibia", zoom: 2 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "tibia", from: 0.4, to: 4.6, color: "#ffb300", pad: 10 },
          { kind: "label", at: "tibia", text: "骨头就在皮下", side: "right", from: 0.8, to: 2.8 },
          { kind: "sprite", icon: "📦", path: [[880, 560], [690, 610]], from: 2, travel: 0.8, to: 4.6, size: 60 },
          { kind: "pulse", at: [640, 615], from: 2.8, color: "#ff5a5f", radius: 50 },
          { kind: "label", at: [640, 615], text: "小血管被夹住", side: "left", from: 3.2 },
          { kind: "text", at: [600, 110], text: "皮薄肉少更易青", color: "#7a6a55", from: 5 }
        ]
      },
      {
        turn: 6,
        title: "先冷敷，后热敷",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "🧊", path: [[300, 240]], from: 0.3, to: 7.2, size: 100 },
          { kind: "shape", shape: "pill", at: [300, 440], size: [300, 70], color: "#e5484d", text: "收紧", motion: "shrink", over: 1.5, from: 0.9, to: 7.2 },
          { kind: "text", at: [300, 610], text: "漏的血少一点", size: "s", from: 1.6, to: 7.2 },
          { kind: "sprite", icon: "♨️", path: [[900, 240]], from: 3, to: 7.2, size: 100 },
          { kind: "flow", path: [[720, 440], [1080, 440]], color: "#e5484d", from: 3.6, to: 7.2, count: 10, speed: 400, size: 14 },
          { kind: "text", at: [900, 610], text: "打扫来得勤", size: "s", color: "#2f7d32", from: 4.2, to: 7.2 },
          { kind: "myth", wrong: "使劲揉，好得快", right: "别揉，越揉小血管破得越多", from: 7.4 }
        ]
      }
    ]
  }
];
