import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Avatar } from "../components/Avatar";
import { FilmPlayer, type FilmPlayerHandle } from "../components/film/FilmPlayer";
import { characterNames as names, type CharacterId } from "../data/characters";
import { filmFor } from "../data/films";
import { journeys, type JourneyId } from "../data/journey-registry";
import { difficultyLabel, linkedQuestions, nextQuestions, systemById, type BeatShow, type BodyQuestion } from "../data/questions";
import { voiceFor } from "../data/voice";
import { useInView } from "../hooks/useInView";
import type { Speaker } from "../lib/narration";
import type { ScaleId } from "../types/exploration";
import "../components/journey/Journey.css";
import "./Questions.css";

const gateKey = (id: string) => `body-mystery-parent-ok-${id}`;

function gateOpen(question: BodyQuestion) {
  if (!question.parentGate) return true;
  try {
    return window.sessionStorage.getItem(gateKey(question.id)) === "1";
  } catch {
    return false;
  }
}

type Props = {
  question: BodyQuestion;
  heard: readonly string[];
  onHeard: (id: string) => void;
  onBack: () => void;
  onOpen: (id: string) => void;
  onJourney: (journey: JourneyId, stop: ScaleId) => void;
};

function Bubble({ who, index, speaking, children }: { who: CharacterId; index: number; speaking?: boolean; children: ReactNode }) {
  return (
    <div className={`qa-line is-${who}${speaking ? " is-speaking" : ""}`} style={{ "--i": index } as CSSProperties}>
      <span className="qa-avatar"><Avatar who={who} /></span>
      <div className="qa-bubble">
        <span className="qa-name">{names[who]}</span>
        {children}
      </div>
    </div>
  );
}

function Show({ show, onJourney }: { show: BeatShow; onJourney: Props["onJourney"] }) {
  switch (show.kind) {
    case "steps":
      return (
        <ol className="qa-steps" aria-label="图解">
          {show.frames.map((frame, index) => (
            <li key={frame.label} style={{ "--i": index } as CSSProperties}>
              <span aria-hidden="true">{frame.icon}</span>
              <small>{frame.label}</small>
            </li>
          ))}
        </ol>
      );
    case "journey":
      return (
        <button type="button" className="qa-journey" onClick={() => onJourney(show.journey, show.stop)}>
          🔍 {show.label}<small>{journeys[show.journey].title} · 3D 动画</small>
        </button>
      );
    case "image":
      return <img className="qa-media" src={show.src} alt={show.alt} />;
    case "video":
      return <video className="qa-media" src={show.src} poster={show.poster} aria-label={show.alt} controls playsInline />;
  }
}

export function QuestionPage({ question, heard, onHeard, onBack, onOpen, onJourney }: Props) {
  const system = systemById(question.system);
  const film = filmFor(question.id);
  const voice = useMemo(() => voiceFor(question), [question]);
  const filmTurns = new Set(film?.scenes.map((scene) => scene.turn));
  const player = useRef<FilmPlayerHandle>(null);
  const filmBox = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<{ turn: number; who?: Speaker } | null>(null);
  const [unlocked, setUnlocked] = useState(() => gateOpen(question));
  const [endRef, reachedEnd] = useInView<HTMLDivElement>(false);
  const onTurn = useCallback((turn: number, who?: Speaker) => setPlaying({ turn, who }), []);
  const turnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spokenTurn = playing?.who ? playing.turn : undefined;

  useEffect(() => {
    if (spokenTurn === undefined || !window.matchMedia("(min-width: 901px)").matches) return;
    turnRefs.current[spokenTurn]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [spokenTurn]);

  const watch = (turn: number) => {
    player.current?.playTurn(turn);
    filmBox.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (unlocked && reachedEnd) onHeard(question.id);
  }, [unlocked, reachedEnd, question.id, onHeard]);

  const unlock = () => {
    try {
      window.sessionStorage.setItem(gateKey(question.id), "1");
    } catch (error) {
      console.error("家长确认保存失败", error);
    }
    setUnlocked(true);
  };

  return (
    <div className="qa">
      <header className="journey-top">
        <button type="button" className="journey-back" onClick={onBack}>← {system?.emoji} {system?.title}</button>
        <div className="journey-question">
          <span>
            {difficultyLabel[question.difficulty]}
            {question.sciences.map((science) => <i key={science} className={`science science-${science}`}>{science}</i>)}
            {heard.includes(question.id) && " · ⭐ 看过"}
          </span>
          <h1>{question.title}</h1>
        </div>
      </header>

      {!unlocked ? (
        <section className="qa-gate" aria-labelledby="qa-gate-title">
          <span aria-hidden="true">🔒</span>
          <h2 id="qa-gate-title">这个问题，请和大人一起看</h2>
          <p>{question.parentGate}</p>
          <div className="qa-gate-actions">
            <button type="button" className="qa-gate-open" onClick={unlock}>我是大人，我们一起看</button>
            <button type="button" onClick={onBack}>先看看别的问题</button>
          </div>
        </section>
      ) : (
        <main className={film ? "qa-main has-film" : "qa-main"}>
          {film && (
            <div ref={filmBox} className="qa-film">
              <FilmPlayer ref={player} film={film} voice={voice} onTurn={onTurn} />
            </div>
          )}
          <section className="qa-chat" aria-label="小念和爸爸的问答">
            <p className="qa-scene"><span aria-hidden="true">📍</span>{question.trigger}</p>
            {question.dialogue.map((turn, index) => (
              <div key={index} ref={(node) => { turnRefs.current[index] = node; }} className={playing?.turn === index ? "qa-turn is-playing" : "qa-turn"}>
                <Bubble who="nian" index={index * 2} speaking={playing?.turn === index && playing.who === "nian"}><p>{turn.nian}</p></Bubble>
                <Bubble who="dad" index={index * 2 + 1} speaking={playing?.turn === index && playing.who === "dad"}>
                  <p>{turn.dad}</p>
                  {turn.show && <Show show={turn.show} onJourney={onJourney} />}
                  {filmTurns.has(index) && (
                    <button type="button" className="qa-watch" onClick={() => watch(index)}>🎬 看动画</button>
                  )}
                </Bubble>
              </div>
            ))}
          </section>
          <div ref={endRef} className="qa-end" />

          <section className="qa-wrap" aria-label="看完以后">
            <div className="qa-related">
              <h3><Avatar who="nian" /> 小念还想问</h3>
              {nextQuestions(question).map((item) => (
                <button key={item.id} type="button" onClick={() => onOpen(item.id)}>
                  {item.parentGate ? "🔒 " : ""}{item.title}{heard.includes(item.id) ? " ⭐" : ""}
                </button>
              ))}
            </div>
            {linkedQuestions(question).length > 0 && (
              <div className="qa-related is-cross">
                <h3>🔗 串到别的身体部位看看</h3>
                {linkedQuestions(question).map((item) => {
                  const otherSystem = systemById(item.system);
                  return (
                    <button key={item.id} type="button" onClick={() => onOpen(item.id)}>
                      {otherSystem && <span className="qa-cross-tag">{otherSystem.emoji} {otherSystem.title}</span>}
                      <span>{item.parentGate ? "🔒 " : ""}{item.title}{heard.includes(item.id) ? " ⭐" : ""}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <details className="parent-tip">
              <summary>👨‍👩‍👧 给大人</summary>
              <p>{question.parentTip}</p>
            </details>
          </section>
        </main>
      )}
    </div>
  );
}
