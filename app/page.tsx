"use client";
/* Page principale : vues Officiels / Entraînement, tabs, grille, modals */
import { useMemo, useState } from "react";
import Toolbar from "@/components/Toolbar";
import ExerciseCard from "@/components/ExerciseCard";
import SolutionModal from "@/components/SolutionModal";
import AuthModal from "@/components/AuthModal";
import ResetModal from "@/components/ResetModal";
import QuizModal from "@/components/QuizModal";
import { EXERCISES, RANK_TABS, TAB_SUBS, TRAINING_HERO, exId } from "@/lib/exercises";
import { useProgress } from "@/lib/useProgress";
import type { Exercise, View } from "@/lib/types";

type ModalKind = "none" | "solution" | "auth" | "reset" | "quiz";

export default function Home() {
  const { progress, user, setStatus, reset, signIn, signOut } = useProgress();
  const [view, setView] = useState<View>("official");
  const [activeTab, setActiveTab] = useState(2);
  const [activeLevel, setActiveLevel] = useState(0);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalKind>("none");
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [authReason, setAuthReason] = useState<string | undefined>(undefined);

  const tabHasData = (i: number) => EXERCISES.some((e) => e.view === "official" && (e.tab ?? 2) === i);
  const basicLevels = useMemo(
    () => Array.from(new Set(EXERCISES.filter((e) => e.tab === 1).map((e) => e.level ?? 0))).sort(),
    [],
  );

  /* liste visible (vue + tab + niveau + filtre) */
  const list = useMemo(() => {
    let l = EXERCISES.filter((e) => e.view === view);
    if (view === "official") {
      l = l.filter((e) => (e.tab ?? 2) === activeTab);
      if (activeTab === 1 && activeLevel > 0) l = l.filter((e) => e.level === activeLevel);
    }
    const q = search.toLowerCase().trim();
    if (q) l = l.filter((e) => e.search.includes(q));
    return l;
  }, [view, activeTab, activeLevel, search]);

  const sections = useMemo(() => {
    const seen = new Set<string>();
    return list.filter((e) => (seen.has(e.section) ? false : (seen.add(e.section), true))).map((e) => e.section);
  }, [list]);

  /* jauge de maîtrise sur le périmètre affiché (hors filtre texte) */
  const scope = useMemo(() => {
    let l = EXERCISES.filter((e) => e.view === view);
    if (view === "official") {
      l = l.filter((e) => (e.tab ?? 2) === activeTab);
      if (activeTab === 1 && activeLevel > 0) l = l.filter((e) => e.level === activeLevel);
    }
    return l;
  }, [view, activeTab, activeLevel]);
  const successCount = scope.filter((e) => progress[exId(e)] === "success").length;
  const reviewCount = scope.filter((e) => progress[exId(e)] === "review").length;

  const openQuiz = () => {
    if (!user) { setAuthReason("Le mode quiz nécessite une connexion pour sauvegarder tes résultats."); setModal("auth"); }
    else setModal("quiz");
  };
  const openCard = (ex: Exercise) => { setSelected(ex); setStatus(exId(ex), "seen"); setModal("solution"); };

  return (
    <div className={`shell view-${view}`}>
      <Toolbar
        view={view} onView={(v) => { setView(v); setSearch(""); }}
        search={search} onSearch={setSearch}
        successCount={successCount} reviewCount={reviewCount} total={scope.length}
        user={user}
        onAuth={() => { setAuthReason(undefined); setModal("auth"); }}
        onQuiz={openQuiz}
        onReset={() => setModal("reset")}
      />

      <main className="wrap">
        <header className="hero">
          {view === "official" ? (
            <>
              <h1>{RANK_TABS[activeTab]}</h1>
              <p className="sub" dangerouslySetInnerHTML={{
                __html: TAB_SUBS[activeTab] ?? `Les sujets officiels pour l'exam — <b>${RANK_TABS[activeTab]}</b>.`,
              }} />
            </>
          ) : (
            <>
              <div className="kicker">{TRAINING_HERO.kicker}</div>
              <h1>{TRAINING_HERO.h1}</h1>
              <p className="sub" dangerouslySetInnerHTML={{ __html: TRAINING_HERO.sub }} />
            </>
          )}
        </header>

        {view === "official" && (
          <div className="rank-tabs">
            {RANK_TABS.map((name, i) => (
              <button
                key={name} type="button"
                className={i === activeTab ? "active" : ""}
                disabled={!tabHasData(i)}
                title={tabHasData(i) ? "" : "Bientôt : ajoute tes sujets !"}
                onClick={() => { setActiveTab(i); setActiveLevel(0); }}
              >{name}</button>
            ))}
            {activeTab === 1 && (
              <div className="sub-tabs">
                <button type="button" className={activeLevel === 0 ? "active" : ""} onClick={() => setActiveLevel(0)}>Tous</button>
                {basicLevels.map((l) => (
                  <button key={l} type="button" className={activeLevel === l ? "active" : ""} onClick={() => setActiveLevel(l)}>Niveau {l}</button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid">
          {sections.map((sec) => {
            const items = list.filter((e) => e.section === sec);
            return [
              <div className="section-title" key={sec}>
                <span className="dot" />{sec}<span className="count">{items.length} exo{items.length > 1 ? "s" : ""}</span>
              </div>,
              ...items.map((ex) => (
                <ExerciseCard key={exId(ex)} ex={ex} status={progress[exId(ex)]} onOpen={() => openCard(ex)} />
              )),
            ];
          })}
        </div>
        {list.length === 0 && <div className="empty">Aucun exercice ne correspond à ce filtre.</div>}
      </main>

      <SolutionModal ex={modal === "solution" ? selected : null} onClose={() => setModal("none")} />
      <AuthModal open={modal === "auth"} onClose={() => setModal("none")} user={user} signIn={signIn} signOut={signOut} reason={authReason} />
      <ResetModal open={modal === "reset"} onClose={() => setModal("none")} onConfirm={reset} />
      <QuizModal
        open={modal === "quiz"} onClose={() => setModal("none")} setStatus={setStatus}
        initialTab={view === "training" ? 99 : activeTab === 1 ? 1 : 2}
        initialLevel={view === "official" && activeTab === 1 ? activeLevel : 0}
      />
    </div>
  );
}
