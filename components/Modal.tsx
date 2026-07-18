"use client";
/* Modal générique : backdrop, Échap, verrouillage du scroll d'arrière-plan */
import { useEffect, type ReactNode } from "react";

interface Props { open: boolean; onClose: () => void; wide?: boolean; children: ReactNode }

export default function Modal({ open, onClose, wide, children }: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";           // pas de scroll derrière
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal${wide ? " modal-wide" : ""}`} role="dialog" aria-modal="true">
        <button className="modal-close" type="button" aria-label="Fermer" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
