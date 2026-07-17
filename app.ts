/* =========================================================================
   Rank 04 · Exam Medium Python — Trainer (TypeScript source)
   Un seul site, deux vues (Officiels / Entraînement) + un mode quiz.
   Piloté par les données : pour ajouter un exercice, ajoute un objet à
   EXERCISES — la grille, les sections, le filtre et le quiz s'adaptent seuls.
   ========================================================================= */

type View = "official" | "training";

interface Exercise {
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

const HERO: Record<View, { kicker: string; h1: string; sub: string }> = {
  official: { kicker: "", h1: "", sub: "" }, // rempli dynamiquement selon la tab
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "01",
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "02",
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "03",
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "04",
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "05",
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
    view: "official", tab: 2, section: "Sujets tombés à l'exam", num: "06",
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

  /* ============ BASIC (tab 1) ============ */
  {
    view: "official", tab: 1, level: 1, section: "Niveau 1", num: "01",
    heading: `<span class="file">bracket_validator.py</span>`,
    tag: "stack (pile)",
    analogy: "🧱 Des poupées russes de parenthèses : chaque ouvrante doit retrouver SA fermante, dans le bon ordre.",
    brief: ["Vérifie que <code>()</code>, <code>[]</code>, <code>{}</code> sont bien appariés et imbriqués.", "Les autres caractères sont ignorés ; chaîne vide → <code>True</code>.", "Exemple : <code>bracket_validator(\"([]{})\")</code> → <code>True</code>", "Exemple : <code>bracket_validator(\"([)]\")</code> → <code>False</code>"],
    signature: "def bracket_validator(s: str) -> bool:",
    solution: "def bracket_validator(s: str) -> bool:\n    stack = []\n    bracket_map = {')': '(', ']': '[', '}': '{'}\n\n    for char in s:\n        if char in bracket_map.values():\n            stack.append(char)\n        elif char in bracket_map.keys():\n            if not stack or stack[-1] != bracket_map[char]:\n                return False\n            stack.pop()\n\n    return not stack",
    note: "<b>Le réflexe pile :</b> on empile chaque ouvrante ; à chaque fermante, le sommet doit être l'ouvrante correspondante (via un <code>dict</code> de correspondance). Valide si la pile finit vide.",
    search: "bracket_validator niveau 1 basic stack (pile)",
  },
  {
    view: "official", tab: 1, level: 1, section: "Niveau 1", num: "02",
    heading: `<span class="file">cryptic_sorter.py</span>`,
    tag: "sorted + clé multiple",
    analogy: "🏅 Un podium à 3 critères : d'abord la taille, puis l'alphabet, puis les voyelles départagent.",
    brief: ["Trie les chaînes par <b>longueur</b>, puis <b>ordre alphabétique</b> (insensible à la casse), puis <b>nombre de voyelles</b>.", "Exemple : <code>cryptic_sorter([\"banana\", \"kiwi\", \"apple\", \"fig\"])</code> → <code>['fig', 'kiwi', 'apple', 'banana']</code>", "Exemple : <code>cryptic_sorter([\"bb\", \"aa\", \"a\"])</code> → <code>['a', 'aa', 'bb']</code>"],
    signature: "def cryptic_sorter(strings: list[str]) -> list[str]:",
    solution: "def cryptic_sorter(strings: list[str]) -> list[str]:\n    def count_vowels(s: str) -> int:\n        return sum(1 for char in s.lower() if char in 'aeiou')\n\n    return sorted(\n        strings,\n        key=lambda s: (len(s), s.lower(), count_vowels(s))\n    )",
    note: "<b>Clé en tuple :</b> <code>key=lambda s: (len(s), s.lower(), count_vowels(s))</code> — Python compare critère par critère, exactement comme un classement à égalités.",
    search: "cryptic_sorter niveau 1 basic sorted + clé multiple",
  },
  {
    view: "official", tab: 1, level: 2, section: "Niveau 2", num: "03",
    heading: `<span class="file">echo_validator.py</span>`,
    tag: "palindrome + nettoyage",
    analogy: "🪞 Une phrase-miroir : on enlève le bruit (ponctuation, casse) et on vérifie qu'elle se lit pareil dans les deux sens.",
    brief: ["<code>True</code> si le texte est un palindrome en ignorant casse et caractères non alphabétiques.", "Exemple : <code>echo_validator(\"A man, a plan, a canal: Panama\")</code> → <code>True</code>", "Exemple : <code>echo_validator(\"Hello\")</code> → <code>False</code>"],
    signature: "def echo_validator(text: str) -> bool:",
    solution: "def echo_validator(text: str) -> bool:\n    cleaned_text = ''.join(c for c in text.lower() if c.isalpha())\n    return cleaned_text == cleaned_text[::-1]",
    note: "<b>2 étapes :</b> nettoyer (<code>c.isalpha()</code> + <code>lower()</code>) puis comparer au retourné <code>[::-1]</code>.",
    search: "echo_validator niveau 2 basic palindrome + nettoyage",
  },
  {
    view: "official", tab: 1, level: 2, section: "Niveau 2", num: "04",
    heading: `<span class="file">mirror_matrix.py</span>`,
    tag: "slicing [::-1]",
    analogy: "🪞 Chaque ligne passe devant le miroir : la première colonne devient la dernière.",
    brief: ["Retourne la matrice avec chaque <b>ligne inversée</b> (miroir horizontal).", "Exemple : <code>mirror_matrix([[1, 2, 3], [4, 5, 6]])</code> → <code>[[3, 2, 1], [6, 5, 4]]</code>", "Exemple : <code>mirror_matrix([])</code> → <code>[]</code>"],
    signature: "def mirror_matrix(matrix: list[list[int]]) -> list[list[int]]:",
    solution: "def mirror_matrix(matrix: list[list[int]]) -> list[list[int]]:\n    return [row[::-1] for row in matrix]",
    note: "<b>Une ligne suffit :</b> <code>[row[::-1] for row in matrix]</code> — le slicing inversé appliqué à chaque ligne.",
    search: "mirror_matrix niveau 2 basic slicing [::-1]",
  },
  {
    view: "official", tab: 1, level: 3, section: "Niveau 3", num: "05",
    heading: `<span class="file">hidenp.py</span>`,
    tag: "sous-séquence (2 curseurs)",
    analogy: "🕵️ Chercher un mot caché : les lettres de <code>s1</code> doivent apparaître dans <code>s2</code>, dans l'ordre, mais pas forcément collées.",
    brief: ["<code>True</code> si <code>s1</code> est une <b>sous-séquence</b> de <code>s2</code> (lettres dans l'ordre, pas nécessairement contiguës).", "Chaîne vide → <code>True</code> (toujours cachée).", "Exemple : <code>hidenp(\"fgex.;\", \"tyf34gdgf;'ektufjhgdgex.;.;rtjynur6\")</code> → <code>True</code>", "Exemple : <code>hidenp(\"abc\", \"acb\")</code> → <code>False</code>"],
    signature: "def hidenp(s1: str, s2: str) -> bool:",
    solution: "def hidenp(s1: str, s2: str) -> bool:\n    i = 0\n\n    for char in s2:\n        if i < len(s1) and char == s1[i]:\n            i += 1\n\n    return i == len(s1)\n\n\n# Version plus concise avec iter et all\ndef hidenp_iter(s1: str, s2: str) -> bool:\n    it = iter(s2)\n    return all(char in it for char in s1)",
    note: "<b>Un curseur sur <code>s1</code> :</b> on parcourt <code>s2</code> et on avance le curseur à chaque lettre retrouvée ; gagné si le curseur atteint la fin. La variante <code>iter</code> + <code>all</code> fait pareil en 2 lignes.",
    search: "hidenp niveau 3 basic sous-séquence (2 curseurs)",
  },
  {
    view: "official", tab: 1, level: 3, section: "Niveau 3", num: "06",
    heading: `<span class="file">inter.py</span>`,
    tag: "dedup ordonné",
    analogy: "🤝 Les caractères que deux chaînes ont en commun — chacun une seule fois, dans l'ordre de la première.",
    brief: ["Retourne les caractères présents dans <b>les deux</b> chaînes, <b>sans doublons</b>, dans l'ordre d'apparition de <code>s1</code>.", "Exemple : <code>inter(\"padinton\", \"paqefwtdjetyiytjneytjoeyjnejeyj\")</code> → <code>'padinto'</code>", "Exemple : <code>inter(\"ddf6vewg64f\", \"gtwthgsertyhrdthrtr\")</code> → <code>'dewg'</code>"],
    signature: "def inter(s1: str, s2: str) -> str:",
    solution: "def inter(s1: str, s2: str) -> str:\n    result: list[str] = []\n\n    for char in s1:\n        if char in s2 and char not in result:\n            result.append(char)\n\n    return ''.join(result)\n\n\n# Version plus concise avec dict.fromkeys\ndef inter_dict(s1: str, s2: str) -> str:\n    return ''.join(dict.fromkeys(c for c in s1 if c in s2))",
    note: "<b>2 versions :</b> la boucle lisible (test <code>in</code> + anti-doublon), ou la version <code>dict.fromkeys</code> qui dédoublonne en gardant l'ordre — un classique à connaître.",
    search: "inter niveau 3 basic dedup ordonné",
  },
  {
    view: "official", tab: 1, level: 3, section: "Niveau 3", num: "07",
    heading: `<span class="file">number_base_converter.py</span>`,
    tag: "int(x, base) + divisions",
    analogy: "🔢 Traducteur de bases : on repasse par la base 10 (langue pivot), puis on reconstruit chiffre par chiffre.",
    brief: ["Convertit <code>number</code> de <code>from_base</code> vers <code>to_base</code> (bases 2 à 36, chiffres <code>0-9A-Z</code>).", "Base ou nombre invalide → <code>\"ERROR\"</code> ; gère le signe négatif et le zéro.", "Exemple : <code>number_base_converter(\"FF\", 16, 2)</code> → <code>'11111111'</code>", "Exemple : <code>number_base_converter(\"1010\", 2, 10)</code> → <code>'10'</code>"],
    signature: "def number_base_converter(number: str, from_base: int, to_base: int) -> str:",
    solution: "def number_base_converter(number: str, from_base: int, to_base: int) -> str:\n    DIGITS = \"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\"\n\n    if not (2 <= from_base <= 36) or not (2 <= to_base <= 36):\n        return \"ERROR\"\n\n    try:\n        value = int(number, from_base)\n    except ValueError:\n        return \"ERROR\"\n\n    if value == 0:\n        return \"0\"\n\n    sign = \"-\" if value < 0 else \"\"\n    value = abs(value)\n\n    result = \"\"\n    while value > 0:\n        result = DIGITS[value % to_base] + result\n        value //= to_base\n\n    return sign + result",
    note: "<b>Le pivot base 10 :</b> <code>int(number, from_base)</code> lit tout seul (et lève <code>ValueError</code> si invalide → <code>try/except</code>), puis on divise par <code>to_base</code> en empilant les restes.",
    search: "number_base_converter niveau 3 basic int(x, base) + divisions",
  },
  {
    view: "official", tab: 1, level: 3, section: "Niveau 3", num: "08",
    heading: `<span class="file">pattern_tracker.py</span>`,
    tag: "zip(text, text[1:])",
    analogy: "🔍 Repérer les marches d'escalier : deux chiffres côte à côte où le second = le premier + 1.",
    brief: ["Compte les paires de chiffres <b>consécutifs croissants</b> (<code>d</code> suivi de <code>d+1</code>).", "<code>'9'</code> suivi de <code>'0'</code> ne compte pas.", "Exemple : <code>pattern_tracker(\"a12b34c90\")</code> → <code>2</code>", "Exemple : <code>pattern_tracker(\"123\")</code> → <code>2</code>"],
    signature: "def pattern_tracker(text: str) -> int:",
    solution: "def pattern_tracker(text: str) -> int:\n    count = 0\n    for i in range(len(text) - 1):\n        current_char = text[i]\n        next_char = text[i + 1]\n\n        if current_char.isdigit() and next_char.isdigit():\n            if (current_char == '9' and next_char == '0'):\n                continue\n            elif int(next_char) == int(current_char) + 1:\n                count += 1\n\n    return count\n\n\n# Version plus concise avec zip[tuple[str, str]]\ndef pattern_tracker_zip(text: str) -> int:\n    return sum(\n        1 for a, b in zip(text, text[1:])\n        if a.isdigit() and b.isdigit() and int(b) == int(a) + 1\n    )",
    note: "<b>Fenêtre de 2 :</b> <code>zip(text, text[1:])</code> donne toutes les paires voisines — la version concise tient en un <code>sum(...)</code>.",
    search: "pattern_tracker niveau 3 basic zip(text, text[1:])",
  },
  {
    view: "official", tab: 1, level: 4, section: "Niveau 4", num: "09",
    heading: `<span class="file">anagram.py</span>`,
    tag: "sorted + nettoyage",
    analogy: "🔀 Deux mots faits des mêmes lettres mélangées, espaces et casse mis de côté.",
    brief: ["<code>True</code> si <code>s1</code> et <code>s2</code> sont des anagrammes en ignorant <b>espaces</b> et <b>casse</b>.", "Exemple : <code>anagram(\"Listen\", \"Silent\")</code> → <code>True</code>", "Exemple : <code>anagram(\"dormitory\", \"dirty room\")</code> → <code>True</code>"],
    signature: "def anagram(s1: str, s2: str) -> bool:",
    solution: "def anagram(s1: str, s2: str) -> bool:\n    cleaned1 = sorted(s1.replace(\" \", \"\").lower())\n    cleaned2 = sorted(s2.replace(\" \", \"\").lower())\n    return cleaned1 == cleaned2",
    note: "<b>Normaliser puis trier :</b> <code>sorted(s.replace(\" \", \"\").lower())</code> pour chacune — mêmes lettres triées = anagrammes.",
    search: "anagram niveau 4 basic sorted + nettoyage",
  },
  {
    view: "official", tab: 1, level: 4, section: "Niveau 4", num: "10",
    heading: `<span class="file">shadow_merge.py</span>`,
    tag: "deux pointeurs",
    analogy: "🤐 Deux files déjà triées : à chaque tour, on laisse passer le plus petit des deux premiers.",
    brief: ["Fusionne deux listes <b>déjà triées</b> en une seule triée, <b>sans</b> <code>sorted()</code>.", "Garde les doublons ; vide le reste de la liste non épuisée.", "Exemple : <code>shadow_merge([1, 3, 5], [2, 4, 6])</code> → <code>[1, 2, 3, 4, 5, 6]</code>", "Exemple : <code>shadow_merge([1, 1], [1])</code> → <code>[1, 1, 1]</code>"],
    signature: "def shadow_merge(list1: list[int], list2: list[int]) -> list[int]:",
    solution: "def shadow_merge(list1: list[int], list2: list[int]) -> list[int]:\n    merged_list = []\n    i, j = 0, 0\n\n    while i < len(list1) and j < len(list2):\n        if list1[i] < list2[j]:\n            merged_list.append(list1[i])\n            i += 1\n        else:\n            merged_list.append(list2[j])\n            j += 1\n\n    merged_list.extend(list1[i:])\n    merged_list.extend(list2[j:])\n\n    return merged_list",
    note: "<b>Le pattern deux pointeurs :</b> <code>i</code> et <code>j</code> avancent chacun dans leur liste ; on prend toujours le plus petit, puis <code>extend</code> pour la fin de course. Fusion en O(n+m).",
    search: "shadow_merge niveau 4 basic deux pointeurs",
  },
  {
    view: "official", tab: 1, level: 4, section: "Niveau 4", num: "11",
    heading: `<span class="file">string_permutation_checker.py</span>`,
    tag: "sorted",
    analogy: "🎲 Les mêmes lettres, juste battues comme un jeu de cartes — casse et espaces comptent ici.",
    brief: ["<code>True</code> si <code>s2</code> est une permutation <b>exacte</b> de <code>s1</code> (casse et espaces comptent).", "Exemple : <code>string_permutation_checker(\"abc\", \"cab\")</code> → <code>True</code>", "Exemple : <code>string_permutation_checker(\"abc\", \"abz\")</code> → <code>False</code>"],
    signature: "def string_permutation_checker(s1: str, s2: str) -> bool:",
    solution: "def string_permutation_checker(s1: str, s2: str) -> bool:\n    return sorted(s1) == sorted(s2)",
    note: "<b>Une ligne :</b> <code>sorted(s1) == sorted(s2)</code> — deux permutations triées deviennent identiques.",
    search: "string_permutation_checker niveau 4 basic sorted",
  },
  {
    view: "official", tab: 1, level: 5, section: "Niveau 5", num: "12",
    heading: `<span class="file">string_sculptor.py</span>`,
    tag: "booléen bascule",
    analogy: "🎭 Une casse en zigzag : min, MAJ, min… seules les lettres alternent, le reste passe sans compter.",
    brief: ["Alterne la casse des <b>lettres</b> en commençant par une <b>minuscule</b>.", "Les non-lettres sont recopiés tels quels et ne cassent pas l'alternance.", "Exemple : <code>string_sculptor(\"hello world\")</code> → <code>'hElLo WoRlD'</code>", "Exemple : <code>string_sculptor(\"a1b2c3\")</code> → <code>'a1B2c3'</code>"],
    signature: "def string_sculptor(text: str) -> str:",
    solution: "def string_sculptor(text: str) -> str:\n    result = []\n    upper = False\n\n    for char in text:\n        if char.isalpha():\n            result.append(char.upper() if upper else char.lower())\n            upper = not upper\n        else:\n            result.append(char)\n\n    return ''.join(result)",
    note: "<b>Un booléen bascule :</b> <code>upper = not upper</code> à chaque lettre seulement — c'est lui qui porte l'alternance, pas l'index.",
    search: "string_sculptor niveau 5 basic booléen bascule",
  },
  {
    view: "official", tab: 1, level: 5, section: "Niveau 5", num: "13",
    heading: `<span class="file">twist_sequence.py</span>`,
    tag: "slicing + modulo",
    analogy: "🎡 La rotation-manège : ce qui sort à droite revient à gauche, <code>%</code> gère les tours complets.",
    brief: ["Rotation de <code>k</code> positions vers la <b>droite</b> ; <code>k</code> peut dépasser la taille (<code>%</code>).", "Liste vide → <code>[]</code>.", "Exemple : <code>twist_sequence([1, 2, 3, 4, 5], 2)</code> → <code>[4, 5, 1, 2, 3]</code>", "Exemple : <code>twist_sequence([1, 2, 3], 5)</code> → <code>[2, 3, 1]</code>"],
    signature: "def twist_sequence(arr: list[int], k: int) -> list[int]:",
    solution: "def twist_sequence(arr: list[int], k: int) -> list[int]:\n    if not arr:\n        return []\n    k = k % len(arr)\n    return arr[-k:] + arr[:-k]",
    note: "<b>Même trick que <code>rotate_list</code> :</b> <code>arr[-k:] + arr[:-k]</code> après <code>k %= len(arr)</code>.",
    search: "twist_sequence niveau 5 basic slicing + modulo",
  },
  {
    view: "official", tab: 1, level: 6, section: "Niveau 6", num: "14",
    heading: `<span class="file">whisper_cipher.py</span>`,
    tag: "César ord/chr",
    analogy: "🔐 Le chiffre de César : chaque lettre glisse de <code>shift</code> crans sur la roue, <code>z</code> reboucle sur <code>a</code>.",
    brief: ["Décale chaque lettre de <code>shift</code> (bouclage après <code>z</code>/<code>Z</code>) ; non-lettres inchangés.", "Exemple : <code>whisper_cipher(\"abc\", 1)</code> → <code>'bcd'</code>", "Exemple : <code>whisper_cipher(\"XYZ\", 3)</code> → <code>'ABC'</code>"],
    signature: "def whisper_cipher(text: str, shift: int) -> str:",
    solution: "def whisper_cipher(text: str, shift: int) -> str:\n    result = []\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            char = chr((ord(char) - base + shift) % 26 + base)\n        result.append(char)\n    return ''.join(result)",
    note: "<b>Le trio :</b> <code>ord</code> → ramener en 0-25 (<code>- base</code>) → <code>% 26</code> → <code>chr</code>. Identique au <code>caesar_cipher</code> d'entraînement : deux noms, un même classique.",
    search: "whisper_cipher niveau 6 basic césar ord/chr",
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

const GRADEME: Record<string, {fn: string; tests: {e: string; d: string; x: string}[]}> = {
  "official-2-01": { fn: "is_rotation", tests: [{e:"__fn([1, 2, 3, 4, 5], [4, 5, 1, 2, 3])",d:"is_rotation([1, 2, 3, 4, 5], [4, 5, 1, 2, 3])",x:"True"}, {e:"__fn([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])",d:"is_rotation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])",x:"True"}, {e:"__fn([1, 2, 3, 4, 5], [2, 3, 4, 5, 6])",d:"is_rotation([1, 2, 3, 4, 5], [2, 3, 4, 5, 6])",x:"False"}, {e:"__fn([1, 2, 3], [1, 2])",d:"is_rotation([1, 2, 3], [1, 2])",x:"False"}] },
  "official-2-02": { fn: "constellation_mapper", tests: [{e:"__fn([(0, 0), (1, 1), (2, 2)], 3)",d:"constellation_mapper([(0, 0), (1, 1), (2, 2)], 3)",x:"['*..', '.*.', '..*']"}, {e:"__fn([(0, 0), (1, 2), (3, 4)], 4)",d:"constellation_mapper([(0, 0), (1, 2), (3, 4)], 4)",x:"['*...', '..*.', '....', '....']"}] },
  "official-2-03": { fn: "list_intersection_finder", tests: [{e:"__fn([[1, 2, 2, 3], [2, 3, 4], [0, 2, 3, 3]])",d:"list_intersection_finder([[1, 2, 2, 3], [2, 3, 4], [0, 2, 3, 3]])",x:"[2, 3]"}, {e:"__fn([])",d:"list_intersection_finder([])",x:"[]"}] },
  "official-2-04": { fn: "merge_sorted_list", tests: [{e:"__fn([[1, 4, 5], [1, 3, 4], [2, 6]])",d:"merge_sorted_list([[1, 4, 5], [1, 3, 4], [2, 6]])",x:"[1, 1, 2, 3, 4, 4, 5, 6]"}, {e:"__fn([])",d:"merge_sorted_list([])",x:"[]"}] },
  "official-2-05": { fn: "palindrome_partitioner", tests: [{e:"__fn(\"aab\")",d:"palindrome_partitioner(\"aab\")",x:"1"}, {e:"__fn(\"a\")",d:"palindrome_partitioner(\"a\")",x:"0"}, {e:"__fn(\"\")",d:"palindrome_partitioner(\"\")",x:"0"}] },
  "official-2-06": { fn: "sliding_window_maximum", tests: [{e:"__fn([1, 3, -1, -3, 5, 3, 6, 7], 3)",d:"sliding_window_maximum([1, 3, -1, -3, 5, 3, 6, 7], 3)",x:"[3, 3, 5, 5, 6, 7]"}, {e:"__fn([1, 2], 0)",d:"sliding_window_maximum([1, 2], 0)",x:"[]"}, {e:"__fn([1, 2], 3)",d:"sliding_window_maximum([1, 2], 3)",x:"[]"}] },
  "training-01": { fn: "rotate_list", tests: [{e:"__fn([1, 2, 3, 4, 5], 2)",d:"rotate_list([1, 2, 3, 4, 5], 2)",x:"[4, 5, 1, 2, 3]"}, {e:"__fn([1, 2, 3], 7)",d:"rotate_list([1, 2, 3], 7)",x:"[3, 1, 2]"}, {e:"__fn([], 3)",d:"rotate_list([], 3)",x:"[]"}] },
  "training-02": { fn: "column_sums", tests: [{e:"__fn([[1, 2, 3], [4, 5, 6]])",d:"column_sums([[1, 2, 3], [4, 5, 6]])",x:"[5, 7, 9]"}, {e:"__fn([])",d:"column_sums([])",x:"[]"}] },
  "training-03": { fn: "caesar_cipher", tests: [{e:"__fn(\"abc\", 1)",d:"caesar_cipher(\"abc\", 1)",x:"'bcd'"}, {e:"__fn(\"xyz\", 3)",d:"caesar_cipher(\"xyz\", 3)",x:"'abc'"}, {e:"__fn(\"Hello, World!\", 5)",d:"caesar_cipher(\"Hello, World!\", 5)",x:"'Mjqqt, Btwqi!'"}] },
  "training-04": { fn: "char_frequency_sorter", tests: [{e:"__fn(\"aabbbc\")",d:"char_frequency_sorter(\"aabbbc\")",x:"[('b', 3), ('a', 2), ('c', 1)]"}] },
  "training-05": { fn: "Stack", tests: [{e:"(lambda s=__fn(): [s.push(1), s.push(3), s.pop(), s.peek(), s.is_empty()])()",d:"(lambda s=Stack(): [s.push(1), s.push(3), s.pop(), s.peek(), s.is_empty()])()",x:"[None, None, 3, 1, False]"}, {e:"(lambda s=__fn(): [s.pop(), s.peek(), s.is_empty()])()",d:"(lambda s=Stack(): [s.pop(), s.peek(), s.is_empty()])()",x:"[None, None, True]"}] },
  "training-06": { fn: "Grades", tests: [{e:"(lambda g=__fn(): [g.add(10), g.add(15), g.average(), g.highest()])()",d:"(lambda g=Grades(): [g.add(10), g.add(15), g.average(), g.highest()])()",x:"[None, None, 12.5, 15]"}, {e:"(lambda g=__fn(): [g.average(), g.highest()])()",d:"(lambda g=Grades(): [g.average(), g.highest()])()",x:"[0.0, None]"}] },
  "official-1-01": { fn: "bracket_validator", tests: [{e:"__fn(\"([]{})\")",d:"bracket_validator(\"([]{})\")",x:"True"}, {e:"__fn(\"([)]\")",d:"bracket_validator(\"([)]\")",x:"False"}, {e:"__fn(\"a(b)c\")",d:"bracket_validator(\"a(b)c\")",x:"True"}, {e:"__fn(\"\")",d:"bracket_validator(\"\")",x:"True"}] },
  "official-1-02": { fn: "cryptic_sorter", tests: [{e:"__fn([\"banana\", \"kiwi\", \"apple\", \"fig\"])",d:"cryptic_sorter([\"banana\", \"kiwi\", \"apple\", \"fig\"])",x:"['fig', 'kiwi', 'apple', 'banana']"}, {e:"__fn([\"bb\", \"aa\", \"a\"])",d:"cryptic_sorter([\"bb\", \"aa\", \"a\"])",x:"['a', 'aa', 'bb']"}] },
  "official-1-03": { fn: "echo_validator", tests: [{e:"__fn(\"A man, a plan, a canal: Panama\")",d:"echo_validator(\"A man, a plan, a canal: Panama\")",x:"True"}, {e:"__fn(\"Hello\")",d:"echo_validator(\"Hello\")",x:"False"}] },
  "official-1-04": { fn: "mirror_matrix", tests: [{e:"__fn([[1, 2, 3], [4, 5, 6]])",d:"mirror_matrix([[1, 2, 3], [4, 5, 6]])",x:"[[3, 2, 1], [6, 5, 4]]"}, {e:"__fn([])",d:"mirror_matrix([])",x:"[]"}] },
  "official-1-05": { fn: "hidenp", tests: [{e:"__fn(\"fgex.;\", \"tyf34gdgf;'ektufjhgdgex.;.;rtjynur6\")",d:"hidenp(\"fgex.;\", \"tyf34gdgf;'ektufjhgdgex.;.;rtjynur6\")",x:"True"}, {e:"__fn(\"abc\", \"acb\")",d:"hidenp(\"abc\", \"acb\")",x:"False"}, {e:"__fn(\"\", \"anything\")",d:"hidenp(\"\", \"anything\")",x:"True"}] },
  "official-1-06": { fn: "inter", tests: [{e:"__fn(\"padinton\", \"paqefwtdjetyiytjneytjoeyjnejeyj\")",d:"inter(\"padinton\", \"paqefwtdjetyiytjneytjoeyjnejeyj\")",x:"'padinto'"}, {e:"__fn(\"ddf6vewg64f\", \"gtwthgsertyhrdthrtr\")",d:"inter(\"ddf6vewg64f\", \"gtwthgsertyhrdthrtr\")",x:"'dewg'"}] },
  "official-1-07": { fn: "number_base_converter", tests: [{e:"__fn(\"FF\", 16, 2)",d:"number_base_converter(\"FF\", 16, 2)",x:"'11111111'"}, {e:"__fn(\"1010\", 2, 10)",d:"number_base_converter(\"1010\", 2, 10)",x:"'10'"}, {e:"__fn(\"Z1\", 36, 10)",d:"number_base_converter(\"Z1\", 36, 10)",x:"'1261'"}, {e:"__fn(\"12\", 1, 10)",d:"number_base_converter(\"12\", 1, 10)",x:"'ERROR'"}, {e:"__fn(\"-1A\", 16, 10)",d:"number_base_converter(\"-1A\", 16, 10)",x:"'-26'"}] },
  "official-1-08": { fn: "pattern_tracker", tests: [{e:"__fn(\"a12b34c90\")",d:"pattern_tracker(\"a12b34c90\")",x:"2"}, {e:"__fn(\"123\")",d:"pattern_tracker(\"123\")",x:"2"}, {e:"__fn(\"9012\")",d:"pattern_tracker(\"9012\")",x:"2"}] },
  "official-1-09": { fn: "anagram", tests: [{e:"__fn(\"Listen\", \"Silent\")",d:"anagram(\"Listen\", \"Silent\")",x:"True"}, {e:"__fn(\"dormitory\", \"dirty room\")",d:"anagram(\"dormitory\", \"dirty room\")",x:"True"}, {e:"__fn(\"hello\", \"world\")",d:"anagram(\"hello\", \"world\")",x:"False"}] },
  "official-1-10": { fn: "shadow_merge", tests: [{e:"__fn([1, 3, 5], [2, 4, 6])",d:"shadow_merge([1, 3, 5], [2, 4, 6])",x:"[1, 2, 3, 4, 5, 6]"}, {e:"__fn([1, 1], [1])",d:"shadow_merge([1, 1], [1])",x:"[1, 1, 1]"}, {e:"__fn([], [7, 8])",d:"shadow_merge([], [7, 8])",x:"[7, 8]"}] },
  "official-1-11": { fn: "string_permutation_checker", tests: [{e:"__fn(\"abc\", \"cab\")",d:"string_permutation_checker(\"abc\", \"cab\")",x:"True"}, {e:"__fn(\"abc\", \"abz\")",d:"string_permutation_checker(\"abc\", \"abz\")",x:"False"}, {e:"__fn(\"Abc\", \"abc\")",d:"string_permutation_checker(\"Abc\", \"abc\")",x:"False"}] },
  "official-1-12": { fn: "string_sculptor", tests: [{e:"__fn(\"hello world\")",d:"string_sculptor(\"hello world\")",x:"'hElLo WoRlD'"}, {e:"__fn(\"a1b2c3\")",d:"string_sculptor(\"a1b2c3\")",x:"'a1B2c3'"}] },
  "official-1-13": { fn: "twist_sequence", tests: [{e:"__fn([1, 2, 3, 4, 5], 2)",d:"twist_sequence([1, 2, 3, 4, 5], 2)",x:"[4, 5, 1, 2, 3]"}, {e:"__fn([1, 2, 3], 5)",d:"twist_sequence([1, 2, 3], 5)",x:"[2, 3, 1]"}, {e:"__fn([], 3)",d:"twist_sequence([], 3)",x:"[]"}] },
  "official-1-14": { fn: "whisper_cipher", tests: [{e:"__fn(\"abc\", 1)",d:"whisper_cipher(\"abc\", 1)",x:"'bcd'"}, {e:"__fn(\"XYZ\", 3)",d:"whisper_cipher(\"XYZ\", 3)",x:"'ABC'"}, {e:"__fn(\"a-b!\", 2)",d:"whisper_cipher(\"a-b!\", 2)",x:"'c-d!'"}] },
};

const exId = (ex: Exercise): string => ex.view === "official" ? `official-${ex.tab ?? 2}-${ex.num}` : `${ex.view}-${ex.num}`;

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
  let list = EXERCISES.filter((e) => e.view === view);
  if (view === "official") {
    list = list.filter((e) => (e.tab ?? 2) === activeTab);
    if (activeTab === 1 && activeLevel > 0) list = list.filter((e) => e.level === activeLevel);
  }
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
let activeTab = 2;      // Medium par défaut
let activeLevel = 0;    // 0 = tous les niveaux (tab Basic)

function tabHasData(i: number): boolean {
  return EXERCISES.some((e) => e.view === "official" && (e.tab ?? 2) === i);
}
function renderTabs(): void {
  if (view !== "official") { tabsEl.innerHTML = ""; return; }
  let html = RANK_TABS.map((name, i) =>
    `<button type="button" data-tab="${i}" ${tabHasData(i) ? (i === activeTab ? 'class="active"' : "") : 'disabled title="Bientôt : ajoute tes sujets !"'}>${name}</button>`
  ).join("");
  if (activeTab === 1) {
    const levels = Array.from(new Set(EXERCISES.filter((e) => e.tab === 1).map((e) => e.level ?? 0))).sort();
    html += `<div class="sub-tabs">` +
      `<button type="button" data-level="0" ${activeLevel === 0 ? 'class="active"' : ""}>Tous</button>` +
      levels.map((l) => `<button type="button" data-level="${l}" ${activeLevel === l ? 'class="active"' : ""}>Niveau ${l}</button>`).join("") +
      `</div>`;
  }
  tabsEl.innerHTML = html;
}
tabsEl.addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("button") as HTMLButtonElement | null;
  if (!b || b.disabled) return;
  if (b.dataset.tab !== undefined) { activeTab = +b.dataset.tab; activeLevel = 0; render(); }
  else if (b.dataset.level !== undefined) { activeLevel = +b.dataset.level; render(); }
});

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
  let list = EXERCISES.filter((e) => e.view === view);
  if (view === "official") {
    list = list.filter((e) => (e.tab ?? 2) === activeTab);
    if (activeTab === 1 && activeLevel > 0) list = list.filter((e) => e.level === activeLevel);
  }
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

  if (view === "official") {
    heroKicker.textContent = "";
    heroKicker.style.display = "none";
    heroH1.textContent = RANK_TABS[activeTab];
    const TAB_SUBS: Record<number, string> = {
      1: `Les sujets officiels pour l'exam — <b>Basic Python Algorithms</b>. 14 sujets répartis en <b>6 niveaux</b> de difficulté croissante : choisis un niveau, tente en conditions, puis valide au <b>grademe</b>.`,
      2: `Les sujets officiels pour l'exam — <b>Medium Python Algorithms</b>. Tirés des vrais attempts (rank 04) : tente-les en conditions, puis révèle la <b>solution la plus courte</b>.`,
    };
    heroSub.innerHTML = TAB_SUBS[activeTab] ?? `Les sujets officiels pour l'exam — <b>${RANK_TABS[activeTab]}</b>.`;
  } else {
    heroKicker.style.display = "";
    heroKicker.textContent = HERO[view].kicker;
    heroH1.textContent = HERO[view].h1;
    heroSub.innerHTML = HERO[view].sub;
  }
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
  if (!confirm("Réinitialiser toute ta progression (réussis, à revoir, vus) et les essais en cours ?")) return;
  progress = {};
  try { localStorage.removeItem(STORE_KEY); localStorage.setItem(STORE_KEY, "{}"); localStorage.removeItem(STORE_KEY); } catch { /* rien */ }
  closeModal();
  if (document.body.classList.contains("mode-quiz")) exitQuiz(); // stoppe aussi un quiz en cours
  render(); // reconstruit les cartes sans badge
  // ceinture + bretelles : aucun badge résiduel, compteurs à zéro
  document.querySelectorAll(".status").forEach((el) => { el.className = "status"; el.textContent = ""; el.setAttribute("hidden", ""); });
  refreshStats();
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

/* ---- Grademe (Pyodide) ------------------------------------------------- */
declare function loadPyodide(opts?: { indexURL?: string }): Promise<any>;
let pyodide: any = null;
let pyodideLoading: Promise<any> | null = null;

function ensurePyodide(): Promise<any> {
  if (pyodide) return Promise.resolve(pyodide);
  if (pyodideLoading) return pyodideLoading;
  pyodideLoading = new Promise((resolve, reject) => {
    const sc = document.createElement("script");
    sc.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
    sc.onload = () => {
      loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" })
        .then((p: any) => { pyodide = p; resolve(p); })
        .catch(reject);
    };
    sc.onerror = () => reject(new Error("Impossible de charger Pyodide (connexion ?)"));
    document.head.appendChild(sc);
  });
  return pyodideLoading;
}

interface GradeFail { d: string; got: string; exp: string }
interface GradeResult { ok: boolean; err?: string; fails?: GradeFail[] }

async function grade(exid: string, userCode: string): Promise<GradeResult> {
  const spec = GRADEME[exid];
  if (!spec) return { ok: false, err: "Pas de tests pour cet exercice." };
  const py = await ensurePyodide();
  py.globals.set("__user_code", userCode);
  py.globals.set("__fn_name", spec.fn);
  py.globals.set("__tests_json", JSON.stringify(spec.tests));
  const res = py.runPython(`
import json, io, contextlib
def __grade():
    tests = json.loads(__tests_json)
    ns = {}
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            exec(__user_code, ns)
    except Exception as e:
        return json.dumps({"ok": False, "err": f"Erreur d'exécution : {e}"})
    f = ns.get(__fn_name)
    if f is None:
        for k, v in ns.items():
            if callable(v) and k.startswith(__fn_name):
                f = v; break
    if f is None:
        return json.dumps({"ok": False, "err": f"'{__fn_name}' introuvable dans ton code"})
    fails = []
    for t in tests:
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                got = eval(t["e"], {**ns, "__fn": f})
            got_r = repr(got)
        except Exception as e:
            got_r = f"exception: {e}"
        if got_r != t["x"]:
            fails.append({"d": t["d"], "got": got_r, "exp": t["x"]})
    return json.dumps({"ok": not fails, "fails": fails})
__grade()
`);
  return JSON.parse(res) as GradeResult;
}

/* ======================================================================
   MODE QUIZ
   ====================================================================== */
type Verdict = "success" | "review" | "skip";
type QuizTab = 1 | 2 | 99; // 1=Basic, 2=Medium, 99=Entraînement
interface QuizConfig { tab: QuizTab; level: number; order: "ordered" | "shuffle"; timed: boolean; only?: string[]; }
interface QuizState {
  queue: Exercise[]; index: number; revealed: boolean; attempts: number;
  results: Record<string, Verdict>;
  deadline: number | null;      // fin des 3 h (null = pas de chrono)
  startedAt: number;            // début global du quiz
  timerId: number | null;
}
let quiz: QuizState | null = null;
let lastConfig: QuizConfig = { tab: 2, level: 0, order: "ordered", timed: false };

function q(sel: string): HTMLElement | null { return quizEl.querySelector(sel) as HTMLElement | null; }

function fmtClock(ms: number): string {
  const sec = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  return (h ? `${h}:` : "") + `${String(m).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
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
  // pré-sélection cohérente avec ce que l'on regardait
  lastConfig.tab = view === "training" ? 99 : (activeTab === 1 ? 1 : 2);
  lastConfig.level = view === "official" && activeTab === 1 ? activeLevel : 0;
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
  render();
}

function renderSetup(): void {
  const on = (a: string, b: string) => (a === b ? "active" : "");
  const t = String(lastConfig.tab), lv = String(lastConfig.level), o = lastConfig.order, tm = lastConfig.timed ? "1" : "0";
  const levels = Array.from(new Set(EXERCISES.filter((e) => e.tab === 1).map((e) => e.level ?? 0))).sort();
  quizEl.innerHTML = `<div class="quiz-setup">
    <h2>Mode quiz</h2>
    <p class="quiz-lead">Conditions d'exam : un exercice à la fois, éditeur + grademe. En mode 3 h, une sélection aléatoire est tirée pour simuler un vrai sujet.</p>
    <div class="q-field"><label>Tab</label><div class="segroup" data-group="tab">
      <button type="button" data-val="1" class="${on(t,"1")}">Basic Python</button>
      <button type="button" data-val="2" class="${on(t,"2")}">Medium Python</button>
      <button type="button" data-val="99" class="${on(t,"99")}">Entraînement</button></div></div>
    <div class="q-field" id="q-levels" ${t === "1" ? "" : "hidden"}><label>Niveau (sous-tab)</label><div class="segroup" data-group="level">
      <button type="button" data-val="0" class="${on(lv,"0")}">Tous</button>
      ${levels.map((l) => `<button type="button" data-val="${l}" class="${on(lv,String(l))}">Niveau ${l}</button>`).join("")}</div></div>
    <div class="q-field"><label>Ordre</label><div class="segroup" data-group="order">
      <button type="button" data-val="ordered" class="${on(o,"ordered")}">Dans l'ordre</button>
      <button type="button" data-val="shuffle" class="${on(o,"shuffle")}">Aléatoire</button></div></div>
    <div class="q-field"><label>Temps</label><div class="segroup" data-group="time">
      <button type="button" data-val="0" class="${on(tm,"0")}">Aucun — tous les exercices</button>
      <button type="button" data-val="1" class="${on(tm,"1")}">⏱ 3 h — sujet aléatoire</button></div></div>
    <button type="button" class="q-start" id="q-start">Démarrer le quiz →</button>
  </div>`;

  quizEl.querySelectorAll(".segroup").forEach((group) => {
    group.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        if ((group as HTMLElement).dataset.group === "tab") {
          const lvField = q("#q-levels");
          if (lvField) lvField.hidden = (b as HTMLElement).dataset.val !== "1";
        }
      });
    });
  });
  (q("#q-start") as HTMLButtonElement).addEventListener("click", () => {
    const val = (grp: string): string => {
      const b = quizEl.querySelector(`[data-group="${grp}"] button.active`) as HTMLElement | null;
      return b?.dataset.val || "";
    };
    lastConfig = {
      tab: (parseInt(val("tab"), 10) || 2) as QuizTab,
      level: parseInt(val("level"), 10) || 0,
      order: (val("order") || "ordered") as QuizConfig["order"],
      timed: val("time") === "1",
    };
    startQuiz(lastConfig);
  });
}

function poolFor(cfg: QuizConfig): Exercise[] {
  if (cfg.tab === 99) return EXERCISES.filter((e) => e.view === "training");
  let pool = EXERCISES.filter((e) => e.view === "official" && (e.tab ?? 2) === cfg.tab);
  if (cfg.tab === 1 && cfg.level > 0) pool = pool.filter((e) => e.level === cfg.level);
  return pool;
}

function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function sampleTimed(cfg: QuizConfig, pool: Exercise[]): Exercise[] {
  const hasLevels = pool.some((e) => e.level !== undefined);
  if (hasLevels) {
    // 4 exos de niveaux différents, tirés au hasard
    const levels = shuffle(Array.from(new Set(pool.map((e) => e.level ?? 0)))).slice(0, 4);
    const picked = levels.map((l) => pickRandom(pool.filter((e) => (e.level ?? 0) === l)));
    // s'il y a moins de 4 niveaux dispo, on complète au hasard
    while (picked.length < Math.min(4, pool.length)) {
      const extra = pickRandom(pool);
      if (!picked.includes(extra)) picked.push(extra);
    }
    return shuffle(picked);
  }
  return shuffle(pool.slice()).slice(0, Math.min(3, pool.length)); // Medium & co : 3 exos aléatoires
}

const THREE_HOURS = 3 * 60 * 60 * 1000;

function startQuiz(cfg: QuizConfig): void {
  let pool = poolFor(cfg);
  if (cfg.only) pool = pool.filter((e) => cfg.only!.includes(exId(e)));
  if (pool.length === 0) { renderSetup(); return; }
  let queue: Exercise[];
  if (cfg.timed && !cfg.only) queue = sampleTimed(cfg, pool);
  else queue = cfg.order === "shuffle" ? shuffle(pool.slice()) : pool.slice();
  quiz = {
    queue, index: 0, revealed: false, attempts: 0, results: {},
    deadline: cfg.timed ? Date.now() + THREE_HOURS : null,
    startedAt: Date.now(), timerId: null,
  };
  renderQuestion();
}

/* chrono global : compte à rebours 3 h ou chronomètre simple */
function startTimer(): void {
  if (!quiz) return;
  if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
  const tick = () => {
    if (!quiz) return;
    const e = q("#q-timer");
    if (!e) return;
    if (quiz.deadline === null) { e.textContent = fmtClock(Date.now() - quiz.startedAt); return; }
    const remaining = quiz.deadline - Date.now();
    e.textContent = fmtClock(remaining);
    e.classList.toggle("danger", remaining <= 10 * 60 * 1000 && remaining > 0);
    if (remaining <= 0) {           // temps écoulé → fin du quiz
      e.classList.add("over");
      if (quiz.timerId) clearInterval(quiz.timerId);
      renderResults();
    }
  };
  tick();
  quiz.timerId = window.setInterval(tick, 500);
}

function renderQuestion(): void {
  if (!quiz) return;
  if (quiz.index >= quiz.queue.length) { renderResults(); return; }
  const ex = quiz.queue[quiz.index];
  const badge = ex.badge ? `<span class="badge-real">${ex.badge}</span>` : "";
  const bullets = ex.brief.map((b) => `<li>${b}</li>`).join("");
  const pct = (quiz.index / quiz.queue.length) * 100;
  quiz.revealed = false;
  quiz.attempts = 0;

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
      <label class="q-editor-label">Ta solution :</label>
      <textarea class="q-editor" id="q-editor" spellcheck="false" placeholder="Écris ton code Python ici…"></textarea>
      <div class="q-feedback" id="q-feedback" hidden></div>
      <div class="q-solution" id="q-solution" hidden>
        <div class="code-wrap"><button class="copy-btn" type="button">Copier</button><pre>${highlight(ex.solution)}</pre></div>
        <p class="sol-note">${ex.note}</p>
      </div>
      <div class="q-actions" id="q-actions">
        <button type="button" class="q-primary" id="q-grademe">⚡ Grademe</button>
        <button type="button" class="ghost" id="q-reveal">Révéler la solution</button>
        <button type="button" class="ghost" id="q-skip">Passer (→ à revoir)</button>
        <span class="q-attempts" id="q-attempts"></span>
      </div>
    </article>
  </div>`;

  (q("#q-grademe") as HTMLButtonElement).addEventListener("click", runGrademe);
  (q("#q-reveal") as HTMLButtonElement).addEventListener("click", reveal);
  (q("#q-skip") as HTMLButtonElement).addEventListener("click", () => nextWith("review"));
  (q("#q-editor") as HTMLTextAreaElement).addEventListener("keydown", (e) => {
    if (e.key === "Tab") { // indentation dans l'éditeur
      e.preventDefault();
      const ta = e.target as HTMLTextAreaElement;
      const p = ta.selectionStart;
      ta.value = ta.value.slice(0, p) + "    " + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = p + 4;
    }
  });

  startTimer();
}

async function runGrademe(): Promise<void> {
  if (!quiz) return;
  const ex = quiz.queue[quiz.index];
  const btn = q("#q-grademe") as HTMLButtonElement;
  const fb = q("#q-feedback") as HTMLElement;
  const code = (q("#q-editor") as HTMLTextAreaElement).value;
  if (!code.trim()) { fb.hidden = false; fb.className = "q-feedback ko"; fb.innerHTML = "Écris ta solution d'abord 😉"; return; }
  quiz.attempts++;
  btn.disabled = true; btn.textContent = "⏳ Correction…";
  fb.hidden = false; fb.className = "q-feedback"; fb.innerHTML = "Chargement de Python dans le navigateur (première fois : ~10 s)…";
  let r: GradeResult;
  try { r = await grade(exId(ex), code); }
  catch (err) {
    fb.className = "q-feedback ko";
    fb.innerHTML = `Grademe indisponible (${(err as Error).message}). Compare avec la solution et auto-évalue :
      <div class="q-verdict"><button type="button" class="ok" id="q-manual-ok">✓ Réussi</button>
      <button type="button" class="warn" id="q-manual-ko">✗ À revoir</button></div>`;
    (q("#q-manual-ok") as HTMLButtonElement).addEventListener("click", () => nextWith("success"));
    (q("#q-manual-ko") as HTMLButtonElement).addEventListener("click", () => nextWith("review"));
    btn.disabled = false; btn.textContent = "⚡ Grademe";
    return;
  }
  btn.disabled = false; btn.textContent = "⚡ Grademe";
  const att = q("#q-attempts"); if (att) att.textContent = `tentative ${quiz.attempts}`;
  if (r.ok) {
    fb.className = "q-feedback okmsg";
    fb.innerHTML = `✅ <b>Validé en ${quiz.attempts} tentative${quiz.attempts > 1 ? "s" : ""} !</b> Exercice suivant…`;
    setTimeout(() => nextWith("success"), 1100);
  } else {
    setStatus(exId(ex), "review"); // marqué à revoir tant que non validé
    fb.className = "q-feedback ko";
    if (r.err) fb.innerHTML = `❌ ${r.err} — corrige et retente !`;
    else {
      const rows = (r.fails || []).slice(0, 3).map((f) =>
        `<div class="q-fail"><code>${f.d}</code><br>attendu <code>${f.exp}</code> · obtenu <code>${f.got}</code></div>`).join("");
      fb.innerHTML = `❌ <b>${(r.fails || []).length} test(s) échoué(s)</b> — corrige et retente !${rows}`;
    }
  }
}

function reveal(): void {
  if (!quiz || quiz.revealed) return;
  quiz.revealed = true;
  setStatus(exId(quiz.queue[quiz.index]), "review"); // solution vue → à retravailler
  const sol = q("#q-solution");
  if (sol) sol.hidden = false;
  const btn = q("#q-reveal") as HTMLButtonElement | null;
  if (btn) btn.disabled = true;
}

function nextWith(v: Verdict): void {
  if (!quiz) return;
  const ex = quiz.queue[quiz.index];
  quiz.results[exId(ex)] = v;
  if (v === "success" || v === "review") setStatus(exId(ex), v);
  quiz.index++;
  renderQuestion();
}

function renderResults(): void {
  if (!quiz) return;
  if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
  const elapsed = Date.now() - quiz.startedAt;
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
    <p class="results-time">Temps total : ${fmtClock(elapsed)}</p>
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
  if (redo) redo.addEventListener("click", () => startQuiz({ ...lastConfig, timed: false, order: "ordered", only: reviewIds }));

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


quizToggle.addEventListener("click", () => {
  if (document.body.classList.contains("mode-quiz")) exitQuiz();
  else enterQuiz();
});

/* ---- Démarrage --------------------------------------------------------- */
document.body.classList.add("view-official");
render();
