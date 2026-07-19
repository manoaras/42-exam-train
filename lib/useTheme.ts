"use client";
/* Thème Light / Dark / System — persisté, appliqué via [data-theme] sur <html>.
 * Un script inline dans layout.tsx applique le thème avant le premier rendu (pas de flash). */
import { useCallback, useEffect, useState } from "react";

export type ThemePref = "light" | "dark" | "system";
export const THEME_KEY = "et-theme";

const readPref = (): ThemePref => {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch { return "system"; }
};

const apply = (pref: ThemePref) => {
  const resolved = pref === "system"
    ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    : pref;
  document.documentElement.dataset.theme = resolved;
};

export function useTheme() {
  const [pref, setPrefState] = useState<ThemePref>("system");

  useEffect(() => {
    const stored = readPref();
    setPrefState(stored);
    apply(stored);
    // suit l'OS quand le mode "system" est actif
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => { if (readPref() === "system") apply("system"); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setPref = useCallback((p: ThemePref) => {
    setPrefState(p);
    try { localStorage.setItem(THEME_KEY, p); } catch { /* rien */ }
    apply(p);
  }, []);

  const clearPref = useCallback(() => {
    try { localStorage.removeItem(THEME_KEY); } catch { /* rien */ }
    setPrefState("system");
    apply("system");
  }, []);

  return { pref, setPref, clearPref };
}
