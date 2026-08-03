"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { site, nav } from "@/lib/site";
import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-border-strong bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="#top" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border-2 border-purple-bright bg-purple-dark text-xs font-bold text-purple-bright">
            S
          </span>
          <span className="text-sm font-bold tracking-widest text-text">
            SPECTRALANG<span className="text-purple-bright">_</span>
            <span className="ml-2 inline-block border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted">
              v{site.version}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-xs font-semibold tracking-widest text-muted transition-colors hover:bg-surface hover:text-purple-bright"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 border-2 border-purple-bright bg-purple px-3 py-2 text-xs font-bold tracking-widest text-bg shadow-hard-sm transition-transform hover:-translate-y-0.5 hover:bg-purple-bright"
          >
            GitHub
          </a>
        </nav>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center border-2 border-border-strong bg-surface text-purple-bright md:hidden"
            >
              [:]
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/90" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l-2 border-purple-bright bg-bg-soft p-6">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-sm font-bold tracking-widest text-purple-bright">
                  SPECTRALANG_
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    aria-label="Close menu"
                    className="grid h-8 w-8 place-items-center border-2 border-border-strong text-purple-bright"
                  >
                    [X]
                  </button>
                </Dialog.Close>
              </div>
              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile">
                {nav.map((item) => (
                  <Dialog.Close asChild key={item.href}>
                    <a
                      href={item.href}
                      className="border border-border bg-surface px-4 py-3 text-xs font-semibold tracking-widest text-text hover:text-purple-bright"
                    >
                      &gt; {item.label}
                    </a>
                  </Dialog.Close>
                ))}
                <a
                  href={site.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 border-2 border-purple-bright bg-purple px-4 py-3 text-center text-xs font-bold tracking-widest text-bg"
                >
                  GitHub
                </a>
              </nav>
              <p className="mt-auto text-[10px] text-muted">
                v{site.version} / {site.status}
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
