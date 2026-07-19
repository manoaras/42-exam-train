"use client";
/* Paramètres du compte : Profil · Apparence · Données · Session */
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useTheme, type ThemePref } from "@/lib/useTheme";
import { deleteAccount, deleteCloudData } from "@/lib/firebase";
import type { CloudUser, ProfilePatch } from "@/lib/types";

interface Props {
  open: boolean; onClose: () => void;
  user: CloudUser;
  updateProfile: (p: ProfilePatch) => void;
  clearProfile: () => void;
  resetProgress: () => void;
  signOut: () => Promise<void>;
}

/* Action destructive avec confirmation en deux temps */
function DangerAction({ title, desc, confirmLabel, onConfirm }: {
  title: string; desc: string; confirmLabel: string; onConfirm: () => void;
}) {
  const [armed, setArmed] = useState(false);
  return (
    <div className="danger-row">
      <div>
        <b>{title}</b>
        <p className="dialog-sub">{desc}</p>
      </div>
      {armed ? (
        <span className="danger-confirm">
          <button className="ghost" type="button" onClick={() => setArmed(false)}>Annuler</button>
          <button className="btn-danger" type="button" onClick={() => { setArmed(false); onConfirm(); }}>{confirmLabel}</button>
        </span>
      ) : (
        <button className="btn-danger-outline" type="button" onClick={() => setArmed(true)}>Supprimer</button>
      )}
    </div>
  );
}

const THEMES: { value: ThemePref; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "🖥" },
];

export default function SettingsModal({ open, onClose, user, updateProfile, clearProfile, resetProgress, signOut }: Props) {
  const { pref, setPref, clearPref } = useTheme();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // resynchronise le formulaire à chaque ouverture
  useEffect(() => {
    if (open) { setFirstName(user.firstName); setLastName(user.lastName); setBio(user.bio); setSaved(false); setError(""); }
  }, [open, user.firstName, user.lastName, user.bio]);

  const dirty = firstName !== user.firstName || lastName !== user.lastName || bio !== user.bio;
  const saveProfile = () => {
    updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), bio: bio.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const doDeleteAccount = async () => {
    setError("");
    try { await deleteAccount(); onClose(); }
    catch (e) {
      const code = (e as { code?: string }).code ?? "";
      setError(code === "auth/requires-recent-login"
        ? "Par sécurité, reconnecte-toi puis réessaie la suppression du compte."
        : `Suppression impossible : ${(e as Error).message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="dialog settings">
        <h2>Paramètres</h2>

        {/* ---- Profil ---- */}
        <section className="settings-section">
          <h3>Profil</h3>
          <div className="account">
            {user.photo && (
              // eslint-disable-next-line @next/next/no-img-element -- avatar Google externe, next/image inutile en export statique
              <img src={user.photo} alt={`Photo de ${user.firstName}`} referrerPolicy="no-referrer" />
            )}
            <div>
              <b>{firstName || user.firstName} {lastName}</b>
              <span className="dialog-sub">{user.email}</span>
            </div>
          </div>
          <div className="field-row">
            <label className="field">Prénom
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
            </label>
            <label className="field">Nom
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
            </label>
          </div>
          <label className="field">Description
            <textarea rows={2} value={bio} maxLength={160} placeholder="Une courte description (objectif, rank visé…)"
              onChange={(e) => setBio(e.target.value)} />
          </label>
          {dirty && <button className="q-primary slim" type="button" onClick={saveProfile}>Enregistrer</button>}
          {saved && <span className="t-ok save-ok">✓ Profil enregistré</span>}
        </section>

        {/* ---- Apparence ---- */}
        <section className="settings-section">
          <h3>Apparence</h3>
          <div className="segroup" role="radiogroup" aria-label="Thème">
            {THEMES.map((t) => (
              <button key={t.value} type="button" role="radio" aria-checked={pref === t.value}
                className={`segbtn${pref === t.value ? " active" : ""}`}
                onClick={() => setPref(t.value)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <p className="dialog-sub">Le thème est sauvegardé sur cet appareil. « System » suit le réglage de ton OS.</p>
        </section>

        {/* ---- Données ---- */}
        <section className="settings-section">
          <h3>Données</h3>
          <p className="dialog-sub">
            Ces actions sont définitives. Ta progression est stockée en local et dans le cloud ;
            tes préférences (thème, profil) uniquement sur cet appareil.
          </p>
          <DangerAction
            title="Progression" desc="Efface tous les statuts (fait, retry, vu), en local et dans le cloud."
            confirmLabel="Effacer" onConfirm={resetProgress}
          />
          <DangerAction
            title="Préférences" desc="Réinitialise le thème et le profil personnalisé sur cet appareil."
            confirmLabel="Réinitialiser" onConfirm={() => { clearPref(); clearProfile(); }}
          />
          <DangerAction
            title="Données utilisateur" desc="Efface progression + préférences + document cloud, sans supprimer le compte."
            confirmLabel="Tout effacer"
            onConfirm={() => { resetProgress(); clearPref(); clearProfile(); deleteCloudData(user.uid).catch(() => undefined); }}
          />
          <DangerAction
            title="Compte" desc="Supprime définitivement ton compte et toutes ses données cloud."
            confirmLabel="Supprimer le compte" onConfirm={() => { void doDeleteAccount(); }}
          />
          {error && <p className="dialog-error">{error}</p>}
        </section>

        {/* ---- Session ---- */}
        <section className="settings-section">
          <h3>Session</h3>
          <p className="dialog-sub">Ta progression reste sauvegardée dans le cloud et te retrouvera à ta prochaine connexion.</p>
          <button className="ghost" type="button" onClick={async () => { await signOut(); onClose(); }}>
            ⎋ Se déconnecter
          </button>
        </section>
      </div>
    </Modal>
  );
}
