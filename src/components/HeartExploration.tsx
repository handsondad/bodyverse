import { useState, type CSSProperties } from "react";
import { heartNodes, heartQuestion, recommendedScale } from "../data/heart-exploration";
import { bloodFlowPerMinute, createHeartDraft, heartDraftKey, parseHeartDraft, scenePrompts } from "../lib/heart-storyboard";
import type { AgeTier } from "../types/content";
import type { HeartStoryboard, ScaleId, StoryboardScene } from "../types/exploration";
import { HeartScaleDiagram } from "./HeartScaleDiagram";
import { Heart3DView } from "./Heart3DView";
import { RunLab } from "./RunLab";
import "./HeartExploration.css";

function loadDraft(age: AgeTier): { draft: HeartStoryboard; message: string; error: boolean } {
  try {
    const raw = window.localStorage.getItem(heartDraftKey);
    return raw
      ? { draft: parseHeartDraft(raw), message: "已恢复这台设备上保存的草稿。", error: false }
      : { draft: createHeartDraft(age), message: "", error: false };
  } catch (error) {
    console.error("心脏探索草稿读取失败", error);
    return {
      draft: createHeartDraft(age),
      message: "无法读取草稿。旧存档未被覆盖；可以继续创作并导出备份。",
      error: true
    };
  }
}

export function HeartExploration({ age }: { age: AgeTier }) {
  const [scale, setScale] = useState<ScaleId>("body");
  const [rate, setRate] = useState(80);
  const [playing, setPlaying] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [observed, setObserved] = useState(false);
  const [initial] = useState(() => loadDraft(age));
  const [draft, setDraft] = useState(initial.draft);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState(initial.message);
  const [error, setError] = useState(initial.error);
  const nodeIndex = heartNodes.findIndex((node) => node.id === scale);
  const node = heartNodes[nodeIndex];
  const flow = bloodFlowPerMinute(rate);
  const step = draft.scenes.every((scene) => scene.narration.trim()) ? 4 : observed ? 3 : nodeIndex > 0 ? 2 : 1;

  function updateDraft(patch: Partial<HeartStoryboard>) {
    setDraft((previous) => ({ ...previous, ...patch }));
    setDirty(true);
    setMessage("有未保存的修改。离开前请保存草稿或导出备份。");
    setError(false);
  }

  function updateScene(index: number, patch: Partial<StoryboardScene>) {
    updateDraft({ scenes: draft.scenes.map((scene, i) => i === index ? { ...scene, ...patch } : scene) });
  }

  function saveDraft() {
    try {
      const saved = { ...draft, savedAt: new Date().toISOString() };
      window.localStorage.setItem(heartDraftKey, JSON.stringify(saved));
      setDraft(saved);
      setDirty(false);
      setMessage("已保存到这台设备。没有上传，也没有公开发布。");
      setError(false);
    } catch (error) {
      console.error("心脏探索草稿保存失败", error);
      setMessage("保存失败，可能是浏览器禁用了存储或空间不足。内容仍在页面中，请导出备份。");
      setError(true);
    }
  }

  function exportDraft() {
    try {
      const file = new Blob([JSON.stringify({ ...draft, savedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-heart-storyboard.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("已发起 JSON 分镜下载，请确认浏览器已保存文件；本地草稿保存状态未改变。");
      setError(false);
    } catch (error) {
      console.error("心脏探索分镜导出失败", error);
      setMessage("导出失败。请先尝试保存草稿，或复制你的文字备份。");
      setError(true);
    }
  }

  return (
    <section className="heart-exploration" aria-labelledby="heart-exploration-title">
      <header>
        <p className="heart-kicker">第一站 · 从全身到分子</p>
        <h2 id="heart-exploration-title">{heartQuestion}</h2>
        <p>先猜一猜，再放大看看，最后用自己的话讲一段身体故事。</p>
      </header>
      <RunLab age={age} />
      <ol className="heart-progress" aria-label="探索路径">
        {["提出问题", "放大寻找原因", "模型中观察", "创作讲解"].map((label, index) => (
          <li key={label} aria-current={step === index + 1 ? "step" : undefined}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>
      <h3>1. 身体的放大镜</h3>
      <p>当前讲解：{age} 岁。建议先探索到“{heartNodes.find((item) => item.id === recommendedScale[age])?.title}”；所有层级都可以在大人陪伴下继续看。</p>
      <div className="heart-scale-nav" aria-label="选择观察尺度">
        {heartNodes.map((item) => (
          <button key={item.id} type="button" aria-pressed={scale === item.id} onClick={() => setScale(item.id)}>
            {item.title.split("：")[0]}
          </button>
        ))}
      </div>
      <div className="heart-scale-detail" aria-live="polite">
        <span className="heart-kicker">{node.discipline}</span>
        <h4>{node.title}</h4>
        {scale === "organ"
          ? <Heart3DView rate={rate} playing={playing} onTogglePlay={() => setPlaying(!playing)} />
          : <HeartScaleDiagram scale={scale} />}
        <p>{node.text[age]}</p>
        <p><strong>想一想：</strong>{node.question}</p>
        <details><summary>这个比喻在哪里不成立？</summary><p>{node.analogyLimit}</p></details>
      </div>
      <div className="heart-actions">
        <button type="button" disabled={nodeIndex === 0} onClick={() => setScale(heartNodes[nodeIndex - 1].id)}>退远一层</button>
        <button type="button" disabled={nodeIndex === heartNodes.length - 1} onClick={() => setScale(heartNodes[nodeIndex + 1].id)}>再放大一层</button>
      </div>

      <h3>2. 先预测，再改变模型</h3>
      <label htmlFor="heart-prediction">每次送出的血量一样时，一分钟跳得更多，送出的总量会怎样？</label>
      <select id="heart-prediction" value={prediction} onChange={(event) => {
        setPrediction(event.target.value);
        setObserved(false);
      }}>
        <option value="">选一个猜想</option>
        <option value="more">变多</option>
        <option value="same">不变</option>
        <option value="less">变少</option>
      </select>
      <div className="heart-model">
        <svg viewBox="0 0 300 130" role="img" aria-labelledby="heart-model-title">
          <title id="heart-model-title">心脏收缩与送血的简化示意，非真实解剖图</title>
          <path d="M95 65 H25 V110 H275 V65 H205" fill="none" stroke="#4d96ff" strokeWidth="7" />
          <path d="M205 40 H275 V15 H25 V40 H95" fill="none" stroke="#ff6b6b" strokeWidth="7" />
          <text x="235" y="58" fontSize="12" fill="currentColor">送出 →</text>
          <text x="28" y="98" fontSize="12" fill="currentColor">→ 回流</text>
          <g className={`heart-pump ${playing ? "is-playing" : ""}`} style={{ "--beat-duration": `${60 / rate}s` } as CSSProperties}>
            <path d="M150 103 C60 55 108 10 150 45 C192 10 240 55 150 103Z" fill="#e95470" />
          </g>
        </svg>
        <p>循环路径示意，不按真实形状或比例绘制。动画只表示节奏，不表示瓣膜和完整循环。</p>
      </div>
      <div className="heart-actions">
        <button type="button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? "暂停心跳示意" : "播放心跳示意"}</button>
      </div>
      <label htmlFor="heart-rate">模型心率：{rate} 次/分钟</label>
      <input id="heart-rate" type="range" min="60" max="140" step="10" value={rate}
        onChange={(event) => {
          setRate(Number(event.target.value));
          if (prediction) setObserved(true);
        }} />
      <output htmlFor="heart-rate" className="heart-result">
        每次送出固定为 50 毫升，一分钟共 {flow.toLocaleString("zh-CN")} 毫升。
        {(age === "10-12" || age === "13+") && <span>计算：{rate} 次/分钟 × 50 毫升/次 = {flow} 毫升/分钟。</span>}
      </output>
      <p role="status">{!prediction ? "先选猜想，再拖动滑杆观察。" : !observed ? "拖动滑杆，把结果与你的猜想对照。" :
        `${prediction === "more" ? "你的猜想与模型一致。" : "看看模型：每次送血量固定时，总量随心率增加而变多。"} 真实身体里，每次送血量也会变化；不是心跳越快越好。`}</p>
      <p className="heart-note">这是可调的教学模型，不是你的测量结果，数值不是儿童健康标准。无需跑步、憋气或按压身体来验证；身体不舒服时请告诉大人。</p>

      <h3>3. 我来当身体故事的作者</h3>
      <p>写三格分镜，可以先画在纸上，再把画面和旁白记在这里。小朋友也可以口述，请大人代写。草稿面向 {draft.age} 岁，切换讲解年龄不会改写你的作品。</p>
      <label htmlFor="heart-story-title">作品名称（不用填写真实姓名）</label>
      <input id="heart-story-title" maxLength={80} value={draft.title} onChange={(event) => updateDraft({ title: event.target.value })} />
      {draft.scenes.map((scene, index) => (
        <fieldset key={index} className="heart-scene">
          <legend>第 {index + 1} 格 · {scenePrompts[index].prompt}</legend>
          <label htmlFor={`heart-scene-scale-${index}`}>镜头尺度</label>
          <select id={`heart-scene-scale-${index}`} value={scene.nodeId} onChange={(event) => {
            const selected = heartNodes.find((item) => item.id === event.target.value);
            if (selected) updateScene(index, { nodeId: selected.id });
          }}>
            {heartNodes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
          <label htmlFor={`heart-scene-visual-${index}`}>我想画什么</label>
          <textarea id={`heart-scene-visual-${index}`} maxLength={300} rows={2} value={scene.visual} onChange={(event) => updateScene(index, { visual: event.target.value })} />
          <label htmlFor={`heart-scene-narration-${index}`}>我的讲解</label>
          <textarea id={`heart-scene-narration-${index}`} maxLength={500} rows={3} value={scene.narration} placeholder="用自己的话解释，不必照抄上面的答案。" onChange={(event) => updateScene(index, { narration: event.target.value })} />
        </fieldset>
      ))}
      <label htmlFor="heart-next-question">我还想探索的问题</label>
      <textarea id="heart-next-question" maxLength={300} rows={2} value={draft.nextQuestion} onChange={(event) => updateDraft({ nextQuestion: event.target.value })} />
      <details className="heart-preview">
        <summary>预览我的讲解</summary>
        <h4>{draft.title || "未命名作品"}</h4>
        {draft.scenes.map((scene, index) => (
          <div key={index}>
            <strong>第 {index + 1} 格 · {heartNodes.find((item) => item.id === scene.nodeId)?.title}</strong>
            <p>画面：{scene.visual || "还没设计画面"}</p>
            <p>旁白：{scene.narration || "还没写讲解"}</p>
          </div>
        ))}
        <p>下次探索：{draft.nextQuestion || "还没提出新问题"}</p>
      </details>
      <div className="heart-actions">
        <button type="button" onClick={saveDraft}>保存草稿</button>
        <button type="button" onClick={exportDraft}>导出分镜 JSON</button>
      </div>
      <p>{dirty ? "未保存" : draft.savedAt ? "本地已有存档" : "尚未保存"} · 只保存在当前浏览器，不会自动同步或公开。</p>
      <p role={error ? "alert" : "status"}>{message}</p>
      <p className="heart-note">请勿填写姓名、联系方式或身体检查数据。分享前请家长检查科学表述和隐私。导出的是可复用的文字分镜，不会自动生成视频。</p>
      <details>
        <summary>动画和视频接下来怎么接入？</summary>
        <p>这版使用自制简化示意。外部媒体需核对科学准确性、年龄适配、来源与使用许可后再收录；未来可把画面描述、镜头尺度和旁白交给视频制作流程，仍需人工审核。</p>
      </details>
    </section>
  );
}
