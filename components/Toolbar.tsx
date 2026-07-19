"use client";
import Link from "next/link";
import ProgressBar from "./ProgressBar";
import type { CloudUser, View } from "@/lib/types";

interface Props {
  view: View; onView: (v: View) => void;
  search: string; onSearch: (q: string) => void;
  successCount: number; reviewCount: number; seenCount: number; total: number;
  user: CloudUser | null;
  onAuth: () => void; onSettings: () => void; onQuiz: () => void; onReset: () => void;
}

export default function Toolbar({ view, onView, search, onSearch, successCount, reviewCount, seenCount, total, user, onAuth, onSettings, onQuiz, onReset }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar-inner">
        <Link href="/" className="brand"><span className="glyph">◆</span><span className="long">Exams · 42</span></Link>
        <div className="seg" role="tablist" aria-label="Choix de la vue">
          <button type="button" role="tab" aria-selected={view === "official"} className={view === "official" ? "active" : ""} onClick={() => onView("official")}>Officiels</button>
          <button type="button" role="tab" aria-selected={view === "training"} className={view === "training" ? "active" : ""} onClick={() => onView("training")}>Entraînement</button>
        </div>
        <input
          className="search" type="search" placeholder="Filtrer…" aria-label="Filtrer les exercices"
          value={search} onChange={(e) => onSearch(e.target.value)}
        />
        <button type="button" className="tbtn quiz-toggle" onClick={onQuiz} title={user ? "" : "Connexion requise"}>
          {user ? "▶ Mode quiz" : "🔒 Mode quiz"}
        </button>

        {/* Progression avant Connexion / Paramètres (ergonomie) */}
        <ProgressBar success={successCount} review={reviewCount} seen={seenCount} total={total} onReset={onReset} />

        {user ? (
          <button type="button" className="tbtn auth-btn" onClick={onSettings} title="Paramètres du compte">
            {user.photo && (
              // eslint-disable-next-line @next/next/no-img-element -- avatar Google externe, next/image inutile en export statique
              <img src={user.photo} alt="" referrerPolicy="no-referrer" />
            )}
            <span className="long">Paramètres</span><span className="sync">⚙</span>
          </button>
        ) : (
          <button type="button" className="tbtn auth-btn" onClick={onAuth}>Se connecter</button>
        )}
      </div>
    </div>
  );
}
