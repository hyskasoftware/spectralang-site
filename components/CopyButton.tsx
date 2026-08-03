"use client";

import { useState } from "react";

export function CopyButton({ text, label = "COPY" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      aria-label={`Copy: ${text}`}
      className={`min-h-[32px] border px-2.5 py-1.5 text-[10px] font-bold tracking-widest transition-colors ${
        copied
          ? "border-purple-bright bg-purple text-bg"
          : "border-border bg-surface text-muted hover:border-purple-bright hover:text-purple-bright"
      }`}
    >
      {copied ? "[COPIED]" : `[${label}]`}
    </button>
  );
}
