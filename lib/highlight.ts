/* Coloration syntaxique Python (légère, sans dépendance) */
const KW = ["def","class","if","elif","else","return","for","while","in","not","or","and","None","True","False","from","import","lambda"];
const FN = ["sorted","set","len","max","min","sum","zip","range","ord","chr","append","pop","items","isalpha","isupper","Counter","intersection","get","any","join","print","list","tuple","dict","float","bool","str","int"];
const S0 = "\uE000", S1 = "\uE001", K0 = "\uE100", K1 = "\uE101", F0 = "\uE200", F1 = "\uE201";

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  s = s.split(K0).join('<span class="k">').split(K1).join("</span>");
  s = s.split(F0).join('<span class="f">').split(F1).join("</span>");
  if (comment) s += `<span class="c">${esc(comment)}</span>`;
  return s;
}

export const highlight = (code: string): string =>
  code.split("\n").map(highlightLine).join("\n");
