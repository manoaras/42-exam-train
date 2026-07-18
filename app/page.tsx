/* Page d'accueil : point d'entrée vers les espaces de l'app */
import Link from "next/link";

export default function Home() {
  return (
    <div className="shell view-official">
      <main className="wrap home">
        <header className="hero center">
          <div className="kicker">Exams · 42</div>
          <h1>Prépare tes exams,<br />en conditions réelles.</h1>
          <p className="sub">
            Sujets officiels par rank et niveaux, éditeur Python avec correcteur <b>grademe</b>,
            chrono 3 h façon exam, et progression synchronisée entre tes appareils.
          </p>
        </header>
        <div className="home-cards">
          <Link href="/train" className="home-card">
            <span className="home-icon">🎯</span>
            <h2>Entraînement</h2>
            <p>Sujets officiels (C, Basic, Medium…), exercices par concept et mode quiz avec grademe.</p>
            <span className="home-cta">Commencer →</span>
          </Link>
          <div className="home-card disabled" aria-disabled="true">
            <span className="home-icon">📚</span>
            <h2>Cours <span className="soon">bientôt</span></h2>
            <p>Fiches de cours, mémos par concept et ressources pour réviser entre deux sessions.</p>
            <span className="home-cta">En préparation…</span>
          </div>
          <div className="home-card disabled" aria-disabled="true">
            <span className="home-icon">📈</span>
            <h2>Suivi <span className="soon">bientôt</span></h2>
            <p>Historique de tes quiz, courbes de progression et statistiques par niveau.</p>
            <span className="home-cta">En préparation…</span>
          </div>
        </div>
      </main>
    </div>
  );
}
