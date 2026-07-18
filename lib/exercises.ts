import type { Exercise } from "./types";

export const RANK_TABS = [
  "C - Programming Fundamentals",
  "Basic Python Algorithms",
  "Medium Python Algorithms",
  "Challenging Python Algorithms",
  "In-depth Python Algorithms",
];

export const TAB_SUBS: Record<number, string> = {
  0: `Les sujets officiels pour l'exam — <b>C - Programming Fundamentals</b>. 57 sujets répartis en <b>4 niveaux</b> de difficulté croissante : choisis un niveau, tente en conditions, puis compare avec la solution.`,
  1: `Les sujets officiels pour l'exam — <b>Basic Python Algorithms</b>. 14 sujets répartis en <b>6 niveaux</b> de difficulté croissante : choisis un niveau, tente en conditions, puis valide au <b>grademe</b>.`,
  2: `Les sujets officiels pour l'exam — <b>Medium Python Algorithms</b>. 6 sujets tirés des vrais attempts (rank 04) : tente-les en conditions, puis valide au <b>grademe</b>.`,
};

export const TRAINING_HERO = {
  kicker: "Entraînement · Exam Medium Python",
  h1: "Exercices d'entraînement",
  sub: `Des exercices dans le <b>format de l'exam</b>, rangés par concept, pour muscler tes réflexes. Solutions masquées, en <b>version la plus courte</b>.`,
};

export const EXERCISES: Exercise[] = [
  /* ============ C - PROGRAMMING FUNDAMENTALS (tab 0) ============ */
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "01",
    heading: `<span class="file">first_word.c</span>`, tag: `parsing argv`, lang: "c",
    analogy: `🔤 Repérer le premier mot d'une phrase : sauter les espaces, lire jusqu'au prochain blanc.`,
    brief: [`Write a program that takes a string and displays its first word, followed by a newline.`, `A word is a section of string delimited by spaces/tabs or by the start/end of the string.`, `If the number of parameters is not 1, or if there are no words, simply display a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./first_word`,
    solution: `/*
** Write a program that takes a string and displays its first word, followed by a newline.
** A word is a section of string delimited by spaces/tabs or by the start/end of the string.
** If the number of parameters is not 1, or if there are no words, simply display a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] == ' ' || argv[1][i] == '\\t')
      i++;
    while(argv[1][i] != ' ' && argv[1][i] != '\\t' && argv[1][i] != '\\0')
    {
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `first_word niveau 1 c parsing argv`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "02",
    heading: `<span class="file">fizzbuzz.c</span>`, tag: `modulo`, lang: "c",
    analogy: `🥤 Le jeu du fizzbuzz : multiples de 3, de 5, ou des deux.`,
    brief: [`Write a program that prints the numbers from 1 to 100, each separated by a newline.`, `If the number is a multiple of 3, it prints "fizz" instead.`, `If the number is a multiple of 5, it prints "buzz" instead.`, `If the number is a multiple of both 3 and 5, it prints "fizzbuzz" instead.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./fizzbuzz`,
    solution: `/*
** Write a program that prints the numbers from 1 to 100, each separated by a newline.

** If the number is a multiple of 3, it prints "fizz" instead.
** If the number is a multiple of 5, it prints "buzz" instead.
** If the number is a multiple of both 3 and 5, it prints "fizzbuzz" instead.

** Allowed functions: write
*/

#include <unistd.h>

int main(void)
{
  int i;
  char c;

  i = 1;
  while(i < 100)
  {
    if (i % 3 == 0 && i % 5 == 0)
      write(1, "fizzbuzz", 8);
    else if (i % 3 == 0)
      write(1, "fizz", 4);
    else if (i % 5 == 0)
      write(1, "buzz", 4);
    else
    {
      if (i < 10)
      {
        c = i + '0';
        write(1, &c, 1);
      }
      else
      {
        c = (i / 10) + '0';
        write(1, &c, 1);
        c = (i % 10) + '0';
        write(1, &c, 1);
      }
    }
    write(1, "\\n", 1);
    i++;
  }
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `fizzbuzz niveau 1 c modulo`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "03",
    heading: `<span class="file">ft_putstr.c</span>`, tag: `write`, lang: "c",
    analogy: `📢 Afficher une chaîne caractère par caractère avec write.`,
    brief: [`Write a function that displays a string on the standard output.`, `The pointer passed to the function contains the address of the string's first character.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `void ft_putstr(char *str)`,
    solution: `/*
** Write a function that displays a string on the standard output.
** The pointer passed to the function contains the address of the string's first character.
** Allowed functions: write
*/

#include <unistd.h>

void ft_putstr(char *str)
{
  int i;

  i = 0;
  while (str[i] != '\\0')
  {
    write(1, &str[i], 1);
    i++;
  }
}

int main(void)
{
  char str[] = "Hello, World!";
  ft_putstr(str);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_putstr niveau 1 c write`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "04",
    heading: `<span class="file">ft_strcpy.c</span>`, tag: `pointeurs`, lang: "c",
    analogy: `📋 Recopier une chaîne case par case, terminateur compris.`,
    brief: [`Reproduce the behavior of the function strcpy (man strcpy).`],
    signature: `char  *ft_strcpy(char *s1, char *s2)`,
    solution: `/*
** Reproduce the behavior of the function strcpy (man strcpy).
*/

#include <stdio.h>

char  *ft_strcpy(char *s1, char *s2)
{
  int i;

  i = 0;
  while (s2[i] != '\\0')
  {
    s1[i] = s2[i];
    i++;
  }
  s1[i] = '\\0';
  return (s1);
}

int main(void)
{
  char s1[] = "abcd";
  char s2[] = "1234";
  printf("%s\\n", ft_strcpy(s1, s2));
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strcpy niveau 1 c pointeurs`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "05",
    heading: `<span class="file">ft_strlen.c</span>`, tag: `boucle`, lang: "c",
    analogy: `📏 Mesurer une chaîne : avancer jusqu'au '\\0'.`,
    brief: [`Write a function that returns the length of a string.`],
    signature: `int  ft_strlen(char *str)`,
    solution: `/*
** Write a function that returns the length of a string.
*/

#include <stdio.h>

int  ft_strlen(char *str)
{
  int i;

  i = 0;
  while (str[i] != '\\0')
    i++;
  return (i);
}

int main(void)
{
  char str[] = "Hello, World!";
  printf("%d\\n", ft_strlen(str));
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strlen niveau 1 c boucle`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "06",
    heading: `<span class="file">ft_swap.c</span>`, tag: `pointeurs`, lang: "c",
    analogy: `🔄 Échanger deux valeurs via leurs adresses.`,
    brief: [`Write a function that swaps the content of two integers the addresses of which are passed as parameters.`],
    signature: `void  ft_swap(int *a, int *b)`,
    solution: `/*
** Write a function that swaps the content of two integers the addresses of which are passed as parameters.
*/

#include <stdio.h>

void  ft_swap(int *a, int *b)
{
  int temp;

  temp = *a;
  *a = *b;
  *b = temp;
}

int main(void)
{
  int a = 1;
  int b = 2;
  printf("a = %d, b = %d\\n", a, b);
  ft_swap(&a, &b);
  printf("a = %d, b = %d\\n", a, b);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_swap niveau 1 c pointeurs`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "07",
    heading: `<span class="file">repeat_alpha.c</span>`, tag: `ord des lettres`, lang: "c",
    analogy: `🔁 a→a, b→bb, c→ccc : chaque lettre se répète selon sa position dans l'alphabet.`,
    brief: [`Write a program called repeat_alpha that takes a string and displays it, repeating each alphabetical character as many times as its alphabetical index, followed by a newline.`, `'a' becomes 'a', 'b' becomes 'bb', 'e' becomes 'eeeee', etc...`, `Case remains unchanged.`, `If the number of arguments is not 1, just display a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./repeat_alpha`,
    solution: `/*
** Write a program called repeat_alpha that takes a string and displays it,
** repeating each alphabetical character as many times as its alphabetical index, followed by a newline.

** 'a' becomes 'a', 'b' becomes 'bb', 'e' becomes 'eeeee', etc...

** Case remains unchanged.

** If the number of arguments is not 1, just display a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;
  int printNum;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
    {
      if (argv[1][i] >= 'a' && argv[1][i] <= 'z' )
        printNum = argv[1][i] - 'a' + 1;
      else if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')
        printNum = argv[1][i] - 'A' + 1;
      while(printNum > 0)
      {
        write(1, &argv[1][i], 1);
        printNum--;
      }
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `repeat_alpha niveau 1 c ord des lettres`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "08",
    heading: `<span class="file">rev_print.c</span>`, tag: `index inverse`, lang: "c",
    analogy: `⏪ Afficher la chaîne en partant de la fin.`,
    brief: [`Write a program that takes a string and displays it in reverse, followed by a newline.`, `if the number of parameters is not 1, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./rev_print`,
    solution: `/*
** Write a program that takes a string and displays it in reverse, followed by a newline.

** if the number of parameters is not 1, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
      i++;
    while(i >= 0)
    {
      write(1, &argv[1][i], 1);
      i--;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rev_print niveau 1 c index inverse`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "09",
    heading: `<span class="file">rot_13.c</span>`, tag: `modulo 26`, lang: "c",
    analogy: `🔐 César à décalage 13 : le milieu de l'alphabet comme pivot.`,
    brief: [`Write a program that takes a string and displays it, replacing each of its letters by the letter 13 spaces ahead in alphabetical order.`, `'z' becomes 'm', 'Z' becomes 'M'. Case remains unaffected.`, `The output will be followed by a newline.`, `If the number of arguments is not 1, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./rot_13`,
    solution: `/*
** Write a program that takes a string and displays it, replacing each of its letters by the letter 13 spaces ahead in alphabetical order.

** 'z' becomes 'm', 'Z' becomes 'M'. Case remains unaffected.

** The output will be followed by a newline.

** If the number of arguments is not 1, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
    {
      if ((argv[1][i] >= 'a' && argv[1][i] <= 'm') || (argv[1][i] >= 'A' && argv[1][i] <= 'M'))
        argv[1][i] += 13;
      else if ((argv[1][i] >= 'n' && argv[1][i] <= 'z') || (argv[1][i] >= 'N' && argv[1][i] <= 'Z'))
        argv[1][i] -= 13;
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rot_13 niveau 1 c modulo 26`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "10",
    heading: `<span class="file">rotone.c</span>`, tag: `modulo 26`, lang: "c",
    analogy: `➡️ Chaque lettre avance d'un cran, z reboucle sur a.`,
    brief: [`Write a program that takes a string and displays it, replacing each of its letters by the next one in alphabetical order.`, `'z' becomes 'a', 'Z' becomes 'A'. Case remains unaffected.`, `The output will be followed by a newline.`, `If the number of arguments is not 1, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./rotone`,
    solution: `/*
** Write a program that takes a string and displays it, replacing each of its letters by the next one in alphabetical order.

** 'z' becomes 'a', 'Z' becomes 'A'. Case remains unaffected.

** The output will be followed by a newline.

** If the number of arguments is not 1, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
    {
      if ((argv[1][i] >= 'a' && argv[1][i] <= 'y') || (argv[1][i] >= 'A' && argv[1][i] <= 'Y'))
        argv[1][i] += 1;
      else if (argv[1][i] == 'z' || argv[1][i] == 'Z')
        argv[1][i] -= 25;
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rotone niveau 1 c modulo 26`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "11",
    heading: `<span class="file">search_and_replace.c</span>`, tag: `argv + comparaison`, lang: "c",
    analogy: `🔎 Remplacer toutes les occurrences d'un caractère par un autre.`,
    brief: [`Write a program called search_and_replace that takes 3 arguments, the first arguments is a string in which to replace a letter (2nd argument) by another one (3rd argument).`, `If the number of arguments is not 3, just display a newline.`, `If the second argument is not contained in the first one (the string) then the program simply rewrites the string followed by a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./search_and_replace`,
    solution: `/*
** Write a program called search_and_replace that takes 3 arguments,
** the first arguments is a string in which to replace a letter (2nd argument) by another one (3rd argument).

** If the number of arguments is not 3, just display a newline.

** If the second argument is not contained in the first one (the string)
then the program simply rewrites the string followed by a newline.


** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 4)
  {
    while(argv[1][i] != '\\0')
    {
      if (argv[1][i] == argv[2][0])
        write(1, &argv[3][0], 1);
      else
        write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `search_and_replace niveau 1 c argv + comparaison`,
  },
  {
    view: "official", tab: 0, level: 1, section: `Niveau 1`, num: "12",
    heading: `<span class="file">ulstr.c</span>`, tag: `casse`, lang: "c",
    analogy: `🔃 Inverser la casse : minuscules ↔ majuscules.`,
    brief: [`Write a program that takes a string and reverses the case of all its letters.`, `Other characters remain unchanged.`, `You must display the result followed by a newline.`, `If the number of arguments is not 1, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./ulstr`,
    solution: `/*
** Write a program that takes a string and reverses the case of all its letters.
** Other characters remain unchanged.

** You must display the result followed by a newline.

** If the number of arguments is not 1, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while (argv[1][i] != '\\0')
    {
      if (argv[1][i] >= 'a' && argv[1][i] <= 'z')
        argv[1][i] -= 32;
      else if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')
        argv[1][i] += 32;
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ulstr niveau 1 c casse`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "13",
    heading: `<span class="file">alpha_mirror.c</span>`, tag: `miroir alphabet`, lang: "c",
    analogy: `🪞 a↔z, b↔y : chaque lettre rejoint son reflet ('a'+'z'-c).`,
    brief: [`Write a program called alpha_mirror that takes a string and displays this string after replacing each alphabetical character by the opposite alphabetical character, followed by a newline.`, `'a' becomes 'z', 'Z' becomes 'A' 'd' becomes 'w', 'M' becomes 'N'`, `and so on.`, `Case is not changed.`, `If the number of arguments is not 1, display only a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./alpha_mirror`,
    solution: `/*
** Write a program called alpha_mirror that takes a string and displays this string
after replacing each alphabetical character by the opposite alphabetical
character, followed by a newline.

'a' becomes 'z', 'Z' becomes 'A'
'd' becomes 'w', 'M' becomes 'N'

and so on.

Case is not changed.

If the number of arguments is not 1, display only a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
    {
      if (argv[1][i] >= 'a' && argv[1][i] <= 'z')
        argv[1][i] = 'z' - (argv[1][i] - 'a');
      else if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')
        argv[1][i] = 'Z' - (argv[1][i] - 'A');
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `alpha_mirror niveau 2 c miroir alphabet`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "14",
    heading: `<span class="file">camel_to_snake.c</span>`, tag: `casse + insertion`, lang: "c",
    analogy: `🐍 helloWorld → hello_world : une majuscule = _ + minuscule.`,
    brief: [`Write a program that takes a single string in lowerCamelCase format and converts it into a string in snake_case format.`, `A lowerCamelCase string is a string where each word begins with a capital letter except for the first one.`, `A snake_case string is a string where each word is in lower case, separated by an underscore "_".`, `<b>Fonctions autorisées :</b> <code>write, malloc, free</code>`],
    signature: `programme : ./camel_to_snake`,
    solution: `/*
** Write a program that takes a single string in lowerCamelCase format
and converts it into a string in snake_case format.

A lowerCamelCase string is a string where each word begins with a capital letter
except for the first one.

A snake_case string is a string where each word is in lower case, separated by
an underscore "_".

** Allowed functions: write, malloc, free
*/

#include <unistd.h>

int	main(int argc, char **argv)
{
	int i;

	if (argc == 2)
	{
		i = 0;
		while (argv[1][i])
		{
			if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')
			{
				write(1, "_", 1);
				char c = argv[1][i] + 32;
				write(1, &c, 1);
			}
			else
				write(1, &argv[1][i], 1);
			i++;
		}
	}
	write(1, "\\n", 1);
	return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `camel_to_snake niveau 2 c casse + insertion`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "15",
    heading: `<span class="file">do_op.c</span>`, tag: `atoi + switch`, lang: "c",
    analogy: `🧮 Mini-calculatrice : deux nombres, un opérateur.`,
    brief: [`Write a program that takes three strings:`, `- The first and the third one are representations of base-10 signed integers that fit in an int.`, `- The second one is an arithmetic operator chosen from: + - * / %`, `The program must display the result of the requested arithmetic operation, followed by a newline. If the number of parameters is not 3, the program just displays a newline.`, `You can assume the string have no mistakes or extraneous characters. Negative numbers, in input or output, will have one and only one leading '-'. The result of the operation fits in an int.`, `<b>Fonctions autorisées :</b> <code>write, atoi, printf</code>`],
    signature: `programme : ./do_op`,
    solution: `/*
** Write a program that takes three strings:
- The first and the third one are representations of base-10 signed integers that fit in an int.
- The second one is an arithmetic operator chosen from: + - * / %

The program must display the result of the requested arithmetic operation,
followed by a newline. If the number of parameters is not 3, the program
just displays a newline.

You can assume the string have no mistakes or extraneous characters. Negative
numbers, in input or output, will have one and only one leading '-'. The
result of the operation fits in an int.

** Allowed functions: write, atoi, printf
*/

#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char **argv)
{
  int num1;
  int num2;
  char op;

  if (argc == 4)
  {
    num1 = atoi(argv[1]);
    op = argv[2][0];
    num2 = atoi(argv[3]);
    if (op == '+')
      printf("%d\\n", num1 + num2);
    else if (op == '-')
      printf("%d\\n", num1 - num2);
    else if (op == '*')
      printf("%d\\n", num1 * num2);
    else if (op == '/')
      printf("%d\\n", num1 / num2);
    else if (op == '%')
      printf("%d\\n", num1 % num2);
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `do_op niveau 2 c atoi + switch`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "16",
    heading: `<span class="file">ft_atoi.c</span>`, tag: `parsing nombre`, lang: "c",
    analogy: `🔢 Lire un entier dans une chaîne : espaces, signes, chiffres.`,
    brief: [`Write a function that converts the string argument str to an integer (type int) and returns it.`, `It works much like the standard atoi(const char *str) function, see the man.`],
    signature: `int ft_atoi(char *str)`,
    solution: `/*
** Write a function that converts the string argument str to an integer (type int) and returns it.

It works much like the standard atoi(const char *str) function, see the man.
*/

int ft_atoi(char *str)
{
  int i;
  int sign;
  int result;

  i = 0;
  sign = 1;
  result = 0;
  while (str[i] == ' ' || str[i] == '\\t' || str[i] == '\\n' || str[i] == '\\v' || str[i] == '\\f' || str[i] == '\\r')
    i++;
  if (str[i] == '-' || str[i] == '+')
  {
    if (str[i] == '-')
      sign = -1;
    i++;
  }
  while (str[i] >= '0' && str[i] <= '9')
  {
    result = result * 10 + (str[i] - '0');
    i++;
  }
  return (result * sign);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_atoi niveau 2 c parsing nombre`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "17",
    heading: `<span class="file">ft_strcmp.c</span>`, tag: `comparaison`, lang: "c",
    analogy: `⚖️ Comparer deux chaînes caractère par caractère jusqu'au premier écart.`,
    brief: [`Reproduce the behavior of the function strcmp (man strcmp).`],
    signature: `int ft_strcmp(char *s1, char *s2)`,
    solution: `/*
** Reproduce the behavior of the function strcmp (man strcmp).
*/

int ft_strcmp(char *s1, char *s2)
{
  int i;

  i = 0;
  while (s1[i] != '\\0' && s2[i] != '\\0')
  {
    if (s1[i] != s2[i])
      return (s1[i] - s2[i]);
    i++;
  }
  return (s1[i] - s2[i]);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strcmp niveau 2 c comparaison`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "18",
    heading: `<span class="file">ft_strcspn.c</span>`, tag: `scan interdit`, lang: "c",
    analogy: `🚧 Compter les caractères initiaux qui évitent un ensemble donné.`,
    brief: [`Reproduce exactly the behavior of the function strcspn (man strcspn).`],
    signature: `programme : ./ft_strcspn`,
    solution: `/*
** Reproduce exactly the behavior of the function strcspn (man strcspn).
*/

size_t ft_strcspn(char *s1, char *s2)
{
  size_t i;
  size_t j;

  i = 0;
  while (s1[i] != '\\0')
  {
    j = 0;
    while (s2[j] != '\\0')
    {
      if (s1[i] == s2[j])
        return (i);
      j++;
    }
    i++;
  }
  return (i);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strcspn niveau 2 c scan interdit`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "19",
    heading: `<span class="file">ft_strdup.c</span>`, tag: `malloc`, lang: "c",
    analogy: `🧬 Cloner une chaîne : mesurer, allouer, recopier.`,
    brief: [`Reproduce the behavior of the function strdup (man strdup).`, `<b>Fonctions autorisées :</b> <code>malloc</code>`],
    signature: `char  *ft_strdup(char *str)`,
    solution: `/*
** Reproduce the behavior of the function strdup (man strdup).

** Allowed functions: malloc
*/

#include <stdlib.h>

char  *ft_strdup(char *str)
{
  int i;
  char *dup;

  i = 0;
  while (str[i] != '\\0')
    i++;
  dup = (char *)malloc(sizeof(char) * (i + 1));
  if (dup == NULL)
    return (NULL);
  i = 0;
  while (str[i] != '\\0')
  {
    dup[i] = str[i];
    i++;
  }
  dup[i] = '\\0';
  return (dup);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strdup niveau 2 c malloc`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "20",
    heading: `<span class="file">ft_strpbrk.c</span>`, tag: `recherche ensemble`, lang: "c",
    analogy: `🎯 Trouver la première occurrence de n'importe quel caractère d'un ensemble.`,
    brief: [`Reproduce exactly the behavior of the function strpbrk (man strpbrk).`],
    signature: `char	*ft_strpbrk(const char *s1, const char *s2)`,
    solution: `/*
** Reproduce exactly the behavior of the function strpbrk (man strpbrk).
*/

char	*ft_strpbrk(const char *s1, const char *s2)
{
  size_t	i;
  size_t	j;

  i = 0;
  while (s1[i] != '\\0')
  {
    j = 0;
    while (s2[j] != '\\0')
    {
      if (s1[i] == s2[j])
        return ((char *)&s1[i]);
      j++;
    }
    i++;
  }
  return (NULL);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strpbrk niveau 2 c recherche ensemble`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "21",
    heading: `<span class="file">ft_strrev.c</span>`, tag: `deux pointeurs`, lang: "c",
    analogy: `↔️ Retourner une chaîne en échangeant les extrémités vers le centre.`,
    brief: [`Write a function that reverses (in-place) a string.`, `It must return its parameter.`],
    signature: `char *ft_strrev(char *str)`,
    solution: `/*
** Write a function that reverses (in-place) a string.

It must return its parameter.
*/

char *ft_strrev(char *str)
{
  int i = 0;
  int j = 0;
  char temp;

  while (str[i] != '\\0')
    i++;
  while (j < --i)
  {
    temp = str[j];
    str[j] = str[i];
    str[i] = temp;
    j++;
  }
  return (str);
}

#include <stdio.h>
int main()
{
  char str[] = "Hello, World!";
  printf("%s\\n", str);
  ft_strrev(str);
  printf("%s\\n", str);
  // str now contains "!dlroW ,olleH"
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strrev niveau 2 c deux pointeurs`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "22",
    heading: `<span class="file">ft_strspn.c</span>`, tag: `scan autorisé`, lang: "c",
    analogy: `✅ Compter les caractères initiaux appartenant tous à un ensemble donné.`,
    brief: [`Reproduce exactly the behavior of the strspn function (man strspn).`],
    signature: `programme : ./ft_strspn`,
    solution: `/*
** Reproduce exactly the behavior of the strspn function (man strspn).
*/

size_t ft_strspn(char *s1, char *s2)
{
  size_t i;
  size_t j;

  i = 0;
  while (s1[i] != '\\0')
  {
    j = 0;
    while (s2[j] != '\\0')
    {
      if (s1[i] == s2[j])
        break ;
      j++;
    }
    if (s2[j] == '\\0')
      return (i);
    i++;
  }
  return (i);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_strspn niveau 2 c scan autorisé`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "23",
    heading: `<span class="file">inter.c</span>`, tag: `double boucle`, lang: "c",
    analogy: `🤝 Les caractères communs aux deux chaînes, sans doublons, dans l'ordre de la première.`,
    brief: [`Write a program that takes two strings and displays, without doubles, the characters that appear in both strings, in the order they appear in the first one.`, `The display will be followed by a \\n.`, `If the number of arguments is not 2, the program displays \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./inter`,
    solution: `/*
** Write a program that takes two strings and displays, without doubles, the
characters that appear in both strings, in the order they appear in the first
one.

The display will be followed by a \\n.

If the number of arguments is not 2, the program displays \\n.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;
  int j;
  int found;

  i = 0;
  if (argc == 3)
  {
    while(argv[1][i] != '\\0')
    {
      j = 0;
      found = 0;
      while(argv[2][j] != '\\0')
      {
        if (argv[1][i] == argv[2][j])
          found = 1;
        j++;
      }
      if (found == 1)
      {
        j = 0;
        while(j < i)
        {
          if (argv[1][i] == argv[1][j])
            found = 0;
          j++;
        }
        if (found == 1)
          write(1, &argv[1][i], 1);
      }
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `inter niveau 2 c double boucle`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "24",
    heading: `<span class="file">is_power_of_2.c</span>`, tag: `bits`, lang: "c",
    analogy: `💡 n & (n-1) == 0 : une puissance de 2 n'a qu'un seul bit allumé.`,
    brief: [`Write a function that determines if a given number is a power of 2.`, `This function returns 1 if the given number is a power of 2, otherwise it returns 0.`],
    signature: `int is_power_of_2(unsigned int n)`,
    solution: `/*
** Write a function that determines if a given number is a power of 2.

This function returns 1 if the given number is a power of 2, otherwise it returns 0.
*/

int is_power_of_2(unsigned int n)
{
  if (n == 0)
    return (0);
  while (n % 2 == 0)
    n /= 2;
  return (n == 1);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `is_power_of_2 niveau 2 c bits`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "25",
    heading: `<span class="file">last_word.c</span>`, tag: `parsing inverse`, lang: "c",
    analogy: `🔚 Trouver le dernier mot : partir de la fin, sauter les espaces.`,
    brief: [`Write a program that takes a string and displays its last word followed by a \\n.`, `A word is a section of string delimited by spaces/tabs or by the start/end of the string.`, `If the number of parameters is not 1, or there are no words, display a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./last_word`,
    solution: `/*
** Write a program that takes a string and displays its last word followed by a \\n.

A word is a section of string delimited by spaces/tabs or by the start/end of
the string.

If the number of parameters is not 1, or there are no words, display a newline.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;

  i = 0;
  if (argc == 2)
  {
    while(argv[1][i] != '\\0')
      i++;
    i--;
    while(argv[1][i] == ' ' || argv[1][i] == '\\t')
      i--;
    while(argv[1][i] != ' ' && argv[1][i] != '\\t' && argv[1][i] != '\\0')
      i--;
    i++;
    while(argv[1][i] != ' ' && argv[1][i] != '\\t' && argv[1][i] != '\\0')
    {
      write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `last_word niveau 2 c parsing inverse`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "26",
    heading: `<span class="file">max.c</span>`, tag: `parcours tableau`, lang: "c",
    analogy: `🏔️ Le champion provisoire : chaque élément peut détrôner le maximum courant.`,
    brief: [`Write the following function:`, `The first parameter is an array of int, the second is the number of elements in the array.`, `The function returns the largest number found in the array.`, `If the array is empty, the function returns 0.`],
    signature: `int max(int *tab, unsigned int len)`,
    solution: `/*
** Write the following function:

The first parameter is an array of int, the second is the number of elements in
the array.

The function returns the largest number found in the array.

If the array is empty, the function returns 0.
*/

int max(int *tab, unsigned int len)
{
  unsigned int i;
  int maxNum;

  if (len == 0)
    return (0);
  maxNum = tab[0];
  i = 1;
  while (i < len)
  {
    if (tab[i] > maxNum)
      maxNum = tab[i];
    i++;
  }
  return (maxNum);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `max niveau 2 c parcours tableau`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "27",
    heading: `<span class="file">print_bits.c</span>`, tag: `décalage bits`, lang: "c",
    analogy: `🔬 Afficher un octet bit par bit avec >> et &.`,
    brief: [`Write a function that takes a byte, and prints it in binary WITHOUT A NEWLINE AT THE END.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `void print_bits(unsigned char octet)`,
    solution: `/*
** Write a function that takes a byte, and prints it in binary WITHOUT A NEWLINE
AT THE END.

Allowed functions: write
*/

#include <unistd.h>

void print_bits(unsigned char octet)
{
  int i;
  char bit;

  i = 8;
  while (i--)
  {
    bit = (octet >> i & 1) + '0';
    write(1, &bit, 1);
  }
}

// octet >> i : shift the bits of octet to the right by i positions
// & 1 : perform a bitwise AND operation with 1 to check if the least significant bit is 1 or 0

int main(void)
{
  unsigned char octet = 'A';
  // 'A' in ASCII is 65, which is 01000001 in binary
  print_bits(octet);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `print_bits niveau 2 c décalage bits`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "28",
    heading: `<span class="file">reverse_bits.c</span>`, tag: `bits`, lang: "c",
    analogy: `🔁 Inverser l'ordre des 8 bits d'un octet.`,
    brief: [`Write a function that takes a byte, reverses it, bit by bit (like the`, `Exemple : <code></code>`],
    signature: `void print_bits(unsigned char octet)`,
    solution: `/*
** Write a function that takes a byte, reverses it, bit by bit (like the
example) and returns the result.
*/

#include <unistd.h>

void print_bits(unsigned char octet)
{
  int i;
  char bit;

  i = 8;
  while (i--)
  {
    bit = (octet >> i & 1) + '0';
    write(1, &bit, 1);
  }
}

unsigned char reverse_bits(unsigned char octet)
{
  unsigned char reversed;
  int i;

  reversed = 0;
  i = 0;
  while (i < 8)
  {
    reversed <<= 1; // Shift the bits of reversed to the left by 1 position
    reversed |= (octet & 1); // Perform a bitwise OR operation with the least significant bit of octet
    octet >>= 1; // Shift the bits of octet to the right by 1 position
    i++;
  }
  return (reversed);
}

int main(void)
{
  unsigned char octet = 'A';
  // 'A' in ASCII is 65, which is 01000001 in binary
  print_bits(reverse_bits(octet));
  // The reversed bits of 01000001 is 10000010, which is 130 in decimal
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `reverse_bits niveau 2 c bits`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "29",
    heading: `<span class="file">snake_to_camel.c</span>`, tag: `casse + saut`, lang: "c",
    analogy: `🐫 hello_world → helloWorld : _x devient X.`,
    brief: [`Write a program that takes a single string in snake_case format and converts it into a string in lowerCamelCase format.`, `A snake_case string is a string where each word is in lower case, separated by an underscore "_".`, `A lowerCamelCase string is a string where each word begins with a capital letter except for the first one.`, `<b>Fonctions autorisées :</b> <code>write, malloc, realloc, free</code>`],
    signature: `programme : ./snake_to_camel`,
    solution: `/*
** Write a program that takes a single string in snake_case format
and converts it into a string in lowerCamelCase format.

A snake_case string is a string where each word is in lower case, separated by
an underscore "_".

A lowerCamelCase string is a string where each word begins with a capital letter
except for the first one.

** Allowed functions: write, malloc, realloc, free
*/

#include <unistd.h>

int	main(int argc, char **argv)
{
  int i;
  char c;

  if (argc == 2)
  {
    i = 0;
    while (argv[1][i])
    {
      if (argv[1][i] == '_')
      {
        i++;
        c = argv[1][i] - 32;
        write(1, &c, 1);
      }
      else
        write(1, &argv[1][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `snake_to_camel niveau 2 c casse + saut`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "30",
    heading: `<span class="file">swap_bits.c</span>`, tag: `bits`, lang: "c",
    analogy: `🃏 Échanger les 4 bits hauts et les 4 bits bas : (o >> 4) | (o << 4).`,
    brief: [`Write a function that takes a byte, swaps its halves (like the example) and returns the result.`],
    signature: `unsigned char swap_bits(unsigned char octet)`,
    solution: `/*
** Write a function that takes a byte, swaps its halves (like the example) and
returns the result.
*/

unsigned char swap_bits(unsigned char octet)
{
  return (octet >> 4 | octet << 4);
}

#include <stdio.h>
int main(void)
{
  unsigned char octet = 'A';
  // 'A' in ASCII is 65, which is 01000001 in binary
  // The swapped bits of 01000001 is 00010000, which is 16 in decimal
  printf("Original: %d, Swapped: %d\\n", octet, swap_bits(octet));
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `swap_bits niveau 2 c bits`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "31",
    heading: `<span class="file">union.c</span>`, tag: `double boucle`, lang: "c",
    analogy: `∪ Tous les caractères des deux chaînes, sans doublons, dans l'ordre d'apparition.`,
    brief: [`Write a program that takes two strings and displays, without doubles, the characters that appear in either one of the strings.`, `The display will be in the order characters appear in the command line, and will be followed by a \\n.`, `If the number of arguments is not 2, the program displays \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./union`,
    solution: `/*
** Write a program that takes two strings and displays, without doubles, the
characters that appear in either one of the strings.

The display will be in the order characters appear in the command line, and
will be followed by a \\n.

If the number of arguments is not 2, the program displays \\n.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;
  int j;
  int found;

  i = 0;
  if (argc == 3)
  {
    while(argv[1][i] != '\\0')
    {
      found = 0;
      j = 0;
      while(argv[2][j] != '\\0')
      {
        if (argv[1][i] == argv[2][j])
        {
          found = 1;
          break;
        }
        j++;
      }
      if (!found)
        write(1, &argv[1][i], 1);
      i++;
    }
    i = 0;
    while(argv[2][i] != '\\0')
    {
      found = 0;
      j = 0;
      while(argv[1][j] != '\\0')
      {
        if (argv[2][i] == argv[1][j])
        {
          found = 1;
          break;
        }
        j++;
      }
      if (!found)
        write(1, &argv[2][i], 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `union niveau 2 c double boucle`,
  },
  {
    view: "official", tab: 0, level: 2, section: `Niveau 2`, num: "32",
    heading: `<span class="file">wdmatch.c</span>`, tag: `sous-séquence`, lang: "c",
    analogy: `🕵️ s1 est-il caché dans s2, lettres dans l'ordre ? (le hidenp des chaînes)`,
    brief: [`Write a program that takes two strings and checks whether it's possible to write the first string with characters from the second string, while respecting the order in which these characters appear in the second string.`, `If it's possible, the program displays the string, followed by a \\n, otherwise it simply displays a \\n.`, `If the number of arguments is not 2, the program displays a \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./wdmatch`,
    solution: `/*
** Write a program that takes two strings and checks whether it's possible to
write the first string with characters from the second string, while respecting
the order in which these characters appear in the second string.

If it's possible, the program displays the string, followed by a \\n, otherwise
it simply displays a \\n.

If the number of arguments is not 2, the program displays a \\n.

** Allowed functions: write
*/

#include <unistd.h>

int main(int argc, char **argv)
{
  int i;
  int j;

  i = 0;
  if (argc == 3)
  {
    while(argv[1][i] != '\\0')
    {
      j = 0;
      while(argv[2][j] != '\\0')
      {
        if (argv[1][i] == argv[2][j])
          break;
        j++;
      }
      if (argv[2][j] == '\\0')
        break;
      i++;
    }
    if (argv[1][i] == '\\0')
      write(1, argv[1], i);
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `wdmatch niveau 2 c sous-séquence`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "33",
    heading: `<span class="file">add_prime_sum.c</span>`, tag: `premiers`, lang: "c",
    analogy: `➕ Additionner tous les nombres premiers jusqu'à n.`,
    brief: [`Write a program that takes a positive integer as argument and displays the sum of all prime numbers inferior or equal to it followed by a newline.`, `If the number of arguments is not 1, or the argument is not a positive number, just display 0 followed by a newline.`, `<b>Fonctions autorisées :</b> <code>write, exit</code>`],
    signature: `programme : ./add_prime_sum`,
    solution: `/*
** Write a program that takes a positive integer as argument and displays the sum
of all prime numbers inferior or equal to it followed by a newline.

If the number of arguments is not 1, or the argument is not a positive number,
just display 0 followed by a newline.

** Allowed functions: write, exit
*/

#include <unistd.h>

static int ft_atoi(char *str)
{
  int res;

  res = 0;
  while (*str >= '0' && *str <= '9')
  {
    res = res * 10 + (*str - '0');
    str++;
  }
  return (res);
}

static void	ft_putnbr(int nb)
{
	char	c;

	if (nb >= 10)
    ft_putnbr(nb / 10);
	c = nb % 10 + '0';
  write(1, &c, 1);
}

static int is_prime(int num)
{
  int i;

  if (num <= 1)
    return (0);
  i = 2;
  while (i <= num / 2)
  {
    if (num % i == 0)
      return (0);
    i++;
  }
  return (1);
}

int main(int argc, char **argv)
{
  int i;
  int sum;

  sum = 0;
  if (argc == 2)
  {
    i = 2;
    while (i <= ft_atoi(argv[1]))
    {
      if (is_prime(i))
        sum += i;
      i++;
    }
  }
  ft_putnbr(sum);
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `add_prime_sum niveau 3 c premiers`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "34",
    heading: `<span class="file">epur_str.c</span>`, tag: `parsing espaces`, lang: "c",
    analogy: `🧹 Nettoyer une phrase : un seul espace entre les mots, rien au bord.`,
    brief: [`Write a program that takes a string, and displays this string with exactly one space between words, with no spaces or tabs either at the beginning or the end, followed by a \\n.`, `A "word" is defined as a part of a string delimited either by spaces/tabs, or by the start/end of the string.`, `If the number of arguments is not 1, or if there are no words to display, the program displays \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./epur_str`,
    solution: `/*
** Write a program that takes a string, and displays this string with exactly one
space between words, with no spaces or tabs either at the beginning or the end,
followed by a \\n.

A "word" is defined as a part of a string delimited either by spaces/tabs, or
by the start/end of the string.

If the number of arguments is not 1, or if there are no words to display, the
program displays \\n.

** Allowed functions: write
*/

#include <unistd.h>

static int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t');
}

int main(int argc, char **argv)
{
  int i;

  if (argc == 2)
  {
    i = 0;
    while (argv[1][i] && is_delimiter(argv[1][i]))
      i++;
    while (argv[1][i])
    {
      if (!is_delimiter(argv[1][i]))
        write(1, &argv[1][i], 1);
      else if (!is_delimiter(argv[1][i - 1]) && argv[1][i + 1])
        write(1, " ", 1);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `epur_str niveau 3 c parsing espaces`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "35",
    heading: `<span class="file">expand_str.c</span>`, tag: `parsing espaces`, lang: "c",
    analogy: `📏 Ré-espacer une phrase : exactement trois espaces entre les mots.`,
    brief: [`Write a program that takes a string and displays it with exactly three spaces between each word, with no spaces or tabs either at the beginning or the end, followed by a newline.`, `A word is a section of string delimited either by spaces/tabs, or by the start/end of the string.`, `If the number of parameters is not 1, or if there are no words, simply display a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./expand_str`,
    solution: `/*
** Write a program that takes a string and displays it with exactly three spaces
between each word, with no spaces or tabs either at the beginning or the end,
followed by a newline.

A word is a section of string delimited either by spaces/tabs, or by the
start/end of the string.

If the number of parameters is not 1, or if there are no words, simply display
a newline.

** Allowed functions: write
*/

#include <unistd.h>

static int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t');
}

int main(int argc, char **argv)
{
  int i;

  if (argc == 2)
  {
    i = 0;
    while (argv[1][i] && is_delimiter(argv[1][i]))
      i++;
    while (argv[1][i])
    {
      if (!is_delimiter(argv[1][i]))
        write(1, &argv[1][i], 1);
      else if (!is_delimiter(argv[1][i - 1]) && argv[1][i + 1])
        write(1, "   ", 3);
      i++;
    }
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `expand_str niveau 3 c parsing espaces`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "36",
    heading: `<span class="file">ft_atoi_base.c</span>`, tag: `bases`, lang: "c",
    analogy: `🔢 Lire un nombre dans une base 2-16, signes compris.`,
    brief: [`Write a function that converts the string argument str (base N &lt;= 16) to an integer (base 10) and returns it.`, `The characters recognized in the input are: 0123456789abcdef Those are, of course, to be trimmed according to the requested base. For`, `Exemple : <code>Uppercase letters must also be recognized: "12fdb3" is the same as "12FDB3".<br>Minus signs ('-') are interpreted only if they are the first character of the<br>string.</code>`],
    signature: `int ft_atoi_base(const char *str, int base)`,
    solution: `/*
** Write a function that converts the string argument str (base N <= 16)
to an integer (base 10) and returns it.

The characters recognized in the input are: 0123456789abcdef
Those are, of course, to be trimmed according to the requested base. For
example, base 4 recognizes "0123" and base 16 recognizes "0123456789abcdef".

Uppercase letters must also be recognized: "12fdb3" is the same as "12FDB3".

Minus signs ('-') are interpreted only if they are the first character of the
string.
*/

static int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\n' || c == '\\v' || c == '\\f' || c == '\\r');
}

static int is_valid_char(char c, int base)
{
  if (base <= 10)
    return (c >= '0' && c <= '9');
  return (
    (c >= '0' && c <= '9') ||
    (c >= 'A' && c <= ('A' + base - 10)) ||
    (c >= 'a' && c <= ('a' + base - 10))
  );
}

int ft_atoi_base(const char *str, int base)
{
  int i;
  int sign;
  int num;

  i = 0;
  sign = 1;
  num = 0;
  if (!str[0] || base < 2 || base > 16)
    return (0);
  while (is_delimiter(str[i]))
    i++;
  if (str[i] == '-' || str[i] == '+')
  {
    if (str[i] == '-')
      sign *= -1;
    i++;
  }
  while (str[i] && is_valid_char(str[i], base))
  {
    if (str[i] >= 'A' && str[i] <= 'F')
      num = num * base + (str[i] - 'A' + 10);
    else if (str[i] >= 'a' && str[i] <= 'f')
      num = num * base + (str[i] - 'a' + 10);
    else
      num = num * base + (str[i] - '0');
    i++;
  }
  return (num * sign);
}

#include <stdio.h>

int main(void)
{
  printf("%d\\n", ft_atoi_base("   -1A", 16)); // -26 <- base 16
  printf("%d\\n", ft_atoi_base("1010", 2)); // 10 <- base 2
  printf("%d\\n", ft_atoi_base("7F", 16)); // 127 <- base 16
  printf("%d\\n", ft_atoi_base("123", 10)); // 123 <- base 10
  printf("%d\\n", ft_atoi_base("   +Z", 36)); // Invalid base, should return 0
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_atoi_base niveau 3 c bases`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "37",
    heading: `<span class="file">ft_list_size.c</span>`, tag: `liste chaînée`, lang: "c",
    analogy: `🔗 Compter les wagons du train : avancer de next en next.`,
    brief: [`Write a function that returns the number of elements in the linked list that's passed to it.`],
    signature: `int ft_list_size(t_list *begin_list)`,
    solution: `/*
** Write a function that returns the number of elements in the linked list that's passed to it.
*/

#include "ft_list.h"

int ft_list_size(t_list *begin_list)
{
  int count;

  count = 0;
  while (begin_list)
  {
    count++;
    begin_list = begin_list->next;
  }
  return (count);
}

/* --- ft_list.h fourni ---
#ifndef FT_LIST_H
# define FT_LIST_H

typedef struct s_list
{
  struct s_list	*next;
  void			    *data;
}	              t_list;

#endif
*/
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_list_size niveau 3 c liste chaînée`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "38",
    heading: `<span class="file">ft_range.c</span>`, tag: `malloc tableau`, lang: "c",
    analogy: `📊 Allouer un tableau rempli de start à end inclus.`,
    brief: [`Write the following function:`, `int     *ft_range(int start, int end);`, `It must allocate (with malloc()) an array of integers, fill it with consecutive values that begin at start and end at end (Including start and end !), then return a pointer to the first value of the array.`, `Exemple : <code>- With (1, 3) you will return an array containing 1, 2 and 3.<br>- With (-1, 2) you will return an array containing -1, 0, 1 and 2.<br>- With (0, 0) you will return an array containing 0.<br>- With (0, -3) you will return an array containing 0, -1, -2 and -3.</code>`, `<b>Fonctions autorisées :</b> <code>malloc</code>`],
    signature: `int     *ft_range(int start, int end);`,
    solution: `/*
** Write the following function:

int     *ft_range(int start, int end);

** It must allocate (with malloc()) an array of integers, fill it with consecutive
values that begin at start and end at end (Including start and end !), then
return a pointer to the first value of the array.

** Examples:

- With (1, 3) you will return an array containing 1, 2 and 3.
- With (-1, 2) you will return an array containing -1, 0, 1 and 2.
- With (0, 0) you will return an array containing 0.
- With (0, -3) you will return an array containing 0, -1, -2 and -3.

** Allowed functions: malloc
*/

#include <stdlib.h>

int	*ft_range(int start, int end)
{
	int	i;
	int	*range;

  range = malloc(sizeof(int) * (abs(end - start) + 1));
	if (!range)
		return (NULL);
	i = 0;
	if (start < end)
	{
		while (start <= end)
			range[i++] = start++;
	}
	else
	{
		while (start >= end)
			range[i++] = start--;
	}
	return (range);
}

#include <stdio.h>

int main(int argc, char **argv)
{
	(void)argc;
	int	arr_len;
	int	*arr;

	arr_len = abs(atoi(argv[2]) - atoi(argv[1]));
	arr = ft_range(atoi(argv[1]), atoi(argv[2]));
	for (int i = 0; i <= arr_len; i += 1)
		printf("%d\\n", arr[i]);
	free(arr);
	return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_range niveau 3 c malloc tableau`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "39",
    heading: `<span class="file">ft_rrange.c</span>`, tag: `malloc tableau`, lang: "c",
    analogy: `📉 Comme ft_range, mais en descendant de end vers start.`,
    brief: [`It must allocate (with malloc()) an array of integers, fill it with consecutive values that begin at end and end at start (Including start and end !), then return a pointer to the first value of the array.`, `<b>Fonctions autorisées :</b> <code>malloc</code>`],
    signature: `int *ft_rrange(int start, int end)`,
    solution: `/*
** It must allocate (with malloc()) an array of integers, fill it with consecutive
values that begin at end and end at start (Including start and end !), then
return a pointer to the first value of the array.

** Allowed functions: malloc
*/

#include <stdlib.h>

int *ft_rrange(int start, int end)
{
  int *range;
  int i;

  if (start > end)
    return (NULL);
  range = (int *)malloc(sizeof(int) * (end - start + 1));
  if (!range)
    return (NULL);
  i = 0;
  while (start <= end)
    range[i++] = end--;
  return (range);
}

#include <stdio.h>

int main(void)
{
  int *range;
  int i;
  int size;
  int min = 3;
  int max = 10;

  range = ft_rrange(min, max);
  size = max - min;
  if (range)
  {
    for (i = 0; i < size + 1; i++)
      printf("%d ", range[i]);
    printf("\\n");
    free(range);
  }
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_rrange niveau 3 c malloc tableau`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "40",
    heading: `<span class="file">hidenp.c</span>`, tag: `sous-séquence`, lang: "c",
    analogy: `🕵️ s1 est-il une sous-séquence de s2 ? Affiche 1 ou 0.`,
    brief: [`Write a program named hidenp that takes two strings and displays 1 followed by a newline if the first string is hidden in the second one, otherwise displays 0 followed by a newline.`, `Let s1 and s2 be strings. We say that s1 is hidden in s2 if it's possible to find each character from s1 in s2, in the same order as they appear in s1.`, `Also, the empty string is hidden in any string.`, `If the number of parameters is not 2, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `int is_hidden(char *s1, char *s2)`,
    solution: `/*
** Write a program named hidenp that takes two strings and displays 1
followed by a newline if the first string is hidden in the second one,
otherwise displays 0 followed by a newline.

Let s1 and s2 be strings. We say that s1 is hidden in s2 if it's possible to
find each character from s1 in s2, in the same order as they appear in s1.
Also, the empty string is hidden in any string.

If the number of parameters is not 2, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

int is_hidden(char *s1, char *s2)
{
  int index_s1;
  int index_s2;

  index_s1 = 0;
  index_s2 = 0;
  while (s1[index_s1] && s2[index_s2])
  {
    if (s1[index_s1] == s2[index_s2])
      index_s1++;
    index_s2++;
  }
  return (s1[index_s1] == '\\0');
}

int main(int argc, char **argv)
{
  if (argc == 3)
  {
    if (is_hidden(argv[1], argv[2]))
      write(1, "1\\n", 2);
    else
      write(1, "0\\n", 2);
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `hidenp niveau 3 c sous-séquence`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "41",
    heading: `<span class="file">lcm.c</span>`, tag: `pgcd/ppcm`, lang: "c",
    analogy: `🧮 Le PPCM via le PGCD : lcm = a*b / gcd(a,b).`,
    brief: [`Write a function who takes two unsigned int as parameters and returns the computed LCM of those parameters.`, `LCM (Lowest Common Multiple) of two non-zero integers is the smallest postive integer divisible by the both integers.`, `A LCM can be calculated in two ways:`, `- You can calculate every multiples of each integers until you have a common multiple other than 0`, `- You can use the HCF (Highest Common Factor) of these two integers and calculate as follows:`, `LCM(x, y) = | x * y | / HCF(x, y)`, `| x * y | means "Absolute value of the product of x by y"`, `If at least one integer is null, LCM is equal to 0.`],
    signature: `unsigned int hcf(unsigned int a, unsigned int b)`,
    solution: `/*
** Write a function who takes two unsigned int as parameters and returns the
computed LCM of those parameters.

LCM (Lowest Common Multiple) of two non-zero integers is the smallest postive
integer divisible by the both integers.

A LCM can be calculated in two ways:

- You can calculate every multiples of each integers until you have a common
multiple other than 0

- You can use the HCF (Highest Common Factor) of these two integers and
calculate as follows:

	LCM(x, y) = | x * y | / HCF(x, y)

  | x * y | means "Absolute value of the product of x by y"

If at least one integer is null, LCM is equal to 0.
*/

unsigned int hcf(unsigned int a, unsigned int b)
{
  unsigned int temp;

  while (b != 0)
  {
    temp = b;
    b = a % b;
    a = temp;
  }
  return (a);
}

unsigned int lcm(unsigned int a, unsigned int b)
{
  if (a == 0 || b == 0)
    return (0);
  return (a * b) / hcf(a, b);
}

#include <stdio.h>

int main(void)
{
  unsigned int a = 12;
  unsigned int b = 15;
  printf("LCM of %u and %u is %u\\n", a, b, lcm(a, b)); // LCM of 12 and 15 is 60
  return (0);
}

/*
Dans la fonction hcf, si a = 12 et b = 15, voici comment les étapes se déroulent :
1. Initialement, a = 12 et b = 15.
2. La première itération de la boucle while :
  - temp = b = 15
  - b = a % b = 12 % 15 = 12 (car 12 est plus petit que 15, le reste est 12)
  - a = temp = 15
  Maintenant, a = 15 et b = 12.
3. La deuxième itération de la boucle while :
  - temp = b = 12
  - b = a % b = 15 % 12 = 3 (car 15 divisé par 12 donne un quotient de 1 et un reste de 3)
  - a = temp = 12
  Maintenant, a = 12 et b = 3.
4. La troisième itération de la boucle while :
  - temp = b = 3
  - b = a % b = 12 % 3 = 0 (car 12 est divisible par 3, le reste est 0)
  - a = temp = 3
  Maintenant, a = 3 et b = 0.
5. La boucle while se termine car b est maintenant égal à 0.
6. La fonction retourne a, qui est égal à 3, ce qui est le HCF de 12 et 15.
7. Ensuite, dans la fonction lcm, on calcule le LCM en utilisant la formule LCM(x, y) = | x * y | / HCF(x, y). Donc, LCM(12, 15) = (12 * 15) / 3 = 180 / 3 = 60.
8. La fonction lcm retourne 60, qui est le LCM de 12 et 15.
9. Le programme affiche "LCM of 12 and 15 is 60".
10. Le programme se termine avec un code de retour de 0, indiquant que tout s'est bien passé.
*/
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `lcm niveau 3 c pgcd/ppcm`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "42",
    heading: `<span class="file">parasum.c</span>`, tag: `argc`, lang: "c",
    analogy: `🔢 Compter les arguments du programme, tout simplement argc - 1.`,
    brief: [`Write a program that displays the number of arguments passed to it, followed by a newline.`, `If there are no arguments, just display a 0 followed by a newline.`, `Exemple : <code>$&gt;./paramsum 1 2 3 5 7 24<br>6<br>$&gt;./paramsum 6 12 24 | cat -e<br>3$<br>$&gt;./paramsum | cat -e<br>0$<br>$&gt;</code>`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./parasum`,
    solution: `/*
** Write a program that displays the number of arguments passed to it, followed by a newline.

If there are no arguments, just display a 0 followed by a newline.

Example:

$>./paramsum 1 2 3 5 7 24
6
$>./paramsum 6 12 24 | cat -e
3$
$>./paramsum | cat -e
0$
$>

** Allowed functions: write
*/

#include <unistd.h>

static void ft_putnbr(int nb)
{
  char	c;

  if (nb >= 10)
    ft_putnbr(nb / 10);
  c = nb % 10 + '0';
  write(1, &c, 1);
}

int main(int argc, char **argv)
{
  (void)argv; // Unused parameter
  ft_putnbr(argc - 1); // Subtract 1 to exclude the program name
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `parasum niveau 3 c argc`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "43",
    heading: `<span class="file">pgcd.c</span>`, tag: `euclide`, lang: "c",
    analogy: `➗ L'algorithme d'Euclide : le reste remplace le diviseur jusqu'à zéro.`,
    brief: [`Write a program that takes two strings representing two strictly positive integers that fit in an int.`, `Display their highest common denominator followed by a newline (It's always a strictly positive integer).`, `If the number of parameters is not 2, display a newline.`, `<b>Fonctions autorisées :</b> <code>printf, atoi, malloc, free</code>`],
    signature: `int hcf(int a, int b)`,
    solution: `/*
** Write a program that takes two strings representing two strictly positive
integers that fit in an int.

Display their highest common denominator followed by a newline (It's always a
strictly positive integer).

If the number of parameters is not 2, display a newline.

** Allowed functions: printf, atoi, malloc, free
*/

#include <stdio.h>
#include <stdlib.h>

int hcf(int a, int b)
{
  int temp;

  while (b != 0)
  {
    temp = b;
    b = a % b;
    a = temp;
  }
  return (a);
}

int main(int argc, char **argv)
{
  if (argc == 3)
  {
    int num1 = atoi(argv[1]);
    int num2 = atoi(argv[2]);
    printf("%d", hcf(num1, num2));
  }
  printf("\\n");
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `pgcd niveau 3 c euclide`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "44",
    heading: `<span class="file">print_hex.c</span>`, tag: `bases`, lang: "c",
    analogy: `🔡 Convertir un décimal en hexadécimal, récursivement.`,
    brief: [`Write a program that takes a positive (or zero) number expressed in base 10, and displays it in base 16 (lowercase letters) followed by a newline.`, `If the number of parameters is not 1, the program displays a newline.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./print_hex`,
    solution: `/*
** Write a program that takes a positive (or zero) number expressed in base 10,
and displays it in base 16 (lowercase letters) followed by a newline.

If the number of parameters is not 1, the program displays a newline.

** Allowed functions: write
*/

#include <unistd.h>

static void print_hex(int num)
{
  char *hex_digits;

  hex_digits = "0123456789abcdef";

  if (num == 0)
    write(1, "0", 1);
  while (num)
  {
    write(1, &hex_digits[num % 16], 1);
    num /= 16;
  }
}

static int ft_atoi(char *str)
{
  int i;
  int sign;
  int num;

  i = 0;
  sign = 1;
  num = 0;
  while (str[i] == ' ' || str[i] == '\\t' || str[i] == '\\n' || str[i] == '\\v' || str[i] == '\\f' || str[i] == '\\r')
    i++;
  if (str[i] == '-' || str[i] == '+')
  {
    if (str[i] == '-')
      sign = -1;
    i++;
  }
  while (str[i] >= '0' && str[i] <= '9')
  {
    num = num * 10 + (str[i] - '0');
    i++;
  }
  return (num * sign);
}

int main(int argc, char **argv)
{
  if (argc == 2)
    print_hex(ft_atoi(argv[1]));
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `print_hex niveau 3 c bases`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "45",
    heading: `<span class="file">rstr_capitalizer.c</span>`, tag: `casse + position`, lang: "c",
    analogy: `🔠 La DERNIÈRE lettre de chaque mot en majuscule, le reste en minuscules.`,
    brief: [`Write a program that takes one or more strings and, for each argument, puts the last character that is a letter of each word in uppercase and the rest in lowercase, then displays the result followed by a \\n.`, `A word is a section of string delimited by spaces/tabs or the start/end of the string. If a word has a single letter, it must be capitalized.`, `A letter is a character in the set [a-zA-Z]`, `If there are no parameters, display \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./rstr_capitalizer`,
    solution: `/*
** Write a program that takes one or more strings and, for each argument, puts
the last character that is a letter of each word in uppercase and the rest
in lowercase, then displays the result followed by a \\n.

A word is a section of string delimited by spaces/tabs or the start/end of the
string. If a word has a single letter, it must be capitalized.

A letter is a character in the set [a-zA-Z]

If there are no parameters, display \\n.

** Allowed functions: write
*/

#include <unistd.h>

static int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\0');
}

static void rstr_capitalizer(char *str)
{
  int i;

  i = 0;
  while (str[i])
  {
    if (!is_delimiter(str[i]) && is_delimiter(str[i + 1]))
    {
      if (str[i] >= 'a' && str[i] <= 'z')
        str[i] -= 32; // Convert to uppercase
    }
    else if (str[i] >= 'A' && str[i] <= 'Z')
      str[i] += 32; // Convert to lowercase
    write(1, &str[i++], 1); // Write the modified character
  }
}

int main(int argc, char **argv)
{
  int i;

  if (argc > 1)
  {
    i = 1;
    while (i < argc)
    {
      rstr_capitalizer(argv[i]);
      write(1, "\\n", 1);
      i++;
    }
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rstr_capitalizer niveau 3 c casse + position`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "46",
    heading: `<span class="file">str_capitalizer.c</span>`, tag: `casse + position`, lang: "c",
    analogy: `🔠 La PREMIÈRE lettre de chaque mot en majuscule, le reste en minuscules.`,
    brief: [`Write a program that takes one or several strings and, for each argument, capitalizes the first character of each word (If it's a letter, obviously), puts the rest in lowercase, and displays the result on the standard output, followed by a \\n.`, `A "word" is defined as a part of a string delimited either by spaces/tabs, or by the start/end of the string. If a word only has one letter, it must be capitalized.`, `If there are no arguments, the progam must display \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./str_capitalizer`,
    solution: `/*
** Write a program that takes one or several strings and, for each argument,
capitalizes the first character of each word (If it's a letter, obviously),
puts the rest in lowercase, and displays the result on the standard output,
followed by a \\n.

A "word" is defined as a part of a string delimited either by spaces/tabs, or
by the start/end of the string. If a word only has one letter, it must be
capitalized.

If there are no arguments, the progam must display \\n.

** Allowed functions: write
*/

#include <unistd.h>

static int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\0');
}

static void str_capitalizer(char *str)
{
  int i;

  i = 0;
  while (str[i])
  {
    if (!is_delimiter(str[i]) && (i == 0 || is_delimiter(str[i - 1])))
    {
      if (str[i] >= 'a' && str[i] <= 'z')
        str[i] -= 32; // Convert to uppercase
    }
    else if (str[i] >= 'A' && str[i] <= 'Z')
      str[i] += 32; // Convert to lowercase
    write(1, &str[i++], 1); // Write the modified character
  }
}

int main(int argc, char **argv)
{
  int i;

  if (argc > 1)
  {
    i = 1;
    while (i < argc)
    {
      str_capitalizer(argv[i]);
      write(1, "\\n", 1);
      i++;
    }
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `str_capitalizer niveau 3 c casse + position`,
  },
  {
    view: "official", tab: 0, level: 3, section: `Niveau 3`, num: "47",
    heading: `<span class="file">tab_mult.c</span>`, tag: `boucle + putnbr`, lang: "c",
    analogy: `✖️ Afficher la table de multiplication d'un nombre, de 1 à 9.`,
    brief: [`Write a program that displays a number's multiplication table.`, `The parameter will always be a strictly positive number that fits in an int, and said number times 9 will also fit in an int.`, `If there are no parameters, the program displays \\n.`, `<b>Fonctions autorisées :</b> <code>write</code>`],
    signature: `programme : ./tab_mult`,
    solution: `/*
** Write a program that displays a number's multiplication table.

The parameter will always be a strictly positive number that fits in an int,
and said number times 9 will also fit in an int.

If there are no parameters, the program displays \\n.

** Allowed functions: write
*/

#include <unistd.h>

static void ft_putnbr(int nb)
{
  char c;

  if (nb >= 10)
    ft_putnbr(nb / 10);
  c = nb % 10 + '0';
  write(1, &c, 1);
}

static int ft_atoi(char *str)
{
  int res;

  res = 0;
  while (*str >= '0' && *str <= '9')
  {
    res = res * 10 + (*str - '0');
    str++;
  }
  return (res);
}

int main(int argc, char **argv)
{
  int num;
  int i;

  if (argc == 2)
  {
    i = 1;
    num = ft_atoi(argv[1]);
    while (i <= 9)
    {
      ft_putnbr(i);
      write(1, " x ", 3);
      ft_putnbr(num);
      write(1, " = ", 3);
      ft_putnbr(i * num);
      write(1, "\\n", 1);
      i++;
    }
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `tab_mult niveau 3 c boucle + putnbr`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "48",
    heading: `<span class="file">flood_fill.c</span>`, tag: `récursion 2D`, lang: "c",
    analogy: `🎨 Le pot de peinture : remplir de proche en proche tant que la couleur est la même.`,
    brief: [`Write a function that takes a char ** as a 2-dimensional array of char, a t_point as the dimensions of this array and a t_point as the starting point.`, `Starting from the given 'begin' t_point, this function fills an entire zone by replacing characters inside with the character 'F'. A zone is an group of the same character delimitated horizontally and vertically by other characters or the array boundry.`, `The flood_fill function won't fill diagonally.`, `The flood_fill function will be prototyped like this:`, `void  flood_fill(char **tab, t_point size, t_point begin);`, `The t_point structure is prototyped like this:`, `typedef struct  s_point { int           x; int           y; }               t_point;`],
    signature: `void  flood_fill(char **tab, t_point size, t_point begin);`,
    solution: `/*
** Write a function that takes a char ** as a 2-dimensional array of char, a
t_point as the dimensions of this array and a t_point as the starting point.

Starting from the given 'begin' t_point, this function fills an entire zone
by replacing characters inside with the character 'F'. A zone is an group of
the same character delimitated horizontally and vertically by other characters
or the array boundry.

The flood_fill function won't fill diagonally.

The flood_fill function will be prototyped like this:
  void  flood_fill(char **tab, t_point size, t_point begin);

The t_point structure is prototyped like this:
typedef struct  s_point
{
  int           x;
  int           y;
}               t_point;
*/

#include "t_point.h"

void fill(char **tab, t_point size, t_point current, char target)
{
  if (current.x < 0 || current.x >= size.x || current.y < 0 || current.y >= size.y || tab[current.y][current.x] != target)
    return;
  tab[current.y][current.x] = 'F';
  fill(tab, size, (t_point){current.x + 1, current.y}, target);
  fill(tab, size, (t_point){current.x - 1, current.y}, target);
  fill(tab, size, (t_point){current.x, current.y + 1}, target);
  fill(tab, size, (t_point){current.x, current.y - 1}, target);
}

void flood_fill(char **tab, t_point size, t_point begin)
{
  char target;

  if (begin.x < 0 || begin.x >= size.x || begin.y < 0 || begin.y >= size.y)
    return;
  target = tab[begin.y][begin.x];
  if (target == 'F')
    return;
  fill(tab, size, begin, target);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `flood_fill niveau 4 c récursion 2D`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "49",
    heading: `<span class="file">fprime.c</span>`, tag: `factorisation`, lang: "c",
    analogy: `🧱 Décomposer un nombre en facteurs premiers, du plus petit au plus grand.`,
    brief: [`Write a program that takes a positive int and displays its prime factors on the standard output, followed by a newline.`, `Factors must be displayed in ascending order and separated by '*', so that the expression in the output gives the right result.`, `If the number of parameters is not 1, simply display a newline.`, `The input, when there is one, will be valid.`, `<b>Fonctions autorisées :</b> <code>printf, atoi</code>`],
    signature: `programme : ./fprime`,
    solution: `/*
** Write a program that takes a positive int and displays its prime factors on the
standard output, followed by a newline.

Factors must be displayed in ascending order and separated by '*', so that
the expression in the output gives the right result.

If the number of parameters is not 1, simply display a newline.

The input, when there is one, will be valid.

** Allowed functions: printf, atoi
*/

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
  int i;
  int num;

  if (argc == 2)
  {
    i = 2;
    num = atoi(argv[1]);
    if (num == 1)
      printf("1");
    while (i <= num)
    {
      if (num % i == 0)
      {
        printf("%d", i);
        num /= i;
        if (num > 1)
          printf("*");
      }
      else
        i++;
    }
  }
  printf("\\n");
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `fprime niveau 4 c factorisation`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "50",
    heading: `<span class="file">ft_itoa.c</span>`, tag: `malloc + chiffres`, lang: "c",
    analogy: `🔤 L'inverse d'atoi : transformer un entier en chaîne allouée.`,
    brief: [`Write a function that takes an int and converts it to a null-terminated string.`, `The function returns the result in a char array that you must allocate.`, `<b>Fonctions autorisées :</b> <code>malloc</code>`],
    signature: `char	*ft_itoa(int nbr)`,
    solution: `/*
** Write a function that takes an int and converts it to a null-terminated string.
The function returns the result in a char array that you must allocate.

** Allowed functions: malloc
*/

#include <stdlib.h>

static size_t	num_len(long num)
{
	size_t	len;

	len = 0;
	if (num <= 0)
		len = 1;
	while (num != 0)
	{
		num /= 10;
		len++;
	}
	return (len);
}

char	*ft_itoa(int nbr)
{
	char	*str;
	long	num;
	size_t	len;

	num = (long)nbr;
	len = num_len(num);
	str = malloc(sizeof(char) * (len + 1));
	if (!str)
		return (NULL);
	if (num < 0)
	{
		str[0] = '-';
		num = -num;
	}
	if (num == 0)
		str[0] = '0';
	str[len] = '\\0';
	while (num > 0)
	{
		str[--len] = (num % 10) + '0';
		num /= 10;
	}
	return (str);
}

#include <stdio.h>

int main(void)
{
  int num = -2147483648;
  char *str = ft_itoa(num);
  if (str)
  {
    printf("%s\\n", str); // Output: -12345
    free(str);
  }
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_itoa niveau 4 c malloc + chiffres`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "51",
    heading: `<span class="file">ft_list_foreach.c</span>`, tag: `fonction pointeur`, lang: "c",
    analogy: `🚂 Appliquer une fonction à chaque wagon de la liste.`,
    brief: [`Write a function that takes a list and a function pointer, and applies this function to each element of the list.`, `The function must be declared as follows:`, `void ft_list_foreach(t_list *begin_list, void (*f)(void *));`, `(*f)(list_ptr-&gt;data) must be called for each element of the list.`, `<b>Fonctions autorisées :</b> <code>None</code>`],
    signature: `void ft_list_foreach(t_list *begin_list, void (*f)(void *))`,
    solution: `/*
** Write a function that takes a list and a function pointer, and applies this function to each element of the list.

** The function must be declared as follows:
** void ft_list_foreach(t_list *begin_list, void (*f)(void *));

** (*f)(list_ptr->data) must be called for each element of the list.

** Allowed functions: None
*/

#include "ft_list.h"

void ft_list_foreach(t_list *begin_list, void (*f)(void *))
{
  while (begin_list)
  {
    f(begin_list->data);
    begin_list = begin_list->next;
  }
}

#include <stdio.h>

void print_data(void *data)
{
  printf("%s\\n", (char *)data);
}

int main(void)
{
  t_list node3 = {NULL, "Node 3"};
  t_list node2 = {&node3, "Node 2"};
  t_list node1 = {&node2, "Node 1"};

  ft_list_foreach(&node1, print_data);
  return (0);
}

/* --- ft_list.h fourni ---
#ifndef FT_LIST_H
# define FT_LIST_H

typedef struct s_list
{
  struct s_list	*next;
  void			    *data;
}	              t_list;

#endif
*/
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_list_foreach niveau 4 c fonction pointeur`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "52",
    heading: `<span class="file">ft_list_remove_if.c</span>`, tag: `liste + free`, lang: "c",
    analogy: `✂️ Détacher et libérer les maillons dont la donnée correspond.`,
    brief: [`Write a function called ft_list_remove_if that removes from the passed list any element the data of which is "equal" to the reference data.`, `<b>Fonctions autorisées :</b> <code>free</code>`],
    signature: `void ft_list_remove_if(t_list **begin_list, void *data_ref, int (*cmp)(void *, void *))`,
    solution: `/*
** Write a function called ft_list_remove_if that removes from the passed list any element the data of which is "equal" to the reference data.

** Allowed functions: free
*/

#include "ft_list.h"
#include <stdlib.h>
#include <string.h>

#include "ft_list.h"
#include <stdlib.h>
#include <string.h>

void ft_list_remove_if(t_list **begin_list, void *data_ref, int (*cmp)(void *, void *))
{
  t_list *current;
  t_list *prev;
  t_list *to_delete;

  current = *begin_list;
  prev = NULL;
  while (current)
  {
    if (cmp(current->data, data_ref) == 0)
    {
      to_delete = current;
      if (prev)
        prev->next = current->next;
      else
        *begin_list = current->next;
      current = current->next;
      free(to_delete);
    }
    else
    {
      prev = current;
      current = current->next;
    }
  }
}

int cmp(void *data1, void *data2)
{
  return (strcmp((char *)data1, (char *)data2));
}

int main(void)
{
  // Example usage
  t_list *node1 = malloc(sizeof(t_list));
  t_list *node2 = malloc(sizeof(t_list));
  t_list *node3 = malloc(sizeof(t_list));
  t_list *tmp;
  t_list *begin_list;

  if (!node1 || !node2 || !node3)
    return (1);

  node1->data = "Node 1";
  node1->next = node2;
  node2->data = "Node 2";
  node2->next = node3;
  node3->data = "Node 3";
  node3->next = NULL;
  begin_list = node1;

  ft_list_remove_if(&begin_list, "Node 2", cmp);

  // Now the list should contain "Node 1" and "Node 3"
  while (begin_list)
  {
    tmp = begin_list;
    begin_list = begin_list->next;
    free(tmp);
  }
  return (0);
}

/* --- ft_list.h fourni ---
#ifndef FT_LIST_H
# define FT_LIST_H

typedef struct s_list
{
  struct s_list	*next;
  void			    *data;
}	              t_list;

#endif
*/
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_list_remove_if niveau 4 c liste + free`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "53",
    heading: `<span class="file">ft_split.c</span>`, tag: `malloc 2D`, lang: "c",
    analogy: `🪓 Découper une phrase en tableau de mots alloués.`,
    brief: [`Write a function that takes a string, splits it into words, and returns them as a NULL-terminated array of strings.`, `A "word" is defined as a part of a string delimited either by spaces/tabs/new lines, or by the start/end of the string.`, `<b>Fonctions autorisées :</b> <code>malloc</code>`],
    signature: `int is_delimiter(char c)`,
    solution: `/*
** Write a function that takes a string, splits it into words, and returns them as
a NULL-terminated array of strings.

A "word" is defined as a part of a string delimited either by spaces/tabs/new
lines, or by the start/end of the string.

** Allowed functions: malloc
*/

#include <stdlib.h>

int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\n');
}

int count_words(char *str)
{
  int count;
  int in_word;

  count = 0;
  in_word = 0;
  while (*str)
  {
    if (is_delimiter(*str))
      in_word = 0;
    else if (!in_word)
    {
      in_word = 1;
      count++;
    }
    str++;
  }
  return (count);
}

int word_len(char *str)
{
  int len;

  len = 0;
  while (str[len] && !is_delimiter(str[len]))
    len++;
  return (len);
}

char *new_word(char *str, int len)
{
  char *word;
  int i;

  word = malloc(sizeof(char) * (len + 1));
  if (!word)
    return (NULL);
  i = 0;
  while (i < len)
  {
    word[i] = str[i];
    i++;
  }
  word[i] = '\\0';
  return (word);
}

char **ft_split(char *str)
{
  char **result;
  int i;

  if (!str)
    return (NULL);
  result = malloc(sizeof(char *) * (count_words(str) + 1));
  if (!result)
    return (NULL);
  i = 0;
  while (*str)
  {
    while (*str && is_delimiter(*str))
      str++;
    if (*str)
    {
      result[i] = new_word(str, word_len(str));
      str += word_len(str);
      i++;
    }
  }
  result[i] = NULL;
  return (result);
}

#include <stdio.h>

int main(void)
{
  char **words;
  int i;

  words = ft_split("Hello, World! This is\\n a test.");
  if (words)
  {
    i = 0;
    while (words[i])
    {
      printf("%s\\n", words[i]);
      free(words[i]);
      i++;
    }
    free(words);
  }
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `ft_split niveau 4 c malloc 2D`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "54",
    heading: `<span class="file">rev_wstr.c</span>`, tag: `mots inversés`, lang: "c",
    analogy: `⏪ Afficher les mots dans l'ordre inverse, en gardant chaque mot intact.`,
    brief: [`Write a program that takes a string as a parameter, and prints its words in reverse order.`, `A "word" is a part of the string bounded by spaces and/or tabs, or the begin/end of the string.`, `If the number of parameters is different from 1, the program will display '\\n'.`, `In the parameters that are going to be tested, there won't be any "additional" spaces (meaning that there won't be additionnal spaces at the beginning or at the end of the string, and words will always be separated by exactly one space).`, `<b>Fonctions autorisées :</b> <code>write, malloc, free</code>`],
    signature: `int is_delimiter(char c)`,
    solution: `/*
** Write a program that takes a string as a parameter, and prints its words in
reverse order.

A "word" is a part of the string bounded by spaces and/or tabs, or the
begin/end of the string.

If the number of parameters is different from 1, the program will display
'\\n'.

In the parameters that are going to be tested, there won't be any "additional"
spaces (meaning that there won't be additionnal spaces at the beginning or at
the end of the string, and words will always be separated by exactly one space).

** Allowed functions: write, malloc, free
*/

#include <unistd.h>
#include <stdlib.h>

int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\0');
}

int count_words(char *str)
{
  int count;
  int in_word;

  count = 0;
  in_word = 0;
  while (*str)
  {
    if (is_delimiter(*str))
      in_word = 0;
    else if (!in_word && !is_delimiter(*str))
    {
      in_word = 1;
      count++;
    }
    str++;
  }
  return (count);
}

int word_len(char *str)
{
  int len;

  len = 0;
  while (str[len] && !is_delimiter(str[len]))
    len++;
  return (len);
}

char *new_word(char *str, int len)
{
  char *word;
  int i;

  word = malloc(sizeof(char) * (len + 1));
  if (!word)
    return (NULL);
  i = 0;
  while (i < len)
  {
    word[i] = str[i];
    i++;
  }
  word[i] = '\\0';
  return (word);
}

int main(int argc, char **argv)
{
  char **words;
  int word_count;
  int i;

  if (argc == 2)
  {
    word_count = count_words(argv[1]);
    words = malloc(sizeof(char *) * (word_count + 1));
    if (!words)
      return (1);
    i = 0;
    while (i < word_count)
    {
      while (is_delimiter(*argv[1]))
        argv[1]++;
      words[i] = new_word(argv[1], word_len(argv[1]));
      if (!words[i])
        return (1);
      argv[1] += word_len(argv[1]);
      i++;
    }
    words[i] = NULL;
    while (i--)
    {
      write(1, words[i], word_len(words[i]));
      if (i > 0)
        write(1, " ", 1);
      free(words[i]);
    }
    free(words);
  }
  write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rev_wstr niveau 4 c mots inversés`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "55",
    heading: `<span class="file">rostring.c</span>`, tag: `rotation mots`, lang: "c",
    analogy: `🎡 Le premier mot part à la fin, les autres avancent d'un cran.`,
    brief: [`Write a program that takes a string and displays this string after rotating it one word to the left.`, `Thus, the first word becomes the last, and others stay in the same order.`, `A "word" is defined as a part of a string delimited either by spaces/tabs, or by the start/end of the string.`, `Words will be separated by only one space in the output.`, `If there's less than one argument, the program displays \\n.`, `<b>Fonctions autorisées :</b> <code>write, malloc, free</code>`],
    signature: `int is_delimiter(char c)`,
    solution: `/*
** Write a program that takes a string and displays this string after rotating it
one word to the left.

Thus, the first word becomes the last, and others stay in the same order.

A "word" is defined as a part of a string delimited either by spaces/tabs, or
by the start/end of the string.

Words will be separated by only one space in the output.

If there's less than one argument, the program displays \\n.

** Allowed functions: write, malloc, free
*/

#include <unistd.h>
#include <stdlib.h>

int is_delimiter(char c)
{
  return (c == ' ' || c == '\\t' || c == '\\0');
}

int count_words(char *str)
{
  int count;
  int in_word;

  count = 0;
  in_word = 0;
  while (*str)
  {
    if (is_delimiter(*str))
      in_word = 0;
    else if (!in_word && !is_delimiter(*str))
    {
      in_word = 1;
      count++;
    }
    str++;
  }
  return (count);
}

int word_len(char *str)
{
  int len;

  len = 0;
  while (str[len] && !is_delimiter(str[len]))
    len++;
  return (len);
}

char *new_word(char *str, int len)
{
  char *word;
  int i;

  word = malloc(sizeof(char) * (len + 1));
  if (!word)
    return (NULL);
  i = 0;
  while (i < len)
  {
    word[i] = str[i];
    i++;
  }
  word[i] = '\\0';
  return (word);
}

int main(int argc, char **argv)
{
  int i;
  int j;
  int word_count;
  char **words;

  if (argc == 2)
  {
    word_count = count_words(argv[1]);
    if (word_count > 0)
    {
      words = malloc(sizeof(char *) * word_count);
      if (!words)
        return (1);
      i = 0;
      j = 0;
      while (i < word_count)
      {
        while (is_delimiter(argv[1][j]))
          j++;
        words[i] = new_word(&argv[1][j], word_len(&argv[1][j]));
        if (!words[i])
          return (1);
        j += word_len(&argv[1][j]);
        i++;
      }
      for (i = 1; i < word_count; i++)
      {
        write(1, words[i], word_len(words[i]));
        write(1, " ", 1);
      }
      write(1, words[0], word_len(words[0]));
      write(1, "\\n", 1);
      for (i = 0; i < word_count; i++)
        free(words[i]);
      free(words);
    }
    else
      write(1, "\\n", 1);
  }
  else
    write(1, "\\n", 1);
  return (0);
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `rostring niveau 4 c rotation mots`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "56",
    heading: `<span class="file">sort_int_tab.c</span>`, tag: `tri en place`, lang: "c",
    analogy: `🫧 Trier un tableau d'entiers sur place (tri à bulles ou sélection).`,
    brief: [`It must sort (in-place) the 'tab' int array, that contains exactly 'size' members, in ascending order.`, `Doubles must be preserved.`, `Input is always coherent.`],
    signature: `void sort_int_tab(int *tab, unsigned int size)`,
    solution: `/*
** It must sort (in-place) the 'tab' int array, that contains exactly 'size'
members, in ascending order.

Doubles must be preserved.

Input is always coherent.
*/

void sort_int_tab(int *tab, unsigned int size)
{
  unsigned int i;
  unsigned int j;
  int temp;

  i = 0;
  while (i < size)
  {
    j = i + 1;
    while (j < size)
    {
      if (tab[i] > tab[j])
      {
        temp = tab[i];
        tab[i] = tab[j];
        tab[j] = temp;
      }
      j++;
    }
    i++;
  }
}
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `sort_int_tab niveau 4 c tri en place`,
  },
  {
    view: "official", tab: 0, level: 4, section: `Niveau 4`, num: "57",
    heading: `<span class="file">sort_list.c</span>`, tag: `tri liste`, lang: "c",
    analogy: `🚂 Trier un train en échangeant les cargaisons des wagons voisins.`,
    brief: [`This function must sort the list given as a parameter, using the function pointer cmp to select the order to apply, and returns a pointer to the first element of the sorted list.`, `Duplications must remain.`, `Inputs will always be consistent.`, `You must use the type t_list described in the file list.h that is provided to you. You must include that file (#include "list.h"), but you must not turn it in. We will use our own to compile your assignment.`, `Functions passed as cmp will always return a value different from 0 if a and b are in the right order, 0 otherwise.`, `For example, the following function used as cmp will sort the list in ascending order:`, `int ascending(int a, int b) { return (a &lt;= b); }`],
    signature: `int ascending(int a, int b)`,
    solution: `/*
** This function must sort the list given as a parameter, using the function
pointer cmp to select the order to apply, and returns a pointer to the
first element of the sorted list.

Duplications must remain.

Inputs will always be consistent.

You must use the type t_list described in the file list.h
that is provided to you. You must include that file
(#include "list.h"), but you must not turn it in. We will use our own
to compile your assignment.

Functions passed as cmp will always return a value different from
0 if a and b are in the right order, 0 otherwise.

For example, the following function used as cmp will sort the list
in ascending order:

int ascending(int a, int b)
{
	return (a <= b);
}
*/

#include <stddef.h>
#include "ft_list.h"

t_list *sort_list(t_list *lst, int (*cmp)(int, int))
{
  t_list *current;
  void *temp;

  if (!lst)
    return (NULL);
  current = lst;
  while (current && current->next)
  {
    if (!cmp((long)current->data, (long)current->next->data))
    {
      temp = current->data;
      current->data = current->next->data;
      current->next->data = temp;
      current = lst;
    }
    else
      current = current->next;
  }
  return (lst);
}

#include <stdio.h>
#include <stdlib.h>

int cmp(int a, int b)
{
  return (a - b);
}

int main(void)
{
  t_list *list = NULL;
  t_list *node1 = malloc(sizeof(t_list));
  t_list *node2 = malloc(sizeof(t_list));
  t_list *node3 = malloc(sizeof(t_list));
  node1->data = (void *)3;
  node1->next = node2;
  node2->data = (void *)2;
  node2->next = node3;
  node3->data = (void *)1;
  node3->next = NULL;
  list = node1;
  sort_list(list, cmp);
  while (list)
  {
    printf("%d\\n", (int)(long)list->data);
    list = list->next;
  }
  return (0);
}

/* --- ft_list.h fourni ---
#ifndef FT_LIST_H
# define FT_LIST_H

typedef struct s_list
{
  struct s_list	*next;
  void			    *data;
}	              t_list;

#endif
*/
`,
    note: `<b>Sujet officiel</b> repris de l'exam (en anglais, comme le jour J). La solution complète inclut l'énoncé en commentaire et un <code>main</code> de test prêt à compiler.`,
    search: `sort_list niveau 4 c tri liste`,
  },
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

export const exId = (ex: Exercise): string =>
  ex.view === "official" ? `official-${ex.tab ?? 2}-${ex.num}` : `${ex.view}-${ex.num}`;
