import { site } from "@/lib/site";
import { AsciiBanner } from "@/components/ascii/banner";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-border-strong">
      <div className="ascii-stripes absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center md:py-28">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="SpectraLang logo"
            width={96}
            height={96}
            className="h-20 w-20 drop-shadow-[0_0_24px_rgba(125,79,205,0.55)] sm:h-24 sm:w-24"
          />
          <div className="text-left">
          <p className="text-[10px] tracking-[0.35em] text-muted">
            {"/// A LANGUAGE FOR AI/ML WORKLOADS AND API SERVICES"}
          </p>
            <h1 className="text-2xl font-black tracking-tight text-text sm:text-4xl">
              SPECTRA<span className="text-purple-bright glow-purple">LANG</span>
            </h1>
          </div>
        </div>

        <AsciiBanner />

        <div className="ascii-box max-w-2xl bg-bg/80 px-6 py-4">
          <p className="text-sm leading-relaxed text-text md:text-base">{site.tagline}</p>
          <p className="mt-3 text-[10px] tracking-widest text-muted">
            [ TENSOR-FIRST AI/ML CORE ] [ FIRST-CLASS API SERVICES ] [ JIT EXECUTION ]
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#install"
            className="border-2 border-purple-bright bg-purple px-8 py-4 text-sm font-bold tracking-widest text-bg shadow-hard-purple transition-transform hover:-translate-y-1 hover:bg-purple-bright"
          >
            GET STARTED
          </a>
          <a
            href="#code"
            className="border-2 border-border-strong bg-surface px-8 py-4 text-sm font-bold tracking-widest text-purple-bright transition-transform hover:-translate-y-1 hover:border-purple-bright"
          >
            &gt; READ THE CODE
          </a>
        </div>

        <p className="text-[10px] tracking-widest text-muted">
          [ active development — not yet a stable production language ]
        </p>
      </div>
    </section>
  );
}
