"use client";
/* Porte d'accès privé : connexion Google obligatoire + whitelist (lib/access.ts) */
import { useState, type ReactNode } from "react";
import { isAllowed } from "@/lib/access";
import type { CloudUser } from "@/lib/types";

interface Props {
  user: CloudUser | null;
  authReady: boolean;
  signIn: () => Promise<unknown>;
  signOut: () => Promise<void>;
  children: ReactNode;
}

export default function AccessGate({ user, authReady, signIn, signOut, children }: Props) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const doSignIn = async () => {
    setBusy(true); setError("");
    try { await signIn(); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!authReady) {
    return (
      <div className="gate" aria-busy="true">
        <span className="gate-spinner" aria-label="Chargement" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="gate">
        <div className="gate-card">
          <span className="gate-icon">🔒</span>
          <h1>Accès privé</h1>
          <p className="dialog-text">
            Cette plateforme d&apos;entraînement est réservée aux comptes autorisés.
            Connecte-toi avec Google pour continuer.
          </p>
          {error && <p className="dialog-error">{error}</p>}
          <button className="btn-google" type="button" onClick={doSignIn} disabled={busy}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path fill="#EA4335" d="M12 5.04c1.68 0 3.19.58 4.38 1.71l3.27-3.27C17.64 1.64 15.02.6 12 .6 7.31.6 3.26 3.28 1.28 7.2l3.81 2.96C6.02 7.31 8.77 5.04 12 5.04Z"/><path fill="#4285F4" d="M23.4 12.27c0-.94-.08-1.62-.25-2.34H12v4.43h6.47c-.13 1.08-.84 2.71-2.4 3.81l3.72 2.88c2.23-2.06 3.61-5.09 3.61-8.78Z"/><path fill="#FBBC05" d="M5.1 14.11a7.15 7.15 0 0 1 0-4.22L1.28 6.93a11.44 11.44 0 0 0 0 10.14l3.82-2.96Z"/><path fill="#34A853" d="M12 23.4c3.02 0 5.56-1 7.41-2.72l-3.72-2.88c-1 .7-2.34 1.19-3.69 1.19-3.23 0-5.98-2.27-6.9-5.32L1.28 16.7C3.26 20.72 7.31 23.4 12 23.4Z"/></svg>
            {busy ? "Connexion…" : "Continuer avec Google"}
          </button>
        </div>
      </div>
    );
  }

  if (!isAllowed(user.email)) {
    return (
      <div className="gate">
        <div className="gate-card">
          <span className="gate-icon">⛔️</span>
          <h1>Accès refusé</h1>
          <p className="dialog-text">
            Le compte <b>{user.email}</b> n&apos;est pas autorisé à accéder à cette application.
          </p>
          <button className="ghost" type="button" onClick={() => signOut()}>Changer de compte</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
