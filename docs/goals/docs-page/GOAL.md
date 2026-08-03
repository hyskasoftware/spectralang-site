# Goal: SpectraLang Docs Page (rev. 3 — URL-per-topic, Vercel-style tree)

Use Krypton Execution to execute `docs/goals/docs-page/PLAN.md` (rev. 3).

Core rules:
- ALL docs content is LOCAL: `content/docs/` holds synced copies of the repo's `docs/reference/*.md` + `README.md` (copied by `scripts/sync-docs.mjs`, byte-identical verified). Content is baked into the static build — NO runtime fetching, NO loading/error states.
- Navigation is a SIDEBAR TREE (left rail): LANGUAGE REFERENCE (6 chapters, each expandable into its `##` topics) + TOOLING (USAGE · INSTALLATION · CLI).
- One URL per topic: `/docs` (landing grid) · `/docs/[chapter]` (chapter index) · `/docs/[chapter]/[topic]` (single `##` section, 62 topics) · `/docs/usage` · `/docs/install` · `/docs/cli`. All SSG via `generateStaticParams`, `dynamicParams = false`.
- Each topic page: breadcrumb, title, source label, markdown slice, "ON THIS PAGE" right rail (h3/h4 scrollspy anchors), PREV/NEXT pager over the flattened page chain.
- `lib/docs-tree.ts` derives chapters/topics/subsections from the local markdown headings (fence-aware parser); `lib/slugify.ts` produces PT-part slugs with overrides (`pattern-matching`, `cli`, `option-result`) and stdlib module slugs (`std-io`, `std-ml`, …).
- CLI page = section 5 of local 01-introducao.md + essentials snapshot (labeled); USAGE = local README Quick Start; INSTALLATION reuses live ReleaseDownload.
- DO NOT use `docs/book/*` or `presentation/spectra_ebook.pdf` (outdated ebook, user decision). "The Book" link stays deleted.
- `content/docs/` is ONLY ever modified by the sync script; hand-edits are a failure.
- Truth owner: `D:\Lang\SpectraLang` (read-only). Before writing Next.js code, read the relevant guides in `node_modules/next/dist/docs/` (this Next version has breaking changes — dynamic `params` is a Promise, `generateStaticParams` conventions).
- Acceptance evidence: build/lint/tsc green; 77 static routes (`/docs`, 6 chapters, 62 topics, cli/install/usage); DOM checks (sidebar tree, breadcrumb, heading anchors `id=`, ON THIS PAGE rail, PREV/NEXT, 404 on unknown topic); byte-identity 7/7; zero-fetch grep; screenshots 1440/390 in `docs/goals/docs-page/evidence/`.
- Say "implemented but unproven" if evidence cannot be captured.
