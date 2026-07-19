"use client";
import type { Exercise, Status } from "@/lib/types";
import { highlight } from "@/lib/highlight";
import CopyButton from "./CopyButton";

const STATUS_META: Record<Status, { cls: string; txt: string }> = {
  success: { cls: "ok", txt: "🟢 fait" },
  review: { cls: "warn", txt: "🟡 retry" },
  seen: { cls: "seen", txt: "🔵 vu" },
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
      {/* zone prototype : neutre vis-à-vis de la carte (copie ou clic → pas de modal) */}
      <div
        className="code-wrap proto-wrap"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <CopyButton text={ex.signature} ariaLabel="Copier le prototype" />
        <pre className="proto" dangerouslySetInnerHTML={{ __html: highlight(ex.signature, ex.lang) }} />
      </div>
      <ul className="consigne">
        {ex.brief.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}
      </ul>
      <div className="hint-open">▶ Clique pour voir la solution</div>
    </article>
  );
}
