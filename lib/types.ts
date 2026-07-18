export type View = "official" | "training";
export type Status = "seen" | "review" | "success";
export type ProgressMap = Record<string, Status>;

export interface Exercise {
  view: View;
  tab?: number;    // onglet rank (page officiels) — 2 = Medium par défaut
  level?: number;  // sous-niveau (tab Basic)
  section: string;
  num: string;
  heading: string;
  badge?: string;
  tag: string;
  analogy: string;
  brief: string[];
  signature: string;
  solution: string;
  note: string;
  search: string;
}

export interface CloudUser { uid: string; name: string; photo: string }
