"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { site, nav } from "@/lib/site";
import Link from "next/link";

function isActive(href: string, pathname: string): boolean {
  if (href === "/docs") return pathname.startsWith("/docs");
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href;
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border-strong bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="SpectraLang home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm font-bold tracking-widest text-text">
            SPECTRALANG<span className="text-purple-bright">_</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href, pathname) ? "page" : undefined}
              className={`px-3 py-2 text-xs font-semibold tracking-widest transition-colors hover:bg-surface hover:text-purple-bright ${
                isActive(item.href, pathname)
                  ? "bg-surface text-purple-bright"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
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
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href, pathname) ? "page" : undefined}
                      className={`border border-border bg-surface px-4 py-3 text-xs font-semibold tracking-widest hover:text-purple-bright ${
                        isActive(item.href, pathname)
                          ? "text-purple-bright"
                          : "text-text"
                      }`}
                    >
                      &gt; {item.label}
                    </Link>
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
              <p className="mt-auto text-[11px] text-muted">
                v{site.version} / {site.status}
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
