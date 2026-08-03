import type { Metadata } from "next";
import { buildDocsTree, flattenPages, readQuickstartSlice } from "@/lib/docs-tree";
import { UsageTab } from "@/components/docs/UsageTab";
import Link from "next/link";

const tree = buildDocsTree();

export const metadata: Metadata = {
  title: "Quick Start — SpectraLang Docs",
  description: "The quick start tour: your first module, compile, run and check.",
};

export default function UsagePage() {
  const pages = flattenPages(tree);
  const idx = pages.findIndex((p) => p.href === "/docs/usage");
  const prev = idx > 0 ? pages[idx - 1] : undefined;
  const next = idx < pages.length - 1 ? pages[idx + 1] : undefined;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="text-[10px] tracking-widest text-muted">
        <Link href="/docs" className="text-purple-bright hover:text-text">
          DOCS
        </Link>{" "}
        / <span className="text-text">USAGE — QUICK START</span>
      </nav>
      <h1 className="mt-4 text-2xl font-black tracking-tight text-text md:text-3xl">
        QUICK<span className="text-purple-bright glow-purple">_START</span>
      </h1>
      <p className="mt-2 text-[10px] tracking-widest text-muted">
        SOURCE: <span className="text-purple-bright">README.md — Quick Start</span>
      </p>

      <div className="mt-8">
        <UsageTab slice={readQuickstartSlice()} />
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
