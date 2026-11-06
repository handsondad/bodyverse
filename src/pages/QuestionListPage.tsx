import type { CSSProperties } from "react";
import { Avatar } from "../components/Avatar";
import {
  bodySystems, difficultyLabel, questionsIn, systemById, type BodyQuestion, type BodySystemId, type Difficulty
} from "../data/questions";
import "../components/journey/Journey.css";
import "./Questions.css";

type Props = {
  system: BodySystemId;
  heard: readonly string[];
  onBack: () => void;
  onOpen: (id: string) => void;
  onSystem: (id: BodySystemId) => void;
};

const difficulties: readonly Difficulty[] = [1, 2, 3];
const difficultyHint: Record<Difficulty, string> = {
  1: "一听就懂的小问题",
  2: "要多想一步：谁和谁在接力？",
  3: "藏得更深的问题，大人也常常答不全"
};

function QuestionCard({ question, heard, onOpen }: { question: BodyQuestion; heard: boolean; onOpen: () => void }) {
  const system = systemById(question.system);
  const hasJourney = question.dialogue.some((turn) => turn.show?.kind === "journey");
  return (
    <button type="button" className={`qlist-card ${heard ? "is-heard" : ""}`} onClick={onOpen}
      style={{ "--bubble": system?.color ?? "#ff9f43" } as CSSProperties}>
      <strong>{question.parentGate && <span aria-label="需要大人一起看">🔒 </span>}{question.title}</strong>
      <small className="qlist-trigger">{question.trigger}</small>
      <span className="qlist-badges">
        <em>💬 {question.dialogue.length} 问 {question.dialogue.length} 答</em>
        {heard && <em className="is-star">⭐ 看过</em>}
        {hasJourney && <em>🔍 有 3D 动画</em>}
        {question.parentGate && <em>👨‍👩‍👧 大人陪看</em>}
      </span>
    </button>
  );
}

export function QuestionListPage({ system: systemId, heard, onBack, onOpen, onSystem }: Props) {
  const system = systemById(systemId);
  const questions = questionsIn(systemId);
  const heardCount = questions.filter((question) => heard.includes(question.id)).length;
  if (!system) return null;

  return (
    <div className="qlist">
      <header className="journey-top">
        <button type="button" className="journey-back" onClick={onBack}>← 回到身体部位</button>
        <div className="journey-question">
          <span>{questions.length} 个问题 · 看过 {heardCount} 个</span>
          <h1>{system.emoji} {system.title}</h1>
        </div>
      </header>

      <div className="qlist-intro" style={{ "--bubble": system.color } as CSSProperties}>
        <p><Avatar who="nian" /><strong>小念：</strong>{system.kidHook}</p>
        <p><Avatar who="dad" /><strong>爸爸：</strong>这一类其实都在讲{system.dadLens}。挑一个问题，我们从头聊到底。</p>
      </div>

      {difficulties.map((level) => {
        const group = questions.filter((question) => question.difficulty === level);
        if (group.length === 0) return null;
        return (
          <section key={level} className="qlist-group" aria-label={difficultyLabel[level]}>
            <h2>{"⭐".repeat(level)} {difficultyLabel[level]}<small>{difficultyHint[level]}</small></h2>
            <div className="qlist-grid">
              {group.map((question) => (
                <QuestionCard key={question.id} question={question} heard={heard.includes(question.id)} onOpen={() => onOpen(question.id)} />
              ))}
            </div>
          </section>
        );
      })}

      <nav className="qlist-other" aria-label="换一个身体部位">
        <h2>换一个身体部位</h2>
        <div className="qlist-chips">
          {bodySystems.map((item) => (
            <button key={item.id} type="button" aria-current={item.id === systemId ? "true" : undefined}
              onClick={() => onSystem(item.id)}>{item.emoji} {item.title}</button>
          ))}
        </div>
      </nav>
    </div>
  );
}
