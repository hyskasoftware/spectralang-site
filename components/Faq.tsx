import { faqs } from "@/lib/site";
import Link from "next/link";

export function Faq() {
  return (
    <section id="faq" className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-[11px] tracking-[0.35em] text-muted">{"// SECTION 05 — FAQ"}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-text md:text-4xl">
          FREQUENTLY<span className="text-purple-bright glow-purple">_ASKED</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Direct answers about SpectraLang — what it is, how to install it, and what you can
          build with it.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((f, i) => (
            <details key={f.q} className="ascii-box group bg-bg-soft" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <h3 className="text-sm font-black tracking-widest text-text group-open:text-purple-bright md:text-base">
                  <span className="mr-2 text-purple-dim">[Q{String(i + 1).padStart(2, "0")}]</span>
                  {f.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[11px] text-purple-bright transition-transform group-open:rotate-90"
                >
                  &gt;
                </span>
              </summary>
              <div className="flex flex-col gap-4 border-t border-border px-5 py-5">
                <p className="max-w-3xl text-xs leading-relaxed text-text md:text-sm">{f.a}</p>
                <p className="text-[11px] tracking-widest text-muted">
                  {"SOURCE: "}
                  {f.href.startsWith("http") ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-bright underline decoration-purple-dim underline-offset-4 hover:text-text"
                    >
                      {f.hrefLabel}
                    </a>
                  ) : (
                    <Link
                      href={f.href}
                      className="text-purple-bright underline decoration-purple-dim underline-offset-4 hover:text-text"
                    >
                      {f.hrefLabel}
                    </Link>
                  )}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
