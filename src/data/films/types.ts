/**
 * 讲解动画：每个问题一部短片，由几场戏组成，每场戏配对话里的一轮问答。
 *
 * 画面坐标是 1200×900。底图来自解剖图集（public/anatomy/<视角>/<图层>.webp），
 * 同一视角的图层完全对齐，可以叠着用；锚点（如 "heart"、"nose"）是图集里量好的器官位置。
 * 一场戏里的每个元素都只由时间 t 决定，所以能暂停、拖动、从任意一帧开始看。
 */

export type ViewId = "body" | "head" | "headSide" | "chest" | "belly" | "hand" | "arm" | "leg";

export type LayerId =
  | "skin" | "teeth" | "skeleton" | "diaphragm" | "muscles" | "brain" | "nerves" | "heart" | "arteries" | "veins"
  | "lungs" | "airway" | "esophagus" | "stomach" | "smallIntestine" | "largeIntestine" | "liver" | "pancreas"
  | "mouth" | "kidneys" | "eyes" | "ears" | "immune";

/** 画面上的点：坐标 [x, y]，锚点名，或者锚点加偏移 */
export type Point = readonly [number, number] | string | { readonly a: string; readonly dx?: number; readonly dy?: number };

/**
 * 图层用法。motion：beat 心跳一样一缩一放，breathe 像肺一样一鼓一瘪，churn 像胃一样揉动；
 * rate 为每秒几次，默认 beat 1.2、breathe 0.3、churn 0.5。
 */
export type LayerUse =
  | LayerId
  | {
      readonly layer: LayerId;
      readonly opacity?: number;
      readonly from?: number;
      readonly to?: number;
      readonly motion?: "beat" | "breathe" | "churn";
      readonly rate?: number;
    };

type Timed = {
  /** 出现的时间（秒，从这场戏开头算） */
  readonly from: number;
  /** 消失的时间，不写就留到这场戏结束 */
  readonly to?: number;
};

export type Cue = Timed &
  (
    /** 贴在器官上的标签，带一根引线；pos 是标签放的位置，不写就放在 side 那一边 */
    | { readonly kind: "label"; readonly at: Point; readonly text: string; readonly pos?: Point; readonly side?: "left" | "right" | "top" | "bottom"; readonly color?: string }
    /** 一圈柔光，把注意力引到某个器官上 */
    | { readonly kind: "highlight"; readonly at: string; readonly color?: string; readonly pad?: number }
    /** 一圈圈往外扩的波纹：报警、信号、心跳 */
    | { readonly kind: "pulse"; readonly at: Point; readonly color?: string; readonly radius?: number; readonly rate?: number }
    /** 一串小点（或小图标）沿路线一直流动：空气、血液、神经信号 */
    | { readonly kind: "flow"; readonly path: readonly Point[]; readonly color?: string; readonly icon?: string; readonly count?: number; readonly speed?: number; readonly size?: number }
    /** 一笔画出来的箭头，可以带一句话 */
    | { readonly kind: "arrow"; readonly path: readonly Point[]; readonly color?: string; readonly text?: string; readonly draw?: number }
    /** 一个表情图标：一个点就原地弹出来，几个点就沿路线走一趟（用 travel 秒） */
    | { readonly kind: "sprite"; readonly icon: string; readonly path: readonly Point[]; readonly size?: number; readonly travel?: number; readonly spin?: boolean; readonly wobble?: boolean }
    /** 示意图形：细胞、毛囊、小房间……可以写字 */
    | {
        readonly kind: "shape";
        readonly shape: "circle" | "rect" | "pill";
        readonly at: Point;
        readonly size: readonly [number, number];
        readonly color: string;
        readonly text?: string;
        readonly motion?: "pulse" | "wiggle" | "grow" | "shrink";
        /** grow / shrink 用几秒变完，默认 2 */
        readonly over?: number;
        readonly outline?: boolean;
      }
    /**
     * 一行大字，用来点出关键词。text、count、meter 是字幕性质的：写成 [x, y] 时指的是
     * 镜头里看到的屏幕位置（同样按 1200×900），镜头怎么推拉都留在原处；写成锚点时跟着器官走。
     */
    | { readonly kind: "text"; readonly at: Point; readonly text: string; readonly size?: "s" | "m" | "l"; readonly color?: string }
    /** 数字从 start 数到 end，比如心跳 80 → 150 */
    | { readonly kind: "count"; readonly at: Point; readonly label: string; readonly start: number; readonly end: number; readonly unit?: string; readonly over?: number }
    /** 一根进度条，从 start 涨（或落）到 end，取值 0～1 */
    | { readonly kind: "meter"; readonly at: Point; readonly label: string; readonly start: number; readonly end: number; readonly color?: string; readonly over?: number }
    /** 常见误会：先写错误的说法再划掉，然后换成正确的说法 */
    | { readonly kind: "myth"; readonly wrong: string; readonly right: string }
  );

/** 镜头：在 t 秒时对准 at，放大 zoom 倍；两个关键帧之间平滑推拉 */
export type CameraKey = { readonly t: number; readonly at: Point; readonly zoom: number };

export type FilmScene = {
  /** 配对话里第几轮（从 0 数） */
  readonly turn: number;
  /** 这场戏的小标题，不超过 12 个字 */
  readonly title: string;
  /** 底图视角；blank 是空白画布，只画示意图形 */
  readonly view: ViewId | "blank";
  readonly layers?: readonly LayerUse[];
  readonly camera?: readonly CameraKey[];
  /** 秒 */
  readonly duration: number;
  readonly cues: readonly Cue[];
};

export type Film = {
  readonly question: string;
  readonly scenes: readonly FilmScene[];
};
