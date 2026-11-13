import type { Film } from "./types";

export const films: readonly Film[] = [
  {
    question: "handwash",
    scenes: [
      {
        turn: 0,
        title: "看不见的病菌",
        view: "hand",
        layers: [{ layer: "skin" }],
        camera: [{ t: 0, at: [600, 400], zoom: 1 }, { t: 2.2, at: [560, 560], zoom: 1.5 }],
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🚪", path: [[200, 220]], from: 0.3, to: 4.4, size: 80 },
          { kind: "sprite", icon: "🧸", path: [[200, 470]], from: 0.8, to: 4.4, size: 80 },
          { kind: "flow", path: [[250, 340], "palm", [460, 640]], icon: "🦠", from: 1.3, to: 4.4, count: 5, speed: 180, size: 14 },
          { kind: "label", at: [460, 640], text: "小到看不见", side: "right", from: 2.4 },
          { kind: "sprite", icon: "🍪", path: [[470, 770]], from: 4.6, size: 70 },
          { kind: "sprite", icon: "🦠", path: [[460, 640], [480, 760]], from: 5.1, travel: 0.8, size: 40 },
          { kind: "text", at: [600, 140], text: "跟着食物进肚子", size: "m", from: 6 },
          { kind: "sprite", icon: "🤢", path: [[800, 470]], from: 6.8, size: 90 }
        ]
      },
      {
        turn: 1,
        title: "粘在油里的病菌",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 640], size: [900, 140], color: "#f6c9a8", text: "皮肤", from: 0.3 },
          { kind: "shape", shape: "rect", at: [600, 540], size: [900, 60], color: "#ffe08a", text: "一层油", from: 0.9 },
          { kind: "sprite", icon: "🦠", path: [[420, 535]], from: 1.6, size: 48, wobble: true },
          { kind: "sprite", icon: "🦠", path: [[780, 535]], from: 2, size: 48, wobble: true },
          { kind: "flow", path: [[100, 470], [1100, 470]], icon: "💧", from: 3.2, count: 8, speed: 320, size: 14 },
          { kind: "text", at: [600, 200], text: "油和水不相溶", from: 3.8, to: 6.2 },
          { kind: "label", at: [780, 535], text: "清水冲不走", side: "top", color: "#e5484d", from: 6.4 }
        ]
      },
      {
        turn: 2,
        title: "肥皂像小火柴",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "pill", at: [300, 300], size: [200, 30], color: "#ffd8a8", from: 0.3, to: 5.2 },
          { kind: "shape", shape: "circle", at: [420, 300], size: [56, 56], color: "#4fb6ff", from: 0.5, to: 5.2 },
          { kind: "label", at: [420, 300], text: "爱水的头", side: "top", color: "#1f6fb2", from: 1, to: 3.2 },
          { kind: "label", at: [230, 300], text: "爱油的尾巴", side: "bottom", color: "#a86a00", from: 1.8, to: 3.2 },
          { kind: "shape", shape: "circle", at: [760, 520], size: [220, 220], color: "#ffe08a", from: 3.2, to: 7.4 },
          { kind: "sprite", icon: "🦠", path: [[760, 520]], from: 3.4, to: 7.4, size: 60 },
          { kind: "arrow", path: [[230, 330], [420, 480], [640, 500]], color: "#a86a00", text: "钻进油里", from: 3.8, to: 5.2 },
          {
            kind: "flow",
            path: [[910, 520], [890, 595], [835, 650], [760, 670], [685, 650], [630, 595], [610, 520], [630, 445], [685, 390], [760, 370], [835, 390], [890, 445], [910, 520]],
            color: "#4fb6ff", from: 5.4, to: 7.4, count: 14, speed: 40, size: 12
          },
          { kind: "text", at: [760, 780], text: "包成小油球", from: 5.8, to: 7.4 },
          { kind: "sprite", icon: "🫧", path: [[760, 520], [1120, 380]], from: 7.4, travel: 1, size: 120 },
          { kind: "text", at: [760, 780], text: "水一冲就走", color: "#1f6fb2", from: 7.6 }
        ]
      },
      {
        turn: 3,
        title: "拆散病毒外衣",
        view: "blank",
        duration: 11,
        cues: [
          { kind: "sprite", icon: "🫧", path: [[100, 200], [1150, 200]], from: 0.2, to: 2.4, travel: 2, size: 100 },
          { kind: "sprite", icon: "🦠", path: [[100, 200], [1150, 200]], from: 0.2, to: 2.4, travel: 2, size: 36 },
          { kind: "shape", shape: "circle", at: [400, 470], size: [220, 220], color: "#ffe08a", from: 2.4, to: 5.4 },
          { kind: "sprite", icon: "🦠", path: [[400, 470]], from: 2.6, to: 6, size: 80 },
          { kind: "label", at: [400, 360], text: "油油的外衣", side: "top", from: 3, to: 5.4 },
          {
            kind: "flow",
            path: [[530, 470], [510, 545], [455, 600], [400, 615], [345, 600], [290, 545], [270, 470], [290, 395], [345, 340], [400, 325], [455, 340], [510, 395], [530, 470]],
            color: "#4fb6ff", from: 3.8, to: 6, count: 14, speed: 60, size: 12
          },
          { kind: "sprite", icon: "💥", path: [[400, 470]], from: 5.8, size: 110 },
          { kind: "text", at: [400, 680], text: "病毒坏掉了", color: "#2f7d32", from: 6.2 },
          { kind: "count", at: [880, 470], label: "搓手时间", start: 0, end: 20, unit: "秒", from: 6.6, over: 2.8 },
          { kind: "sprite", icon: "🎂", path: [[880, 280]], from: 7.2, size: 90 },
          { kind: "text", at: [880, 650], text: "唱两遍生日歌", size: "s", from: 7.8 }
        ]
      },
      {
        turn: 4,
        title: "好细菌在站岗",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 660], size: [1000, 140], color: "#f6c9a8", text: "皮肤", from: 0.2 },
          { kind: "text", at: [600, 140], text: "肥皂加流水就够", size: "m", from: 0.4, to: 4.6 },
          { kind: "flow", path: [[200, 565], [1000, 565]], color: "#2f7d32", from: 0.9, to: 6.4, count: 6, speed: 20, size: 16 },
          { kind: "label", at: [600, 565], text: "好细菌站岗", side: "top", color: "#2f7d32", from: 1.4, to: 4.6 },
          { kind: "sprite", icon: "🦠", path: [[1100, 220], [700, 500], [1060, 160]], from: 2.4, to: 4.8, travel: 2.2, size: 50 },
          { kind: "sprite", icon: "🧴", path: [[240, 280]], from: 4.8, size: 100, wobble: true },
          { kind: "flow", path: [[300, 320], [620, 560]], color: "#9ad7ff", from: 5.2, to: 6.8, count: 8, speed: 300, size: 10 },
          { kind: "label", at: [600, 640], text: "变干、裂开", side: "bottom", color: "#e5484d", from: 6.8 },
          { kind: "sprite", icon: "🦠", path: [[1100, 220], [640, 630]], from: 7.4, travel: 1, size: 50 }
        ]
      },
      {
        turn: 5,
        title: "这些时候要洗手",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "pill", at: [210, 250], size: [220, 90], color: "#fff3d6", text: "🍚 饭前", from: 0.3 },
          { kind: "shape", shape: "pill", at: [470, 250], size: [220, 90], color: "#fff3d6", text: "🚽 便后", from: 0.9 },
          { kind: "shape", shape: "pill", at: [730, 250], size: [220, 90], color: "#fff3d6", text: "🏠 回家", from: 1.5 },
          { kind: "shape", shape: "pill", at: [990, 250], size: [220, 90], color: "#fff3d6", text: "🤧 擤鼻涕", from: 2.1 },
          { kind: "flow", path: [[600, 330], [600, 680]], icon: "🦠", from: 3.4, count: 5, speed: 150, size: 14 },
          { kind: "sprite", icon: "😮", path: [[600, 760]], from: 3.8, size: 110 }
        ]
      },
      {
        turn: 6,
        title: "别漏掉这几处",
        view: "hand",
        layers: [{ layer: "skin" }],
        camera: [{ t: 0, at: [620, 450], zoom: 1.2 }],
        duration: 9,
        cues: [
          { kind: "pulse", at: [690, 430], color: "#4fb6ff", radius: 60, from: 0.4, to: 3.4 },
          { kind: "label", at: [690, 430], text: "手指缝", pos: [880, 520], from: 0.7, to: 3.4 },
          { kind: "pulse", at: [600, 680], color: "#4fb6ff", radius: 60, from: 3.2, to: 6 },
          { kind: "label", at: [600, 680], text: "指甲缝", pos: [800, 730], from: 3.5, to: 6 },
          { kind: "pulse", at: [400, 380], color: "#4fb6ff", radius: 70, from: 5.8 },
          { kind: "label", at: [400, 380], text: "大拇指", pos: [300, 250], from: 6.1 },
          { kind: "sprite", icon: "🧼", path: [[850, 250]], from: 6.6, size: 80, wobble: true }
        ]
      }
    ]
  },
  {
    question: "fever",
    scenes: [
      {
        turn: 0,
        title: "身体故意加热",
        view: "body",
        layers: [{ layer: "skin" }],
        camera: [{ t: 0, at: [600, 250], zoom: 1.8 }],
        duration: 8,
        cues: [
          { kind: "flow", path: [[300, 70], "nose"], icon: "🦠", from: 0.3, to: 3.6, count: 4, speed: 120, size: 12 },
          { kind: "pulse", at: "chestSkin", color: "#ff9f43", radius: 160, rate: 0.8, from: 1.2 },
          { kind: "meter", at: [600, 820], label: "体温", start: 0.4, end: 0.7, color: "#ff9f43", from: 1.8, over: 2.5 },
          { kind: "text", at: [600, 90], text: "调高一点打病菌", color: "#ff9f43", from: 2.6, to: 5 },
          { kind: "sprite", icon: "🗣️", path: [[820, 170]], from: 5, size: 80 },
          { kind: "text", at: [600, 90], text: "难受就告诉大人", from: 5.3 }
        ]
      },
      {
        turn: 1,
        title: "大脑里的调节器",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "skeleton", opacity: 0.4 }, { layer: "brain", opacity: 0.55 }],
        camera: [{ t: 0, at: [520, 480], zoom: 1.3 }, { t: 1.5, at: "hypothalamus", zoom: 1.9 }],
        duration: 9,
        cues: [
          { kind: "highlight", at: "hypothalamus", color: "#ff9f43", from: 0.4 },
          { kind: "sprite", icon: "🎛️", path: [{ a: "hypothalamus", dx: -130, dy: -100 }], from: 1, size: 60 },
          { kind: "label", at: "hypothalamus", text: "温度调节器", side: "right", from: 1.6 },
          { kind: "count", at: [950, 720], label: "目标温度", start: 37, end: 37, unit: "℃", from: 2.4, to: 5.6 },
          { kind: "flow", path: [[420, 720], [470, 560], "hypothalamus"], color: "#ffcf3f", from: 3.4, to: 7, count: 6, speed: 200 },
          { kind: "text", at: [300, 760], text: "调高点！", color: "#ff9f43", from: 4.4 },
          { kind: "count", at: [950, 720], label: "目标温度", start: 37, end: 39, unit: "℃", from: 5.6, over: 1.8 }
        ]
      },
      {
        turn: 2,
        title: "发抖来产热",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.45 }, { layer: "muscles", opacity: 0.75, from: 2.6, to: 8.2, motion: "beat", rate: 5 }],
        camera: [{ t: 0, at: [600, 450], zoom: 1.1 }],
        duration: 10,
        cues: [
          { kind: "count", at: [960, 200], label: "目标温度", start: 39, end: 39, unit: "℃", from: 0.3 },
          { kind: "count", at: [960, 400], label: "身上温度", start: 37, end: 37, unit: "℃", from: 0.9, to: 6.4 },
          { kind: "text", at: [300, 120], text: "太冷了！", color: "#4fb6ff", from: 1.6, to: 3.2 },
          { kind: "label", at: "quads", text: "肌肉一缩一松", side: "right", from: 2.8, to: 6.2 },
          { kind: "pulse", at: "chestSkin", color: "#ff9f43", radius: 120, from: 3.4, to: 6.2 },
          { kind: "pulse", at: "wrist", color: "#4fb6ff", radius: 60, from: 4.4, to: 6.2 },
          { kind: "label", at: "wrist", text: "血管缩紧手冰凉", side: "left", color: "#1f6fb2", from: 4.8, to: 6.2 },
          { kind: "count", at: [960, 400], label: "身上温度", start: 37, end: 39, unit: "℃", from: 6.4, over: 2 },
          { kind: "text", at: [300, 120], text: "不冷了", color: "#2f7d32", from: 8.4 }
        ]
      },
      {
        turn: 3,
        title: "给卫兵加油",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "text", at: [600, 120], text: "体温高一点", color: "#ff9f43", from: 0.3 },
          { kind: "shape", shape: "circle", at: [300, 400], size: [200, 200], color: "#8bc34a", text: "病菌", motion: "shrink", over: 3, from: 0.8 },
          { kind: "meter", at: [300, 650], label: "病菌长得", start: 0.8, end: 0.35, color: "#8bc34a", from: 1.2, over: 2.6 },
          { kind: "shape", shape: "circle", at: [870, 400], size: [220, 220], color: "#e8f4ff", text: "白细胞", outline: true, motion: "pulse", from: 3.8 },
          { kind: "meter", at: [870, 650], label: "白细胞干劲", start: 0.4, end: 0.95, color: "#4fb6ff", from: 4.4, over: 2 },
          { kind: "arrow", path: [[750, 400], [430, 400]], color: "#4fb6ff", text: "跑得更快", from: 6.4 }
        ]
      },
      {
        turn: 4,
        title: "不是越高越好",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "myth", wrong: "烧得越高越好", right: "大脑管着，不会一直往上冲", from: 0.3, to: 4.2 },
          { kind: "shape", shape: "pill", at: [250, 300], size: [240, 90], color: "#ffe1e1", text: "🍚 吃不下", from: 4.4, to: 6.4 },
          { kind: "shape", shape: "pill", at: [600, 300], size: [240, 90], color: "#ffe1e1", text: "😴 睡不好", from: 4.9, to: 6.4 },
          { kind: "shape", shape: "pill", at: [950, 300], size: [240, 90], color: "#ffe1e1", text: "💧 缺水", from: 5.4, to: 6.4 },
          { kind: "sprite", icon: "💊", path: [[350, 420]], from: 6.6, size: 100 },
          { kind: "text", at: [350, 580], text: "让你舒服些", size: "s", from: 7 },
          { kind: "sprite", icon: "💪", path: [[850, 420]], from: 7.4, size: 100 },
          { kind: "text", at: [850, 580], text: "病菌靠身体打", size: "s", color: "#2f7d32", from: 7.8 }
        ]
      },
      {
        turn: 5,
        title: "中暑不一样",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🥵", path: [[850, 380]], from: 0.3, size: 140 },
          { kind: "label", at: [850, 380], text: "中暑：热散不出", pos: [850, 580], color: "#e5484d", from: 1, to: 6.2 },
          { kind: "pulse", at: [850, 380], color: "#e5484d", radius: 130, from: 1.8, to: 6.2 },
          { kind: "sprite", icon: "🎛️", path: [[330, 380]], from: 3.6, size: 130 },
          { kind: "label", at: [330, 380], text: "发烧：有计划", pos: [330, 580], color: "#c26a00", from: 4.2, to: 6.2 },
          { kind: "text", at: [850, 700], text: "🌳 快去阴凉处", size: "s", color: "#2f7d32", from: 6.4 },
          { kind: "text", at: [330, 700], text: "别捂汗", size: "s", color: "#c26a00", from: 7.2 }
        ]
      },
      {
        turn: 6,
        title: "多喝水多休息",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "💧", path: [[380, 260]], from: 0.3, size: 110 },
          { kind: "sprite", icon: "🛌", path: [[820, 260]], from: 0.9, size: 110 },
          { kind: "text", at: [600, 420], text: "多喝水 多休息", color: "#2f7d32", from: 1.4, to: 3.4 },
          { kind: "shape", shape: "pill", at: [250, 560], size: [240, 90], color: "#ffe1e1", text: "😵 精神差", from: 3.6 },
          { kind: "shape", shape: "pill", at: [600, 560], size: [240, 90], color: "#ffe1e1", text: "😫 喘不上气", from: 4.1 },
          { kind: "shape", shape: "pill", at: [950, 560], size: [240, 90], color: "#ffe1e1", text: "⚡ 抽筋", from: 4.6 },
          { kind: "text", at: [600, 760], text: "马上去看医生", color: "#e5484d", from: 5.6 }
        ]
      }
    ]
  },
  {
    question: "vaccine",
    scenes: [
      {
        turn: 0,
        title: "提前认识病菌",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🦟", path: [[260, 260]], from: 0.3, to: 3.4, size: 90, wobble: true },
          { kind: "meter", at: [260, 450], label: "疼一下", start: 0.7, end: 0.05, color: "#ff9f43", from: 0.9, to: 3.4, over: 2 },
          { kind: "text", at: [260, 560], text: "很快就过去", size: "s", from: 1.6, to: 3.4 },
          { kind: "shape", shape: "circle", at: [380, 460], size: [220, 220], color: "#e8f4ff", text: "身体卫兵", outline: true, from: 3.6 },
          { kind: "sprite", icon: "🦠", path: [[1150, 460], [560, 460]], from: 4.2, to: 6.6, travel: 1.6, size: 80 },
          { kind: "text", at: [600, 180], text: "一下就认出来", color: "#2f7d32", from: 5.4 },
          { kind: "sprite", icon: "💥", path: [[560, 460]], from: 6.6, size: 140 }
        ]
      },
      {
        turn: 1,
        title: "疫苗里的样子",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "💉", path: [[600, 140]], from: 0.3, to: 3, size: 70 },
          { kind: "shape", shape: "pill", at: [250, 330], size: [220, 90], color: "#d7efb8", text: "一小块", from: 0.8 },
          { kind: "shape", shape: "pill", at: [600, 330], size: [220, 90], color: "#d7efb8", text: "死掉的", from: 1.4 },
          { kind: "shape", shape: "pill", at: [950, 330], size: [220, 90], color: "#d7efb8", text: "变弱的", from: 2 },
          { kind: "text", at: [600, 470], text: "不会让你生病", color: "#2f7d32", from: 3, to: 5.4 },
          { kind: "shape", shape: "circle", at: [400, 660], size: [200, 200], color: "#e8f4ff", text: "白细胞", outline: true, motion: "wiggle", from: 5 },
          { kind: "arrow", path: [[500, 600], [600, 390]], color: "#1f6fb2", text: "拿它当敌人练", from: 5.8 }
        ]
      },
      {
        turn: 2,
        title: "抗体像钥匙",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [200, 450], size: [200, 200], color: "#e8f4ff", text: "白细胞", outline: true, from: 0.3, to: 5 },
          { kind: "flow", path: [[300, 450], [560, 450]], color: "#b48cff", from: 0.9, to: 4.6, count: 5, speed: 140, size: 12 },
          { kind: "text", at: [420, 280], text: "造出抗体", color: "#7a4fd6", from: 1.4, to: 4.6 },
          { kind: "sprite", icon: "🦠", path: [[820, 460]], from: 2.2, size: 170 },
          { kind: "sprite", icon: "🔒", path: [[760, 390]], from: 2.8, size: 56 },
          { kind: "sprite", icon: "🔑", path: [[560, 450], [720, 400]], from: 4.4, travel: 0.8, size: 56 },
          { kind: "text", at: [820, 660], text: "粘上就没法捣乱", color: "#2f7d32", from: 5.2 },
          { kind: "text", at: [600, 120], text: "一把钥匙一把锁", color: "#7a4fd6", from: 6.4 }
        ]
      },
      {
        turn: 3,
        title: "记忆细胞记住它",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 270], size: [230, 230], color: "#e8f4ff", text: "记忆细胞", outline: true, motion: "pulse", from: 0.3 },
          { kind: "sprite", icon: "📒", path: [[740, 180]], from: 0.9, size: 64 },
          { kind: "text", at: [600, 450], text: "记住很多年", size: "s", from: 1.6, to: 2.8 },
          { kind: "meter", at: [330, 620], label: "第一次", start: 0, end: 1, color: "#b48cff", from: 3, over: 4 },
          { kind: "text", at: [330, 720], text: "一两个星期", size: "s", from: 3.4 },
          { kind: "meter", at: [870, 620], label: "下一次", start: 0, end: 1, color: "#2f7d32", from: 4.6, over: 1 },
          { kind: "text", at: [870, 720], text: "几天就造好", size: "s", color: "#2f7d32", from: 5.2 }
        ]
      },
      {
        turn: 4,
        title: "多打几针记更牢",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "📖", path: [[600, 170]], from: 0.3, size: 90 },
          { kind: "text", at: [600, 300], text: "多复习才记牢", size: "s", from: 0.8, to: 3.2 },
          { kind: "shape", shape: "pill", at: [250, 470], size: [200, 90], color: "#efe6ff", text: "第1针", from: 1.6 },
          { kind: "meter", at: [600, 680], label: "记得牢", start: 0, end: 0.35, color: "#b48cff", from: 1.8, to: 3.6, over: 1.2 },
          { kind: "shape", shape: "pill", at: [600, 470], size: [200, 90], color: "#efe6ff", text: "第2针", from: 3.4 },
          { kind: "meter", at: [600, 680], label: "记得牢", start: 0.35, end: 0.7, color: "#b48cff", from: 3.6, to: 5.6, over: 1.2 },
          { kind: "shape", shape: "pill", at: [950, 470], size: [200, 90], color: "#efe6ff", text: "第3针", from: 5.4 },
          { kind: "meter", at: [600, 680], label: "记得牢", start: 0.7, end: 1, color: "#2f7d32", from: 5.6, over: 1.2 },
          { kind: "text", at: [600, 820], text: "按时间表去打", size: "s", from: 7.2 }
        ]
      },
      {
        turn: 5,
        title: "红肿是在练习",
        view: "arm",
        layers: [{ layer: "skin" }],
        camera: [{ t: 0, at: [560, 300], zoom: 1.8 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: [520, 190], color: "#ff5a5f", radius: 80, rate: 0.9, from: 0.4 },
          { kind: "flow", path: [[420, 540], [520, 190]], color: "#ffffff", from: 0.8, count: 6, speed: 110, size: 12 },
          { kind: "flow", path: [[780, 440], [530, 200]], color: "#ffffff", from: 1.1, count: 6, speed: 110, size: 12 },
          { kind: "label", at: [520, 190], text: "卫兵来集合", side: "right", from: 1.6, to: 3.6 },
          { kind: "label", at: [520, 190], text: "红、肿、有点疼", side: "right", color: "#e5484d", from: 3.8 },
          { kind: "text", at: [600, 820], text: "可能有点低烧", size: "s", color: "#ff9f43", from: 5, to: 7.2 },
          { kind: "text", at: [600, 110], text: "一两天就好", color: "#2f7d32", from: 6.2 },
          { kind: "text", at: [600, 820], text: "烧得厉害要告诉大人", size: "s", from: 7.4 }
        ]
      },
      {
        turn: 6,
        title: "围成一道墙",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "sprite", icon: "🤒", path: [[200, 300]], from: 0.3, to: 4.4, size: 110 },
          { kind: "sprite", icon: "🧒", path: [[720, 300]], from: 0.6, to: 4.4, size: 110 },
          { kind: "sprite", icon: "🛡️", path: [[800, 230]], from: 1.2, to: 4.4, size: 56 },
          { kind: "sprite", icon: "🦠", path: [[270, 300], [630, 300], [320, 150]], from: 1.8, to: 4.2, travel: 1.8, size: 50 },
          { kind: "text", at: [460, 520], text: "病菌过不去", color: "#2f7d32", from: 2.8, to: 4.4 },
          { kind: "flow", path: [[0, 430], [1200, 430]], icon: "🧑", from: 4.6, count: 8, speed: 0, size: 26 },
          { kind: "sprite", icon: "👶", path: [[600, 650]], from: 5.2, size: 100 },
          { kind: "sprite", icon: "🦠", path: [[600, 70], [600, 330], [380, 110]], from: 6, travel: 1.8, size: 50 },
          { kind: "text", at: [600, 820], text: "大家一起围成墙", color: "#2f7d32", from: 7 }
        ]
      }
    ]
  },
  {
    question: "allergy",
    scenes: [
      {
        turn: 0,
        title: "卫兵认错了人",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [250, 450], size: [220, 220], color: "#e8f4ff", text: "白细胞", outline: true, from: 0.3 },
          { kind: "sprite", icon: "🦠", path: [[820, 280]], from: 0.8, to: 3.6, size: 90 },
          { kind: "arrow", path: [[370, 420], [730, 300]], color: "#2f7d32", text: "打病菌 ✔", from: 1.4, to: 3.6 },
          { kind: "sprite", icon: "🥜", path: [[820, 580]], from: 3.8, size: 100 },
          { kind: "label", at: [820, 580], text: "没有害处", pos: [1020, 720], color: "#2f7d32", from: 4.3 },
          { kind: "arrow", path: [[370, 480], [730, 570]], color: "#e5484d", text: "认错了！", from: 5 },
          { kind: "sprite", icon: "😣", path: [[250, 230]], from: 6.2, size: 90 },
          { kind: "text", at: [600, 110], text: "这就叫过敏", color: "#e5484d", from: 6.8 }
        ]
      },
      {
        turn: 1,
        title: "警报物质惹的祸",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.6 }, { layer: "airway", opacity: 0.8 }],
        camera: [{ t: 0, at: [600, 230], zoom: 2.2 }],
        duration: 9,
        cues: [
          { kind: "pulse", at: "chestSkin", color: "#ff5a5f", radius: 140, from: 0.3, to: 2.8 },
          { kind: "text", at: [600, 820], text: "放出警报物质", color: "#e5484d", from: 0.5, to: 2.8 },
          { kind: "flow", path: [[488, 235], [522, 305]], color: "#ff5a5f", from: 1.8, count: 4, speed: 0, size: 5 },
          { kind: "label", at: "biceps", text: "红疙瘩、发痒", side: "left", color: "#e5484d", from: 2.2, to: 5.2 },
          { kind: "flow", path: ["nose", [600, 140]], color: "#9ad7ff", from: 3.6, count: 3, speed: 40, size: 5 },
          { kind: "label", at: "nose", text: "流鼻涕、喷嚏", side: "right", from: 3.9 },
          { kind: "highlight", at: "trachea", color: "#ff5a5f", pad: 8, from: 5.4 },
          { kind: "label", at: "trachea", text: "气管肿、缩紧", side: "right", color: "#e5484d", from: 5.8 }
        ]
      },
      {
        turn: 2,
        title: "警报本来是帮忙",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 300], size: [1000, 120], color: "#ffd0d0", text: "血管", from: 0.3 },
          { kind: "flow", path: [[100, 300], [1100, 300]], color: "#ffffff", from: 0.8, count: 6, speed: 120, size: 14 },
          { kind: "sprite", icon: "🦠", path: [[720, 580]], from: 1.6, to: 6, size: 80, wobble: true },
          { kind: "flow", path: [[620, 340], [700, 540]], color: "#ffffff", from: 2.4, to: 6, count: 4, speed: 80, size: 14 },
          { kind: "label", at: [650, 420], text: "漏水，卫兵钻出", pos: [370, 520], from: 2.8, to: 6 },
          { kind: "text", at: [600, 780], text: "对付病菌很有用", color: "#2f7d32", from: 4, to: 6 },
          { kind: "sprite", icon: "🥜", path: [[500, 590]], from: 6.2, size: 90 },
          { kind: "sprite", icon: "🌸", path: [[720, 590]], from: 6.6, size: 90 },
          { kind: "text", at: [600, 780], text: "没害处还闹大动静", color: "#e5484d", from: 7.2 }
        ]
      },
      {
        turn: 3,
        title: "不是太弱是太敏感",
        view: "blank",
        duration: 10,
        cues: [
          { kind: "myth", wrong: "卫兵太弱才会过敏", right: "是太敏感，反应过头了", from: 0.3, to: 3.8 },
          { kind: "sprite", icon: "🥜", path: [[200, 470]], from: 4, size: 90 },
          { kind: "label", at: [200, 470], text: "记成了敌人", side: "bottom", color: "#e5484d", from: 4.4, to: 6.4 },
          { kind: "shape", shape: "circle", at: [760, 480], size: [300, 300], color: "#ffe8cc", text: "警报细胞", from: 4.8 },
          { kind: "flow", path: [[280, 470], [590, 470]], color: "#b48cff", from: 5.4, to: 8, count: 5, speed: 140, size: 12 },
          {
            kind: "flow",
            path: [[915, 480], [894, 558], [838, 614], [760, 635], [682, 614], [626, 558], [605, 480], [626, 402], [682, 346], [760, 325], [838, 346], [894, 402], [915, 480]],
            color: "#b48cff", from: 6.4, count: 12, speed: 0, size: 12
          },
          { kind: "label", at: [760, 325], text: "抗体像小地雷", pos: [760, 190], color: "#7a4fd6", from: 6.8 }
        ]
      },
      {
        turn: 4,
        title: "一碰就引爆",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 450], size: [300, 300], color: "#ffe8cc", text: "警报细胞", from: 0.2 },
          {
            kind: "flow",
            path: [[755, 450], [734, 528], [678, 584], [600, 605], [522, 584], [466, 528], [445, 450], [466, 372], [522, 316], [600, 295], [678, 316], [734, 372], [755, 450]],
            color: "#b48cff", from: 0.4, count: 12, speed: 0, size: 12
          },
          { kind: "sprite", icon: "🥜", path: [[100, 150], [470, 330]], from: 1.2, to: 3.2, travel: 1.4, size: 50 },
          { kind: "sprite", icon: "💥", path: [[600, 450]], from: 2.8, to: 4.6, size: 200 },
          { kind: "flow", path: [[600, 450], [100, 180]], color: "#ff5a5f", from: 3.2, count: 8, speed: 420, size: 10 },
          { kind: "flow", path: [[600, 450], [1100, 760]], color: "#ff5a5f", from: 3.2, count: 8, speed: 420, size: 10 },
          { kind: "text", at: [600, 100], text: "几分钟到一两小时", from: 5 },
          { kind: "text", at: [600, 820], text: "一点点也会发作", color: "#e5484d", from: 6.2 }
        ]
      },
      {
        turn: 5,
        title: "最严重时很危险",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, { layer: "arteries", opacity: 0.9 }],
        camera: [{ t: 0, at: [600, 300], zoom: 1.3 }],
        duration: 10,
        cues: [
          { kind: "pulse", at: "heart", color: "#ff5a5f", radius: 220, rate: 0.8, from: 0.3, to: 4.2 },
          { kind: "meter", at: [960, 200], label: "血压", start: 0.8, end: 0.25, color: "#ff5a5f", from: 0.8, to: 5.8, over: 2.5 },
          { kind: "highlight", at: "throat", color: "#ff5a5f", pad: 10, from: 2 },
          { kind: "label", at: "throat", text: "喉咙肿", side: "right", color: "#e5484d", from: 2.4, to: 5.8 },
          { kind: "sprite", icon: "📞", path: [[300, 250]], from: 4.6, size: 90 },
          { kind: "text", at: [210, 480], text: "打急救电话", color: "#e5484d", from: 5 },
          { kind: "sprite", icon: "🖊️", path: [[900, 420]], from: 6, size: 90 },
          { kind: "text", at: [990, 690], text: "急救笔压住症状", size: "s", from: 6.4 }
        ]
      },
      {
        turn: 6,
        title: "为什么只有一些人",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "❓", path: [[600, 220]], from: 0.3, to: 2.6, size: 110 },
          { kind: "text", at: [600, 380], text: "科学家还没弄懂", size: "s", from: 0.8, to: 2.6 },
          { kind: "shape", shape: "pill", at: [320, 300], size: [240, 100], color: "#efe6ff", text: "🧬 遗传", from: 2.8 },
          { kind: "shape", shape: "pill", at: [880, 300], size: [240, 100], color: "#e3f4df", text: "🏡 环境", from: 3.6 },
          { kind: "sprite", icon: "👶", path: [[520, 590]], from: 5, size: 110 },
          { kind: "sprite", icon: "🥜", path: [[650, 620]], from: 5.4, size: 50 },
          { kind: "text", at: [600, 790], text: "医生指导，早点少量", size: "s", color: "#2f7d32", from: 6 }
        ]
      }
    ]
  },
  {
    question: "mosquito-bite",
    scenes: [
      {
        turn: 0,
        title: "蚊子先吐一点口水",
        view: "leg",
        layers: ["skin"],
        camera: [{ t: 0, at: "calf", zoom: 1.65 }],
        duration: 8,
        cues: [
          { kind: "sprite", icon: "🦟", path: [[820, 420], "calf"], travel: 1.4, size: 64, from: 0.3 },
          { kind: "pulse", at: "calf", color: "#ff5a5f", radius: 55, from: 2 },
          { kind: "label", at: "calf", text: "吐一点防凝血口水", side: "left", color: "#e5484d", from: 2.6 },
          { kind: "text", at: [600, 810], text: "红包是身体立起的临时工事", color: "#7a6a55", from: 4.6 }
        ]
      },
      {
        turn: 1,
        title: "卫兵放组胺调救兵",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "circle", at: [320, 360], size: [170, 170], color: "#ffe08a", text: "卫兵", from: 0.4 },
          { kind: "flow", path: [[410, 360], [600, 520]], color: "#ff9f43", count: 7, speed: 200, from: 1.2 },
          { kind: "label", at: [505, 440], text: "放出组胺报警", side: "top", from: 1.6, to: 5 },
          { kind: "shape", shape: "pill", at: [600, 600], size: [760, 100], color: "#ffb3ba", text: "血管放大", motion: "grow", over: 1.4, from: 2.6 },
          { kind: "shape", shape: "circle", at: [600, 410], size: [260, 130], color: "#ff8a8a", text: "鼓起红包", from: 4.2 },
          { kind: "text", at: [600, 790], text: "白细胞和液体涌出来围剿", color: "#e5484d", from: 5 }
        ]
      },
      {
        turn: 2,
        title: "顺手碰响报痒神经",
        view: "leg",
        layers: [{ layer: "skin", opacity: 0.4 }, "nerves"],
        camera: [{ t: 0, at: "calf", zoom: 1.5 }],
        duration: 8,
        cues: [
          { kind: "pulse", at: "calf", color: "#ff9f43", radius: 65, from: 0.4 },
          { kind: "label", at: "calf", text: "组胺碰响报痒神经", side: "left", from: 1 },
          { kind: "flow", path: ["calf", "knee", "sciatic"], color: "#ffcf3f", count: 7, speed: 240, from: 2.2 },
          { kind: "text", at: [600, 810], text: "蚊子飞走了，警报还在响", color: "#ff9f43", from: 4.4 }
        ]
      },
      {
        turn: 3,
        title: "越抓越痒的怪圈",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "pill", at: [300, 400], size: [250, 100], color: "#ffd6bf", text: "💅 抓两下", from: 0.4 },
          { kind: "arrow", path: [[440, 360], [740, 300]], text: "轻疼盖住痒", from: 1.2 },
          { kind: "shape", shape: "pill", at: [880, 300], size: [260, 96], color: "#ffe08a", text: "爽两秒钟", from: 2 },
          { kind: "arrow", path: [[880, 360], [640, 580]], color: "#ff5a5f", text: "挤出更多组胺", from: 3.2 },
          { kind: "shape", shape: "circle", at: [540, 620], size: [210, 130], color: "#ff8a8a", text: "更痒啦！", motion: "pulse", from: 4.2 },
          { kind: "text", at: [600, 810], text: "掉进越抓越痒的怪圈", color: "#e5484d", from: 5.2 }
        ]
      },
      {
        turn: 4,
        title: "掐十字也怕抓破皮",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 340], size: [210, 210], color: "#ff9e9e", text: "➕", from: 0.4, to: 4.8 },
          { kind: "sprite", icon: "🦠", path: [[760, 250]], size: 76, wobble: true, from: 1.8, to: 4.8 },
          { kind: "myth", wrong: "掐个十字架就能彻底止痒", right: "只是疼几秒，抓破皮还会发炎", from: 5 }
        ]
      },
      {
        turn: 5,
        title: "冷敷止痒最管用",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🧊", path: [[300, 360]], size: 105, from: 0.4 },
          { kind: "text", at: [300, 510], text: "毛巾裹冰冷敷", size: "s", color: "#4fb6ff", from: 1 },
          { kind: "sprite", icon: "🧴", path: [[620, 360]], size: 96, from: 2.2 },
          { kind: "text", at: [620, 510], text: "涂炉甘石洗剂", size: "s", color: "#2f7d32", from: 2.8 },
          { kind: "sprite", icon: "🏃", path: [[930, 360]], size: 96, from: 3.8 },
          { kind: "text", at: [930, 510], text: "汗多气重招蚊子", size: "s", color: "#ff9f43", from: 4.4 },
          { kind: "text", at: [600, 770], text: "让血管和报痒神经冷静下来", color: "#2f7d32", from: 5.6 }
        ]
      }
    ]
  },
  {
    question: "sore-throat",
    scenes: [
      {
        turn: 0,
        title: "咽喉边的边防哨所",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.35 }, "mouth", "immune"],
        camera: [{ t: 0, at: "tonsils", zoom: 1.85 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "tonsils", color: "#ff9f43", from: 0.4 },
          { kind: "label", at: "tonsils", text: "扁桃体：边防哨所", side: "right", from: 1 },
          { kind: "flow", path: ["nose", "tonsils"], color: "#4fb6ff", count: 5, speed: 170, from: 2.2 },
          { kind: "text", at: [600, 810], text: "守在空气和食物进门路口", color: "#2f7d32", from: 4.4 }
        ]
      },
      {
        turn: 1,
        title: "张大嘴就能看见",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "circle", at: [600, 450], size: [540, 440], color: "#ffb3c1", outline: true, from: 0.3 },
          { kind: "shape", shape: "pill", at: [600, 590], size: [300, 150], color: "#ff8fa3", text: "舌头", from: 0.8 },
          { kind: "shape", shape: "circle", at: [410, 430], size: [96, 130], color: "#ff6b8b", text: "扁桃体", from: 1.5 },
          { kind: "shape", shape: "circle", at: [790, 430], size: [96, 130], color: "#ff6b8b", text: "扁桃体", from: 1.8 },
          { kind: "sprite", icon: "🛡️", path: [[410, 310]], size: 60, from: 3 },
          { kind: "sprite", icon: "🛡️", path: [[790, 310]], size: 60, from: 3.3 },
          { kind: "text", at: [600, 800], text: "住满白细胞卫兵盘查病菌", color: "#2f7d32", from: 4.4 }
        ]
      },
      {
        turn: 2,
        title: "哨所扩军肿又疼",
        view: "head",
        layers: [{ layer: "skin", opacity: 0.3 }, "mouth", "arteries", "immune"],
        camera: [{ t: 0, at: "tonsils", zoom: 1.85 }],
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "🦠", path: [[600, 500], "tonsils"], travel: 1.2, size: 46, from: 0.4, to: 3.6 },
          { kind: "pulse", at: "tonsils", color: "#e5484d", radius: 65, from: 1.6 },
          { kind: "label", at: "tonsils", text: "充血胀大打大仗", side: "left", color: "#e5484d", from: 2.2 },
          { kind: "text", at: [600, 810], text: "一咽口水挤到它就疼", color: "#e5484d", from: 4.6 }
        ]
      },
      {
        turn: 3,
        title: "脖子里的二线军营",
        view: "body",
        layers: [{ layer: "skin", opacity: 0.35 }, "immune"],
        camera: [{ t: 0, at: "lymphNeck", zoom: 2.1 }],
        duration: 8.5,
        cues: [
          { kind: "flow", path: ["tonsils", "lymphNeck"], color: "#b48cff", count: 5, speed: 150, from: 0.4 },
          { kind: "highlight", at: "lymphNeck", color: "#7a4fd6", from: 1.4 },
          { kind: "label", at: "lymphNeck", text: "淋巴结：训练造抗体", side: "left", color: "#7a4fd6", from: 2 },
          { kind: "text", at: [600, 810], text: "军营忙起来鼓成小豆包", color: "#7a4fd6", from: 4.6 }
        ]
      },
      {
        turn: 4,
        title: "打赢仗慢慢缩回去",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "circle", at: [380, 420], size: [200, 200], color: "#ff8fa3", text: "打仗肿大", from: 0.4 },
          { kind: "arrow", path: [[510, 420], [690, 420]], text: "打跑病菌", from: 1.8 },
          { kind: "shape", shape: "circle", at: [820, 420], size: [120, 120], color: "#b7e4a8", text: "恢复原样", motion: "shrink", over: 1.5, from: 2.8 },
          { kind: "text", at: [600, 760], text: "是卫兵认真干活的标志", color: "#2f7d32", from: 4.6 }
        ]
      },
      {
        turn: 5,
        title: "分清病毒还是细菌",
        view: "blank",
        duration: 9,
        cues: [
          { kind: "sprite", icon: "🔦", path: [[340, 320]], size: 96, from: 0.4, to: 5 },
          { kind: "sprite", icon: "🧪", path: [[600, 320]], size: 96, from: 1.2, to: 5 },
          { kind: "sprite", icon: "🍵", path: [[860, 320]], size: 96, from: 2, to: 5 },
          { kind: "text", at: [600, 470], text: "看清敌人再出手，温水润嗓", size: "s", color: "#2f7d32", from: 2.6, to: 5 },
          { kind: "myth", wrong: "一嗓子疼就自己吃抗生素", right: "多数是病毒，抗生素对病毒没用", from: 5.2 }
        ]
      }
    ]
  },
  {
    question: "earwax",
    scenes: [
      {
        turn: 0,
        title: "耳屎是天然保护膏",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, "ears"],
        camera: [{ t: 0, at: "ear", zoom: 2.1 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "ear", color: "#ff9f43", from: 0.4 },
          { kind: "label", at: "ear", text: "耵聍：耳道保护膏", side: "right", from: 1 },
          { kind: "text", at: [600, 810], text: "不是脏东西，是耳道自己调配的", color: "#2f7d32", from: 4.2 }
        ]
      },
      {
        turn: 1,
        title: "粘灰尘还能赶小虫",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "rect", at: [600, 440], size: [760, 180], color: "#ffe8b3", outline: true, text: "保护膏管壁", from: 0.3 },
          { kind: "sprite", icon: "🌫️", path: [[180, 420], [440, 420]], travel: 1.2, size: 70, from: 0.9 },
          { kind: "sprite", icon: "🦟", path: [[180, 480], [360, 480], [180, 320]], travel: 1.6, size: 68, from: 2 },
          { kind: "text", at: [600, 760], text: "粘灰尘、挡飞虫，还能抑菌！", color: "#2f7d32", from: 4.2 }
        ]
      },
      {
        turn: 2,
        title: "耳道自带自动传送带",
        view: "headSide",
        layers: [{ layer: "skin", opacity: 0.35 }, "skeleton", "ears"],
        camera: [{ t: 0, at: "ear", zoom: 1.9 }],
        duration: 8.5,
        cues: [
          { kind: "flow", path: ["eardrum", [520, 535]], color: "#ff9f43", count: 5, speed: 120, from: 0.5 },
          { kind: "label", at: "eardrum", text: "表皮从里往外长", side: "right", from: 1.2 },
          { kind: "pulse", at: [480, 650], color: "#4fb6ff", radius: 50, from: 2.6 },
          { kind: "text", at: [600, 810], text: "说话咀嚼推着旧耳屎自己掉出来", color: "#2f7d32", from: 4.4 }
        ]
      },
      {
        turn: 3,
        title: "棉签反而往深处怼",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "rect", at: [880, 340], size: [40, 220], color: "#ffb3ba", text: "鼓膜", from: 0.3, to: 4.8 },
          { kind: "arrow", path: [[320, 340], [780, 340]], color: "#e5484d", text: "推土棍往里怼", from: 1, to: 4.8 },
          { kind: "shape", shape: "circle", at: [815, 340], size: [90, 150], color: "#b58338", text: "堵严", from: 2.2, to: 4.8 },
          { kind: "myth", wrong: "洗完澡拿棉签伸进耳道掏干净", right: "棉签会把耳屎怼向鼓膜，还易戳伤", from: 5 }
        ]
      },
      {
        turn: 4,
        title: "干耳屎油耳屎都正常",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "pill", at: [340, 400], size: [320, 120], color: "#f5ebd6", outline: true, text: "干薄片型", from: 0.4 },
          { kind: "shape", shape: "pill", at: [860, 400], size: [320, 120], color: "#ffd36b", text: "湿润油型", from: 1.4 },
          { kind: "sprite", icon: "🧬", path: [[600, 230]], size: 84, from: 2.4 },
          { kind: "text", at: [600, 750], text: "基因决定，只擦耳朵外圈就行", color: "#2f7d32", from: 4.2 }
        ]
      }
    ]
  },
  {
    question: "good-bacteria",
    scenes: [
      {
        turn: 0,
        title: "绝大多数细菌是朋友",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "shape", shape: "circle", at: [280, 420], size: [140, 140], color: "#ffb3ba", text: "少数坏菌", from: 0.4 },
          { kind: "shape", shape: "circle", at: [760, 420], size: [380, 340], color: "#dcedc8", text: "友好细菌", from: 1.4 },
          { kind: "sprite", icon: "🤝", path: [[760, 240]], size: 88, from: 2.4 },
          { kind: "text", at: [600, 770], text: "上万亿好细菌是我们的好搭档", color: "#2f7d32", from: 4.2 }
        ]
      },
      {
        turn: 1,
        title: "大肠住着几十万亿个",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.35 }, "smallIntestine", "largeIntestine"],
        camera: [{ t: 0, at: "largeIntestine", zoom: 1.4 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "largeIntestine", color: "#2f7d32", from: 0.4 },
          { kind: "label", at: "largeIntestine", text: "大肠：微生物大本营", side: "left", color: "#2f7d32", from: 1 },
          { kind: "flow", path: [[450, 580], [450, 380], [740, 380], [740, 620]], color: "#6bcb77", count: 12, speed: 90, from: 2 },
          { kind: "text", at: [600, 820], text: "数量跟全身细胞差不多多！", color: "#2f7d32", from: 4.4 }
        ]
      },
      {
        turn: 2,
        title: "拆纤维造维K还占座",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "shape", shape: "pill", at: [250, 360], size: [260, 96], color: "#e8f5e9", text: "🥦 拆纤维", from: 0.4 },
          { kind: "shape", shape: "pill", at: [600, 360], size: [260, 96], color: "#fff3df", text: "💊 造维生素", from: 1.2 },
          { kind: "shape", shape: "pill", at: [950, 360], size: [260, 96], color: "#bfe3ff", text: "🪑 坐满座位", from: 2 },
          { kind: "sprite", icon: "🦠", path: [[600, 620], [980, 620]], travel: 1.4, size: 70, from: 3.2 },
          { kind: "text", at: [600, 790], text: "坏病菌连落脚抢粮的座都没了", color: "#2f7d32", from: 4.6 }
        ]
      },
      {
        turn: 3,
        title: "隔着黏液线认识友军",
        view: "belly",
        layers: [{ layer: "skin", opacity: 0.3 }, "largeIntestine", "immune"],
        camera: [{ t: 0, at: "largeIntestine", zoom: 1.5 }],
        duration: 8,
        cues: [
          { kind: "highlight", at: "largeIntestine", color: "#4fb6ff", from: 0.4 },
          { kind: "label", at: "largeIntestine", text: "黏液安全线外干活", side: "left", from: 1 },
          { kind: "sprite", icon: "🛡️", path: [[760, 520]], size: 72, from: 2.4 },
          { kind: "text", at: [600, 810], text: "免疫卫兵认友军，练出好眼力", color: "#7a4fd6", from: 4.2 }
        ]
      },
      {
        turn: 4,
        title: "多吃蔬果喂饱好邻居",
        view: "blank",
        duration: 8,
        cues: [
          { kind: "sprite", icon: "👶", path: [[280, 400]], size: 115, from: 0.4 },
          { kind: "arrow", path: [[380, 400], [560, 400]], text: "出生后入住", from: 1.2 },
          { kind: "sprite", icon: "🥗", path: [[720, 400]], size: 115, from: 2.2 },
          { kind: "sprite", icon: "🍎", path: [[900, 400]], size: 100, from: 2.8 },
          { kind: "text", at: [600, 750], text: "蔬果粗粮是好细菌最爱的口粮", color: "#2f7d32", from: 4.2 }
        ]
      },
      {
        turn: 5,
        title: "乱吃抗生素误伤友军",
        view: "blank",
        duration: 8.5,
        cues: [
          { kind: "sprite", icon: "💣", path: [[600, 290]], size: 110, wobble: true, from: 0.4, to: 4.8 },
          { kind: "text", at: [600, 450], text: "抗生素不分敌我，也误伤好菌", size: "s", color: "#e5484d", from: 1.2, to: 4.8 },
          { kind: "myth", wrong: "普通感冒发烧先吃两颗抗生素好得快", right: "病毒感冒没用，还会误伤肠道好细菌", from: 5 }
        ]
      }
    ]
  }
];
