/* Correcteur "grademe" : exécute le code de l'utilisateur avec Pyodide (Python dans le navigateur) */
import { GRADEME } from "./grademe-data";

export interface GradeFail { d: string; got: string; exp: string }
export interface GradeResult { ok: boolean; err?: string; fails?: GradeFail[] }

declare global {
  interface Window { loadPyodide?: (o: { indexURL: string }) => Promise<unknown> }
}

const CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/";
let pyodide: unknown | null = null;
let loading: Promise<unknown> | null = null;

function ensurePyodide(): Promise<unknown> {
  if (pyodide) return Promise.resolve(pyodide);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const sc = document.createElement("script");
    sc.src = `${CDN}pyodide.js`;
    sc.onload = () => {
      window.loadPyodide!({ indexURL: CDN })
        .then((p) => { pyodide = p; resolve(p); })
        .catch(reject);
    };
    sc.onerror = () => reject(new Error("Impossible de charger Pyodide (connexion ?)"));
    document.head.appendChild(sc);
  });
  return loading;
}

const GRADE_PY = `
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
`;

export async function grade(exid: string, userCode: string): Promise<GradeResult> {
  const spec = GRADEME[exid];
  if (!spec) return { ok: false, err: "Pas de tests pour cet exercice." };
  const py = (await ensurePyodide()) as { globals: { set: (k: string, v: string) => void }; runPython: (s: string) => string };
  py.globals.set("__user_code", userCode);
  py.globals.set("__fn_name", spec.fn);
  py.globals.set("__tests_json", JSON.stringify(spec.tests));
  return JSON.parse(py.runPython(GRADE_PY)) as GradeResult;
}
