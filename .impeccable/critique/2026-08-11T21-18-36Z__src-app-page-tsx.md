---
target: mi portfolio website
total_score: 22
max_score: 32
na_heuristics: 9,10
p0_count: 2
p1_count: 2
timestamp: 2026-08-11T21-18-36Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector evidence, re-run after the first attempt stalled on headless chromium)

## Design Health Score — 22/32 (two heuristics n/a) · Acceptable (69%)

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Project count computed at build; CSS filter hides cards at runtime. Filter to VISIÓN → header still reads "5 PROYECTOS" over one card |
| 2 | Match System / Real World | 3 | Domain register excellent; filter taxonomy is ML model families (VISIÓN/PREDICCIÓN), not the producer's problems (malezas/agua/rinde) |
| 3 | User Control and Freedom | 3 | Filter reversible; all outbound links open `_blank` with no signal, `noopener` without `noreferrer` |
| 4 | Consistency and Standards | 3 | Button language rigorous; markers use different elements (h2 vs p); lone 420px button in a 1080px card |
| 5 | Error Prevention | 3 | Build-time content gate is genuinely strong; still permits a card with neither demoUrl nor repoUrl |
| 6 | Recognition Rather Than Recall | 3 | Legend swatch+label done right; two of three swatches are green at 8×8px |
| 7 | Flexibility and Efficiency | 2 | Not n/a — the page ships an accelerator (CSS filter). Over-built for n=5, above the fold, reports nothing |
| 8 | Aesthetic and Minimalist Design | 3 | Strong restraint, but ~30% of mobile height is information-free hatch |
| 9 | Error Recovery | n/a | No input, no failable state transition, no error surface |
| 10 | Help and Documentation | n/a | 30-second single-scroll surface; NDVI glossed inline at first mention is the correct substitute |

## Audit Health Score — 15/20 (Good)

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | All 11 text pairs pass AA; filter labels ~32px vs 44px target |
| 2 | Performance | 3 | LCP path 104 KB; zero client JS; 186.7 KB framework JS on a page with no events |
| 3 | Theming | 3 | Tokens clean in components; 14 inline off-scale font sizes |
| 4 | Responsive | 3 | 320→1280 no overflow; H1 wraps at 320px; latent empty-grid-cell defect |
| 5 | Implementation Integrity | 3 | Detector 0 findings (canary-verified); `--limite` used against its own token spec |

## Design Specificity Verdict

**Specific in the document, under-expressed in the artifact.**

Product-specific and genuinely inventive: the cadastral grid (shared 1px lines from `gap` over a `--limite` slab, not per-card borders); the soil-survey legend overline; the NDVI ramp declared `in oklch` so it doesn't die in the greys; copy no other product could use.

But the two elements carrying the heaviest product signal are both absent from the render: `public/ndvi-hero.webp` does not exist, and all five bands are hatch placeholders. What remains on screen — warm paper, black display type, mono metadata, outline buttons, hairlines, no radius, no shadow — is a well-executed but recognizable swiss-technical portfolio. The product-specific visual language is currently carried by three 8×8px swatches and the right-hand third of five 4px strips.

**Deterministic scan**: detector returned 0 findings, exit 0, across 5 component files. Validated with a canary file containing known anti-patterns, which correctly triggered `ai-color-palette` — the empty result is real, not a silent no-op. No false positives to adjudicate.

**Visual overlays**: not available. This harness has one-shot headless chromium only (no Playwright/Puppeteer/browser MCP), so live `detect.js` injection was impossible. Evidence is screenshots at 320/390/767/768/1280 plus static analysis.

## Cognitive Load — 4 failures of 8

FAIL single focus (filter interposed before the first project) · PASS chunking · PASS grouping · FAIL visual hierarchy (highest-contrast filled element is the TODAS chip; largest element per card carries least information) · PASS one-thing-at-a-time · FAIL minimal choices (10 targets; 4 of 6 outbound links go to GitHub) · PASS working memory · FAIL progressive disclosure (no scan layer; five identically-expanded cards)

## What's Working

1. **The honesty machinery is real engineering.** Project count derived from `demoUrl`, open-source line derived from `repoUrl`, build gate fails production on any TODO or non-https URL. With all five demos missing the page says "5 PROYECTOS", not "andando". The design principle is compiled into the type system.
2. **The cadastral grid is an invention, not a card grid with a story attached.** Parcels genuinely share edges; degrades correctly to one column at 767px.
3. **The type decision is argued from bytes and the argument holds.** One variable family carries display and body; only Archivo preloaded because it is the LCP element.

## Priority Issues

### [P0] No primary action exists anywhere on the page
All five `demoUrl` are undefined, so zero green-filled buttons render. The contact button uses the identical outline treatment as the four VER CÓDIGO buttons. The system assigned green fill exclusively to `▶ Probalo`, so when demos slip the ranking mechanism doesn't degrade — it disappears. The darkest filled object on the page is the TODAS filter chip.
**Fix**: give the mail button `bg-cultivo text-papel hover:bg-cultivo-profundo`. One green fill returns to the page.

### [P0] The declared proof mechanism is not on the page
`Hero.tsx` self-activates on `public/ndvi-hero.webp`; no `public/` directory exists. DESIGN_SYSTEM.md calls this raster "LA prueba silenciosa"; PRODUCT.md §4 builds the whole strategy on it. Build only warns.
**Fix**: one real GEE export ≤80 KB, or one real Sentinel-2 tile in a single card's `imagen`. One real raster does more than five hatch bands.

### [P1] Placeholder bands are the page's dominant visual mass
≈1,100px of ≈3,600px on mobile. Each caption describes an image that isn't there — "mostrar, no afirmar" arriving through the back door.
**Fix**: make the placeholder branch materially shorter than the real-image branch (`h-[96px]`). Structure and NDVI strip survive; ~500px of nothing disappears.

### [P1] The filter costs more than it returns, and desyncs the only status indicator
Four extra targets and ~90px above the fold at 390px for five items in one scroll; highest-contrast filled element on first paint; labels are ~32px against a 44px touch target; and the count never updates when it filters.
**Fix**: delete the fieldset and the `:has()` rules. Removes the status bug outright and moves the first card ~90px up. If it stays, the count must go.

### [P2] `--limite` used as a full-bleed field, against its own token spec
`page.tsx:80` puts `bg-limite` on a full-viewport wrapper → solid grey-green bands ~100px each side at 1280px. Token table restricts `--limite` to "solo hairlines y bordes de parcela".
**Fix**: move `bg-limite` to the inner 1080px container, or set the outer wrapper to `bg-papel`.

### [P2] The signature element is illegible on its left half
The NDVI ramp starts at `--suelo`; the placeholder hatch is built from `--suelo` and `--limite`. Two independently correct decisions cancel each other — the strip reads as a dark green line fading to nothing. The OG image gives the same ramp 20px and nine stops and it reads beautifully; the page gives it 4px.
**Fix**: start the ramp at `--rastrojo` over placeholders, or thicken to 6px, or shift the first stop off `--suelo`.

### [P2] The last parcel is a dead end
`pronostico-rindes` has neither URL, so it renders no CTA row at all — the last thing seen before the contact ask, with three stack chips backed by no inspectable artifact.
**Fix**: add its `repoUrl`, or reorder so a card with a CTA closes the grid.

### [P2] Latent: an empty grid cell renders as a solid grey block
Verified by isolated repro. Today's five projects tile exactly (1 spanning + 2 + 2) so nothing shows. A sixth project — four are planned in `docs/proyectos-avanzados.md` — puts a grey rectangle in the last row immediately.
**Fix**: `.parcela:last-child:nth-child(odd) { grid-column: span 2 }` or give the grid container `bg-papel` and draw lines per-cell.

## Persona Red Flags

**Productor agropecuario**: every button available says VER CÓDIGO — nothing to look at or try. The one persona who needs to *see* a result gets a mono caption saying the picture is missing. Filter categories are model families, not his problems. No phone/WhatsApp anywhere. Two of three swatches are green at 8×8px.

**CTO / ingeniero AgTech**: evaluates "si las demos andan de verdad" — five projects, zero live demos. Nothing indicates anything was ever deployed. For the persona who explicitly doesn't care whether you can train, the page currently only proves you can train.

**Investigador INTA**: best-served — dataset naming is precise, `Mapa Nacional de Cultivos` chipped as dataset rather than `INTA` as technology. But no method, resolution or temporal window anywhere; no license or citation; and the project nearest his world is the one with no repo.

## Minor Observations

`rel="noopener"` without `noreferrer` on all three outbound links · no new-tab announcement for assistive tech · mail button renders the address uppercased (`MATPIZZOLO@GMAIL.COM`) · section markers use inconsistent elements (h2 vs p) · 14 inline `[0.8rem]`/`[0.72rem]` sizes off the token scale · H1 wraps to three lines at 320px · `SITE_URL` still the placeholder with an open TODO · 9px hatch stripes will moiré at some device pixel ratios.

## Questions to Consider

1. The share image gives the NDVI ramp 20px and nine stops and it reads beautifully. Why is the signature element of the actual page thinner than the decoration on its own preview card?
2. The gradient starts at `--suelo`; the hatch is made of `--suelo`. Two correct decisions taken independently cancel out. What else in the system has this shape?
3. If the hero raster never lands, the declared proof strategy is unimplemented with no fallback. Shouldn't the build fail on the thing the product doc calls "LA prueba", rather than warn?
4. Four of six outbound links go to GitHub. Is VER CÓDIGO on a demo-less card the card's honest state, or just the only button that happened to be available?
5. Does a clever zero-JS filter earn 90px above the fold on the one viewport whose stated metric is what fits in thirty seconds?
