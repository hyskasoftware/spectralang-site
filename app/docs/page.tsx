import type { Metadata } from "next";
import { buildDocsTree } from "@/lib/docs-tree";
import { site } from "@/lib/site";
import Link from "next/link";

const tree = buildDocsTree();

export const metadata: Metadata = {
  title: "SpectraLang Docs — Language Reference, CLI, Installation, Usage",
  description:
    "Complete SpectraLang documentation: language reference, CLI reference, installation and usage.",
  openGraph: {
    title: "SpectraLang Docs",
    description:
      "Complete SpectraLang documentation: language reference, CLI reference, installation and usage.",
  },
};

export default function DocsPage() {
  return (
    <div>
      <p className="text-[11px] tracking-[0.35em] text-muted">
        {"// DOCUMENTATION — FROM THE REPOSITORY, BUILT LOCALLY"}
      </p>
      <h1 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
        THE<span className="text-purple-bright glow-purple">_REFERENCE</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Synced from the {site.repo} repository — rendered locally, no network needed.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        <section>
          <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-purple-dim">
            {"// LANGUAGE REFERENCE — 6 CHAPTERS"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tree.chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/docs/${chapter.slug}`}
                className="ascii-box group flex flex-col gap-2 bg-bg-soft p-5 transition-transform hover:-translate-y-1"
              >
                <span className="text-[11px] tracking-widest text-muted">
                  [ {chapter.label.toUpperCase()} ] — {chapter.topics.length} TOPICS
                </span>
                <span className="text-sm font-black tracking-widest text-purple-bright group-hover:glow-purple-soft">
                  {chapter.title}
                </span>
                <span className="text-[11px] text-muted">{chapter.description}</span>
                <span className="mt-2 text-[11px] tracking-widest text-purple-dim group-hover:text-purple-bright">
                  &gt; OPEN {chapter.topics.length} TOPICS
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-purple-dim">
            {"// TOOLING"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/docs/usage"
              className="ascii-box group flex flex-col gap-2 border-purple-bright bg-purple p-5 transition-transform hover:-translate-y-1"
            >
              <span className="text-[11px] tracking-widest text-bg/70">[ USAGE ]</span>
              <span className="text-sm font-black tracking-widest text-bg">QUICK START</span>
              <span className="text-[11px] text-bg/80">your first module in minutes.</span>
              <span className="mt-2 text-[11px] tracking-widest text-bg/70">&gt; START</span>
            </Link>
            <Link
              href="/docs/install"
              className="ascii-box group flex flex-col gap-2 border-purple-bright bg-purple p-5 transition-transform hover:-translate-y-1"
            >
              <span className="text-[11px] tracking-widest text-bg/70">[ INSTALL ]</span>
              <span className="text-sm font-black tracking-widest text-bg">INSTALLATION</span>
              <span className="text-[11px] text-bg/80">releases + build from source.</span>
              <span className="mt-2 text-[11px] tracking-widest text-bg/70">&gt; GET IT</span>
            </Link>
            <Link
              href="/docs/cli"
              className="ascii-box group flex flex-col gap-2 bg-bg-soft p-5 transition-transform hover:-translate-y-1"
            >
              <span className="text-[11px] tracking-widest text-muted">[ CLI ]</span>
              <span className="text-sm font-black tracking-widest text-purple-bright group-hover:glow-purple-soft">
                CLI REFERENCE
              </span>
              <span className="text-[11px] text-muted">commands, flags, exit codes.</span>
              <span className="mt-2 text-[11px] tracking-widest text-purple-dim group-hover:text-purple-bright">
                &gt; READ
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
