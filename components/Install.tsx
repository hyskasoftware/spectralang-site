import { installSteps, cliCommands } from "@/lib/site";
import { ReleaseDownload } from "@/components/ReleaseDownload";

export function Install() {
  return (
    <section id="install" className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-[10px] tracking-[0.35em] text-muted">{"// SECTION 03 — SETUP"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
          INSTALL<span className="text-purple-bright glow-purple">_IT</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Grab the latest release for your platform — fetched live from GitHub — or build from
          source.
        </p>

        <div className="mt-12">
          <ReleaseDownload />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
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

          <div className="ascii-box bg-bg-soft">
            <header className="border-b-2 border-border-strong bg-surface-2 px-5 py-3">
              <h3 className="text-sm font-black tracking-widest text-purple-bright">
                [ CLI ESSENTIALS ]
              </h3>
            </header>
            <ul className="flex flex-col divide-y divide-border p-5">
              {cliCommands.map((c) => (
                <li key={c.cmd} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <code className="shrink-0 text-xs font-bold text-purple-bright">{c.cmd}</code>
                  <span className="text-[11px] leading-snug text-muted">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
