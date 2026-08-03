"use client";

import { ReleaseDownload } from "@/components/ReleaseDownload";
import { installSteps } from "@/lib/site";

export function InstallTab() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-[10px] tracking-widest text-muted">
          SOURCE: <span className="text-purple-bright">live GitHub releases API</span>
        </p>
        <ReleaseDownload />
      </div>

      <div className="ascii-box bg-bg-soft">
        <header className="border-b-2 border-border-strong bg-surface-2 px-5 py-3">
          <h3 className="text-sm font-black tracking-widest text-purple-bright">
            [ BUILD FROM SOURCE ]
          </h3>
        </header>
        <ol className="flex flex-col gap-4 p-5">
          {installSteps.map((step, i) => (
            <li key={step.cmd}>
              <p className="text-[10px] tracking-widest text-muted">
                STEP {String(i + 1).padStart(2, "0")} — {step.desc}
              </p>
              <pre className="mt-2 border border-border bg-bg px-4 py-3 text-xs text-purple-bright">
                <code>
                  <span className="text-muted select-none">$&gt; </span>
                  {step.cmd}
                </code>
              </pre>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
