"use client";
/* Progression : localStorage + synchro Firestore (fusion "meilleur statut gagne") */
import { useCallback, useEffect, useRef, useState } from "react";
import type { CloudUser, ProgressMap, Status } from "./types";
import { fetchCloudProgress, googleSignIn, googleSignOut, saveCloudProgress, watchAuth } from "./firebase";

const STORE_KEY = "rank04-progress-v1";
const RANKV: Record<Status, number> = { seen: 1, review: 2, success: 3 };

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [user, setUser] = useState<CloudUser | null>(null);
  const saveTimer = useRef<number | null>(null);
  const userRef = useRef<CloudUser | null>(null);
  userRef.current = user;

  // chargement local au montage
  useEffect(() => {
    try { setProgress(JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") as ProgressMap); }
    catch { /* stockage indisponible → session en mémoire */ }
  }, []);

  // écoute de session + fusion cloud à la connexion
  useEffect(() => {
    const unsub = watchAuth(async (u) => {
      if (!u) { setUser(null); return; }
      setUser({ uid: u.uid, name: (u.displayName ?? "").split(" ")[0] || "Connecté", photo: u.photoURL ?? "" });
      try {
        const remote = await fetchCloudProgress(u.uid);
        setProgress((local) => {
          const merged = { ...local };
          for (const [k, v] of Object.entries(remote)) {
            if (!merged[k] || RANKV[v] > RANKV[merged[k]]) merged[k] = v;
          }
          persist(merged, u.uid);
          return merged;
        });
      } catch { /* lecture cloud impossible : on reste en local */ }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (p: ProgressMap, uid?: string) => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch { /* rien */ }
    const id = uid ?? userRef.current?.uid;
    if (!id) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => { saveCloudProgress(id, p).catch(() => undefined); }, 800);
  };

  const setStatus = useCallback((exid: string, st: Status) => {
    setProgress((prev) => {
      if (st === "seen" && prev[exid]) return prev; // jamais rétrograder
      const next = { ...prev, [exid]: st };
      persist(next);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    setProgress({});
    try { localStorage.removeItem(STORE_KEY); } catch { /* rien */ }
    if (userRef.current) saveCloudProgress(userRef.current.uid, {}).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, user, setStatus, reset, signIn: googleSignIn, signOut: googleSignOut };
}
