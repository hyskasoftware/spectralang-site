# Goal: SpectraLang Institutional Site

Use Krypton Execution to execute `docs/goals/spectralang-site/PLAN.md`.

Core rules:
- Treat PLAN.md as the source plan.
- Preserve intent, ownership, contract, cutover, evidence, and kill criteria.
- Design: brutalist, purple-centric (palette from logo: `#7d4fcd`, `#7e50ce`, near-black bg), ASCII/terminal style.
- Stack: Next.js (App Router, TypeScript) + Tailwind + Radix UI primitives; deploy on Vercel.
- Truth owner: `D:\Lang\SpectraLang` (READ-ONLY). Version `0.2.7` from `tools/spectra-cli/Cargo.toml`; samples verbatim from `examples/`; logo from `assets/`; facts from README.md.
- Contract boundary: `lib/site.ts` is the ONLY fact holder; components are dumb renderers.
- Before writing Next.js code, read the relevant guides in `node_modules/next/dist/docs/` (this Next version has breaking changes).
- Do not add a new dominant path: site links to repo docs, never duplicates them.
- Capture acceptance evidence from the target perspective: production URL + build green + screenshots 1440px/390px + fact checklist, saved to `docs/goals/spectralang-site/evidence/`.
- Say "implemented but unproven" if that evidence cannot be captured.
- Confirm with user before deploy: GitHub repo URL, custom domain (or default `*.vercel.app`).
