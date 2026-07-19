"use client";
/* Espace cours : 2 cours (Python / C), navigation par chapitres (tabs), sommaire,
 * recherche, progression de lecture et chapitres consultés (localStorage). */
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CourseChapterView from "@/components/CourseChapter";
import { COURSES, readingMinutes, sectionText, type Course } from "@/lib/courses";

const POS_KEY = "et-learn-pos";
const SEEN_KEY = "et-learn-seen";

export default function Learn() {
  const [courseId, setCourseId] = useState<Course["id"]>("python");
  const [chapIndex, setChapIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [seen, setSeen] = useState<string[]>([]);
  const [readPct, setReadPct] = useState(0);
  const [activeSec, setActiveSec] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const chapter = course.chapters[chapIndex] ?? course.chapters[0];
  const anchorPrefix = `${course.id}-${chapter.id}`;
  const chapKey = (c: string, ch: string) => `${c}:${ch}`;

  /* restaure la dernière position + chapitres consultés */
  useEffect(() => {
    try {
      const pos = JSON.parse(localStorage.getItem(POS_KEY) ?? "null") as { c: Course["id"]; i: number } | null;
      if (pos && COURSES.some((c) => c.id === pos.c)) {
        setCourseId(pos.c);
        const max = (COURSES.find((c) => c.id === pos.c) ?? COURSES[0]).chapters.length - 1;
        setChapIndex(Math.min(Math.max(pos.i, 0), max));
      }
      setSeen(JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]") as string[]);
    } catch { /* stockage indisponible : on démarre au début */ }
    setHydrated(true);
  }, []);

  /* mémorise position + marque le chapitre comme consulté */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ c: course.id, i: chapIndex }));
      const k = chapKey(course.id, chapter.id);
      setSeen((s) => {
        if (s.includes(k)) return s;
        const nx = [...s, k];
        localStorage.setItem(SEEN_KEY, JSON.stringify(nx));
        return nx;
      });
    } catch { /* ignore */ }
  }, [hydrated, course.id, chapIndex, chapter.id]);

  /* progression de lecture (scroll de la page) */
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setReadPct(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapIndex, courseId]);

  /* scrollspy : surligne la section visible dans le sommaire */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length > 0) setActiveSec(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapIndex, courseId, search]);

  const goChapter = useCallback((i: number) => {
    setChapIndex(i);
    setSearch("");
    window.scrollTo({ top: 0 });
  }, []);

  const switchCourse = (id: Course["id"]) => {
    if (id === courseId) return;
    setCourseId(id);
    setChapIndex(0);
    setSearch("");
    window.scrollTo({ top: 0 });
  };

  /* recherche dans tout le cours actif */
  const q = search.toLowerCase().trim();
  const results = useMemo(() => {
    if (!q) return null;
    return course.chapters.flatMap((ch, i) =>
      ch.sections
        .filter((s) => sectionText(s).includes(q))
        .map((s) => ({ chIndex: i, chLabel: ch.label, icon: ch.icon, sec: s })),
    );
  }, [q, course]);

  const jumpTo = (chIndex: number, secId: string) => {
    goChapter(chIndex);
    const target = `${course.id}-${course.chapters[chIndex].id}-${secId}`;
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: "start" }));
  };

  const seenCount = course.chapters.filter((ch) => seen.includes(chapKey(course.id, ch.id))).length;

  return (
    <div className="shell view-learn">
      {/* barre de progression de lecture */}
      <div className="lrn-readbar" role="presentation"><i style={{ width: `${readPct}%` }} /></div>

      <div className="toolbar">
        <div className="toolbar-inner">
          <Link href="/" className="brand"><span className="glyph">◆</span><span className="long">Exams · 42</span></Link>
          <div className="seg" role="tablist" aria-label="Choix du cours">
            {COURSES.map((c) => (
              <button
                key={c.id} type="button" role="tab" aria-selected={c.id === courseId}
                className={c.id === courseId ? "active" : ""}
                onClick={() => switchCourse(c.id)}
              >{c.icon} {c.label}</button>
            ))}
          </div>
          <input
            className="search" type="search" placeholder="Rechercher dans le cours…"
            aria-label="Rechercher dans le cours"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
          <Link href="/train" className="tbtn quiz-toggle">🎯 Entraînement</Link>
        </div>
      </div>

      <main className="wrap">
        <header className="hero">
          <div className="kicker">{course.kicker}</div>
          <h1>{course.title}</h1>
          <p className="sub" dangerouslySetInnerHTML={{ __html: course.sub }} />
          <div className="lrn-tags">
            {course.tags.map((t) => <span key={t} className="lrn-tag">{t}</span>)}
          </div>
        </header>

        <div className="rank-tabs lrn-tabs" role="tablist" aria-label="Chapitres du cours">
          {course.chapters.map((ch, i) => (
            <button
              key={ch.id} type="button" role="tab" aria-selected={i === chapIndex}
              className={i === chapIndex ? "active" : ""}
              onClick={() => goChapter(i)}
            >
              {ch.icon} {ch.label}
              {seen.includes(chapKey(course.id, ch.id)) && i !== chapIndex && <span className="lrn-check" aria-label="chapitre consulté"> ✓</span>}
            </button>
          ))}
        </div>

        {results ? (
          <div className="lrn-results" aria-live="polite">
            <p className="lrn-results-count">
              {results.length === 0
                ? <>Aucune section ne contient « <b>{search}</b> ».</>
                : <>{results.length} section{results.length > 1 ? "s" : ""} pour « <b>{search}</b> » :</>}
            </p>
            {results.map((r) => (
              <button key={`${r.chIndex}-${r.sec.id}`} type="button" className="lrn-result" onClick={() => jumpTo(r.chIndex, r.sec.id)}>
                <span className="lrn-result-ch">{r.icon} {r.chLabel}</span>
                <span className="lrn-result-sec">{r.sec.title}</span>
                <span className="lrn-result-go" aria-hidden>→</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="lrn-layout">
            <aside className="lrn-aside" aria-label="Sommaire du chapitre">
              <div className="lrn-aside-title">Sommaire</div>
              <nav>
                {chapter.sections.map((s, i) => {
                  const id = `${anchorPrefix}-${s.id}`;
                  return (
                    <a key={s.id} href={`#${id}`} className={activeSec === id ? "active" : ""}>
                      <span className="lrn-aside-num">{String(i + 1).padStart(2, "0")}</span> {s.title}
                    </a>
                  );
                })}
              </nav>
              <div className="lrn-aside-foot">{seenCount}/{course.chapters.length} chapitres consultés</div>
            </aside>

            <div className="lrn-content">
              <div className="lrn-chap-head">
                <h2>{chapter.icon} {chapter.title}</h2>
                <div className="lrn-meta">
                  <span>⏱ ~{readingMinutes(chapter)} min</span>
                  <span>· {chapter.sections.length} section{chapter.sections.length > 1 ? "s" : ""}</span>
                  <span>· chapitre {chapIndex + 1}/{course.chapters.length}</span>
                </div>
                <p className="lrn-intro" dangerouslySetInnerHTML={{ __html: chapter.intro }} />
                {chapter.related && (
                  <Link href={chapter.related.href} className="lrn-related">🎯 {chapter.related.label} →</Link>
                )}
              </div>

              <CourseChapterView chapter={chapter} anchorPrefix={anchorPrefix} />

              <nav className="lrn-pager" aria-label="Navigation entre chapitres">
                {chapIndex > 0 ? (
                  <button type="button" className="lrn-page-btn" onClick={() => goChapter(chapIndex - 1)}>
                    <span className="lrn-page-dir">← Précédent</span>
                    <span className="lrn-page-name">{course.chapters[chapIndex - 1].icon} {course.chapters[chapIndex - 1].label}</span>
                  </button>
                ) : <span />}
                {chapIndex < course.chapters.length - 1 ? (
                  <button type="button" className="lrn-page-btn next" onClick={() => goChapter(chapIndex + 1)}>
                    <span className="lrn-page-dir">Suivant →</span>
                    <span className="lrn-page-name">{course.chapters[chapIndex + 1].icon} {course.chapters[chapIndex + 1].label}</span>
                  </button>
                ) : (
                  <Link href="/train" className="lrn-page-btn next">
                    <span className="lrn-page-dir">Fin du cours 🎉</span>
                    <span className="lrn-page-name">Passer à l&apos;entraînement →</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
