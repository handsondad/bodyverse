import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Avatar } from "../components/Avatar";
import { FilmPlayer, type FilmPlayerHandle } from "../components/film/FilmPlayer";
import { characterNames as names, type CharacterId } from "../data/characters";
import { loadFilm } from "../data/films/load";
import type { Film } from "../data/films/types";
import { journeys, type JourneyId } from "../data/journey-registry";
import {
  difficultyLabel, linkedQuestions, loadQuestion, nextQuestions, systemById,
  type BeatShow, type BodyQuestion, type QuestionInfo
} from "../data/questions";
import { voiceFor } from "../data/voice";
import { useInView } from "../hooks/useInView";
import type { Speaker } from "../lib/narration";
import type { ScaleId } from "../types/exploration";
import "../components/journey/Journey.css";
import "./Questions.css";

const gateKey = (id: string) => `body-mystery-parent-ok-${id}`;

function gateOpen(question: QuestionInfo) {
  if (!question.parentGate) return true;
  try {
    return window.sessionStorage.getItem(gateKey(question.id)) === "1";
  } catch {
    return false;
  }
}

type Props = {
  question: QuestionInfo;
  heard: readonly string[];
  onHeard: (id: string) => void;
  onBack: () => void;
  onOpen: (id: string) => void;
  onJourney: (journey: JourneyId, stop: ScaleId) => void;
};

type Content = { question: BodyQuestion; film?: Film };
type Loaded = { state: "loading" } | { state: "failed" } | { state: "ready"; content: Content };

/** 问答正文和动画按身体部位拆了包，打开问题时才下载 */
function useQuestionContent(info: QuestionInfo) {
  const [loaded, setLoaded] = useState<Loaded>({ state: "loading" });

  useEffect(() => {
    let alive = true;
    // 动画没加载到也让孩子先读问答
    const film = loadFilm(info).catch((error: unknown) => {
      console.error("讲解动画加载失败", error);
      return undefined;
    });
    Promise.all([loadQuestion(info), film]).then(
      ([question, loadedFilm]) => {
        if (alive) setLoaded({ state: "ready", content: { question, film: loadedFilm } });
      },
      (error: unknown) => {
        console.error("问答加载失败", error);
        if (alive) setLoaded({ state: "failed" });
      }
    );
    return () => {
      alive = false;
    };
  }, [info]);

  return loaded;
}

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

type BodyProps = Pick<Props, "heard" | "onHeard" | "onOpen" | "onJourney"> & Content & { info: QuestionInfo };

function QuestionBody({ info, question, film, heard, onHeard, onOpen, onJourney }: BodyProps) {
  const voice = useMemo(() => voiceFor(question), [question]);
  const filmTurns = new Set(film?.scenes.map((scene) => scene.turn));
  const player = useRef<FilmPlayerHandle>(null);
  const filmBox = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<{ turn: number; who?: Speaker } | null>(null);
  const [endRef, reachedEnd] = useInView<HTMLDivElement>(false);
  const onTurn = useCallback((turn: number, who?: Speaker) => setPlaying({ turn, who }), []);
  const turnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spokenTurn = playing?.who ? playing.turn : undefined;
  const linked = linkedQuestions(info);

  useEffect(() => {
    if (spokenTurn === undefined || !window.matchMedia("(min-width: 901px)").matches) return;
    turnRefs.current[spokenTurn]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [spokenTurn]);

  const watch = (turn: number) => {
    player.current?.playTurn(turn);
    filmBox.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (reachedEnd) onHeard(question.id);
  }, [reachedEnd, question.id, onHeard]);

  return (
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
          {nextQuestions(info).map((item) => (
            <button key={item.id} type="button" onClick={() => onOpen(item.id)}>
              {item.parentGate ? "🔒 " : ""}{item.title}{heard.includes(item.id) ? " ⭐" : ""}
            </button>
          ))}
        </div>
        {linked.length > 0 && (
          <div className="qa-related is-cross">
            <h3>🔗 串到别的身体部位看看</h3>
            {linked.map((item) => {
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
  );
}

export function QuestionPage({ question, heard, onHeard, onBack, onOpen, onJourney }: Props) {
  const system = systemById(question.system);
  const loaded = useQuestionContent(question);
  const [unlocked, setUnlocked] = useState(() => gateOpen(question));

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
      ) : loaded.state === "ready" ? (
        <QuestionBody info={question} {...loaded.content} heard={heard} onHeard={onHeard} onOpen={onOpen} onJourney={onJourney} />
      ) : loaded.state === "failed" ? (
        <section className="qa-gate" role="alert">
          <span aria-hidden="true">📡</span>
          <h2>这个问题没能打开</h2>
          <p>可能是网络不太好。检查一下网络，再试一次。</p>
          <div className="qa-gate-actions">
            {/* 浏览器会记住这一页里下载失败的文件，重新请求还是失败，所以重试要刷新整页 */}
            <button type="button" className="qa-gate-open" onClick={() => window.location.reload()}>再试一次</button>
            <button type="button" onClick={onBack}>先看看别的问题</button>
          </div>
        </section>
      ) : (
        <p className="page-loading" role="status">正在打开小念和爸爸的问答…</p>
      )}
    </div>
  );
}
