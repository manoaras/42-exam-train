/* Firebase (clés publiques par conception — la sécurité vient des règles Firestore) */
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, deleteUser, type User } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import type { ProgressMap } from "./types";

const config = {
  apiKey: "AIzaSyAyFiyfJjWADAPczQ9zmRA_Z4XRITdMbl4",
  authDomain: "exam-train-9bafa.firebaseapp.com",
  projectId: "exam-train-9bafa",
  storageBucket: "exam-train-9bafa.firebasestorage.app",
  messagingSenderId: "88623378922",
  appId: "1:88623378922:web:fb915d8b759584c9e60293",
};

const app = () => (getApps().length ? getApps()[0] : initializeApp(config));

export const watchAuth = (cb: (u: User | null) => void) => onAuthStateChanged(getAuth(app()), cb);
export const googleSignIn = () => signInWithPopup(getAuth(app()), new GoogleAuthProvider());
export const googleSignOut = () => signOut(getAuth(app()));

export async function fetchCloudProgress(uid: string): Promise<ProgressMap> {
  const snap = await getDoc(doc(getFirestore(app()), "users", uid));
  return snap.exists() ? ((snap.data().progress as ProgressMap) ?? {}) : {};
}
export async function saveCloudProgress(uid: string, progress: ProgressMap): Promise<void> {
  // données minimales : progression + horodatage, rien de sensible
  await setDoc(doc(getFirestore(app()), "users", uid), { progress, updatedAt: Date.now() });
}

/* Efface toutes les données cloud de l'utilisateur (document Firestore) */
export async function deleteCloudData(uid: string): Promise<void> {
  await deleteDoc(doc(getFirestore(app()), "users", uid));
}

/* Supprime le compte Firebase (données cloud incluses).
 * Peut lever `auth/requires-recent-login` : l'appelant doit gérer ce cas. */
export async function deleteAccount(): Promise<void> {
  const u = getAuth(app()).currentUser;
  if (!u) return;
  await deleteDoc(doc(getFirestore(app()), "users", u.uid)).catch(() => undefined);
  await deleteUser(u);
}
