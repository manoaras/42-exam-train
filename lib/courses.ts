/* Contenu des cours : C & Python, structuré en chapitres → sections → blocs.
 * Source : guides complets "format 42" (le_C / python) + cheatsheet classes intégrées. */

export type CourseBlock =
  | { t: "p"; html: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; code: string; lang?: "c"; label?: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "box"; tone: "analogy" | "tip" | "warn"; title: string; html: string };

export interface CourseSection {
  id: string;
  title: string;
  blocks: CourseBlock[];
}

export interface CourseChapter {
  id: string;
  label: string;     // libellé court du tab
  icon: string;
  title: string;
  intro: string;     // chapeau (html)
  sections: CourseSection[];
  related?: { label: string; href: string };
}

export interface Course {
  id: "python" | "c";
  label: string;
  icon: string;
  kicker: string;
  title: string;
  sub: string;
  tags: string[];
  chapters: CourseChapter[];
}

/* ============================== PYTHON ============================== */

const PYTHON: Course = {
  id: "python",
  label: "Python",
  icon: "🐍",
  kicker: "Cours · Python",
  title: "Python, de A à Z",
  sub: `Un langage interprété, typé dynamiquement, conçu pour la <b>lisibilité</b>. Là où le C te donne le contrôle brut de la machine, Python te donne la vitesse de développement.`,
  tags: ["interprété", "typé dynamiquement", "multi-paradigme", "garbage collected"],
  chapters: [
    {
      id: "bases", label: "Bases", icon: "🐍", title: "Les bases",
      intro: `Créé par Guido van Rossum en 1991. Philosophie : « il devrait y avoir une — et de préférence une seule — façon évidente de faire les choses ».`,
      sections: [
        {
          id: "quoi", title: "C'est quoi Python",
          blocks: [
            { t: "p", html: `Python est <b>interprété</b> : pas d'étape de compilation visible, le code s'exécute ligne par ligne. Il gère la mémoire automatiquement (garbage collector) et déduit les types tout seul.` },
            { t: "box", tone: "analogy", title: "Analogie C ↔ Python", html: `Si le C est une moto à boîte manuelle (tu gères tout, puissance maximale), Python est une voiture électrique automatique : tu montes, tu dis où aller, elle s'occupe de l'embrayage, de l'essence et du parking (la mémoire).` },
            { t: "table", head: ["", "C", "Python"], rows: [
              ["Typage", "statique (à la compil)", "dynamique (à l'exécution)"],
              ["Mémoire", "manuelle (malloc/free)", "automatique (GC)"],
              ["Exécution", "compilé en binaire", "interprété"],
              ["Vitesse", "plus rapide à l'exécution", "plus rapide à écrire"],
            ] },
          ],
        },
        {
          id: "executer", title: "Exécuter du code & REPL",
          blocks: [
            { t: "code", label: "bash", code: `# exécuter un fichier
python3 mon_script.py

# mode interactif (REPL) — teste du code à la volée
python3
>>> 2 + 2
4` },
            { t: "code", label: "python", code: `# pas de main obligatoire, pas de point-virgule, pas d'accolades
print("Hello, 42!")

# idiome courant : protéger le point d'entrée
if __name__ == "__main__":
    print("exécuté directement, pas importé")` },
            { t: "box", tone: "tip", title: "L'indentation est la syntaxe", html: `En C, les blocs sont délimités par <code>{ }</code>. En Python, c'est l'<b>indentation</b> (4 espaces) qui définit les blocs. Mal indenter n'est pas une question de style : c'est une <b>erreur de syntaxe</b>.` },
            { t: "box", tone: "analogy", title: "Analogie", html: `En C, les accolades sont des murs visibles entre les pièces. En Python, il n'y a pas de murs : c'est le <b>retrait du texte</b> qui dit « ce paragraphe appartient à cette section ». Désaligner une ligne, c'est déménager un meuble dans la mauvaise pièce.` },
          ],
        },
      ],
    },
    {
      id: "variables", label: "Variables & types", icon: "🏷️", title: "Variables & types",
      intro: `Pas de déclaration de type : tu assignes, Python devine. Une variable est une <b>étiquette</b> collée sur un objet.`,
      sections: [
        {
          id: "typage", title: "Typage dynamique",
          blocks: [
            { t: "code", label: "python", code: `age = 23           # int
pi = 3.14          # float
nom = "Manoa"      # str
actif = True       # bool
rien = None        # NoneType (l'équivalent du NULL)

type(age)              # <class 'int'>
age = "maintenant str" # LÉGAL : le type peut changer (dynamique)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `En C, une variable est une boîte d'une taille fixe : tu réserves un tiroir « int » et il reste int. En Python, une variable est une <b>étiquette autocollante</b> que tu peux décoller et recoller sur n'importe quel objet : aujourd'hui sur un nombre, demain sur un texte.` },
          ],
        },
        {
          id: "types", title: "Les types intégrés",
          blocks: [
            { t: "p", html: `En Python, <b>tout est objet</b> : chaque « type » (<code>int</code>, <code>str</code>, <code>list</code>…) est en réalité une <b>classe</b>.` },
            { t: "table", head: ["Classe", "Rôle", "Mutable ?", "Exemple"], rows: [
              ["<code>int</code>", "nombres entiers", "non", "<code>42</code>"],
              ["<code>float</code>", "nombres à virgule", "non", "<code>3.14</code>"],
              ["<code>bool</code>", "vrai / faux", "non", "<code>True</code>"],
              ["<code>str</code>", "texte", "<b>non</b>", "<code>\"salut\"</code>"],
              ["<code>list</code>", "collection ordonnée modifiable", "<b>oui</b>", "<code>[1, 2, 3]</code>"],
              ["<code>tuple</code>", "collection ordonnée figée", "non", "<code>(1, 2, 3)</code>"],
              ["<code>dict</code>", "paires clé → valeur", "<b>oui</b>", "<code>{\"a\": 1}</code>"],
              ["<code>set</code>", "valeurs uniques", "<b>oui</b>", "<code>{1, 2, 3}</code>"],
              ["<code>range</code>", "suite de nombres", "non", "<code>range(0, 10)</code>"],
              ["<code>NoneType</code>", "l'absence de valeur", "—", "<code>None</code>"],
            ] },
          ],
        },
        {
          id: "mutabilite", title: "Mutable vs immuable — concept clé",
          blocks: [
            { t: "p", html: `Mutable = « on peut modifier le contenu sans recréer l'objet ». Une <code>list</code> est un tableau blanc effaçable ; un <code>tuple</code> est gravé dans le marbre.` },
            { t: "table", head: ["Immuable (ne change pas)", "Mutable (modifiable)"], rows: [
              ["<code>int, float, str, tuple, bool</code>", "<code>list, dict, set</code>"],
            ] },
            { t: "box", tone: "warn", title: "Piège de copie", html: `Assigner <code>b = a</code> sur une liste ne copie PAS la liste : <code>a</code> et <code>b</code> pointent vers le même objet. Modifier <code>b</code> modifie <code>a</code>. Pour une vraie copie : <code>b = a.copy()</code> ou <code>b = a[:]</code>.` },
          ],
        },
      ],
    },
    {
      id: "chaines", label: "Chaînes", icon: "✂️", title: "Chaînes de caractères",
      intro: `Indexation, slicing, méthodes : la manipulation de <code>str</code> est au cœur de presque tous les sujets d'exam.`,
      sections: [
        {
          id: "slicing", title: "Indexation & slicing",
          blocks: [
            { t: "code", label: "python", code: `s = "Hello 42"
len(s)     # 8
s[0]       # 'H'   (indexation)
s[-1]      # '2'   (index négatif = depuis la fin !)
s[0:5]     # 'Hello' (slicing [début:fin])
s[::-1]    # '24 olleH' (inversé — le réflexe palindrome)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le slicing <code>s[1:5]</code>, c'est découper une tranche de pain : tu indiques où commence et où finit le couteau. L'index négatif, c'est compter les tranches depuis le bout opposé — pratique pour attraper « la dernière » sans connaître la longueur.` },
          ],
        },
        {
          id: "methodes", title: "Les méthodes à connaître",
          blocks: [
            { t: "table", head: ["Méthode", "Effet", "Exemple"], rows: [
              ["<code>.upper() / .lower()</code>", "change la casse", "<code>\"Ab\".upper()</code> → <code>\"AB\"</code>"],
              ["<code>.strip()</code>", "enlève les espaces aux bords", "<code>\"  hi  \".strip()</code> → <code>\"hi\"</code>"],
              ["<code>.split(sep)</code>", "coupe en liste", "<code>\"a,b\".split(\",\")</code> → <code>['a','b']</code>"],
              ["<code>.join(liste)</code>", "recolle une liste en texte", "<code>\"-\".join([\"a\",\"b\"])</code> → <code>\"a-b\"</code>"],
              ["<code>.replace(a, b)</code>", "remplace a par b", "<code>\"abc\".replace(\"a\",\"X\")</code> → <code>\"Xbc\"</code>"],
              ["<code>.find(x)</code>", "position (-1 si absent)", "<code>\"abc\".find(\"b\")</code> → <code>1</code>"],
              ["<code>.count(x)</code>", "nombre d'occurrences", "<code>\"aaa\".count(\"a\")</code> → <code>3</code>"],
              ["<code>.isdigit() / .isalpha()</code>", "que des chiffres / lettres ?", "<code>\"42\".isdigit()</code> → <code>True</code>"],
              ["<code>.startswith() / .endswith()</code>", "commence / finit par ?", "<code>\"abc\".endswith(\"c\")</code> → <code>True</code>"],
            ] },
          ],
        },
        {
          id: "fstrings", title: "f-strings — la bonne façon de formater",
          blocks: [
            { t: "code", label: "python", code: `nom = "Manoa"
note = 98.5
print(f"{nom} a eu {note}/100")   # Manoa a eu 98.5/100
print(f"arrondi : {note:.0f}")    # formatage : 98` },
            { t: "box", tone: "tip", title: "str immuable", html: `Tu ne peux pas faire <code>s[0] = 'h'</code> : les chaînes sont immuables. Toute « modification » crée en réalité une <b>nouvelle</b> chaîne.` },
          ],
        },
      ],
    },
    {
      id: "controle", label: "Conditions & boucles", icon: "🔀", title: "Contrôle de flux",
      intro: `Pas de parenthèses, pas d'accolades : deux-points + indentation.`,
      sections: [
        {
          id: "conditions", title: "Conditions",
          blocks: [
            { t: "code", label: "python", code: `if note >= 50:
    print("validé")
elif note >= 25:
    print("rattrapage")
else:
    print("échec")` },
          ],
        },
        {
          id: "boucles", title: "Boucles",
          blocks: [
            { t: "code", label: "python", code: `# FOR : itère sur une séquence (pas un compteur !)
for lettre in "42":
    print(lettre)

for i in range(5):    # 0,1,2,3,4
    print(i)

# WHILE
while n > 0:
    n -= 1` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le <code>for</code> en C compte des numéros (« de i=0 à i&lt;10 »). Le <code>for</code> en Python <b>pioche directement dans un sac</b> : « pour chaque pomme dans le panier ». Tu ne gères pas d'indice, tu reçois l'élément lui-même — plus naturel, moins d'erreurs d'index.` },
            { t: "box", tone: "tip", title: "enumerate", html: `Besoin de l'indice ET de l'élément ? <code>for i, val in enumerate(liste):</code> te donne les deux d'un coup.` },
          ],
        },
      ],
    },
    {
      id: "collections", label: "Collections", icon: "📦", title: "Collections",
      intro: `Listes, tuples, sets, dictionnaires : les quatre structures qui reviennent dans tous les sujets.`,
      related: { label: "S'entraîner sur les collections", href: "/train" },
      sections: [
        {
          id: "listes", title: "Listes — le tableau modifiable",
          blocks: [
            { t: "code", label: "python", code: `notes = [12, 15, 8, 19]
notes.append(10)     # ajoute à la fin → [12,15,8,19,10]
notes.insert(0, 20)  # insère à l'index 0
notes.pop()          # retire et renvoie le dernier
notes.remove(8)      # retire la première valeur 8
notes.sort()         # trie sur place
len(notes)           # longueur
15 in notes          # True — test d'appartenance` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une liste Python, c'est un tableau C sous stéroïdes : il grandit et rétrécit tout seul, mélange les types, et range tout pour toi. Plus de <code>malloc</code>/<code>realloc</code> ni de cases à compter.` },
          ],
        },
        {
          id: "tuples-sets", title: "Tuples & sets",
          blocks: [
            { t: "code", label: "python", code: `point = (3, 4)     # tuple : non modifiable
x, y = point       # unpacking : x=3, y=4

uniques = {1, 2, 2, 3}   # set : {1, 2, 3} — doublons disparus
{1,2} & {2,3}            # intersection : {2}
{1,2} | {2,3}            # union : {1,2,3}` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un <b>tuple</b> est un contrat signé : une fois écrit, on n'y touche plus (idéal pour des coordonnées). Un <b>set</b> est un sac de billes où chaque bille est unique. Parfait pour dédupliquer : <code>list(set(ma_liste))</code>.` },
          ],
        },
        {
          id: "dicts", title: "Dictionnaires — clé → valeur",
          blocks: [
            { t: "code", label: "python", code: `etudiant = {"nom": "Manoa", "age": 23}
etudiant["nom"]            # 'Manoa'
etudiant["ville"] = "Paris"  # ajoute une paire
etudiant.get("note", 0)    # 0 si absent (évite le crash)

for cle, val in etudiant.items():
    print(cle, "→", val)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un dictionnaire, c'est un vrai dictionnaire de langue : tu cherches un mot (la <b>clé</b>) et tu obtiens sa définition (la <b>valeur</b>) instantanément. L'équivalent — en bien plus souple — des <code>struct</code> du C.` },
            { t: "box", tone: "tip", title: "get() plutôt que []", html: `Accéder à une clé inexistante avec <code>d[\"x\"]</code> lève une erreur. <code>d.get(\"x\", defaut)</code> renvoie une valeur par défaut à la place : plus sûr.` },
          ],
        },
        {
          id: "comprehensions", title: "Compréhensions — la signature de Python",
          blocks: [
            { t: "code", label: "python", code: `# au lieu de :
carres = []
for x in range(5):
    carres.append(x ** 2)

# on écrit :
carres = [x ** 2 for x in range(5)]        # [0,1,4,9,16]

# avec condition (filtre)
pairs = [x for x in range(10) if x % 2 == 0]

# dict comprehension
carre_map = {x: x**2 for x in range(4)}` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une compréhension, c'est une chaîne de montage compacte : « prends chaque X, transforme-le, garde-le si tel critère ». Structure à retenir : <code>[résultat for élément in source if condition]</code>.` },
            { t: "box", tone: "warn", title: "Ne pas abuser", html: `Si la compréhension devient illisible (imbrications, conditions multiples), reviens à une boucle classique. La lisibilité prime — c'est tout l'esprit de Python.` },
          ],
        },
      ],
    },
    {
      id: "fonctions", label: "Fonctions", icon: "🧩", title: "Fonctions",
      intro: `Définition, valeurs par défaut, arguments variables et mini-fonctions anonymes.`,
      sections: [
        {
          id: "def", title: "Définir une fonction",
          blocks: [
            { t: "code", label: "python", code: `def addition(a, b):
    return a + b

# valeurs par défaut
def saluer(nom, message="Salut"):
    return f"{message}, {nom}!"

saluer("Manoa")                    # "Salut, Manoa!"
saluer("Manoa", message="Hello")   # argument nommé` },
          ],
        },
        {
          id: "args", title: "*args et **kwargs",
          blocks: [
            { t: "code", label: "python", code: `def somme(*args):        # args = tuple des arguments positionnels
    return sum(args)
somme(1, 2, 3, 4)        # 10

def config(**kwargs):    # kwargs = dict des arguments nommés
    print(kwargs)
config(debug=True, port=8080)  # {'debug': True, 'port': 8080}` },
            { t: "box", tone: "analogy", title: "Analogie", html: `<code>*args</code>, c'est un panier ouvert : « donne-moi autant d'ingrédients que tu veux ». <code>**kwargs</code>, c'est le même panier mais chaque ingrédient arrive avec son nom collé dessus.` },
            { t: "box", tone: "warn", title: "Argument mutable par défaut", html: `Ne fais JAMAIS <code>def f(liste=[]):</code>. La liste par défaut est partagée entre tous les appels et s'accumule. Utilise <code>def f(liste=None):</code> puis <code>if liste is None: liste = []</code>.` },
          ],
        },
        {
          id: "lambda", title: "Lambda & fonctions d'ordre supérieur",
          blocks: [
            { t: "code", label: "python", code: `# lambda = mini-fonction anonyme sur une ligne
double = lambda x: x * 2

# surtout utile en argument d'autres fonctions
nombres = [3, 1, 4, 1, 5]
sorted(nombres, key=lambda x: -x)       # tri décroissant
list(map(lambda x: x**2, nombres))      # applique à chaque élément
list(filter(lambda x: x > 2, nombres))  # garde si condition` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une lambda, c'est un post-it jetable avec une mini-instruction : tu l'écris, tu l'utilises une fois, tu l'oublies. C'est le cousin Python du <b>pointeur de fonction</b> du C — passer un comportement en argument.` },
          ],
        },
      ],
    },
    {
      id: "classes", label: "Classes & POO", icon: "🏗️", title: "Programmation orientée objet",
      intro: `Une classe est un plan ; un objet (instance) est une maison construite à partir de ce plan.`,
      related: { label: "Exos classes (Stack, Grades…)", href: "/train" },
      sections: [
        {
          id: "poo", title: "Classes & instances",
          blocks: [
            { t: "code", label: "python", code: `class Etudiant:
    def __init__(self, nom, age):   # constructeur
        self.nom = nom              # attribut d'instance
        self.age = age

    def se_presenter(self):         # méthode
        return f"Je suis {self.nom}, {self.age} ans"

e = Etudiant("Manoa", 23)   # création d'une instance
print(e.se_presenter())` },
            { t: "box", tone: "analogy", title: "Analogie", html: `La <b>classe</b> est le plan d'architecte d'une maison. Chaque <b>objet</b> est une vraie maison bâtie selon ce plan : même structure, mais peinture et meubles différents (attributs). Le <code>self</code> est la maison qui dit « MES murs, MA porte ».` },
            { t: "box", tone: "tip", title: "self explicite", html: `Le premier paramètre de toute méthode est <code>self</code> : l'objet lui-même. Tu ne le passes pas à l'appel (<code>e.methode()</code>), Python l'injecte automatiquement.` },
          ],
        },
        {
          id: "heritage", title: "Héritage & méthodes dunder",
          blocks: [
            { t: "code", label: "python", code: `class Personne:
    def __init__(self, nom):
        self.nom = nom

class Etudiant(Personne):        # hérite de Personne
    def __init__(self, nom, campus):
        super().__init__(nom)    # appelle le constructeur parent
        self.campus = campus` },
            { t: "table", head: ["Méthode dunder", "Déclenchée par"], rows: [
              ["<code>__init__</code>", "création de l'objet"],
              ["<code>__str__</code>", "<code>print(obj)</code> / <code>str(obj)</code>"],
              ["<code>__len__</code>", "<code>len(obj)</code>"],
              ["<code>__eq__</code>", "<code>obj1 == obj2</code>"],
              ["<code>__add__</code>", "<code>obj1 + obj2</code>"],
            ] },
            { t: "box", tone: "analogy", title: "Analogie", html: `Les méthodes dunder sont des <b>prises électriques standardisées</b>. Quand tu écris <code>print(obj)</code>, Python « branche » la prise <code>__str__</code> de ton objet. En les définissant, tu rends tes objets compatibles avec <code>+</code>, <code>len</code>, <code>==</code>…` },
          ],
        },
        {
          id: "methodes-fonctions", title: "Méthode vs fonction — le réflexe 42",
          blocks: [
            { t: "p", html: `Une <b>méthode</b> = une action que l'objet sait faire lui-même → <code>objet.methode()</code> <i>(le couteau sait <code>.couper()</code>)</i>. Une <b>fonction</b> = un ouvrier générique à qui tu <b>donnes</b> l'objet → <code>fonction(objet)</code> <i>(tu donnes la liste à <code>len(liste)</code>)</i>.` },
            { t: "p", html: `Fonctions intégrées à connaître : conversions <code>int() float() str() list() dict() set()</code> · inspection <code>type() isinstance() len() dir()</code> · itération <code>range() enumerate() zip() map() filter() sorted() reversed()</code> · maths <code>sum() min() max() abs() round()</code> · logique <code>any() all()</code>.` },
            { t: "code", label: "python", code: `# Tu ne connais pas une méthode ? Demande à Python lui-même :
dir("")           # → toutes les méthodes de str
help(str.split)   # → la doc de .split()` },
            { t: "box", tone: "tip", title: "dir() et help()", html: `<code>dir()</code> te donne la <b>liste</b> des méthodes ; <code>help()</code> te donne le <b>mode d'emploi</b>. Le duo gagnant quand tu bloques à l'exam.` },
          ],
        },
      ],
    },
    {
      id: "erreurs", label: "Exceptions", icon: "🛟", title: "Gestion des erreurs",
      intro: `Là où le C renvoie des codes d'erreur, Python lève des exceptions que tu attrapes.`,
      sections: [
        {
          id: "tryexcept", title: "try / except / else / finally",
          blocks: [
            { t: "code", label: "python", code: `try:
    n = int(input("Un nombre : "))
    resultat = 10 / n
except ValueError:
    print("Ce n'est pas un entier")
except ZeroDivisionError:
    print("Division par zéro impossible")
else:
    print("Tout s'est bien passé")    # si aucune erreur
finally:
    print("Exécuté dans tous les cas") # nettoyage` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le <code>try/except</code>, c'est un filet de sécurité sous un trapéziste. Tu tentes le numéro risqué (<code>try</code>) ; s'il tombe, le filet (<code>except</code>) le rattrape proprement au lieu de le laisser s'écraser (crash). <code>finally</code> = on plie le matériel, qu'il soit tombé ou non.` },
            { t: "box", tone: "tip", title: "Sois spécifique", html: `Attrape des exceptions précises (<code>ValueError</code>), pas un <code>except:</code> nu qui masque tous les bugs — y compris ceux que tu n'avais pas prévus.` },
          ],
        },
      ],
    },
    {
      id: "avance", label: "Avancé", icon: "⚡", title: "Concepts avancés",
      intro: `Générateurs, décorateurs, modules et fichiers : ce qui distingue un code Python correct d'un code Python solide.`,
      sections: [
        {
          id: "generateurs", title: "Itérateurs & générateurs",
          blocks: [
            { t: "p", html: `Un générateur produit ses valeurs <b>une à une, à la demande</b>, sans tout stocker en mémoire.` },
            { t: "code", label: "python", code: `def compte_jusqu(n):
    i = 0
    while i < n:
        yield i        # yield = "rends cette valeur PUIS mets en pause"
        i += 1

for x in compte_jusqu(3):   # 0, 1, 2 — produits à la volée
    print(x)

# generator expression : comme une compréhension mais "lazy"
gros = (x**2 for x in range(1_000_000))  # ne calcule rien tout de suite` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une liste, c'est imprimer tout un livre d'avance et le poser sur la table (toute la mémoire utilisée). Un générateur, c'est un <b>distributeur de tickets</b> : il imprime le suivant seulement quand tu appuies sur le bouton. Idéal pour des flux énormes ou infinis.` },
          ],
        },
        {
          id: "decorateurs", title: "Décorateurs",
          blocks: [
            { t: "p", html: `Un décorateur enveloppe une fonction pour ajouter un comportement, sans toucher à son code.` },
            { t: "code", label: "python", code: `import time

def chronometre(func):
    def wrapper(*args, **kwargs):
        debut = time.time()
        res = func(*args, **kwargs)   # exécute la vraie fonction
        print(f"durée : {time.time()-debut}s")
        return res
    return wrapper

@chronometre          # applique le décorateur
def calcul_lourd():
    return sum(range(10_000_000))` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un décorateur, c'est un emballage cadeau. La fonction reste la même à l'intérieur, mais tu l'enveloppes d'une couche supplémentaire (mesurer le temps, vérifier les droits, logger…). Le <code>@</code> dit « emballe cette fonction avec ce papier-là ».` },
          ],
        },
        {
          id: "modules", title: "Modules & packages",
          blocks: [
            { t: "code", label: "python", code: `import math                  # import complet
math.sqrt(16)                # 4.0

from math import sqrt, pi    # import ciblé
sqrt(16)

import numpy as np           # alias` },
            { t: "p", html: `Un <b>module</b> = un fichier <code>.py</code>. Un <b>package</b> = un dossier de modules (contenant un <code>__init__.py</code>).` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Les modules sont des rayons de bibliothèque : <code>math</code> le rayon maths, <code>os</code> le rayon système. <code>import</code>, c'est emprunter un livre entier ; <code>from math import sqrt</code>, c'est photocopier une page précise. L'équivalent Python du <code>#include</code> — en plus puissant.` },
          ],
        },
        {
          id: "fichiers", title: "Fichiers & gestionnaire de contexte",
          blocks: [
            { t: "code", label: "python", code: `# with = ouvre ET ferme automatiquement le fichier
with open("data.txt", "r") as f:
    for ligne in f:
        print(ligne.strip())   # strip enlève le \\n
# ici le fichier est DÉJÀ fermé, même en cas d'erreur

with open("sortie.txt", "w") as f:
    f.write("Hello 42\\n")` },
            { t: "table", head: ["Mode", "Effet"], rows: [
              ["<code>\"r\"</code>", "lecture (défaut)"],
              ["<code>\"w\"</code>", "écriture (écrase tout)"],
              ["<code>\"a\"</code>", "ajout en fin de fichier"],
              ["<code>\"r+\"</code>", "lecture + écriture"],
            ] },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le <code>with</code> est un majordome : il t'ouvre la porte (<code>open</code>), te laisse travailler, puis la referme à clé derrière toi — même si tu pars en courant à cause d'une erreur. En C, tu risquais d'oublier le <code>fclose</code>. Ici, c'est garanti.` },
          ],
        },
      ],
    },
    {
      id: "ecosysteme", label: "Écosystème", icon: "🌍", title: "Écosystème & style",
      intro: `« Batteries included » : Python vient avec une énorme boîte à outils prête à l'emploi — et un style codifié.`,
      sections: [
        {
          id: "stdlib", title: "Bibliothèque standard",
          blocks: [
            { t: "table", head: ["Module", "Pour quoi faire"], rows: [
              ["<code>os / sys</code>", "système, fichiers, arguments, variables d'environnement"],
              ["<code>math</code>", "fonctions mathématiques (sqrt, sin, pi…)"],
              ["<code>random</code>", "aléatoire (choice, randint, shuffle)"],
              ["<code>json</code>", "lire / écrire du JSON"],
              ["<code>re</code>", "expressions régulières"],
              ["<code>collections</code>", "structures avancées (Counter, defaultdict)"],
              ["<code>itertools</code>", "outils d'itération performants"],
            ] },
            { t: "code", label: "python", code: `import sys
print(sys.argv)        # arguments de la ligne de commande

from collections import Counter
Counter("banane")      # {'a':2, 'n':2, 'b':1, 'e':1} — compte tout seul` },
          ],
        },
        {
          id: "venv", title: "venv, pip & projet",
          blocks: [
            { t: "code", label: "bash", code: `python3 -m venv .venv          # environnement virtuel isolé
source .venv/bin/activate      # l'activer (macOS / Linux)
pip install requests           # installer un paquet
pip freeze > requirements.txt  # figer les dépendances` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un <code>venv</code>, c'est un atelier séparé par projet. Sans lui, tous tes projets partagent les mêmes outils sur l'établi global, et installer un outil pour l'un peut casser l'autre. Avec un venv, chaque projet a SA caisse à outils, à SA version.` },
          ],
        },
        {
          id: "pythonic", title: "Code « Pythonic » & PEP 8",
          blocks: [
            { t: "ul", items: [
              `Indentation : <b>4 espaces</b> (jamais de tabs en Python)`,
              `Noms : <code>snake_case</code> pour variables/fonctions, <code>PascalCase</code> pour les classes`,
              `Lignes ≤ 79 caractères ; <code>UPPER_CASE</code> pour les constantes`,
              `Préfère <code>if x:</code> à <code>if x == True:</code>`,
              `Préfère <code>for item in liste:</code> à l'indexation manuelle`,
            ] },
            { t: "code", label: "python", code: `# NON pythonic (réflexe de C)
i = 0
while i < len(liste):
    print(liste[i])
    i += 1

# pythonic
for element in liste:
    print(element)` },
            { t: "box", tone: "tip", title: "import this", html: `Tape <code>import this</code> dans le REPL : le « Zen of Python » résume la philosophie. <i>Readability counts</i> — la lisibilité compte avant tout.` },
          ],
        },
      ],
    },
  ],
};

/* ================================ C ================================ */

const C: Course = {
  id: "c",
  label: "C",
  icon: "⚙️",
  kicker: "Cours · Langage C",
  title: "Le langage C, de A à Z",
  sub: `Un langage compilé, bas niveau, qui te met aux commandes directes de la <b>mémoire</b>. Pas de filet, pas de magie cachée — des bases jusqu'aux specifics 42.`,
  tags: ["compilé", "typé statiquement", "norme C", "manuel mémoire"],
  chapters: [
    {
      id: "bases", label: "Bases & compilation", icon: "⚙️", title: "Bases & compilation",
      intro: `Créé en 1972 par Dennis Ritchie pour écrire Unix. Encore aujourd'hui, ton OS, ton compilateur et ta box internet tournent en C.`,
      sections: [
        {
          id: "quoi", title: "C'est quoi le C",
          blocks: [
            { t: "p", html: `Le C est <b>proche de la machine</b> : ce que tu écris correspond presque directement aux instructions du processeur. Tu gères toi-même la mémoire, sans ramasse-miettes (garbage collector) comme en Python.` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Python, c'est conduire une voiture automatique. Le C, c'est piloter une moto à boîte manuelle — tu sens chaque vitesse. Plus de contrôle, plus de puissance… mais si tu lâches l'embrayage n'importe comment, tu cales (<b>segfault</b>).` },
            { t: "code", lang: "c", label: "c", code: `#include <stdio.h>   // importe printf

int main(void)
{
    printf("Hello, 42!\\n");
    return (0);  // 0 = tout s'est bien passé
}` },
            { t: "p", html: `Le <code>main</code> est le point de départ obligatoire. Le <code>return (0)</code> est le code de sortie envoyé au système : <b>0 = succès</b>, tout le reste = erreur.` },
          ],
        },
        {
          id: "compilation", title: "La compilation",
          blocks: [
            { t: "p", html: `Contrairement à Python qui s'exécute « à la volée », ton code C doit être traduit en binaire avant de tourner. C'est le rôle du compilateur (<code>cc</code>, <code>gcc</code>, <code>clang</code>).` },
            { t: "ul", items: [
              `<b>Préprocesseur</b> — remplace les <code>#include</code>, <code>#define</code>… (copier-coller géant)`,
              `<b>Compilation</b> — traduit le C en assembleur`,
              `<b>Assemblage</b> — traduit l'assembleur en code machine (<code>.o</code>)`,
              `<b>Édition de liens (linking)</b> — assemble les <code>.o</code> + bibliothèques en un exécutable`,
            ] },
            { t: "code", label: "bash", code: `cc -Wall -Wextra -Werror main.c -o programme` },
            { t: "table", head: ["Flag", "Rôle"], rows: [
              ["<code>-Wall</code>", "active la plupart des warnings"],
              ["<code>-Wextra</code>", "warnings supplémentaires"],
              ["<code>-Werror</code>", "transforme chaque warning en erreur (compilation bloquée)"],
              ["<code>-o nom</code>", "nomme l'exécutable de sortie"],
              ["<code>-g</code>", "ajoute les infos de debug (pour gdb/lldb)"],
            ] },
            { t: "box", tone: "warn", title: "Piège 42", html: `À 42, <code>-Wall -Wextra -Werror</code> sont <b>obligatoires</b>. Le moindre warning = compilation refusée = 0 au projet. Habitue-toi à compiler propre dès le début.` },
          ],
        },
      ],
    },
    {
      id: "types", label: "Types & opérateurs", icon: "🧮", title: "Types, variables & opérateurs",
      intro: `Chaque variable a un type fixé à la compilation, qui détermine combien d'octets elle occupe en mémoire.`,
      sections: [
        {
          id: "types", title: "Types & variables",
          blocks: [
            { t: "table", head: ["Type", "Taille typique", "Contient"], rows: [
              ["<code>char</code>", "1 octet", "un caractère / petit entier (-128 à 127)"],
              ["<code>int</code>", "4 octets", "entier (~ ±2 milliards)"],
              ["<code>long</code>", "8 octets", "grand entier"],
              ["<code>float</code> / <code>double</code>", "4 / 8 octets", "décimal simple / double précision"],
              ["<code>unsigned int</code>", "4 octets", "entier sans signe (0 à ~4 milliards)"],
              ["<code>void</code>", "—", "« rien » / type générique"],
            ] },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un type, c'est la taille du tiroir que tu réserves. Un <code>char</code> est un petit tiroir à chaussettes (1 octet), un <code>double</code> une grande armoire (8 octets). Mettre un éléphant dans le tiroir à chaussettes = <b>overflow</b> : ça déborde et les données sont corrompues.` },
            { t: "code", lang: "c", label: "c", code: `int age = 23;          // déclaration + initialisation
char lettre = 'A';     // un char = un seul caractère, quotes simples
float pi = 3.14f;      // le 'f' force le type float
const int MAX = 100;   // const = lecture seule` },
            { t: "box", tone: "warn", title: "Piège", html: `Une variable non initialisée contient des <b>déchets</b> (valeur aléatoire de ce qui traînait en mémoire). N'utilise jamais une variable avant de lui donner une valeur.` },
          ],
        },
        {
          id: "operateurs", title: "Opérateurs",
          blocks: [
            { t: "table", head: ["Catégorie", "Opérateurs"], rows: [
              ["Arithmétique", "<code>+ - * / %</code> (modulo = reste)"],
              ["Comparaison", "<code>== != &lt; &gt; &lt;= &gt;=</code>"],
              ["Logique", "<code>&amp;&amp;</code> (et), <code>||</code> (ou), <code>!</code> (non)"],
              ["Affectation", "<code>= += -= *= /= %=</code>"],
              ["Incrément", "<code>++ --</code>"],
            ] },
            { t: "box", tone: "warn", title: "Erreur classique", html: `<code>=</code> affecte une valeur, <code>==</code> compare. <code>if (x = 5)</code> assigne 5 à x (toujours vrai !) au lieu de tester. Bug invisible et redoutable.` },
            { t: "code", lang: "c", label: "c", code: `int a = 5;
int b = a++;   // b prend 5, PUIS a devient 6 (post)
int c = ++a;   // a devient 7, PUIS c prend 7 (pré)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `<code>a++</code> : tu prends ta part de gâteau puis tu coupes une nouvelle part. <code>++a</code> : tu coupes d'abord, puis tu prends. Le gâteau finit pareil, mais ce que TU as dans l'assiette diffère.` },
          ],
        },
      ],
    },
    {
      id: "controle", label: "Contrôle de flux", icon: "🔀", title: "Contrôle de flux",
      intro: `Conditions, switch et boucles : la circulation du programme.`,
      sections: [
        {
          id: "conditions", title: "Conditions & switch",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `if (note >= 50)
    printf("validé\\n");
else if (note >= 25)
    printf("rattrapage\\n");
else
    printf("échec\\n");

switch (choix)
{
    case 1:
        printf("un\\n");
        break;   // sans break, ça "tombe" dans le case suivant !
    case 2:
        printf("deux\\n");
        break;
    default:
        printf("autre\\n");
}` },
          ],
        },
        {
          id: "boucles", title: "Boucles",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `// FOR : quand tu connais le nombre d'itérations
for (int i = 0; i < 10; i++)
    printf("%d ", i);

// WHILE : tant qu'une condition est vraie
while (n > 0)
    n--;

// DO WHILE : exécute AU MOINS une fois
do {
    lire_entree();
} while (continuer);` },
            { t: "box", tone: "analogy", title: "Analogie", html: `<code>for</code> = un escalier de 10 marches, tu sais combien tu en montes. <code>while</code> = monter jusqu'à atteindre le toit, peu importe le nombre de marches. <code>do while</code> = tu poses forcément un pied sur la première marche avant de regarder s'il y a un toit.` },
            { t: "box", tone: "tip", title: "Réflexe Norme", html: `<code>break</code> sort de la boucle, <code>continue</code> saute à l'itération suivante. Attention : la Norme 42 interdit <code>for</code> et <code>do…while</code> — entraîne-toi à tout écrire en <code>while</code>.` },
          ],
        },
      ],
    },
    {
      id: "fonctions", label: "Fonctions", icon: "🧩", title: "Fonctions",
      intro: `Un bloc de code réutilisable : des paramètres en entrée, une valeur en sortie.`,
      sections: [
        {
          id: "def", title: "Définir & prototyper",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `//      type de retour
//      |    nom       paramètres
//      v    v         v
int  addition(int a, int b)
{
    return (a + b);   // la valeur renvoyée
}

// void = ne renvoie rien
void saluer(void)
{
    printf("Salut !\\n");
}` },
            { t: "p", html: `Le compilateur lit ton fichier de haut en bas. Si tu appelles une fonction avant de l'avoir écrite, déclare son <b>prototype</b> en haut (ou dans un <code>.h</code>) :` },
            { t: "code", lang: "c", label: "c", code: `int addition(int a, int b);   // prototype : signature sans corps` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le prototype, c'est présenter quelqu'un avant qu'il n'arrive : « tu vas rencontrer Alice, elle est médecin et parle 2 langues ». Quand tu croises son nom plus loin, tu sais déjà à quoi t'attendre.` },
            { t: "box", tone: "tip", title: "Passage par valeur", html: `En C, les arguments sont <b>copiés</b>. Modifier <code>a</code> dans la fonction ne change PAS l'original. Pour modifier l'original, il faut passer un <b>pointeur</b> (chapitre suivant).` },
          ],
        },
      ],
    },
    {
      id: "pointeurs", label: "Pointeurs & tableaux", icon: "🎯", title: "Pointeurs — le cœur du C",
      intro: `Le concept le plus redouté, et le plus puissant. Un pointeur est une variable qui contient une <b>adresse mémoire</b> plutôt qu'une valeur directe.`,
      sections: [
        {
          id: "pointeurs", title: "Adresses & déréférencement",
          blocks: [
            { t: "box", tone: "analogy", title: "Analogie", html: `Imagine la mémoire comme une immense rue de maisons numérotées. Une variable normale, c'est le contenu d'une maison (un canapé). Un pointeur, c'est un papier où tu as écrit l'<b>adresse</b> d'une maison (« 12 rue de la RAM »). Le papier ne contient pas le canapé, mais il te dit où aller le chercher.` },
            { t: "table", head: ["Symbole", "Nom", "Sens"], rows: [
              ["<code>&amp;</code>", "adresse-de", "« donne-moi l'adresse de cette variable »"],
              ["<code>*</code>", "déréférence", "« donne-moi la valeur à cette adresse »"],
            ] },
            { t: "code", lang: "c", label: "c", code: `int x = 42;
int *p = &x;   // p contient l'ADRESSE de x

printf("%d", x);    // 42  — la valeur
printf("%p", p);    // 0x7ffe... — l'adresse stockée
printf("%d", *p);   // 42  — on suit l'adresse (déréférence)

*p = 100;          // on modifie x VIA son adresse
printf("%d", x);    // 100 ! x a changé` },
            { t: "box", tone: "warn", title: "Pointeur NULL & segfault", html: `Un pointeur qui ne pointe nulle part doit valoir <code>NULL</code>. Déréférencer un pointeur <code>NULL</code> ou invalide = <b>segmentation fault</b> (crash). Vérifie toujours : <code>if (p != NULL)</code> avant <code>*p</code>.` },
          ],
        },
        {
          id: "modifier", title: "Pourquoi c'est essentiel : modifier l'original",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `void doubler(int *n)   // reçoit une adresse
{
    *n = *n * 2;       // modifie la vraie variable
}

int main(void)
{
    int v = 10;
    doubler(&v);       // on passe l'ADRESSE de v
    printf("%d", v);  // 20 !
}` },
          ],
        },
        {
          id: "tableaux", title: "Tableaux",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `int notes[5] = {12, 15, 8, 19, 10};
printf("%d", notes[0]);   // 12 — indexation commence à 0 !
printf("%d", notes[4]);   // 10 — dernier élément` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un tableau, c'est une boîte à œufs : des alvéoles collées, numérotées à partir de 0. Si la boîte n'a que 6 places et que tu vises l'alvéole 8, tu tapes dans la boîte du voisin (<b>buffer overflow</b>) — comportement imprévisible.` },
            { t: "p", html: `Le nom d'un tableau est en réalité l'<b>adresse de son premier élément</b> : <code>notes</code> ≈ <code>&amp;notes[0]</code>. C'est pourquoi les tableaux « se dégradent » en pointeurs quand on les passe à une fonction.` },
          ],
        },
        {
          id: "chaines", title: "Chaînes : tableaux de char terminés par '\\0'",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `char nom[] = "42";
// en mémoire : ['4']['2']['\\0']  <-- le '\\0' invisible marque la FIN` },
            { t: "box", tone: "warn", title: "Le '\\0' est vital", html: `Toutes les fonctions de chaîne (<code>strlen</code>, <code>printf %s</code>…) s'arrêtent au <code>'\\0'</code>. Oublier de le réserver/écrire = lecture infinie en mémoire = crash. Une chaîne de 3 lettres a besoin de <b>4 cases</b>.` },
          ],
        },
      ],
    },
    {
      id: "memoire", label: "Mémoire & malloc", icon: "🧠", title: "Mémoire : stack, heap & malloc",
      intro: `Comprendre OÙ vivent tes variables, c'est comprendre pourquoi ton programme crash ou fuit.`,
      sections: [
        {
          id: "stackheap", title: "Stack vs heap",
          blocks: [
            { t: "table", head: ["", "Stack (pile)", "Heap (tas)"], rows: [
              ["Contenu", "variables locales", "blocs <code>malloc</code>"],
              ["Gestion", "automatique", "<b>manuelle</b> (toi)"],
              ["Taille", "petite, rapide", "grande, plus lente"],
              ["Libération", "à la fin de la fonction", "SEULEMENT si tu fais <code>free()</code>"],
            ] },
            { t: "box", tone: "analogy", title: "Analogie", html: `La <b>stack</b> = un bureau temporaire avec une assistante qui range tout dès que tu pars : pratique mais petit. Le <b>heap</b> = un entrepôt géant que tu loues toi-même. Tu prends l'espace que tu veux (<code>malloc</code>), mais si tu oublies de résilier le bail (<code>free</code>), tu paies un local vide pour toujours = <b>fuite mémoire</b>.` },
          ],
        },
        {
          id: "malloc", title: "Allocation dynamique",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `// réserver de la mémoire pour 10 ints sur le heap
int *tab = malloc(10 * sizeof(int));

if (tab == NULL)        // TOUJOURS vérifier : malloc peut échouer
    return (1);

tab[0] = 42;            // utilisation normale

free(tab);             // rendre la mémoire au système
tab = NULL;            // bonne pratique : éviter le dangling pointer` },
            { t: "table", head: ["Fonction", "Rôle"], rows: [
              ["<code>malloc(n)</code>", "réserve n octets (contenu non initialisé)"],
              ["<code>calloc(n, t)</code>", "réserve n éléments et les met à zéro"],
              ["<code>realloc(p, n)</code>", "redimensionne un bloc existant"],
              ["<code>free(p)</code>", "libère le bloc pointé par p"],
            ] },
            { t: "box", tone: "warn", title: "Les 3 péchés mémoire", html: `<b>1. Fuite (leak)</b> : malloc sans free. <b>2. Double free</b> : free deux fois le même pointeur = crash. <b>3. Use after free</b> : utiliser un pointeur déjà libéré — mets-le à <code>NULL</code> après free pour t'en protéger.` },
            { t: "box", tone: "tip", title: "Règle d'or 42", html: `Chaque <code>malloc</code> doit avoir son <code>free</code> correspondant. Compte-les comme des parenthèses. Vérifie avec <code>valgrind</code> (voir chapitre Spécial 42).` },
          ],
        },
      ],
    },
    {
      id: "structs", label: "Structs & avancé", icon: "🧱", title: "Structures & concepts avancés",
      intro: `Structs, pointeurs de fonction, préprocesseur, static et bits : la boîte à outils du C solide.`,
      sections: [
        {
          id: "structs", title: "Structures & unions",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `typedef struct s_etudiant
{
    char  nom[32];
    int   age;
    float moyenne;
}   t_etudiant;     // typedef = alias plus court

t_etudiant e;
e.age = 23;            // accès par point

t_etudiant *ptr = &e;
ptr->age = 24;          // via pointeur : flèche ->  (= (*ptr).age)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une struct, c'est une fiche d'identité : un seul objet « étudiant » qui contient nom, âge, moyenne. Plutôt que de trimballer 3 variables séparées, tu trimballes une seule fiche. La flèche <code>-></code>, c'est « ouvre l'enveloppe (pointeur) et lis le champ dedans ».` },
            { t: "box", tone: "tip", title: "Convention 42", html: `La Norme impose <code>s_</code> pour le nom de struct et <code>t_</code> pour le typedef. Ex : <code>struct s_list</code> → <code>t_list</code>. Une <code>union</code> ressemble à une struct, mais tous les champs partagent la même zone mémoire.` },
          ],
        },
        {
          id: "fnptr", title: "Pointeurs de fonction",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `int add(int a, int b) { return (a + b); }

int main(void)
{
    // op = pointeur vers une fonction (int,int)->int
    int (*op)(int, int) = &add;
    printf("%d", op(3, 4));   // 7
}` },
            { t: "box", tone: "analogy", title: "Analogie", html: `C'est garder le numéro d'un artisan dans ton répertoire : tu ne fais pas le travail toi-même, mais tu peux « appeler » l'artisan stocké quand tu veux. Très utile pour la libft (<code>ft_lstmap</code> applique une fonction à chaque maillon).` },
          ],
        },
        {
          id: "preproc", title: "Le préprocesseur",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `#include <stdio.h>     // header système
#include "libft.h"      // header local

#define PI 3.14159     // constante symbolique
#define CARRE(x) ((x)*(x))  // macro avec argument

// compilation conditionnelle (header guard)
#ifndef LIBFT_H
# define LIBFT_H
/* ... contenu du header ... */
#endif` },
            { t: "box", tone: "warn", title: "Macros à parenthéser", html: `<code>#define CARRE(x) x*x</code> est buggé : <code>CARRE(2+3)</code> donne <code>2+3*2+3 = 11</code> et non 25. Toujours entourer de parenthèses : <code>((x)*(x))</code>.` },
            { t: "box", tone: "tip", title: "Header guard", html: `Le trio <code>#ifndef / #define / #endif</code> empêche d'inclure deux fois le même header (erreur de redéfinition). Indispensable dans toute libft.` },
          ],
        },
        {
          id: "static-bits", title: "static & manipulation de bits",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `int compteur(void)
{
    static int n = 0;   // initialisé UNE seule fois
    n++;
    return (n);
}
// appels successifs : 1, 2, 3...  (n survit)` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une variable locale normale, c'est un post-it que tu jettes en sortant du bureau. Une variable <code>static</code>, c'est un carnet laissé dans le tiroir : toujours là quand tu reviens, avec ce que tu y avais écrit.` },
            { t: "table", head: ["Op", "Nom", "Exemple"], rows: [
              ["<code>&amp;</code>", "AND", "<code>1010 &amp; 1100 = 1000</code>"],
              ["<code>|</code>", "OR", "<code>1010 | 1100 = 1110</code>"],
              ["<code>^</code>", "XOR", "<code>1010 ^ 1100 = 0110</code>"],
              ["<code>~</code>", "NOT", "inverse tous les bits"],
              ["<code>&lt;&lt;</code> / <code>&gt;&gt;</code>", "décalages", "<code>x &lt;&lt; 1</code> ≈ ×2 · <code>x &gt;&gt; 1</code> ≈ ÷2"],
            ] },
          ],
        },
      ],
    },
    {
      id: "fichiers", label: "Fichiers & I/O", icon: "📂", title: "Fichiers & entrées/sorties",
      intro: `Deux niveaux : le confort de <code>stdio</code>, ou les file descriptors bruts — ceux utilisés à 42.`,
      sections: [
        {
          id: "stdio", title: "Niveau haut (stdio)",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `FILE *f = fopen("data.txt", "r");  // "r" lecture, "w" écriture, "a" ajout
if (f == NULL)
    return (1);
char ligne[256];
fgets(ligne, 256, f);
fclose(f);                          // TOUJOURS fermer` },
          ],
        },
        {
          id: "fd", title: "Niveau bas (file descriptors) — utilisé à 42",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `// fd 0 = entrée, 1 = sortie, 2 = erreur
int fd = open("data.txt", O_RDONLY);
char buf[128];
int n = read(fd, buf, 128);   // lit jusqu'à 128 octets
write(1, buf, n);            // écrit sur la sortie standard
close(fd);` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Un <b>file descriptor</b>, c'est un ticket de vestiaire : un simple numéro. Tu ne tiens pas le manteau (le fichier), tu tiens le ticket. Tu le donnes à <code>read</code>/<code>write</code>, le système va chercher le bon manteau. Les tickets 0, 1, 2 sont réservés (clavier, écran, erreurs).` },
            { t: "box", tone: "tip", title: "get_next_line", html: `Le projet <i>get_next_line</i> repose entièrement sur <code>read</code> et la gestion d'un buffer statique. Maîtrise <code>read</code> avant de t'y attaquer.` },
          ],
        },
      ],
    },
    {
      id: "norme42", label: "Spécial 42", icon: "🎓", title: "Norme, Makefile, libft & debug",
      intro: `Tout ce qui est spécifique au cursus : la Norme, le Makefile obligatoire, l'organisation d'une libft et les outils de debug.`,
      related: { label: "Sujets C officiels (57 exos)", href: "/train" },
      sections: [
        {
          id: "norme", title: "La Norme (norminette)",
          blocks: [
            { t: "ul", items: [
              `Maximum <b>25 lignes</b> par fonction · <b>80 colonnes</b> par ligne`,
              `Maximum <b>5 fonctions</b> par fichier <code>.c</code> · <b>4 paramètres</b> par fonction`,
              `Indentation avec des <b>tabulations</b> · une seule déclaration par ligne, en haut`,
              `Interdits : <code>for</code>, <code>do…while</code>, ternaire, affectation à la déclaration`,
              `Pas de variable globale (sauf <code>const static</code>)`,
            ] },
            { t: "code", lang: "c", label: "c", code: `// déclarations EN HAUT, une par ligne, puis le code
int ft_exemple(int n)
{
    int i;
    int total;

    i = 0;
    total = 0;
    while (i < n)
    {
        total += i;
        i++;
    }
    return (total);
}` },
            { t: "box", tone: "warn", title: "Pour la défense", html: `Lance <code>norminette *.c *.h</code> AVANT chaque rendu. Une seule erreur de norme et l'évaluateur ne lit même pas ton code : 0. C'est binaire.` },
          ],
        },
        {
          id: "makefile", title: "Makefile",
          blocks: [
            { t: "p", html: `Un Makefile automatise la compilation : il ne recompile que ce qui a changé. Obligatoire pour les gros projets 42.` },
            { t: "code", label: "makefile", code: `NAME    = libft.a
CC      = cc
CFLAGS  = -Wall -Wextra -Werror
SRC     = ft_strlen.c ft_putchar.c
OBJ     = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OBJ)
	ar rcs $(NAME) $(OBJ)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Une recette de cuisine avec dépendances : « pour le gâteau (NAME), il faut la pâte (OBJ) ; pour la pâte, les ingrédients (.c) ». Si tu changes juste un œuf, Make ne refait pas TOUTE la pâte — juste ce qui en dépend.` },
            { t: "box", tone: "warn", title: "Tabulations", html: `Les commandes sous une règle DOIVENT être indentées avec une <b>vraie tabulation</b>, jamais des espaces. Cause n°1 d'erreurs de Makefile.` },
            { t: "table", head: ["Règle", "Rôle (obligatoires à 42)"], rows: [
              ["<code>all</code>", "compile le projet (cible par défaut)"],
              ["<code>clean</code>", "supprime les <code>.o</code>"],
              ["<code>fclean</code>", "clean + supprime l'exécutable / la lib"],
              ["<code>re</code>", "fclean puis all (recompile tout)"],
            ] },
          ],
        },
        {
          id: "libft", title: "Libft & organisation header",
          blocks: [
            { t: "code", lang: "c", label: "c", code: `#ifndef LIBFT_H
# define LIBFT_H

# include <stdlib.h>   // pour malloc/free
# include <unistd.h>   // pour write/read

typedef struct s_list
{
    void          *content;
    struct s_list *next;
}   t_list;

size_t  ft_strlen(const char *s);
void    *ft_memcpy(void *dst, const void *src, size_t n);

#endif` },
            { t: "box", tone: "analogy", title: "Analogie", html: `Le <code>.h</code> est la carte du menu (ce qui existe et comment commander), le <code>.c</code> est la cuisine (comment c'est préparé). Les autres fichiers consultent le menu sans entrer en cuisine.` },
            { t: "box", tone: "tip", title: "Archive statique", html: `Une libft compile en <code>libft.a</code> via <code>ar rcs</code>, puis se lie à d'autres projets avec <code>-L. -lft</code>. C'est TA boîte à outils réutilisable pour tout le cursus.` },
          ],
        },
        {
          id: "debug", title: "Debug & outils",
          blocks: [
            { t: "table", head: ["Outil", "Usage"], rows: [
              ["<code>valgrind ./prog</code>", "détecte fuites mémoire, double free, accès invalides"],
              ["<code>gdb / lldb</code>", "débogueur pas-à-pas (breakpoints, inspection)"],
              ["<code>printf</code> debug", "la méthode rapide : afficher les valeurs aux points clés"],
              ["<code>cc -fsanitize=address</code>", "détecte les erreurs mémoire à l'exécution"],
            ] },
            { t: "box", tone: "warn", title: "Mac M1 / Apple Silicon", html: `Valgrind tourne mal sur Apple Silicon. Utilise plutôt <code>cc -fsanitize=address,undefined</code> en local, ou teste valgrind sur les PC de l'école (x86_64) avant la défense.` },
            { t: "box", tone: "tip", title: "Méthode défense", html: `Avant chaque éval : 1) <code>norminette</code> propre, 2) <code>make re</code> sans warning, 3) <code>valgrind</code> sans fuite, 4) cas limites (NULL, 0, chaîne vide, très grand). Un évaluateur cherche TOUJOURS ces 4 points.` },
          ],
        },
      ],
    },
  ],
};

export const COURSES: Course[] = [PYTHON, C];

/* texte brut d'une section (recherche + temps de lecture).
 * NB : le strip des balises se fait bloc par bloc — jamais sur le code,
 * où un simple `i < n` serait pris pour un début de balise. */
const strip = (h: string): string => h.replace(/<[^>]+>/g, " ");
export const sectionText = (s: CourseSection): string =>
  (s.title + " " + s.blocks.map((b) => {
    if (b.t === "p" || b.t === "box") return strip(b.html);
    if (b.t === "ul") return strip(b.items.join(" "));
    if (b.t === "code") return b.code;
    return strip(b.head.join(" ") + " " + b.rows.flat().join(" "));
  }).join(" ")).toLowerCase();

/* estimation du temps de lecture d'un chapitre (~180 mots/min) */
export const readingMinutes = (ch: CourseChapter): number =>
  Math.max(1, Math.round(ch.sections.reduce((n, s) => n + sectionText(s).split(/\s+/).length, 0) / 180));
