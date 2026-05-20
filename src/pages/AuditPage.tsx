import { useState } from "react";
import { type AgeTier, type PartId, type TrackId } from "../types/content";

export type IssueTag = "口径冲突" | "年龄跳级" | "流程断裂" | "证据不足";

type AuditEntry = {
  entryId: string;
  week: string;
  part: PartId;
  age: AgeTier;
  track: TrackId;
  tag: IssueTag;
  issue: string;
  fixId: string | null;
  closed: boolean;
  deleted: boolean;
  createdAt: string;
  deletedAt?: string;
};

type AuditForm = {
  week: string;
  part: PartId;
  age: AgeTier;
  track: TrackId;
  tag: IssueTag;
  issue: string;
};

type WeeklyReportMeta = {
  week: string;
  total: number;
  fixTotal: number;
  closureRate: number;
  tracksCovered: string;
  topTagText: string;
  keyFixCount: number;
  detailCount: number;
};

type AuditPageProps = {
  partIds: PartId[];
  ageTiers: AgeTier[];
  tracks: Array<{ id: TrackId; title: string }>;
  partLabelMap: Record<PartId, string>;
  issueTags: IssueTag[];
  issueTagClassMap: Record<IssueTag, string>;
  auditEntries: AuditEntry[];
  setAuditEntries: React.Dispatch<React.SetStateAction<AuditEntry[]>>;
  reportTemplate: "leader" | "research";
  setReportTemplate: (template: "leader" | "research") => void;
};

function getIsoWeekId(date: Date): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function isValidIsoWeekId(value: string): boolean {
  return /^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/.test(value);
}

function isoWeekIdToOrder(weekId: string): number {
  const match = weekId.match(/^(\d{4})-W(0[1-9]|[1-4]\d|5[0-3])$/);
  if (!match) return Number.NaN;
  return Number(match[1]) * 100 + Number(match[2]);
}

function makeEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildFixId(week: string, entries: AuditEntry[]): string {
  const weekMatch = week.match(/^(\d{4})-W(\d{2})$/);
  const year = weekMatch?.[1] ?? String(new Date().getFullYear());
  const weekNo = weekMatch?.[2] ?? "00";
  const prefix = `FIX-${year}-W${weekNo}-`;
  const seq = entries
    .map((entry) => entry.fixId)
    .filter((id): id is string => Boolean(id && id.startsWith(prefix)))
    .map((id) => Number(id.slice(prefix.length)))
    .filter((num) => Number.isFinite(num))
    .reduce((max, num) => Math.max(max, num), 0) + 1;
  return `${prefix}${String(seq).padStart(2, "0")}`;
}

export function AuditPage(props: AuditPageProps) {
  const {
    partIds,
    ageTiers,
    tracks,
    partLabelMap,
    issueTags,
    issueTagClassMap,
    auditEntries,
    setAuditEntries,
    reportTemplate,
    setReportTemplate,
  } = props;

  const [auditForm, setAuditForm] = useState<AuditForm>({
    week: getIsoWeekId(new Date()),
    part: "head",
    age: "10-12",
    track: "science",
    tag: "口径冲突",
    issue: "",
  });
  const [auditWeekFilter, setAuditWeekFilter] = useState("");
  const [auditTrackFilter, setAuditTrackFilter] = useState<TrackId | "all">("all");
  const [auditAgeFilter, setAuditAgeFilter] = useState<AgeTier | "all">("all");
  const [auditTagFilter, setAuditTagFilter] = useState<IssueTag | "all">("all");
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingIssue, setEditingIssue] = useState("");
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [reportPreviewText, setReportPreviewText] = useState("");

  const currentIsoWeek = getIsoWeekId(new Date());
  const trackTitleMap = Object.fromEntries(tracks.map((item) => [item.id, item.title])) as Record<TrackId, string>;

  const activeAuditEntries = auditEntries.filter((entry) => !entry.deleted);
  const deletedAuditEntries = [...auditEntries].filter((entry) => entry.deleted).sort((a, b) => (b.deletedAt ?? "").localeCompare(a.deletedAt ?? ""));
  const sortedAuditEntries = [...activeAuditEntries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const filteredAuditEntries = sortedAuditEntries.filter((entry) => {
    const weekOrder = isoWeekIdToOrder(entry.week);
    const weekOk = !auditWeekFilter || entry.week.includes(auditWeekFilter.toUpperCase());
    const trackOk = auditTrackFilter === "all" ? true : entry.track === auditTrackFilter;
    const ageOk = auditAgeFilter === "all" ? true : entry.age === auditAgeFilter;
    const tagOk = auditTagFilter === "all" ? true : entry.tag === auditTagFilter;
    return weekOk && trackOk && ageOk && tagOk;
  });

  const fixEntries = activeAuditEntries.filter((entry) => Boolean(entry.fixId));
  const closedFixEntries = activeAuditEntries.filter((entry) => entry.fixId && entry.closed);
  const auditStats = {
    total: activeAuditEntries.length,
    fixTotal: fixEntries.length,
    weekCoverage: new Set(activeAuditEntries.map((entry) => entry.week)).size,
    closureRate: fixEntries.length ? Math.round((closedFixEntries.length / fixEntries.length) * 100) : 100,
  };

  const weeklySummary = Array.from(
    filteredAuditEntries.reduce((map, entry) => {
      const current = map.get(entry.week) || { total: 0, fixTotal: 0, closedFixTotal: 0, trackSet: new Set<string>() };
      current.total += 1;
      current.trackSet.add(trackTitleMap[entry.track] ?? entry.track);
      if (entry.fixId) {
        current.fixTotal += 1;
        if (entry.closed) current.closedFixTotal += 1;
      }
      map.set(entry.week, current);
      return map;
    }, new Map<string, { total: number; fixTotal: number; closedFixTotal: number; trackSet: Set<string> }>())
  )
    .map(([week, value]) => ({
      week,
      total: value.total,
      fixTotal: value.fixTotal,
      closureRate: value.fixTotal ? Math.round((value.closedFixTotal / value.fixTotal) * 100) : 100,
      tracks: Array.from(value.trackSet).join(" / "),
    }))
    .sort((a, b) => b.week.localeCompare(a.week));

  function updateAuditForm<K extends keyof AuditForm>(key: K, value: AuditForm[K]) {
    setAuditForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleAddAuditEntry(withFix: boolean) {
    const issue = auditForm.issue.trim();
    const normalizedWeek = auditForm.week.trim().toUpperCase();

    if (!isValidIsoWeekId(normalizedWeek)) {
      window.alert("周次格式不正确，请使用 YYYY-Wxx，例如 2026-W17。");
      return;
    }

    if (withFix && !issue) {
      window.alert("请先填写问题描述，再生成 FIX 编号。");
      return;
    }

    const next: AuditEntry = {
      entryId: makeEntryId(),
      week: normalizedWeek,
      part: auditForm.part,
      age: auditForm.age,
      track: auditForm.track,
      tag: auditForm.tag,
      issue: issue || "无",
      fixId: withFix ? buildFixId(normalizedWeek, auditEntries) : null,
      closed: true,
      deleted: false,
      createdAt: new Date().toISOString(),
    };

    setAuditEntries((prev) => [next, ...prev]);
    setAuditForm((prev) => ({ ...prev, issue: "" }));
  }

  function handleStartEdit(entry: AuditEntry) {
    setEditingEntryId(entry.entryId);
    setEditingIssue(entry.issue === "无" ? "" : entry.issue);
  }

  function handleCancelEdit() {
    setEditingEntryId(null);
    setEditingIssue("");
  }

  function handleSaveEdit(entryId: string) {
    const nextIssue = editingIssue.trim() || "无";
    setAuditEntries((prev) => prev.map((entry) => (entry.entryId === entryId ? { ...entry, issue: nextIssue } : entry)));
    handleCancelEdit();
  }

  function handleToggleClosed(entryId: string) {
    setAuditEntries((prev) =>
      prev.map((entry) => {
        if (entry.entryId !== entryId || !entry.fixId) return entry;
        return { ...entry, closed: !entry.closed };
      })
    );
  }

  function handleDeleteEntry(entryId: string) {
    if (!window.confirm("确认将这条记录移入回收站吗？")) return;
    setAuditEntries((prev) =>
      prev.map((entry) =>
        entry.entryId === entryId ? { ...entry, deleted: true, deletedAt: new Date().toISOString() } : entry
      )
    );
    if (editingEntryId === entryId) handleCancelEdit();
  }

  function handleRestoreEntry(entryId: string) {
    setAuditEntries((prev) => prev.map((entry) => (entry.entryId === entryId ? { ...entry, deleted: false, deletedAt: undefined } : entry)));
  }

  function handlePermanentDelete(entryId: string) {
    if (!window.confirm("确认永久删除这条记录吗？此操作无法撤销。")) return;
    setAuditEntries((prev) => prev.filter((entry) => entry.entryId !== entryId));
  }

  function downloadTextFile(filename: string, content: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handleExportCsv() {
    const head = ["week", "part", "age", "track", "tag", "issue", "fixId", "status"];
    const rows = filteredAuditEntries.map((entry) => [
      entry.week,
      partLabelMap[entry.part],
      entry.age,
      trackTitleMap[entry.track],
      entry.tag,
      entry.issue,
      entry.fixId ?? "",
      entry.closed ? "已闭环" : "待处理",
    ]);
    const csv = [head, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    downloadTextFile(`audit-entries-${Date.now()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
  }

  function handleExportJson() {
    const payload = JSON.stringify(filteredAuditEntries, null, 2);
    downloadTextFile(`audit-entries-${Date.now()}.json`, payload, "application/json;charset=utf-8");
  }

  function buildWeeklyReportMeta(targetWeek: string, sourceEntries: AuditEntry[]): WeeklyReportMeta {
    const weeklyEntries = sourceEntries.filter((entry) => entry.week === targetWeek);
    const fixEntries = weeklyEntries.filter((entry) => entry.fixId);
    const tracksCovered = Array.from(new Set(weeklyEntries.map((entry) => trackTitleMap[entry.track]))).join(" / ");
    const closureRate = fixEntries.length ? Math.round((fixEntries.filter((entry) => entry.closed).length / fixEntries.length) * 100) : 100;
    const topTag = issueTags
      .map((tag) => ({ tag, count: fixEntries.filter((entry) => entry.tag === tag).length }))
      .sort((a, b) => b.count - a.count)[0];

    return {
      week: targetWeek,
      total: weeklyEntries.length,
      fixTotal: fixEntries.length,
      closureRate,
      tracksCovered: tracksCovered || "无",
      topTagText: topTag?.count ? `${topTag.tag}（${topTag.count}）` : "无",
      keyFixCount: Math.min(fixEntries.length, 3),
      detailCount: fixEntries.length,
    };
  }

  function buildWeeklyReportText(targetWeek: string): string {
    const weeklyEntries = activeAuditEntries.filter((entry) => entry.week === targetWeek);
    const fixEntries = weeklyEntries.filter((entry) => entry.fixId);
    const meta = buildWeeklyReportMeta(targetWeek, activeAuditEntries);

    return reportTemplate === "leader"
      ? [
          `【领导周报】${targetWeek}`,
          `总记录：${meta.total}，FIX：${meta.fixTotal}，闭环率：${meta.closureRate}%`,
          `覆盖主线：${meta.tracksCovered}`,
          `高频风险标签：${meta.topTagText}`,
          "",
          "关键闭环：",
          ...fixEntries.slice(0, 3).map((entry) => `- ${entry.fixId} | ${trackTitleMap[entry.track]} | ${entry.tag} | ${entry.closed ? "已闭环" : "待处理"}`),
        ].join("\n")
      : [
          `【教研周报】${targetWeek}`,
          `记录数：${meta.total}`,
          `FIX 数：${meta.fixTotal}`,
          `闭环率：${meta.closureRate}%`,
          `覆盖主线：${meta.tracksCovered}`,
          "",
          "问题清单：",
          ...fixEntries.map((entry) => `- ${entry.fixId} | ${trackTitleMap[entry.track]} | ${entry.tag} | ${entry.issue} | ${entry.closed ? "已闭环" : "待处理"}`),
        ].join("\n");
  }

  function handleOpenWeeklyReportPreview() {
    const targetWeek = auditWeekFilter.trim() || filteredAuditEntries[0]?.week || currentIsoWeek;
    setReportPreviewText(buildWeeklyReportText(targetWeek));
    setShowReportPreview(true);
  }

  function handleExportWeeklyReportTxt() {
    const targetWeek = auditWeekFilter.trim() || filteredAuditEntries[0]?.week || currentIsoWeek;
    const text = buildWeeklyReportText(targetWeek);
    downloadTextFile(`weekly-report-${targetWeek}-${reportTemplate}.txt`, text, "text/plain;charset=utf-8");
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">抽查执行工作台</h3>
          <p className="card-subtitle">页面内直接录入抽查结果，自动生成 FIX 编号并即时统计闭环率。</p>
        </div>

        <div className="form-row" style={{ marginBottom: "16px" }}>
          <div className="input-group">
            <label>周次筛选</label>
            <input value={auditWeekFilter} onChange={(event) => setAuditWeekFilter(event.target.value)} placeholder="例如 2026-W17" />
          </div>
          <div className="input-group">
            <label>主线筛选</label>
            <select value={auditTrackFilter} onChange={(event) => setAuditTrackFilter(event.target.value as TrackId | "all")}>
              <option value="all">全部主线</option>
              {tracks.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>年龄层筛选</label>
            <select value={auditAgeFilter} onChange={(event) => setAuditAgeFilter(event.target.value as AgeTier | "all")}>
              <option value="all">全部年龄层</option>
              {ageTiers.map((tier) => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>标签筛选</label>
            <select value={auditTagFilter} onChange={(event) => setAuditTagFilter(event.target.value as IssueTag | "all")}>
              <option value="all">全部标签</option>
              {issueTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <strong>{auditStats.total}</strong>
            <span>总记录数</span>
          </div>
          <div className="stat-card">
            <strong>{auditStats.fixTotal}</strong>
            <span>FIX 记录数</span>
          </div>
          <div className="stat-card">
            <strong>{auditStats.closureRate}%</strong>
            <span>FIX 闭环率</span>
          </div>
          <div className="stat-card">
            <strong>{auditStats.weekCoverage}</strong>
            <span>覆盖周数</span>
          </div>
        </div>

        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border-color)" }}>
          <h4 style={{ margin: "0 0 16px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>录入新记录</h4>
          <div className="form-row">
            <div className="input-group">
              <label>周次</label>
              <input value={auditForm.week} onChange={(event) => updateAuditForm("week", event.target.value)} placeholder="2026-W24" />
            </div>
            <div className="input-group">
              <label>部位</label>
              <select value={auditForm.part} onChange={(event) => updateAuditForm("part", event.target.value as PartId)}>
                {partIds.map((id) => (
                  <option key={id} value={id}>{partLabelMap[id]}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>年龄层</label>
              <select value={auditForm.age} onChange={(event) => updateAuditForm("age", event.target.value as AgeTier)}>
                {ageTiers.map((tier) => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>主线</label>
              <select value={auditForm.track} onChange={(event) => updateAuditForm("track", event.target.value as TrackId)}>
                {tracks.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>问题标签</label>
            <select value={auditForm.tag} onChange={(event) => updateAuditForm("tag", event.target.value as IssueTag)}>
              {issueTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>问题描述（无问题可留空）</label>
            <textarea value={auditForm.issue} onChange={(event) => updateAuditForm("issue", event.target.value)} placeholder="例如：出现单次观察即稳定的结论收口。" />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button className="btn btn-secondary" onClick={() => handleAddAuditEntry(false)}>
              记录通过
            </button>
            <button className="btn btn-primary" onClick={() => handleAddAuditEntry(true)}>
              记录并闭环问题（自动 FIX）
            </button>
          </div>
        </div>

        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button className="btn btn-outline btn-sm" onClick={handleExportCsv}>
              📥 导出 CSV
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleExportJson}>
              📥 导出 JSON
            </button>
            <button className={`btn btn-outline btn-sm ${reportTemplate === "leader" ? "is-active" : ""}`} onClick={() => setReportTemplate("leader")}>
              领导版周报
            </button>
            <button className={`btn btn-outline btn-sm ${reportTemplate === "research" ? "is-active" : ""}`} onClick={() => setReportTemplate("research")}>
              教研版周报
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleExportWeeklyReportTxt}>
              📥 导出周报 TXT
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleOpenWeeklyReportPreview}>
              👁 预览周报
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => setShowRecycleBin((prev) => !prev)}>
              🗑 {showRecycleBin ? "隐藏回收站" : `查看回收站（${deletedAuditEntries.length}）`}
            </button>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>周汇总统计</h4>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>周次</th>
                  <th>记录数</th>
                  <th>FIX 数</th>
                  <th>闭环率</th>
                  <th>涉及主线</th>
                </tr>
              </thead>
              <tbody>
                {weeklySummary.length ? (
                  weeklySummary.map((week) => (
                    <tr key={week.week}>
                      <td>{week.week}</td>
                      <td>{week.total}</td>
                      <td>{week.fixTotal}</td>
                      <td>{week.closureRate}%</td>
                      <td>{week.tracks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)" }}>当前筛选下没有周汇总数据。</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>记录列表</h4>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>周次</th>
                  <th>部位</th>
                  <th>年龄层</th>
                  <th>主线</th>
                  <th>标签</th>
                  <th>问题</th>
                  <th>FIX</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuditEntries.length ? (
                  filteredAuditEntries.slice(0, 20).map((entry) => {
                    const trackTitle = trackTitleMap[entry.track] ?? entry.track;
                    return (
                      <tr key={entry.entryId}>
                        <td>{entry.week}</td>
                        <td>{partLabelMap[entry.part]}</td>
                        <td>{entry.age}</td>
                        <td>{trackTitle}</td>
                        <td><span className={`chip ${issueTagClassMap[entry.tag]}`} style={{ padding: "2px 8px", fontSize: "0.75rem" }}>{entry.tag}</span></td>
                        <td>
                          {editingEntryId === entry.entryId ? (
                            <textarea style={{ width: "100%", minHeight: "40px", padding: "4px", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "0.85rem" }} value={editingIssue} onChange={(event) => setEditingIssue(event.target.value)} />
                          ) : (
                            entry.issue
                          )}
                        </td>
                        <td>{entry.fixId ?? "-"}</td>
                        <td>{entry.closed ? <span className="chip chip-success">已闭环</span> : <span className="chip chip-warning">待处理</span>}</td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {editingEntryId === entry.entryId ? (
                              <>
                                <button className="btn btn-primary btn-sm" onClick={() => handleSaveEdit(entry.entryId)}>保存</button>
                                <button className="btn btn-outline btn-sm" onClick={handleCancelEdit}>取消</button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-outline btn-sm" onClick={() => handleStartEdit(entry)}>编辑</button>
                                {entry.fixId && (
                                  <button className="btn btn-outline btn-sm" onClick={() => handleToggleClosed(entry.entryId)}>
                                    {entry.closed ? "设为待处理" : "标记闭环"}
                                  </button>
                                )}
                                <button className="btn btn-outline btn-sm" onClick={() => handleDeleteEntry(entry.entryId)}>删除</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", color: "var(--text-muted)" }}>当前筛选结果为空，调整筛选条件或先录入一条记录。</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showRecycleBin && deletedAuditEntries.length > 0 && (
          <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px dashed var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: "0", fontSize: "0.95rem", color: "var(--text-secondary)" }}>回收站</h4>
              <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm("确认清空回收站吗？此操作无法撤销。")) setAuditEntries((prev) => prev.filter((entry) => !entry.deleted)); }}>
                清空回收站
              </button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>周次</th>
                    <th>部位</th>
                    <th>年龄层</th>
                    <th>主线</th>
                    <th>标签</th>
                    <th>问题</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedAuditEntries.map((entry) => (
                    <tr key={entry.entryId}>
                      <td>{entry.week}</td>
                      <td>{partLabelMap[entry.part]}</td>
                      <td>{entry.age}</td>
                      <td>{trackTitleMap[entry.track]}</td>
                      <td><span className={`chip ${issueTagClassMap[entry.tag]}`} style={{ padding: "2px 8px", fontSize: "0.75rem" }}>{entry.tag}</span></td>
                      <td>{entry.issue}</td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <button className="btn btn-success btn-sm" onClick={() => handleRestoreEntry(entry.entryId)}>恢复</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handlePermanentDelete(entry.entryId)}>永久删除</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showReportPreview && (
        <div className="modal-overlay" onClick={() => setShowReportPreview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>周报预览</h3>
              <button className="modal-close" onClick={() => setShowReportPreview(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ whiteSpace: "pre-wrap", fontFamily: "monospace, monospace" }}>
              {reportPreviewText}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowReportPreview(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
