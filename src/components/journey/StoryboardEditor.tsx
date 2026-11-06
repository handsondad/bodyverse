import { useState } from "react";
import { heartNodes } from "../../data/heart-exploration";
import { createHeartDraft, heartDraftKey, parseHeartDraft, scenePrompts } from "../../lib/heart-storyboard";
import type { AgeTier } from "../../types/content";
import type { HeartStoryboard, StoryboardScene } from "../../types/exploration";
import "../HeartExploration.css";

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

export function StoryboardEditor({ age }: { age: AgeTier }) {
  const [initial] = useState(() => loadDraft(age));
  const [draft, setDraft] = useState(initial.draft);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState(initial.message);
  const [error, setError] = useState(initial.error);

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
    <div className="heart-exploration storyboard">
      <p>写三格分镜，可以先画在纸上，再把画面和旁白记在这里。小朋友也可以口述，请大人代写。草稿面向 {draft.age} 岁，切换讲解深度不会改写你的作品。</p>
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
    </div>
  );
}
