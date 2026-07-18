"use client";
import { useState } from "react";
import Modal from "./Modal";
import type { Exercise } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props { ex: Exercise | null; onClose: () => void }

export default function SolutionModal({ ex, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  if (!ex) return null;
  const copy = () => {
    navigator.clipboard.writeText(ex.solution).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <Modal open onClose={onClose} wide>
      <div className="head">
        <span className="num">{ex.num}</span>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: ex.heading }} />
        <span className="tag">{ex.tag}</span>
      </div>
      <div className="code-wrap">
        <button className={`copy-btn${copied ? " done" : ""}`} type="button" onClick={copy}>
          {copied ? "✓ Copié" : "Copier"}
        </button>
        <pre dangerouslySetInnerHTML={{ __html: highlight(ex.solution, ex.lang) }} />
      </div>
      <p className="sol-note" dangerouslySetInnerHTML={{ __html: ex.note }} />
    </Modal>
  );
}
