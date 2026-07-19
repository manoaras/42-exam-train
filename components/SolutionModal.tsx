"use client";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import type { Exercise } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props { ex: Exercise | null; onClose: () => void }

export default function SolutionModal({ ex, onClose }: Props) {
  if (!ex) return null;
  return (
    <Modal open onClose={onClose} wide>
      <div className="head">
        <span className="num">{ex.num}</span>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: ex.heading }} />
        <span className="tag">{ex.tag}</span>
      </div>
      <div className="code-wrap">
        <CopyButton text={ex.solution} ariaLabel="Copier la solution" />
        <pre dangerouslySetInnerHTML={{ __html: highlight(ex.solution, ex.lang) }} />
      </div>
      <p className="sol-note" dangerouslySetInnerHTML={{ __html: ex.note }} />
    </Modal>
  );
}
