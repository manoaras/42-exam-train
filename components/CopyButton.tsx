"use client";
/* Bouton copier réutilisable : copie immédiate + confirmation visuelle.
 * Fallback execCommand pour les navigateurs mobiles sans clipboard API en HTTP. */
import { useEffect, useRef, useState } from "react";

interface Props { text: string; label?: string; ariaLabel?: string }

export default function CopyButton({ text, label = "Copier", ariaLabel = "Copier le code" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // ne jamais déclencher la carte / modal parente
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className={`copy-btn${copied ? " done" : ""}`} type="button"
      aria-label={ariaLabel} aria-live="polite"
      onClick={copy}
    >
      {copied ? "✓ Copié" : label}
    </button>
  );
}
