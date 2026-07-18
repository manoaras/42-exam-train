"use client";
import type { CloudUser, View } from "@/lib/types";

interface Props {
  view: View; onView: (v: View) => void;
  search: string; onSearch: (q: string) => void;
  successCount: number; reviewCount: number; total: number;
  user: CloudUser | null;
  onAuth: () => void; onQuiz: () => void; onReset: () => void;
}

export default function Toolbar({ view, onView, search, onSearch, successCount, reviewCount, total, user, onAuth, onQuiz, onReset }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar-inner">
        <div className="brand"><span className="glyph">◆</span><span className="long">Exams · 42</span></div>
        <div className="seg" role="tablist" aria-label="Choix de la vue">
          <button type="button" role="tab" className={view === "official" ? "active" : ""} onClick={() => onView("official")}>Officiels</button>
          <button type="button" role="tab" className={view === "training" ? "active" : ""} onClick={() => onView("training")}>Entraînement</button>
        </div>
        <input
          className="search" type="search" placeholder="Filtrer…" aria-label="Filtrer les exercices"
          value={search} onChange={(e) => onSearch(e.target.value)}
        />
        <button type="button" className="tbtn auth-btn" onClick={onAuth}>
          {user ? (
            <>
              {user.photo && (
                // eslint-disable-next-line @next/next/no-img-element -- avatar Google externe, next/image inutile en export statique
                <img src={user.photo} alt="" referrerPolicy="no-referrer" />
              )}
              {user.name}<span className="sync">☁ sync</span>
            </>
          ) : "Se connecter"}
        </button>
        <button type="button" className="tbtn quiz-toggle" onClick={onQuiz} title={user ? "" : "Connexion requise"}>
          {user ? "▶ Mode quiz" : "🔒 Mode quiz"}
        </button>
        <div className="progress" title="Maîtrise : réussis / à revoir">
          <span className="stat ok">✓<b>{successCount}</b></span>
          <span className="stat warn">↻<b>{reviewCount}</b></span>
          <span className="bar"><i style={{ width: `${total ? (successCount / total) * 100 : 0}%` }} /></span>
          <button className="icon-btn" type="button" title="Réinitialiser la progression" onClick={onReset}>⟳</button>
        </div>
      </div>
    </div>
  );
}
