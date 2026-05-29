# GateIn AI Website — Handoff Documentation

Marketing website for GateIn AI. Single-page Next.js app deployed to Vercel, serving the apex domain `gatein.ai`. This document covers what's in the repository, how to run it, what's deployed, and what's worth knowing before making changes.

---

## Stack

- **Framework:** Next.js 15.5.15 (App Router, RSC)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4.17 (default breakpoints)
- **Animation:** framer-motion 12.6.0
- **Icons:** lucide-react
- **Hosting:** Vercel (auto-deploy on push to `main`)
- **Package manager:** npm (has `package-lock.json`)
- **Node:** 20+ recommended

No chart library — all charts (`AnalyticsRow`, `DashboardPreviewRow`) are hand-coded inline SVG with framer-motion for animation. Intentional, to keep bundle size down.

---

## Local Development

```bash
git clone <repo-url>
cd gatein-website
npm install
npm run dev          # localhost:3000
npm run build        # production build
npm run lint         # ESLint
npx tsc --noEmit     # type-check
```

Production bundle as of handoff: 169 KB HTML / 369 kB First Load JS on `/`.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Single-page composition (12 sections + Footer)
│   ├── layout.tsx            # Root layout, metadata, JSON-LD structured data
│   ├── privacy/page.tsx      # Privacy policy page
│   └── resources/            # Resources route (currently unlinked from nav)
├── components/
│   ├── Hero.tsx
│   ├── PainPoints.tsx
│   ├── Products.tsx
│   ├── GateScanVisualization.tsx
│   ├── DroneScanVisualization.tsx
│   ├── HowItWorks.tsx        # Renders DashboardPreviewRow inline
│   ├── DashboardPreviewRow.tsx
│   ├── AllWeather.tsx
│   ├── DamageInspection.tsx  # Renders AnalyticsRow inline
│   ├── AnalyticsRow.tsx
│   ├── Container3D.tsx       # Scroll-pinned 3D container scene
│   ├── CompetitiveEdge.tsx
│   ├── FloatingMarkets.tsx
│   ├── Team.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
public/
├── assets/                   # Images, videos, team headshots
├── og-image.png              # 1200×630 Open Graph preview
├── favicon.ico + icon-*.png  # Favicon set
└── sitemap.xml
```

---

## Page Composition

Current section order in `src/app/page.tsx`:

1. Hero
2. PainPoints
3. Products
4. GateScanVisualization
5. DroneScanVisualization
6. HowItWorks *(contains DashboardPreviewRow)*
7. AllWeather
8. DamageInspection *(contains AnalyticsRow)*
9. CompetitiveEdge
10. FloatingMarkets
11. Team
12. Contact

Footer is rendered outside `<main>`.

**Nav anchors** use `getElementById(id).scrollIntoView()` — order-independent:
- `#products` (Products)
- `#how-it-works` (HowItWorks)
- `#damage` (DamageInspection)
- `#about` (Team)
- `#contact` (Contact)

Reordering sections does not break nav links.

---

## Architecture Notes

### Animation system

Two reveal patterns in use:

1. **Standard reveal** — `useInView({ once: true, amount: 0.3 })` + framer-motion variants with `staggerChildren`. Used in almost every section.
2. **Scroll-pinned scrubbing** — Only in `Container3D.tsx`. Uses `useScroll({ target: sectionRef, offset: ['start start', 'end end'] })` with a `h-[240vh]` outer + `sticky top-0 h-screen` inner. The 3D container scene scrubs through phases as the section scrolls.

`useReducedMotion` is honored in `AnalyticsRow` and `DashboardPreviewRow` — animations short-circuit to static end-state for users with reduced-motion preference.

### Container3D fragility (read before touching)

`Container3D.tsx` uses `useScroll` mapping `scrollYProgress` to opacity/transform windows for phase reveals (Phase 1/2/3 captions, damage labels, etc.). This mapping is empirically fragile — narrow opacity windows (`[0.42, 0.50, 0.62, 0.66]`) can fail to render visibly on different viewport heights because the live progress value doesn't align cleanly with the visual pin position.

**Workaround currently shipped:** widen opacity windows to ~0.05–0.07 progress range (~7–10vh of pin visibility) rather than narrow ~0.04 blinks. Standing rule: any new reveal in this component needs a window ≥ 0.05 progress.

**Deferred refactor:** Re-architect Phase-2 reveals off `scrollYProgress` onto time/intersection-based triggers (e.g., fire sequence on `useInView` of the pinned interior). Scoped as a substantial refactor; not done. See "Known Follow-ups" below.

### Design tokens

No formal design system file. Colors and typography conventions live inline in components, but follow these patterns:

- **Dark sections** (`#0A0F1A`, `#0A1628`): Container3D, DamageInspection
- **Card chrome on dark:** `bg-white/[0.04] border-white/10 rounded-2xl`
- **Brand blue accent:** `#2563EB` — used in eyebrows (PainPoints, CompetitiveEdge), accent borders
- **Severity tokens (bright for dark bg):** `#F87171` (red) / `#FBBF24` (amber) / `#4ADE80` (green)
- **Eyebrow pattern:** `text-sm md:text-base font-bold tracking-[0.2em] text-[#2563EB] uppercase font-mono` — used in PainPoints L85 and CompetitiveEdge L64

### Contact form

Wired to Formspree (form name `contact gatein`). Endpoint URL is in `src/components/Contact.tsx`. **Currently configured on a third-party Formspree account** — see "Access & Account Transfer" below.

---

## Deployment

### Vercel project

- **Project name:** `gatein-website`
- **Production domain:** `gatein.ai`
- **WWW alias:** `[www.gatein.ai](https://www.gatein.ai)` → 308 permanent redirect to apex
- **Branch deploys:** Every branch push gets a preview URL (SSO-gated for non-org members)
- **Production trigger:** Any push to `main` deploys to production automatically

### DNS configuration

DNS managed at Namecheap:

| Record | Type  | Name | Value                  |
|--------|-------|------|------------------------|
| Apex   | A     | @    | 76.76.21.21            |
| WWW    | CNAME | www  | cname.vercel-dns.com   |

Vercel may show "DNS Change Recommended" badges suggesting `216.150.1.1` (apex A) and a project-instance CNAME. These are optional; the current generic records are intentionally more portable and continue to work indefinitely per Vercel's documentation.

### SSL / Certs

Managed by Vercel via Let's Encrypt. Auto-renews. HSTS active (`max-age=63072000`, 2 years). No manual cert management needed.

### Environment variables

No runtime environment variables currently required. The Formspree endpoint is hardcoded in `Contact.tsx` (consider moving to env for the new account — see below).

---

## Access & Account Transfer

These need attention during handoff:

### Formspree

The contact form currently posts to a Formspree endpoint on a previous developer's account. Recommended path: create a new Formspree form on your team's account, update the `action` URL in `src/components/Contact.tsx`, deploy. Old form can then be deactivated.

### Vercel project

Currently in the IIIMPACT Vercel team. Transfer options:
1. **Project transfer** to a new Vercel team owned by GateIn AI
2. **Add team members** to existing IIIMPACT team (interim option)

Project transfer changes deploy URLs (`*-iiimpact-team.vercel.app` → `*-<new-team>.vercel.app`); the production domain `gatein.ai` remains unchanged.

### Domain (Namecheap)

Already on GateIn AI's account. No action needed.

### GitHub repository

Recommend transfer to your GitHub organization. After transfer:
- Update Vercel project's git integration to point at new repo URL
- Any team members with local clones will need to update remote URL

### Analytics

No analytics currently wired. PostHog was evaluated but not installed.

---

## Known Follow-ups

Items deferred from the launch sprint, in rough priority order:

1. **Hover imagery for 3 product tiles** — `Products.tsx` supports section-level background crossfade on tile hover. Currently only `Advanced Yard Analytics` has a hover image (`/public/assets/products/advanced-analytics-hover.png`). Gate and Yard OCR, Damage Detection, and Basic Yard Analytics tiles are missing hover backgrounds.

2. **DroneScanVisualization accessibility gap** — Section has no `<h1>`–`<h6>` and no `aria-label`. Pure visual/SVG component. Recommended fix: add `<h2 className="sr-only">` describing the visualization or section-level `aria-label`.

3. **FloatingMarkets dual-render audit** — Both mobile and desktop heading paths render to DOM regardless of viewport (hide-via-CSS pattern). The substring "global supply chain." appears twice in rendered HTML. Worth confirming whether this affects accessibility tree before considering as bug vs intentional.

4. **JSON-LD `featureList` alignment** — `src/app/layout.tsx` `featureList` was rewritten in the F16 batch to match the 4-tile product structure. Verify after any future Products changes.

5. **Container3D Phase-2 reveal refactor** — Move reveal triggers off `scrollYProgress` onto time/intersection-based triggers for reliability across viewport heights. See "Container3D fragility" above.

6. **Real fleet numbers for AnalyticsRow + DashboardPreviewRow** — Both components currently use mock data. The components are designed for single-file data swap (data arrays at top of file). Bernardo flagged this for follow-up.

7. **F19 chart 1 title style** — `DashboardPreviewRow.tsx` line ~430 reads "Accumulated Detention&Demurrage Total Days Count" (no spaces, literal `&`); chart 2 reads "Accumulated Detention and Demurrage Cost" (spelled "and"). Stylistic inconsistency — recommend harmonizing to chart 2's pattern.

8. **Asset compression pass** — `public/assets/team/anton.jpg` is 386 KB; `bernardo.jpg` is ~6 MB. Both exceed typical headshot ceilings. Compress in a maintenance pass.

9. **Page bytes monitoring** — Production `/` at 169 KB HTML / 369 kB First Load JS. Below the ~250–300 KB threshold where `dynamic({ ssr: false })` lazy-loading of below-fold components (`AnalyticsRow`, `DashboardPreviewRow`) becomes worth considering.

10. **Dependency major-version bumps** — Next 15 → 16, Tailwind 3 → 4, TypeScript 5 → 6 not yet attempted. None blocking.

---

## Component Notes

### `Container3D.tsx`
Scroll-pinned 3D container scene. CSS-3D (not WebGL). The container "explodes" into panels mid-scroll, revealing damage labels. See "Container3D fragility" above before modifying reveal timing.

### `AnalyticsRow.tsx` + `DashboardPreviewRow.tsx`
Inline-SVG chart components. Both use a synchronized 7-second loop pattern (`LOOP_CYCLE = 7s`) with `useReducedMotion` short-circuit. Mock data lives at the top of each file with comment markers for real-data swap.

### `DamageInspection.tsx`
Renders the BEFORE/AFTER damage scan walkthrough. The interactive walkthrough state (hotspots, scan progress) lives in `ContainerDamageWalkthrough.tsx` (child component) — `DamageInspection.tsx` itself is stateless.

### `Products.tsx`
Currently 4 tiles. Section-level background image crossfades on tile hover (not per-tile rendering). Add hover images by populating the `hoverImage` field on the Product object.

### `Formspree integration` (`Contact.tsx`)
Submit handler uses a standard Formspree POST. No client-side validation library — uses native HTML5 validation only.

---

## Contact

For questions during transition, reach out to the previous development team.
