"use client";
import type { Exercise, Status } from "@/lib/types";
import { highlight } from "@/lib/highlight";

const STATUS_META: Record<Status, { cls: string; txt: string }> = {
  success: { cls: "ok", txt: "✓ réussi" },
  review: { cls: "warn", txt: "↻ à revoir" },
  seen: { cls: "seen", txt: "vu" },
};

interface Props { ex: Exercise; status?: Status; onOpen: () => void }

export default function ExerciseCard({ ex, status, onOpen }: Props) {
  const meta = status ? STATUS_META[status] : null;
  return (
    <article
      className="card" tabIndex={0} role="button" aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
    >
      <div className="head">
        <span className="num">{ex.num}</span>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: ex.heading }} />
        {ex.badge && <span className="badge-real">{ex.badge}</span>}
        <span className="tag">{ex.tag}</span>
        {meta && <span className={`status ${meta.cls}`}>{meta.txt}</span>}
      </div>
      <p className="analogy" dangerouslySetInnerHTML={{ __html: ex.analogy }} />
      <pre className="proto" dangerouslySetInnerHTML={{ __html: highlight(ex.signature, ex.lang) }} />
      <ul className="consigne">
        {ex.brief.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}
      </ul>
      <div className="hint-open">▶ Clique pour voir la solution</div>
    </article>
  );
}
