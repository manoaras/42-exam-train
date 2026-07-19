"use client";
/* Barre de progression segmentée : 🟢 Fait · 🟡 Retry · 🔵 Vu — total = 100 % du périmètre affiché */

interface Props {
  success: number; review: number; seen: number; total: number;
  onReset?: () => void;
}

export default function ProgressBar({ success, review, seen, total, onReset }: Props) {
  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
  const w = (n: number) => (total ? (n / total) * 100 : 0);
  return (
    <div className="progress" role="group"
      aria-label={`Progression : ${success} faits (${pct(success)} %), ${review} à retenter (${pct(review)} %), ${seen} vus (${pct(seen)} %) sur ${total}`}>
      <span className="stat ok" title={`Fait : ${success} / ${total} (${pct(success)} %)`}>🟢<b>{success}</b></span>
      <span className="stat warn" title={`Retry : ${review} / ${total} (${pct(review)} %)`}>🟡<b>{review}</b></span>
      <span className="stat seen" title={`Vu : ${seen} / ${total} (${pct(seen)} %)`}>🔵<b>{seen}</b></span>
      <span className="seg-bar" aria-hidden>
        <i className="seg-ok" style={{ width: `${w(success)}%` }} />
        <i className="seg-warn" style={{ width: `${w(review)}%` }} />
        <i className="seg-seen" style={{ width: `${w(seen)}%` }} />
      </span>
      <b className="pct" title="Pourcentage d'exercices réussis">{pct(success)}%</b>
      {onReset && (
        <button className="icon-btn" type="button" title="Réinitialiser la progression"
          aria-label="Réinitialiser la progression" onClick={onReset}>⟳</button>
      )}
    </div>
  );
}
