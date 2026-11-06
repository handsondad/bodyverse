import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "finger-bend",
    scenes: [
      {
        turn: 0,
        title: "一节一节的骨头",
        view: "hand",
        layers: ["skeleton"],
        camera: [
          { t: 0, at: [500, 620], zoom: 1.8 }, { t: 3.4, at: [500, 620], zoom: 1.8 },
          { t: 4.2, at: [480, 540], zoom: 1.6 }, { t: 6.4, at: [480, 540], zoom: 1.6 }, { t: 7.2, at: [470, 660], zoom: 2.1 }
        ],
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: "fingerBase", size: [36, 36], color: "#f4ecd8", outline: true, text: "1", from: 0.5 },
          { kind: "shape", shape: "circle", at: "fingerMiddle", size: [36, 36], color: "#f4ecd8", outline: true, text: "2", from: 1 },
          { kind: "shape", shape: "circle", at: "fingerTip", size: [36, 36], color: "#f4ecd8", outline: true, text: "3", from: 1.5 },
          { kind: "label", at: "fingerMiddle", text: "三节小骨头", side: "left", from: 2, to: 3.8 },
          { kind: "shape", shape: "circle", at: [437, 360], size: [36, 36], color: "#f4ecd8", outline: true, text: "1", from: 3.9, to: 6.6 },
          { kind: "shape", shape: "circle", at: [388, 462], size: [36, 36], color: "#f4ecd8", outline: true, text: "2", from: 4.4, to: 6.6 },
          { kind: "label", at: [412, 410], text: "大拇指两节", side: "left", from: 4.9, to: 6.6 },
          { kind: "pulse", at: [470, 648], color: "#ff9f43", radius: 40, from: 7 },
          { kind: "pulse", at: [440, 718], color: "#ff9f43", radius: 34, from: 7.4 },
          { kind: "label", at: [470, 648], text: "关节：像合页", side: "right", from: 7.9 }
        ]
      },
      {
        turn: 1,
        title: "合页只说对一半",
        view: "hand",
        layers: ["skeleton"],
        camera: [{ t: 0, at: [490, 620], zoom: 1.9 }, { t: 3.4, at: [490, 620], zoom: 1.9 }, { t: 4.4, at: [490, 455], zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: [470, 648], color: "#ff9f43", radius: 40, from: 0.4, to: 3.4 },
          { kind: "label", at: [470, 648], text: "只能弯和伸直", side: "right", from: 0.9, to: 3.4 },
          { kind: "pulse", at: [535, 490], color: "#ff9f43", radius: 44, from: 3.8, to: 6.8 },
          { kind: "arrow", path: [[435, 762], [397, 744], [356, 716]], text: "左右摆", from: 4.4, to: 6.8 },
          { kind: "arrow", path: [[435, 762], [480, 773], [523, 778]], from: 4.6, to: 6.8 },
          {
            kind: "arrow",
            path: [[622, 160], [610, 190], [580, 202], [550, 190], [538, 160], [550, 130], [580, 118], [607, 128]],
            color: "#b48cff", text: "转圈圈", draw: 1, from: 7
          },
          { kind: "arrow", path: [[372, 512], [385, 640], [425, 752]], color: "#2f7d32", text: "对着捏", from: 7.8 }
        ]
      },
      {
        turn: 2,
        title: "前臂肌肉拉绳子",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.3 }, "skeleton", { layer: "muscles", opacity: 0.75 }],
        camera: [{ t: 0, at: [470, 420], zoom: 2.4 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: [478, 375], color: "#e98a7c", radius: 30, from: 0.4, to: 4.4 },
          { kind: "label", at: [478, 375], text: "肌肉在前臂上", side: "right", from: 0.8 },
          { kind: "arrow", path: [[478, 395], [470, 435], "wrist", "palm", "fingerBase", "fingerMiddle", "fingerTip"], color: "#fff3d6", draw: 1.4, from: 2, to: 5.2 },
          { kind: "label", at: [458, 488], text: "肌腱：长绳子", side: "left", from: 2.8, to: 6.2 },
          { kind: "shape", shape: "pill", at: [478, 375], size: [34, 90], color: "#e98a7c", text: "收缩", motion: "shrink", over: 1.2, from: 4.6 },
          { kind: "flow", path: ["fingerTip", "fingerMiddle", "fingerBase", "palm", "wrist", [470, 435], [478, 400]], color: "#fff3d6", count: 6, speed: 70, size: 4, from: 5.2 },
          { kind: "pulse", at: [446, 509], color: "#ff9f43", radius: 14, from: 5.8 },
          { kind: "label", at: "fingerTip", text: "手指弯下来", side: "left", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "摸摸前臂在滑",
        view: "hand",
        layers: [{ layer: "skin", opacity: 0.9, to: 5 }, { layer: "skeleton", from: 4.6 }, { layer: "muscles", opacity: 0.85, from: 4.6 }],
        camera: [{ t: 0, at: [650, 230], zoom: 1.6 }, { t: 5, at: [650, 230], zoom: 1.6 }, { t: 6, at: [470, 640], zoom: 2.2 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "✋", path: [[1000, 60], [860, 60]], travel: 1, size: 80, from: 0.3, to: 5 },
          { kind: "text", at: [330, 800], text: "快速动手指", size: "s", from: 1.2, to: 5 },
          { kind: "arrow", path: [[640, 150], [640, 40]], color: "#fff3d6", text: "来回滑", from: 2, to: 5 },
          { kind: "arrow", path: [[690, 40], [690, 150]], color: "#fff3d6", from: 2.2, to: 5 },
          { kind: "label", at: [660, 100], text: "一缩一松", side: "left", from: 3, to: 5 },
          { kind: "label", at: "fingerBase", text: "骨头", side: "right", from: 6.2 },
          { kind: "label", at: [486, 630], text: "细细的肌腱", side: "right", from: 6.7 },
          { kind: "text", at: [600, 820], text: "没有大块肌肉", size: "s", color: "#7a6a55", from: 7.6 }
        ]
      },
      {
        turn: 4,
        title: "发动机放在前臂",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [270, 430], size: [170, 330], color: "#e98a7c", text: "全是肌肉", motion: "grow", over: 1.2, from: 0.3, to: 5.8 },
          { kind: "text", at: [270, 680], text: "又粗又笨", size: "s", color: "#ff5a5f", from: 1.2, to: 4.4 },
          { kind: "shape", shape: "pill", at: [800, 220], size: [140, 240], color: "#e98a7c", text: "发动机", motion: "pulse", from: 2.2 },
          { kind: "shape", shape: "rect", at: [800, 470], size: [16, 260], color: "#fff3d6", outline: true, from: 2.8 },
          { kind: "shape", shape: "pill", at: [800, 700], size: [76, 200], color: "#f4ecd8", outline: true, text: "手指", from: 3.4 },
          { kind: "flow", path: [[800, 590], [800, 350]], color: "#ff9f43", count: 5, speed: 120, size: 7, from: 4, to: 6 },
          { kind: "text", at: [1010, 700], text: "又细又灵巧", size: "s", color: "#2f7d32", from: 4.6, to: 6 },
          { kind: "flow", path: [[270, 140], [270, 520]], color: "#7a6a55", count: 8, speed: 60, size: 4, from: 6.2 },
          { kind: "sprite", icon: "🕺", path: [[270, 600]], size: 130, wobble: true, from: 6.6 },
          { kind: "text", at: [270, 780], text: "像提线木偶", size: "s", from: 7.2 }
        ]
      },
      {
        turn: 5,
        title: "腱鞘：小隧道",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 360], size: [760, 90], color: "#f4ecd8", outline: true, text: "指骨", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 450], size: [760, 16], color: "#fff3d6", outline: true, motion: "wiggle", from: 0.8, to: 2.6 },
          { kind: "sprite", icon: "❓", path: [[1050, 470]], size: 70, from: 1.2, to: 2.6 },
          { kind: "shape", shape: "rect", at: [600, 450], size: [760, 16], color: "#fff3d6", outline: true, from: 2.4 },
          { kind: "shape", shape: "rect", at: [430, 440], size: [70, 64], color: "rgba(255, 159, 67, 0.45)", outline: true, from: 2.8 },
          { kind: "shape", shape: "rect", at: [770, 440], size: [70, 64], color: "rgba(255, 159, 67, 0.45)", outline: true, from: 3.2 },
          { kind: "label", at: [770, 440], pos: [770, 620], text: "腱鞘：小隧道", from: 3.6, to: 6 },
          { kind: "flow", path: [[980, 450], [220, 450]], color: "#ff9f43", count: 8, speed: 200, size: 6, from: 4.6 },
          { kind: "text", at: [600, 650], text: "🎣 像鱼竿上的小环", size: "m", from: 6.2 }
        ]
      },
      {
        turn: 6,
        title: "结实的肌腱",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 320], size: [680, 24], color: "#fff3d6", outline: true, from: 0.3, to: 5 },
          { kind: "shape", shape: "pill", at: [600, 356], size: [680, 24], color: "#fff3d6", outline: true, from: 0.6, to: 5 },
          { kind: "shape", shape: "pill", at: [600, 392], size: [680, 24], color: "#fff3d6", outline: true, from: 0.9, to: 5 },
          { kind: "label", at: [600, 320], pos: [600, 200], text: "一根根细纤维", from: 1.3, to: 3 },
          { kind: "arrow", path: [[250, 356], [90, 356]], color: "#ff5a5f", text: "使劲拉", from: 2.8, to: 5 },
          { kind: "arrow", path: [[950, 356], [1110, 356]], color: "#ff5a5f", from: 3, to: 5 },
          { kind: "text", at: [600, 560], text: "🪢 拉不断", color: "#2f7d32", from: 3.6, to: 5 },
          { kind: "shape", shape: "pill", at: [600, 356], size: [680, 110], color: "#fff3d6", outline: true, text: "肌腱", from: 4.8 },
          { kind: "shape", shape: "rect", at: [600, 356], size: [320, 170], color: "rgba(255, 159, 67, 0.35)", outline: true, from: 5.4 },
          { kind: "flow", path: [[470, 426], [730, 426]], color: "#4fb6ff", count: 6, speed: 80, size: 6, from: 6, to: 8 },
          { kind: "label", at: [600, 426], pos: [600, 580], text: "滑滑的液体", from: 6.3, to: 8 },
          { kind: "sprite", icon: "📱", path: [[250, 620]], size: 90, wobble: true, from: 8.2 },
          { kind: "pulse", at: [600, 356], color: "#ff5a5f", radius: 150, from: 8.6 },
          { kind: "text", at: [640, 640], text: "玩太久：腱鞘炎", color: "#ff5a5f", from: 9 }
        ]
      }
    ]
  },
  {
    question: "pinch-bean",
    scenes: [
      {
        turn: 0,
        title: "靠的是巧劲",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🧱", path: [[300, 380]], size: 130, from: 0.3 },
          { kind: "sprite", icon: "🖐️", path: [[300, 700], [300, 420]], travel: 0.9, size: 120, from: 0.8 },
          { kind: "text", at: [300, 620], text: "整只手一握", size: "s", from: 1.6, to: 5.4 },
          { kind: "shape", shape: "circle", at: [860, 400], size: [46, 40], color: "#d9a441", from: 2.8 },
          { kind: "pulse", at: [860, 400], color: "#4fb6ff", radius: 70, from: 3.2, to: 5 },
          { kind: "sprite", icon: "🤏", path: [[1050, 220], [900, 340]], travel: 0.8, size: 110, from: 3.6 },
          { kind: "text", at: [880, 620], text: "对准、轻轻地", size: "s", from: 4.6 },
          { kind: "text", at: [600, 800], text: "靠巧，不靠大力", color: "#2f7d32", from: 6 }
        ]
      },
      {
        turn: 1,
        title: "太用力会弹飞",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [450, 340], size: [220, 84], color: "#f6c9a8", text: "拇指", from: 0.3, to: 5 },
          { kind: "shape", shape: "pill", at: [790, 340], size: [220, 84], color: "#f6c9a8", text: "食指", from: 0.6, to: 5 },
          { kind: "sprite", icon: "🟤", path: [[620, 340]], size: 56, from: 1, to: 2.8 },
          { kind: "arrow", path: [[300, 230], [500, 230]], color: "#ff5a5f", text: "使劲捏", from: 1.6, to: 3.2 },
          { kind: "arrow", path: [[940, 230], [740, 230]], color: "#ff5a5f", from: 1.8, to: 3.2 },
          { kind: "sprite", icon: "🟤", path: [[620, 340], [720, 200], [960, 90]], travel: 0.6, spin: true, size: 56, from: 2.8, to: 5 },
          { kind: "text", at: [1000, 230], text: "嗖！", size: "l", color: "#ff5a5f", from: 3, to: 5 },
          { kind: "text", at: [600, 560], text: "🧼 像捏湿肥皂", from: 3.6, to: 5 },
          { kind: "shape", shape: "rect", at: [380, 650], size: [210, 90], color: "#bfe3ff", text: "太松：滑掉", from: 5.2 },
          { kind: "shape", shape: "rect", at: [600, 650], size: [210, 90], color: "#c8e6c9", text: "刚刚好", from: 5.5 },
          { kind: "shape", shape: "rect", at: [820, 650], size: [210, 90], color: "#ffc9c9", text: "太紧：弹飞", from: 5.8 },
          { kind: "sprite", icon: "👇", path: [[380, 560], [820, 560], [600, 560]], travel: 1.8, size: 64, from: 6.4 },
          { kind: "pulse", at: [600, 650], color: "#2f7d32", radius: 90, from: 8.2 }
        ]
      },
      {
        turn: 2,
        title: "指尖报告大脑",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, "nerves"],
        camera: [{ t: 0, at: "fingerTip", zoom: 2.4 }, { t: 1.6, at: "fingerTip", zoom: 2.4 }, { t: 2.8, at: [520, 300], zoom: 1.7 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: "fingerTip", color: "#ffcf3f", radius: 16, from: 0.3 },
          { kind: "label", at: "fingerTip", text: "指尖传感器", side: "left", from: 0.7 },
          {
            kind: "flow", path: ["fingerTip", "fingerBase", "palm", "wrist", "forearm", [490, 325], [520, 180], [585, 125], "brain"],
            color: "#ffcf3f", count: 8, speed: 200, size: 5, from: 2.2
          },
          { kind: "text", at: [880, 170], text: "碰到了！", size: "s", from: 3.2, to: 4.4 },
          { kind: "text", at: [880, 170], text: "在往下滑！", size: "s", from: 4.4, to: 5.6 },
          { kind: "highlight", at: "brain", color: "#b48cff", pad: 10, from: 5 },
          { kind: "text", at: [880, 170], text: "压太紧啦！", size: "s", from: 5.6, to: 6.8 },
          {
            kind: "flow", path: ["brain", [585, 125], [520, 180], [490, 325], "forearm", "wrist", "palm", "fingerBase", "fingerTip"],
            color: "#ff9f43", count: 8, speed: 200, size: 5, from: 6.6
          },
          { kind: "meter", at: [900, 760], label: "捏的力气", start: 0.85, end: 0.5, color: "#2f7d32", over: 1.2, from: 7 }
        ]
      },
      {
        turn: 3,
        title: "指尖传感器最密",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [330, 250], text: "指尖", from: 0.3, to: 5 },
          {
            kind: "flow", path: [[200, 330], [460, 330], [200, 380], [460, 380], [200, 430], [460, 430], [200, 480], [460, 480], [200, 520], [460, 520]],
            color: "#ffcf3f", count: 60, speed: 0, size: 6, from: 0.7
          },
          { kind: "text", at: [870, 250], text: "手背", from: 1.6, to: 5.6 },
          {
            kind: "flow", path: [[740, 330], [1000, 330], [740, 380], [1000, 380], [740, 430], [1000, 430], [740, 480], [1000, 480], [740, 520], [1000, 520]],
            color: "#ffcf3f", count: 6, speed: 0, size: 6, from: 2
          },
          { kind: "text", at: [600, 700], text: "黄点＝小传感器", size: "s", color: "#7a6a55", from: 2.6, to: 3.6 },
          { kind: "flow", path: [[270, 430], [390, 430]], color: "#ff5a5f", count: 3, speed: 0, size: 12, from: 3.8 },
          { kind: "flow", path: [[810, 430], [930, 430]], color: "#ff5a5f", count: 3, speed: 0, size: 12, from: 4.4 },
          { kind: "text", at: [330, 250], text: "指尖：两个点", color: "#2f7d32", from: 5.2 },
          { kind: "text", at: [870, 250], text: "手背：一个点", color: "#ff5a5f", from: 5.8 }
        ]
      },
      {
        turn: 4,
        title: "大脑的身体地图",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🧠", path: [[600, 190]], size: 150, from: 0.3 },
          { kind: "text", at: [600, 330], text: "身体地图", size: "s", from: 0.9, to: 4.4 },
          { kind: "shape", shape: "circle", at: [380, 600], size: [320, 320], color: "#ffd59e", text: "手指", motion: "grow", over: 1.6, from: 1.8 },
          { kind: "shape", shape: "circle", at: [840, 640], size: [120, 120], color: "#bfe3ff", text: "后背", from: 3 },
          { kind: "flow", path: [[330, 450], [530, 250]], color: "#ffcf3f", count: 10, speed: 220, size: 6, from: 4.6 },
          { kind: "flow", path: [[590, 280], [430, 460]], color: "#ff9f43", count: 10, speed: 220, size: 6, from: 5.2 },
          { kind: "text", at: [820, 800], text: "看得细，管得细", size: "s", color: "#2f7d32", from: 6.2 }
        ]
      },
      {
        turn: 5,
        title: "越练越稳",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 190], size: [150, 150], color: "#ffe3b3", text: "👀看准", from: 0.3 },
          { kind: "shape", shape: "circle", at: [840, 420], size: [150, 150], color: "#ffe3b3", text: "🤏捏住", from: 0.8 },
          { kind: "shape", shape: "circle", at: [600, 650], size: [150, 150], color: "#ffe3b3", text: "📡报告", from: 1.3 },
          { kind: "shape", shape: "circle", at: [360, 420], size: [150, 150], color: "#ffe3b3", text: "🧠调整", from: 1.8 },
          {
            kind: "flow", path: [[600, 190], [770, 250], [840, 420], [770, 590], [600, 650], [430, 590], [360, 420], [430, 250], [600, 190]],
            color: "#ff9f43", count: 10, speed: 220, size: 8, from: 2.6, to: 7
          },
          { kind: "meter", at: [600, 830], label: "捏得稳", start: 0.2, end: 0.9, color: "#2f7d32", over: 3, from: 3.4 },
          { kind: "sprite", icon: "🚲", path: [[600, 420]], size: 120, from: 7.2 }
        ]
      }
    ]
  },
  {
    question: "muscle-sore",
    scenes: [
      {
        turn: 0,
        title: "腿没坏，在修补",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.4 }, "muscles"],
        camera: [{ t: 0, at: [600, 280], zoom: 1.8 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "quads", color: "#e98a7c", from: 0.3, to: 2.6 },
          { kind: "label", at: "quads", text: "昨天特别卖力", side: "left", from: 0.7, to: 2.6 },
          {
            kind: "flow", path: [[560, 120], [630, 160], [560, 200], [630, 240], [565, 280], [625, 320], [570, 360], [620, 400]],
            color: "#ff5a5f", count: 14, speed: 0, size: 4, from: 2.4
          },
          { kind: "label", at: [600, 260], text: "很小很小的伤口", side: "left", from: 2.9, to: 5 },
          { kind: "sprite", icon: "🛠️", path: [[880, 100], [640, 200], [640, 380]], travel: 2, size: 50, from: 4.6 },
          { kind: "label", at: [620, 300], text: "正在修补", side: "right", from: 5.4 },
          { kind: "meter", at: [920, 780], label: "酸痛两三天退", start: 0.85, end: 0.1, color: "#ff5a5f", over: 1.5, from: 6.4 }
        ]
      },
      {
        turn: 1,
        title: "一束束细丝",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 190], size: [460, 110], color: "#e98a7c", text: "肌肉", from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 400], size: [640, 38], color: "#e98a7c", from: 0.9 },
          { kind: "shape", shape: "pill", at: [600, 450], size: [640, 38], color: "#e98a7c", from: 1.2, to: 5 },
          { kind: "shape", shape: "pill", at: [600, 500], size: [640, 38], color: "#e98a7c", from: 1.5 },
          { kind: "arrow", path: [[140, 450], [260, 450]], color: "#ff9f43", text: "往里缩", from: 2.6, to: 4.6 },
          { kind: "arrow", path: [[1060, 450], [940, 450]], color: "#ff9f43", from: 2.8, to: 4.6 },
          { kind: "shape", shape: "pill", at: [600, 450], size: [640, 38], color: "#ff9a9e", motion: "wiggle", from: 4.8 },
          { kind: "label", at: [820, 450], pos: [820, 620], text: "被扯乱了", color: "#e5484d", from: 5.4 },
          { kind: "text", at: [600, 780], text: "🧶 像毛衣勾出线", from: 6.4 }
        ]
      },
      {
        turn: 2,
        title: "修补要花时间",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 300], size: [600, 40], color: "#ff9a9e", motion: "wiggle", from: 0.3, to: 3.4 },
          { kind: "sprite", icon: "🛠️", path: [[1100, 130], [760, 250]], travel: 1, size: 70, from: 0.8 },
          { kind: "shape", shape: "pill", at: [600, 300], size: [600, 40], color: "#e98a7c", motion: "grow", over: 1.5, from: 3 },
          { kind: "shape", shape: "circle", at: [600, 300], size: [680, 170], color: "rgba(255, 90, 95, 0.18)", motion: "pulse", from: 4.2 },
          { kind: "label", at: [600, 300], pos: [600, 140], text: "肿肿的、很敏感", from: 4.6, to: 6.4 },
          { kind: "arrow", path: [[220, 640], [980, 640]], color: "#7a6a55", text: "要过好些小时", draw: 1.5, from: 5.6 },
          { kind: "sprite", icon: "😖", path: [[900, 560]], size: 80, from: 6.8 },
          { kind: "text", at: [900, 740], text: "第二天最酸", size: "s", color: "#ff5a5f", from: 7.2 }
        ]
      },
      {
        turn: 3,
        title: "不是“酸”堆着",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[180, 140]], size: 80, from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 280], size: [520, 130], color: "#e98a7c", text: "肌肉", from: 0.6 },
          { kind: "flow", path: [[380, 280], [820, 280]], color: "#b48cff", count: 10, speed: 50, size: 9, from: 1, to: 3.2 },
          { kind: "flow", path: [[700, 280], [950, 200], [1180, 160]], color: "#b48cff", count: 8, speed: 260, size: 9, from: 2.6, to: 5 },
          { kind: "sprite", icon: "⏰", path: [[960, 440]], size: 80, from: 3 },
          { kind: "text", at: [960, 560], text: "一两个小时", size: "s", from: 3.4 },
          { kind: "myth", wrong: "腿酸是“酸”堆在肌肉里", right: "第二天酸是小伤口在修补", from: 5.2 },
          { kind: "sprite", icon: "🛠️", path: [[600, 280]], size: 70, from: 7 }
        ]
      },
      {
        turn: 4,
        title: "下楼像踩刹车",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [300, 120], text: "上楼", from: 0.3, to: 6.4 },
          { kind: "shape", shape: "pill", at: [300, 380], size: [340, 110], color: "#e98a7c", text: "边缩短", motion: "shrink", over: 2.2, from: 0.7, to: 6.4 },
          { kind: "arrow", path: [[120, 560], [120, 240]], color: "#2f7d32", text: "往上推", from: 1.6, to: 6.4 },
          { kind: "text", at: [900, 120], text: "下楼", from: 3.4 },
          { kind: "shape", shape: "pill", at: [900, 380], size: [340, 110], color: "#e98a7c", text: "边被拉长", motion: "grow", over: 2.2, from: 3.8 },
          { kind: "arrow", path: [[1080, 240], [1080, 560]], color: "#ff5a5f", text: "刹车", from: 4.8 },
          { kind: "pulse", at: [900, 380], color: "#ff5a5f", radius: 120, from: 6.6 },
          { kind: "text", at: [900, 620], text: "最容易扯乱", size: "s", color: "#ff5a5f", from: 7 },
          { kind: "text", at: [600, 800], text: "⛰️ 爬山后下楼最难受", from: 8 }
        ]
      },
      {
        turn: 5,
        title: "下次没这么酸",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [560, 200], size: [400, 110], color: "#e98a7c", text: "修好更皮实", from: 0.3 },
          { kind: "sprite", icon: "🛡️", path: [[840, 200]], size: 90, from: 0.9 },
          { kind: "meter", at: [380, 420], label: "第一次的酸", start: 0, end: 0.85, color: "#ff5a5f", over: 1.2, from: 1.8, to: 6.4 },
          { kind: "meter", at: [820, 420], label: "下次的酸", start: 0, end: 0.3, color: "#2f7d32", over: 1.2, from: 2.8, to: 6.4 },
          { kind: "arrow", path: [[240, 780], [380, 780], [380, 700], [520, 700], [520, 620], [660, 620]], color: "#2f7d32", text: "一点点加量", draw: 1.6, from: 4.4 },
          { kind: "sprite", icon: "❓", path: [[900, 640]], size: 90, from: 6.6 },
          { kind: "text", at: [900, 760], text: "科学家还没弄清", size: "s", color: "#7a6a55", from: 7 }
        ]
      },
      {
        turn: 6,
        title: "轻轻动，好好睡",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🚶", path: [[140, 260], [420, 260]], travel: 2.4, size: 100, wobble: true, from: 0.3, to: 6 },
          { kind: "text", at: [290, 400], text: "轻轻活动", size: "s", color: "#2f7d32", from: 1.2, to: 6 },
          { kind: "sprite", icon: "😴", path: [[640, 220]], size: 90, from: 2.4 },
          { kind: "sprite", icon: "🍚", path: [[900, 220]], size: 90, from: 2.8 },
          { kind: "sprite", icon: "🛠️", path: [[770, 520]], size: 100, from: 3.6 },
          { kind: "flow", path: [[770, 290], [770, 450]], icon: "⚡", count: 3, speed: 100, size: 12, from: 4.2 },
          { kind: "meter", at: [330, 700], label: "酸痛", start: 0.2, end: 0.95, color: "#ff5a5f", over: 1.5, from: 6.2 },
          { kind: "text", at: [330, 800], text: "太酸：练太多了", size: "s", color: "#ff5a5f", from: 7.6 }
        ]
      }
    ]
  },
  {
    question: "growth",
    scenes: [
      {
        turn: 0,
        title: "骨头在悄悄长",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, "skeleton"],
        camera: [{ t: 0, at: [600, 450], zoom: 1 }, { t: 4.6, at: [600, 450], zoom: 1 }, { t: 5.6, at: [560, 700], zoom: 1.6 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "foot", color: "#2f7d32", pad: 10, from: 0.4, to: 4.8 },
          { kind: "highlight", at: "tibia", color: "#2f7d32", pad: 10, from: 0.8, to: 4.8 },
          { kind: "highlight", at: "femur", color: "#2f7d32", pad: 10, from: 1.2, to: 4.8 },
          { kind: "highlight", at: "humerus", color: "#2f7d32", pad: 10, from: 1.6, to: 4.8 },
          { kind: "label", at: "femur", text: "每天长一点点", side: "left", from: 2.2, to: 4.8 },
          { kind: "sprite", icon: "👟", path: ["foot"], size: 50, from: 5.6 },
          { kind: "label", at: "foot", text: "鞋小了", side: "left", from: 6 },
          { kind: "label", at: "knee", text: "裤子短了", side: "left", from: 6.6 }
        ]
      },
      {
        turn: 1,
        title: "骨头是活的",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.3 }, "skeleton"],
        camera: [{ t: 0, at: [610, 250], zoom: 1.7 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🪨", path: [[870, 170]], size: 80, from: 0.3, to: 2.4 },
          { kind: "sprite", icon: "❌", path: [[870, 170]], size: 90, from: 0.9, to: 2.4 },
          { kind: "flow", path: [[578, 110], [592, 250], [608, 400]], color: "#ff5a5f", count: 6, speed: 60, size: 6, from: 1.6 },
          { kind: "label", at: "femur", pos: [440, 180], text: "有血管，有细胞", from: 2 },
          { kind: "shape", shape: "rect", at: [576, 90], size: [64, 14], color: "#6cc6ff", motion: "pulse", from: 3.6 },
          { kind: "shape", shape: "rect", at: [616, 418], size: [86, 16], color: "#6cc6ff", motion: "pulse", from: 4 },
          { kind: "label", at: [616, 418], text: "生长板", side: "right", from: 4.6 },
          { kind: "label", at: [576, 90], text: "生长板", side: "right", from: 5 }
        ]
      },
      {
        turn: 2,
        title: "一层层砌新砖",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 660], size: [150, 280], color: "#f4ecd8", outline: true, text: "硬骨头", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 500], size: [170, 38], color: "#8fd3ff", text: "新软骨", from: 0.9, to: 3.6 },
          { kind: "shape", shape: "rect", at: [600, 458], size: [170, 38], color: "#8fd3ff", text: "新软骨", from: 1.5, to: 5 },
          { kind: "text", at: [880, 470], text: "一层层加上去", size: "s", from: 2.1, to: 3.6 },
          { kind: "shape", shape: "rect", at: [600, 500], size: [170, 38], color: "#f4ecd8", outline: true, text: "变硬", from: 3.4 },
          { kind: "text", at: [880, 520], text: "旧的变硬骨", size: "s", color: "#7a6a55", from: 3.8, to: 5.6 },
          { kind: "shape", shape: "rect", at: [600, 416], size: [170, 38], color: "#8fd3ff", text: "新软骨", from: 4.2 },
          { kind: "shape", shape: "rect", at: [600, 458], size: [170, 38], color: "#f4ecd8", outline: true, text: "变硬", from: 4.8 },
          { kind: "shape", shape: "rect", at: [600, 374], size: [170, 38], color: "#8fd3ff", text: "新软骨", from: 5.4 },
          { kind: "arrow", path: [[380, 800], [380, 340]], color: "#2f7d32", text: "从两头变长", draw: 1.2, from: 6.2 }
        ]
      },
      {
        turn: 3,
        title: "青春期猛长",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "arrow", path: [[150, 760], [540, 650]], color: "#7a6a55", text: "小时候", draw: 1.4, from: 0.3 },
          { kind: "sprite", icon: "📨", path: [[430, 480]], size: 80, from: 1.8, to: 5 },
          { kind: "text", at: [430, 390], text: "青春期的信号", size: "s", from: 2.2, to: 5 },
          { kind: "shape", shape: "rect", at: [930, 650], size: [200, 44], color: "#8fd3ff", text: "生长板", motion: "pulse", from: 2.6, to: 5.4 },
          { kind: "arrow", path: [[540, 650], [760, 360]], color: "#ff9f43", text: "猛地蹿高", from: 3.2 },
          { kind: "shape", shape: "rect", at: [930, 650], size: [200, 44], color: "#f4ecd8", outline: true, text: "变成硬骨", from: 5.2 },
          { kind: "arrow", path: [[760, 360], [1080, 335]], color: "#7a6a55", text: "不长了", from: 6 }
        ]
      },
      {
        turn: 4,
        title: "睡得好长得高",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, "skeleton"],
        camera: [{ t: 0, at: [580, 380], zoom: 1.3 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🌙", path: [[900, 140]], size: 70, from: 0.3 },
          { kind: "sprite", icon: "😴", path: [{ a: "brain", dx: -110, dy: 0 }], size: 60, from: 0.8 },
          { kind: "pulse", at: "hypothalamus", color: "#b48cff", radius: 30, from: 1.6, to: 4.4 },
          { kind: "label", at: "hypothalamus", pos: [770, 130], text: "生长激素", color: "#7a4fd6", from: 2 },
          {
            kind: "flow", path: ["hypothalamus", [598, 110], "carotid", "heart", [600, 300], [585, 420], "femoralArtery", "knee"],
            color: "#b48cff", count: 8, speed: 220, size: 5, from: 3
          },
          { kind: "highlight", at: "knee", color: "#6cc6ff", pad: 14, from: 4.6 },
          { kind: "label", at: "knee", text: "生长板更卖力", side: "left", from: 5 }
        ]
      },
      {
        turn: 5,
        title: "能长多高？",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [600, 130], text: "😴 🍚 🏃", size: "l", from: 0.3, to: 6 },
          { kind: "meter", at: [600, 300], label: "长到该有的高", start: 0.2, end: 0.85, color: "#2f7d32", over: 2, from: 1 },
          { kind: "shape", shape: "rect", at: [698, 314], size: [8, 80], color: "#7a6a55", from: 3.2 },
          { kind: "sprite", icon: "👨‍👩‍👧", path: [[920, 440]], size: 90, from: 3.8 },
          { kind: "arrow", path: [[880, 400], [712, 330]], color: "#b48cff", text: "遗传", from: 4.4, to: 6 },
          { kind: "flow", path: [[260, 800], [420, 760], [580, 725], [740, 690], [900, 655]], color: "#4fb6ff", count: 5, speed: 0, size: 10, from: 6.2 },
          { kind: "arrow", path: [[260, 800], [420, 760], [580, 725], [740, 690], [900, 655]], color: "#4fb6ff", text: "画成一条线", draw: 1.4, from: 6.8 },
          { kind: "sprite", icon: "📏", path: [[170, 770]], size: 70, from: 7.4 }
        ]
      },
      {
        turn: 6,
        title: "早上高一点点",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 260], size: [220, 90], color: "#f4ecd8", outline: true, text: "小骨头", from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 345], size: [200, 44], color: "#8fd3ff", text: "软垫子", from: 0.6, to: 3.2 },
          { kind: "shape", shape: "rect", at: [600, 430], size: [220, 90], color: "#f4ecd8", outline: true, text: "小骨头", from: 0.9 },
          { kind: "sprite", icon: "☀️", path: [[250, 200]], size: 90, from: 2.2, to: 5.6 },
          { kind: "arrow", path: [[760, 110], [640, 200]], color: "#ff9f43", text: "站着压", from: 2.6, to: 5.6 },
          { kind: "shape", shape: "pill", at: [600, 345], size: [200, 44], color: "#8fd3ff", text: "压扁", motion: "shrink", over: 1.6, from: 3, to: 5.8 },
          { kind: "sprite", icon: "🌙", path: [[950, 200]], size: 80, from: 6 },
          { kind: "shape", shape: "pill", at: [600, 345], size: [200, 44], color: "#8fd3ff", text: "鼓回来", motion: "grow", over: 1.6, from: 6.2 },
          { kind: "text", at: [600, 700], text: "⏰ 每次同一时间量", color: "#2f7d32", from: 7.8 }
        ]
      }
    ]
  }
];
