"use client";

import { site } from "@/lib/site";
import { Markdown } from "@/components/docs/Markdown";

export function UsageTab({ slice }: { slice: string }) {
  return (
    <div>
      <p className="mb-4 text-[10px] tracking-widest text-muted">
        SOURCE: <span className="text-purple-bright">README.md — Quick Start section</span>{" "}
        <a
          href={`${site.repo}#quick-start`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-bright underline decoration-purple-dim underline-offset-4 hover:text-text"
        >
          (view full README)
        </a>
      </p>
      <div className="ascii-box bg-bg p-4 sm:p-6">
        <Markdown source={slice} />
      </div>
    </div>
  );
}
