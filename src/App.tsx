import { useEffect, useRef, useState } from "react";
import { JourneyPage } from "./components/journey/JourneyPage";
import { isJourneyId, journeys, type JourneyId } from "./data/journey-registry";
import { questionById, systemById, type BodySystemId } from "./data/questions";
import { useHeardQuestions } from "./hooks/useHeardQuestions";
import { usePersistedViewState } from "./hooks/usePersistedViewState";
import { HomePage } from "./pages/HomePage";
import { PartPage } from "./pages/PartPage";
import { QuestionListPage } from "./pages/QuestionListPage";
import { QuestionPage } from "./pages/QuestionPage";
import type { PartId } from "./types/content";
import type { ScaleId } from "./types/exploration";

type Route =
  | { page: "home" }
  | { page: "list"; system: BodySystemId }
  | { page: "question"; id: string }
  | { page: "journey"; id: JourneyId; stop?: ScaleId }
  | { page: "part"; part: PartId };

const partIds: readonly PartId[] = ["head", "heart", "lungs", "stomach", "hand"];
const stopIds: readonly ScaleId[] = ["body", "organ", "tissue", "cell", "molecule"];

function parseRoute(hash: string): Route {
  const [, page, rawParam, rawExtra] = hash.replace(/^#/, "").split("/");
  const param = rawParam ? decodeURIComponent(rawParam) : undefined;
  if (page === "topic" && param && systemById(param)) return { page: "list", system: param as BodySystemId };
  if (page === "q" && param && questionById(param)) return { page: "question", id: param };
  if (page === "heart") return { page: "journey", id: "heart" };
  if (page === "journey" && isJourneyId(param)) {
    const stop = stopIds.find((id) => id === rawExtra);
    return { page: "journey", id: param, stop };
  }
  if (page === "part" && partIds.includes(param as PartId)) return { page: "part", part: param as PartId };
  return { page: "home" };
}

const listHash = (system: BodySystemId) => `#/topic/${system}`;

function App() {
  const { age, setAge, markPartVisited } = usePersistedViewState();
  const { heard, markHeard } = useHeardQuestions();
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  /** Where the child came from, so journeys and questions lead back instead of always jumping home. */
  const lastList = useRef<BodySystemId | null>(null);
  const lastQuestion = useRef<string | null>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (route.page === "home") {
      lastList.current = null;
      lastQuestion.current = null;
    }
    if (route.page === "list") {
      lastList.current = route.system;
      lastQuestion.current = null;
    }
    if (route.page === "question") lastQuestion.current = route.id;
    if (route.page === "journey") markPartVisited(journeys[route.id].part);
    if (route.page === "part") markPartVisited(route.part);
    window.scrollTo(0, 0);
  }, [route, markPartVisited]);

  const go = (hash: string) => { window.location.hash = hash; };
  const goHome = () => go("#/");
  const openQuestion = (id: string) => go(`#/q/${id}`);
  const openJourney = (id: JourneyId, stop?: ScaleId) => go(stop && stop !== "body" ? `#/journey/${id}/${stop}` : `#/journey/${id}`);

  if (route.page === "question") {
    const question = questionById(route.id);
    if (question) {
      const back = lastList.current ?? question.system;
      return (
        <QuestionPage key={question.id} question={question} heard={heard} onHeard={markHeard}
          onBack={() => go(listHash(back))} onOpen={openQuestion} onJourney={openJourney} />
      );
    }
  }
  if (route.page === "list") {
    return (
      <QuestionListPage key={route.system} system={route.system} heard={heard}
        onBack={goHome} onOpen={openQuestion} onSystem={(id) => go(listHash(id))} />
    );
  }
  if (route.page === "journey") {
    const journey = journeys[route.id];
    const fromQuestion = lastQuestion.current ? questionById(lastQuestion.current) : undefined;
    return (
      <JourneyPage key={`${journey.id}-${route.stop ?? "body"}`} journey={journey} age={age} setAge={setAge} initialStop={route.stop}
        onBack={fromQuestion ? () => openQuestion(fromQuestion.id) : goHome}
        backLabel={fromQuestion ? "回到小念的问题" : "回到身体部位"}
        onMore={() => go(`#/part/${journey.part}`)} />
    );
  }
  if (route.page === "part") {
    return <PartPage part={route.part} age={age} setAge={setAge} onBack={goHome} onJourney={(id) => openJourney(id)} />;
  }
  return <HomePage heard={heard} onSystem={(id) => go(listHash(id))} />;
}

export default App;
