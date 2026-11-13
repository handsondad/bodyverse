import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "goosebumps",
    scenes: [
      {
        turn: 0,
        title: "胳膊上的小疙瘩",
        view: "arm",
        layers: ["skin"],
        camera: [{ t: 0, at: [450, 650], zoom: 1.6 }, { t: 4.4, at: [450, 650], zoom: 1.6 }, { t: 5.6, at: [450, 700], zoom: 2.4 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "👻", path: [[230, 460]], from: 0.3, to: 3.6, size: 70, wobble: true },
          { kind: "flow", path: [[470, 560], [425, 860]], color: "#f4b89a", from: 0.9, count: 9, speed: 0, size: 9 },
          { kind: "flow", path: [[500, 600], [460, 870]], color: "#f4b89a", from: 0.9, count: 8, speed: 0, size: 9 },
          { kind: "label", at: [455, 640], text: "鸡皮疙瘩", side: "right", from: 1.5, to: 4.4 },
          { kind: "sprite", icon: "🐔", path: [[690, 470]], from: 2.5, to: 4.4, size: 80 },
          { kind: "text", at: [600, 830], text: "像拔了毛的鸡皮", size: "s", from: 2.9, to: 4.4 },
          { kind: "pulse", at: [446, 700], from: 5.4, color: "#ff9f43", radius: 50 },
          { kind: "label", at: [446, 700], text: "包上有根汗毛", side: "right", from: 5.9 },
          { kind: "text", at: [600, 130], text: "毛根一拉，鼓个包", size: "m", from: 6.9 }
        ]
      },
      {
        turn: 1,
        title: "小肌肉立毛肌",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 120], text: "放大看皮肤里面", size: "s", from: 0.3, to: 3 },
          { kind: "shape", shape: "rect", at: [600, 380], size: [1100, 50], color: "#f4b89a", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 580], size: [1100, 350], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "circle", at: [560, 352], size: [260, 80], color: "#f4b89a", motion: "grow", over: 1.2, from: 4.8 },
          { kind: "flow", path: [[520, 600], [545, 380], [800, 322]], color: "#6b4a2b", from: 0.9, to: 4.6, count: 22, speed: 0, size: 6 },
          { kind: "shape", shape: "rect", at: [522, 400], size: [12, 420], color: "#6b4a2b", from: 4.4 },
          { kind: "shape", shape: "pill", at: [650, 520], size: [200, 36], color: "#e57373", from: 1.7, to: 4.4 },
          { kind: "shape", shape: "pill", at: [650, 520], size: [200, 36], color: "#e57373", motion: "shrink", over: 1, from: 4.2 },
          { kind: "label", at: [650, 520], text: "立毛肌", side: "bottom", from: 2.2, to: 6.2 },
          { kind: "text", at: [600, 120], text: "汗毛直立，皮肤鼓包", size: "m", from: 6.6 }
        ]
      },
      {
        turn: 2,
        title: "自动的交感神经",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "nerves", opacity: 0.6 }],
        camera: [{ t: 0, at: [600, 300], zoom: 1.3 }],
        duration: 9,
        cues: [
          { kind: "text", at: [600, 820], text: "它不听你的指挥", size: "s", from: 0.3, to: 2.6 },
          { kind: "label", at: "spinalCord", text: "交感神经", side: "right", from: 1.1, to: 5.4 },
          { kind: "sprite", icon: "🥶", path: [[420, 110]], from: 2.3, to: 4.6, size: 70 },
          { kind: "pulse", at: "spinalCord", from: 2.8, color: "#ff5a5f", radius: 80 },
          { kind: "flow", path: ["spinalCord", "humerus", "forearm", "wrist"], color: "#ffcf3f", from: 3.7, count: 8, speed: 200 },
          { kind: "flow", path: [[600, 228], [698, 255], [723, 387], [733, 455]], color: "#ffcf3f", from: 3.7, count: 8, speed: 200 },
          { kind: "flow", path: [[500, 230], [470, 430]], color: "#f4b89a", from: 5.6, count: 10, speed: 0, size: 5 },
          { kind: "flow", path: [[700, 230], [730, 430]], color: "#f4b89a", from: 5.6, count: 10, speed: 0, size: 5 },
          { kind: "label", at: "forearm", text: "一大片鸡皮疙瘩", side: "left", from: 6.2 }
        ]
      },
      {
        turn: 3,
        title: "毛多动物用得上",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [330, 620], size: [420, 50], color: "#f4b89a", text: "皮肤", from: 0.3 },
          { kind: "shape", shape: "rect", at: [330, 520], size: [420, 150], color: "#d9b38c", text: "竖起的毛", from: 0.7 },
          { kind: "flow", path: [[160, 470], [500, 470], [500, 570], [160, 570], [160, 470]], color: "#bfe3ff", from: 1.3, count: 12, speed: 50, size: 9 },
          { kind: "label", at: [330, 470], text: "藏住一层空气", pos: [330, 380], from: 1.7 },
          { kind: "sprite", icon: "🧥", path: [[330, 250]], from: 2.6, to: 4.8, size: 90 },
          { kind: "text", at: [330, 720], text: "更暖和", size: "m", color: "#ff9f43", from: 3.2 },
          { kind: "sprite", icon: "🐈", path: [[880, 520]], from: 4.9, to: 6.4, size: 90 },
          { kind: "sprite", icon: "🙀", path: [[880, 500]], from: 6.2, size: 200, wobble: true },
          { kind: "text", at: [880, 760], text: "看着更大，吓敌人", size: "s", color: "#e5484d", from: 6.9 }
        ]
      },
      {
        turn: 4,
        title: "祖先留下的痕迹",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [870, 560], size: [440, 110], color: "#efe0cc", text: "又细又稀", outline: true, from: 0.3 },
          { kind: "shape", shape: "rect", at: [870, 650], size: [440, 70], color: "#f4b89a", text: "我们", from: 0.3 },
          { kind: "meter", at: [870, 790], label: "保暖", start: 0, end: 0.08, color: "#ff9f43", from: 1.2, to: 6 },
          { kind: "shape", shape: "rect", at: [330, 560], size: [440, 110], color: "#c8a27a", text: "毛又多又密", from: 2.8 },
          { kind: "shape", shape: "rect", at: [330, 650], size: [440, 70], color: "#f4b89a", text: "祖先", from: 2.8 },
          { kind: "meter", at: [330, 790], label: "保暖", start: 0, end: 0.85, color: "#ff9f43", from: 3.4, to: 6 },
          { kind: "arrow", path: [[380, 400], [820, 400]], text: "毛变少了", from: 6, to: 7.8 },
          { kind: "shape", shape: "pill", at: [870, 740], size: [170, 50], color: "#e57373", text: "小肌肉", from: 7 },
          { kind: "text", at: [600, 140], text: "祖先留下的小痕迹", size: "m", color: "#7a4fd6", from: 8 }
        ]
      },
      {
        turn: 5,
        title: "好听的音乐也会",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "nerves", opacity: 0.6 }],
        camera: [{ t: 0, at: [600, 300], zoom: 1.3 }],
        duration: 9.5,
        cues: [
          { kind: "flow", path: [[160, 130], [380, 100], "earRight"], icon: "🎵", from: 0.3, to: 3.4, count: 4, speed: 160, size: 14 },
          { kind: "sprite", icon: "🤩", path: [[820, 110]], from: 1.3, to: 5, size: 70 },
          { kind: "pulse", at: "brain", from: 1.8, color: "#ffcf3f", radius: 60 },
          { kind: "label", at: "spinalCord", text: "同一套自动神经", side: "right", from: 2.6, to: 5.4 },
          { kind: "flow", path: ["spinalCord", "humerus", "forearm", "wrist"], color: "#ffcf3f", from: 3.6, count: 8, speed: 200 },
          { kind: "flow", path: [[600, 228], [698, 255], [723, 387], [733, 455]], color: "#ffcf3f", from: 3.6, count: 8, speed: 200 },
          { kind: "text", at: [600, 820], text: "后背一阵发麻", size: "s", from: 5.6 },
          { kind: "text", at: [930, 160], text: "心情写在皮肤上", size: "m", color: "#7a4fd6", from: 6.8 }
        ]
      },
      {
        turn: 6,
        title: "也许还有用",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "🐭", path: [[180, 200]], from: 0.3, to: 3.6, size: 90 },
          { kind: "text", at: [600, 90], text: "小老鼠身上的发现", size: "s", from: 0.3, to: 3.6 },
          { kind: "sprite", icon: "❄️", path: [[340, 200]], from: 0.9, to: 3.6, size: 70, spin: true },
          { kind: "shape", shape: "rect", at: [650, 560], size: [900, 340], color: "#ffd6bf", from: 0.6 },
          { kind: "shape", shape: "pill", at: [780, 560], size: [180, 36], color: "#e57373", motion: "shrink", over: 1.5, from: 1.8 },
          { kind: "flow", path: [[1080, 710], [900, 650], [790, 570]], color: "#ffcf3f", from: 2.4, count: 6, speed: 160 },
          { kind: "shape", shape: "circle", at: [600, 680], size: [100, 100], color: "#a5d6a7", text: "毛根", motion: "pulse", from: 3.6 },
          { kind: "arrow", path: [[740, 590], [640, 660]], color: "#2f7d32", text: "叫醒", from: 4, to: 6 },
          { kind: "shape", shape: "rect", at: [600, 450], size: [14, 420], color: "#6b4a2b", motion: "grow", over: 2, from: 5 },
          { kind: "text", at: [600, 820], text: "人身上？还不知道", size: "m", color: "#7a6a55", from: 6.8 }
        ]
      }
    ]
  },
  {
    question: "nails",
    scenes: [
      {
        turn: 0,
        title: "剪掉的没感觉",
        view: "hand",
        layers: ["skin"],
        camera: [{ t: 0, at: [630, 600], zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🪶", path: [[780, 640], [640, 620]], from: 0.3, travel: 1, to: 3.4, size: 50, wobble: true },
          { kind: "flow", path: [[612, 640], [600, 450], [640, 250], [667, 160]], color: "#ffcf3f", from: 1, to: 3.6, count: 7, speed: 260 },
          { kind: "label", at: [605, 520], text: "神经：报告大脑", side: "right", from: 1.4, to: 3.6 },
          { kind: "shape", shape: "rect", at: [615, 705], size: [70, 24], color: "#fffaf3", outline: true, from: 3.8 },
          { kind: "label", at: [615, 705], text: "没有神经和血管", side: "right", from: 4.3 },
          { kind: "sprite", icon: "✂️", path: [[820, 780], [645, 712]], from: 5.2, travel: 1.2, size: 56 },
          { kind: "text", at: [600, 140], text: "大脑收不到报告", size: "m", color: "#2f7d32", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "指甲下的甲床",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 520], size: [800, 240], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [700, 429], size: [440, 40], color: "#ffb3b8", from: 0.9 },
          { kind: "shape", shape: "rect", at: [760, 395], size: [560, 28], color: "#fffaf3", outline: true, from: 0.3 },
          { kind: "label", at: [700, 435], text: "甲床", side: "bottom", from: 1.3, to: 4 },
          { kind: "flow", path: [[490, 438], [910, 438]], color: "#ffcf3f", from: 2.2, count: 8, speed: 110, size: 6 },
          { kind: "flow", path: [[490, 421], [910, 421]], color: "#e5484d", from: 2.8, to: 5.4, count: 8, speed: 140, size: 6 },
          { kind: "sprite", icon: "✂️", path: [[1150, 300], [930, 400]], from: 4.6, travel: 1, to: 6.4, size: 60 },
          { kind: "pulse", at: [912, 430], from: 5.6, color: "#ff5a5f", radius: 70 },
          { kind: "text", at: [600, 760], text: "剪太短：疼！", size: "m", color: "#ff5a5f", from: 5.9, to: 7.6 },
          { kind: "text", at: [600, 760], text: "拔头发也是这样", size: "s", from: 7.8 }
        ]
      },
      {
        turn: 2,
        title: "活的根，死的尖",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 520], size: [1100, 380], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 215], size: [16, 230], color: "#6b4a2b", from: 0.3, to: 3.6 },
          { kind: "label", at: [600, 230], text: "露在外面：死的", side: "right", from: 0.8, to: 3.4 },
          { kind: "shape", shape: "rect", at: [600, 520], size: [90, 320], color: "#f7c6a8", outline: true, from: 1.8 },
          { kind: "label", at: [600, 480], text: "毛囊", side: "left", from: 2.2, to: 4.2 },
          { kind: "shape", shape: "circle", at: [600, 650], size: [100, 76], color: "#a5d6a7", text: "活的根", motion: "pulse", from: 3 },
          { kind: "flow", path: [[600, 640], [600, 330]], color: "#ffcfa8", from: 3.6, count: 6, speed: 60, size: 13 },
          { kind: "flow", path: [[600, 330], [600, 90]], color: "#6b4a2b", from: 3.6, count: 5, speed: 60, size: 8 },
          { kind: "arrow", path: [[720, 640], [720, 380]], text: "往外推", from: 4.6, to: 6.2 },
          { kind: "label", at: [600, 250], text: "变硬、变扁、死掉", side: "right", from: 6.4 }
        ]
      },
      {
        turn: 3,
        title: "结实的角蛋白",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "flow", path: [[180, 400], [320, 360], [460, 400], [600, 360], [740, 400], [880, 360], [1020, 400]], color: "#c8a27a", from: 0.3, count: 34, speed: 0, size: 8 },
          { kind: "flow", path: [[180, 360], [320, 400], [460, 360], [600, 400], [740, 360], [880, 400], [1020, 360]], color: "#a1887f", from: 0.9, count: 34, speed: 0, size: 8 },
          { kind: "label", at: [600, 380], text: "角蛋白", side: "top", from: 1.6, to: 4.2 },
          { kind: "text", at: [600, 560], text: "又硬又有韧劲", size: "m", from: 2.8, to: 4.4 },
          { kind: "sprite", icon: "💅", path: [[300, 650]], from: 4.6, size: 90 },
          { kind: "sprite", icon: "🐂", path: [[600, 650]], from: 5.1, size: 90 },
          { kind: "sprite", icon: "🐴", path: [[900, 650]], from: 5.6, size: 90 },
          { kind: "text", at: [600, 820], text: "都是角蛋白做的", size: "s", from: 6.4 }
        ]
      },
      {
        turn: 4,
        title: "含硫的小扣子",
        view: "blank",
        duration: 10.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 360], size: [900, 18], color: "#c8a27a", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 540], size: [900, 18], color: "#c8a27a", from: 0.3 },
          { kind: "flow", path: [[300, 360], [300, 540]], color: "#ffcf3f", from: 0.9, to: 5.2, count: 5, speed: 0, size: 10 },
          { kind: "label", at: [300, 450], text: "含硫的小扣子", side: "left", from: 1.4, to: 3.2 },
          { kind: "flow", path: [[600, 360], [600, 540]], color: "#ffcf3f", from: 2.2, to: 5.2, count: 5, speed: 0, size: 10 },
          { kind: "flow", path: [[900, 360], [900, 540]], color: "#ffcf3f", from: 2.8, to: 5.2, count: 5, speed: 0, size: 10 },
          { kind: "text", at: [600, 760], text: "扣子越多越结实", size: "s", color: "#2f7d32", from: 3.4, to: 5.2 },
          { kind: "text", at: [600, 150], text: "烫发：药水打开扣子", size: "m", from: 5.6, to: 7.4 },
          { kind: "sprite", icon: "🌀", path: [[600, 450]], from: 6.6, to: 8, size: 110, spin: true },
          { kind: "flow", path: [[300, 360], [440, 540]], color: "#ffcf3f", from: 8, count: 5, speed: 0, size: 10 },
          { kind: "flow", path: [[700, 360], [840, 540]], color: "#ffcf3f", from: 8.3, count: 5, speed: 0, size: 10 },
          { kind: "text", at: [600, 760], text: "重新扣上，卷定住", size: "m", color: "#2f7d32", from: 8.6 }
        ]
      },
      {
        turn: 5,
        title: "烧头发的臭味",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 380], size: [900, 18], color: "#c8a27a", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 520], size: [900, 18], color: "#c8a27a", from: 0.3 },
          { kind: "flow", path: [[400, 380], [400, 520]], color: "#ffcf3f", from: 0.6, to: 3.2, count: 5, speed: 0, size: 10 },
          { kind: "flow", path: [[800, 380], [800, 520]], color: "#ffcf3f", from: 0.6, to: 3.2, count: 5, speed: 0, size: 10 },
          { kind: "sprite", icon: "🔥", path: [[600, 700]], from: 1.6, to: 5.8, size: 100, wobble: true },
          { kind: "flow", path: [[600, 450], [560, 280], [640, 130], [600, 20]], color: "#b8a24a", from: 3.2, count: 9, speed: 120, size: 11 },
          { kind: "label", at: [610, 220], text: "含硫的臭气", side: "right", from: 3.6 },
          { kind: "sprite", icon: "🤢", path: [[330, 200]], from: 4.6, size: 80 },
          { kind: "text", at: [600, 800], text: "可别自己去试！", size: "m", color: "#ff5a5f", from: 6.1 }
        ]
      },
      {
        turn: 6,
        title: "一个月长多少",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "meter", at: [600, 200], label: "手指甲：约3毫米", start: 0, end: 0.3, color: "#ff9f43", from: 0.3 },
          { kind: "meter", at: [600, 330], label: "脚趾甲：慢得多", start: 0, end: 0.1, color: "#c8a27a", from: 1.4 },
          { kind: "meter", at: [600, 460], label: "头发：约1厘米", start: 0, end: 1, color: "#6b4a2b", from: 2.5 },
          { kind: "shape", shape: "rect", at: [330, 720], size: [150, 180], color: "#fde4d6", outline: true, from: 4.6 },
          { kind: "sprite", icon: "🔴", path: [[330, 790], [330, 680]], from: 5, travel: 3.5, size: 26 },
          { kind: "text", at: [760, 720], text: "每周看看小点", size: "s", from: 5.6 }
        ]
      }
    ]
  },
  {
    question: "sweat",
    scenes: [
      {
        turn: 0,
        title: "凉快从哪来",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 650], size: [1100, 380], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 440], size: [1100, 40], color: "#f4b89a", from: 0.3 },
          { kind: "sprite", icon: "🏃", path: [[180, 200]], from: 0.3, to: 2.8, size: 80 },
          { kind: "sprite", icon: "💧", path: [[600, 390]], from: 0.9, to: 5.6, size: 70 },
          { kind: "label", at: [600, 390], text: "和身体差不多热", side: "right", color: "#ff9f43", from: 1.5, to: 3.4 },
          { kind: "myth", wrong: "汗是凉的，所以凉快", right: "汗变干时带走了热", from: 3.2 },
          { kind: "flow", path: [[600, 600], [600, 400], [600, 150]], color: "#ff9f43", from: 5, count: 6, speed: 120 },
          { kind: "sprite", icon: "♨️", path: [[600, 180]], from: 5.6, size: 70 }
        ]
      },
      {
        turn: 1,
        title: "蒸发散热",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 650], size: [1100, 380], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 440], size: [1100, 40], color: "#f4b89a", from: 0.3 },
          { kind: "sprite", icon: "💧", path: [[600, 395]], from: 0.3, to: 4.4, size: 70 },
          { kind: "flow", path: [[600, 660], [600, 410]], color: "#ff9f43", from: 1.4, to: 6.4, count: 5, speed: 90, size: 12 },
          { kind: "label", at: [600, 560], text: "从皮肤拿热", side: "right", color: "#ff9f43", from: 2, to: 5 },
          { kind: "flow", path: [[600, 380], [560, 250], [640, 120], [600, 0]], color: "#cfe8ff", from: 3.8, count: 7, speed: 110, size: 12 },
          { kind: "sprite", icon: "♨️", path: [[600, 220]], from: 4.2, to: 6.6, size: 70 },
          { kind: "meter", at: [930, 780], label: "皮肤的热", start: 0.8, end: 0.45, color: "#ff9f43", from: 5, over: 2.5 },
          { kind: "text", at: [300, 780], text: "蒸发散热", size: "m", color: "#4fb6ff", from: 6.8 }
        ]
      },
      {
        turn: 2,
        title: "挣开伙伴要力气",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "flow", path: [[460, 560], [740, 560], [740, 460], [460, 460], [460, 560]], color: "#4fb6ff", from: 0.3, count: 14, speed: 35, size: 20 },
          { kind: "label", at: [470, 470], text: "水分子", pos: [250, 400], from: 0.9 },
          { kind: "text", at: [600, 760], text: "手拉手挤在一起", size: "s", from: 1.6, to: 2.9 },
          { kind: "flow", path: [[600, 860], [600, 590]], color: "#ff9f43", from: 3, to: 6.6, count: 5, speed: 120, size: 12 },
          { kind: "text", at: [600, 760], text: "挣开要花力气", size: "s", color: "#ff9f43", from: 3.4, to: 4.9 },
          { kind: "sprite", icon: "🔴", path: [[560, 500], [480, 280], [420, 60]], from: 5, travel: 1.4, size: 40 },
          { kind: "sprite", icon: "🔴", path: [[660, 500], [760, 280], [820, 60]], from: 5.5, travel: 1.4, size: 40 },
          { kind: "text", at: [600, 760], text: "最热最快的先飞", size: "s", color: "#e5484d", from: 5.4, to: 6.9 },
          { kind: "text", at: [600, 760], text: "留下的更凉一点", size: "m", color: "#4fb6ff", from: 7.2 }
        ]
      },
      {
        turn: 3,
        title: "风一吹更凉快",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 700], size: [1100, 200], color: "#ffd6bf", from: 0.3 },
          { kind: "sprite", icon: "💧", path: [[600, 575]], from: 0.6, size: 60 },
          { kind: "shape", shape: "rect", at: [600, 470], size: [1000, 180], color: "#e3f2ff", outline: true, from: 1.8, to: 5.2 },
          { kind: "flow", path: [[600, 560], [600, 390]], color: "#7cc4ff", from: 1.2, to: 4.6, count: 5, speed: 40, size: 10 },
          { kind: "label", at: [900, 470], text: "皮肤旁的湿空气", pos: [900, 300], from: 2.2, to: 5 },
          { kind: "text", at: [300, 140], text: "汗干得慢", size: "s", from: 2.8, to: 4.2 },
          { kind: "flow", path: [[-50, 470], [1250, 470]], icon: "💨", from: 4.4, count: 5, speed: 600, size: 16 },
          { kind: "flow", path: [[600, 560], [600, 100]], color: "#7cc4ff", from: 5.4, count: 7, speed: 220, size: 10 },
          { kind: "meter", at: [900, 150], label: "带走的热", start: 0.3, end: 0.9, color: "#ff9f43", from: 6 },
          { kind: "text", at: [330, 150], text: "风一吹，特别凉快", size: "m", color: "#4fb6ff", from: 7 }
        ]
      },
      {
        turn: 4,
        title: "闷热天汗干不了",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [180, 450], size: [240, 860], color: "#ffd6bf", from: 0.3 },
          { kind: "flow", path: [[420, 150], [1100, 150], [1100, 650], [420, 650], [420, 150]], color: "#9fd3ff", from: 0.6, count: 30, speed: 30, size: 9 },
          { kind: "label", at: [760, 400], text: "装满水蒸气", side: "bottom", from: 1.2, to: 5.8 },
          { kind: "sprite", icon: "💧", path: [[330, 180], [330, 840]], from: 2.6, travel: 2.6, to: 5.6, size: 50 },
          { kind: "text", at: [760, 820], text: "汗干不了，滴下来", size: "s", from: 3.2, to: 5.6 },
          { kind: "meter", at: [760, 760], label: "带走的热", start: 0, end: 0.15, color: "#ff9f43", from: 5.8 },
          { kind: "text", at: [760, 90], text: "更容易中暑", size: "m", color: "#ff5a5f", from: 6.6 },
          { kind: "text", at: [760, 850], text: "多喝水、多歇歇", size: "s", color: "#2f7d32", from: 7.6 }
        ]
      },
      {
        turn: 5,
        title: "大脑的温度管家",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "brain", opacity: 0.6 }, { layer: "arteries", from: 3 }],
        camera: [{ t: 0, at: [600, 120], zoom: 2.4 }, { t: 2.8, at: [600, 120], zoom: 2.4 }, { t: 4, at: [600, 300], zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "hypothalamus", color: "#ff9f43", from: 0.3, to: 3 },
          { kind: "label", at: "hypothalamus", text: "温度管家", side: "right", from: 0.8, to: 3 },
          { kind: "count", at: [960, 700], label: "体温保持在", start: 37, end: 37, unit: "度左右", from: 1.4, to: 3.2 },
          { kind: "flow", path: ["aorta", "humerus", "forearm", "wrist"], color: "#e5484d", from: 3.6, count: 8, speed: 180, size: 13 },
          { kind: "flow", path: [[606, 202], [698, 255], [723, 387], [733, 455]], color: "#e5484d", from: 3.6, count: 8, speed: 180, size: 13 },
          { kind: "label", at: "forearm", text: "皮肤血管变粗", side: "left", from: 4.3, to: 6 },
          { kind: "sprite", icon: "💦", path: [{ a: "forearm", dx: -50, dy: 30 }], from: 5, to: 6, size: 50 },
          { kind: "text", at: [600, 830], text: "汗干不了＋喝水少", size: "s", from: 6.1 },
          { kind: "meter", at: [930, 700], label: "体温", start: 0.5, end: 0.95, color: "#ff5a5f", from: 6.6 },
          { kind: "sprite", icon: "😵", path: [{ a: "brain", dy: 10 }], from: 7.2, size: 56 },
          { kind: "label", at: "brain", text: "头晕恶心：中暑", side: "right", color: "#ff5a5f", from: 7.6 }
        ]
      },
      {
        turn: 6,
        title: "汗为什么咸",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 560], size: [1100, 460], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "circle", at: [380, 690], size: [150, 110], color: "#9fd3ff", text: "汗腺", from: 0.8 },
          { kind: "flow", path: [[380, 660], [380, 320], [380, 180]], color: "#4fb6ff", from: 1.4, count: 6, speed: 90, size: 10 },
          { kind: "flow", path: [[366, 660], [366, 320], [366, 180]], color: "#8d8d8d", from: 2, count: 5, speed: 90, size: 6 },
          { kind: "label", at: [372, 250], text: "咸咸的盐", side: "right", from: 2.4, to: 4.2 },
          { kind: "arrow", path: [[395, 560], [570, 630]], color: "#8d8d8d", text: "收回一些", from: 4.2, to: 5.6 },
          { kind: "meter", at: [900, 300], label: "血的咸度", start: 0, end: 0.8, color: "#e5484d", from: 5.6, to: 7.2 },
          { kind: "meter", at: [900, 430], label: "汗的咸度", start: 0, end: 0.5, color: "#4fb6ff", from: 6.2, to: 7.2 },
          { kind: "sprite", icon: "🥤", path: [[900, 380]], from: 7.4, size: 90 },
          { kind: "text", at: [900, 560], text: "运动完及时补水", size: "s", color: "#2f7d32", from: 7.6 }
        ]
      }
    ]
  },
  {
    question: "scab",
    scenes: [
      {
        turn: 0,
        title: "身体的创可贴",
        view: "leg",
        layers: ["skin"],
        camera: [{ t: 0, at: "knee", zoom: 2 }],
        duration: 9,
        cues: [
          { kind: "text", at: [600, 130], text: "先别抠！", size: "l", color: "#ff5a5f", from: 0.3, to: 2.4 },
          { kind: "shape", shape: "circle", at: "knee", size: [60, 44], color: "#8d5a3b", from: 0.6 },
          { kind: "label", at: "knee", text: "痂：身体的创可贴", side: "right", from: 1.2 },
          { kind: "sprite", icon: "🦠", path: [[380, 300], [565, 430]], from: 2.6, travel: 1.4, to: 4.8, size: 40 },
          { kind: "sprite", icon: "🦠", path: [[420, 640], [570, 480]], from: 3.2, travel: 1.4, to: 4.8, size: 40 },
          { kind: "pulse", at: "knee", color: "#2f7d32", radius: 70, from: 3.9, to: 5.8 },
          { kind: "text", at: [600, 800], text: "下面新皮肤在悄悄长", size: "s", color: "#2f7d32", from: 5 },
          { kind: "text", at: [600, 130], text: "长好了，自己掉", size: "s", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "血小板来堵洞",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 380], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [900, 380], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 620], size: [1100, 90], color: "#ffcdd2", from: 0.6 },
          { kind: "flow", path: [[60, 620], [1140, 620]], color: "#e5484d", from: 0.9, count: 9, speed: 120, size: 10 },
          { kind: "flow", path: [[300, 610], [600, 600], [600, 420]], color: "#b48cff", from: 1.8, to: 5.6, count: 6, speed: 100, size: 9 },
          { kind: "label", at: [600, 500], text: "血小板：小碎片", side: "right", color: "#7a4fd6", from: 2.4, to: 5.4 },
          { kind: "shape", shape: "circle", at: [600, 400], size: [100, 90], color: "#b48cff", text: "粘住", motion: "grow", over: 1.5, from: 4 },
          { kind: "text", at: [600, 140], text: "第一步：堵住小洞", size: "m", from: 5.6 }
        ]
      },
      {
        turn: 2,
        title: "织网、变干成痂",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 380], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [900, 380], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "circle", at: [600, 400], size: [100, 90], color: "#b48cff", from: 0.3, to: 4 },
          { kind: "flow", path: [[540, 330], [660, 450]], color: "#e0c070", from: 0.8, to: 5.4, count: 12, speed: 0, size: 4 },
          { kind: "flow", path: [[660, 330], [540, 450]], color: "#e0c070", from: 1.3, to: 5.4, count: 12, speed: 0, size: 4 },
          { kind: "label", at: [640, 360], text: "纤维蛋白网", side: "right", from: 1.8, to: 3 },
          { kind: "flow", path: [[565, 350], [635, 350], [635, 425], [565, 425], [565, 350]], color: "#e5484d", from: 3.2, to: 5.4, count: 6, speed: 25, size: 9 },
          { kind: "label", at: [600, 390], text: "兜成血块", side: "right", from: 4.2, to: 5.4 },
          { kind: "shape", shape: "rect", at: [600, 370], size: [130, 110], color: "#8d5a3b", text: "痂", motion: "grow", over: 1.2, from: 5.4 },
          { kind: "sprite", icon: "💧", path: [[600, 360], [630, 140]], from: 5.8, travel: 1.5, to: 7.6, size: 40 },
          { kind: "text", at: [600, 780], text: "水干掉：硬硬的痂", size: "m", color: "#8d5a3b", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "只在破口织网",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 500], size: [1100, 120], color: "#ffcdd2", from: 0.3 },
          { kind: "flow", path: [[60, 500], [1140, 500]], color: "#e5484d", from: 0.6, count: 10, speed: 120, size: 10 },
          { kind: "text", at: [600, 140], text: "平时：溶在血里", size: "s", from: 1, to: 3 },
          { kind: "pulse", at: [900, 440], color: "#ff5a5f", radius: 60, from: 2.6 },
          { kind: "label", at: [900, 440], text: "破口", side: "top", from: 2.9, to: 4.6 },
          { kind: "arrow", path: [[880, 420], [790, 330], [680, 300]], text: "一个叫醒一个", from: 3.4, to: 5 },
          { kind: "meter", at: [600, 760], label: "越叫越多", start: 0.05, end: 1, color: "#ffcf3f", from: 4, to: 6.2 },
          { kind: "flow", path: [[840, 390], [960, 490]], color: "#e0c070", from: 5.2, count: 12, speed: 0, size: 4 },
          { kind: "flow", path: [[960, 390], [840, 490]], color: "#e0c070", from: 5.5, count: 12, speed: 0, size: 4 },
          { kind: "text", at: [600, 140], text: "只在破口织网", size: "m", color: "#2f7d32", from: 6.4 }
        ]
      },
      {
        turn: 4,
        title: "痂下面在修补",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 420], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [900, 420], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 330], size: [160, 70], color: "#8d5a3b", text: "痂", from: 0.3, to: 7.6 },
          { kind: "sprite", icon: "🦠", path: [[580, 425]], from: 0.8, to: 3.2, size: 40 },
          { kind: "sprite", icon: "🦠", path: [[622, 455]], from: 0.8, to: 3.2, size: 36 },
          { kind: "shape", shape: "circle", at: [600, 440], size: [86, 86], color: "#ffffff", text: "白细胞", outline: true, motion: "wiggle", from: 1.4, to: 4.4 },
          { kind: "flow", path: [[470, 440], [590, 440]], color: "#f4b89a", from: 4.6, to: 7.4, count: 4, speed: 60, size: 13 },
          { kind: "flow", path: [[730, 440], [610, 440]], color: "#f4b89a", from: 4.6, to: 7.4, count: 4, speed: 60, size: 13 },
          { kind: "text", at: [600, 780], text: "一分为二，往中间爬", size: "s", from: 5, to: 7 },
          { kind: "shape", shape: "rect", at: [600, 420], size: [110, 120], color: "#ffd6bf", motion: "grow", over: 1, from: 7 },
          { kind: "sprite", icon: "🟫", path: [[600, 330], [760, 160], [940, 820]], from: 7.6, travel: 1.4, spin: true, size: 50 },
          { kind: "text", at: [600, 140], text: "痂松开掉了", size: "s", color: "#2f7d32", from: 8.2 }
        ]
      },
      {
        turn: 5,
        title: "抠掉会怎样",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [300, 420], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [900, 420], size: [500, 120], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 420], size: [100, 120], color: "#ffbfae", from: 0.3, to: 4.6 },
          { kind: "shape", shape: "rect", at: [600, 330], size: [160, 70], color: "#8d5a3b", text: "痂", from: 0.3, to: 4.4 },
          { kind: "label", at: [600, 420], text: "刚长的新皮肤", side: "bottom", from: 1, to: 3 },
          { kind: "sprite", icon: "🤏", path: [[780, 180], [630, 300]], from: 3, travel: 1, to: 4.6, size: 60 },
          { kind: "sprite", icon: "🟫", path: [[600, 340], [840, 130]], from: 4.4, travel: 1, to: 5.8, size: 56 },
          { kind: "flow", path: [[1000, 120], [800, 250], [600, 420]], icon: "🦠", from: 4.8, count: 4, speed: 140, size: 14 },
          { kind: "text", at: [600, 780], text: "伤口又敞开了", size: "m", color: "#ff5a5f", from: 5.4, to: 7.2 },
          { kind: "text", at: [600, 780], text: "好得慢，易留疤", size: "m", color: "#ff5a5f", from: 7.4 },
          { kind: "text", at: [300, 140], text: "痒也忍一忍", size: "s", color: "#2f7d32", from: 8.2 }
        ]
      },
      {
        turn: 6,
        title: "湿润好得快",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "myth", wrong: "伤口越干越好", right: "湿润一点，长得更快", from: 0.3, to: 3.8 },
          { kind: "shape", shape: "rect", at: [600, 520], size: [1100, 80], color: "#ffd6bf", from: 4 },
          { kind: "shape", shape: "rect", at: [300, 440], size: [320, 90], color: "#8d5a3b", text: "太干挡路", from: 4.4 },
          { kind: "flow", path: [[100, 500], [300, 500]], color: "#f4b89a", from: 4.8, count: 3, speed: 12, size: 12 },
          { kind: "shape", shape: "rect", at: [900, 440], size: [360, 70], color: "#e3f2ff", text: "湿润敷料", outline: true, from: 5.8 },
          { kind: "flow", path: [[710, 500], [900, 500]], color: "#f4b89a", from: 6.2, count: 4, speed: 80, size: 12 },
          { kind: "text", at: [900, 250], text: "爬得快，疤更轻", size: "s", color: "#2f7d32", from: 7.2 }
        ]
      }
    ]
  },
  {
    question: "wrinkly-water",
    scenes: [
      {
        turn: 0,
        title: "只皱手指脚趾",
        view: "body",
        layers: ["skin"],
        duration: 9.5,
        cues: [
          { kind: "sprite", icon: "🛁", path: [[200, 200]], from: 0.3, to: 2.4, size: 90 },
          { kind: "pulse", at: "fingerTip", color: "#4fb6ff", radius: 50, from: 1 },
          { kind: "pulse", at: [758, 522], color: "#4fb6ff", radius: 50, from: 1 },
          { kind: "label", at: "fingerTip", text: "手指肚皱了", side: "left", from: 1.4 },
          { kind: "label", at: "foot", text: "脚趾肚也皱", side: "left", from: 2.2, to: 4.8 },
          { kind: "label", at: "belly", text: "肚子不怎么皱", side: "right", color: "#2f7d32", from: 3.2 },
          { kind: "myth", wrong: "手指被水泡烂了", right: "没烂！擦干等会儿就平", from: 5 }
        ]
      },
      {
        turn: 1,
        title: "以前的说法",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "text", at: [600, 100], text: "以前大家以为", size: "s", from: 0.3, to: 4.4 },
          { kind: "shape", shape: "rect", at: [600, 610], size: [1000, 320], color: "#ffd6bf", from: 0.6 },
          { kind: "shape", shape: "rect", at: [600, 390], size: [1000, 120], color: "#f4b89a", from: 0.6, to: 3.6 },
          { kind: "label", at: [600, 390], text: "最外层特别厚", side: "right", from: 1.2, to: 3.4 },
          { kind: "flow", path: [[600, 150], [600, 380]], color: "#4fb6ff", from: 2.2, count: 6, speed: 90, size: 10 },
          { kind: "shape", shape: "rect", at: [600, 380], size: [1000, 150], color: "#f4b89a", motion: "pulse", from: 3.4 },
          { kind: "label", at: [600, 380], text: "确实会吸水", side: "right", color: "#4fb6ff", from: 3.8, to: 5.4 },
          { kind: "sprite", icon: "❓", path: [[1000, 180]], from: 5, size: 90 },
          { kind: "text", at: [600, 100], text: "光吸水解释不了", size: "m", color: "#7a4fd6", from: 5.6 }
        ]
      },
      {
        turn: 2,
        title: "神经伤了不皱",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "pill", at: [380, 450], size: [180, 460], color: "#ffd6bf", from: 0.3 },
          { kind: "shape", shape: "pill", at: [820, 450], size: [180, 460], color: "#ffd6bf", from: 0.3 },
          { kind: "flow", path: [[380, 680], [380, 260]], color: "#ffcf3f", from: 0.8, count: 6, speed: 120 },
          { kind: "flow", path: [[820, 680], [820, 540]], color: "#ffcf3f", from: 1.2, count: 3, speed: 60 },
          { kind: "label", at: [820, 520], text: "神经受过伤", side: "right", color: "#ff5a5f", from: 1.6, to: 2.8 },
          { kind: "text", at: [600, 100], text: "都泡在水里", size: "s", color: "#4fb6ff", from: 2.8, to: 4.6 },
          { kind: "flow", path: [[320, 300], [350, 285], [380, 300], [410, 285], [440, 300], [440, 340], [410, 325], [380, 340], [350, 325], [320, 340], [320, 380], [350, 365], [380, 380], [410, 365], [440, 380]], color: "#c98a6e", from: 3.8, count: 30, speed: 0, size: 4 },
          { kind: "label", at: [820, 330], text: "一点都不皱", side: "right", from: 4.8, to: 6 },
          { kind: "text", at: [600, 830], text: "是神经在指挥", size: "m", color: "#7a4fd6", from: 6.2 }
        ]
      },
      {
        turn: 3,
        title: "血管收紧，皮皱了",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 520], size: [800, 300], color: "#ffd6bf", from: 0.3, to: 5.2 },
          { kind: "shape", shape: "pill", at: [600, 545], size: [740, 250], color: "#ffd6bf", from: 5 },
          { kind: "shape", shape: "rect", at: [600, 355], size: [820, 34], color: "#f4b89a", from: 0.3, to: 6.2 },
          { kind: "shape", shape: "pill", at: [600, 560], size: [560, 50], color: "#e5484d", from: 0.8, to: 3.8 },
          { kind: "shape", shape: "pill", at: [600, 560], size: [560, 50], color: "#e5484d", motion: "shrink", over: 1.2, from: 3.6 },
          { kind: "flow", path: [[1150, 800], [900, 650], [700, 560]], color: "#ffcf3f", from: 1.4, count: 6, speed: 160 },
          { kind: "label", at: [900, 650], text: "管血管的神经", side: "right", from: 1.8, to: 3.4 },
          { kind: "label", at: [600, 560], text: "血管收紧变细", side: "bottom", from: 4, to: 6.2 },
          { kind: "flow", path: [[200, 410], [250, 380], [300, 410], [350, 380], [400, 410], [450, 380], [500, 410], [550, 380], [600, 410], [650, 380], [700, 410], [750, 380], [800, 410], [850, 380], [900, 410], [950, 380], [1000, 410]], color: "#f4b89a", from: 6, count: 44, speed: 0, size: 10 },
          { kind: "text", at: [600, 120], text: "皮没变小，只好皱起来", size: "m", from: 7 }
        ]
      },
      {
        turn: 4,
        title: "神经怎么知道",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "text", at: [600, 120], text: "还没完全弄清楚", size: "m", color: "#7a6a55", from: 0.3, to: 2.6 },
          { kind: "shape", shape: "rect", at: [600, 560], size: [1100, 420], color: "#ffd6bf", from: 0.6 },
          { kind: "shape", shape: "rect", at: [600, 470], size: [24, 240], color: "#bfe3ff", from: 1.4 },
          { kind: "label", at: [600, 420], text: "出汗的小孔", side: "right", from: 1.8, to: 4 },
          { kind: "text", at: [600, 120], text: "一个说法", size: "s", from: 2.8, to: 5.4 },
          { kind: "flow", path: [[600, 200], [600, 570]], color: "#4fb6ff", from: 3, count: 5, speed: 40, size: 10 },
          { kind: "pulse", at: [700, 600], color: "#ffcf3f", radius: 50, from: 4.2, to: 5.6 },
          { kind: "flow", path: [[720, 610], [950, 700], [1150, 800]], color: "#ffcf3f", from: 5, count: 6, speed: 160 },
          { kind: "sprite", icon: "⏱️", path: [[250, 200]], from: 5.8, size: 80 },
          { kind: "text", at: [300, 300], text: "要泡好几分钟", size: "s", from: 6.2 }
        ]
      },
      {
        turn: 5,
        title: "像轮胎的花纹？",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "pill", at: [330, 450], size: [180, 420], color: "#ffd6bf", from: 0.3 },
          { kind: "flow", path: [[270, 310], [300, 295], [330, 310], [360, 295], [390, 310], [390, 350], [360, 335], [330, 350], [300, 335], [270, 350], [270, 390], [300, 375], [330, 390], [360, 375], [390, 390]], color: "#c98a6e", from: 0.8, count: 30, speed: 0, size: 4 },
          { kind: "flow", path: [[330, 340], [150, 250]], color: "#4fb6ff", from: 1.4, to: 3.8, count: 4, speed: 90, size: 9 },
          { kind: "flow", path: [[330, 340], [510, 250]], color: "#4fb6ff", from: 1.4, to: 3.8, count: 4, speed: 90, size: 9 },
          { kind: "text", at: [330, 780], text: "湿手抓得稳", size: "s", from: 2.4 },
          { kind: "sprite", icon: "🛞", path: [[870, 420]], from: 3.8, size: 160 },
          { kind: "sprite", icon: "🌧️", path: [[870, 170]], from: 4.2, to: 6.4, size: 80 },
          { kind: "text", at: [870, 640], text: "花纹：不打滑", size: "s", from: 4.8 },
          { kind: "text", at: [600, 110], text: "只是猜想，没有定论", size: "m", color: "#7a6a55", from: 6.6 }
        ]
      },
      {
        turn: 6,
        title: "捡玻璃珠实验",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🥣", path: [[300, 450]], from: 0.3, to: 4.2, size: 120 },
          { kind: "sprite", icon: "🥣", path: [[900, 450]], from: 0.3, to: 4.2, size: 120 },
          { kind: "text", at: [600, 150], text: "平平的手和皱皱的手", size: "s", from: 0.6, to: 4 },
          { kind: "sprite", icon: "🔵", path: [[300, 430], [600, 250], [900, 430]], from: 1, travel: 1.6, to: 3.2, size: 36 },
          { kind: "text", at: [600, 650], text: "比谁捡得快", size: "s", from: 1.4, to: 4 },
          { kind: "text", at: [330, 300], text: "一个实验", size: "s", from: 4.4 },
          { kind: "shape", shape: "rect", at: [330, 450], size: [400, 200], color: "#e8f5e9", text: "皱手更快", from: 4.8 },
          { kind: "text", at: [870, 300], text: "别人照着做", size: "s", from: 5.8 },
          { kind: "shape", shape: "rect", at: [870, 450], size: [400, 200], color: "#fff3df", text: "没差别", outline: true, from: 6.2 },
          { kind: "text", at: [600, 800], text: "有证据支持，也有不支持", size: "s", color: "#7a4fd6", from: 7.6 }
        ]
      }
    ]
  },
  {
    question: "sunburn-tan",
    scenes: [
      {
        turn: 0,
        title: "看不见的紫外线",
        view: "arm",
        layers: ["skin"],
        camera: [{ t: 0, at: "forearm", zoom: 1.5 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "☀️", path: [[180, 320]], size: 105, from: 0.3 },
          { kind: "flow", path: [[250, 360], "forearm"], color: "#b48cff", count: 7, speed: 220, from: 0.9 },
          { kind: "label", at: "forearm", text: "看不见的紫外线", side: "left", color: "#7a4fd6", from: 1.8 },
          { kind: "sprite", icon: "☂️", path: [{ a: "forearm", dx: 45, dy: -40 }], size: 68, from: 3.4 },
          { kind: "text", at: [600, 810], text: "皮肤主动撑起小黑伞", color: "#7a6a55", from: 4.4 }
        ]
      },
      {
        turn: 1,
        title: "黑色素护住DNA",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 560], size: [920, 320], color: "#ffe4d0", from: 0.3 },
          { kind: "shape", shape: "circle", at: [600, 650], size: [180, 90], color: "#8d5a2b", text: "黑色素", from: 0.9 },
          { kind: "flow", path: [[600, 120], [600, 390]], color: "#b48cff", count: 6, speed: 200, from: 1.6 },
          { kind: "shape", shape: "circle", at: [600, 480], size: [150, 110], color: "#bfe3ff", text: "DNA", from: 2.2 },
          { kind: "shape", shape: "pill", at: [600, 410], size: [210, 46], color: "#6d4527", text: "小黑伞", from: 3.2 },
          { kind: "label", at: [600, 410], text: "挡在头顶吸掉紫外线", side: "right", from: 3.8 },
          { kind: "text", at: [600, 810], text: "小黑伞多了，皮肤就变深", color: "#6d4527", from: 5.4 }
        ]
      },
      {
        turn: 2,
        title: "来不及挡就晒伤",
        view: "arm",
        layers: [{ layer: "skin", opacity: 0.45 }, "arteries"],
        camera: [{ t: 0, at: "humerus", zoom: 1.55 }],
        duration: 8.5,
        cues: [
          { kind: "flow", path: [[220, 180], "humerus"], color: "#b48cff", count: 8, speed: 280, from: 0.3, to: 4.6 },
          { kind: "pulse", at: "humerus", color: "#ff5a5f", radius: 85, from: 1.2 },
          { kind: "label", at: "humerus", text: "表皮细胞受伤了", side: "left", color: "#e5484d", from: 1.8 },
          { kind: "flow", path: ["heart", "humerus"], color: "#e5484d", count: 7, speed: 220, from: 3 },
          { kind: "text", at: [600, 810], text: "血管张大修补：又红又烫", color: "#e5484d", from: 4.8 }
        ]
      },
      {
        turn: 3,
        title: "受伤细胞主动退场",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 560], size: [860, 180], color: "#ffd9c2", text: "新健康皮", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 410], size: [860, 80], color: "#f5e6dc", outline: true, text: "受伤旧皮", motion: "wiggle", from: 0.8, to: 4.8 },
          { kind: "arrow", path: [[600, 390], [660, 230]], color: "#ff9f43", text: "成片脱落", from: 2.6, to: 5.2 },
          { kind: "text", at: [600, 220], text: "带着坏DNA不硬留", size: "s", color: "#7a4fd6", from: 3.4 },
          { kind: "text", at: [600, 780], text: "让它自己掉，别用手硬撕", color: "#2f7d32", from: 5.2 }
        ]
      },
      {
        turn: 4,
        title: "阴天也有紫外线",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "☁️", path: [[600, 210]], size: 130, from: 0.3 },
          { kind: "flow", path: [[600, 260], [600, 520]], color: "#b48cff", count: 7, speed: 220, from: 1, to: 5 },
          { kind: "sprite", icon: "🌊", path: [[340, 480]], size: 90, from: 2, to: 5 },
          { kind: "sprite", icon: "🏖️", path: [[860, 480]], size: 90, from: 2.4, to: 5 },
          { kind: "myth", wrong: "阴天凉快不用防晒", right: "紫外线能穿云，水和沙还会反射", from: 5 }
        ]
      },
      {
        turn: 5,
        title: "聪明防晒健康玩",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🦴", path: [[260, 330]], size: 90, from: 0.4 },
          { kind: "text", at: [260, 470], text: "温和阳光造维D", size: "s", color: "#2f7d32", from: 0.9 },
          { kind: "sprite", icon: "👒", path: [[620, 330]], size: 96, from: 2 },
          { kind: "sprite", icon: "🧴", path: [[880, 330]], size: 92, from: 2.6 },
          { kind: "text", at: [750, 470], text: "戴帽＋穿衣＋防晒霜", size: "s", color: "#2f7d32", from: 3.2 },
          { kind: "text", at: [600, 760], text: "避开十点到四点最毒太阳", color: "#ff9f43", from: 4.8 }
        ]
      }
    ]
  },
  {
    question: "shiver-cold",
    scenes: [
      {
        turn: 0,
        title: "启动自带紧急小暖炉",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, "muscles", "brain"],
        duration: 8,
        cues: [
          { kind: "highlight", at: "hypothalamus", color: "#ff9f43", from: 0.4 },
          { kind: "count", at: [950, 200], label: "核心体温守住", start: 35, end: 37, unit: "℃", over: 1.8, from: 1 },
          { kind: "flow", path: ["hypothalamus", "spinalCord", "quads"], color: "#ffcf3f", count: 7, speed: 240, from: 2.2 },
          { kind: "text", at: [600, 810], text: "冷得掉温快，大脑接管肌肉生热", color: "#ff9f43", from: 4.2 }
        ]
      },
      {
        turn: 1,
        title: "肌肉飞快小抽动产热",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.3 }, "skeleton", "muscles", "nerves"],
        camera: [{ t: 0, at: "quads", zoom: 1.55 }],
        duration: 8.5,
        cues: [
          { kind: "flow", path: ["sciatic", "quads"], color: "#ffcf3f", count: 8, speed: 280, from: 0.4 },
          { kind: "highlight", at: "quads", color: "#ff5a5f", from: 1.2 },
          { kind: "pulse", at: "quads", color: "#ff9f43", radius: 85, rate: 2.2, from: 1.6 },
          { kind: "label", at: "quads", text: "每秒小抽动十来次", side: "left", color: "#e5484d", from: 2.2 },
          { kind: "text", at: [600, 810], text: "原地燃烧能量，变成热放出来！", color: "#e5484d", from: 4.6 }
        ]
      },
      {
        turn: 2,
        title: "咀嚼肌拉着牙齿打架",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.35 }, "muscles", "teeth"],
        camera: [{ t: 0, at: "teeth", zoom: 1.7 }],
        duration: 8,
        cues: [
          { kind: "pulse", at: [460, 650], color: "#ff9f43", radius: 55, rate: 2.4, from: 0.4 },
          { kind: "pulse", at: [740, 650], color: "#ff9f43", radius: 55, rate: 2.4, from: 0.4 },
          { kind: "label", at: [460, 650], text: "咀嚼肌也跟着抖", side: "left", from: 1.2 },
          { kind: "highlight", at: "teeth", color: "#4fb6ff", from: 2.6 },
          { kind: "text", at: [600, 820], text: "上下牙齿碰得咯咯响！", color: "#2b7bbf", from: 4 }
        ]
      },
      {
        turn: 3,
        title: "手脚血管收紧保内脏",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, "heart", "arteries"],
        duration: 8.5,
        cues: [
          { kind: "highlight", at: "heart", color: "#e5484d", from: 0.4 },
          { kind: "label", at: "chestSkin", text: "热血优先保心肺肚子", side: "right", color: "#e5484d", from: 1 },
          { kind: "pulse", at: "palm", color: "#4fb6ff", radius: 45, from: 2.6 },
          { kind: "label", at: "palm", text: "手脚血管收紧少散热", side: "left", color: "#2b7bbf", from: 3.2 },
          { kind: "text", at: [600, 810], text: "手脚先变凉，是在舍小家保大家", color: "#2f7d32", from: 4.8 }
        ]
      },
      {
        turn: 4,
        title: "手冻僵要用温水慢暖",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🧤", path: [[360, 320]], size: 110, from: 0.4, to: 4.8 },
          { kind: "sprite", icon: "💧", path: [[840, 320]], size: 100, from: 1.2, to: 4.8 },
          { kind: "text", at: [600, 460], text: "进屋用接近体温的温水慢慢捂", size: "s", color: "#2f7d32", from: 2, to: 4.8 },
          { kind: "myth", wrong: "手冻僵了马上伸进滚水烫或烤火", right: "麻木易烫伤，血管猛涨还易生冻疮", from: 5 }
        ]
      }
    ]
  },
  {
    question: "red-lips",
    scenes: [
      {
        turn: 0,
        title: "半透明天窗透出血色",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.5 }, "mouth", "arteries"],
        camera: [{ t: 0, at: "teeth", zoom: 1.9 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "teeth", color: "#e5484d", from: 0.4 },
          { kind: "label", at: [600, 720], text: "透出底下血液的红色", side: "right", color: "#e5484d", from: 1.2 },
          { kind: "text", at: [600, 820], text: "不是涂了颜料，是半透明小天窗", color: "#e5484d", from: 4.2 }
        ]
      },
      {
        turn: 1,
        title: "角质极薄又没黑色素",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [320, 420], size: [400, 260], color: "#f3cfb3", text: "普通皮：厚实", from: 0.3 },
          { kind: "text", at: [320, 600], text: "十几层角质＋黑色素", size: "s", color: "#7a6a55", from: 1 },
          { kind: "shape", shape: "rect", at: [880, 470], size: [400, 160], color: "#ff7a8a", text: "密密毛细血管", from: 2.2 },
          { kind: "shape", shape: "rect", at: [880, 365], size: [400, 44], color: "rgba(255,245,240,0.65)", outline: true, text: "薄唇皮", from: 2.8 },
          { kind: "text", at: [880, 600], text: "只三四层，一望到底", size: "s", color: "#e5484d", from: 3.4 },
          { kind: "text", at: [600, 780], text: "红扑扑的血色直接透出来啦！", color: "#e5484d", from: 4.8 }
        ]
      },
      {
        turn: 2,
        title: "天冷缺氧嘴唇会发紫",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "pill", at: [330, 420], size: [340, 120], color: "#ff5a6e", text: "暖和：鲜红血", from: 0.4 },
          { kind: "shape", shape: "pill", at: [870, 420], size: [340, 120], color: "#8e6bbf", text: "天冷：血变慢", from: 1.8 },
          { kind: "sprite", icon: "❄️", path: [[870, 250]], size: 84, from: 2.4 },
          { kind: "text", at: [600, 750], text: "血管收紧鲜红血少，看着发紫", color: "#7a4fd6", from: 4 }
        ]
      },
      {
        turn: 3,
        title: "没有汗腺和油膜保护",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "rect", at: [320, 440], size: [400, 220], color: "#ffe4d0", text: "脸蛋皮肤", from: 0.3 },
          { kind: "shape", shape: "pill", at: [320, 310], size: [380, 44], color: "#ffe08a", text: "天然油脂锁水", from: 0.9 },
          { kind: "shape", shape: "rect", at: [880, 440], size: [400, 220], color: "#ffb3c1", outline: true, text: "嘴唇没油膜", from: 2.2 },
          { kind: "flow", path: [[880, 330], [880, 150]], color: "#4fb6ff", count: 6, speed: 180, from: 2.8 },
          { kind: "text", at: [600, 760], text: "没汗腺也没油，风一吹水就跑", color: "#e5484d", from: 4.4 }
        ]
      },
      {
        turn: 4,
        title: "越舔越干涂润唇膏",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "💄", path: [[600, 300]], size: 115, from: 0.4, to: 4.8 },
          { kind: "text", at: [600, 450], text: "涂儿童润唇膏替嘴唇盖层油膜", size: "s", color: "#2f7d32", from: 1.2, to: 4.8 },
          { kind: "myth", wrong: "嘴唇干了多舔几口口水能保湿", right: "口水蒸发抽走更多水，消化酶还伤皮", from: 5 }
        ]
      }
    ]
  }
];
