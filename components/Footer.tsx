import { site } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-border-strong">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={32} height={32} className="h-8 w-8" />
          <div>
            <p className="text-xs font-black tracking-widest text-text">
              SPECTRA<span className="text-purple-bright">LANG</span>
            </p>
            <p className="text-[11px] text-muted">
              v{site.version} · {site.status} · {site.license} License
            </p>
          </div>
        </div>

        <pre
          aria-hidden="true"
          className="hidden select-none text-[8px] leading-[1.2] text-purple-dim lg:block"
        >
{`_    _  _____  ______  _____  _   _ 
| |  | ||  ___||  ____||_   _|| | | |
| |  | || |_   | |___    | |  | | | |
| |  | ||  _|  |  ___,   | |  | |_| |
| |__| || |____| |____  _| |_ |  _  |
 \\____/ |_____||______||_____||_| |_|`}
        </pre>

        <div className="flex flex-col gap-2 text-[11px] text-muted md:items-end">
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-bright"
          >
            &gt; {site.repo.replace("https://", "")}
          </a>
          <Link href="/license" className="hover:text-purple-bright">
            &gt; {site.license} License
          </Link>
          <p>
            &gt; a JIT-compiled language for AI/ML and API workloads
          </p>
        </div>
      </div>
    </footer>
  );
}
