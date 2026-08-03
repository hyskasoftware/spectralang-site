"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { codeSamples, site } from "@/lib/site";

export function CodeTerminal() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="code" className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-[10px] tracking-[0.35em] text-muted">{"// SECTION 02 — SOURCE"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
          REAL CODE,<span className="text-purple-bright glow-purple">_TRANSLATED</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Bundled examples straight from the repository — comments translated to English, code
          untouched.
        </p>

        <div className="ascii-box mt-12 overflow-hidden bg-bg">
          <Tabs.Root defaultValue={codeSamples.quickstart.label}>
            <Tabs.List
              className="flex flex-wrap border-b-2 border-border-strong bg-surface-2"
              aria-label="Code samples"
            >
              {Object.values(codeSamples).map((s) => (
                <Tabs.Trigger
                  key={s.label}
                  value={s.label}
                  className="cursor-pointer border-r-2 border-border-strong px-5 py-3 text-[11px] font-bold tracking-widest text-muted transition-colors hover:text-purple-bright data-[state=active]:bg-purple data-[state=active]:text-bg"
                >
                  {s.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {Object.values(codeSamples).map((s) => (
              <Tabs.Content key={s.label} value={s.label} className="focus:outline-none">
                <div className="flex items-center justify-between border-b border-border bg-bg-soft px-4 py-2">
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span aria-hidden="true" className="text-purple-bright">
                      $&gt;
                    </span>
                    spectralang run {s.file}
                  </div>
                  <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root open={copied === s.label}>
                      <Tooltip.Trigger asChild>
                        <button
                          onClick={() => copy(s.label, s.code)}
                          className="border border-border bg-surface px-2 py-1 text-[10px] font-bold tracking-widest text-purple-bright transition-colors hover:border-purple-bright"
                        >
                          {copied === s.label ? "[ COPIED ]" : "[ COPY ]"}
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="border border-border-strong bg-surface-2 px-2 py-1 text-[10px] text-text"
                          sideOffset={6}
                        >
                          Copy to clipboard
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
                <div className="flex max-h-[480px] flex-row overflow-auto bg-bg-soft">
                  <pre
                    aria-hidden="true"
                    className="code-window shrink-0 select-none border-r border-border pr-3 text-right text-muted"
                  >
                    {s.code
                      .split("\n")
                      .map((_, i) => String(i + 1).padStart(2, "0"))
                      .join("\n")}
                  </pre>
                  <pre className="code-window flex-1 px-4 text-text">
                    <code>{s.code}</code>
                  </pre>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>

        <p className="mt-4 text-[10px] tracking-widest text-muted">
          * comments and messages translated to English for clarity — the code itself is unchanged
          from the bundled examples in the {site.repo} repository
        </p>
      </div>
    </section>
  );
}
