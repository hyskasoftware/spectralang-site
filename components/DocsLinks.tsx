import { docLinks } from "@/lib/site";
import Link from "next/link";

export function DocsLinks() {
  return (
    <section id="docs" className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-[11px] tracking-[0.35em] text-muted">{"// SECTION 04 — KNOWLEDGE"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
          READ_THE<span className="text-purple-bright glow-purple">_DOCS</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/docs"
            className="ascii-box group flex flex-col gap-2 border-purple-bright bg-purple p-5 transition-transform hover:-translate-y-1 sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[11px] tracking-widest text-bg/70">[ FULL DOCS ]</span>
              <span className="text-sm font-black tracking-widest text-bg">
                THE COMPLETE REFERENCE
              </span>
              <span className="text-[11px] text-bg/80">
                language reference · CLI reference · installation · usage — one URL per topic,
                built from the repository locally
              </span>
            </div>
            <span className="mt-2 text-[11px] tracking-widest text-bg/70 group-hover:text-bg lg:mt-0">
              &gt; OPEN /DOCS
            </span>
          </Link>
          {docLinks.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="ascii-box group flex flex-col gap-2 bg-bg-soft p-5 transition-transform hover:-translate-y-1"
            >
              <span className="text-[11px] tracking-widest text-muted">[ DOC ]</span>
              <span className="text-sm font-black tracking-widest text-purple-bright group-hover:glow-purple-soft">
                {d.title}
              </span>
              <span className="text-[11px] text-muted">{d.note}</span>
              <span className="mt-2 text-[11px] tracking-widest text-purple-dim group-hover:text-purple-bright">
                &gt; OPEN_DOCS
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
