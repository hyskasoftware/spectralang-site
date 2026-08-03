# SpectraLang Site — Acceptance Evidence

## Evidence captured

| Item | Result | Where |
|---|---|---|
| `npm run build` (production) | PASS — Next 16.2.12, static prerender, routes `/`, `/_not-found`, `/icon.svg` | local build log 2026-08-03 |
| `npm run lint` | PASS — 0 problems | local |
| Production server HTTP 200 | PASS — `http://localhost:3777` returns 200, title/meta/OG present | local prod server |
| Desktop screenshot 1440px | captured | `desktop-1440.png` |
| Mobile screenshot 390px | captured | `mobile-390.png` |
| Byte-identical samples | PASS (3/3) | `verify-samples.js` run (see below) |
| Logo asset hash | PASS — SHA-256 identical to repo source | `assets/logo spectra.svg` == `public/logo.svg` |

## verify-samples.js output

```
OK syntax_quickstart.spectra (468 bytes)
OK tensor_graph_elementwise_fusion.spectra (656 bytes)
OK 00_hello_http.spectra (1541 bytes)
```

## Fact checklist (all must pass)

- [x] Version `0.2.7` matches `tools/spectra-cli/Cargo.toml` — rendered in Nav badge + Footer.
- [x] Pitch line matches README intro — `lib/site.ts` `tagline` is verbatim README line 3.
- [x] AI/ML claims ⊆ README "AI/ML core" section — all 6 points trace to README Key Features.
- [x] API claims ⊆ README "API Platform" section — all 6 points trace to README Key Features.
- [x] CLI commands ⊆ README "CLI Essentials" — all 10 rows verbatim from README table.
- [x] Code samples byte-identical to source `examples/*.spectra` — verified via script (3/3 OK).
- [x] Install instructions match README Installation section — 4 steps verbatim; no invented `cargo install spectralang`.
- [x] Logo assets byte-identical to `D:\Lang\SpectraLang\assets\` — hash-checked.
- [x] Purple palette values trace to logo SVG fills (`#7d4fcd`, `#7e50ce`) — used as `--purple`/`--purple-2` tokens.
- [x] External links point to existing repo paths — doc links use README-referenced paths (`docs/language-reference-alpha.md`, `docs/book`, `docs/api`, `docs/production-ai-implementation-plan.md`, `roadmap/roadmap.toml`).
- [x] Site conveys active-development status per README "Project Status" — hero badge + footer `v0.2.7 / active development`; no production-readiness claims.

## Sample verification note (per PRE review finding #3)

`spectralang check` with CLI 0.2.7 was not run (CLI not installed in this environment). Per the plan's honesty guard, the site does NOT claim the samples compile — the section is titled "REAL CODE, VERBATIM" and states samples are byte-identical to bundled examples, which is verified. If `spectralang check` is run later and fails on any sample, the wording must be revisited.

## Deploy status

DEPLOYED — production live at https://spectralang.vercel.app (2026-08-03).

| Check | Result |
|---|---|
| Vercel production build | PASS — status Ready, target production |
| Production URL | PASS — HTTP 200 |
| Title | PASS — "SpectraLang - AI/ML language and API platform" |
| Version badge v0.2.7 | PASS — rendered in Nav |
| OG url | PASS — points to https://spectralang.vercel.app |
| Status badge | PASS — "[ active development - not yet a stable production language ]" |
| GitHub repo (site) | https://github.com/hyskasoftware/spectralang-site (branch master) |
| GitHub repo (language, corrected) | https://github.com/Hyska-Software/SpectraLang (branch main) — all links, clone commands, footer, and doc links point here; zero `Estevaobonatto` references remaining in production HTML |

Note: `docs/goals/spectralang-site/PLAN.md` and `GOAL.md` still mention the old `Estevaobonatto` URL in two places; the executable truth lives in `lib/site.ts`, which is corrected. Historical references in planning docs are left as recorded evidence of the correction.

Note: deployment was made via Vercel CLI (project `spectralang`, team hyskas-projects). Git integration for auto-deploy on push can be connected from the Vercel dashboard: project spectralang → Settings → Git.
