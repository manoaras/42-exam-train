/* =========================================================================
   Rank 04 · Exam Medium Python — Trainer (TypeScript source)
   Un seul site, deux vues (Officiels / Entraînement) + un mode quiz.
   Piloté par les données : pour ajouter un exercice, ajoute un objet à
   EXERCISES — la grille, les sections, le filtre et le quiz s'adaptent seuls.
   ========================================================================= */

type View = "official" | "training";

interface Exercise {
  view: View;
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

const HERO: Record<View, { kicker: string; h1: string; sub: string }> = {
  official: {
    kicker: "Sujets officiels · Exam Medium Python",
    h1: "Exercices officiels",
    sub: `Les sujets <b>réellement tombés</b> à ton exam medium (rank 04). Tente-les en conditions, puis révèle la <b>solution la plus courte</b>.`,
  },
  training: {
    kicker: "Entraînement · Exam Medium Python",
    h1: "Exercices d'entraînement",
    sub: `Des exercices dans le <b>format de l'exam</b>, rangés par concept, pour muscler tes réflexes. Solutions masquées, en <b>version la plus courte</b>.`,
  },
};

/* ---- Données des exercices -------------------------------------------- */
const EXERCISES: Exercise[] = [
  /* ============ OFFICIELS ============ */
  {
    view: "official", section: "Sujets tombés à l'exam", num: "01",
    heading: `<span class="file">is_rotation.py</span>`,
    tag: "doubled list trick",
    analogy: `🎡 Une roue qui tourne : colle-la deux fois bout à bout, et toute rotation devient une simple tranche continue dans cette roue doublée.`,
    brief: [
      `Détermine si <code>arr2</code> est une rotation de <code>arr1</code> (à gauche ou à droite).`,
      `Longueurs différentes → <code>False</code>. Deux listes vides → <code>True</code>.`,
      `Exemple : <code>is_rotation([1,2,3,4,5], [4,5,1,2,3])</code> → <code>True</code>`,
    ],
    signature: `def is_rotation(arr1: list, arr2: list) -> bool:`,
    solution: `def is_rotation(arr1: list, arr2: list) -> bool:
    if len(arr1) != len(arr2):
        return False

    double = arr1 + arr1

    return any(double[i:i+len(arr2)] == arr2 for i in range(len(arr1)))


print(is_rotation([1, 2, 3, 4, 5], [4, 5, 1, 2, 3]))  # True
print(is_rotation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))  # True
print(is_rotation([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]))  # False
print(is_rotation([1, 2, 3, 4, 5], [1, 2, 3, 4]))     # False`,
    note: `<b>Le trick à connaître :</b> coller la liste à elle-même (<code>arr1 + arr1</code>) fait apparaître <b>toutes</b> les rotations possibles comme sous-tranches consécutives. Il suffit de vérifier si <code>arr2</code> en est une — même trick que pour la rotation de strings (<code>s2 in s1+s1</code>).`,
    search: "is_rotation rotation liste doubled list trick",
  },
  {
    view: "official", section: "Sujets tombés à l'exam", num: "02",
    heading: `<span class="file">constellation_mapper.py</span>`,
    tag: "grid + tuple unpack",
    analogy: `🌌 Une carte du ciel : tu poses une grille vide de points, puis tu allumes une étoile à chaque coordonnée — en ignorant celles hors du cadre.`,
    brief: [
      `Construit une grille <code>size</code> × <code>size</code> de <code>"."</code>, avec un <code>"*"</code> à chaque coordonnée <code>(ligne, colonne)</code> fournie.`,
      `Ignore les coordonnées hors-grille et les doublons.`,
      `Exemple : <code>constellation_mapper([(0,0),(1,1),(2,2)], 3)</code> → <code>["*..", ".*.", "..*"]</code>`,
    ],
    signature: `def constellation_mapper(stars: list[tuple[int, int]], size: int) -> list[str]:`,
    solution: `def constellation_mapper(stars: list[tuple[int, int]], size: int) -> list[str]:
    grid = [['.'] * size for _ in range(size)]

    for row, col in stars:
        if 0 <= row < size and 0 <= col < size:
            grid[row][col] = '*'

    return [''.join(line) for line in grid]


print(constellation_mapper([(0, 0), (1, 1), (2, 2)], 3))
# output: ['*..', '.*.', '..*']

print(constellation_mapper([(0, 0), (1, 2), (3, 4)], 3))
# output: ['*..', '..*', '...']

print(constellation_mapper([(0, 0), (1, 2), (3, 4)], 4))
# output: ['*...', '..*.', '....', '....']

print(constellation_mapper([(0, 0), (1, 2), (3, 4)], 5))
# output: ['*....', '..*..', '.....', '.....', '.....']`,
    note: `<b>2 réflexes utiles :</b> une grille se construit avec une compréhension imbriquée (une ligne = <code>size</code> points), et rallumer deux fois la même case avec <code>'*'</code> ne change rien — les doublons sont donc ignorés <b>gratuitement</b>.`,
    search: "constellation_mapper grille grid tuple etoiles stars",
  },
  {
    view: "official", section: "Sujets tombés à l'exam", num: "03",
    heading: `<span class="file">list_intersection_finder.py</span>`,
    badge: "Attempt 1", tag: "set + intersection",
    analogy: `🎯 Plusieurs groupes d'amis : l'intersection, c'est <b>qui est présent dans TOUS les groupes</b>. Les doublons dans un même groupe ne comptent pas.`,
    brief: [
      `Retourne les éléments présents dans <b>toutes</b> les listes.`,
      `Ordre croissant, <b>sans doublons</b>.`,
      `Exemple : <code>list_intersection_finder([[1,2,2,3],[2,3,4],[0,2,3,3]])</code> → <code>[2, 3]</code>`,
    ],
    signature: `def list_intersection_finder(lists: list[list[int]]) -> list[int]:`,
    solution: `def list_intersection_finder(lists: list[list[int]]) -> list[int]:
    if not lists:
        return []

    return sorted(set(lists[0]).intersection(*lists))


print(list_intersection_finder([[1, 2, 2, 3], [2, 3, 4], [0, 2, 3, 3]]))
# output: [2, 3]`,
    note: `<b>3 cadeaux gratuits :</b> <code>set()</code> supprime les doublons, <code>.intersection(*lists)</code> croise avec toutes les listes en une fois (l'étoile <code>*</code> les déballe en arguments), et <code>sorted()</code> trie + reconvertit en liste.`,
    search: "list_intersection_finder intersection set ensembles attempt 1",
  },
  {
    view: "official", section: "Sujets tombés à l'exam", num: "04",
    heading: `<span class="file">merge_sorted_list.py</span>`,
    tag: "flatten + sorted",
    analogy: `🗂️ Plusieurs piles de cartes déjà triées : le plus simple est de tout reposer sur la table en un seul tas, puis de re-trier une bonne fois pour toutes.`,
    brief: [
      `Fusionne toutes les sous-listes (déjà triées) en une seule liste triée croissante.`,
      `Garde les doublons ; ignore les sous-listes vides ; liste vide → <code>[]</code>.`,
      `Exemple : <code>merge_sorted_list([[1,4,5],[1,3,4],[2,6]])</code> → <code>[1, 1, 2, 3, 4, 4, 5, 6]</code>`,
    ],
    signature: `def merge_sorted_list(lists: list[list[int]]) -> list[int]:`,
    solution: `def merge_sorted_lists(lists: list[list[int]]) -> list[int]:
    if not lists:
        return []

    # merged_list = []

    # for lst in lists:
    #     merged_list.extend(lst)

    merged_list = [item for sublist in lists for item in sublist]
    return sorted(merged_list)


print(merge_sorted_lists([[1, 4, 5], [1, 3, 4], [2, 6]]))
# output: [1, 1, 2, 3, 4, 4, 5, 6]`,
    note: `<b>Pas besoin de fusion "intelligente" :</b> puisque <code>sorted()</code> trie déjà très bien, aplatir toutes les sous-listes en une seule (compréhension imbriquée) puis trier une fois suffit — inutile de comparer les têtes de listes une par une.`,
    search: "merge_sorted_list fusion flatten sorted",
  },
  {
    view: "official", section: "Sujets tombés à l'exam", num: "05",
    heading: `<span class="file">palindrome_partitioner.py</span>`,
    tag: "DP palindrome",
    analogy: `✂️ Découper un mot en morceaux tous lisibles à l'endroit comme à l'envers — en cherchant le minimum de coups de ciseaux.`,
    brief: [
      `Trouve le nombre minimal de coupes pour que chaque morceau de <code>s</code> soit un palindrome.`,
      `Chaîne vide, longueur 1, ou déjà palindrome → <code>0</code> coupe.`,
      `Exemple : <code>palindrome_partitioner("aab")</code> → <code>1</code> (<code>"aa"</code> + <code>"b"</code>)`,
    ],
    signature: `def palindrome_partitioner(s: str) -> int:`,
    solution: `def palindrome_partitioner(string: str) -> int:
    def is_palindrome(sub: str) -> bool:
        return sub == sub[::-1]

    length = len(string)
    cuts = [0] * length

    for end in range(length):
        min_cut = end
        for start in range(end + 1):
            if is_palindrome(string[start:end + 1]):
                min_cut = 0 if start == 0 else min(min_cut, cuts[start - 1] + 1)
        cuts[end] = min_cut

    return cuts[length - 1] if length else 0


print(palindrome_partitioner("aaabc"))  # output: 1`,
    note: `<b>Le duo gagnant :</b> un helper <code>is_palindrome</code> (<code>sub == sub[::-1]</code>) + la table <code>cuts[i]</code> qui garde le minimum de coupes jusqu'à la position <code>i</code> — programmation dynamique lisible.`,
    search: "palindrome_partitioner palindrome coupes dp programmation dynamique",
  },
  {
    view: "official", section: "Sujets tombés à l'exam", num: "06",
    heading: `<span class="file">sliding_window_maximum.py</span>`,
    badge: "Attempt 2", tag: "list comprehension",
    analogy: `🚂 La fenêtre d'un train le long d'un quai : tu vois <code>k</code> personnes, tu notes la plus grande, puis le train avance d'un cran.`,
    brief: [
      `Fais glisser une fenêtre de taille <code>k</code> ; note le <b>maximum</b> de chaque position.`,
      `Cas limites : liste vide, <code>k &lt;= 0</code>, <code>k &gt; len(nums)</code> → retourne <code>[]</code>.`,
      `Exemple : <code>sliding_window_maximum([1,3,-1,-3,5,3,6,7], 3)</code> → <code>[3, 3, 5, 5, 6, 7]</code>`,
    ],
    signature: `def sliding_window_maximum(nums: list[int], k: int) -> list[int]:`,
    solution: `def sliding_window_maximum(nums: list[int], k: int) -> list[int]:
    if not nums or k <= 0 or k > len(nums):
        return []

    result = []

    for i in range(len(nums) - k + 1):
        result += [max(nums[i:i+k])]

    return result
    # return [max(nums[i:i+k]) for i in range(len(nums) - k + 1)]


print(sliding_window_maximum([1, 3, -1, -3, 5, 3, 6, 7], 3))
# output: [3, 3, 5, 5, 6, 7]`,
    note: `<b>Le compteur clé :</b> <code>len(nums) - k + 1</code> = le nombre de fenêtres. Avec 8 cases et <code>k=3</code>, la fenêtre démarre en 0…5 → <code>8-3+1=6</code>. <b>La compréhension</b> remplace la boucle <code>for</code> + <code>append</code> en une ligne.`,
    search: "sliding_window_maximum window fenetre max comprehension attempt 2",
  },

  /* ============ ENTRAÎNEMENT ============ */
  {
    view: "training", section: "Fonctions — slicing & matrices", num: "01",
    heading: `<span class="file">rotate_list.py</span>`,
    tag: "slicing + modulo",
    analogy: `🎡 Un manège : les chevaux qui sortent à droite reviennent par la gauche. Rien ne se perd, tout tourne.`,
    brief: [
      `Décale la liste de <code>k</code> positions vers la <b>droite</b>.`,
      `Gère <code>k &gt; len(nums)</code> (astuce : <code>k % len(nums)</code>) et la liste vide.`,
      `Exemple : <code>rotate_list([1,2,3,4,5], 2)</code> → <code>[4, 5, 1, 2, 3]</code>`,
    ],
    signature: `def rotate_list(nums: list[int], k: int) -> list[int]:`,
    solution: `def rotate_list(nums, k):
    if not nums:
        return []
    k = k % len(nums)              # k=7, 5 éléments → k=2
    return nums[-k:] + nums[:-k]     # la fin + le début, recollés`,
    note: `<b>Le slicing fait tout :</b> <code>nums[-k:]</code> prend les <code>k</code> derniers (ceux qui repassent devant), <code>nums[:-k]</code> prend le reste. Le <code>%</code> évite le crash quand <code>k</code> dépasse la taille.`,
    search: "rotate_list rotation slicing modulo manege",
  },
  {
    view: "training", section: "Fonctions — slicing & matrices", num: "02",
    heading: `<span class="file">column_sums.py</span>`,
    tag: "zip + sum",
    analogy: `📊 Un tableur : tu additionnes chaque <b>colonne</b> de haut en bas.`,
    brief: [
      `Retourne la somme de chaque colonne.`,
      `Retourne <code>[]</code> si la matrice est vide.`,
      `Exemple : <code>column_sums([[1,2,3],[4,5,6]])</code> → <code>[5, 7, 9]</code>`,
    ],
    signature: `def column_sums(matrix: list[list[int]]) -> list[int]:`,
    solution: `def column_sums(matrix):
    if not matrix:
        return []
    # zip(*matrix) fait PIVOTER la matrice : les colonnes deviennent des lignes
    return [sum(col) for col in zip(*matrix)]`,
    note: `<b>L'astuce :</b> <code>zip(*matrix)</code> transpose la matrice. <code>[[1,2,3],[4,5,6]]</code> devient <code>(1,4), (2,5), (3,6)</code> — chaque colonne devient un groupe passé à <code>sum()</code>. Ça remplace la double boucle imbriquée.`,
    search: "column_sums colonnes matrice zip sum tableur",
  },
  {
    view: "training", section: "Méthodes intégrées — str & dict", num: "03",
    heading: `<span class="file">caesar_cipher.py</span>`,
    tag: "ord() / chr()",
    analogy: `🔐 Une roue de décodeur : chaque lettre avance de <code>shift</code> crans, et après <code>z</code> on revient à <code>a</code>.`,
    brief: [
      `Décale chaque lettre de <code>shift</code> ; les autres caractères restent inchangés.`,
      `Le retour à <code>a</code> après <code>z</code> doit fonctionner (idem majuscules).`,
      `Exemple : <code>caesar_cipher("abc", 1)</code> → <code>"bcd"</code> · <code>caesar_cipher("xyz", 3)</code> → <code>"abc"</code>`,
    ],
    signature: `def caesar_cipher(text: str, shift: int) -> str:`,
    solution: `def caesar_cipher(text, shift):
    out = ""
    for ch in text:
        if ch.isalpha():
            base = ord("A") if ch.isupper() else ord("a")
            out += chr((ord(ch) - base + shift) % 26 + base)
        else:
            out += ch
    return out`,
    note: `<b>Ici le <code>for</code> reste le plus court proprement</b> (la logique majuscule/minuscule casse un one-liner). <code>ord("a")</code> → 97, <code>chr(97)</code> → <code>"a"</code>. On ramène en 0-25 (<code>- base</code>), on décale, <code>% 26</code> pour boucler, puis on remet la base.`,
    search: "caesar_cipher chiffrement ord chr decalage lettres",
  },
  {
    view: "training", section: "Méthodes intégrées — str & dict", num: "04",
    heading: `<span class="file">char_frequency_sorter.py</span>`,
    tag: "Counter + sorted(key)",
    analogy: `🏆 Un classement : du caractère le plus fréquent au moins fréquent. En cas d'égalité, l'ordre alphabétique départage.`,
    brief: [
      `Compte chaque caractère, puis trie par <b>fréquence décroissante</b>.`,
      `En cas d'égalité : <b>ordre alphabétique</b> croissant.`,
      `Exemple : <code>char_frequency_sorter("aabbbc")</code> → <code>[('b', 3), ('a', 2), ('c', 1)]</code>`,
    ],
    signature: `def char_frequency_sorter(text: str) -> list[tuple[str, int]]:`,
    solution: `from collections import Counter

def char_frequency_sorter(text):
    counts = Counter(text)          # compte TOUT en une ligne
    # tri (-fréquence, caractère) : gros nombres d'abord, puis alphabétique
    return sorted(counts.items(), key=lambda item: (-item[1], item[0]))`,
    note: `<b><code>Counter</code></b> remplace toute la boucle de comptage. <b>Le tri double critère :</b> la <code>key</code> renvoie <code>(-item[1], item[0])</code> — le <code>-</code> rend la fréquence décroissante, et à égalité le caractère trie en alphabétique croissant.`,
    search: "char_frequency_sorter frequence counter tri sorted key classement",
  },
  {
    view: "training", section: "Créer tes propres classes", num: "05",
    heading: `Classe <span class="file">Stack</span> (pile)`,
    tag: "class + méthodes",
    analogy: `🥞 Une pile d'assiettes : on ajoute et on retire <b>toujours par le haut</b>. Dernière posée = première reprise (LIFO).`,
    brief: [
      `<code>push</code> ajoute au sommet, <code>pop</code> retire et renvoie le sommet.`,
      `<code>peek</code> regarde le sommet sans le retirer.`,
      `<code>pop</code> et <code>peek</code> sur une pile vide → renvoient <code>None</code>.`,
    ],
    signature: `class Stack:
    def __init__(self) -> None:
    def push(self, value: int) -> None:   # ajoute au sommet
    def pop(self) -> int:                # retire & renvoie le sommet
    def peek(self) -> int:               # regarde sans retirer
    def is_empty(self) -> bool:`,
    solution: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, value):
        self.items.append(value)
    def pop(self):
        return self.items.pop() if self.items else None
    def peek(self):
        return self.items[-1] if self.items else None
    def is_empty(self):
        return not self.items`,
    note: `<b><code>self</code> = le « moi » de l'objet.</b> <code>self.items</code> appartient à cette pile précise ; deux <code>Stack()</code> ont chacune leur liste. <code>... if self.items else None</code> gère la pile vide en une ligne.`,
    search: "stack pile push pop peek lifo classe methodes assiettes",
  },
  {
    view: "training", section: "Créer tes propres classes", num: "06",
    heading: `Classe <span class="file">Grades</span> (bulletin)`,
    tag: "class + sum / max",
    analogy: `🎓 Un carnet de notes : tu stockes les notes, puis tu calcules moyenne et meilleure note.`,
    brief: [
      `<code>add</code> ajoute une note à la collection interne.`,
      `<code>average</code> renvoie la moyenne, ou <code>0.0</code> si vide.`,
      `<code>highest</code> renvoie la meilleure note, ou <code>None</code> si vide.`,
    ],
    signature: `class Grades:
    def __init__(self) -> None:
    def add(self, note: int) -> None:   # ajoute une note
    def average(self) -> float:         # moyenne (0.0 si vide)
    def highest(self) -> int:           # meilleure note (None si vide)`,
    solution: `class Grades:
    def __init__(self):
        self.notes = []
    def add(self, note):
        self.notes.append(note)
    def average(self):
        return sum(self.notes) / len(self.notes) if self.notes else 0.0
    def highest(self):
        return max(self.notes) if self.notes else None`,
    note: `<b><code>sum()</code> et <code>max()</code></b> font le travail des boucles manuelles. Le test <code>if self.notes else …</code> gère le carnet vide (évite la division par zéro et le <code>max()</code> sur liste vide qui planterait).`,
    search: "grades bulletin notes average moyenne highest max sum classe",
  },
];

const exId = (ex: Exercise): string => `${ex.view}-${ex.num}`;

/* ---- Coloration syntaxique Python ------------------------------------- */
const KW = ["def","class","if","elif","else","return","for","while","in","not","or","and","None","True","False","from","import","lambda"];
const FN = ["sorted","set","len","max","min","sum","zip","range","ord","chr","append","pop","items","isalpha","isupper","Counter","intersection","get","any","join","print","list","tuple","dict","float","bool","str","int"];
const S0="\uE000", S1="\uE001", K0="\uE100", K1="\uE101", F0="\uE200", F1="\uE201";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightLine(line: string): string {
  let code = line, comment = "";
  const h = line.indexOf("#");
  if (h >= 0) { code = line.slice(0, h); comment = line.slice(h); }
  let s = esc(code);
  const strings: string[] = [];
  s = s.replace(/"[^"]*"|'[^']*'/g, (m) => { strings.push(m); return S0 + (strings.length - 1) + S1; });
  s = s.replace(new RegExp("\\b(" + KW.join("|") + ")\\b", "g"), (m) => K0 + m + K1);
  s = s.replace(new RegExp("\\b(" + FN.join("|") + ")\\b", "g"), (m) => F0 + m + F1);
  s = s.replace(new RegExp(S0 + "(\\d+)" + S1, "g"), (_m, i: string) => `<span class="s">${strings[+i]}</span>`);
  s = s.split(K0).join(`<span class="k">`).split(K1).join("</span>");
  s = s.split(F0).join(`<span class="f">`).split(F1).join("</span>");
  if (comment) s += `<span class="c">${esc(comment)}</span>`;
  return s;
}
function highlight(code: string): string {
  return code.split("\n").map(highlightLine).join("\n");
}

/* ---- Progression persistante ------------------------------------------ */
type Status = "success" | "review" | "seen";
type ProgressMap = Record<string, Status>;
const STORE_KEY = "rank04-progress-v1";

function loadProgress(): ProgressMap {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}") as ProgressMap; }
  catch { return {}; } // ex: aperçu sandboxé → on retombe sur une session en mémoire
}
function saveProgress(): void {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch { /* pas de persistance ici */ }
}
let progress: ProgressMap = loadProgress();

function statusMeta(st: Status | undefined): { cls: string; txt: string } | null {
  if (st === "success") return { cls: "ok", txt: "✓ réussi" };
  if (st === "review")  return { cls: "warn", txt: "↻ à revoir" };
  if (st === "seen")    return { cls: "seen", txt: "vu" };
  return null;
}
function statusHTML(id: string): string {
  const m = statusMeta(progress[id]);
  return m
    ? `<span class="status ${m.cls}" data-status-for="${id}">${m.txt}</span>`
    : `<span class="status" data-status-for="${id}" hidden></span>`;
}
function refreshStatus(id: string): void {
  const el = grid.querySelector(`.status[data-status-for="${id}"]`) as HTMLElement | null;
  if (!el) return;
  const m = statusMeta(progress[id]);
  el.className = "status" + (m ? " " + m.cls : "");
  el.textContent = m ? m.txt : "";
  if (m) el.removeAttribute("hidden"); else el.setAttribute("hidden", "");
}
function setStatus(id: string, st: Status): void {
  // on ne "rétrograde" jamais un exercice déjà réussi vers "vu"
  if (st === "seen" && progress[id]) return;
  progress[id] = st;
  saveProgress();
  refreshStatus(id);
  refreshStats();
}
function refreshStats(): void {
  const list = EXERCISES.filter((e) => e.view === view);
  let s = 0, r = 0;
  for (const e of list) {
    const st = progress[exId(e)];
    if (st === "success") s++;
    else if (st === "review") r++;
  }
  statSuccess.textContent = String(s);
  statReview.textContent = String(r);
  barEl.style.width = (list.length ? (s / list.length) * 100 : 0) + "%";
}

/* ---- Références DOM ---------------------------------------------------- */
const grid = document.getElementById("grid") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const statSuccess = document.getElementById("stat-success") as HTMLElement;
const statReview = document.getElementById("stat-review") as HTMLElement;
const barEl = document.getElementById("progress-bar") as HTMLElement;
const emptyEl = document.getElementById("empty") as HTMLElement;
const heroKicker = document.getElementById("hero-kicker") as HTMLElement;
const heroH1 = document.getElementById("hero-h1") as HTMLElement;
const heroSub = document.getElementById("hero-sub") as HTMLElement;
const footerEl = document.getElementById("footer") as HTMLElement;
const segButtons = Array.from(document.querySelectorAll(".seg button")) as HTMLButtonElement[];
const quizToggle = document.getElementById("quiz-toggle") as HTMLButtonElement;
const resetBtn = document.getElementById("reset-progress") as HTMLButtonElement;
const browseEl = document.getElementById("browse") as HTMLElement;
const quizEl = document.getElementById("quiz") as HTMLElement;
const tabsEl = document.getElementById("rank-tabs") as HTMLElement;
const overlayEl = document.getElementById("overlay") as HTMLElement;
const modalEl = document.getElementById("modal") as HTMLElement;

const RANK_TABS = [
  "C - Programming Fundamentals",
  "Basic Python Algorithms",
  "Medium Python Algorithms",
  "Challenging Python Algorithms",
  "In-depth Python Algorithms",
];
const ACTIVE_TAB = 2; // Medium — seul onglet rempli pour l'instant

function renderTabs(): void {
  if (view !== "official") { tabsEl.innerHTML = ""; return; }
  tabsEl.innerHTML = RANK_TABS.map((name, i) =>
    `<button type="button" ${i === ACTIVE_TAB ? 'class="active"' : "disabled title=\"Bientôt : ajoute tes sujets !\""}>${name}</button>`
  ).join("");
}

function openModal(ex: Exercise): void {
  setStatus(exId(ex), "seen");
  modalEl.innerHTML = `<button class="modal-close" type="button" aria-label="Fermer">✕</button>
    <div class="head"><span class="num">${ex.num}</span><h2 class="title">${ex.heading}</h2><span class="tag">${ex.tag}</span></div>
    <div class="code-wrap"><button class="copy-btn" type="button">Copier</button><pre>${highlight(ex.solution)}</pre></div>
    <p class="sol-note">${ex.note}</p>`;
  overlayEl.hidden = false;
  (modalEl.querySelector(".modal-close") as HTMLButtonElement).focus();
}
function closeModal(): void { overlayEl.hidden = true; }

let view: View = "official";

/* ---- Rendu (mode navigation) ------------------------------------------ */
function cardHTML(ex: Exercise): string {
  const id = exId(ex);
  const badge = ex.badge ? `<span class="badge-real">${ex.badge}</span>` : "";
  const bullets = ex.brief.map((b) => `<li>${b}</li>`).join("");
  return `<article class="card" data-id="${id}" data-search="${ex.search}" tabindex="0" role="button" aria-haspopup="dialog">
    <div class="head">
      <span class="num">${ex.num}</span>
      <h2 class="title">${ex.heading}</h2>
      ${badge}
      <span class="tag">${ex.tag}</span>
      ${statusHTML(id)}
    </div>
    <p class="analogy">${ex.analogy}</p>
    <pre class="proto">${highlight(ex.signature)}</pre>
    <ul class="consigne">${bullets}</ul>
    <div class="hint-open">▶ Clique pour voir la solution</div>
  </article>`;
}


function applySearch(): void {
  const q = searchInput.value.toLowerCase().trim();
  const cards = Array.from(grid.querySelectorAll(".card")) as HTMLElement[];
  let visible = 0;
  cards.forEach((c) => {
    const match = (c.dataset.search || "").includes(q);
    c.style.display = match ? "" : "none";
    if (match) visible++;
  });
  const headers = Array.from(grid.querySelectorAll(".section-title")) as HTMLElement[];
  headers.forEach((hdr) => {
    let el = hdr.nextElementSibling;
    let any = false;
    while (el && !el.classList.contains("section-title")) {
      if (el.classList.contains("card") && (el as HTMLElement).style.display !== "none") any = true;
      el = el.nextElementSibling;
    }
    hdr.style.display = q && !any ? "none" : "";
  });
  emptyEl.classList.toggle("show", visible === 0);
}

function render(): void {
  const list = EXERCISES.filter((e) => e.view === view);
  const sections: string[] = [];
  const seen = new Set<string>();
  for (const e of list) if (!seen.has(e.section)) { seen.add(e.section); sections.push(e.section); }

  let html = "";
  for (const sec of sections) {
    const items = list.filter((e) => e.section === sec);
    html += `<div class="section-title"><span class="dot"></span>${sec}<span class="count">${items.length} exo${items.length > 1 ? "s" : ""}</span></div>`;
    html += items.map(cardHTML).join("");
  }
  grid.innerHTML = html;
  renderTabs();

  heroKicker.textContent = HERO[view].kicker;
  heroH1.textContent = HERO[view].h1;
  heroSub.innerHTML = HERO[view].sub;
  footerEl.innerHTML = `${list.length} exercices · <span class="v">versions courtes</span> — bon courage pour l'exam 🍜`;

  applySearch();
  refreshStats();
}

/* ---- Interactions (mode navigation) ----------------------------------- */
segButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const v = btn.dataset.view as View;
    if (v === view) return;
    view = v;
    document.body.classList.toggle("view-official", view === "official");
    document.body.classList.toggle("view-training", view === "training");
    segButtons.forEach((b) => b.classList.toggle("active", b.dataset.view === view));
    searchInput.value = "";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

searchInput.addEventListener("input", applySearch);

resetBtn.addEventListener("click", () => {
  if (!confirm("Réinitialiser toute ta progression (réussis, à revoir, vus) ?")) return;
  progress = {};
  saveProgress();
  render();
});

grid.addEventListener("click", (e) => {
  const card = (e.target as HTMLElement).closest(".card") as HTMLElement | null;
  if (!card || !card.dataset.id) return;
  const ex = EXERCISES.find((x) => exId(x) === card.dataset.id);
  if (ex) openModal(ex);
});
grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = (e.target as HTMLElement).closest(".card") as HTMLElement | null;
  if (!card || !card.dataset.id) return;
  e.preventDefault();
  const ex = EXERCISES.find((x) => exId(x) === card.dataset.id);
  if (ex) openModal(ex);
});
overlayEl.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (t === overlayEl || t.classList.contains("modal-close")) { closeModal(); return; }
  if (t.classList.contains("copy-btn")) {
    const pre = t.parentElement!.querySelector("pre") as HTMLPreElement;
    navigator.clipboard.writeText(pre.innerText).then(() => {
      t.textContent = "✓ Copié"; t.classList.add("done");
      setTimeout(() => { t.textContent = "Copier"; t.classList.remove("done"); }, 1500);
    });
  }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlayEl.hidden) closeModal(); });

/* ======================================================================
   MODE QUIZ
   ====================================================================== */
type Verdict = "success" | "review" | "skip";
interface QuizConfig { source: "official" | "training" | "all"; order: "ordered" | "shuffle"; perMs: number; only?: string[]; }
interface QuizState {
  queue: Exercise[]; index: number; revealed: boolean;
  results: Record<string, Verdict>; perMs: number;
  startedAt: number; elapsedTotal: number; timerId: number | null;
}
let quiz: QuizState | null = null;
let lastConfig: QuizConfig = { source: "official", order: "ordered", perMs: 300000 };

function q(sel: string): HTMLElement | null { return quizEl.querySelector(sel) as HTMLElement | null; }

function fmtClock(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function enterQuiz(): void {
  document.body.classList.add("mode-quiz");
  browseEl.hidden = true;
  quizEl.hidden = false;
  quizToggle.textContent = "✕ Quitter le quiz";
  lastConfig.source = view;
  renderSetup();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function exitQuiz(): void {
  if (quiz && quiz.timerId) clearInterval(quiz.timerId);
  quiz = null;
  document.body.classList.remove("mode-quiz");
  quizEl.hidden = true;
  browseEl.hidden = false;
  quizToggle.textContent = "▶ Mode quiz";
  render(); // reflète les nouveaux statuts sur les cartes
}

function renderSetup(): void {
  const s = lastConfig.source, o = lastConfig.order, t = String(lastConfig.perMs / 1000);
  const on = (a: string, b: string) => (a === b ? " active" : "");
  quizEl.innerHTML = `<div class="quiz-setup">
    <h2>Mode quiz</h2>
    <p class="quiz-lead">Conditions d'exam : un exercice à la fois, solution cachée, minuteur. À la fin, ton score — et les exercices « à revoir » sont mémorisés.</p>
    <div class="q-field"><label>Source</label><div class="segroup" data-group="source">
      <button type="button" data-val="official" class="${on(s,"official").trim()}">Officiels</button>
      <button type="button" data-val="training" class="${on(s,"training").trim()}">Entraînement</button>
      <button type="button" data-val="all" class="${on(s,"all").trim()}">Tout</button></div></div>
    <div class="q-field"><label>Ordre</label><div class="segroup" data-group="order">
      <button type="button" data-val="ordered" class="${on(o,"ordered").trim()}">Dans l'ordre</button>
      <button type="button" data-val="shuffle" class="${on(o,"shuffle").trim()}">Aléatoire</button></div></div>
    <div class="q-field"><label>Temps / exercice</label><div class="segroup" data-group="time">
      <button type="button" data-val="0" class="${on(t,"0").trim()}">Aucun</button>
      <button type="button" data-val="180" class="${on(t,"180").trim()}">3 min</button>
      <button type="button" data-val="300" class="${on(t,"300").trim()}">5 min</button>
      <button type="button" data-val="600" class="${on(t,"600").trim()}">10 min</button></div></div>
    <button type="button" class="q-start" id="q-start">Démarrer le quiz →</button>
  </div>`;

  quizEl.querySelectorAll(".segroup").forEach((group) => {
    group.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      });
    });
  });
  (q("#q-start") as HTMLButtonElement).addEventListener("click", () => {
    const val = (grp: string): string => {
      const b = quizEl.querySelector(`[data-group="${grp}"] button.active`) as HTMLElement | null;
      return b?.dataset.val || "";
    };
    lastConfig = {
      source: (val("source") || "official") as QuizConfig["source"],
      order: (val("order") || "ordered") as QuizConfig["order"],
      perMs: (parseInt(val("time"), 10) || 0) * 1000,
    };
    startQuiz(lastConfig);
  });
}

function startQuiz(cfg: QuizConfig): void {
  let pool = cfg.source === "all" ? EXERCISES.slice() : EXERCISES.filter((e) => e.view === cfg.source);
  if (cfg.only) pool = pool.filter((e) => cfg.only!.includes(exId(e)));
  if (cfg.order === "shuffle") shuffle(pool);
  if (pool.length === 0) { renderSetup(); return; }
  quiz = { queue: pool, index: 0, revealed: false, results: {}, perMs: cfg.perMs, startedAt: 0, elapsedTotal: 0, timerId: null };
  renderQuestion();
}

function startTimer(): void {
  if (!quiz) return;
  quiz.startedAt = Date.now();
  if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
  const el = q("#q-timer");
  if (quiz.perMs <= 0) { if (el) el.textContent = "∞"; return; }
  const tick = () => {
    if (!quiz) return;
    const remaining = quiz.perMs - (Date.now() - quiz.startedAt);
    const e = q("#q-timer");
    if (e) {
      e.textContent = fmtClock(remaining);
      e.classList.toggle("danger", remaining <= 30000 && remaining > 0);
      e.classList.toggle("over", remaining <= 0);
    }
  };
  tick();
  quiz.timerId = window.setInterval(tick, 250);
}

function stopTimer(): void {
  if (!quiz) return;
  if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
  quiz.elapsedTotal += Date.now() - quiz.startedAt;
}

function renderQuestion(): void {
  if (!quiz) return;
  if (quiz.index >= quiz.queue.length) { renderResults(); return; }
  const ex = quiz.queue[quiz.index];
  const badge = ex.badge ? `<span class="badge-real">${ex.badge}</span>` : "";
  const bullets = ex.brief.map((b) => `<li>${b}</li>`).join("");
  const pct = (quiz.index / quiz.queue.length) * 100;
  quiz.revealed = false;

  quizEl.innerHTML = `<div class="quiz-run">
    <div class="q-top">
      <span class="q-count">Exercice ${quiz.index + 1} / ${quiz.queue.length}</span>
      <span class="q-timer" id="q-timer">—</span>
    </div>
    <div class="q-bar"><i style="width:${pct}%"></i></div>
    <article class="card q-card">
      <div class="head">
        <span class="num">${ex.num}</span>
        <h2 class="title">${ex.heading}</h2>
        ${badge}<span class="tag">${ex.tag}</span>
      </div>
      <p class="analogy">${ex.analogy}</p>
      <pre class="proto">${highlight(ex.signature)}</pre>
      <ul class="consigne">${bullets}</ul>
      <div class="q-solution" id="q-solution" hidden>
        <div class="code-wrap"><button class="copy-btn" type="button">Copier</button><pre>${highlight(ex.solution)}</pre></div>
        <p class="sol-note">${ex.note}</p>
      </div>
      <div class="q-actions" id="q-actions">
        <button type="button" class="q-primary" id="q-reveal">Révéler la solution</button>
        <button type="button" class="ghost" id="q-skip">Passer</button>
      </div>
      <div class="q-verdict" id="q-verdict" hidden>
        <span class="q-verdict-label">Comment t'en es-tu sorti ?</span>
        <button type="button" class="ok" id="q-success">✓ Réussi</button>
        <button type="button" class="warn" id="q-review">✗ À revoir</button>
      </div>
    </article>
  </div>`;

  (q("#q-reveal") as HTMLButtonElement).addEventListener("click", reveal);
  (q("#q-skip") as HTMLButtonElement).addEventListener("click", () => nextWith("skip"));
  (q("#q-success") as HTMLButtonElement).addEventListener("click", () => nextWith("success"));
  (q("#q-review") as HTMLButtonElement).addEventListener("click", () => nextWith("review"));

  startTimer();
}

function reveal(): void {
  if (!quiz || quiz.revealed) return;
  quiz.revealed = true;
  stopTimer();
  const sol = q("#q-solution"), act = q("#q-actions"), ver = q("#q-verdict");
  if (sol) sol.hidden = false;
  if (act) act.hidden = true;
  if (ver) ver.hidden = false;
}

function nextWith(v: Verdict): void {
  if (!quiz) return;
  if (!quiz.revealed) stopTimer(); // "Passer" avant d'avoir révélé
  const ex = quiz.queue[quiz.index];
  quiz.results[exId(ex)] = v;
  if (v === "success" || v === "review") setStatus(exId(ex), v);
  quiz.index++;
  renderQuestion();
}

function renderResults(): void {
  if (!quiz) return;
  const total = quiz.queue.length;
  let success = 0; const toReview: Exercise[] = [];
  for (const ex of quiz.queue) {
    const v = quiz.results[exId(ex)];
    if (v === "success") success++;
    else toReview.push(ex);
  }
  const pct = Math.round((success / total) * 100);
  const C = 2 * Math.PI * 52;
  const offset = C * (1 - pct / 100);

  const reviewHTML = toReview.length
    ? `<div class="review-list"><h3>À revoir (${toReview.length})</h3><ul>${
        toReview.map((e) => `<li><code>${e.heading.replace(/<[^>]+>/g, "")}</code></li>`).join("")
      }</ul></div>`
    : `<p class="results-time" style="color:var(--ok)">Sans faute — impeccable ! 🎉</p>`;

  const redoBtn = toReview.length
    ? `<button type="button" class="ghost" id="q-redo">Rejouer les ${toReview.length} ratés</button>`
    : "";

  quizEl.innerHTML = `<div class="quiz-results">
    <svg class="ring" viewBox="0 0 120 120">
      <circle class="ring-bg" cx="60" cy="60" r="52"></circle>
      <circle class="ring-fg" cx="60" cy="60" r="52" transform="rotate(-90 60 60)"
        style="stroke-dasharray:${C.toFixed(1)};stroke-dashoffset:${offset.toFixed(1)}"></circle>
      <text class="ring-text" x="60" y="69">${pct}%</text>
    </svg>
    <h2>${success} / ${total} réussis</h2>
    <p class="results-time">Temps total : ${fmtClock(quiz.elapsedTotal)}</p>
    ${reviewHTML}
    <div class="q-actions">
      <button type="button" class="q-primary" id="q-restart">Recommencer</button>
      ${redoBtn}
      <button type="button" class="ghost" id="q-quit">Retour aux exercices</button>
    </div>
  </div>`;

  const reviewIds = toReview.map(exId);
  (q("#q-restart") as HTMLButtonElement).addEventListener("click", () => startQuiz(lastConfig));
  (q("#q-quit") as HTMLButtonElement).addEventListener("click", exitQuiz);
  const redo = q("#q-redo") as HTMLButtonElement | null;
  if (redo) redo.addEventListener("click", () => startQuiz({ ...lastConfig, order: "ordered", only: reviewIds }));

  quiz = null; // le quiz est terminé ; les stats sont déjà sauvegardées
}

// copier depuis la solution révélée en quiz
quizEl.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (!t.classList.contains("copy-btn")) return;
  const pre = t.parentElement!.querySelector("pre") as HTMLPreElement;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    t.textContent = "✓ Copié"; t.classList.add("done");
    setTimeout(() => { t.textContent = "Copier"; t.classList.remove("done"); }, 1500);
  });
});

// raccourcis clavier en quiz : Entrée/Espace = révéler, 1 = réussi, 2 = à revoir
document.addEventListener("keydown", (e) => {
  if (!document.body.classList.contains("mode-quiz") || !quiz) return;
  if (e.key === "Enter" || e.key === " ") {
    if (!quiz.revealed && q("#q-reveal")) { e.preventDefault(); reveal(); }
  } else if (quiz.revealed && e.key === "1") { nextWith("success"); }
  else if (quiz.revealed && e.key === "2") { nextWith("review"); }
});

quizToggle.addEventListener("click", () => {
  if (document.body.classList.contains("mode-quiz")) exitQuiz();
  else enterQuiz();
});

/* ---- Démarrage --------------------------------------------------------- */
document.body.classList.add("view-official");
render();
