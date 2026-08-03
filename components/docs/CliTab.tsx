"use client";

import { cliCommands } from "@/lib/site";
import { Markdown } from "@/components/docs/Markdown";

export function CliTab({ slice }: { slice: string }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-4 text-[10px] tracking-widest text-muted">
          SOURCE: <span className="text-purple-bright">section 5 of content/docs/reference/01-introducao.md</span>
        </p>
        <div className="ascii-box bg-bg p-4 sm:p-6">
          <p className="mb-2 text-[10px] font-bold tracking-widest text-purple-bright">
            [ FROM THE REFERENCE ]
          </p>
          <Markdown source={slice} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-[10px] tracking-widest text-muted">
          SNAPSHOT: README.md — CLI Essentials table (maintained on the home page)
        </p>
        <div className="ascii-box bg-bg p-4 sm:p-6">
          <p className="mb-2 text-[10px] font-bold tracking-widest text-purple-bright">
            [ CLI ESSENTIALS — SNAPSHOT ]
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12px] leading-relaxed">
              <thead>
                <tr>
                  <th className="border-b-2 border-border-strong bg-surface-2 px-3 py-2 text-left font-bold tracking-widest text-purple-bright">
                    COMMAND
                  </th>
                  <th className="border-b-2 border-border-strong bg-surface-2 px-3 py-2 text-left font-bold tracking-widest text-purple-bright">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {cliCommands.map((c) => (
                  <tr key={c.cmd} className="even:bg-surface/60">
                    <td className="border-b border-border px-3 py-2 font-bold text-purple-bright">
                      <code>{c.cmd}</code>
                    </td>
                    <td className="border-b border-border px-3 py-2 text-text">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
