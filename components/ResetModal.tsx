"use client";
import Modal from "./Modal";

interface Props { open: boolean; onClose: () => void; onConfirm: () => void }

export default function ResetModal({ open, onClose, onConfirm }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="dialog">
        <h2>Réinitialiser la progression ?</h2>
        <p className="dialog-text">
          Tous les statuts — <b className="t-ok">✓ réussis</b>, <b className="t-warn">↻ à revoir</b> et <b>vus</b> —
          seront effacés, en local comme dans le cloud si tu es connecté. Cette action est définitive.
        </p>
        <div className="dialog-actions">
          <button className="ghost" type="button" onClick={onClose}>Annuler</button>
          <button className="btn-danger" type="button" onClick={() => { onConfirm(); onClose(); }}>⟳ Tout réinitialiser</button>
        </div>
      </div>
    </Modal>
  );
}
