/* Accès privé : whitelist d'e-mails Google.
 * ⚠️ Le contrôle UI seul ne suffit pas sur un site statique : duplique cette liste
 * dans les règles Firestore (voir firestore.rules) pour protéger les données. */

export const ALLOWED_EMAILS: readonly string[] = [
  "manoatony.pro@gmail.com",
  "manoatony@gmail.com",
  // ajoute ici les e-mails autorisés (en minuscules)
];

export const isAllowed = (email?: string | null): boolean =>
  !!email && ALLOWED_EMAILS.includes(email.toLowerCase().trim());
