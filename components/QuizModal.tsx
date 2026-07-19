"use client";
/* Mode quiz en modal : setup → run (éditeur + grademe) → résultats. Chrono 3 h optionnel. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import type { Exercise, Status } from "@/lib/types";
import { EXERCISES, exId } from "@/lib/exercises";
import { highlight } from "@/lib/highlight";
import { grade, type GradeResult } from "@/lib/grademe";
import { GRADEME } from "@/lib/grademe-data";

type QuizTab = 0 | 1 | 2 | 99;
type Phase = "setup" | "run" | "results";
const THREE_HOURS = 3 * 60 * 60 * 1000;

const shuffle = <T,>(a: T[]): T[] => {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

const fmtClock = (ms: number): string => {
  const sec = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  return (h ? `${h}:` : "") + `${String(m).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
};

function poolFor(tab: QuizTab, level: number): Exercise[] {
  if (tab === 99) return EXERCISES.filter((e) => e.view === "training");
  let pool = EXERCISES.filter((e) => e.view === "official" && (e.tab ?? 2) === tab);
  if (tab === 1 && level > 0) pool = pool.filter((e) => e.level === level);
  return pool;
}
function sampleTimed(pool: Exercise[]): Exercise[] {
  const hasLevels = pool.some((e) => e.level !== undefined);
  if (hasLevels) {
    const levels = shuffle(Array.from(new Set(pool.map((e) => e.level ?? 0)))).slice(0, 4);
    const picked = levels.map((l) => pick(pool.filter((e) => (e.level ?? 0) === l)));
    while (picked.length < Math.min(4, pool.length)) {
      const extra = pick(pool);
      if (!picked.includes(extra)) picked.push(extra);
    }
    return shuffle(picked);
  }
  return shuffle(pool).slice(0, Math.min(3, pool.length));
}

interface Props {
  open: boolean; onClose: () => void;
  setStatus: (exid: string, st: Status) => void;
  initialTab: QuizTab; initialLevel: number;
}

export default function QuizModal({ open, onClose, setStatus, initialTab, initialLevel }: Props) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [tab, setTab] = useState<QuizTab>(initialTab);
  const [level, setLevel] = useState(initialLevel);
  const [order, setOrder] = useState<"ordered" | "shuffle">("ordered");
  const [timed, setTimed] = useState(false);

  const [queue, setQueue] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<string, "success" | "review">>({});
  const [deadline, setDeadline] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const [code, setCode] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "info" | "ok" | "ko"; html: string } | null>(null);
  const [grading, setGrading] = useState(false);
  const advancing = useRef(false);

  const levels = useMemo(
    () => Array.from(new Set(EXERCISES.filter((e) => e.tab === (tab === 0 ? 0 : 1)).map((e) => e.level ?? 0))).sort((a, b) => a - b),
    [tab],
  );

  useEffect(() => { if (open) { setPhase("setup"); setTab(initialTab); setLevel(initialLevel); } }, [open, initialTab, initialLevel]);

  /* chrono */
  useEffect(() => {
    if (phase !== "run") return;
    const t = window.setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "run" && deadline !== null && now >= deadline && now > 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, phase, deadline]);

  const start = () => {
    const pool = poolFor(tab, level);
    if (pool.length === 0) return;
    setQueue(timed ? sampleTimed(pool) : order === "shuffle" ? shuffle(pool) : pool);
    setIndex(0); setResults({});
    setDeadline(timed ? Date.now() + THREE_HOURS : null);
    setStartedAt(Date.now()); setNow(Date.now());
    resetQuestion();
    setPhase("run");
  };
  const resetQuestion = () => {
    setCode(""); setAttempts(0); setRevealed(false); setFeedback(null);
    advancing.current = false;
  };
  const finish = () => { setElapsed(Date.now() - startedAt); setPhase("results"); };

  const next = useCallback((verdict: "success" | "review") => {
    if (advancing.current) return;
    advancing.current = true;
    const ex = queue[index];
    setResults((r) => ({ ...r, [exId(ex)]: verdict }));
    setStatus(exId(ex), verdict);
    if (index + 1 >= queue.length) { finish(); return; }
    setIndex((i) => i + 1);
    resetQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, index, setStatus, startedAt]);

  const runGrademe = async () => {
    const ex = queue[index];
    if (!code.trim()) { setFeedback({ kind: "ko", html: "Écris ta solution d'abord 😉" }); return; }
    setAttempts((a) => a + 1);
    setGrading(true);
    setFeedback({ kind: "info", html: "Chargement de Python dans le navigateur (première fois : ~10 s)…" });
    let r: GradeResult;
    try { r = await grade(exId(ex), code); }
    catch (e) {
      setFeedback({ kind: "ko", html: `Grademe indisponible (${(e as Error).message}). Vérifie ta connexion et retente.` });
      setGrading(false);
      return;
    }
    setGrading(false);
    if (r.ok) {
      setFeedback({ kind: "ok", html: `✅ <b>Validé en ${attempts + 1} tentative${attempts ? "s" : ""} !</b> Exercice suivant…` });
      setTimeout(() => next("success"), 1100);
    } else {
      setStatus(exId(ex), "review");
      const rows = (r.fails ?? []).slice(0, 3).map((f) =>
        `<div class="q-fail"><code>${f.d}</code><br>attendu <code>${f.exp}</code> · obtenu <code>${f.got}</code></div>`).join("");
      setFeedback({ kind: "ko", html: r.err ? `❌ ${r.err} — corrige et retente !` : `❌ <b>${(r.fails ?? []).length} test(s) échoué(s)</b> — corrige et retente !${rows}` });
    }
  };

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    setStatus(exId(queue[index]), "review");
  };

  const ex = queue[index];
  const hasTests = ex ? Boolean(GRADEME[exId(ex)]) : false;
  const successCount = Object.values(results).filter((v) => v === "success").length;
  const toReview = queue.filter((e) => results[exId(e)] !== "success");
  const remaining = deadline !== null ? deadline - now : null;

  const seg = (active: boolean) => `segbtn${active ? " active" : ""}`;

  return (
    <Modal open={open} onClose={onClose} wide>
      {phase === "setup" && (
        <div className="dialog">
          <h2>Mode quiz</h2>
          <p className="dialog-text">Conditions d&apos;exam : un exercice à la fois, éditeur + grademe. En mode 3 h, une sélection aléatoire simule un vrai sujet.</p>
          <div className="q-field"><label>Tab</label><div className="segroup">
            <button type="button" className={seg(tab === 0)} onClick={() => setTab(0)}>C Fundamentals</button>
            <button type="button" className={seg(tab === 1)} onClick={() => setTab(1)}>Basic Python</button>
            <button type="button" className={seg(tab === 2)} onClick={() => setTab(2)}>Medium Python</button>
            <button type="button" className={seg(tab === 99)} onClick={() => setTab(99)}>Entraînement</button>
          </div></div>
          {(tab === 0 || tab === 1) && (
            <div className="q-field"><label>Niveau (sous-tab)</label><div className="segroup">
              <button type="button" className={seg(level === 0)} onClick={() => setLevel(0)}>Tous</button>
              {levels.map((l) => (
                <button key={l} type="button" className={seg(level === l)} onClick={() => setLevel(l)}>Niveau {l}</button>
              ))}
            </div></div>
          )}
          <div className="q-field"><label>Ordre</label><div className="segroup">
            <button type="button" className={seg(order === "ordered")} onClick={() => setOrder("ordered")}>Dans l&apos;ordre</button>
            <button type="button" className={seg(order === "shuffle")} onClick={() => setOrder("shuffle")}>Aléatoire</button>
          </div></div>
          <div className="q-field"><label>Temps</label><div className="segroup">
            <button type="button" className={seg(!timed)} onClick={() => setTimed(false)}>Aucun — tous les exercices</button>
            <button type="button" className={seg(timed)} onClick={() => setTimed(true)}>⏱ 3 h — sujet aléatoire</button>
          </div></div>
          <div className="dialog-actions">
            <button className="q-start" type="button" onClick={start}>Démarrer le quiz →</button>
          </div>
        </div>
      )}

      {phase === "run" && ex && (
        <div className="quiz-run">
          <div className="q-top">
            <span className="q-count">Exercice {index + 1} / {queue.length}</span>
            <span className={`q-timer${remaining !== null && remaining <= 10 * 60 * 1000 ? " danger" : ""}`}>
              {remaining !== null ? fmtClock(remaining) : fmtClock(now - startedAt)}
            </span>
          </div>
          <div className="q-bar"><i style={{ width: `${(index / queue.length) * 100}%` }} /></div>
          <div className="head">
            <span className="num">{ex.num}</span>
            <h2 className="title" dangerouslySetInnerHTML={{ __html: ex.heading }} />
            {ex.badge && <span className="badge-real">{ex.badge}</span>}
            <span className="tag">{ex.tag}</span>
          </div>
          <p className="analogy" dangerouslySetInnerHTML={{ __html: ex.analogy }} />
          <pre className="proto" dangerouslySetInnerHTML={{ __html: highlight(ex.signature, ex.lang) }} />
          <ul className="consigne">{ex.brief.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}</ul>
          <label className="q-editor-label" htmlFor="q-editor">Ta solution :</label>
          <textarea
            id="q-editor" className="q-editor" spellCheck={false} value={code}
            placeholder="Écris ton code Python ici…"
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const ta = e.currentTarget, p = ta.selectionStart;
                setCode(ta.value.slice(0, p) + "    " + ta.value.slice(ta.selectionEnd));
                requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = p + 4; });
              }
            }}
          />
          {feedback && <div className={`q-feedback ${feedback.kind === "ok" ? "okmsg" : feedback.kind === "ko" ? "ko" : ""}`} dangerouslySetInnerHTML={{ __html: feedback.html }} />}
          {revealed && (
            <div className="q-solution">
              <div className="code-wrap">
                <CopyButton text={ex.solution} ariaLabel="Copier la solution" />
                <pre dangerouslySetInnerHTML={{ __html: highlight(ex.solution, ex.lang) }} />
              </div>
              <p className="sol-note" dangerouslySetInnerHTML={{ __html: ex.note }} />
            </div>
          )}
          <div className="q-actions">
            {hasTests ? (
              <button className="q-primary" type="button" onClick={runGrademe} disabled={grading}>
                {grading ? "⏳ Correction…" : "⚡ Grademe"}
              </button>
            ) : (
              <>
                {/* pas de tests automatisés (ex. sujets C) : auto-évaluation */}
                <button className="q-primary" type="button" onClick={() => next("success")}>✓ Réussi</button>
                <button className="ghost" type="button" onClick={() => next("review")}>✗ À revoir</button>
              </>
            )}
            <button className="ghost" type="button" onClick={reveal} disabled={revealed}>Révéler la solution</button>
            <button className="ghost" type="button" onClick={() => next("review")}>Passer (→ à revoir)</button>
            {attempts > 0 && <span className="q-attempts">tentative {attempts}</span>}
          </div>
        </div>
      )}

      {phase === "results" && (
        <div className="quiz-results">
          {(() => {
            const total = queue.length || 1;
            const pct = Math.round((successCount / total) * 100);
            const C = 2 * Math.PI * 52;
            return (
              <svg className="ring" viewBox="0 0 120 120">
                <circle className="ring-bg" cx="60" cy="60" r="52" />
                <circle className="ring-fg" cx="60" cy="60" r="52" transform="rotate(-90 60 60)"
                  style={{ strokeDasharray: C, strokeDashoffset: C * (1 - pct / 100) }} />
                <text className="ring-text" x="60" y="69">{pct}%</text>
              </svg>
            );
          })()}
          <h2>{successCount} / {queue.length} réussis</h2>
          <p className="results-time">Temps total : {fmtClock(elapsed)}</p>
          {toReview.length > 0 ? (
            <div className="review-list">
              <h3>À revoir ({toReview.length})</h3>
              <ul>{toReview.map((e) => <li key={exId(e)}><code>{e.heading.replace(/<[^>]+>/g, "")}</code></li>)}</ul>
            </div>
          ) : (
            <p className="results-time t-ok">Sans faute — impeccable ! 🎉</p>
          )}
          <div className="q-actions center">
            <button className="q-primary" type="button" onClick={() => setPhase("setup")}>Recommencer</button>
            <button className="ghost" type="button" onClick={onClose}>Retour aux exercices</button>
          </div>
        </div>
      )}
    </Modal>
  );
}
