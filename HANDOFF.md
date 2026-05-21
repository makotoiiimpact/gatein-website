# HANDOFF — gatein-website (session continuation)

Written at the end of a long working session so a fresh Claude Code session can pick up productively without dragging the full transcript. Read this on cold start.

---

## Current state (as of handoff)

- **Local branch:** `main` @ `d391a4d` (the latest merge commit)
- **`main` deployed live** on the Vercel project URL: <https://gatein-website.vercel.app> — HTTP 200, all latest content verified live.
- **Brand domain `gatein.ai` is NOT yet on Vercel** — currently still served by Squarespace (`server: Squarespace`). Vercel has `gatein.ai` configured as an alias for the project, but DNS A/CNAME records still point at Squarespace. The DNS cutover is the pending operational step before the public brand domain reflects this build.
- **Feature branch preserved:** `feature/post-merge-polish` @ `c8f4ace` (local + remote, intentionally not deleted as a safety reference).
- **Previous feature branch also preserved:** `feature/journey-map-highlight` @ `d4d6db4`.
- **Untracked working-tree assets in `public/`** (intentionally not shipped — confirmed by user before last merge):
  - `Container_Detection_MX.mp4`
  - `Damage_DPLink_11112025.mp4`
  - `Damage_Hadron_Snapshot_4_29_2026.jpg`
  - Likely staged for upcoming swaps; no code references yet.

## Vercel project IDs (handy for MCP queries)

- `projectId`: `prj_K26iAQyWV5woWnqY7pxL1LrTS5Qe`
- `teamId`: `team_FrD51IbNKzsPKndw8OuvZZmH`
- Project: `gatein-website`, default branch `main`, framework Next.js, region `iad1`
- No branch protection on `main`.

## What landed in the last two merges to main

**`fc8fe2b` — pre-launch polish bundle (17 commits)**
- Container3D animation hardening, AfterScanDashboard introduction, HowItWorks micro-animations, mobile responsiveness, scan timing tune.

**`d391a4d` — post-merge polish bundle (6 commits, Bernardo round 2)**
- `3f6d70c` Pill "After · GateIn AI" → **"SOLUTION · GateIn AI"** (brand mixed-case via `<span className="normal-case">`); desktop sub-copy `max-w-md` → `max-w-md md:max-w-2xl`.
- `06670e7` Container3D scene wrapper `md:mt-[8vh] → [14vh]`.
- `87ff52b` Container3D scene wrapper `md:mt-[14vh] → [26vh]`.
- `d60e206` AllWeather first card (`day-scan.mp4` portrait 540×960) → per-condition `objectPosition`, DAY = `object-bottom` so plate/chassis/code captures stay in frame.
- `0eb6e0d` `<Products />` moved to immediately after `<PainPoints />` (challenges → solutions adjacency, Bernardo #1).
- `c8f4ace` AfterScanDashboard — "Container Data at This Point" left column removed (Bernardo #3); collapsed to single centered "Systems in Use" column + stat row.

## Open QA carry-overs (deferred to user device QA)

1. **1280×800 Container3D Act-2 explode vs Phase-2 caption.** `md:mt-[26vh]` is well past a5c2435's `<16vh` safety threshold; unexploded scene clearance is only 68px. Geometry says the explode likely crowds the y752 caption — not scrub-verifiable in harness. If it crowds, the honest fix is the re-architecture ticket below, not another vh tweak.
2. **day-scan.mp4 playback** — bottom captures (plate/chassis/EGHU code) visible during playback at desktop + mobile? Frame-content judgment, requires real-device viewing.
3. **AfterScanDashboard single-column visual balance** — Systems-in-Use alone in `max-w-2xl mx-auto` + 4-stat row below. User accepted the "half-gutted" tradeoff; eyeball whether it reads right.

## Post-launch tickets (filed, not blocking)

**Re-architect Container3D vertical layout** (filed durably in `87ff52b` commit body). Three structural costs making every spacing iteration painful:
1. Scene is a center-aligned flex child → `margin-top` shifts it only `≈Δ/2` (flex-halving). Every spacing iteration costs 2× the class delta and is unverifiable except by eye.
2. Sub-copy→scene gap formula `gap(px) = (H/2)·(1+v/100) − 354` double-counts viewport height → cannot decouple "gap at 1280×800" from tall-viewport inflation or Act-2 explode/caption clearance. `px-per-class-vh = H/200`.
3. Phase-2/3 reveals are scroll-progress-gated on a fragile pinned mapping (documented across the Issue-7/9/10 rounds).

Scope: replace flex-center + vh-mt with explicit grid/flow rhythm; move reveals off scroll-gating to intersection/time triggers.

## Known/parked work (Bernardo round 2, not started)

- **Products section tiles** — Bernardo wants Vehicle Manager dropped and Basic/Advanced Analytics tiles added (separate ticket).
- **Products section heading** — Bernardo reframing as solutions-mapping (separate ticket).
- **"Request a Demo" CTA** — keep as-is.

## Working conventions that worked well this session

- **User gates destructive/prod actions explicitly.** Don't merge to main, push to main, force-anything, or delete branches without an unambiguous greenlight in that turn. Surface scope/ancestry/conflict state before destructive ops.
- **Pre-merge state surfacing.** Before any merge to main, surface: commit count to merge, ancestry (strict-ancestor of feature?), untracked files in working tree (last merge caught 3 unexpected assets this way), branch-protection state. Last cycle the user's "5 commits" mental model differed from the actual 17 — pre-flight catches that before mutation.
- **Diagnose → argue → STOP for sanity check (when explicitly requested) → implement → verify → commit.** Don't pick the middle default — argue the call when asked. The user values terse-but-rigorous diagnostic blocks with file:line citations.
- **Single descriptive commits, no squash, additive on feature branches.** `--no-ff` merge commits to preserve granular history.
- **Push-back conditions** the user expects me to honor: scope ambiguity, premise contradicting reality (e.g., "the video element" when the named scene is CSS/SVG), shared-component/parent risk, breakpoint/viewport regressions, untracked state drift, anchor/nav linkage risk, theme/bg inherited-context clash.

## Harness limitations to remember (so the next session doesn't re-discover them)

- **framer-motion `scrollYProgress` does NOT settle on synthetic `scrollTo`** in Claude Preview eval, even across separate eval round-trips. Scroll-scrubbed framer states (explode progress, scan grid opacity, Phase-2/3 reveal opacities) are NOT trustworthy in-harness. Reason from the source instead.
- **`preview_screenshot` is inconsistent here** — sometimes returns full-page fit (entire tall scrollable doc scaled into one image, content tiny), sometimes blank. Don't rely on it for viewport-level visual judgments. Fall back to `preview_eval` DOM measurement.
- **DOM eval IS reliable** for static layout: widths, wraps, computed `object-position` / `object-fit`, computed `marginTop`, section render order, presence of text/elements, no horizontal overflow, etc. Use it freely.
- **`vercel ls` in non-TTY** strips status columns — its plain output is unparseable for status checking. Use the **Vercel MCP** (`list_deployments` / `get_deployment`) for structured deploy state — that IS reliable.
- **Deterministic math is the strongest verification channel** for things like Container3D timing (`useTransform` = exact linear interpolation between stops) and the gap formula above.

## Useful facts derived during the session

- **Container3D scene wrapper** is `mt-[30vh] sm:mt-[16vh] md:mt-[26vh] scale-[0.5] sm:scale-[0.7] md:scale-100 lg:scale-[1.8] xl:scale-[2] transition-transform`. Mobile and sm spacing intentionally byte-protected across all spacing iterations.
- **Container3D pin:** `<section className="relative h-[240vh] bg-[#0A0F1A]">` with `<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">`; `useScroll({ target: sectionRef, offset: ['start start', 'end end'] })` → scrubbable scroll range = `sectionHeight − viewportHeight` (NOT sectionHeight); progress 0→1 maps over that range.
- **Container3D Phase-2 caption** sits at `bottom-12` → baseline y = (sticky bottom − 48) = y752 @ 1280×800.
- **Section headers in current page render order** (post `0eb6e0d` reorder): Hero → PainPoints → Products → DamageInspection → Container3D → AfterScanDashboard → HowItWorks → GateScanVisualization → DroneScanVisualization → AllWeather → CompetitiveEdge → FloatingMarkets → Team → Contact → Footer.
- **Sections with `id`** (for nav anchors): `#products` (Products), `#damage` (DamageInspection), `#how-it-works` (HowItWorks), `#about` (Team), `#contact` (Contact). Nav uses `getElementById(id).scrollIntoView()` → order-independent; reordering doesn't break anchors.
- **Stack:** Next 15.3, Tailwind v3.4.17 (default breakpoints), framer-motion ^12.6.0, React, TypeScript strict, **npm** (has `package-lock.json` — not pnpm despite session prompts sometimes saying so).

## How to actually use this file in the new session

The new session won't auto-read this. Either:
1. **First message in the new session:** "Read `HANDOFF.md` then await my next instruction." Cheap and explicit.
2. **Permanent:** add a line to `CLAUDE.md` like `Read HANDOFF.md at session start for current-state continuity.` so future sessions pick it up automatically.

Last commit: `d391a4d` on `main`, live on the Vercel URL (not yet on `gatein.ai`).
