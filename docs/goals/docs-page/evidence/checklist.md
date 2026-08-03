# Docs Page rev. 3 — Evidence Checklist

Date: 2026-08-03

- [x] `npm run build` green — 77 static routes (landing + 6 chapters + 62 topics + cli/install/usage)
- [x] `npm run lint` green (0 errors)
- [x] `npx tsc --noEmit` green
- [x] Route table: `/docs` ○, `/docs/[chapter]` ● 6 paths, `/docs/[chapter]/[topic]` ● 62 paths, tooling ○
- [x] SSR DOM: sidebar tree (LANGUAGE REFERENCE + TOOLING), breadcrumb, `h3 id=` / `h4 id=` anchors, ON THIS PAGE rail links, PREV/NEXT hrefs
- [x] 404 for unknown topic slug (`/docs/fundamentos/nao-existe` → 404)
- [x] Byte-identity 7/7 (verify-docs-sync.js)
- [x] Zero `fetch(` / `raw.githubusercontent` in docs components/pages/lib
- [x] Zero `docs/book` / `spectra_ebook` references
- [ ] Screenshots 1440px / 390px (pending — visual pass)
- [ ] Production deploy (pending)

## Spot checks (SSR HTML, `next start`)

| Check | Result |
|---|---|
| `/docs` 200 | OK |
| `/docs/introducao` 200 (chapter index) | OK |
| `/docs/fundamentos/comentarios` 200, title + breadcrumb | OK |
| `/docs/fundamentos/variaveis-e-mutabilidade` — `<h3 id="declaracao-de-variaveis">` | OK |
| `/docs/stdlib/std-io` — ON THIS PAGE rail + `#funcoes` + `<h4 id="println-value-any-unit">` | OK |
| `/docs/cli` 200 | OK |
| Unknown topic → 404 | OK |

## Route count

- chapters: introducao (8) · fundamentos (7) · tipos-compostos (9) · avancado (9) · stdlib (16) · referencia-rapida (13) = 62 topics
- tooling: usage · install · cli
