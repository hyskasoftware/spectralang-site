import { features } from "@/lib/site";

export function Features() {
  return (
    <section id="features" className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-[11px] tracking-[0.35em] text-muted">{"// SECTION 01 — WORKSTREAMS"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
          TWO FIRST-CLASS<span className="text-purple-bright glow-purple">_TRACKS</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          One language, two production workstreams that are first-class in the language and the
          standard library.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((f, i) => (
            <article key={f.id} className="ascii-box flex flex-col bg-bg-soft">
              <header className="flex items-center justify-between border-b-2 border-border-strong bg-surface-2 px-5 py-3">
                <h3 className="text-sm font-black tracking-widest text-purple-bright">
                  [{String(i + 1).padStart(2, "0")}] {f.title}
                </h3>
                <span className="border border-border bg-bg px-2 py-1 text-[11px] text-muted">
                  {f.code}
                </span>
              </header>
              <ul className="flex flex-1 flex-col gap-3 p-5">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-3 text-xs leading-relaxed text-text md:text-sm">
                    <span aria-hidden="true" className="shrink-0 text-purple-bright">
                      &gt;
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
