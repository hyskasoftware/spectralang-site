import type { Metadata } from "next";
import { buildDocsTree, flattenPages, readQuickstartSlice } from "@/lib/docs-tree";
import { UsageTab } from "@/components/docs/UsageTab";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";

const tree = buildDocsTree();

export const metadata: Metadata = {
  title: "SpectraLang Quick Start — Your First Module in Minutes",
  description:
    "SpectraLang quick start tutorial: write, compile, run and check your first module — variables, functions, control flow and the spectralang CLI.",
  alternates: { canonical: "/docs/usage" },
  keywords: ["SpectraLang tutorial", "SpectraLang quick start", "SpectraLang hello world", "SpectraLang first module"],
};

export default function UsagePage() {
  const pages = flattenPages(tree);
  const idx = pages.findIndex((p) => p.href === "/docs/usage");
  const prev = idx > 0 ? pages[idx - 1] : undefined;
  const next = idx < pages.length - 1 ? pages[idx + 1] : undefined;

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
          { name: "Quick Start", path: "/docs/usage" },
        ])}
      />
      <nav aria-label="Breadcrumb" className="text-[11px] tracking-widest text-muted">
        <Link href="/docs" className="text-purple-bright hover:text-text">
          DOCS
        </Link>{" "}
        / <span className="text-text">USAGE — QUICK START</span>
      </nav>
      <h1 className="mt-4 text-2xl font-black tracking-tight text-text md:text-3xl">
        QUICK<span className="text-purple-bright glow-purple">_START</span>
      </h1>
      <p className="mt-2 text-[11px] tracking-widest text-muted">
        SOURCE: <span className="text-purple-bright">README.md — Quick Start</span>
      </p>

      <div className="mt-8">
        <UsageTab slice={readQuickstartSlice()} />
      </div>

      {(prev || next) && (
        <div className="mt-10 grid grid-cols-1 gap-4 border-t-2 border-border-strong pt-6 sm:grid-cols-2">
          {prev ? (
            <Link href={prev.href} className="ascii-box min-w-0 bg-bg p-4 transition-transform hover:-translate-y-0.5">
              <p className="text-[10px] tracking-widest text-muted">{"< PREV"}</p>
              <p className="mt-1 break-words text-xs font-bold tracking-widest text-purple-bright">{prev.label}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="ascii-box min-w-0 bg-bg p-4 text-right transition-transform hover:-translate-y-0.5">
              <p className="text-[10px] tracking-widest text-muted">NEXT &gt;</p>
              <p className="mt-1 break-words text-xs font-bold tracking-widest text-purple-bright">{next.label}</p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
