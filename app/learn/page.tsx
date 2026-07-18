/* Espace cours : structure prête, contenus à venir */
import Link from "next/link";

export default function Learn() {
  return (
    <div className="shell view-training">
      <main className="wrap home">
        <header className="hero center">
          <div className="kicker">Cours · Exams 42</div>
          <h1>Les cours arrivent 📚</h1>
          <p className="sub">
            Cet espace accueillera des fiches par concept (sets, dict, récursion, deux pointeurs…),
            des mémos d&apos;exam et des ressources. En attendant, l&apos;entraînement est ouvert !
          </p>
        </header>
        <div className="home-cards single">
          <Link href="/train" className="home-card">
            <span className="home-icon">🎯</span>
            <h2>Aller à l&apos;entraînement</h2>
            <p>Sujets officiels, quiz grademe et suivi de progression.</p>
            <span className="home-cta">Commencer →</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
