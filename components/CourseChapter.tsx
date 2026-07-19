"use client";
/* Rendu d'un chapitre de cours : sections repliables, code copiable, tableaux, encadrés */
import CopyButton from "./CopyButton";
import { highlight } from "@/lib/highlight";
import type { CourseBlock, CourseChapter } from "@/lib/courses";

const TONE_ICON = { analogy: "▚", tip: "✓", warn: "⚠" } as const;

function Block({ b }: { b: CourseBlock }) {
  switch (b.t) {
    case "p":
      return <p className="lrn-p" dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "ul":
      return (
        <ul className="consigne lrn-ul">
          {b.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}
        </ul>
      );
    case "code":
      return (
        <div className="code-wrap lrn-code">
          {b.label && <span className="lrn-code-lang" aria-hidden>{b.label}</span>}
          <CopyButton text={b.code} ariaLabel="Copier ce code" />
          <pre dangerouslySetInnerHTML={{ __html: highlight(b.code, b.lang) }} />
        </div>
      );
    case "table":
      return (
        <div className="lrn-table-wrap">
          <table className="lrn-table">
            <thead>
              <tr>{b.head.map((h, i) => <th key={i} dangerouslySetInnerHTML={{ __html: h }} />)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "box":
      return (
        <aside className={`lrn-box ${b.tone}`}>
          <span className="lrn-box-lbl">{TONE_ICON[b.tone]} {b.title}</span>
          <p dangerouslySetInnerHTML={{ __html: b.html }} />
        </aside>
      );
  }
}

interface Props { chapter: CourseChapter; anchorPrefix: string }

export default function CourseChapterView({ chapter, anchorPrefix }: Props) {
  return (
    <div className="lrn-sections">
      {chapter.sections.map((sec, i) => (
        <details key={sec.id} id={`${anchorPrefix}-${sec.id}`} className="lrn-section" open data-section>
          <summary>
            <span className="lrn-sec-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{sec.title}</h3>
            <span className="chev" aria-hidden>▸</span>
          </summary>
          <div className="lrn-sec-body">
            {sec.blocks.map((b, j) => <Block key={j} b={b} />)}
          </div>
        </details>
      ))}
    </div>
  );
}
