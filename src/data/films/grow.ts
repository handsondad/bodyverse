import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "belly-button",
    scenes: [
      {
        turn: 0,
        title: "不是扣子，是肚脐",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "myth", wrong: "肚子上的小洞是扣子", right: "它叫肚脐", from: 0.3, to: 3 },
          { kind: "shape", shape: "circle", at: [560, 420], size: [600, 560], color: "#ffe1ec", outline: true, from: 2.8 },
          { kind: "sprite", icon: "👶", path: [[470, 400]], size: 170, from: 3.3 },
          { kind: "shape", shape: "pill", at: [700, 470], size: [300, 28], color: "#ff9fbf", from: 4 },
          { kind: "label", at: [720, 470], text: "脐带", side: "bottom", from: 4.5, to: 6.4 },
          { kind: "flow", path: [[840, 462], [560, 462]], color: "#ffc75a", count: 6, speed: 120, size: 9, from: 5.2 },
          { kind: "flow", path: [[840, 480], [560, 480]], color: "#4fb6ff", count: 6, speed: 120, size: 9, from: 5.6 },
          { kind: "text", at: [600, 800], text: "吃的、喝的、氧气", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "胎盘：软软的小垫子",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "circle", at: [560, 420], size: [600, 560], color: "#ffe1ec", outline: true, from: 0 },
          { kind: "sprite", icon: "👶", path: [[470, 400]], size: 170, from: 0 },
          { kind: "shape", shape: "pill", at: [700, 470], size: [300, 28], color: "#ff9fbf", from: 0 },
          { kind: "shape", shape: "circle", at: [815, 450], size: [100, 230], color: "#ff8fb3", text: "胎盘", from: 0.8 },
          { kind: "label", at: [865, 450], text: "贴在子宫壁上", pos: [1010, 250], from: 1.4, to: 3.4 },
          { kind: "flow", path: [[1190, 330], [870, 430], [800, 462], [560, 462]], color: "#ffc75a", count: 9, speed: 160, size: 9, from: 3.4, to: 6.2 },
          { kind: "flow", path: [[1190, 380], [870, 450], [800, 480], [560, 480]], color: "#4fb6ff", count: 9, speed: 160, size: 9, from: 3.8, to: 6.2 },
          { kind: "flow", path: [[560, 470], [800, 470], [870, 520], [1190, 620]], color: "#a08f7a", count: 7, speed: 140, size: 9, from: 6.4 },
          { kind: "text", at: [960, 780], text: "废物交回妈妈", size: "s", from: 7 }
        ]
      },
      {
        turn: 2,
        title: "隔着一层薄墙",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 450], size: [1000, 560], color: "#ffd3da", text: "妈妈的血", from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 580], size: [760, 120], color: "#ffb3c1", text: "宝宝的血管", outline: true, from: 0.9 },
          { kind: "label", at: [420, 520], text: "薄薄的一层墙", pos: [330, 300], from: 1.8, to: 4 },
          { kind: "flow", path: [[330, 260], [350, 575], [880, 575]], color: "#4fb6ff", count: 8, speed: 150, size: 9, from: 3 },
          { kind: "flow", path: [[560, 260], [580, 600], [1000, 600]], color: "#ffc75a", count: 8, speed: 150, size: 9, from: 3.5 },
          { kind: "sprite", icon: "🔴", path: [[860, 230], [830, 470], [900, 330]], travel: 1.8, size: 48, from: 4.4 },
          { kind: "text", at: [900, 250], text: "细胞过不去", size: "s", from: 5.2, to: 6.6 },
          { kind: "text", at: [600, 800], text: "像隔着纱窗递东西", from: 6.8 }
        ]
      },
      {
        turn: 3,
        title: "脐带下岗了",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "👶", path: [[420, 430]], size: 170, from: 0.2 },
          { kind: "shape", shape: "pill", at: [690, 480], size: [300, 28], color: "#ff9fbf", from: 0.5, to: 4.8 },
          { kind: "sprite", icon: "🍼", path: [[160, 250], [330, 380]], travel: 1, size: 70, from: 1, to: 3.8 },
          { kind: "sprite", icon: "🫁", path: [[420, 630]], size: 80, from: 1.8, to: 3.8 },
          { kind: "text", at: [420, 760], text: "自己吃奶、自己呼吸", size: "s", from: 2.3, to: 3.8 },
          { kind: "sprite", icon: "💤", path: [[780, 410]], size: 54, from: 3, to: 4.6 },
          { kind: "shape", shape: "rect", at: [600, 480], size: [18, 64], color: "#7fb3d5", from: 4 },
          { kind: "sprite", icon: "✂️", path: [[700, 480]], size: 70, wobble: true, from: 4.4, to: 6 },
          { kind: "shape", shape: "pill", at: [565, 480], size: [50, 28], color: "#ff9fbf", from: 4.8 },
          { kind: "label", at: [565, 480], text: "没有管疼的神经", pos: [640, 300], from: 5.4 },
          { kind: "text", at: [760, 650], text: "剪了也不疼", color: "#2f7d32", from: 6 }
        ]
      },
      {
        turn: 4,
        title: "掉下来就是肚脐",
        view: "belly",
        layers: ["skin"],
        camera: [{ t: 0, at: "navel", zoom: 1.5 }, { t: 1.2, at: "navel", zoom: 2.2 }],
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: { a: "navel", dy: 14 }, size: [20, 44], color: "#ff9fbf", from: 0.4, to: 2.6 },
          { kind: "label", at: "navel", text: "剩下一小截", side: "right", from: 1, to: 2.6 },
          { kind: "shape", shape: "pill", at: { a: "navel", dy: 14 }, size: [20, 44], color: "#7a5a3a", motion: "shrink", from: 2.6, to: 4.6 },
          { kind: "label", at: "navel", text: "变干、变黑", side: "right", from: 3, to: 4.6 },
          { kind: "text", at: [600, 800], text: "一两周掉下来", size: "s", from: 3.6, to: 6 },
          { kind: "sprite", icon: "🍂", path: [{ a: "navel", dy: 14 }, { a: "navel", dx: -50, dy: 170 }], travel: 1.2, size: 40, from: 4.6, to: 6.2 },
          { kind: "highlight", at: "navel", color: "#ff9fbf", from: 5.6 },
          { kind: "label", at: "navel", text: "肚脐", side: "right", from: 6 },
          { kind: "text", at: [600, 120], text: "吃饭的老门口", from: 6.8 }
        ]
      },
      {
        turn: 5,
        title: "凹的凸的都正常",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 380], size: [640, 90], color: "#ffd2b5", text: "皮肤和肌肉", from: 0.3, to: 3.8 },
          { kind: "arrow", path: [[150, 250], [520, 360]], text: "收拢", from: 0.9, to: 3.8 },
          { kind: "arrow", path: [[1050, 250], [680, 360]], from: 1.2, to: 3.8 },
          { kind: "pulse", at: [600, 380], color: "#ff9fbf", radius: 80, from: 1.8, to: 3.8 },
          { kind: "myth", wrong: "凸肚脐是医生没剪好", right: "和怎么剪基本没关系", from: 3, to: 6 },
          { kind: "shape", shape: "rect", at: [380, 480], size: [320, 140], color: "#ffd2b5", text: "凹进去", from: 6.2 },
          { kind: "shape", shape: "circle", at: [380, 432], size: [90, 40], color: "#d9957a", from: 6.2 },
          { kind: "shape", shape: "rect", at: [820, 480], size: [320, 140], color: "#ffd2b5", text: "凸出来", from: 6.8 },
          { kind: "shape", shape: "circle", at: [820, 410], size: [80, 80], color: "#ffd2b5", from: 6.8 },
          { kind: "text", at: [600, 660], text: "凹的多，凸的也常见", from: 7.6 },
          { kind: "text", at: [600, 780], text: "都正常", size: "l", color: "#2f7d32", from: 8.4 }
        ]
      }
    ]
  },
  {
    question: "lose-teeth",
    scenes: [
      {
        turn: 0,
        title: "乳牙下面藏着新牙",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, "teeth"],
        camera: [{ t: 0, at: [600, 720], zoom: 1.5 }, { t: 1.2, at: [600, 720], zoom: 2.2 }],
        duration: 8,
        cues: [
          { kind: "shape", shape: "rect", at: [590, 725], size: [26, 46], color: "#fffaf0", outline: true, motion: "wiggle", from: 0.4 },
          { kind: "label", at: [590, 725], text: "乳牙：第一套牙", side: "left", from: 1 },
          { kind: "text", at: [600, 110], text: "这叫换牙，别怕", from: 2 },
          { kind: "shape", shape: "rect", at: [592, 788], size: [38, 54], color: "#fffaf0", outline: true, motion: "grow", over: 2.5, from: 3.2 },
          { kind: "label", at: [592, 800], text: "恒牙：更大更结实", side: "bottom", from: 3.8 },
          { kind: "arrow", path: [[645, 815], [645, 740]], text: "等着出场", from: 5 }
        ]
      },
      {
        turn: 1,
        title: "小下巴装不下",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "flow", path: [[230, 520], [235, 420], [260, 350], [330, 320], [400, 350], [425, 420], [430, 520]], icon: "🦷", count: 21, speed: 0, size: 6, from: 0.3 },
          { kind: "sprite", icon: "👶", path: [[330, 450]], size: 80, from: 0.6 },
          { kind: "count", at: [330, 700], label: "小朋友的乳牙", start: 0, end: 20, unit: "颗", over: 1.6, from: 1.2 },
          { kind: "arrow", path: [[490, 430], [630, 430]], text: "下巴长大", from: 2.8, to: 4.6 },
          { kind: "flow", path: [[680, 600], [690, 440], [740, 320], [850, 270], [960, 320], [1010, 440], [1020, 600]], icon: "🦷", count: 33, speed: 0, size: 10, from: 3.6 },
          { kind: "sprite", icon: "🧑", path: [[850, 480]], size: 120, from: 4 },
          { kind: "text", at: [850, 730], text: "大人 28～32 颗", from: 5 }
        ]
      },
      {
        turn: 2,
        title: "恒牙藏在骨头里",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.3 }, "skeleton", "teeth"],
        camera: [{ t: 0, at: [330, 720], zoom: 1.5 }, { t: 1.2, at: [330, 720], zoom: 2.2 }],
        duration: 8,
        cues: [
          { kind: "label", at: [288, 715], text: "乳牙", side: "left", from: 0.4 },
          { kind: "shape", shape: "rect", at: [315, 785], size: [30, 42], color: "#fffaf0", outline: true, motion: "grow", over: 5, from: 1 },
          { kind: "label", at: [315, 798], text: "恒牙藏在骨头里", side: "bottom", from: 1.6 },
          { kind: "shape", shape: "rect", at: [388, 780], size: [36, 40], color: "#fffaf0", outline: true, motion: "grow", over: 5, from: 2.2 },
          { kind: "sprite", icon: "👶", path: [[500, 590]], size: 54, from: 3.2, to: 5.6 },
          { kind: "text", at: [600, 110], text: "小宝宝时就在长", size: "s", from: 3.6, to: 5.6 },
          { kind: "text", at: [600, 110], text: "一年一年变大", from: 5.8 }
        ]
      },
      {
        turn: 3,
        title: "小清洁工吃牙根",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 660], size: [1100, 440], color: "#f1dfc0", text: "骨头", from: 0.2 },
          { kind: "shape", shape: "rect", at: [600, 345], size: [150, 190], color: "#fffaf0", text: "乳牙", outline: true, from: 0.2, to: 6.2 },
          { kind: "shape", shape: "rect", at: [600, 525], size: [80, 170], color: "#fffaf0", outline: true, from: 0.2, to: 3.6 },
          { kind: "shape", shape: "rect", at: [600, 495], size: [80, 110], color: "#fffaf0", outline: true, from: 3.6, to: 5.4 },
          { kind: "shape", shape: "rect", at: [600, 465], size: [80, 50], color: "#fffaf0", outline: true, from: 5.4 },
          { kind: "shape", shape: "rect", at: [600, 775], size: [170, 140], color: "#fffaf0", text: "恒牙", outline: true, motion: "grow", over: 6, from: 0.8 },
          { kind: "arrow", path: [[800, 820], [800, 680]], text: "往上长", from: 1.4, to: 2.8 },
          { kind: "sprite", icon: "😋", path: [[720, 700], [665, 610], [665, 470]], travel: 4.4, size: 60, from: 2.8 },
          { kind: "text", at: [600, 110], text: "小清洁工啃牙根", from: 3.2, to: 6 },
          { kind: "shape", shape: "rect", at: [600, 345], size: [150, 190], color: "#fffaf0", text: "乳牙", outline: true, motion: "wiggle", from: 6.2 },
          { kind: "text", at: [600, 110], text: "根短了，就晃了", from: 6.6 }
        ]
      },
      {
        turn: 4,
        title: "不是被顶掉的",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 660], size: [1100, 440], color: "#f1dfc0", from: 0.2 },
          { kind: "shape", shape: "rect", at: [600, 365], size: [150, 230], color: "#fffaf0", text: "乳牙", outline: true, motion: "wiggle", from: 0.2, to: 4.4 },
          { kind: "shape", shape: "rect", at: [600, 660], size: [170, 130], color: "#fffaf0", text: "恒牙", outline: true, from: 0.5, to: 5.2 },
          { kind: "myth", wrong: "乳牙是被新牙顶掉的", right: "根被吃没了，自己松掉", from: 0.9, to: 4.4 },
          { kind: "sprite", icon: "🦷", path: [[600, 350], [820, 150]], travel: 1, spin: true, size: 90, from: 4.4, to: 6.4 },
          { kind: "arrow", path: [[820, 640], [820, 470]], text: "顺着让出的路", from: 5 },
          { kind: "shape", shape: "rect", at: [600, 450], size: [170, 140], color: "#fffaf0", text: "恒牙", outline: true, from: 5.2 },
          { kind: "text", at: [600, 800], text: "让它自己掉，别硬拔", color: "#2f7d32", from: 6.4 }
        ]
      },
      {
        turn: 5,
        title: "恒牙用一辈子",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.35 }, "teeth"],
        camera: [{ t: 0, at: [600, 690], zoom: 2 }],
        duration: 9.5,
        cues: [
          { kind: "highlight", at: "teeth", color: "#2f7d32", from: 0.3, to: 3 },
          { kind: "text", at: [600, 110], text: "不会再换了", from: 0.6, to: 3.2 },
          { kind: "label", at: [600, 650], text: "牙釉质：全身最硬", side: "left", from: 1.6, to: 5.2 },
          { kind: "shape", shape: "circle", at: [620, 662], size: [14, 14], color: "#7a5a3a", from: 3.2, to: 5.2 },
          { kind: "text", at: [600, 110], text: "坏了长不回来", color: "#e5484d", from: 3.6, to: 5.2 },
          { kind: "sprite", icon: "🪥", path: [[470, 700], [730, 700], [470, 700], [730, 700]], travel: 2.6, size: 60, from: 5.4 },
          { kind: "text", at: [600, 110], text: "早晚刷牙护着它", color: "#2f7d32", from: 5.8 },
          { kind: "sprite", icon: "☀️", path: [[380, 560]], size: 44, from: 6.6 },
          { kind: "sprite", icon: "🌙", path: [[820, 560]], size: 44, from: 7.2 }
        ]
      }
    ]
  },
  {
    question: "look-like",
    scenes: [
      {
        turn: 0,
        title: "身体的说明书",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "📖", path: [[600, 330]], size: 160, from: 0.3 },
          { kind: "label", at: [540, 300], text: "长什么眼睛", pos: [250, 180], from: 1, to: 4.2 },
          { kind: "label", at: [600, 260], text: "头发的颜色", pos: [600, 120], from: 1.6, to: 4.2 },
          { kind: "label", at: [660, 300], text: "个子多高", pos: [950, 180], from: 2.2, to: 4.2 },
          { kind: "shape", shape: "rect", at: [400, 660], size: [260, 120], color: "#8db6f0", text: "一半来自爸爸", from: 4.4 },
          { kind: "shape", shape: "rect", at: [800, 660], size: [260, 120], color: "#ff9fbf", text: "一半来自妈妈", from: 5 },
          { kind: "arrow", path: [[400, 590], [530, 420]], color: "#5f8fd8", from: 5.8 },
          { kind: "arrow", path: [[800, 590], [670, 420]], color: "#ff7fa8", from: 6.2 }
        ]
      },
      {
        turn: 1,
        title: "藏在细胞里",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[190, 450]], size: 200, from: 0.3 },
          { kind: "arrow", path: [[300, 450], [430, 450]], text: "放大", from: 0.8, to: 2.8 },
          { kind: "shape", shape: "circle", at: [740, 450], size: [520, 460], color: "#ffe08a", from: 1.4 },
          { kind: "label", at: [740, 225], text: "细胞：小砖块", pos: [740, 110], from: 2, to: 4.6 },
          { kind: "shape", shape: "circle", at: [740, 450], size: [220, 200], color: "#bfe3ff", from: 3.2 },
          { kind: "label", at: [740, 352], text: "中间的小房间", pos: [1000, 160], from: 3.8, to: 6.2 },
          { kind: "flow", path: [[660, 450], [680, 410], [700, 490], [720, 410], [740, 490], [760, 410], [780, 490], [800, 410], [820, 450]], color: "#b48cff", count: 28, speed: 30, size: 5, from: 5 },
          { kind: "label", at: [780, 490], text: "DNA：细长的线", pos: [800, 760], from: 5.6 }
        ]
      },
      {
        turn: 2,
        title: "四种珠子排队",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [330, 280], size: [110, 110], color: "#ff9fbf", text: "A", from: 0.3, to: 3 },
          { kind: "shape", shape: "circle", at: [510, 280], size: [110, 110], color: "#ffe08a", text: "T", from: 0.6, to: 3 },
          { kind: "shape", shape: "circle", at: [690, 280], size: [110, 110], color: "#bfe3ff", text: "C", from: 0.9, to: 3 },
          { kind: "shape", shape: "circle", at: [870, 280], size: [110, 110], color: "#b7e4a8", text: "G", from: 1.2, to: 3 },
          { kind: "text", at: [600, 460], text: "四种小珠子", from: 1.8, to: 3 },
          { kind: "shape", shape: "pill", at: [310, 300], size: [240, 96], color: "#efe6ff", text: "CCAT", from: 3.2 },
          { kind: "shape", shape: "pill", at: [600, 300], size: [300, 96], color: "#efe6ff", text: "TACGGA", from: 3.5, to: 5.8 },
          { kind: "shape", shape: "pill", at: [890, 300], size: [240, 96], color: "#efe6ff", text: "GTTA", from: 3.8 },
          { kind: "text", at: [600, 460], text: "顺序不同，意思不同", from: 4.2, to: 5.8 },
          { kind: "shape", shape: "pill", at: [600, 300], size: [300, 96], color: "#ffe08a", text: "TACGGA", outline: true, from: 5.8 },
          { kind: "label", at: [600, 252], text: "这一段＝基因", pos: [600, 140], from: 6.2 },
          { kind: "arrow", path: [[600, 355], [600, 545]], text: "做颜料", from: 6.8 },
          { kind: "shape", shape: "circle", at: [600, 650], size: [160, 160], color: "#c48a55", text: "👁️棕色", from: 7.4 }
        ]
      },
      {
        turn: 3,
        title: "像抽签一样拼",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 240], size: [300, 120], color: "#8db6f0", text: "爸爸①②", from: 0.3 },
          { kind: "shape", shape: "rect", at: [900, 240], size: [300, 120], color: "#ff9fbf", text: "妈妈①②", from: 0.9 },
          { kind: "sprite", icon: "🎲", path: [[600, 240]], size: 90, spin: true, from: 1.8, to: 7 },
          { kind: "shape", shape: "rect", at: [525, 520], size: [150, 120], color: "#8db6f0", text: "①②拼", from: 2.8 },
          { kind: "shape", shape: "rect", at: [675, 520], size: [150, 120], color: "#ff9fbf", text: "②①拼", from: 3.4 },
          { kind: "text", at: [600, 700], text: "每个孩子都不一样", from: 4.4, to: 7 },
          { kind: "text", at: [600, 700], text: "同卵双胞胎几乎一样", from: 7.2 },
          { kind: "sprite", icon: "🧒🧒", path: [[960, 520]], size: 70, from: 7.6 }
        ]
      },
      {
        turn: 4,
        title: "声音更大的那份",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [380, 250], size: [240, 110], color: "#8db6f0", text: "爸：小声", from: 0.3, to: 5 },
          { kind: "shape", shape: "rect", at: [820, 250], size: [240, 110], color: "#ff9fbf", text: "妈：大声", motion: "pulse", from: 0.9, to: 5 },
          { kind: "pulse", at: [820, 250], color: "#ff9fbf", radius: 150, from: 1.4, to: 5 },
          { kind: "arrow", path: [[820, 320], [650, 500]], color: "#ff7fa8", from: 2.2, to: 5 },
          { kind: "sprite", icon: "👁️", path: [[600, 560]], size: 110, from: 2.8, to: 5 },
          { kind: "text", at: [600, 700], text: "这里像妈妈", from: 3.2, to: 5 },
          { kind: "sprite", icon: "🧒", path: [[600, 480]], size: 180, from: 5.2 },
          { kind: "flow", path: [[120, 180], [380, 330], [560, 470]], color: "#8db6f0", count: 10, speed: 140, size: 11, from: 5.6 },
          { kind: "flow", path: [[1080, 180], [820, 330], [640, 470]], color: "#ff9fbf", count: 10, speed: 140, size: 11, from: 6 },
          { kind: "text", at: [600, 140], text: "好多基因一起定", from: 6.6 },
          { kind: "text", at: [600, 740], text: "混在一起就是你", from: 7.4 }
        ]
      },
      {
        turn: 5,
        title: "也靠一起过日子",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "🎨", path: [[380, 270]], size: 110, from: 0.3, to: 4.4 },
          { kind: "sprite", icon: "⛈️", path: [[820, 270]], size: 110, from: 0.7, to: 4.4 },
          { kind: "meter", at: [600, 470], label: "基因的影响", start: 0, end: 0.3, color: "#8db6f0", over: 1.4, from: 1.4 },
          { kind: "meter", at: [600, 580], label: "经历和学习", start: 0, end: 0.8, color: "#ff9fbf", over: 1.8, from: 2.4 },
          { kind: "sprite", icon: "😄", path: [[380, 760]], size: 100, from: 4.6 },
          { kind: "arrow", path: [[460, 760], [680, 760]], text: "天天学", from: 5.4 },
          { kind: "sprite", icon: "😄", path: [[760, 760]], size: 76, from: 6 },
          { kind: "text", at: [600, 250], text: "笑容也是学来的", from: 6.6 }
        ]
      }
    ]
  },
  {
    question: "where-from",
    scenes: [
      {
        turn: 0,
        title: "在子宫里长大",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 420], size: [520, 520], color: "#ffe1ec", outline: true, from: 0.3 },
          { kind: "label", at: [600, 160], text: "子宫：宝宝的家", pos: [600, 70], from: 0.9 },
          { kind: "shape", shape: "circle", at: [600, 420], size: [36, 36], color: "#ffe08a", from: 1.8, to: 3.4 },
          { kind: "count", at: [990, 780], label: "住在子宫里", start: 0, end: 9, unit: "个多月", over: 3, from: 2.6 },
          { kind: "sprite", icon: "👶", path: [[600, 420]], size: 70, from: 3.4, to: 4.8 },
          { kind: "sprite", icon: "👶", path: [[600, 420]], size: 170, from: 4.8 },
          { kind: "text", at: [380, 800], text: "爸爸妈妈盼着你", from: 5.8 },
          { kind: "sprite", icon: "💗", path: [[790, 250]], size: 70, from: 6.4 }
        ]
      },
      {
        turn: 1,
        title: "最开始只是一个细胞",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [380, 420], size: [200, 120], color: "#f3e3c3", text: "芝麻", outline: true, from: 0.3, to: 4.4 },
          { kind: "shape", shape: "circle", at: [760, 420], size: [12, 12], color: "#ffc06a", from: 1, to: 4.4 },
          { kind: "label", at: [760, 420], text: "最开始的你", pos: [820, 260], from: 1.4, to: 4.4 },
          { kind: "text", at: [600, 640], text: "比芝麻小得多", from: 2.4, to: 4.4 },
          { kind: "sprite", icon: "🧒", path: [[820, 450]], size: 240, from: 4.6 },
          { kind: "sprite", icon: "🧱", path: [[280, 450]], size: 100, from: 5 },
          { kind: "text", at: [280, 600], text: "细胞：小砖块", size: "s", from: 5.4 },
          { kind: "flow", path: [[340, 450], [720, 450]], color: "#ffe08a", count: 12, speed: 160, size: 12, from: 6 },
          { kind: "text", at: [600, 800], text: "数不清的砖块搭成你", from: 6.6 }
        ]
      },
      {
        turn: 2,
        title: "两个细胞合成一个",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🔹", path: [[260, 450]], size: 64, from: 0.3, to: 2.6 },
          { kind: "label", at: [260, 450], text: "爸爸的精子", side: "bottom", from: 0.7, to: 2.6 },
          { kind: "shape", shape: "circle", at: [780, 450], size: [240, 240], color: "#ffe08a", from: 1.3, to: 4.4 },
          { kind: "label", at: [780, 330], text: "妈妈的卵子", pos: [780, 200], from: 1.7, to: 4.4 },
          { kind: "sprite", icon: "🔹", path: [[260, 450], [680, 450]], travel: 1.4, size: 64, from: 2.6, to: 4.4 },
          { kind: "shape", shape: "circle", at: [780, 450], size: [260, 260], color: "#ffc06a", text: "受精卵", motion: "pulse", from: 4.2 },
          { kind: "pulse", at: [780, 450], color: "#ff9fbf", radius: 200, from: 4.5, to: 6.5 },
          { kind: "text", at: [600, 780], text: "这就是最开始的你", from: 5.4 }
        ]
      },
      {
        turn: 3,
        title: "长大再慢慢讲",
        view: "blank",
        duration: 7.5,
        cues: [
          { kind: "sprite", icon: "📚", path: [[600, 250]], size: 110, from: 0.3, to: 2.6 },
          { kind: "text", at: [600, 400], text: "大人的话题，以后讲", size: "s", from: 0.8, to: 2.6 },
          { kind: "shape", shape: "circle", at: [330, 600], size: [100, 100], color: "#bfe3ff", text: "爸", from: 2.8 },
          { kind: "text", at: [460, 600], text: "＋", size: "l", from: 3.2 },
          { kind: "shape", shape: "circle", at: [610, 600], size: [150, 150], color: "#ffe08a", text: "妈", from: 3.6 },
          { kind: "arrow", path: [[720, 600], [830, 600]], from: 4.2 },
          { kind: "shape", shape: "circle", at: [940, 600], size: [180, 180], color: "#ffc06a", text: "你", motion: "pulse", from: 4.8 }
        ]
      },
      {
        turn: 4,
        title: "一分二，二分四",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 330], size: [180, 180], color: "#ffc06a", from: 0.3, to: 1.6 },
          { kind: "shape", shape: "circle", at: [525, 330], size: [130, 130], color: "#ffe08a", from: 1.6, to: 2.9 },
          { kind: "shape", shape: "circle", at: [675, 330], size: [130, 130], color: "#ffe08a", from: 1.6, to: 2.9 },
          { kind: "text", at: [600, 560], text: "一分二、二分四", size: "s", from: 1.9, to: 4.4 },
          { kind: "shape", shape: "circle", at: [530, 270], size: [120, 120], color: "#ffe08a", from: 2.9, to: 4.4 },
          { kind: "shape", shape: "circle", at: [670, 270], size: [120, 120], color: "#ffe08a", from: 2.9, to: 4.4 },
          { kind: "shape", shape: "circle", at: [530, 400], size: [120, 120], color: "#ffe08a", from: 2.9, to: 4.4 },
          { kind: "shape", shape: "circle", at: [670, 400], size: [120, 120], color: "#ffe08a", from: 2.9, to: 4.4 },
          { kind: "flow", path: [[645, 330], [639, 352], [622, 369], [600, 375], [578, 369], [561, 352], [555, 330], [561, 308], [578, 291], [600, 285], [622, 291], [639, 308], [645, 330]], color: "#ffc06a", count: 8, speed: 25, size: 24, from: 4.4 },
          { kind: "flow", path: [[700, 330], [687, 280], [650, 243], [600, 230], [550, 243], [513, 280], [500, 330], [513, 380], [550, 417], [600, 430], [650, 417], [687, 380], [700, 330]], color: "#ffe08a", count: 18, speed: 50, size: 20, from: 4.4, to: 7.4 },
          { kind: "text", at: [600, 140], text: "越来越多，还会分工", from: 4.8, to: 7.4 },
          { kind: "sprite", icon: "🫀", path: [[330, 560]], size: 80, from: 5.6 },
          { kind: "sprite", icon: "🧠", path: [[600, 620]], size: 80, from: 6, to: 7.4 },
          { kind: "sprite", icon: "🦴", path: [[870, 560]], size: 80, from: 6.4, to: 7.4 },
          { kind: "pulse", at: [330, 560], color: "#ff5a5f", radius: 80, from: 7.6 },
          { kind: "text", at: [330, 700], text: "一个多月：心跳", size: "s", from: 7.9 },
          { kind: "sprite", icon: "🖐️", path: [[870, 560]], size: 90, from: 8.6 },
          { kind: "text", at: [870, 700], text: "三个月：小手指", size: "s", from: 9 }
        ]
      },
      {
        turn: 5,
        title: "脐带送来营养",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [560, 420], size: [600, 560], color: "#ffe1ec", outline: true, from: 0.2 },
          { kind: "sprite", icon: "👶", path: [[470, 400]], size: 170, from: 0.5 },
          { kind: "shape", shape: "pill", at: [700, 470], size: [300, 28], color: "#ff9fbf", from: 1 },
          { kind: "label", at: [650, 470], text: "脐带", side: "bottom", from: 1.4, to: 3.4 },
          { kind: "shape", shape: "circle", at: [815, 450], size: [100, 230], color: "#ff8fb3", text: "胎盘", from: 2.2 },
          { kind: "flow", path: [[1190, 330], [870, 430], [800, 462], [560, 462]], color: "#ffc75a", count: 9, speed: 160, size: 9, from: 3.4, to: 6.6 },
          { kind: "flow", path: [[1190, 380], [870, 450], [800, 480], [560, 480]], color: "#4fb6ff", count: 9, speed: 160, size: 9, from: 3.8, to: 6.6 },
          { kind: "label", at: [550, 478], text: "以后的肚脐", pos: [420, 720], from: 6.8 }
        ]
      },
      {
        turn: 6,
        title: "九个多月，出生啦",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 400], size: [440, 440], color: "#ffe1ec", outline: true, from: 0.3, to: 2.4 },
          { kind: "sprite", icon: "👶", path: [[600, 400]], size: 160, from: 0.5, to: 5 },
          { kind: "count", at: [960, 780], label: "在子宫里", start: 0, end: 9, unit: "个多月", over: 1.4, from: 0.9, to: 5 },
          { kind: "shape", shape: "circle", at: [600, 400], size: [440, 440], color: "#ffe1ec", outline: true, motion: "pulse", from: 2.4, to: 5 },
          { kind: "arrow", path: [[200, 400], [360, 400]], text: "收紧", from: 2.8, to: 5 },
          { kind: "arrow", path: [[1000, 400], [840, 400]], from: 3.1, to: 5 },
          { kind: "sprite", icon: "👶", path: [[600, 380]], size: 180, from: 5.2 },
          { kind: "sprite", icon: "🎉", path: [[800, 250]], size: 80, from: 5.6 },
          { kind: "text", at: [600, 580], text: "出生啦！", size: "l", from: 6 },
          { kind: "sprite", icon: "👩‍⚕️", path: [[300, 420]], size: 100, from: 6.8 },
          { kind: "text", at: [600, 710], text: "也有的靠医生手术", size: "s", from: 7.2 },
          { kind: "text", at: [600, 820], text: "妈妈都很辛苦", color: "#e0607e", from: 8 }
        ]
      }
    ]
  },
  {
    question: "aging",
    scenes: [
      {
        turn: 0,
        title: "像小树长成大树",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🌱", path: [[230, 420]], size: 90, from: 0.3, to: 4.6 },
          { kind: "arrow", path: [[310, 420], [450, 420]], from: 0.9, to: 4.6 },
          { kind: "sprite", icon: "🌳", path: [[600, 380]], size: 220, from: 1.5, to: 4.6 },
          { kind: "label", at: [600, 470], text: "树皮变粗了", pos: [900, 540], from: 2.2, to: 4.6 },
          { kind: "text", at: [600, 720], text: "生命自然的一部分", size: "s", from: 3, to: 4.6 },
          { kind: "sprite", icon: "👨", path: [[600, 360]], size: 170, from: 4.8 },
          { kind: "text", at: [600, 150], text: "爸爸变老还要很久", from: 5.2 },
          { kind: "sprite", icon: "🍚", path: [[380, 600]], size: 80, from: 6 },
          { kind: "sprite", icon: "🏃", path: [[600, 620]], size: 80, from: 6.4 },
          { kind: "sprite", icon: "😴", path: [[820, 600]], size: 80, from: 6.8 },
          { kind: "text", at: [600, 780], text: "健康地陪你长大", from: 7.6 }
        ]
      },
      {
        turn: 1,
        title: "上色细胞变少",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 760], size: [1200, 300], color: "#ffd9c2", from: 0.2 },
          { kind: "shape", shape: "rect", at: [600, 400], size: [30, 480], color: "#fbfbfb", outline: true, from: 0.6, to: 3.4 },
          { kind: "shape", shape: "rect", at: [600, 400], size: [30, 480], color: "#3b2b22", from: 3.4 },
          { kind: "shape", shape: "rect", at: [600, 555], size: [30, 170], color: "#fbfbfb", outline: true, from: 6 },
          { kind: "text", at: [600, 110], text: "头发本来没颜色", size: "s", from: 1, to: 2.6 },
          { kind: "shape", shape: "pill", at: [600, 655], size: [140, 60], color: "#ffe08a", from: 2, to: 4.8 },
          { kind: "label", at: [660, 655], text: "上色细胞", pos: [880, 720], from: 2.4, to: 4.8 },
          { kind: "flow", path: [[600, 630], [600, 170]], color: "#3b2b22", count: 7, speed: 110, size: 9, from: 3, to: 4.8 },
          { kind: "shape", shape: "pill", at: [600, 655], size: [140, 60], color: "#ffe08a", motion: "shrink", from: 4.8 },
          { kind: "text", at: [600, 110], text: "上色细胞越来越少", from: 5.2, to: 7.2 },
          { kind: "text", at: [600, 110], text: "新长的头发变白", from: 7.4 }
        ]
      },
      {
        turn: 2,
        title: "皮肤里的橡皮筋",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [330, 300], size: [400, 110], color: "#ffd9c2", text: "年轻：紧又弹", from: 0.3 },
          { kind: "flow", path: [[150, 420], [200, 470], [250, 420], [300, 470], [350, 420], [400, 470], [450, 420], [500, 470]], color: "#ff9fbf", count: 16, speed: 40, size: 8, from: 0.9 },
          { kind: "label", at: [330, 445], text: "弹力纤维", pos: [330, 580], from: 1.5, to: 4.4 },
          { kind: "shape", shape: "rect", at: [870, 300], size: [400, 110], color: "#f2cdb5", text: "年纪大：起皱", from: 3.6 },
          { kind: "flow", path: [[690, 420], [760, 520], [870, 560], [980, 520], [1050, 420]], color: "#ff9fbf", count: 5, speed: 25, size: 8, from: 4.4 },
          { kind: "text", at: [870, 700], text: "变少、变松", size: "s", from: 5, to: 6.4 },
          { kind: "sprite", icon: "☀️", path: [[1080, 130]], size: 80, from: 6.4 },
          { kind: "arrow", path: [[1040, 170], [930, 400]], text: "不防晒坏更快", from: 6.8 }
        ]
      },
      {
        turn: 3,
        title: "细胞一分为二",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 350], size: [200, 200], color: "#e6d8b0", text: "旧", motion: "shrink", over: 1.4, from: 0.3, to: 2 },
          { kind: "text", at: [600, 580], text: "旧的掉了", size: "s", from: 0.7, to: 2.2 },
          { kind: "shape", shape: "circle", at: [600, 350], size: [200, 200], color: "#ffe08a", text: "新", from: 2, to: 4.2 },
          { kind: "text", at: [600, 580], text: "新的补上", size: "s", from: 2.4, to: 4.2 },
          { kind: "shape", shape: "circle", at: [600, 350], size: [240, 240], color: "#ffe08a", from: 4.4, to: 6.4 },
          { kind: "shape", shape: "pill", at: [600, 320], size: [150, 46], color: "#b48cff", text: "DNA", from: 4.7, to: 6.4 },
          { kind: "shape", shape: "pill", at: [600, 385], size: [150, 46], color: "#d6c2ff", text: "DNA", from: 5.3, to: 6.4 },
          { kind: "text", at: [600, 620], text: "先把 DNA 抄一遍", from: 5.6 },
          { kind: "shape", shape: "circle", at: [430, 350], size: [200, 200], color: "#ffe08a", from: 6.4 },
          { kind: "shape", shape: "circle", at: [770, 350], size: [200, 200], color: "#ffe08a", from: 6.7 },
          { kind: "shape", shape: "pill", at: [430, 350], size: [120, 40], color: "#b48cff", text: "DNA", from: 7 },
          { kind: "shape", shape: "pill", at: [770, 350], size: [120, 40], color: "#d6c2ff", text: "DNA", from: 7.3 }
        ]
      },
      {
        turn: 4,
        title: "复印再复印",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [180, 300], size: [200, 110], color: "#ffffff", text: "ATCGGA", outline: true, from: 0.3, to: 6.2 },
          { kind: "shape", shape: "rect", at: [430, 300], size: [200, 110], color: "#ffffff", text: "ATCTGA", outline: true, from: 0.9, to: 2.4 },
          { kind: "sprite", icon: "✏️", path: [[430, 210]], size: 60, wobble: true, from: 1.5, to: 2.8 },
          { kind: "text", at: [600, 480], text: "大多数错能改回来", size: "s", from: 1.8, to: 3.4 },
          { kind: "shape", shape: "rect", at: [430, 300], size: [200, 110], color: "#e8f5e9", text: "ATCGGA", outline: true, from: 2.4, to: 6.2 },
          { kind: "shape", shape: "rect", at: [680, 300], size: [200, 110], color: "#ffffff", text: "ATCTGA", outline: true, from: 3.4, to: 6.2 },
          { kind: "shape", shape: "rect", at: [930, 300], size: [200, 110], color: "#ffffff", text: "ATTTGA", outline: true, from: 4, to: 6.2 },
          { kind: "text", at: [600, 480], text: "几十年，小错攒多了", from: 4.6, to: 6.2 },
          { kind: "shape", shape: "circle", at: [600, 330], size: [220, 220], color: "#e6d8b0", text: "停工", from: 6.4 },
          { kind: "sprite", icon: "💤", path: [[720, 220]], size: 70, from: 6.8 },
          { kind: "text", at: [600, 560], text: "分了很多次就停工", from: 7.2 }
        ]
      },
      {
        turn: 5,
        title: "修得越来越慢",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "sprite", icon: "🩹", path: [[330, 320]], size: 110, from: 0.3, to: 3.6 },
          { kind: "text", at: [330, 480], text: "伤口好得慢", size: "s", from: 0.8, to: 3.6 },
          { kind: "sprite", icon: "🚶", path: [[870, 320]], size: 110, from: 1.6, to: 3.6 },
          { kind: "text", at: [870, 480], text: "跑不快了", size: "s", from: 2, to: 3.6 },
          { kind: "shape", shape: "circle", at: [600, 330], size: [220, 220], color: "#e6d8b0", text: "错太多", from: 3.8, to: 6.6 },
          { kind: "sprite", icon: "🛑", path: [[730, 210]], size: 70, from: 4.4, to: 6.6 },
          { kind: "text", at: [600, 560], text: "停工是在保护身体", from: 4.8, to: 6.6 },
          { kind: "sprite", icon: "🐢", path: [[600, 330]], size: 120, from: 6.8 },
          { kind: "meter", at: [600, 500], label: "几十年慢慢来", start: 0, end: 1, color: "#ff9fbf", over: 3, from: 7.2 }
        ]
      },
      {
        turn: 6,
        title: "让变老慢一点",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [300, 260], size: [200, 84], color: "#e8f5e9", text: "🏃运动", from: 0.3, to: 5.4 },
          { kind: "shape", shape: "pill", at: [600, 260], size: [200, 84], color: "#e8f5e9", text: "🍚吃好", from: 0.8, to: 5.4 },
          { kind: "shape", shape: "pill", at: [900, 260], size: [200, 84], color: "#e8f5e9", text: "😴睡足", from: 1.3, to: 5.4 },
          { kind: "shape", shape: "pill", at: [300, 400], size: [200, 84], color: "#e8f5e9", text: "🚭不抽烟", from: 1.8, to: 5.4 },
          { kind: "shape", shape: "pill", at: [600, 400], size: [200, 84], color: "#e8f5e9", text: "🧴防晒", from: 2.3, to: 5.4 },
          { kind: "shape", shape: "pill", at: [900, 400], size: [200, 84], color: "#e8f5e9", text: "🤗家人朋友", from: 2.8, to: 5.4 },
          { kind: "text", at: [600, 150], text: "老得慢，更健康", color: "#2f7d32", from: 5.6 },
          { kind: "sprite", icon: "👴", path: [[180, 560], [1020, 560]], travel: 3.6, size: 110, wobble: true, from: 6.2 },
          { kind: "text", at: [600, 760], text: "爷爷每天散步", from: 6.8 }
        ]
      }
    ]
  }
];
