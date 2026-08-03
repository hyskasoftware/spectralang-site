"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocChapter, DocTopic } from "@/lib/docs-tree";

function ChapterBlock({
  chapter,
  active,
  open,
  onToggle,
}: {
  chapter: DocChapter;
  active: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-between border-2 px-3 py-2 text-left text-[11px] font-bold tracking-widest transition-colors ${
          active === chapter.slug
            ? "border-purple-bright bg-purple text-bg"
            : "border-border-strong bg-bg text-muted hover:border-purple-bright hover:text-purple-bright"
        }`}
      >
        <span>{chapter.label}</span>
        <span aria-hidden="true" className="text-[10px]">
          {open ? "[-]" : "[+]"}
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 border-2 border-t-0 border-border-strong bg-surface p-2">
          <Link
            href={`/docs/${chapter.slug}`}
            className={`px-2 py-1.5 text-[11px] font-bold tracking-widest ${
              active === chapter.slug
                ? "text-purple-bright"
                : "text-muted hover:text-purple-bright"
            }`}
          >
            &gt; INDEX
          </Link>
          {chapter.topics.map((topic) => (
            <TopicLink key={topic.slug} chapter={chapter} topic={topic} active={active} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicLink({
  chapter,
  topic,
  active,
}: {
  chapter: DocChapter;
  topic: DocTopic;
  active: string;
}) {
  return (
    <Link
      href={`/docs/${chapter.slug}/${topic.slug}`}
      aria-current={active === `${chapter.slug}/${topic.slug}` ? "true" : undefined}
      className={`min-h-[30px] px-2 py-1.5 text-[11px] tracking-wider transition-colors ${
        active === `${chapter.slug}/${topic.slug}`
          ? "bg-purple text-bg font-bold"
          : "text-muted hover:text-purple-bright"
      }`}
    >
      {topic.number ? `${topic.number} ` : ""}
      {topic.title}
    </Link>
  );
}

function ToolingBlock({ active }: { active: string }) {
  const items = [
    { slug: "usage", label: "USAGE — QUICK START" },
    { slug: "install", label: "INSTALLATION" },
    { slug: "cli", label: "CLI REFERENCE" },
  ] as const;
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/docs/${item.slug}`}
          aria-current={active === item.slug ? "true" : undefined}
          className={`border-2 px-3 py-2 text-[11px] font-bold tracking-widest transition-colors ${
            active === item.slug
              ? "border-purple-bright bg-purple text-bg"
              : "border-border-strong bg-bg text-muted hover:border-purple-bright hover:text-purple-bright"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function DocsSidebar({ chapters }: { chapters: DocChapter[] }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const chapterSlug = segments[1] ?? "";
  const active = segments[2] ? `${chapterSlug}/${segments[2]}` : chapterSlug;

  // explicit open state per chapter; undefined = auto (active chapter opens)
  const [openState, setOpenState] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOpen = (slug: string) => openState[slug] ?? slug === chapterSlug;

  const toggle = (slug: string) => {
    setOpenState((prev) => ({ ...prev, [slug]: !isOpen(slug) }));
  };

  const tree = (
    <nav aria-label="Documentation" className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-purple-dim">TOOLING</p>
        <ToolingBlock active={active} />
      </div>
      <div>
        <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-purple-dim">
          LANGUAGE REFERENCE
        </p>
        <div className="flex flex-col gap-1.5">
          {chapters.map((chapter) => (
            <ChapterBlock
              key={chapter.slug}
              chapter={chapter}
              active={active}
              open={isOpen(chapter.slug)}
              onToggle={() => toggle(chapter.slug)}
            />
          ))}
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <p className="text-[10px] font-bold tracking-[0.3em] text-purple-bright">
          {"// DOCS NAVIGATION"}
        </p>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle docs navigation"
          aria-expanded={mobileOpen}
          className="min-h-[36px] min-w-[36px] border-2 border-border-strong bg-surface px-3 py-1.5 text-[10px] font-bold tracking-widest text-purple-bright"
        >
          [NAV]
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 p-4 pt-6 md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.3em] text-purple-bright">
              {"// DOCS INDEX"}
            </p>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close docs navigation"
              className="min-h-[36px] min-w-[36px] border-2 border-border-strong bg-surface px-3 py-1.5 text-[10px] font-bold tracking-widest text-purple-bright"
            >
              [X]
            </button>
          </div>
          <div onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
          }}>
            {tree}
          </div>
        </div>
      )}

      <aside className="fixed bottom-0 left-0 top-16 z-40 hidden w-64 overflow-y-auto border-r-2 border-border-strong bg-bg-soft p-5 md:block lg:w-72">
        {tree}
      </aside>
    </>
  );
}
