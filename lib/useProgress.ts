"use client";
/* Progression : localStorage + synchro Firestore (fusion "meilleur statut gagne")
 * + session utilisateur (profil Google, overrides locaux prénom/nom/description) */
import { useCallback, useEffect, useRef, useState } from "react";
import type { CloudUser, ProfilePatch, ProgressMap, Status } from "./types";
import { fetchCloudProgress, googleSignIn, googleSignOut, saveCloudProgress, watchAuth } from "./firebase";

const STORE_KEY = "rank04-progress-v1";
export const PROFILE_KEY = "et-profile-v1";
const RANKV: Record<Status, number> = { seen: 1, review: 2, success: 3 };

const readProfile = (): ProfilePatch => {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) ?? "{}") as ProfilePatch; }
  catch { return {}; }
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [user, setUser] = useState<CloudUser | null>(null);
  const [authReady, setAuthReady] = useState(false); // évite le flash de l'écran de connexion
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
      if (!u) { setUser(null); setAuthReady(true); return; }
      const parts = (u.displayName ?? "").trim().split(/\s+/).filter(Boolean);
      const ov = readProfile();
      setUser({
        uid: u.uid,
        email: u.email ?? "",
        photo: u.photoURL ?? "",
        firstName: ov.firstName ?? (parts[0] ?? ""),
        lastName: ov.lastName ?? parts.slice(1).join(" "),
        bio: ov.bio ?? "",
      });
      setAuthReady(true);
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

  /* Met à jour prénom / nom / description : état + localStorage */
  const updateProfile = useCallback((patch: ProfilePatch) => {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...readProfile(), ...patch })); } catch { /* rien */ }
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  /* Efface les préférences locales (profil personnalisé) */
  const clearProfile = useCallback(() => {
    try { localStorage.removeItem(PROFILE_KEY); } catch { /* rien */ }
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, bio: "" }; // prénom/nom Google seront restaurés à la prochaine session
    });
  }, []);

  return {
    progress, user, authReady, setStatus, reset,
    updateProfile, clearProfile,
    signIn: googleSignIn, signOut: googleSignOut,
  };
}
