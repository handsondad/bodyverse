import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "dizzy-spin",
    scenes: [
      {
        turn: 0,
        title: "耳朵里的小器官搞错了",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.4 }, { layer: "brain", opacity: 0.45 }, "eyes", "ears"],
        camera: [{ t: 0, at: [470, 480], zoom: 1.5 }, { t: 2.8, at: [470, 480], zoom: 1.5 }, { t: 4, at: "ear", zoom: 2.2 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "eye", from: 0.3, to: 2.8, color: "#2f7d32" },
          { kind: "label", at: "eye", text: "眼睛没坏", side: "top", from: 0.7, to: 2.8, color: "#2f7d32" },
          { kind: "highlight", at: "vestibule", from: 3.8, color: "#ff5a5f", pad: 14 },
          { kind: "label", at: "vestibule", text: "管平衡的小器官", side: "top", from: 4.2 },
          { kind: "flow", path: ["vestibule", "brainstem", [640, 380]], color: "#ffcf3f", from: 5.2, count: 6, speed: 160 },
          { kind: "text", at: [600, 110], text: "还在转呢！", color: "#e5484d", from: 6.2 },
          { kind: "sprite", icon: "🏠", path: [[780, 420]], from: 7, size: 50, spin: true }
        ]
      },
      {
        turn: 1,
        title: "三个弯弯的小管子",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "👂", path: [[130, 470]], from: 0.3, to: 2.4, size: 100 },
          { kind: "arrow", path: [[200, 470], [320, 470]], from: 0.7, to: 2.4, text: "放大看" },
          { kind: "shape", shape: "circle", at: [650, 470], size: [620, 600], color: "#efe2c6", from: 1, to: 6.4 },
          { kind: "label", at: [420, 260], text: "藏在骨头里", pos: [250, 160], from: 1.4, to: 3.8 },
          { kind: "flow", path: [[810, 570], [789, 598], [730, 618], [650, 625], [570, 618], [511, 598], [490, 570], [511, 543], [570, 522], [650, 515], [730, 522], [789, 543], [810, 570]], color: "#4fb6ff", from: 2.2, count: 16, speed: 90, size: 9 },
          { kind: "flow", path: [[625, 400], [616, 475], [593, 530], [560, 550], [528, 530], [504, 475], [495, 400], [504, 325], [528, 270], [560, 250], [593, 270], [616, 325], [625, 400]], color: "#4fb6ff", from: 2.7, count: 14, speed: 90, size: 9 },
          { kind: "flow", path: [[880, 410], [864, 470], [820, 514], [760, 530], [700, 514], [656, 470], [640, 410], [656, 350], [700, 306], [760, 290], [820, 306], [864, 350], [880, 410]], color: "#4fb6ff", from: 3.2, count: 14, speed: 90, size: 9 },
          { kind: "label", at: [760, 290], text: "三个半规管", pos: [980, 180], from: 3.8, to: 5.2 },
          { kind: "sprite", icon: "🌾", path: [[490, 570]], from: 5, size: 54, wobble: true },
          { kind: "label", at: [490, 570], text: "一小撮细毛毛", pos: [300, 700], from: 5.4, to: 6.6 },
          { kind: "flow", path: [[490, 570], [300, 700], [200, 760]], color: "#ffcf3f", from: 6.8, count: 6, speed: 180 },
          { kind: "text", at: [170, 820], text: "🧠 收到", size: "s", from: 7.4 }
        ]
      },
      {
        turn: 2,
        title: "液体慢半拍",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [640, 470], size: [460, 460], color: "#bfe3ff", from: 0.3 },
          { kind: "shape", shape: "circle", at: [640, 470], size: [340, 340], color: "#fffaf0", from: 0.3 },
          { kind: "sprite", icon: "🧒", path: [[640, 470]], from: 0.6, size: 120, spin: true },
          { kind: "sprite", icon: "🌾", path: [[640, 670]], from: 0.9, size: 54, wobble: true },
          { kind: "arrow", path: [[406, 335], [505, 236], [640, 200], [775, 236], [874, 335]], color: "#ff9f43", text: "管子跟着转", from: 1.6, to: 4.4, draw: 1.2 },
          { kind: "arrow", path: [[452, 538], [487, 599], [540, 643], [605, 667]], color: "#4fb6ff", text: "液体慢半拍", from: 3.2, to: 5.8 },
          { kind: "flow", path: [[640, 670], [900, 760], [980, 790]], color: "#ffcf3f", from: 5, count: 6, speed: 160 },
          { kind: "text", at: [1010, 840], text: "🧠 在转！", size: "s", color: "#e5484d", from: 6.2, to: 7.6 },
          { kind: "text", at: [940, 840], text: "🧠 在转，还知道方向", size: "s", color: "#e5484d", from: 7.6 }
        ]
      },
      {
        turn: 3,
        title: "惯性：一碗水",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 110], text: "惯性", size: "l", from: 0.3 },
          { kind: "sprite", icon: "🧍", path: [[380, 470]], from: 0.8, size: 150 },
          { kind: "sprite", icon: "🥣", path: [[500, 500]], from: 1.2, to: 3.2, size: 70 },
          { kind: "arrow", path: [[480, 330], [380, 295], [280, 330]], color: "#ff9f43", text: "猛一转身", from: 2.2, to: 4.4 },
          { kind: "sprite", icon: "🥣", path: [[500, 500], [300, 540]], from: 3.2, travel: 0.4, size: 70 },
          { kind: "sprite", icon: "💦", path: [[550, 470]], from: 3.4, to: 6.4, size: 70 },
          { kind: "flow", path: [[550, 480], [610, 620], [650, 700]], color: "#4fb6ff", from: 3.6, to: 6.4, count: 5, speed: 160 },
          { kind: "text", at: [820, 560], text: "水没跟上，洒了", size: "s", from: 4.4 },
          { kind: "text", at: [600, 790], text: "半规管里的液体也这样", color: "#2f7d32", from: 6.6 }
        ]
      },
      {
        turn: 4,
        title: "停下了液体还在冲",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [420, 450], size: [420, 420], color: "#bfe3ff", from: 0.3 },
          { kind: "shape", shape: "circle", at: [420, 450], size: [300, 300], color: "#fffaf0", from: 0.3 },
          { kind: "sprite", icon: "🧍", path: [[420, 450]], from: 0.5, to: 7.4, size: 110 },
          { kind: "sprite", icon: "🌾", path: [[420, 630]], from: 0.5, to: 5.6, size: 50, wobble: true },
          { kind: "arrow", path: [[589, 512], [558, 566], [510, 606], [451, 627]], color: "#4fb6ff", text: "液体还在冲", from: 1.4, to: 3 },
          { kind: "flow", path: [[420, 630], [700, 600], [880, 300]], color: "#ffcf3f", from: 3, to: 5.6, count: 6, speed: 180 },
          { kind: "text", at: [900, 230], text: "🧠：往另一边转！", color: "#e5484d", from: 3.6, to: 9.2 },
          { kind: "text", at: [900, 580], text: "👀🦶：停了呀", color: "#2f7d32", from: 5.8, to: 9.2 },
          { kind: "sprite", icon: "⚡", path: [[900, 400]], from: 6.6, to: 9.2, size: 80, wobble: true },
          { kind: "sprite", icon: "😵", path: [[420, 450]], from: 7.4, to: 9.2, size: 110, wobble: true },
          { kind: "sprite", icon: "🙂", path: [[420, 450]], from: 9.2, size: 110 },
          { kind: "text", at: [900, 450], text: "液体停了，就好了", size: "s", color: "#2f7d32", from: 9.4 }
        ]
      },
      {
        turn: 5,
        title: "眼睛被拉着跳",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "skeleton", opacity: 0.35 }, "ears", "eyes"],
        camera: [{ t: 0, at: [600, 470], zoom: 1.8 }],
        duration: 11,
        cues: [
          { kind: "highlight", at: "vestibule", from: 0.3, color: "#ff9f43", pad: 12 },
          { kind: "flow", path: ["vestibule", "brainstem", "eye"], color: "#ffcf3f", from: 0.8, count: 6, speed: 120 },
          { kind: "label", at: "brainstem", text: "连得特别近", side: "bottom", from: 1.4, to: 6 },
          { kind: "arrow", path: [[470, 300], [600, 262], [730, 300]], color: "#ff9f43", text: "转头", from: 2.6, to: 6 },
          { kind: "arrow", path: [[750, 580], [450, 580]], color: "#4fb6ff", text: "眼睛反着转", from: 3.4, to: 6 },
          { kind: "text", at: [600, 820], text: "看东西不模糊", size: "s", color: "#2f7d32", from: 4.6, to: 6 },
          { kind: "text", at: [600, 110], text: "错消息：还在转", color: "#e5484d", from: 6.2, to: 9 },
          { kind: "sprite", icon: "⚫", path: [[703, 484], [720, 484], [688, 484], [720, 484], [688, 484], [720, 484], [703, 484]], from: 6.6, travel: 2.4, size: 20 },
          { kind: "sprite", icon: "⚫", path: [[498, 484], [515, 484], [483, 484], [515, 484], [483, 484], [515, 484], [498, 484]], from: 6.6, travel: 2.4, size: 20 },
          { kind: "text", at: [600, 820], text: "液体停了，眼睛就停", size: "s", color: "#2f7d32", from: 9.2 }
        ]
      }
    ]
  },
  {
    question: "eyes-closed-walk",
    scenes: [
      {
        turn: 0,
        title: "眼睛悄悄改方向",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [610, 270], size: [900, 6], color: "#d9c7a8", from: 0.3 },
          { kind: "text", at: [600, 170], text: "睁眼：一偏就改回", size: "s", color: "#2f7d32", from: 0.6 },
          { kind: "sprite", icon: "🚶", path: [[1060, 270], [900, 284], [740, 262], [580, 280], [420, 264], [260, 276], [160, 270]], from: 1, travel: 3, size: 64 },
          { kind: "shape", shape: "rect", at: [610, 560], size: [900, 6], color: "#d9c7a8", from: 4.4 },
          { kind: "text", at: [600, 470], text: "闭眼：越走越歪", size: "s", color: "#e5484d", from: 4.7 },
          { kind: "sprite", icon: "🚶", path: [[1060, 560], [870, 568], [680, 590], [490, 628], [310, 682], [160, 750]], from: 5, travel: 3, size: 64 }
        ]
      },
      {
        turn: 1,
        title: "小偏差越加越大",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "arrow", path: [[330, 840], [330, 100]], color: "#c9b79c", from: 0.3, to: 6.4 },
          { kind: "flow", path: [[330, 820], [334, 700], [344, 580], [362, 460], [390, 340], [428, 220], [476, 110]], icon: "👣", from: 0.8, to: 6.4, count: 6, speed: 110, size: 14 },
          { kind: "label", at: [344, 580], text: "脚落偏一点", pos: [620, 620], from: 1.6, to: 6.4 },
          { kind: "label", at: [390, 340], text: "身体歪一点", pos: [650, 380], from: 2.6, to: 6.4 },
          { kind: "label", at: [476, 110], text: "心里的正前方跑偏", pos: [770, 130], from: 3.6, to: 6.4 },
          { kind: "text", at: [820, 810], text: "一点点加起来", size: "s", color: "#e5484d", from: 4.8, to: 6.4 },
          { kind: "arrow", path: [[600, 710], [501, 690], [416, 634], [360, 549], [340, 450], [360, 351], [416, 266], [501, 210], [600, 190], [699, 210], [784, 266], [840, 351], [860, 450], [840, 549], [784, 634], [699, 690], [600, 700]], color: "#ff5a5f", from: 6.6, draw: 2.4 },
          { kind: "sprite", icon: "🙈", path: [[600, 710], [501, 690], [416, 634], [360, 549], [340, 450], [360, 351], [416, 266], [501, 210], [600, 190], [699, 210], [784, 266], [840, 351], [860, 450], [840, 549], [784, 634], [699, 690], [600, 710]], from: 6.6, travel: 2.4, size: 60 },
          { kind: "text", at: [600, 450], text: "蒙眼走出大圈", size: "s", from: 7.6 }
        ]
      },
      {
        turn: 2,
        title: "三个平衡帮手",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "skeleton", opacity: 0.3 }, { layer: "nerves", opacity: 0.6 }, "eyes", "ears"],
        duration: 9,
        cues: [
          { kind: "label", at: "eye", text: "眼睛：看周围", pos: [380, 60], from: 0.4, color: "#2b7bbf" },
          { kind: "label", at: "vestibule", text: "内耳：歪没歪", pos: [830, 60], from: 1.4, color: "#7a4fd6" },
          { kind: "label", at: "foot", text: "脚底：踩稳没", pos: [330, 820], from: 2.4, color: "#c2410c" },
          { kind: "label", at: "knee", text: "腿：弯多少", pos: [330, 680], from: 3.2, color: "#c2410c" },
          { kind: "flow", path: ["foot", "knee", [570, 480], "spinalCord", "brainstem"], color: "#ffcf3f", from: 4.4, count: 8, speed: 260 },
          { kind: "text", at: [950, 230], text: "🧠 三个合起来", size: "s", from: 5.6 }
        ]
      },
      {
        turn: 3,
        title: "身体自己感觉自己",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.5 }, { layer: "muscles", opacity: 0.8 }, { layer: "nerves", opacity: 0.7 }],
        camera: [{ t: 0, at: [600, 800], zoom: 2.2 }, { t: 3.8, at: [600, 800], zoom: 2.2 }, { t: 5.2, at: "knee", zoom: 1.3 }],
        duration: 11,
        cues: [
          { kind: "highlight", at: "foot", from: 0.3, to: 4, color: "#ff9f43" },
          { kind: "label", at: "foot", text: "脚底感觉重量", side: "top", from: 0.7, to: 4 },
          { kind: "arrow", path: [[595, 540], [595, 770]], text: "身体的重量", from: 1.4, to: 4 },
          { kind: "text", at: [600, 110], text: "脚尖？脚跟？", size: "s", from: 2.4, to: 4 },
          { kind: "highlight", at: "knee", from: 5.2, color: "#ff9f43" },
          { kind: "label", at: "knee", text: "膝盖弯了多少", side: "right", from: 5.6 },
          { kind: "label", at: "quads", text: "肌肉拉长多少", side: "left", from: 6.4 },
          { kind: "flow", path: ["knee", "sciatic", [650, -40]], color: "#ffcf3f", from: 7.2, count: 6, speed: 200 },
          { kind: "text", at: [600, 830], text: "本体感觉", size: "l", color: "#7a4fd6", from: 8 }
        ]
      },
      {
        turn: 4,
        title: "认方向靠眼睛",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "👂", path: [[600, 200]], from: 0.3, to: 6.2, size: 90 },
          { kind: "arrow", path: [[200, 800], [200, 520], [460, 520]], color: "#ff9f43", text: "猛拐弯", from: 1, to: 6.2 },
          { kind: "text", at: [340, 680], text: "察觉到✅", size: "s", color: "#2f7d32", from: 2, to: 6.2 },
          { kind: "arrow", path: [[780, 800], [790, 680], [815, 570], [860, 470], [925, 390], [1010, 330]], color: "#4fb6ff", from: 3.2, to: 6.2, draw: 2 },
          { kind: "text", at: [990, 700], text: "慢慢偏：没察觉", size: "s", color: "#e5484d", from: 4.6, to: 6.2 },
          { kind: "sprite", icon: "👀", path: [[600, 420]], from: 6.4, to: 8.2, size: 150 },
          { kind: "text", at: [600, 620], text: "认方向的高手", color: "#2f7d32", from: 6.8, to: 8.2 },
          { kind: "sprite", icon: "😑", path: [[600, 420]], from: 8.2, size: 150 },
          { kind: "text", at: [600, 620], text: "闭上：没人发现拐弯", color: "#e5484d", from: 8.4 }
        ]
      },
      {
        turn: 5,
        title: "闭眼站立检查",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🧍", path: [[330, 450]], from: 0.3, to: 3.6, size: 170 },
          { kind: "sprite", icon: "🧍", path: [[870, 450]], from: 0.3, to: 3.6, size: 170 },
          { kind: "text", at: [600, 110], text: "① 睁眼：都站得稳", color: "#2f7d32", from: 0.8, to: 3.6 },
          { kind: "sprite", icon: "🧍", path: [[330, 450], [322, 450], [338, 450], [324, 450], [336, 450], [330, 450]], from: 3.6, travel: 5, size: 170 },
          { kind: "sprite", icon: "🧍", path: [[870, 450], [820, 455], [920, 455], [800, 465], [940, 465], [790, 480]], from: 3.6, travel: 4, size: 170, wobble: true },
          { kind: "text", at: [600, 110], text: "② 闭上眼睛 😑", from: 3.8 },
          { kind: "text", at: [330, 700], text: "健康：轻轻晃", size: "s", color: "#2f7d32", from: 4.6 },
          { kind: "text", at: [870, 700], text: "感觉坏了：要倒", size: "s", color: "#e5484d", from: 5.6 },
          { kind: "text", at: [870, 790], text: "平时全靠眼睛撑", size: "s", from: 6.8 }
        ]
      }
    ]
  },
  {
    question: "stuffy-taste",
    scenes: [
      {
        turn: 0,
        title: "味道一大半靠鼻子",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🍓", path: [[600, 230]], from: 0.3, size: 130 },
          { kind: "text", at: [600, 400], text: "你吃到的味道", size: "s", from: 0.7, to: 3.4 },
          { kind: "shape", shape: "pill", at: [500, 520], size: [560, 120], color: "#ffd1dc", text: "鼻子闻的香", from: 1.2, to: 4.6 },
          { kind: "shape", shape: "pill", at: [900, 520], size: [200, 120], color: "#ffe9a8", text: "甜·酸", from: 2 },
          { kind: "sprite", icon: "🤧", path: [[180, 700]], from: 3.6, size: 100 },
          { kind: "shape", shape: "pill", at: [500, 520], size: [560, 120], color: "#fff7ea", text: "闻不到", outline: true, from: 4.6 },
          { kind: "text", at: [640, 720], text: "只剩一点甜和酸", size: "s", color: "#e5484d", from: 6 }
        ]
      },
      {
        turn: 1,
        title: "嘴巴后面的香味小路",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 }, "airway", "mouth"],
        camera: [{ t: 0, at: [400, 620], zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🍓", path: [[70, 760], [250, 730]], from: 0.3, to: 3, travel: 1, size: 44 },
          { kind: "highlight", at: "tongue", from: 1, to: 4, color: "#ff7aa8" },
          { kind: "label", at: "tongue", text: "嚼一嚼", side: "bottom", from: 1.3, to: 4 },
          { kind: "flow", path: ["tongue", [480, 700], "nasopharynx", [400, 490], [330, 478]], color: "#ff7aa8", from: 2.2, count: 8, speed: 140 },
          { kind: "label", at: "nasopharynx", text: "嘴巴后面的小路", side: "right", from: 3.2 },
          { kind: "pulse", at: [330, 478], color: "#ff7aa8", radius: 50, from: 4.6 },
          { kind: "label", at: [330, 478], text: "鼻子最里面", side: "top", from: 5 },
          { kind: "text", at: [600, 820], text: "其实一直在闻", color: "#2f7d32", from: 6.4 }
        ]
      },
      {
        turn: 2,
        title: "舌头只尝五种味",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "👅", path: [[600, 500]], from: 0.3, to: 4.6, size: 220 },
          { kind: "text", at: [160, 200], text: "🍬甜", from: 0.9 },
          { kind: "text", at: [380, 200], text: "🧂咸", from: 1.4 },
          { kind: "text", at: [600, 200], text: "🍋酸", from: 1.9 },
          { kind: "text", at: [820, 200], text: "☕苦", from: 2.4 },
          { kind: "text", at: [1040, 200], text: "🍲鲜", from: 2.9 },
          { kind: "shape", shape: "circle", at: [600, 500], size: [240, 240], color: "#ffc2cc", text: "味蕾", motion: "pulse", from: 4.8, to: 6.6 },
          { kind: "text", at: [600, 520], text: "🍓味？尝不出", size: "l", color: "#e5484d", from: 6.8 }
        ]
      },
      {
        turn: 3,
        title: "舌头地图是误会",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [600, 400], size: [330, 520], color: "#ff9eae", from: 0.3 },
          { kind: "text", at: [600, 600], text: "甜", from: 0.8, to: 5 },
          { kind: "text", at: [490, 500], text: "咸", from: 1.2, to: 5 },
          { kind: "text", at: [710, 350], text: "酸", from: 1.6, to: 5 },
          { kind: "text", at: [600, 210], text: "苦", from: 2, to: 5 },
          { kind: "myth", wrong: "舌尖尝甜，舌根尝苦", right: "舌头各处都能尝到五种味", from: 2.8 },
          { kind: "text", at: [600, 580], text: "甜咸酸苦鲜", size: "s", from: 5.2 },
          { kind: "text", at: [600, 410], text: "甜咸酸苦鲜", size: "s", from: 5.6 },
          { kind: "text", at: [600, 240], text: "甜咸酸苦鲜", size: "s", from: 6 },
          { kind: "text", at: [970, 300], text: "📜 老论文被读错", size: "s", color: "#7a6a55", from: 7.2 }
        ]
      },
      {
        turn: 4,
        title: "钥匙开小锁",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🍓", path: [[150, 450]], from: 0.3, to: 6.2, size: 120 },
          { kind: "flow", path: [[220, 450], [560, 430]], color: "#ff7aa8", from: 0.8, to: 6.2, count: 6, speed: 120, size: 8 },
          { kind: "label", at: [400, 440], text: "气味分子", pos: [400, 300], from: 1.4, to: 4.2 },
          { kind: "shape", shape: "rect", at: [800, 560], size: [300, 320], color: "#ffe3b3", text: "闻味细胞", from: 2.4 },
          { kind: "text", at: [800, 780], text: "在鼻子最深处", size: "s", color: "#7a6a55", from: 2.8 },
          { kind: "text", at: [800, 385], text: "🔒🔒🔒", from: 3.4, to: 6 },
          { kind: "sprite", icon: "🔑", path: [[480, 300], [650, 260], [800, 370]], from: 4.4, travel: 1.4, size: 50 },
          { kind: "text", at: [800, 385], text: "🔒🔓🔒", from: 6 },
          { kind: "flow", path: [[800, 560], [1000, 560], [1080, 330]], color: "#ffcf3f", from: 6.4, count: 6, speed: 180 },
          { kind: "text", at: [1060, 250], text: "🧠 收到", size: "s", from: 7 }
        ]
      },
      {
        turn: 5,
        title: "气味的密码",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "text", at: [600, 120], text: "鼻子里：几百种锁", size: "s", from: 0.3, to: 5 },
          { kind: "sprite", icon: "🍓", path: [[180, 300]], from: 1, size: 100 },
          { kind: "flow", path: [[250, 300], [440, 300]], color: "#ff7aa8", from: 1.3, to: 3.4, count: 5, speed: 120, size: 8 },
          { kind: "text", at: [700, 300], text: "🔓🔒🔓🔓🔒🔒", size: "l", from: 1.8 },
          { kind: "sprite", icon: "🍌", path: [[180, 560]], from: 3.4, size: 100 },
          { kind: "flow", path: [[250, 560], [440, 560]], color: "#c9a227", from: 3.6, to: 5.4, count: 5, speed: 120, size: 8 },
          { kind: "text", at: [700, 560], text: "🔒🔓🔒🔓🔓🔒", size: "l", from: 4 },
          { kind: "text", at: [600, 780], text: "开的锁不同 = 密码不同", from: 5.6 },
          { kind: "text", at: [1060, 430], text: "🧠认出", size: "s", from: 7 }
        ]
      },
      {
        turn: 6,
        title: "鼻子堵了，密码断了",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 }, "airway", "mouth"],
        camera: [{ t: 0, at: [400, 620], zoom: 1.6 }],
        duration: 11,
        cues: [
          { kind: "shape", shape: "circle", at: [400, 505], size: [130, 76], color: "#c6e08a", text: "鼻涕", motion: "grow", over: 2, from: 0.4, to: 8.2 },
          { kind: "shape", shape: "circle", at: [462, 548], size: [84, 84], color: "#f4a0a0", text: "肿", motion: "grow", over: 2, from: 1, to: 8.2 },
          { kind: "flow", path: ["tongue", [480, 690], [478, 610]], color: "#ff7aa8", from: 2.4, to: 8.2, count: 6, speed: 110 },
          { kind: "sprite", icon: "❌", path: [[330, 478]], from: 3.4, to: 8.2, size: 40 },
          { kind: "label", at: [330, 478], text: "碰不到小锁", side: "top", from: 3.8, to: 5.6 },
          { kind: "label", at: "tongue", text: "甜和酸还在", side: "bottom", from: 5.2, color: "#2f7d32" },
          { kind: "text", at: [600, 110], text: "最香的那部分没了", color: "#e5484d", from: 6.6, to: 8.2 },
          { kind: "flow", path: ["tongue", [480, 700], "nasopharynx", [400, 490], [330, 478]], color: "#ff7aa8", from: 8.4, count: 8, speed: 140 },
          { kind: "text", at: [600, 110], text: "鼻子通了，香味回来", color: "#2f7d32", from: 8.6 }
        ]
      }
    ]
  },
  {
    question: "dark-see",
    scenes: [
      {
        turn: 0,
        title: "瞳孔张大",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.5 }, "eyes"],
        camera: [{ t: 0, at: "eye", zoom: 2.6 }],
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [703, 484], size: [1300, 1000], color: "#0e1730cc", from: 3.4 },
          { kind: "shape", shape: "circle", at: "eye", size: [54, 54], color: "#8a5a32", from: 0.3 },
          { kind: "shape", shape: "circle", at: "eye", size: [14, 14], color: "#1d140c", from: 0.5, to: 3.8 },
          { kind: "label", at: "eye", text: "瞳孔", side: "top", from: 0.9 },
          { kind: "flow", path: [[560, 360], "eye"], color: "#ffd54a", from: 1.6, to: 3.4, count: 6, size: 7, speed: 120 },
          { kind: "text", at: [600, 110], text: "🌙 关灯", color: "#fff3c4", from: 3.4, to: 5.2 },
          { kind: "shape", shape: "circle", at: "eye", size: [40, 40], color: "#1d140c", motion: "grow", over: 1.6, from: 3.8 },
          { kind: "flow", path: [[560, 360], "eye"], color: "#ffe9a0", from: 5, to: 7, count: 9, size: 4, speed: 120 },
          { kind: "text", at: [600, 800], text: "张大：多放光进来", size: "s", color: "#fff3c4", from: 5.4, to: 7 },
          { kind: "pulse", at: "eye", color: "#b48cff", radius: 60, from: 7.2 },
          { kind: "text", at: [600, 110], text: "眼睛里面也在准备", size: "s", color: "#fff3c4", from: 7.6 }
        ]
      },
      {
        turn: 1,
        title: "视网膜慢慢变灵敏",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.35 }, "eyes"],
        camera: [{ t: 0, at: "eye", zoom: 2.6 }],
        duration: 10,
        cues: [
          { kind: "text", at: [600, 110], text: "瞳孔：几秒就张大", size: "s", from: 0.3, to: 3.2 },
          { kind: "meter", at: [600, 800], label: "瞳孔帮的忙", start: 0, end: 0.25, color: "#ff9f43", from: 0.8, to: 3.2 },
          { kind: "flow", path: [[130, 486], "lens", "retina"], color: "#ffd54a", from: 1, count: 6, size: 5, speed: 90 },
          { kind: "highlight", at: "retina", from: 3.4, color: "#ff9f43", pad: 10 },
          { kind: "label", at: "retina", text: "视网膜", side: "right", from: 3.8 },
          { kind: "label", at: "retina", text: "像相机底片", pos: [460, 590], from: 4.8 },
          { kind: "meter", at: [600, 110], label: "感光细胞灵敏度", start: 0.1, end: 0.7, color: "#b48cff", over: 3, from: 6 },
          { kind: "sprite", icon: "⏳", path: [[190, 600]], from: 6.4, size: 30 }
        ]
      },
      {
        turn: 2,
        title: "两种感光细胞",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [330, 450], size: [150, 280], color: "#ffb36b", text: "视锥", from: 0.3 },
          { kind: "sprite", icon: "🌈", path: [[330, 230]], from: 0.8, to: 6.2, size: 80 },
          { kind: "text", at: [330, 660], text: "管颜色，要亮光", size: "s", from: 1.6 },
          { kind: "shape", shape: "pill", at: [870, 450], size: [90, 340], color: "#9aa5b1", text: "视杆", from: 3 },
          { kind: "sprite", icon: "✨", path: [[870, 230]], from: 3.6, to: 6.8, size: 70 },
          { kind: "text", at: [870, 660], text: "不管颜色，超灵敏", size: "s", from: 4.2 },
          { kind: "sprite", icon: "☀️", path: [[330, 230]], from: 6.4, size: 90 },
          { kind: "sprite", icon: "🌙", path: [[870, 230]], from: 7, size: 90 }
        ]
      },
      {
        turn: 3,
        title: "色素被光用掉",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [380, 470], size: [220, 560], color: "#c4ccd6", from: 0.3 },
          { kind: "text", at: [380, 130], text: "视杆细胞", size: "s", from: 0.5, to: 3.4 },
          { kind: "shape", shape: "circle", at: [380, 470], size: [130, 130], color: "#b0458f", text: "色素", from: 1, to: 3.4 },
          { kind: "label", at: [380, 470], text: "视紫红质", pos: [700, 330], from: 1.5, to: 3.4, color: "#8a2f6f" },
          { kind: "sprite", icon: "☀️", path: [[880, 170]], from: 2.4, to: 7.8, size: 100 },
          { kind: "flow", path: [[830, 210], [420, 440]], color: "#ffd54a", from: 2.6, to: 7.8, count: 6, speed: 200 },
          { kind: "shape", shape: "pill", at: [380, 470], size: [170, 80], color: "#efdbe6", text: "变形", motion: "wiggle", from: 3.4 },
          { kind: "flow", path: [[380, 560], [700, 700], [1000, 700]], color: "#ffcf3f", from: 3.8, to: 6, count: 6, speed: 200 },
          { kind: "text", at: [1000, 770], text: "🧠 发信号", size: "s", from: 4.2, to: 6 },
          { kind: "meter", at: [820, 450], label: "能用的色素", start: 0.9, end: 0.05, color: "#b0458f", over: 1.4, from: 6.2 },
          { kind: "text", at: [600, 820], text: "🌙 关灯后慢慢变回", size: "s", from: 8 }
        ]
      },
      {
        turn: 4,
        title: "二三十分钟才适应",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 470], size: [1000, 560], color: "#1b2338", from: 0.3 },
          { kind: "count", at: [1000, 110], label: "关灯后", start: 0, end: 30, unit: "分钟", over: 8, from: 0.6 },
          { kind: "meter", at: [300, 90], label: "视锥细胞", start: 0, end: 0.35, color: "#ff9f43", over: 2, from: 1 },
          { kind: "meter", at: [300, 170], label: "视杆细胞", start: 0, end: 0.95, color: "#8a7bd6", over: 6, from: 3 },
          { kind: "text", at: [600, 660], text: "一片黑", size: "s", color: "#8090b0", from: 1.6, to: 4.2 },
          { kind: "shape", shape: "rect", at: [600, 440], size: [200, 300], color: "#3b4766", from: 4.4, to: 7.2 },
          { kind: "text", at: [600, 680], text: "几分钟：看到轮廓", size: "s", color: "#c9d6f0", from: 4.6, to: 7.2 },
          { kind: "sprite", icon: "🗄️", path: [[600, 440]], from: 7.2, size: 220 },
          { kind: "text", at: [600, 680], text: "再等等：看得更清", size: "s", color: "#ffffff", from: 7.4 }
        ]
      },
      {
        turn: 5,
        title: "暗处没有颜色",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "☀️", path: [[330, 180]], from: 0.3, size: 100 },
          { kind: "shape", shape: "circle", at: [330, 440], size: [200, 200], color: "#e5484d", text: "红花", from: 0.8 },
          { kind: "text", at: [330, 640], text: "视锥：看见红色", size: "s", from: 1.4, to: 5.4 },
          { kind: "sprite", icon: "🌙", path: [[870, 180]], from: 3, size: 100 },
          { kind: "shape", shape: "circle", at: [870, 440], size: [200, 200], color: "#8e8e96", text: "红花", from: 3.4 },
          { kind: "text", at: [870, 640], text: "视杆：只分亮暗", size: "s", from: 4 },
          { kind: "text", at: [600, 790], text: "光不够，视锥下班💤", color: "#7a6a55", from: 5.6 }
        ]
      },
      {
        turn: 6,
        title: "亮处快，维生素A",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "☀️", path: [[200, 200]], from: 0.3, to: 5.2, size: 100 },
          { kind: "meter", at: [600, 110], label: "能用的色素", start: 0.9, end: 0.1, color: "#b0458f", over: 0.8, from: 0.8, to: 5.2 },
          { kind: "text", at: [600, 200], text: "一照就变形，很快", size: "s", from: 1.8, to: 5.2 },
          { kind: "shape", shape: "circle", at: [600, 440], size: [260, 260], color: "#8a5a32", from: 3, to: 5.2 },
          { kind: "shape", shape: "circle", at: [600, 440], size: [150, 150], color: "#1d140c", motion: "shrink", over: 0.8, from: 3.2, to: 5.2 },
          { kind: "text", at: [600, 680], text: "瞳孔也马上缩小", size: "s", from: 3.6, to: 5.2 },
          { kind: "shape", shape: "circle", at: [600, 450], size: [220, 220], color: "#ffcf6b", text: "维生素A", from: 5.4 },
          { kind: "sprite", icon: "🥚", path: [[150, 300], [470, 400]], from: 5.8, travel: 1, size: 70 },
          { kind: "sprite", icon: "🥕", path: [[150, 620], [470, 520]], from: 6.2, travel: 1, size: 70 },
          { kind: "arrow", path: [[730, 450], [930, 450]], color: "#b0458f", text: "做色素", from: 7.2 },
          { kind: "shape", shape: "circle", at: [1040, 450], size: [120, 120], color: "#b0458f", text: "色素", from: 7.6 },
          { kind: "text", at: [600, 790], text: "长期严重缺：夜盲", color: "#e5484d", from: 8.8 }
        ]
      }
    ]
  },
  {
    question: "sound-where",
    scenes: [
      {
        turn: 0,
        title: "两只耳朵比一比",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "brain", opacity: 0.4 }, "ears"],
        camera: [{ t: 0, at: [600, 470], zoom: 1.3 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "📢", path: [[1000, 420]], from: 0.3, size: 60 },
          { kind: "flow", path: [[960, 430], "ear"], color: "#4fb6ff", from: 0.9, count: 5, speed: 220, size: 11 },
          { kind: "flow", path: [[960, 410], [820, 170], [600, 110], [380, 170], "earRight"], color: "#4fb6ff", from: 0.9, count: 5, speed: 220, size: 6 },
          { kind: "label", at: "ear", text: "左耳：先、响", side: "bottom", from: 1.8, to: 5 },
          { kind: "label", at: "earRight", text: "右耳：晚、轻", side: "bottom", from: 2.8, to: 5 },
          { kind: "pulse", at: "thalamus", color: "#ffcf3f", radius: 70, from: 4.2 },
          { kind: "text", at: [600, 830], text: "声音在左边！", color: "#2f7d32", from: 5.4 }
        ]
      },
      {
        turn: 1,
        title: "差得非常非常少",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[600, 470]], from: 0.3, size: 300 },
          { kind: "shape", shape: "circle", at: [430, 480], size: [60, 60], color: "#ffe0b8", text: "右", from: 0.6 },
          { kind: "shape", shape: "circle", at: [770, 480], size: [60, 60], color: "#ffe0b8", text: "左", from: 0.6 },
          { kind: "sprite", icon: "📢", path: [[1090, 470]], from: 1, to: 5, size: 80 },
          { kind: "flow", path: [[1040, 470], [805, 480]], color: "#4fb6ff", from: 1.4, to: 5, count: 4, speed: 200, size: 10 },
          { kind: "flow", path: [[1040, 450], [900, 230], [600, 140], [300, 230], [395, 470]], color: "#4fb6ff", from: 1.4, to: 5, count: 6, speed: 200, size: 7 },
          { kind: "text", at: [600, 790], text: "差不到千分之一秒", from: 5.2 },
          { kind: "sprite", icon: "😉", path: [[1000, 250]], from: 6.2, size: 90 },
          { kind: "text", at: [1000, 370], text: "比眨眼快得多", size: "s", from: 6.6 }
        ]
      },
      {
        turn: 2,
        title: "终点的裁判",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [150, 300], text: "👂左", from: 0.3 },
          { kind: "text", at: [150, 600], text: "👂右", from: 0.3 },
          { kind: "sprite", icon: "🏁", path: [[1020, 450]], from: 0.6, size: 120 },
          { kind: "text", at: [1020, 300], text: "脑里的裁判", size: "s", from: 0.9, to: 3.4 },
          { kind: "sprite", icon: "⚡", path: [[230, 300], [700, 300], [930, 430]], from: 1.4, to: 4, travel: 2, size: 60 },
          { kind: "sprite", icon: "⚡", path: [[230, 600], [700, 600], [930, 470]], from: 2, to: 4.8, travel: 2, size: 60 },
          { kind: "pulse", at: [1020, 450], color: "#ffcf3f", radius: 90, from: 3.5 },
          { kind: "text", at: [1020, 610], text: "左耳先到！", size: "s", color: "#2f7d32", from: 4.2 },
          { kind: "text", at: [600, 800], text: "自动比，不用想", from: 5.8 }
        ]
      },
      {
        turn: 3,
        title: "脑袋像一堵墙",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🧒", path: [[600, 470]], from: 0.3, size: 300 },
          { kind: "shape", shape: "circle", at: [430, 480], size: [60, 60], color: "#ffe0b8", text: "右", from: 0.5 },
          { kind: "shape", shape: "circle", at: [770, 480], size: [60, 60], color: "#ffe0b8", text: "左", from: 0.5 },
          { kind: "flow", path: [[1180, 470], [805, 480]], color: "#4fb6ff", from: 1, to: 4.8, count: 5, speed: 200, size: 12 },
          { kind: "flow", path: [[1180, 450], [900, 230], [600, 140], [300, 230], [395, 470]], color: "#4fb6ff", from: 1, to: 4.8, count: 6, speed: 200, size: 5 },
          { kind: "label", at: [600, 470], text: "脑袋挡在中间", pos: [600, 700], from: 1.6, to: 3 },
          { kind: "label", at: [430, 480], text: "这边轻一些", side: "bottom", from: 3.2, to: 4.8 },
          { kind: "shape", shape: "pill", at: [330, 760], size: [400, 100], color: "#cfe8ff", text: "低音：比先后", from: 5 },
          { kind: "shape", shape: "pill", at: [870, 760], size: [400, 100], color: "#ffe0b8", text: "高音：比响度", from: 6 },
          { kind: "text", at: [600, 110], text: "两个办法一起用", from: 7.4 }
        ]
      },
      {
        turn: 4,
        title: "耳廓分前后",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "skeleton", opacity: 0.3 }, "ears"],
        camera: [{ t: 0, at: [600, 480], zoom: 1.6 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "❓", path: [[600, 330]], from: 0.3, to: 1.6, size: 50 },
          { kind: "shape", shape: "circle", at: [600, 515], size: [70, 120], color: "#f2b48f", from: 0.5 },
          { kind: "label", at: [600, 515], text: "耳廓", side: "bottom", from: 0.9 },
          { kind: "sprite", icon: "🔔", path: [[300, 420]], from: 1.8, to: 4.4, size: 50 },
          { kind: "flow", path: [[340, 430], [580, 505]], color: "#4fb6ff", from: 2, to: 4.4, count: 6, speed: 200 },
          { kind: "flow", path: ["ear", "brainstem", "thalamus"], color: "#ff7aa8", from: 2.8, to: 4.4, count: 5, speed: 120 },
          { kind: "label", at: "thalamus", text: "前面来的音色", side: "top", from: 3, to: 4.4, color: "#d6336c" },
          { kind: "sprite", icon: "🔔", path: [[900, 420]], from: 4.6, to: 7.4, size: 50 },
          { kind: "flow", path: [[860, 430], [620, 505]], color: "#4fb6ff", from: 4.8, count: 6, speed: 200 },
          { kind: "flow", path: ["ear", "brainstem", "thalamus"], color: "#8a5cd6", from: 5.6, count: 5, speed: 120 },
          { kind: "label", at: "thalamus", text: "后面来的音色", side: "top", from: 5.8, color: "#6b3fc4" },
          { kind: "text", at: [600, 830], text: "音色不同，分出前后", color: "#2f7d32", from: 7.6 }
        ]
      },
      {
        turn: 5,
        title: "转转头就清楚",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 500], size: [300, 300], color: "#ffd9b8", text: "从上往下看", from: 0.3 },
          { kind: "shape", shape: "circle", at: [440, 500], size: [56, 56], color: "#f4b38a", text: "左", from: 0.5, to: 3.4 },
          { kind: "shape", shape: "circle", at: [760, 500], size: [56, 56], color: "#f4b38a", text: "右", from: 0.5, to: 3.4 },
          { kind: "sprite", icon: "🔔", path: [[600, 130]], from: 0.8, size: 70 },
          { kind: "flow", path: [[600, 180], [440, 470]], color: "#4fb6ff", from: 1.2, to: 3, count: 5, speed: 160 },
          { kind: "flow", path: [[600, 180], [760, 470]], color: "#4fb6ff", from: 1.2, to: 3, count: 5, speed: 160 },
          { kind: "arrow", path: [[780, 330], [600, 290], [420, 330]], color: "#ff9f43", text: "转转头", from: 3, to: 4 },
          { kind: "shape", shape: "circle", at: [461, 580], size: [56, 56], color: "#f4b38a", text: "远", from: 3.4 },
          { kind: "shape", shape: "circle", at: [739, 420], size: [56, 56], color: "#f4b38a", text: "近", from: 3.4 },
          { kind: "flow", path: [[600, 180], [725, 400]], color: "#4fb6ff", from: 4.2, to: 7, count: 4, speed: 160, size: 11 },
          { kind: "flow", path: [[600, 180], [400, 360], [430, 570]], color: "#4fb6ff", from: 4.2, to: 7, count: 6, speed: 160, size: 6 },
          { kind: "sprite", icon: "👀", path: [[600, 260]], from: 7.2, size: 70 },
          { kind: "text", at: [600, 820], text: "再用眼睛确认", size: "s", color: "#2f7d32", from: 7.6 }
        ]
      },
      {
        turn: 6,
        title: "仓鸮的高低耳",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 450], size: [1240, 940], color: "#1b2338", from: 0 },
          { kind: "sprite", icon: "🦉", path: [[330, 330]], from: 0.4, to: 7.4, size: 200 },
          { kind: "shape", shape: "circle", at: [235, 290], size: [36, 36], color: "#4fb6ff", from: 1.2, to: 5 },
          { kind: "shape", shape: "circle", at: [425, 350], size: [36, 36], color: "#4fb6ff", from: 1.4, to: 5 },
          { kind: "text", at: [330, 520], text: "耳孔一高一低", size: "s", color: "#ffe7a0", from: 1.8, to: 3.6 },
          { kind: "text", at: [330, 520], text: "左右上下都分得清", size: "s", color: "#ffe7a0", from: 3.6 },
          { kind: "sprite", icon: "🐭", path: [[920, 790]], from: 5, size: 60 },
          { kind: "flow", path: [[890, 770], [420, 380]], color: "#4fb6ff", from: 5.4, to: 7.4, count: 6, speed: 200, size: 5 },
          { kind: "sprite", icon: "🦉", path: [[330, 330], [640, 520], [860, 740]], from: 7.4, travel: 1, size: 160 }
        ]
      }
    ]
  },
  {
    question: "tears",
    scenes: [
      {
        turn: 0,
        title: "哭是在求抱抱",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "😢", path: [[300, 450]], from: 0.3, to: 6.6, size: 160 },
          { kind: "sprite", icon: "😠", path: [[170, 250]], from: 0.9, to: 2.4, size: 70 },
          { kind: "sprite", icon: "😂", path: [[430, 250]], from: 1.3, to: 2.4, size: 70 },
          { kind: "flow", path: [[270, 500], [262, 640]], icon: "💧", from: 1, to: 6.4, count: 3, speed: 70, size: 10 },
          { kind: "pulse", at: [300, 450], color: "#ff9f43", radius: 150, from: 2.6, to: 6.4 },
          { kind: "arrow", path: [[440, 450], [760, 450]], color: "#ff9f43", text: "抱抱我", from: 2.8, to: 5 },
          { kind: "sprite", icon: "👩", path: [[900, 450]], from: 3.8, to: 5.2, size: 150 },
          { kind: "sprite", icon: "🤗", path: [[900, 450], [460, 450]], from: 5.2, travel: 1, size: 130 },
          { kind: "sprite", icon: "😌", path: [[300, 450]], from: 6.6, size: 160 },
          { kind: "text", at: [600, 780], text: "哭不丢人", color: "#2f7d32", from: 7 }
        ]
      },
      {
        turn: 1,
        title: "泪腺：小水龙头",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "skeleton", opacity: 0.3 }, "eyes"],
        camera: [{ t: 0, at: [703, 470], zoom: 2.4 }],
        duration: 10,
        cues: [
          { kind: "highlight", at: "tearGland", from: 0.3, to: 3.4, color: "#4fb6ff", pad: 10 },
          { kind: "label", at: "tearGland", text: "泪腺：小水龙头", side: "right", from: 0.7 },
          { kind: "flow", path: ["tearGland", [725, 470], [700, 500], [665, 500]], color: "#4fb6ff", from: 1.2, count: 5, size: 5, speed: 50 },
          { kind: "text", at: [600, 820], text: "一直流一点点", size: "s", from: 2.2, to: 5.2 },
          { kind: "sprite", icon: "➖", path: [[703, 440], [703, 530], [703, 440]], from: 3.4, to: 4.4, travel: 0.7, size: 50 },
          { kind: "label", at: "eye", text: "眨眼像雨刷", side: "left", from: 3.6 },
          { kind: "sprite", icon: "➖", path: [[703, 440], [703, 530], [703, 440]], from: 5, to: 6, travel: 0.7, size: 50 },
          { kind: "sprite", icon: "🟤", path: [[715, 490], [690, 500], [660, 500]], from: 5.2, travel: 1.4, size: 10 },
          { kind: "text", at: [600, 820], text: "湿湿的，冲走灰尘", size: "s", color: "#2f7d32", from: 5.6 }
        ]
      },
      {
        turn: 2,
        title: "眼泪流进鼻子",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.5 }, { layer: "skeleton", opacity: 0.3 }, "eyes"],
        camera: [{ t: 0, at: [650, 530], zoom: 2.2 }],
        duration: 9,
        cues: [
          { kind: "flow", path: ["tearGland", [725, 470], [700, 500], [655, 495]], color: "#4fb6ff", from: 0.3, count: 5, size: 5, speed: 60 },
          { kind: "pulse", at: [652, 492], color: "#4fb6ff", radius: 28, from: 0.8, to: 4.6 },
          { kind: "label", at: [652, 492], text: "两个小孔", side: "left", from: 1.2, to: 4.6 },
          { kind: "flow", path: [[652, 492], [640, 530], "tearDuct", [625, 612]], color: "#4fb6ff", from: 2, count: 5, size: 5, speed: 60 },
          { kind: "label", at: "tearDuct", text: "细管通到鼻子", side: "left", from: 2.8, to: 4.6 },
          { kind: "highlight", at: "nose", from: 4.8, color: "#4fb6ff" },
          { kind: "sprite", icon: "😭", path: [[480, 380]], from: 4.8, size: 40 },
          { kind: "sprite", icon: "💧", path: [[612, 630], [612, 700]], from: 5.4, travel: 1, size: 18 },
          { kind: "text", at: [600, 110], text: "鼻涕里有眼泪", color: "#2b7bbf", from: 6 }
        ]
      },
      {
        turn: 3,
        title: "洋葱辣眼睛",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.4 }, { layer: "skeleton", opacity: 0.3 }, { layer: "brain", opacity: 0.4 }, { layer: "nerves", opacity: 0.45 }, "eyes"],
        camera: [{ t: 0, at: [400, 480], zoom: 1.5 }],
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🧅", path: [[110, 700]], from: 0.3, size: 70 },
          { kind: "sprite", icon: "🔪", path: [[190, 640]], from: 0.6, to: 2.6, size: 50, wobble: true },
          { kind: "flow", path: [[130, 660], [240, 560], "eye"], color: "#b8d98a", from: 1.2, count: 6, speed: 110, size: 8 },
          { kind: "pulse", at: "eye", color: "#ff5a5f", radius: 55, from: 2.2, to: 5.2 },
          { kind: "label", at: "eye", text: "刺激眼睛神经", side: "top", from: 2.6, to: 5.2 },
          { kind: "flow", path: ["eye", [460, 480], "brainstem", [470, 400], "tearGland"], color: "#ffcf3f", from: 3.6, to: 7.4, count: 7, speed: 200 },
          { kind: "highlight", at: "tearGland", from: 5.2, color: "#4fb6ff", pad: 10 },
          { kind: "flow", path: ["tearGland", "eye", [300, 540], [290, 620]], color: "#4fb6ff", from: 5.6, count: 6, speed: 90 },
          { kind: "text", at: [600, 110], text: "多流眼泪冲走它", color: "#2b7bbf", from: 6.6 }
        ]
      },
      {
        turn: 4,
        title: "洋葱的防身术",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [500, 470], size: [520, 360], color: "#f6efd9", from: 0.3 },
          { kind: "text", at: [500, 230], text: "洋葱细胞", size: "s", from: 0.5, to: 2.2 },
          { kind: "shape", shape: "circle", at: [380, 470], size: [150, 150], color: "#ffd166", text: "A", from: 0.8, to: 3.4 },
          { kind: "shape", shape: "circle", at: [620, 470], size: [150, 150], color: "#c3a6ff", text: "B", from: 1.2, to: 3.4 },
          { kind: "sprite", icon: "🔪", path: [[500, 180], [500, 720]], from: 2.4, to: 3.6, travel: 0.8, size: 80 },
          { kind: "flow", path: [[380, 470], [500, 470]], color: "#ffd166", from: 3.4, to: 6.6, count: 5, speed: 90, size: 12 },
          { kind: "flow", path: [[620, 470], [500, 470]], color: "#c3a6ff", from: 3.4, to: 6.6, count: 5, speed: 90, size: 12 },
          { kind: "flow", path: [[500, 470], [500, 160], [720, 70]], color: "#b8d98a", from: 4.6, count: 7, speed: 140, size: 9 },
          { kind: "text", at: [860, 150], text: "辣眼睛的气", size: "s", color: "#4d7c0f", from: 5 },
          { kind: "sprite", icon: "🐭", path: [[980, 620]], from: 6.8, size: 90, wobble: true },
          { kind: "text", at: [980, 760], text: "洋葱的防身术", size: "s", from: 7.4 }
        ]
      },
      {
        turn: 5,
        title: "三种眼泪",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "circle", at: [220, 300], size: [190, 190], color: "#cfe8ff", text: "① 保湿", from: 0.3 },
          { kind: "shape", shape: "circle", at: [600, 300], size: [190, 190], color: "#d8f0c4", text: "② 冲洗", from: 1 },
          { kind: "shape", shape: "circle", at: [980, 300], size: [190, 190], color: "#ffd6e0", text: "③ 心情", from: 1.7 },
          { kind: "pulse", at: [980, 300], color: "#ff9f43", radius: 140, from: 3, to: 5.8 },
          { kind: "arrow", path: [[900, 420], [760, 580]], color: "#ff9f43", text: "发信号", from: 3.6 },
          { kind: "sprite", icon: "🤗", path: [[690, 630]], from: 4.4, size: 100 },
          { kind: "myth", wrong: "哭能把压力排出去", right: "这个说法证据还不够", from: 6 }
        ]
      },
      {
        turn: 6,
        title: "小狗会哭吗？",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🐶🐱", path: [[330, 380]], from: 0.3, size: 120 },
          { kind: "text", at: [330, 560], text: "保湿✅ 冲洗✅", size: "s", color: "#2f7d32", from: 1.2 },
          { kind: "text", at: [330, 650], text: "难过流泪？没证据", size: "s", color: "#7a6a55", from: 2.8 },
          { kind: "sprite", icon: "😢", path: [[880, 380]], from: 4.4, size: 150 },
          { kind: "text", at: [880, 560], text: "人：难过会流泪", size: "s", color: "#2b7bbf", from: 5 },
          { kind: "text", at: [600, 800], text: "为什么？还没弄明白", color: "#7a6a55", from: 6.6 }
        ]
      }
    ]
  }
];
