# 42 Exam Train 🍜

Site d'entraînement aux exams Python de 42 : sujets officiels par rank et niveaux, exercices d'entraînement par concept, mode quiz en conditions réelles.

👉 **[Ouvrir le site](https://manoaras.github.io/42-exam-train/)**

## Fonctionnalités
- **Sujets officiels** organisés par tabs (Basic, Medium…) et sous-niveaux.
- **Solutions au clic**, en fenêtre, avec bouton copier.
- **Mode quiz** ⚡ (connexion requise) : éditeur Python + correcteur **grademe** qui exécute ton code dans le navigateur. Chrono 3 h façon exam avec tirage aléatoire, ou mode libre.
- **Progression** *vu / réussi / à revoir* mémorisée, synchronisée entre appareils via **connexion Google**.

## Stack
Next.js (App Router) · React · TypeScript · Firebase (Auth + Firestore) · Pyodide. Export statique déployé sur GitHub Pages par GitHub Actions à chaque push.

## Développement
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # export statique dans out/
```

## Structure
```
app/          layout (footer, fonts) · page (vues, tabs, grille) · globals.css
components/   Toolbar · ExerciseCard · Modal · SolutionModal · AuthModal · ResetModal · QuizModal
lib/          types · exercises (données) · grademe(-data) · highlight · firebase · useProgress
```
Le contenu est piloté par les données : ajoute un objet dans `lib/exercises.ts`, tout s'adapte (grille, filtres, quiz).

---
Projet personnel d'étudiant 42 · version non officielle et non commerciale, à usage d'entraînement · non affilié à 42.
