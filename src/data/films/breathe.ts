import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "sneeze",
    scenes: [
      {
        turn: 0,
        title: "灰尘钻进鼻子",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, { layer: "brain", opacity: 0.55 }, "airway"],
        camera: [{ t: 0, at: "nose", zoom: 1.7 }, { t: 3.2, at: "nose", zoom: 1.7 }, { t: 4.6, at: [520, 480], zoom: 1.15 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🌸", path: [[60, 470], [180, 520], "nose"], from: 0.2, travel: 1.8, to: 3, spin: true, size: 44 },
          { kind: "highlight", at: "nose", from: 1.8 },
          { kind: "pulse", at: "nose", from: 2, color: "#ff5a5f", radius: 90 },
          { kind: "label", at: "nose", text: "鼻子里的报警线", side: "bottom", from: 2.3 },
          { kind: "flow", path: ["nose", [420, 470], "hypothalamus", "brainstem"], color: "#ffcf3f", from: 3.4, count: 7, speed: 260 },
          { kind: "label", at: "brain", text: "警报传到大脑", pos: [760, 170], from: 4.8 }
        ]
      },
      {
        turn: 1,
        title: "脑干替你按下按钮",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, { layer: "brain", opacity: 0.55 }, "airway"],
        camera: [{ t: 0, at: [520, 480], zoom: 1.15 }, { t: 1.5, at: "brainstem", zoom: 1.6 }],
        duration: 7,
        cues: [
          { kind: "highlight", at: "brainstem", from: 1, color: "#b48cff" },
          { kind: "label", at: "brainstem", text: "脑干", side: "right", from: 1.4, color: "#7a4fd6" },
          { kind: "sprite", icon: "🔴", path: [{ a: "brainstem", dx: -70, dy: -90 }], from: 2.6, size: 50 },
          { kind: "pulse", at: { a: "brainstem", dx: -70, dy: -90 }, from: 3, color: "#ff5a5f", radius: 80 },
          { kind: "text", at: [600, 140], text: "不用想，自动发生：反射", size: "m", from: 4 }
        ]
      },
      {
        turn: 2,
        title: "吸气、憋住、挤、阿嚏",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.4 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.18 }, "airway"],
        duration: 10,
        cues: [
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungLeft"], color: "#4fb6ff", from: 0.2, to: 2.6, count: 8, speed: 300 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungRight"], color: "#4fb6ff", from: 0.2, to: 2.6, count: 8, speed: 300 },
          { kind: "text", at: [600, 760], text: "① 深深吸一大口气", from: 0.3, to: 2.6 },
          { kind: "highlight", at: "trachea", from: 2.8, to: 5, color: "#ff9f43", pad: 10 },
          { kind: "label", at: "trachea", text: "② 喉咙口关上，憋住", side: "right", from: 2.8, to: 5 },
          { kind: "arrow", path: [[170, 420], [330, 400]], from: 5.2, to: 7.2, text: "③ 使劲挤" },
          { kind: "arrow", path: [[1030, 420], [870, 400]], from: 5.2, to: 7.2 },
          { kind: "arrow", path: [[600, 870], [600, 720]], from: 5.4, to: 7.2 },
          { kind: "flow", path: ["lungLeft", "bronchi", "trachea", [601, -40]], color: "#ff9f43", from: 7.4, count: 12, speed: 900, size: 12 },
          { kind: "flow", path: ["lungRight", "bronchi", "trachea", [601, -40]], color: "#ff9f43", from: 7.4, count: 12, speed: 900, size: 12 },
          { kind: "text", at: [820, 110], text: "④ 阿嚏！", size: "l", color: "#e5484d", from: 7.5 }
        ]
      },
      {
        turn: 3,
        title: "压紧的气更有劲",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "😮‍💨", path: [[200, 470]], from: 0.4, size: 120 },
          { kind: "flow", path: [[280, 470], [520, 470]], color: "#b9c4cf", from: 0.8, count: 4, speed: 90, size: 14 },
          { kind: "text", at: [330, 640], text: "直接吹：软绵绵", size: "s", color: "#7a6a55", from: 1.4 },
          { kind: "shape", shape: "circle", at: [780, 470], size: [210, 210], color: "#bfe3ff", text: "压得紧紧的", motion: "grow", from: 2.8, over: 2.4 },
          { kind: "flow", path: [[890, 470], [1180, 470]], color: "#ff9f43", from: 5.3, count: 12, speed: 800, size: 14 },
          { kind: "sprite", icon: "🌸", path: [[900, 470], [1160, 420]], from: 5.3, travel: 0.7, spin: true, size: 46 },
          { kind: "text", at: [900, 660], text: "憋住再放：砰！", size: "m", color: "#e5484d", from: 5.5 }
        ]
      },
      {
        turn: 4,
        title: "眼睛也跟着闭上",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.7 }, "eyes"],
        camera: [{ t: 0, at: "eye", zoom: 1.9 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "eye", from: 0.4, color: "#4fb6ff" },
          { kind: "label", at: "eye", text: "眼皮自动合上", side: "top", from: 0.8 },
          { kind: "myth", wrong: "打喷嚏不闭眼，眼珠会掉出来", right: "这是谣言，眼珠被牢牢固定着", from: 3 }
        ]
      },
      {
        turn: 5,
        title: "能不能忍住？",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.45 }, { layer: "brain", opacity: 0.45 }, "airway", "ears"],
        duration: 9,
        cues: [
          { kind: "label", at: "nose", text: "刚痒时：揉揉鼻子", side: "bottom", from: 0.3, to: 3.2 },
          { kind: "sprite", icon: "🤏", path: [{ a: "nose", dx: -110, dy: 0 }], from: 0.6, to: 3.2, wobble: true },
          { kind: "highlight", at: "brainstem", from: 3.4, to: 5.6, color: "#b48cff" },
          { kind: "label", at: "brainstem", text: "按钮按下就停不住", side: "right", from: 3.6, to: 5.6 },
          { kind: "arrow", path: ["nose", "nasopharynx", "ear"], color: "#e5484d", from: 5.8, text: "硬憋：猛劲冲向耳朵" },
          { kind: "sprite", icon: "⚠️", path: [{ a: "ear", dx: 60, dy: -60 }], from: 6.8, size: 52 }
        ]
      },
      {
        turn: 6,
        title: "用胳膊肘挡住",
        view: "blank",
        duration: 7,
        cues: [
          { kind: "sprite", icon: "🤧", path: [[300, 430]], from: 0.2, size: 150 },
          { kind: "sprite", icon: "💪", path: [[620, 430]], from: 0.8, size: 150 },
          { kind: "flow", path: [[380, 420], [560, 420]], icon: "🦠", from: 1.2, to: 4.8, count: 5, speed: 160, size: 14 },
          { kind: "text", at: [600, 650], text: "挡在胳膊肘内侧", from: 1.6 },
          { kind: "sprite", icon: "✋", path: [[960, 430]], from: 3, size: 130 },
          { kind: "text", at: [960, 580], text: "手干干净净", size: "s", color: "#2f7d32", from: 3.4 }
        ]
      }
    ]
  },
  {
    question: "runny-nose",
    scenes: [
      {
        turn: 0,
        title: "鼻子自己做鼻涕",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.4 }, "airway"],
        camera: [{ t: 0, at: "nose", zoom: 1.8 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "nose", from: 0.3, to: 3.4, color: "#ff8fa3" },
          { kind: "label", at: "nose", text: "黏膜：湿墙纸", side: "bottom", from: 0.8, to: 3.6 },
          { kind: "sprite", icon: "🏭", path: [{ a: "nose", dx: -30, dy: -50 }], from: 2, size: 40 },
          { kind: "label", at: { a: "nose", dx: -30, dy: -50 }, text: "小工厂", side: "top", from: 2.4 },
          { kind: "flow", path: [[276, 520], [250, 580], [205, 612]], color: "#9cc98a", from: 2.8, count: 3, speed: 40, size: 8 },
          { kind: "meter", at: [850, 800], label: "鼻涕有多少", start: 0, end: 0.12, color: "#9cc98a", from: 4, over: 1.5 },
          { kind: "text", at: [850, 700], text: "平时只有一点点", size: "s", from: 4.6 }
        ]
      },
      {
        turn: 1,
        title: "鼻涕是粘虫板",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 690], size: [1100, 140], color: "#f4a9a8", text: "黏膜", from: 0.2 },
          { kind: "shape", shape: "rect", at: [600, 590], size: [1100, 60], color: "#c9e7b3", text: "鼻涕", from: 0.6 },
          { kind: "flow", path: [[0, 250], [1200, 250]], color: "#4fb6ff", from: 1, to: 3.4, count: 8, speed: 260 },
          { kind: "sprite", icon: "🦠", path: [[60, 200], [420, 555]], from: 1.4, to: 5, travel: 1.4, size: 46 },
          { kind: "sprite", icon: "🌼", path: [[60, 300], [720, 555]], from: 2, to: 5, travel: 1.4, size: 46 },
          { kind: "text", at: [600, 140], text: "粘住了，进不了肺", from: 3, to: 5 },
          { kind: "arrow", path: [[150, 480], [1050, 480]], text: "纤毛往后扫", from: 5.2 },
          { kind: "sprite", icon: "🦠", path: [[420, 555], [1150, 555]], from: 5.2, travel: 3, size: 46 },
          { kind: "sprite", icon: "🌼", path: [[720, 555], [1150, 555]], from: 5.3, travel: 2.2, size: 46 },
          { kind: "flow", path: [[100, 575], [1150, 575]], color: "#9cc98a", from: 5.6, count: 6, speed: 120, size: 9 }
        ]
      },
      {
        turn: 2,
        title: "咽进胃里消灭",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "airway", opacity: 0.6 }, "esophagus", "stomach"],
        camera: [{ t: 0, at: [605, 200], zoom: 2 }, { t: 6, at: [605, 200], zoom: 2 }, { t: 7.2, at: [605, 220], zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "flow", path: ["nasopharynx", "throat", "esophagus", "stomach"], color: "#9cc98a", from: 0.3, count: 6, speed: 70, size: 6 },
          { kind: "label", at: "throat", text: "不知不觉咽下", side: "left", from: 0.9, to: 6 },
          { kind: "highlight", at: "stomach", from: 2.4, to: 6, color: "#ff9f43" },
          { kind: "label", at: "stomach", text: "胃酸消灭病菌", side: "right", from: 2.9 },
          { kind: "sprite", icon: "🦠", path: ["throat", "esophagus", "stomach"], from: 3.4, to: 5.4, travel: 1.8, size: 22 },
          { kind: "sprite", icon: "💥", path: ["stomach"], from: 5.2, to: 6.6, size: 30 },
          { kind: "text", at: [600, 820], text: "像慢慢转的传送带", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "感冒：鼻子加班",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.4 }, "airway", { layer: "arteries", opacity: 0.8, from: 2.2 }],
        camera: [{ t: 0, at: "nose", zoom: 1.8 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🦠", path: [[40, 560], [200, 600], { a: "nose", dx: 20, dy: 20 }], from: 0.3, to: 6.2, travel: 1.2, size: 40 },
          { kind: "pulse", at: "nose", from: 1.3, to: 3, color: "#ff5a5f", radius: 80 },
          { kind: "label", at: { a: "nose", dx: -40, dy: -40 }, text: "小血管变粗", side: "top", from: 2.4, to: 5 },
          { kind: "flow", path: [{ a: "nose", dx: -60, dy: -40 }, { a: "nose", dx: -60, dy: 40 }], icon: "💧", from: 3, count: 4, speed: 80, size: 7 },
          { kind: "sprite", icon: "🏭", path: [{ a: "nose", dx: 60, dy: -50 }], from: 3.8, size: 40, wobble: true },
          { kind: "meter", at: [850, 800], label: "鼻涕有多少", start: 0.12, end: 0.95, color: "#9cc98a", from: 4.4, over: 2.5 },
          { kind: "flow", path: ["nose", [220, 605], [175, 640], [160, 760]], color: "#9cc98a", from: 5.6, count: 8, speed: 120, size: 9 },
          { kind: "text", at: [850, 690], text: "用大水冲走病毒", size: "s", from: 6.4 }
        ]
      },
      {
        turn: 4,
        title: "鼻子为什么堵",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 320], size: [800, 60], color: "#f4a9a8", text: "黏膜", from: 0.3, to: 3.4 },
          { kind: "shape", shape: "rect", at: [600, 580], size: [800, 60], color: "#f4a9a8", from: 0.3, to: 3.4 },
          { kind: "flow", path: [[100, 450], [1100, 450]], color: "#4fb6ff", from: 0.8, to: 3.4, count: 12, speed: 320, size: 12 },
          { kind: "text", at: [600, 140], text: "平时：通道宽宽的", from: 1.2, to: 3.4 },
          { kind: "shape", shape: "rect", at: [600, 355], size: [800, 130], color: "#ef8a8a", text: "肿起来", from: 3.6 },
          { kind: "shape", shape: "rect", at: [600, 545], size: [800, 130], color: "#ef8a8a", from: 3.6 },
          { kind: "flow", path: [[100, 450], [1100, 450]], color: "#4fb6ff", from: 4.4, count: 2, speed: 60, size: 10 },
          { kind: "shape", shape: "circle", at: [700, 450], size: [70, 50], color: "#9cc98a", from: 4.2 },
          { kind: "text", at: [600, 140], text: "通道变窄，气难过", from: 4.8, to: 6.6 },
          { kind: "sprite", icon: "👄", path: [[600, 760]], from: 6.8, size: 90 },
          { kind: "text", at: [600, 140], text: "用嘴呼吸也没关系", color: "#2f7d32", from: 7 }
        ]
      },
      {
        turn: 5,
        title: "鼻涕为什么变绿",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 150], size: [900, 90], color: "#f6b3b5", text: "血管", from: 0.3, to: 5 },
          { kind: "flow", path: [[420, 190], [520, 330], [600, 430]], icon: "⚪", from: 0.8, to: 5, count: 5, speed: 150, size: 12 },
          { kind: "sprite", icon: "🦠", path: [[640, 480]], from: 1.2, to: 5, size: 60, wobble: true },
          { kind: "text", at: [600, 780], text: "白细胞赶来打仗", from: 2, to: 5 },
          { kind: "arrow", path: [[220, 300], [980, 300]], text: "卫兵越多", from: 5.2 },
          { kind: "shape", shape: "circle", at: [300, 450], size: [180, 180], color: "#eef6f0", text: "清", from: 5.4 },
          { kind: "shape", shape: "circle", at: [600, 450], size: [180, 180], color: "#f2dc6b", text: "黄", from: 5.9 },
          { kind: "shape", shape: "circle", at: [900, 450], size: [180, 180], color: "#9ccc65", text: "绿", from: 6.4 },
          { kind: "myth", wrong: "鼻涕变绿就是细菌感染", right: "常常是白细胞在努力打仗", from: 7.4 }
        ]
      }
    ]
  },
  {
    question: "hiccup",
    scenes: [
      {
        turn: 0,
        title: "一块大肌肉抽了",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.4 }, "diaphragm", "lungs", "airway", { layer: "stomach", opacity: 0.9 }],
        camera: [{ t: 0, at: [600, 450], zoom: 1.15 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "stomach", from: 0.3, to: 2.8, color: "#9aa5b1" },
          { kind: "label", at: "stomach", text: "不是肚子在说话", side: "right", from: 0.6, to: 2.8 },
          { kind: "sprite", icon: "❌", path: ["stomach"], from: 1.4, to: 2.8, size: 60 },
          { kind: "pulse", at: [420, 680], from: 3, to: 6.4, color: "#ff5a5f", radius: 90 },
          { kind: "pulse", at: [800, 700], from: 3, to: 6.4, color: "#ff5a5f", radius: 90 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungLeft"], color: "#4fb6ff", from: 3.6, to: 5.2, count: 6, speed: 700 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungRight"], color: "#4fb6ff", from: 3.6, to: 5.2, count: 6, speed: 700 },
          { kind: "text", at: [850, 150], text: "嗝！", size: "l", color: "#e5484d", from: 5 },
          { kind: "label", at: [420, 680], text: "膈肌", side: "left", color: "#c0392b", from: 6 }
        ]
      },
      {
        turn: 1,
        title: "膈肌：圆屋顶",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.4 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.25 }, "airway", { layer: "stomach", opacity: 0.5 }],
        camera: [{ t: 0, at: [600, 480], zoom: 1.1 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "diaphragm", from: 0.3, to: 3.6, color: "#ff9f43" },
          { kind: "label", at: [420, 690], text: "圆屋顶：膈肌", side: "left", color: "#c0392b", from: 0.8 },
          { kind: "label", at: "lungRight", text: "肺在上面", side: "left", from: 1.8, to: 3.6 },
          { kind: "label", at: "stomach", text: "肚子在下面", side: "right", from: 2.4, to: 3.6 },
          { kind: "arrow", path: [[430, 560], [430, 690]], text: "往下拉", from: 4, to: 5.6 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungLeft"], color: "#4fb6ff", from: 4, to: 5.6, count: 6, speed: 300 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungRight"], color: "#4fb6ff", from: 4, to: 5.6, count: 6, speed: 300 },
          { kind: "arrow", path: [[770, 700], [770, 570]], text: "放松", from: 5.8, to: 8 },
          { kind: "flow", path: ["lungLeft", "bronchi", "trachea", [601, -20]], color: "#9aa5b1", from: 5.8, to: 8, count: 6, speed: 260 },
          { kind: "flow", path: ["lungRight", "bronchi", "trachea", [601, -20]], color: "#9aa5b1", from: 5.8, to: 8, count: 6, speed: 260 },
          { kind: "text", at: [600, 120], text: "每口气都靠它", from: 8.2 }
        ]
      },
      {
        turn: 2,
        title: "胃胀了惹到神经",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.35 }, "diaphragm", { layer: "lungs", opacity: 0.7 }, { layer: "nerves", opacity: 0.8 }, "esophagus", "stomach"],
        camera: [{ t: 0, at: [600, 480], zoom: 1.15 }],
        duration: 10,
        cues: [
          { kind: "flow", path: [[560, 40], [540, 300], [440, 660]], color: "#ffcf3f", from: 0.3, to: 2.8, count: 5, speed: 200 },
          { kind: "label", at: [540, 300], text: "神经指挥膈肌", side: "left", from: 0.8, to: 2.8 },
          { kind: "sprite", icon: "🍔", path: [[611, -40], "esophagus", "stomach"], from: 2.8, to: 4.6, travel: 1.4, size: 56 },
          { kind: "highlight", at: "stomach", from: 3.8, color: "#ff5a5f" },
          { kind: "label", at: "stomach", text: "胃一下子胀起来", side: "right", from: 4.2, to: 7.2 },
          { kind: "text", at: [600, 830], text: "冰水、汽水、大笑也会", size: "s", from: 5, to: 7.2 },
          { kind: "pulse", at: { a: "stomach", dx: -120, dy: -60 }, from: 5.4, color: "#ff5a5f", radius: 70 },
          { kind: "flow", path: [[540, 300], [480, 520], [440, 660]], color: "#ffcf3f", from: 6.6, count: 6, speed: 450 },
          { kind: "sprite", icon: "⚡", path: [[430, 690]], from: 7.2, size: 60 },
          { kind: "label", at: [430, 690], text: "抽一下！", side: "left", color: "#e5484d", from: 7.4 }
        ]
      },
      {
        turn: 3,
        title: "声门啪地关上",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 }, "airway"],
        camera: [{ t: 0, at: [470, 650], zoom: 1.2 }, { t: 2.2, at: "larynx", zoom: 2.2 }],
        duration: 10,
        cues: [
          { kind: "flow", path: ["nose", "nasopharynx", [500, 700], "larynx", [520, 960]], color: "#4fb6ff", from: 0.2, to: 2.4, count: 10, speed: 500 },
          { kind: "text", at: [600, 120], text: "气猛地冲进来", from: 0.5, to: 2.4 },
          { kind: "shape", shape: "pill", at: { a: "larynx", dx: -38 }, size: [34, 18], color: "#ff9f43", from: 1.6, to: 2.6 },
          { kind: "shape", shape: "pill", at: { a: "larynx", dx: 38 }, size: [34, 18], color: "#ff9f43", from: 1.6, to: 2.6 },
          { kind: "shape", shape: "pill", at: "larynx", size: [110, 18], color: "#ff9f43", from: 2.6 },
          { kind: "label", at: "larynx", text: "声门啪地关上", side: "right", from: 2.9, to: 6.2 },
          { kind: "flow", path: ["nasopharynx", [500, 700], { a: "larynx", dy: -20 }], color: "#4fb6ff", from: 3.4, count: 8, speed: 300 },
          { kind: "pulse", at: "larynx", from: 4.2, to: 6.2, color: "#e5484d", radius: 60 },
          { kind: "text", at: [900, 250], text: "嗝！", size: "l", color: "#e5484d", from: 4.4 },
          { kind: "text", at: [600, 820], text: "说话也靠这扇小门", size: "s", from: 6.6 }
        ]
      },
      {
        turn: 4,
        title: "转个不停的圈",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.6 }, { layer: "nerves", opacity: 0.5 }, "diaphragm", "stomach"],
        camera: [{ t: 0, at: [605, 200], zoom: 1.8 }],
        duration: 10,
        cues: [
          { kind: "label", at: "stomach", text: "胃还胀着", side: "right", from: 0.3 },
          { kind: "pulse", at: "stomach", from: 0.6, to: 7, color: "#ff5a5f", radius: 40 },
          { kind: "flow", path: ["stomach", [660, 200], "brainstem", [545, 190], [560, 300], "stomach"], color: "#ffcf3f", from: 1.4, to: 7.2, count: 6, speed: 160, size: 7 },
          { kind: "label", at: "brainstem", text: "传到大脑", side: "right", from: 2.2, to: 7 },
          { kind: "pulse", at: { a: "diaphragm", dx: -40 }, from: 3, to: 7, color: "#ff9f43", radius: 45, rate: 0.8 },
          { kind: "text", at: [600, 820], text: "嗝…嗝…嗝…", color: "#e5484d", from: 3.6, to: 7 },
          { kind: "text", at: [600, 820], text: "刺激没了，圈子就停", color: "#2f7d32", from: 7.4 }
        ]
      },
      {
        turn: 5,
        title: "怎么让嗝停下",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 300], size: [300, 300], color: "#fff6e0", text: "打嗝圈", outline: true, from: 0.3 },
          { kind: "flow", path: [[600, 130], [720, 180], [770, 300], [720, 420], [600, 470], [480, 420], [430, 300], [480, 180], [600, 130]], color: "#ffcf3f", from: 0.6, to: 5, count: 6, speed: 200 },
          { kind: "sprite", icon: "😤", path: [[220, 560]], from: 1.6, to: 7, size: 100 },
          { kind: "meter", at: [220, 720], label: "二氧化碳", start: 0.3, end: 0.8, color: "#9aa5b1", from: 2.2, to: 7 },
          { kind: "sprite", icon: "🍵", path: [[980, 560]], from: 3.4, to: 7, size: 100 },
          { kind: "text", at: [980, 720], text: "忙着吞咽", size: "s", from: 3.8, to: 7 },
          { kind: "sprite", icon: "✂️", path: [[770, 300]], from: 5, to: 7, size: 80 },
          { kind: "myth", wrong: "吓一跳就能治好打嗝", right: "别吓人！没有一招人人灵", from: 7.2 },
          { kind: "text", at: [600, 560], text: "科学家还在研究", size: "s", from: 8 }
        ]
      }
    ]
  },
  {
    question: "yawn",
    scenes: [
      {
        turn: 0,
        title: "哈欠是什么样",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "skeleton", opacity: 0.3 }, "airway", "mouth"],
        camera: [{ t: 0, at: [400, 650], zoom: 1.5 }, { t: 6.4, at: [400, 650], zoom: 1.5 }, { t: 7.2, at: [600, 450], zoom: 1 }],
        duration: 10,
        cues: [
          { kind: "arrow", path: [[230, 780], [230, 880]], text: "嘴张大", from: 0.3, to: 6.4 },
          { kind: "flow", path: [[40, 730], [210, 735], "tongue", [470, 700], "larynx"], color: "#4fb6ff", from: 1, to: 4.6, count: 10, speed: 180 },
          { kind: "text", at: [600, 140], text: "深深吸一口长气", from: 1.2, to: 4.6 },
          { kind: "label", at: "face", text: "脸和下巴伸一伸", side: "top", from: 2.6, to: 6.4 },
          { kind: "flow", path: ["larynx", [470, 700], "tongue", [210, 735], [40, 730]], color: "#a9d6f5", from: 4.8, to: 6.6, count: 8, speed: 110 },
          { kind: "text", at: [600, 140], text: "再慢慢吐出来", from: 4.8, to: 6.6 },
          { kind: "sprite", icon: "🐶", path: [[1080, 300]], from: 7.2, size: 70 },
          { kind: "sprite", icon: "🐱", path: [[1080, 450]], from: 7.6, size: 70 },
          { kind: "sprite", icon: "🐟", path: [[1080, 600]], from: 8, size: 70 },
          { kind: "text", at: [1080, 720], text: "小动物也会", size: "s", from: 8.4 }
        ]
      },
      {
        turn: 1,
        title: "是缺氧了吗？",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "rect", at: [330, 320], size: [380, 260], color: "#e3f1fb", text: "氧气少", from: 0.3 },
          { kind: "flow", path: [[170, 390], [490, 390]], color: "#4fb6ff", from: 0.6, to: 4.4, count: 3, speed: 100 },
          { kind: "shape", shape: "rect", at: [870, 320], size: [380, 260], color: "#cfe8ff", text: "氧气多", from: 0.9 },
          { kind: "flow", path: [[710, 390], [1030, 390]], color: "#4fb6ff", from: 1.2, to: 4.4, count: 12, speed: 100 },
          { kind: "meter", at: [330, 560], label: "哈欠次数", start: 0, end: 0.5, color: "#b48cff", from: 2.4 },
          { kind: "meter", at: [870, 560], label: "哈欠次数", start: 0, end: 0.5, color: "#b48cff", from: 2.4 },
          { kind: "text", at: [600, 660], text: "一样多", color: "#2f7d32", from: 4.6, to: 6.2 },
          { kind: "myth", wrong: "缺氧了才打哈欠", right: "不太对，哈欠的用处还是个谜", from: 6.4 },
          { kind: "sprite", icon: "❓", path: [[600, 320]], from: 8.4, size: 80 }
        ]
      },
      {
        turn: 2,
        title: "给大脑降降温",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.85 }, { layer: "arteries", opacity: 0.7 }],
        camera: [{ t: 0, at: [580, 480], zoom: 1.2 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "brain", from: 0.3, to: 4.6, color: "#ff9f43" },
          { kind: "sprite", icon: "♨️", path: [{ a: "brain", dy: -60 }], from: 0.8, to: 4.6, size: 70 },
          { kind: "label", at: "brain", text: "干活会发热", side: "right", from: 1.2, to: 4.6 },
          { kind: "flow", path: [[60, 740], [300, 735], "tongue", [480, 690]], color: "#4fb6ff", from: 2.4, to: 6, count: 6, speed: 260 },
          { kind: "flow", path: [[540, 900], [560, 700], [590, 520], "brain"], icon: "❄️", from: 3, count: 6, speed: 160, size: 9 },
          { kind: "meter", at: [900, 800], label: "大脑温度", start: 0.8, end: 0.5, color: "#ff9f43", from: 3.6, over: 2.4 },
          { kind: "sprite", icon: "🌡️", path: [[1000, 220]], from: 6.2, size: 80 },
          { kind: "text", at: [600, 120], text: "太热太冷，哈欠反而少", size: "s", from: 6.6 }
        ]
      },
      {
        turn: 3,
        title: "大脑的换挡键",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "pill", at: [260, 330], size: [280, 110], color: "#c9c3f0", text: "快睡着", from: 0.3 },
          { kind: "shape", shape: "pill", at: [940, 330], size: [280, 110], color: "#ffe39a", text: "醒过来", from: 0.6 },
          { kind: "sprite", icon: "⚙️", path: [[600, 330]], from: 1, to: 5.4, size: 110, spin: true },
          { kind: "arrow", path: [[420, 450], [780, 450]], text: "换挡键", from: 1.6, to: 5.4 },
          { kind: "arrow", path: [[780, 210], [420, 210]], from: 2.4, to: 5.4 },
          { kind: "sprite", icon: "🌅", path: [[260, 620]], from: 5.6, size: 80 },
          { kind: "sprite", icon: "🌙", path: [[600, 620]], from: 6, size: 80 },
          { kind: "sprite", icon: "📚", path: [[940, 620]], from: 6.4, size: 80 },
          { kind: "text", at: [600, 790], text: "这时哈欠最多", from: 6.8 }
        ]
      },
      {
        turn: 4,
        title: "大脑悄悄学样",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🥱", path: [[250, 360]], from: 0.3, to: 4.4, size: 150 },
          { kind: "text", at: [250, 500], text: "爸爸", size: "s", from: 0.5, to: 4.4 },
          { kind: "flow", path: [[350, 330], [840, 250]], color: "#b48cff", from: 1, to: 4.4, count: 5, speed: 200 },
          { kind: "sprite", icon: "🧠", path: [[920, 230]], from: 1.4, to: 4.4, size: 80 },
          { kind: "text", at: [920, 120], text: "悄悄模仿", size: "s", color: "#7a4fd6", from: 1.8, to: 4.4 },
          { kind: "sprite", icon: "🥱", path: [[920, 420]], from: 2.8, to: 4.4, size: 150 },
          { kind: "sprite", icon: "👨‍👧", path: [[380, 380]], from: 4.6, size: 130 },
          { kind: "meter", at: [380, 560], label: "家人朋友", start: 0.1, end: 0.9, color: "#b48cff", from: 5 },
          { kind: "sprite", icon: "🧑", path: [[820, 380]], from: 5.4, size: 130 },
          { kind: "meter", at: [820, 560], label: "陌生人", start: 0.1, end: 0.35, color: "#b48cff", from: 5.8 },
          { kind: "text", at: [600, 780], text: "读到“哈欠”也想打？", from: 7.6 }
        ]
      },
      {
        turn: 5,
        title: "传染的是冲动",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "🦠", path: [[600, 330]], from: 0.3, to: 3.4, size: 100 },
          { kind: "myth", wrong: "哈欠靠病菌传染，像感冒", right: "传的只是想跟着做的冲动", from: 0.4, to: 3.6 },
          { kind: "sprite", icon: "❌", path: [[600, 330]], from: 1.3, to: 3.4, size: 140 },
          { kind: "arrow", path: [[200, 520], [1000, 520]], text: "慢慢长大", from: 3.8, to: 7.4 },
          { kind: "sprite", icon: "👶", path: [[200, 400]], from: 4, to: 7.4, size: 90 },
          { kind: "text", at: [200, 640], text: "几乎不会", size: "s", from: 4.4, to: 7.4 },
          { kind: "sprite", icon: "🧒", path: [[1000, 400]], from: 5, to: 7.4, size: 90 },
          { kind: "text", at: [960, 640], text: "四五岁后越来越明显", size: "s", from: 5.4, to: 7.4 },
          { kind: "sprite", icon: "💞", path: [[1000, 280]], from: 6, to: 7.4, size: 60 },
          { kind: "sprite", icon: "🐒", path: [[420, 400]], from: 7.6, size: 120 },
          { kind: "sprite", icon: "🐶", path: [[780, 400]], from: 8, size: 120 },
          { kind: "text", at: [600, 600], text: "黑猩猩和狗也会", from: 8.4 }
        ]
      }
    ]
  },
  {
    question: "panting",
    scenes: [
      {
        turn: 0,
        title: "腿上的肌肉在烧",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "muscles", opacity: 0.8 }, { layer: "lungs", opacity: 0.7 }],
        camera: [{ t: 0, at: [600, 300], zoom: 1.2 }, { t: 1.8, at: [600, 300], zoom: 1.2 }, { t: 3, at: [560, 560], zoom: 2 }],
        duration: 10,
        cues: [
          { kind: "label", at: "lungs", text: "肺够用", side: "left", color: "#2f7d32", from: 0.3, to: 2.6 },
          { kind: "sprite", icon: "✅", path: [{ a: "lungs", dx: 110, dy: -20 }], from: 0.8, to: 2.6, size: 50 },
          { kind: "highlight", at: "quads", from: 3, to: 6, color: "#ff9f43" },
          { kind: "label", at: "quads", text: "腿上的肌肉在干活", side: "left", from: 3.4, to: 6 },
          { kind: "sprite", icon: "🍎", path: [[700, 420], { a: "quads", dx: 10 }], from: 4, to: 6.4, travel: 1, size: 34 },
          { kind: "sprite", icon: "🔥", path: ["quads"], from: 5, size: 40, wobble: true },
          { kind: "flow", path: [[760, 420], [600, 470], "quads"], color: "#4fb6ff", from: 5.6, count: 6, speed: 120, size: 6 },
          { kind: "text", at: { a: "quads", dx: 170, dy: -110 }, text: "氧气", size: "s", color: "#4fb6ff", from: 5.8 },
          { kind: "flow", path: ["quads", [650, 640], [780, 700]], color: "#9aa5b1", from: 6.4, count: 6, speed: 120, size: 6 },
          { kind: "text", at: { a: "quads", dx: 190, dy: 120 }, text: "二氧化碳", size: "s", color: "#7d8793", from: 6.6 },
          { kind: "text", at: [600, 800], text: "跑得越快，要得越多", from: 7.4 }
        ]
      },
      {
        turn: 1,
        title: "血是送货小火车",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "lungs", opacity: 0.8 }, { layer: "heart", motion: "beat", rate: 1.8 }, { layer: "arteries", opacity: 0.5 }],
        camera: [{ t: 0, at: [590, 360], zoom: 1.3 }],
        duration: 11,
        cues: [
          { kind: "flow", path: [[600, -10], "nose", "trachea", "lungs"], color: "#4fb6ff", from: 0.3, to: 3, count: 6, speed: 160 },
          { kind: "label", at: "lungs", text: "氧气钻进血里", side: "right", from: 1, to: 3.6 },
          { kind: "flow", path: ["lungs", "heart", [606, 300], [585, 420], "femoralArtery", "quads"], color: "#e5484d", from: 1.8, count: 8, speed: 200, size: 7 },
          { kind: "label", at: "heart", text: "心脏泵血", side: "left", from: 2.4, to: 4.6 },
          { kind: "sprite", icon: "🚃", path: ["heart", [585, 420], "femoralArtery", "quads"], from: 3.6, to: 6.4, travel: 2.2, size: 40 },
          { kind: "pulse", at: "quads", from: 5.8, to: 9, color: "#ff9f43", radius: 40 },
          { kind: "label", at: "quads", text: "卸氧气 装废气", side: "left", from: 6 },
          { kind: "flow", path: ["quads", "femoralArtery", [600, 420], "venaCava", "heart", "lungs"], color: "#5a86dc", from: 6.6, count: 8, speed: 200, size: 7 },
          { kind: "flow", path: ["lungs", "trachea", "nose", [600, -10]], color: "#9aa5b1", from: 7.6, count: 6, speed: 160 },
          { kind: "text", at: { a: "nose", dx: 140 }, text: "呼气吐出去", size: "s", color: "#7d8793", from: 8 }
        ]
      },
      {
        turn: 2,
        title: "氧气穿过薄墙",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [430, 400], size: [380, 380], color: "#d6ecff", text: "肺泡", from: 0.3 },
          { kind: "shape", shape: "pill", at: [680, 400], size: [110, 520], color: "#f6b3b5", text: "血管", from: 0.9 },
          { kind: "arrow", path: [[860, 150], [650, 300]], text: "薄薄一层墙", from: 1.8, to: 6 },
          { kind: "flow", path: [[400, 400], [680, 400], [680, 700]], color: "#4fb6ff", from: 2.8, count: 8, speed: 160 },
          { kind: "text", at: [430, 650], text: "氧气多", size: "s", color: "#4fb6ff", from: 3.6, to: 6 },
          { kind: "text", at: [880, 650], text: "氧气少", size: "s", color: "#7d8793", from: 4, to: 6 },
          { kind: "text", at: [930, 180], text: "几亿个肺泡", from: 6.2 },
          { kind: "text", at: [600, 800], text: "摊开≈羽毛球场", from: 7.2 },
          { kind: "sprite", icon: "🏸", path: [[1000, 420]], from: 7.4, size: 90 }
        ]
      },
      {
        turn: 3,
        title: "吸得深、吸得快",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 380], size: [300, 300], color: "#d6ecff", text: "肺泡", from: 0.3, to: 3.6 },
          { kind: "flow", path: [[150, 380], [560, 380]], color: "#4fb6ff", from: 0.8, to: 3.6, count: 6, speed: 200 },
          { kind: "flow", path: [[640, 420], [1050, 420]], color: "#9aa5b1", from: 1.2, to: 3.6, count: 6, speed: 200 },
          { kind: "text", at: [600, 140], text: "空气要不停换新", from: 1.8, to: 3.6 },
          { kind: "sprite", icon: "🧍", path: [[300, 320]], from: 3.8, size: 120 },
          { kind: "flow", path: [[150, 520], [450, 520]], color: "#4fb6ff", from: 4.2, to: 7, count: 3, speed: 80, size: 10 },
          { kind: "meter", at: [300, 700], label: "坐着：轻轻吸", start: 0, end: 0.2, from: 4.6 },
          { kind: "sprite", icon: "🏃", path: [[900, 320]], from: 5.4, size: 120 },
          { kind: "flow", path: [[750, 520], [1050, 520]], color: "#4fb6ff", from: 5.8, count: 12, speed: 320, size: 16 },
          { kind: "meter", at: [900, 700], label: "跑步：又深又快", start: 0, end: 0.85, from: 6.2 },
          { kind: "text", at: [600, 140], text: "换的气多好几倍", from: 7.2 }
        ]
      },
      {
        turn: 4,
        title: "膈肌拉着肺",
        view: "chest",
        layers: [{ layer: "skeleton", opacity: 0.4 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.5 }, "airway"],
        camera: [{ t: 0, at: [600, 450], zoom: 1.1 }],
        duration: 10,
        cues: [
          { kind: "label", at: "lungs", text: "肺自己不会动", side: "top", from: 0.3, to: 2.6 },
          { kind: "highlight", at: "diaphragm", from: 1.6, to: 4, color: "#ff9f43" },
          { kind: "label", at: [420, 690], text: "膈肌", side: "left", color: "#c0392b", from: 2 },
          { kind: "arrow", path: [[430, 560], [430, 690]], text: "往下拉", from: 2.8, to: 5 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungLeft"], color: "#4fb6ff", from: 2.8, to: 5, count: 6, speed: 400 },
          { kind: "flow", path: [[601, -20], "trachea", "bronchi", "lungRight"], color: "#4fb6ff", from: 2.8, to: 5, count: 6, speed: 400 },
          { kind: "arrow", path: [[770, 700], [770, 570]], text: "放松", from: 5.2, to: 7 },
          { kind: "flow", path: ["lungLeft", "bronchi", "trachea", [601, -20]], color: "#9aa5b1", from: 5.2, to: 7, count: 6, speed: 400 },
          { kind: "flow", path: ["lungRight", "bronchi", "trachea", [601, -20]], color: "#9aa5b1", from: 5.2, to: 7, count: 6, speed: 400 },
          { kind: "label", at: { a: "ribs", dx: -270, dy: -120 }, text: "肋骨间小肌肉", side: "left", from: 7.2 },
          { kind: "text", at: [600, 830], text: "一起加班：又快又深", from: 7.8 }
        ]
      },
      {
        turn: 5,
        title: "呼吸指挥部",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.4 }, { layer: "brain", opacity: 0.6 }, { layer: "arteries", opacity: 0.5 }],
        camera: [{ t: 0, at: "brainstem", zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "brainstem", from: 0.3, color: "#b48cff" },
          { kind: "label", at: "brainstem", text: "呼吸指挥部", side: "right", color: "#7a4fd6", from: 0.7, to: 4.2 },
          { kind: "flow", path: [[600, 960], [610, 750], "brainstem"], color: "#9aa5b1", from: 1.6, to: 6.4, count: 6, speed: 150 },
          { kind: "meter", at: [900, 800], label: "二氧化碳", start: 0.3, end: 0.85, color: "#9aa5b1", from: 2.4, to: 6.4 },
          { kind: "pulse", at: "brainstem", from: 4.2, to: 6.4, color: "#ffcf3f", radius: 70 },
          { kind: "flow", path: ["brainstem", [600, 750], [580, 960]], color: "#ffcf3f", from: 4.6, count: 6, speed: 400 },
          { kind: "text", at: [600, 140], text: "吸快点、吸深点！", from: 5, to: 6.6 },
          { kind: "sprite", icon: "🏃", path: [{ a: "brainstem", dx: -250, dy: 150 }], from: 6.8, size: 70 },
          { kind: "text", at: [600, 140], text: "一起跑就提前加快", from: 7 },
          { kind: "meter", at: [900, 800], label: "二氧化碳", start: 0.25, end: 0.25, color: "#9aa5b1", from: 7 }
        ]
      },
      {
        turn: 6,
        title: "停下还要还账",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🏃", path: [[250, 300]], from: 0.3, to: 4.2, size: 110 },
          { kind: "shape", shape: "pill", at: [700, 560], size: [360, 150], color: "#f19a8a", text: "肌肉", from: 0.6 },
          { kind: "flow", path: [[60, 560], [520, 560]], color: "#4fb6ff", from: 0.9, to: 4.2, count: 3, speed: 120 },
          { kind: "text", at: [600, 130], text: "氧气一时送不够", from: 1.4, to: 3 },
          { kind: "sprite", icon: "⚡", path: [[700, 420]], from: 2, to: 4.2, size: 70 },
          { kind: "meter", at: [900, 800], label: "要还的账", start: 0, end: 0.75, color: "#ff9f43", from: 2.6, to: 4.4, over: 1.5 },
          { kind: "text", at: [600, 130], text: "先用应急办法", from: 3.2, to: 4.2 },
          { kind: "meter", at: [900, 800], label: "要还的账", start: 0.75, end: 0.1, color: "#ff9f43", from: 4.4, over: 4.5 },
          { kind: "sprite", icon: "😮‍💨", path: [[250, 300]], from: 4.4, size: 110 },
          { kind: "flow", path: [[60, 560], [520, 560]], color: "#4fb6ff", from: 4.6, count: 12, speed: 300, size: 14 },
          { kind: "text", at: [600, 130], text: "停下了，多吸氧气还账", from: 5, to: 7.6 },
          { kind: "text", at: [600, 130], text: "喘气慢慢平下来", color: "#2f7d32", from: 7.8 }
        ]
      }
    ]
  },
  {
    question: "choke-cough",
    scenes: [
      {
        turn: 0,
        title: "喉咙底下分岔路",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, "airway", "esophagus"],
        camera: [{ t: 0, at: [470, 740], zoom: 1.5 }],
        duration: 8.5,
        cues: [
          { kind: "highlight", at: "larynx", color: "#4fb6ff", from: 0.4 },
          { kind: "label", at: "larynx", text: "前：气管走空气", side: "left", color: "#2b7bbf", from: 1 },
          { kind: "label", at: [535, 860], text: "后：食管走食物", side: "right", color: "#c97a2b", from: 2.4 },
          { kind: "text", at: [600, 130], text: "喝汤一笑，水走错路", color: "#ff5a5f", from: 4.6 }
        ]
      },
      {
        turn: 1,
        title: "会厌小翻板守门",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.3 }, "mouth", "airway", "esophagus"],
        camera: [{ t: 0, at: "epiglottis", zoom: 2.1 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "epiglottis", color: "#ff9f43", from: 0.4 },
          { kind: "label", at: "epiglottis", text: "会厌：自动守门员", side: "right", from: 0.9 },
          { kind: "flow", path: [[360, 720], "epiglottis", [530, 880]], color: "#4fb6ff", count: 6, speed: 180, from: 2.4 },
          { kind: "text", at: [600, 810], text: "吞咽时啪地盖住气管口", color: "#2f7d32", from: 4.4 }
        ]
      },
      {
        turn: 2,
        title: "边笑边吞漏了缝",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "pill", at: [320, 280], size: [280, 96], color: "#ffe08a", text: "吞汤：快盖上", from: 0.4 },
          { kind: "shape", shape: "pill", at: [880, 280], size: [280, 96], color: "#bfe3ff", text: "大笑：快打开", from: 1.2 },
          { kind: "shape", shape: "rect", at: [600, 500], size: [220, 36], color: "#ff9f43", text: "会厌", motion: "wiggle", from: 2.2 },
          { kind: "sprite", icon: "💧", path: [[600, 360], [600, 660]], travel: 1.4, size: 64, from: 3.2 },
          { kind: "text", at: [600, 790], text: "来不及盖严，水溜进气管", color: "#ff5a5f", from: 4.8 }
        ]
      },
      {
        turn: 3,
        title: "警报触发咳嗽反射",
        view: "chest",
        layers: [{ layer: "skin", opacity: 0.3 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.45 }, "airway"],
        duration: 8.5,
        cues: [
          { kind: "pulse", at: "trachea", color: "#ff5a5f", radius: 65, from: 0.4 },
          { kind: "label", at: "trachea", text: "气管报警神经", side: "right", color: "#ff5a5f", from: 1 },
          { kind: "flow", path: ["trachea", [600, 20]], color: "#ffcf3f", count: 5, speed: 240, from: 2, to: 5 },
          { kind: "highlight", at: "lungs", color: "#4fb6ff", from: 3.6 },
          { kind: "text", at: [600, 810], text: "先深吸气，关紧喉门憋足劲", color: "#7a4fd6", from: 4.8 }
        ]
      },
      {
        turn: 4,
        title: "狂风把水轰出去",
        view: "chest",
        layers: [{ layer: "skin", opacity: 0.3 }, "diaphragm", "lungs", "airway"],
        duration: 8,
        cues: [
          { kind: "arrow", path: [[600, 700], [600, 530]], color: "#ff9f43", text: "肌肉猛挤", from: 0.4, to: 4 },
          { kind: "flow", path: ["bronchi", "trachea", [600, 20]], color: "#4fb6ff", count: 12, speed: 480, size: 13, from: 1.4 },
          { kind: "sprite", icon: "💦", path: ["trachea", [600, 30]], travel: 0.9, size: 58, from: 2.2 },
          { kind: "text", at: [600, 810], text: "像一阵狂风把水吹出去！", color: "#2f7d32", from: 4 }
        ]
      },
      {
        turn: 5,
        title: "真卡住千万别喂水",
        view: "blank",
        duration: 9.5,
        cues: [
          { kind: "shape", shape: "rect", at: [320, 360], size: [400, 240], color: "#e8f5e9", from: 0.3, to: 5.2 },
          { kind: "text", at: [320, 360], text: "能大声咳：让它自己咳出", size: "s", color: "#2f7d32", from: 0.8, to: 5.2 },
          { kind: "shape", shape: "rect", at: [880, 360], size: [400, 240], color: "#ffd6d6", from: 2, to: 5.2 },
          { kind: "text", at: [880, 360], text: "咳不出声：立刻推腹急救", size: "s", color: "#e5484d", from: 2.5, to: 5.2 },
          { kind: "myth", wrong: "卡住喉咙快喂水顺下去", right: "真窒息不能喂水，要立刻急救", from: 5.4 }
        ]
      }
    ]
  },
  {
    question: "winter-breath",
    scenes: [
      {
        turn: 0,
        title: "不是白烟是小云朵",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[280, 460]], size: 150, from: 0.3 },
          { kind: "flow", path: [[370, 440], [680, 420]], color: "#bfe3ff", count: 8, speed: 160, size: 14, from: 0.9 },
          { kind: "sprite", icon: "☁️", path: [[780, 410]], size: 150, from: 1.8 },
          { kind: "text", at: [600, 770], text: "不是着火冒烟，是迷你小云朵！", color: "#2b7bbf", from: 3.8 }
        ]
      },
      {
        turn: 1,
        title: "呼吸道加温到37度",
        view: "chest",
        layers: [{ layer: "skin", opacity: 0.3 }, "diaphragm", { layer: "lungs", motion: "breathe", rate: 0.4 }, "airway"],
        duration: 8.5,
        cues: [
          { kind: "flow", path: [[600, 20], "trachea", "bronchi", "lungs"], color: "#4fb6ff", count: 7, speed: 200, from: 0.4, to: 4.4 },
          { kind: "highlight", at: "lungs", color: "#ff9f43", from: 2 },
          { kind: "count", at: [950, 220], label: "肺里暖到近", start: 10, end: 37, unit: "℃", over: 2, from: 2.4 },
          { kind: "text", at: [600, 810], text: "吸饱满满的隐身水蒸气", color: "#2b7bbf", from: 4.8 }
        ]
      },
      {
        turn: 2,
        title: "撞上冷空气抱成水滴",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [320, 420], size: [400, 280], color: "#fff3df", text: "☀️ 夏天暖", from: 0.3 },
          { kind: "text", at: [320, 610], text: "水蒸气继续隐身", size: "s", color: "#7a6a55", from: 1 },
          { kind: "shape", shape: "rect", at: [880, 420], size: [400, 280], color: "#e3f1fb", outline: true, text: "❄️ 冬天冷", from: 2.2 },
          { kind: "flow", path: [[730, 490], [1030, 490]], color: "#4fb6ff", count: 12, speed: 90, size: 9, from: 3 },
          { kind: "text", at: [880, 610], text: "抱团凝成小水滴！", size: "s", color: "#2b7bbf", from: 3.8 },
          { kind: "text", at: [600, 790], text: "冷空气肚量小，藏不住水蒸气", color: "#2b7bbf", from: 5 }
        ]
      },
      {
        turn: 3,
        title: "哈在冷镜片上看水珠",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "👓", path: [[600, 380]], size: 170, from: 0.4 },
          { kind: "flow", path: [[250, 380], [500, 380]], color: "#ff9f43", count: 6, speed: 180, from: 1.2, to: 4.4 },
          { kind: "sprite", icon: "💧", path: [[540, 380]], size: 46, from: 2.4 },
          { kind: "sprite", icon: "💧", path: [[660, 380]], size: 46, from: 2.8 },
          { kind: "text", at: [600, 740], text: "一摸全是真真实实的小水珠！", color: "#2f7d32", from: 4.2 }
        ]
      },
      {
        turn: 4,
        title: "冬天尽量用鼻子吸气",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, "airway"],
        camera: [{ t: 0, at: "nose", zoom: 1.75 }],
        duration: 8,
        cues: [
          { kind: "flow", path: [[150, 550], "nose", "nasopharynx", "throat"], color: "#4fb6ff", count: 7, speed: 180, from: 0.4 },
          { kind: "highlight", at: "nose", color: "#2f7d32", from: 1.2 },
          { kind: "label", at: "nose", text: "随身暖风加湿器", side: "top", color: "#2f7d32", from: 1.8 },
          { kind: "text", at: [600, 810], text: "暖好滤净再进肺，不呛嗓子", color: "#2f7d32", from: 4.2 }
        ]
      }
    ]
  },
  {
    question: "hold-breath",
    scenes: [
      {
        turn: 0,
        title: "脑干强行收回控制权",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "brain", opacity: 0.8 }, "airway"],
        camera: [{ t: 0, at: "brainstem", zoom: 1.55 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "brainstem", color: "#ff5a5f", from: 0.4 },
          { kind: "label", at: "brainstem", text: "脑干：呼吸指挥部", side: "right", color: "#e5484d", from: 1 },
          { kind: "pulse", at: "brainstem", color: "#ffcf3f", radius: 75, from: 2.6 },
          { kind: "text", at: [600, 810], text: "一到安全线就逼你张嘴吸气！", color: "#e5484d", from: 4.2 }
        ]
      },
      {
        turn: 1,
        title: "头号警报是二氧化碳",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "meter", at: [340, 320], label: "氧气略减", start: 0.9, end: 0.7, color: "#4fb6ff", over: 3, from: 0.4 },
          { kind: "meter", at: [860, 320], label: "二氧化碳猛涨", start: 0.2, end: 0.95, color: "#e5484d", over: 3, from: 0.8 },
          { kind: "pulse", at: [860, 320], color: "#ff5a5f", radius: 95, from: 3.2 },
          { kind: "sprite", icon: "🚨", path: [[600, 540]], size: 96, wobble: true, from: 3.8 },
          { kind: "text", at: [600, 760], text: "二氧化碳让血微酸，拉响警报！", color: "#e5484d", from: 4.6 }
        ]
      },
      {
        turn: 2,
        title: "下水前绝不猛喘憋气",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🏊", path: [[600, 290]], size: 120, from: 0.4, to: 4.8 },
          { kind: "text", at: [600, 450], text: "猛喘排空废气会关掉警报器！", size: "s", color: "#e5484d", from: 1.2, to: 4.8 },
          { kind: "myth", wrong: "潜水前猛喘十几口能安全憋更久", right: "警报失灵会在水下缺氧昏迷，极危险", from: 5 }
        ]
      },
      {
        turn: 3,
        title: "肺是死胡同吸不动水",
        view: "chest",
        layers: [{ layer: "skin", opacity: 0.3 }, "lungs", "airway"],
        duration: 8.5,
        cues: [
          { kind: "highlight", at: "lungs", color: "#4fb6ff", from: 0.4 },
          { kind: "label", at: "lungRight", text: "肺泡是死胡同小囊", side: "left", from: 1 },
          { kind: "sprite", icon: "🐟", path: [[930, 320]], size: 92, from: 2.4 },
          { kind: "label", at: [930, 320], text: "鱼鳃单向顺水流", side: "bottom", color: "#2b7bbf", from: 3 },
          { kind: "text", at: [600, 810], text: "水里氧太少，肺也排不动重水", color: "#7a6a55", from: 4.6 }
        ]
      },
      {
        turn: 4,
        title: "鲸鱼全身背着储氧瓶",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🐋", path: [[380, 380]], size: 155, from: 0.4 },
          { kind: "shape", shape: "pill", at: [820, 320], size: [340, 90], color: "#ffd6d6", text: "超高储氧蛋白", from: 1.2 },
          { kind: "shape", shape: "pill", at: [820, 460], size: [340, 90], color: "#bfe3ff", text: "下潜心跳变慢", from: 2.2 },
          { kind: "text", at: [600, 760], text: "泳池绝不比憋气久，安全第一", color: "#2f7d32", from: 4.4 }
        ]
      }
    ]
  }
];
