// ─────────────────────────────────────────────────
// GateIn AI — Content Module Index
//
// Single import point for all site content.
// Usage:
//   import { heroContent, heroStats, painPointsContent } from './content';
//   import { colors, fonts } from './content';
//
// All copy is externalized here so that:
//   1. Designers/devs never touch content in JSX
//   2. A/B variants swap via `activeVariant` flags
//   3. Future CMS integration has a clear data contract
//   4. Localization (EN → ES for Mexico market) is trivial
// ─────────────────────────────────────────────────

// Brand tokens
export { colors, fonts, fontWeights, fontSizes, spacing, breakpoints, animation, shadows } from './brand';

// Navigation
export { nav } from './nav';

// Hero section (A/B variants + visual slot config)
export { heroContent, heroStats, heroVisual, heroBadges, dataFeedConfig } from './hero';

// Pain Points section
export { painPointsContent } from './painPoints';

// Markets section
export { marketsContent } from './markets';

// Products section
export { productsContent } from './products';

// How It Works section
export { howItWorksContent } from './howItWorks';

// About section (team + story + social proof)
export { aboutContent, socialProofContent } from './about';

// Resources / Blog section
export { resourcesContent } from './resources';

// Contact section (form config + CTA variants)
export { contactContent } from './contact';

// Footer
export { footerContent } from './footer';

// SEO & Analytics
export { seoConfig, analyticsConfig } from './seo';
