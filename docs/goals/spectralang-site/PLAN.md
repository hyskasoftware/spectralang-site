# SpectraLang Institutional Site — Implementation Plan

**Intent:** Deliver a Vercel-hosted institutional landing site for SpectraLang, branded to the language's visual identity (purple logo, terminal/ASCII culture), acting as the marketing and docs gateway for the language.

**Current Behavior:** No site exists. `S:\Spectra SIte` is empty. The only public-facing surfaces are `D:\Lang\SpectraLang\README.md` and `docs/` in the language repo. Brand assets exist only at `D:\Lang\SpectraLang\assets\` (`logo spectra.svg/png`, `icon.svg`, purple `#7d4fcd` / `#7e50ce`).

**Expected Outcome:** A Next.js (React + TypeScript) site, styled with Tailwind and Radix UI primitives, deployed on Vercel, with:
- Brutalist design language: hard borders, no rounded corners, oversized monospace type, raw grid, visible structure.
- Purple-centric palette derived from the logo (`#7d4fcd`, `#7e50ce`) on a near-black background.
- ASCII style: box-drawing decorations (`╔═╗ ╚═╝ ┌─┐ └─┘ │ ─`), ASCII-art banner in the hero, terminal-styled code windows.
- Sections: Hero (ASCII banner + logo), Features (AI/ML core + API platform), Code samples (real Spectra syntax), Install/Get started, Docs links, Footer.
- Facts on the site are verifiable against the language repo — the site never invents language claims.

**Target-Perspective Output:** A visitor opening the production URL sees an ASCII-art hero with the SpectraLang purple logo, an immediate one-line pitch, terminal windows with real Spectra code taken verbatim from `examples/`, the install command from the README Installation section, and links to the repo/docs. The owner inspects desktop (1440px) and mobile (390px) screenshots against the brutalist/ASCII spec and a fact-check checklist. Samples are verified with `spectralang check` when the CLI 0.2.7 is available; if verification fails or the CLI is unavailable, the site must NOT claim the samples compile.

**Truth Owner:** `D:\Lang\SpectraLang` (read-only source). README.md, docs/, `tools/spectra-cli/Cargo.toml` (version `0.2.7`), `examples/*.spectra` (syntax samples), `assets/` (logo).

**Contract Boundary:** `lib/site.ts` is the ONLY module allowed to hold facts (version, copy, links, code samples). Components render from it. Assets are copied from the repo `assets/` (read-only) into `public/`. Syntax samples are copied VERBATIM only — no trimming — from `examples/`.

**Cutover:** Greenfield. First successful Vercel production deploy = cutover from "no site" to "site exists". No domain routing required unless the user provides a custom domain.

**Displaced Path:** None in the site domain (nothing exists). In the language's public presence, the README's role as de-facto landing surface is demoted to "linked reference" — the site links to repo docs instead of duplicating them.

**Value Density:** Smallest high-value slice = scaffold + hero + features + install, deployable in one iteration. Second slice = code samples + docs links. Everything else is out of scope.

**Acceptance Evidence:**
1. `npm run build` passes locally and the Vercel preview build is green.
2. Production URL returns HTTP 200 with correct title/meta.
3. Screenshots at 1440px and 390px saved to `docs/goals/spectralang-site/evidence/`, reviewed against the brutalist/ASCII spec (hard borders, no rounded corners, purple palette, ASCII banner renders without misalignment).
4. Fact checklist (below) passes: every claim traceable to the repo.
5. Version shown on site (`0.2.7`) matches `tools/spectra-cli/Cargo.toml`.

**Evidence Lane:** Vercel deployment URL, build logs, screenshots, and the fact checklist in `docs/goals/spectralang-site/evidence/`.

**Kill Criteria:**
- If a docs site (Docusaurus/MkDocs/etc.) is later added, the landing site must LINK to it, never duplicate its content — no second dominant truth path.
- Site copy changes require a repo-verification step; `lib/site.ts` is the single place to edit copy.
- No interactive playground/REPL on the site (compile errors on the site would misrepresent the language) — kill any attempt to embed a live compiler.

**Risk if Wrong:** Misrepresenting language facts (wrong syntax, wrong claims, wrong version) damages credibility; weak ASCII alignment or off-palette colors fails the design intent; static copy silently drifts from the repo.

**Architecture Slice:**

- Files to create:
  - `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example` (optional)
  - `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - `components/`: `ascii/` (banner + box helpers), `Nav.tsx`, `Hero.tsx`, `Features.tsx`, `CodeTerminal.tsx`, `Install.tsx`, `DocsLinks.tsx`, `Footer.tsx`
  - `lib/site.ts` — content/config contract (version, copy, links, code samples)
  - `public/logo.svg`, `public/icon.svg` (copies from repo), `public/favicon.ico` (generated)
  - `docs/goals/spectralang-site/PLAN.md`, `GOAL.md`, `evidence/`
- Files to modify: none (greenfield).
- Files to avoid: `D:\Lang\SpectraLang` (read-only source of truth — never write), `node_modules/`, `target/`.
- Source of truth: `D:\Lang\SpectraLang` — README.md (pitch/facts), `examples/syntax_quickstart.spectra` (hero sample), `examples/` AI/API samples, `tools/spectra-cli/Cargo.toml` (version), `assets/` (logo).
- Read path: manual copy step → `lib/site.ts` + `public/` (documented in checklist).
- Write path: static/SSG build → Vercel.
- Contract boundary: `lib/site.ts` is the fact gateway; components are dumb renderers.
- Integration points: Vercel Git import (repo push), Google Fonts (JetBrains Mono / IBM Plex Mono), external links to repo docs paths.
- Migration/cutover: first push + Vercel import → production URL.
- Displaced path: none.
- Acceptance evidence gate: build green + fact checklist + screenshots + live URL check.

**Plan Review Gate:** Requires PRE review before execution (reviewer prompt used; findings accepted or fixed first).

---

## Tasks

### T1 — Scaffold Next.js + Tailwind + Radix (foundation)
- Files: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `app/layout.tsx` (minimal), `app/globals.css` (minimal), README.md
- Scope: Create the app at `S:\Spectra SIte` with Next.js (App Router, TypeScript), Tailwind, and Radix UI primitives (NavigationMenu, Dialog, Tabs, Accordion). Add JetBrains Mono via next/font.
- ORDER IS MANDATORY (per AGENTS.md): (1) scaffold via `create-next-app` / `npm install`; (2) verify the installed Next version and confirm `node_modules/next/dist/docs/` exists — pin the exact `next` version in `package.json` and record it at the top of this task's note; (3) read the relevant guides in `node_modules/next/dist/docs/` (App Router, fonts, image, config) BEFORE writing any Next.js code — this Next version has breaking changes; (4) if the docs directory is missing, stop and report (do not write code from memory).
- Expected output: `npm run dev` renders a blank page; `npm run build` passes.
- Verification: `npm run build` in `S:\Spectra SIte`.
- Acceptance evidence: build log green; dev server renders; pinned Next version recorded.
- Parallel: no (foundation for all).

### T2 — Brand assets
- Files: `public/logo.svg`, `public/icon.svg`, `public/favicon.ico` (or `app/icon.svg`)
- Scope: Copy `assets/logo spectra.svg` → `public/logo.svg`, `assets/icon.svg` → `public/icon.svg`; wire as favicon + OG image.
- Verification: file diff vs source; `npm run build` still green.
- Acceptance evidence: `/logo.svg` serves 200 with identical bytes; favicon appears in tab.
- Parallel: yes (after T1).

### T3 — Content contract (`lib/site.ts`)
- Files: `lib/site.ts`
- Scope: Single module with: version `0.2.7` (from `tools/spectra-cli/Cargo.toml`), pitch line (from README intro), feature lists (AI/ML core + API platform, from README "Key Features"), install command (verbatim from README Installation section — do NOT invent a `cargo install spectralang` command; the README uses `cargo install --path tools/spectra-cli`), code samples VERBATIM from `examples/syntax_quickstart.spectra` (Quickstart), `examples/ai/` (AI/ML sample — name the exact file chosen), `examples/api/` (API sample — name the exact file chosen), links (repo URL — CONFIRM with user; docs paths from repo).
- Expected output: typed `site` object; components consume it only.
- Verification: grep that no other file contains facts (version, claims).
- Acceptance evidence: fact checklist (see below) passes.
- Parallel: yes (after T1).

### T4 — Design tokens + ASCII/brutalist CSS
- Files: `app/globals.css` (full)
- Scope: Tailwind theme: near-black bg (`#0a0910`), purple scale from logo (`#7d4fcd`, `#7e50ce`, plus light/dark steps), off-white text, mono font stack; brutalist utilities: hard borders (1px solid), no rounded corners (`rounded-none`), offset shadows/boxes; ASCII helpers: `.ascii-box` (box-drawing border), text glow for purple accents; selection/scrollbar styling.
- Verification: `npm run build` green; inspect in dev.
- Acceptance evidence: screenshot contrast passes design spec (hard edges, purple dominance, mono).
- Parallel: yes (after T1).

### T5 — Layout + Navigation
- Files: `app/layout.tsx` (final), `components/Nav.tsx`, `components/Footer.tsx`
- Scope: Fixed header with logo mark + section links (Features, Code, Install, Docs); mobile menu via Radix Dialog; footer with license (MIT), repo link, version badge.
- Verification: `npm run build`; manual nav test.
- Acceptance evidence: navigation works at 1440px and 390px (screenshot).
- Parallel: yes (after T3/T4).

### T6 — Hero with ASCII banner
- Files: `components/Hero.tsx`, `components/ascii/banner.tsx`, `components/ascii/box.tsx`
- Scope: ASCII-art "SPECTRALANG" banner (monospace, purple glow), logo SVG beside/below, pitch line from `lib/site.ts`, two CTAs (Get Started → Install section, Read Docs → repo docs).
- Verification: `npm run build`; visual alignment check in browser.
- Acceptance evidence: ASCII banner aligns cleanly at 1440px and 390px (screenshot); no letter misalignment on mobile (hide/shrink banner).
- Parallel: yes (after T3/T4).

### T7 — Features section
- Files: `components/Features.tsx`
- Scope: Two workstream cards (AI/ML core, API platform) with facts from `lib/site.ts`; brutalist grid with hard borders; ASCII decorations (`┌──┐` headers). Optional Radix Accordion for the full feature list.
- Verification: `npm run build`.
- Acceptance evidence: feature claims match README checklist; screenshot shows hard-border grid.
- Parallel: yes (after T3/T4).

### T8 — Code samples terminal
- Files: `components/CodeTerminal.tsx`
- Scope: Terminal-styled window (title bar `spectralang run`), Radix Tabs: Quickstart (verbatim `syntax_quickstart.spectra`), AI/ML (verbatim sample from `examples/` AI dir), API (verbatim sample). Syntax highlighting via simple tokenization or CSS classes — no heavy dependency (optional `prism-react-renderer` only if trivial).
- Verification: `npm run build`; copy button (Radix Tooltip) works.
- Acceptance evidence: samples byte-identical to `examples/` (checklist); terminal renders at both widths.
- Parallel: yes (after T3/T4).

### T9 — Install + Docs sections
- Files: `components/Install.tsx`, `components/DocsLinks.tsx`
- Scope: Install: command block from README (install script / cargo path), ASCII-prompt decoration; Docs: links grid to repo `docs/` entry points (language reference, book, API) + GitHub.
- Verification: `npm run build`; links resolve (manual spot check).
- Acceptance evidence: install commands match README verbatim; links point to existing repo paths.
- Parallel: yes (after T3/T4).

### T10 — SEO/meta + OG
- Files: `app/layout.tsx` (metadata — sequential AFTER T5, same owner), `app/opengraph-image` or `public/og.png`
- Scope: Title "SpectraLang — AI/ML language and API platform", description from README intro, metadata icons, OG image from logo, Vercel-friendly metadata conventions. Status badge/caveat conveying active development (per README "Project Status" — no production-readiness claims).
- Verification: `npm run build`; inspect `<head>` in dev.
- Acceptance evidence: title/meta correct on production URL (curl or DevTools).
- Parallel: no (after T5 — must NOT write layout.tsx concurrently with T5; single-owner chain T1→T5→T10).

### T11 — Vercel deploy + acceptance evidence
- Files: `docs/goals/spectralang-site/evidence/` (checklist.md, screenshots)
- Scope: `git init` if needed, push to GitHub (CONFIRM repo with user), import to Vercel, deploy production. Capture: build log, production URL, screenshots 1440px + 390px (full page), run fact checklist, save to evidence/.
- Verification: production URL 200; checklist all-pass.
- Acceptance evidence: evidence/ contains URL, screenshots, completed checklist; owner reviews.
- Parallel: no (last; depends on T2–T10).

---

## Fact Checklist (acceptance gate, T11)

- [ ] Version `0.2.7` matches `tools/spectra-cli/Cargo.toml`.
- [ ] Pitch line matches README intro wording.
- [ ] AI/ML claims ⊆ README "AI/ML core" section.
- [ ] API claims ⊆ README "API Platform" section.
- [ ] CLI commands ⊆ README "CLI Essentials" (compile/check/run/lint/bench/repl/new/fmt/package/release-info).
- [ ] Code samples byte-identical to source `examples/*.spectra` (diff verified); no trimmed excerpts.
- [ ] Chosen samples pass `spectralang check` with CLI 0.2.7 when available — otherwise the site does not claim the samples compile.
- [ ] Install instructions match README Installation section.
- [ ] Logo assets byte-identical to `D:\Lang\SpectraLang\assets\`.
- [ ] Purple palette values trace to logo SVG fills (`#7d4fcd`, `#7e50ce`).
- [ ] External links point to existing repo paths (404 check).
- [ ] Site conveys active-development status per README "Project Status" (badge/caveat; no production-readiness claims).

## Decisions to confirm with user (before T11)
1. GitHub repo URL for the site (and whether the language repo is public/has a URL for links).
2. Custom domain for Vercel (or default `*.vercel.app`).
