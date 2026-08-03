"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Asset = {
  name: string;
  size: number;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  name: string;
  published_at: string;
  body: string | null;
  assets: Asset[];
};

type Platform = "windows" | "linux" | "macos" | "extras";
type Kind = "installer" | "cli" | "lsp" | "deb" | "tar" | "arm64" | "x64" | "vscode" | "pkg";

function classify(name: string): { platform: Platform; kind: Kind } | null {
  if (/\.vsix$/i.test(name)) return { platform: "extras", kind: "vscode" };
  if (/windows|\.exe$/i.test(name)) {
    if (/setup/i.test(name)) return { platform: "windows", kind: "installer" };
    if (/lsp/i.test(name)) return { platform: "windows", kind: "lsp" };
    return { platform: "windows", kind: "cli" };
  }
  if (/macos/i.test(name)) {
    if (/arm64/i.test(name)) return { platform: "macos", kind: "arm64" };
    if (/x64|amd64/i.test(name)) return { platform: "macos", kind: "x64" };
    return { platform: "macos", kind: "pkg" };
  }
  if (/linux/i.test(name) || /\.deb$/i.test(name)) {
    if (/\.deb$/i.test(name)) return { platform: "linux", kind: "deb" };
    if (/lsp/i.test(name)) return { platform: "linux", kind: "lsp" };
    if (/^spectralang$/.test(name)) return { platform: "linux", kind: "cli" };
    return { platform: "linux", kind: "tar" };
  }
  return null;
}

const KIND_LABEL: Record<Kind, string> = {
  installer: "Installer (setup)",
  cli: "CLI binary",
  lsp: "Language server",
  deb: "Debian package",
  tar: "Tarball",
  arm64: "macOS ARM64",
  x64: "macOS x64",
  vscode: "VS Code extension",
  pkg: "Package",
};

const PLATFORM_CARDS: {
  platform: Platform;
  title: string;
  tag: string;
  experimental?: boolean;
  primary: Kind[];
  secondary: Kind[];
}[] = [
  {
    platform: "windows",
    title: "WINDOWS",
    tag: "[ WIN ]",
    primary: ["installer"],
    secondary: ["cli", "lsp"],
  },
  {
    platform: "linux",
    title: "LINUX",
    tag: "[ LIN ]",
    experimental: true,
    primary: ["deb"],
    secondary: ["tar", "cli", "lsp"],
  },
  {
    platform: "macos",
    title: "MACOS",
    tag: "[ MAC ]",
    experimental: true,
    primary: ["arm64"],
    secondary: ["x64"],
  },
];

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export function ReleaseDownload() {
  const [release, setRelease] = useState<Release | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/Hyska-Software/SpectraLang/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Release) => {
        if (cancelled) return;
        setRelease(data);
        setState("ok");
      })
      .catch(() => {
        if (cancelled) return;
        setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  type Picked = Asset & { kind: Kind };

  const pick = (platform: Platform, kinds: Kind[]): Picked[] =>
    kinds
      .map((kind) => {
        const asset = release?.assets.find((a) => {
          const c = classify(a.name);
          return c?.platform === platform && c.kind === kind;
        });
        return asset ? { ...asset, kind } : null;
      })
      .filter((a): a is Picked => a !== null);

  if (state === "loading") {
    return (
      <div className="ascii-box bg-bg-soft p-5">
        <p className="text-xs tracking-widest text-purple-bright glow-purple-soft">
          [ FETCHING LATEST RELEASE FROM GITHUB ... ]
        </p>
      </div>
    );
  }

  if (state === "error" || !release) {
    return (
      <div className="ascii-box bg-bg-soft p-5">
        <p className="text-xs tracking-widest text-muted">
          [ UNABLE TO REACH THE GITHUB RELEASES API ]
        </p>
        <a
          href={`${site.repo}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block border-2 border-purple-bright bg-purple px-4 py-2 text-xs font-bold tracking-widest text-bg transition-transform hover:-translate-y-0.5 hover:bg-purple-bright"
        >
          &gt; OPEN RELEASES PAGE
        </a>
      </div>
    );
  }

  const date = new Date(release.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const bodyExcerpt = release.body ? release.body.slice(0, 180) : "";

  return (
    <div className="ascii-box bg-bg-soft">
      <header className="flex flex-col gap-2 border-b-2 border-border-strong bg-surface-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-black tracking-widest text-purple-bright">
          [ LATEST RELEASE ]
        </h3>
        <div className="text-[11px] text-muted">
          {release.name} <span className="text-purple-bright">·</span> {date}
          <span className="ml-2 inline-block border border-border bg-bg px-2 py-0.5 text-[10px]">
            {release.tag_name}
          </span>
        </div>
      </header>

      {bodyExcerpt ? (
        <p className="border-b border-border px-5 py-3 text-[11px] leading-relaxed text-muted">
          {bodyExcerpt}
          {release.body && release.body.length > 180 ? "..." : ""}
        </p>
      ) : null}

      <div className="grid gap-4 p-5 md:grid-cols-3">
        {PLATFORM_CARDS.map((card) => {
          const primary = pick(card.platform, card.primary);
          const secondary = pick(card.platform, card.secondary);
          const primaryAsset = primary[0];
          return (
            <div
              key={card.platform}
              className={`flex flex-col border-2 ${
                card.experimental ? "border-warn/60" : "border-border-strong"
              } bg-bg`}
            >
              <header className="flex items-center justify-between border-b-2 border-border px-4 py-3">
                <h4 className="text-xs font-black tracking-widest text-text">
                  {card.tag} {card.title}
                </h4>
                {card.experimental ? (
                  <span className="border border-warn px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-warn">
                    [ EXPERIMENTAL ]
                  </span>
                ) : (
                  <span className="border border-border px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-purple-bright">
                    [ STABLE ]
                  </span>
                )}
              </header>
              <div className="flex flex-1 flex-col gap-3 p-4">
                {primaryAsset ? (
                  <a
                    href={primaryAsset.browser_download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-purple-bright bg-purple px-4 py-3 text-center text-[11px] font-bold tracking-widest text-bg shadow-hard-sm transition-transform hover:-translate-y-0.5 hover:bg-purple-bright"
                  >
                    DOWNLOAD {KIND_LABEL[primaryAsset.kind].toUpperCase()}
                    <span className="mt-1 block text-[9px] font-normal tracking-normal text-bg/75">
                      {primaryAsset.name} · {formatSize(primaryAsset.size)}
                    </span>
                  </a>
                ) : (
                  <p className="border-2 border-dashed border-border px-4 py-3 text-center text-[10px] text-muted">
                    NO {card.title} ASSET IN THIS RELEASE
                  </p>
                )}
                {secondary.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {secondary.map((a) => (
                      <li key={a.name}>
                        <a
                          href={a.browser_download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 border border-border bg-surface px-3 py-2 text-[10px] text-muted transition-colors hover:border-purple-bright hover:text-purple-bright"
                        >
                          <span className="truncate">{KIND_LABEL[a.kind]}</span>
                          <span className="shrink-0 text-purple-dim">{formatSize(a.size)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {pick("extras", ["vscode"]).length > 0 ? (
        <footer className="border-t border-border px-5 py-3">
          {pick("extras", ["vscode"]).map((a) => (
            <a
              key={a.name}
              href={a.browser_download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-purple-bright"
            >
              <span className="text-purple-bright">&gt;</span>
              VS Code extension ({formatSize(a.size)}) — {a.name}
            </a>
          ))}
        </footer>
      ) : null}
    </div>
  );
}
