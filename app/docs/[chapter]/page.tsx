import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildDocsTree, flattenPages } from "@/lib/docs-tree";
import Link from "next/link";

const tree = buildDocsTree();

export const dynamicParams = false;

export function generateStaticParams() {
  return tree.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  const ch = tree.chapters.find((c) => c.slug === chapter);
  if (!ch) return {};
  return {
    title: `${ch.label} — ${ch.title} | SpectraLang Docs`,
    description: ch.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const ch = tree.chapters.find((c) => c.slug === chapter);
  if (!ch) notFound();
  const pages = flattenPages(tree);
  const idx = pages.findIndex((p) => p.href === `/docs/${ch.slug}`);
  const prev = idx > 0 ? pages[idx - 1] : undefined;
  const next = idx < pages.length - 1 ? pages[idx + 1] : undefined;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="text-[10px] tracking-widest text-muted">
        <Link href="/docs" className="text-purple-bright hover:text-text">
          DOCS
        </Link>{" "}
        / <span className="text-text">{ch.label.toUpperCase()}</span>
      </nav>

      <h1 className="mt-4 text-2xl font-black tracking-tight text-text md:text-3xl">
        {ch.label.toUpperCase()}
        <span className="text-purple-bright glow-purple">_{ch.title.toUpperCase().replaceAll(" ", "_")}</span>
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{ch.description}</p>
      <p className="mt-2 text-[10px] tracking-widest text-muted">
        SOURCE: <span className="text-purple-bright">{ch.sourcePath}</span> — {ch.topics.length}{" "}
        topics
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {ch.topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/docs/${ch.slug}/${topic.slug}`}
            className="ascii-box group flex flex-col gap-1.5 bg-bg-soft p-4 transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-bold text-purple-dim">
                {topic.number ? `§ ${topic.number}` : "§"}
              </span>
              <span className="text-sm font-black tracking-widest text-text group-hover:text-purple-bright">
                {topic.title.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] tracking-widest text-muted">
              <span>
                {topic.subsections.length > 0
                  ? `${topic.subsections.length} SECTIONS`
                  : "TOPIC"}
              </span>
              <span className="text-purple-bright">&gt;</span>
            </div>
          </Link>
        ))}
      </div>

      {(prev || next) && (
        <div className="mt-10 grid grid-cols-2 gap-4 border-t-2 border-border-strong pt-6">
          {prev ? (
            <Link href={prev.href} className="ascii-box bg-bg p-4 transition-transform hover:-translate-y-0.5">
              <p className="text-[9px] tracking-widest text-muted">{"< PREV"}</p>
              <p className="mt-1 text-xs font-bold tracking-widest text-purple-bright">{prev.label}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="ascii-box bg-bg p-4 text-right transition-transform hover:-translate-y-0.5">
              <p className="text-[9px] tracking-widest text-muted">NEXT &gt;</p>
              <p className="mt-1 text-xs font-bold tracking-widest text-purple-bright">{next.label}</p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
