# SpectraLang Docs Page Implementation Plan (rev. 3 — URL-per-topic, Vercel-style tree)

**Intent:** Redesign the `/docs` surface into a Vercel-style documentation structure: a collapsible sidebar tree (chapters → topics), one URL per topic, breadcrumbs, an "ON THIS PAGE" anchor rail with scrollspy, and PREV/NEXT paging — all content local and baked into the static build.

**Current Behavior (rev. 2, 2026-08-03):** A single `/docs` page with a sidebar tab bar (9 buttons) that swaps the content panel via client state. No per-topic URLs, no anchors, no TOC rail.

**Expected Outcome:** Visitor opens `/docs` → landing grid of 6 chapters + tooling; clicks "02 Fundamentos" → chapter index page; clicks "Comentários" → `/docs/fundamentos/comentarios` renders that single `##` section locally (tables, code blocks, PT/EN headings) with breadcrumb, sidebar tree with the active chapter open, right-rail "ON THIS PAGE" anchors, and PREV/NEXT links. 62 topic pages + 6 chapter pages + landing + 3 tooling pages = 77 static routes.

**Truth Owner:** `D:\Lang\SpectraLang` (read-only) — `docs/reference/*.md`, `README.md`. The site's `content/docs/` is a SYNCED COPY (scripts/sync-docs.mjs; byte-identity verified). Content frozen at sync date.

**Contract Boundary:** `content/docs/` = the only local copy of docs prose (synced, never hand-edited). `lib/docs.ts` = manifest (paths, labels, anchors, chapter slugs, tooling). `lib/docs-tree.ts` = server-only heading parser + tree builder + slicer (fs at build). Client components receive plain data via props — no client fetching of docs. ReleaseDownload keeps its live GitHub API fetch (separate feature, user-requested).

**Cutover:** Deploy of the new `/docs` tree = cutover (replaces rev. 2 single-page sidebar). Nav "Docs" → `/docs` (already).

**Displaced Path:** `components/docs/DocsClient.tsx` (state-switched panel) DELETED. `sidebarGroups`/`SidebarItem` exports removed from `lib/docs.ts`. Old top-level tab pages (`/docs` single page) replaced by route tree.

**Value Density:** Smallest slice = tree parser + chapter/topic routes + sidebar; second slice = ON THIS PAGE rail + PREV/NEXT; third slice = landing grid + tooling pages.

**Acceptance Evidence:**
1. `npm run build` + `npm run lint` + `npx tsc --noEmit` green.
2. Route table shows 77 routes: `/docs` (○), `/docs/[chapter]` 6 paths (●), `/docs/[chapter]/[topic]` 62 paths (●), `/docs/cli|install|usage` (○).
3. DOM checks (SSR HTML): sidebar tree (LANGUAGE REFERENCE + TOOLING), breadcrumb, topic `h3 id=` anchors, ON THIS PAGE rail links `#funcoes` etc., PREV/NEXT hrefs, 404 for unknown topic slug.
4. Content is byte-identical to `D:\Lang\SpectraLang` (verify-docs-sync.js).
5. No-runtime-fetch check: grep — no `raw.githubusercontent` and no `fetch(` in `components/docs/`, `app/docs/`, `lib/docs*.ts` (ReleaseDownload excluded).
6. No "The Book"/`docs/book` references.

**Evidence Lane:** build/lint logs, route table, SSR DOM dump, 404 check, screenshots → `docs/goals/docs-page/evidence/`.

**Kill Criteria:**
- `content/docs/` is ONLY ever modified by `scripts/sync-docs.mjs`; hand-edits are a failure.
- Runtime docs fetch is forbidden — content must be build-bundled (SSG).
- No runtime loading/error UI for docs content.
- `docs/book`, `spectra_ebook.pdf` never appear.

**Risk if Wrong:** Slice anchors drifting (mitigated: build fails loudly on missing anchors); heading text ↔ slug mismatch between server parser and client anchor lookup (mitigated: single `lib/slugify.ts` used by both — ids keyed by the same stripped text); duplicated headings within a topic (mitigated: dedupe suffix `-2` in `uniqId`).

**Architecture Slice:**

- Files created:
  - `lib/slugify.ts` — ptPart/stripMdText/stripNumber/slugify/fullSlug/headingNumber + slug overrides
  - `lib/docs-tree.ts` — fence-aware `parseHeadings`, `buildChapter`, `buildDocsTree`, `sliceTopic`, `topicHeadingIds`, `flattenPages`, CLI/quickstart slice readers
  - `components/docs/DocsSidebar.tsx` — client collapsible tree + mobile drawer (tri-state open, no setState-in-effect)
  - `components/docs/OnThisPage.tsx` — client scrollspy rail (IntersectionObserver)
  - `app/docs/layout.tsx` — builds tree once, renders sidebar + content
  - `app/docs/[chapter]/page.tsx` — chapter index (breadcrumb, topic cards, pager)
  - `app/docs/[chapter]/[topic]/page.tsx` — topic page (breadcrumb, markdown slice, ON THIS PAGE, pager)
  - `app/docs/cli/page.tsx`, `app/docs/install/page.tsx`, `app/docs/usage/page.tsx` — tooling pages reusing CliTab/InstallTab/UsageTab
- Files rewritten: `lib/docs.ts` (manifest), `app/docs/page.tsx` (landing grid), `components/docs/Markdown.tsx` (h1–h4 renderers attach `id` from headingIds map)
- Files deleted: `components/docs/DocsClient.tsx`
- Files modified: `components/DocsLinks.tsx` (`<a href="/docs">` → `next/link` Link to satisfy lint)
- Files to avoid: `D:\Lang\SpectraLang` (read-only), `docs/book/*`, `presentation/spectra_ebook.pdf`, any `fetch(` in docs components.
- Source of truth: `D:\Lang\SpectraLang` → synced to `content/docs/` → read at build → SSG.
- Read path: build-time fs read (server pages/layout) → props → client render.
- Write path: none at runtime.

## Tasks (rev. 3)

### T1 — Slug + tree utilities
- Files: `lib/slugify.ts`, `lib/docs-tree.ts`
- Scope: heading parser (fence-aware, ATX only), topic extraction (level-2, skipping Sumário/Exact-width/Índice), slug overrides, slice helpers with build-time asserts.
- Verification: `npx tsc --noEmit`; node script printing the tree.
- Acceptance evidence: 6 chapters, 62 topics, slugs match plan table; `pattern-matching`, `cli`, `option-result` overrides applied; stdlib `std-io`…`std-serve` module slugs; duplicate `std.ml` disambiguated to `std-ml` + `std-ml-ai-ml-runtime`.

### T2 — Manifest rewrite
- Files: `lib/docs.ts`
- Scope: keep referenceFiles (with descriptions), readmeLocalPath, docSliceAnchors; add chapterSlugs + toolingPages. Remove sidebarGroups/SidebarItem.
- Verification: `npx tsc --noEmit`.
- Acceptance evidence: no sidebarGroups references anywhere.

### T3 — Routes
- Files: `app/docs/page.tsx` (landing grid), `app/docs/layout.tsx`, `app/docs/[chapter]/page.tsx`, `app/docs/[chapter]/[topic]/page.tsx`
- Scope: layout builds tree + sidebar; landing lists chapters/tooling; chapter index lists topics; topic page renders slice with anchors + rail + pager. `generateStaticParams` on both dynamic segments; `dynamicParams = false`; `params` awaited (Promise).
- Verification: `npm run build` route table shows 77 routes; SSR DOM checks.
- Acceptance evidence: 77 routes; landing/chapter/topic pages 200.

### T4 — Sidebar tree
- Files: `components/docs/DocsSidebar.tsx`
- Scope: collapsible chapters (active chapter auto-open, user toggles via tri-state), topic links with `aria-current`, TOOLING links, mobile drawer overlay, no setState-in-effect (lint rule).
- Verification: `npm run lint`; SSR shows tree; dev click-through.
- Acceptance evidence: sidebar present on all /docs pages; active topic highlighted.

### T5 — On this page rail
- Files: `components/docs/OnThisPage.tsx`
- Scope: right rail (xl+) with h3/h4 links, IntersectionObserver scrollspy highlight.
- Verification: SSR DOM shows rail links; manual scroll in dev.
- Acceptance evidence: `#funcoes` etc. present on stdlib topics.

### T6 — Markdown anchors
- Files: `components/docs/Markdown.tsx`
- Scope: h1–h4 components attach `id` from a `headingIds` map keyed by stripped heading text (server-computed, matches client flattening).
- Verification: SSR HTML contains `<h3 id="...">` / `<h4 id="...">`.
- Acceptance evidence: anchor ids on all heading levels in topic pages.

### T7 — Tooling pages
- Files: `app/docs/cli/page.tsx`, `app/docs/install/page.tsx`, `app/docs/usage/page.tsx`
- Scope: breadcrumb + title + existing CliTab/InstallTab/UsageTab + pager; slices from build-time readers.
- Verification: `npm run build`; SSR checks for CLI labels, Quick Start, LATEST RELEASE.
- Acceptance evidence: 200 on all three; CLI slice + essentials table present.

### T8 — Cleanup + evidence + deploy
- Files: delete `components/docs/DocsClient.tsx`; update `docs/goals/docs-page/GOAL.md` + `PLAN.md` (this file, rev. 3); evidence/ (route table, DOM dump, 404 check, screenshots 1440/390)
- Scope: lint/tsc/build; start `next start` and curl checks (200s, SSR DOM, 404); deploy `--prod`.
- Verification: all checks pass.
- Acceptance evidence: evidence/ populated; production /docs and topic pages 200.
