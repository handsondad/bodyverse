import type { ScaleId } from "../types/exploration";

const captions: Record<ScaleId, string> = {
  body: "肺 → 含氧血液 → 心脏 → 全身肌肉",
  organ: "舒张时充盈，收缩时把血液推出",
  tissue: "相连的心肌细胞传递信号、共同用力",
  cell: "信号 → 钙离子变化 → 收缩结构活动",
  molecule: "肌动蛋白与肌球蛋白相互作用，肌丝相对滑动"
};

export function HeartScaleDiagram({ scale }: { scale: ScaleId }) {
  return (
    <figure className="heart-scale-figure">
      <svg viewBox="0 0 360 120" role="img" aria-label={`${captions[scale]}，简化示意，非真实比例`}>
        {scale === "body" && <>
          <path d="M75 60 H285" stroke="#b36147" strokeWidth="4" />
          <ellipse cx="70" cy="60" rx="40" ry="32" fill="#dbeeff" />
          <path d="M180 94 C110 55 150 12 180 42 C210 12 250 55 180 94Z" fill="#e95470" />
          <rect x="260" y="30" width="70" height="60" rx="18" fill="#ffe4b9" />
          <g fontSize="16" fill="#5d4e37" textAnchor="middle">
            <text x="70" y="65">肺</text><text x="180" y="110">心脏</text><text x="295" y="65">肌肉</text>
            <text x="120" y="48">→</text><text x="240" y="48">→</text>
          </g>
        </>}
        {scale === "organ" && <>
          <path d="M95 60 H150 M210 60 H270" stroke="#4d96ff" strokeWidth="9" />
          <path d="M180 98 C90 55 140 5 180 40 C220 5 270 55 180 98Z" fill="#e95470" />
          <g fontSize="15" fill="#5d4e37" textAnchor="middle">
            <text x="70" y="35">流入 →</text><text x="285" y="35">→ 流出</text><text x="180" y="116">一收一放</text>
          </g>
        </>}
        {scale === "tissue" && <>
          {[30, 125, 220].map((x) => <g key={x}>
            <rect x={x} y="35" width="110" height="50" rx="20" fill="#ffd0d8" stroke="#ae3552" strokeWidth="2" />
            <ellipse cx={x + 50} cy="60" rx="12" ry="8" fill="#ae3552" />
          </g>)}
          <path d="M140 25 V95 M235 25 V95" stroke="#4d96ff" strokeWidth="3" strokeDasharray="4 3" />
          <text x="180" y="115" textAnchor="middle" fontSize="14" fill="#5d4e37">细胞之间的连接</text>
        </>}
        {scale === "cell" && <>
          <rect x="35" y="15" width="290" height="90" rx="40" fill="#ffe3e8" stroke="#ae3552" strokeWidth="2" />
          <path d="M100 48 H260 M100 70 H260" stroke="#ae3552" strokeWidth="5" />
          <g fill="#4d96ff">{[95, 140, 185, 230, 275].map((x) => <circle key={x} cx={x} cy="30" r="4" />)}</g>
          <text x="180" y="94" textAnchor="middle" fontSize="14" fill="#5d4e37">细胞内的收缩结构</text>
        </>}
        {scale === "molecule" && <>
          <path d="M55 35 H300 M55 85 H300" stroke="#4d96ff" strokeWidth="7" />
          <path d="M100 60 H260 M145 60 L160 40 M210 60 L225 80" stroke="#ae3552" strokeWidth="8" fill="none" />
          <g fontSize="14" fill="#5d4e37" textAnchor="middle">
            <text x="180" y="20">肌动蛋白 →</text><text x="180" y="113">← 肌球蛋白 · ATP 参与循环</text>
          </g>
        </>}
      </svg>
      <figcaption>{captions[scale]}。图形仅为关系示意，不按真实形状或比例绘制。</figcaption>
    </figure>
  );
}
