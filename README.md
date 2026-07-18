# 42 Exam Train 🍜

Site d'entraînement aux exams Python de 42 : sujets officiels par rank et niveaux, exercices d'entraînement par concept, mode quiz en conditions réelles.

👉 **[Ouvrir le site](https://manoaras.github.io/42-exam-train/)**

## Fonctionnalités
- **Sujets officiels** organisés par tabs (Basic, Medium…) et sous-niveaux, avec analogies, consignes et exemples vérifiés.
- **Solutions au clic** : la carte s'ouvre en fenêtre, avec bouton copier.
- **Mode quiz** ⚡ : éditeur Python intégré + correcteur **grademe** qui exécute et valide ton code dans le navigateur. Chrono 3 h façon exam avec tirage aléatoire de sujets, ou mode libre.
- **Progression** : statuts *vu / réussi / à revoir* mémorisés, jauge de maîtrise, reset complet.
- **Connexion Google** (optionnelle) : synchronise ta progression entre tes appareils.

## Utilisation
Ouvre simplement le site — aucun compte requis. La connexion Google est proposée uniquement pour retrouver ta progression partout. Seule ta progression est stockée : aucune donnée personnelle.

📱 Sur iPhone : Safari → Partager → « Sur l'écran d'accueil » pour l'utiliser comme une app.

## Développement
```bash
npm i -g typescript
tsc -p tsconfig.json     # compile app.ts → app.js, à réinjecter dans index.html
```
Le contenu est piloté par les données : pour ajouter un exercice, ajoute un objet au tableau `EXERCISES` dans `app.ts` — grille, filtres et quiz s'adaptent automatiquement.

---
Projet personnel d'étudiant 42 · non affilié à 42.
