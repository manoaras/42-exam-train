# Exam Medium Python 42 — Trainer

Un seul site, deux vues (**Officiels** / **Entraînement**), un **mode quiz** et une **progression mémorisée**. Piloté par les données, écrit en **TypeScript**.

## Fichiers
- **`index.html`** — le site prêt à l'emploi (CSS + JS intégrés). Ouvre-le, c'est tout. C'est le fichier « build ».
- **`app.ts`** — la source TypeScript : données (`EXERCISES`), coloration, rendu, quiz, progression. **On modifie ici.**
- **`tsconfig.json`** — config de compilation (ES2019, strict).

## Fonctionnalités
- **Bascule Officiels / Entraînement** (bouton segmenté), sans rechargement.
- **Grille responsive** qui remplit la largeur (1 à 3 colonnes).
- **Switch unique** « Tout déplier / replier ».
- **Filtre** en direct (nom, concept, mots-clés).
- **Mode quiz** : un exercice à la fois, solution cachée, minuteur configurable (aucun / 3 / 5 / 10 min), ordre normal ou aléatoire, source au choix. Auto-évaluation ✓/✗, écran de score (anneau + temps + liste « à revoir »), et bouton « rejouer les ratés ». Raccourcis : Entrée/Espace = révéler, 1 = réussi, 2 = à revoir.
- **Progression mémorisée** : chaque exercice porte un statut *vu* / *réussi* / *à revoir*, affiché en badge sur la carte et résumé dans la barre d'outils (✓ / ↻ + jauge de maîtrise). Bouton ⟳ pour réinitialiser.

## La progression, comment ça marche
Les statuts sont sauvegardés dans le **`localStorage`** du navigateur (clé `rank04-progress-v1`), donc ils persistent **quand tu ouvres le fichier localement** ou que tu l'héberges. L'accès est protégé par `try/catch` : si le navigateur bloque le stockage (ex. aperçu en bac à sable), l'app fonctionne quand même — la progression reste simplement valable le temps de la session. Pour une persistance garantie, ouvre `index.html` depuis ton disque ou ton hébergement.

## Développer (optionnel)
```bash
npm install -g typescript      # une fois
tsc -p tsconfig.json           # app.ts -> app.js
# puis réinjecter app.js dans index.html (balise <script> en bas) :
node -e "const t=require('fs').readFileSync('template.html','utf8'),j=require('fs').readFileSync('app.js','utf8');require('fs').writeFileSync('index.html',t.replace('/*__APP_JS__*/',j))"
```

## Ajouter un exercice
Ajoute un objet dans `EXERCISES` (dans `app.ts`) :
```ts
{
  view: "official",                    // "official" | "training"
  section: "Sujets tombés à l'exam",
  num: "07",
  heading: `<span class="file">mon_exo.py</span>`,
  tag: "concept clé",
  analogy: `🧩 Une analogie courte.`,
  brief: [ `Consigne 1`, `Exemple : ...` ],
  signature: `def mon_exo(x: int) -> int:`,
  solution: `def mon_exo(x):\n    return x * 2`,
  note: `<b>Le point clé :</b> ...`,
  search: "mon_exo mots cles",
}
```
Grille, sections, filtre, quiz et progression s'y adaptent automatiquement.

## Idées d'amélioration suivantes
- **Éditeur Python exécutable** (Pyodide) + tests auto par exercice (« grademe » maison).
- Données externalisées en **`exercises.json`**, bundler **Vite** (hot-reload, modules).
- Thème clair/sombre, numéros de ligne, layout masonry, badges de difficulté.
- Historique des sessions de quiz (courbe de progression dans le temps).

---

## Connexion Google + sauvegarde cloud (Firebase)

Le site fonctionne **sans rien configurer** (progression locale). Pour la synchro multi-appareils :

### 1. Créer le projet (5 min, gratuit)
1. https://console.firebase.google.com → **Créer un projet** (Analytics : non).
2. **Authentication → Get started → Sign-in method → Google → Activer** → Save.
3. **Firestore Database → Créer** → mode *production* → région `europe-west`.
4. **Paramètres du projet (⚙) → Vos applications → Web (</>)** → enregistre l'app → copie l'objet `firebaseConfig`.
5. Toujours dans Authentication → **Settings → Authorized domains** → ajoute `<ton-pseudo>.github.io` (et ton domaine custom).

### 2. Coller la config
Dans `index.html`, remplace :
```js
window.FIREBASE_CONFIG = null;
```
par :
```js
window.FIREBASE_CONFIG = { apiKey: "…", authDomain: "…", projectId: "…" };
```
(Ces clés sont **publiques par conception** — la sécurité vient des règles ci-dessous.)

### 3. Règles Firestore (Firestore → Règles → Publier)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
→ chaque utilisateur ne lit/écrit **que son propre document**.

### Données stockées (minimales)
`users/{uid}` : `{ progress: {exercice: statut}, updatedAt }` — aucun email, aucun nom, aucune donnée sensible. Le prénom/avatar affichés dans la barre viennent de la session Google côté navigateur, jamais de la base.

### Comportement
- Non connecté → progression en `localStorage` (comme avant).
- Connexion → **fusion** local/cloud (le meilleur statut gagne), puis sauvegarde auto (regroupée ~1 s) à chaque changement.
- Reset ⟳ → purge aussi le document cloud.
- Connexion **Apple** : nécessite l'Apple Developer Program (99 $/an) — non inclus ; Google fonctionne sur iPhone via Safari.
