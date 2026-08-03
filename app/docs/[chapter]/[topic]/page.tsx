import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildDocsTree, flattenPages, sliceTopic, topicHeadingIds } from "@/lib/docs-tree";
import { Markdown } from "@/components/docs/Markdown";
import { OnThisPage } from "@/components/docs/OnThisPage";
import Link from "next/link";

const tree = buildDocsTree();

export const dynamicParams = false;

export function generateStaticParams() {
  return tree.chapters.flatMap((c) =>
    c.topics.map((t) => ({ chapter: c.slug, topic: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string; topic: string }>;
}): Promise<Metadata> {
  const { chapter, topic } = await params;
  const ch = tree.chapters.find((c) => c.slug === chapter);
  const tp = ch?.topics.find((t) => t.slug === topic);
  if (!ch || !tp) return {};
  return {
    title: `${tp.title} — ${ch.label} | SpectraLang Docs`,
    description: `${tp.title} — section of the ${ch.title} reference.`,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ chapter: string; topic: string }>;
}) {
  const { chapter, topic } = await params;
  const ch = tree.chapters.find((c) => c.slug === chapter);
  const tp = ch?.topics.find((t) => t.slug === topic);
  if (!ch || !tp) notFound();

  const source = sliceTopic(ch, tp);
  const headingIds = topicHeadingIds(ch, tp);
  const pages = flattenPages(tree);
  const idx = pages.findIndex((p) => p.href === `/docs/${ch.slug}/${tp.slug}`);
  const prev = idx > 0 ? pages[idx - 1] : undefined;
  const next = idx < pages.length - 1 ? pages[idx + 1] : undefined;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="text-[11px] tracking-widest text-muted">
        <Link href="/docs" className="text-purple-bright hover:text-text">
          DOCS
        </Link>{" "}
        /{" "}
        <Link href={`/docs/${ch.slug}`} className="text-purple-bright hover:text-text">
          {ch.label.toUpperCase()}
        </Link>{" "}
        / <span className="text-text">{tp.title.toUpperCase()}</span>
      </nav>

      <h1 className="mt-4 break-words text-2xl font-black tracking-tight text-text md:text-3xl">
        {tp.title}
        <span className="text-purple-bright glow-purple">_</span>
      </h1>
      <p className="mt-2 text-[11px] tracking-widest text-muted">
        SOURCE: <span className="text-purple-bright">{ch.sourcePath}</span> — {ch.label} /{" "}
        {tp.titleFull}
      </p>

      <div className="mt-8 flex items-start gap-8">
        <div className="min-w-0 flex-1">
          <div className="ascii-box bg-bg p-4 sm:p-6">
            <Markdown source={source} headingIds={headingIds} />
          </div>

          {(prev || next) && (
            <div className="mt-10 grid grid-cols-1 gap-4 border-t-2 border-border-strong pt-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={prev.href}
                  className="ascii-box min-w-0 bg-bg p-4 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-[10px] tracking-widest text-muted">{"< PREV"}</p>
                  <p className="mt-1 break-words text-xs font-bold tracking-widest text-purple-bright">
                    {prev.label}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="ascii-box min-w-0 bg-bg p-4 text-right transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-[10px] tracking-widest text-muted">NEXT &gt;</p>
                  <p className="mt-1 break-words text-xs font-bold tracking-widest text-purple-bright">
                    {next.label}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>

        <OnThisPage items={tp.subsections} />
      </div>
    </div>
  );
}
