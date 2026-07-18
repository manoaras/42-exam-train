"use client";
import { useState } from "react";
import Modal from "./Modal";
import type { CloudUser } from "@/lib/types";

interface Props {
  open: boolean; onClose: () => void;
  user: CloudUser | null;
  signIn: () => Promise<unknown>; signOut: () => Promise<void>;
  reason?: string; // ex: "Le mode quiz nécessite une connexion"
}

export default function AuthModal({ open, onClose, user, signIn, signOut, reason }: Props) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const doSignIn = async () => {
    setBusy(true); setError("");
    try { await signIn(); onClose(); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  const doSignOut = async () => { await signOut(); onClose(); };

  return (
    <Modal open={open} onClose={onClose}>
      {user ? (
        <div className="dialog">
          <h2>Ton compte</h2>
          <div className="account">
            {user.photo && (
                // eslint-disable-next-line @next/next/no-img-element -- avatar Google externe, next/image inutile en export statique
                <img src={user.photo} alt="" referrerPolicy="no-referrer" />
              )}
            <div>
              <b>{user.name}</b>
              <span className="dialog-sub">Progression synchronisée ☁</span>
            </div>
          </div>
          <p className="dialog-text">En te déconnectant, ta progression reste sauvegardée dans le cloud et te retrouvera à ta prochaine connexion.</p>
          <div className="dialog-actions">
            <button className="ghost" type="button" onClick={onClose}>Rester connecté</button>
            <button className="btn-danger" type="button" onClick={doSignOut}>Se déconnecter</button>
          </div>
        </div>
      ) : (
        <div className="dialog">
          <h2>Connexion</h2>
          {reason && <p className="dialog-callout">🔒 {reason}</p>}
          <p className="dialog-text">Connecte-toi avec Google pour synchroniser ta progression entre tous tes appareils. Seule ta progression est stockée — aucune donnée personnelle.</p>
          {error && <p className="dialog-error">{error}</p>}
          <div className="dialog-actions">
            <button className="ghost" type="button" onClick={onClose}>Annuler</button>
            <button className="btn-google" type="button" onClick={doSignIn} disabled={busy}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path fill="#EA4335" d="M12 5.04c1.68 0 3.19.58 4.38 1.71l3.27-3.27C17.64 1.64 15.02.6 12 .6 7.31.6 3.26 3.28 1.28 7.2l3.81 2.96C6.02 7.31 8.77 5.04 12 5.04Z"/><path fill="#4285F4" d="M23.4 12.27c0-.94-.08-1.62-.25-2.34H12v4.43h6.47c-.13 1.08-.84 2.71-2.4 3.81l3.72 2.88c2.23-2.06 3.61-5.09 3.61-8.78Z"/><path fill="#FBBC05" d="M5.1 14.11a7.15 7.15 0 0 1 0-4.22L1.28 6.93a11.44 11.44 0 0 0 0 10.14l3.82-2.96Z"/><path fill="#34A853" d="M12 23.4c3.02 0 5.56-1 7.41-2.72l-3.72-2.88c-1 .7-2.34 1.19-3.69 1.19-3.23 0-5.98-2.27-6.9-5.32L1.28 16.7C3.26 20.72 7.31 23.4 12 23.4Z"/></svg>
              {busy ? "Connexion…" : "Continuer avec Google"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
