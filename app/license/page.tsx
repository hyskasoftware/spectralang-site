import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "License — MIT — SpectraLang",
  description: "SpectraLang is released under the MIT License.",
};

export default function LicensePage() {
  return (
    <section className="border-b-2 border-border-strong">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-[10px] tracking-widest text-muted">
          <Link href="/" className="text-purple-bright hover:text-text">
            HOME
          </Link>{" "}
          / <span className="text-text">LICENSE</span>
        </nav>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-text md:text-4xl">
          MIT<span className="text-purple-bright glow-purple">_LICENSE</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Copyright (c) 2026 SpectraLang Project — see the{" "}
          <a
            href={`${site.repo}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-bright underline decoration-purple-dim underline-offset-4 hover:text-text"
          >
            original LICENSE file
          </a>{" "}
          in the repository.
        </p>

        <div className="ascii-box mt-10 bg-bg p-6 md:p-10">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-text md:text-sm">
{`MIT License

Copyright (c) 2026 SpectraLang Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
          </pre>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="ascii-box bg-bg-soft p-5 transition-transform hover:-translate-y-1"
          >
            <span className="text-[10px] tracking-widest text-muted">[ SOURCE ]</span>
            <p className="mt-1 text-sm font-black tracking-widest text-purple-bright">
              THE REPOSITORY
            </p>
            <p className="mt-1 text-[11px] text-muted">compiler · runtime · CLI · LSP</p>
            <span className="mt-2 block text-[10px] tracking-widest text-purple-dim">
              &gt; OPEN_GITHUB
            </span>
          </a>
          <Link href="/docs" className="ascii-box bg-bg-soft p-5 transition-transform hover:-translate-y-1">
            <span className="text-[10px] tracking-widest text-muted">[ DOCS ]</span>
            <p className="mt-1 text-sm font-black tracking-widest text-purple-bright">
              READ_THE_DOCS
            </p>
            <p className="mt-1 text-[11px] text-muted">language reference · CLI · stdlib</p>
            <span className="mt-2 block text-[10px] tracking-widest text-purple-dim">
              &gt; OPEN /DOCS
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
