// ─────────────────────────────────────────────────
// GateIn AI — Brand Tokens
// Single source of truth for colors, typography,
// spacing, breakpoints, and animation config.
// ─────────────────────────────────────────────────

export const colors = {
  // Primary
  blue:          "#5B7FFF",
  blueDark:      "#3D5BD9",
  blueLight:     "#E8EDFF",
  blueMuted:     "#829AF2",

  // Accent
  coral:         "#FF7F6E",
  coralDark:     "#E8614E",
  coralLight:    "#FFE8E5",
  orange:        "#F97316",
  orangeLight:   "#FFF3E8",
  yellow:        "#FBBF24",
  yellowLight:   "#FEF3C7",

  // Status
  green:         "#22C55E",
  greenLight:    "#DCFCE7",
  red:           "#EF4444",
  redLight:      "#FEE2E2",

  // Partner
  nvidia:        "#76B900",

  // Neutrals
  white:         "#FFFFFF",
  gray50:        "#F9FAFB",
  gray100:       "#F3F4F6",
  gray200:       "#E5E7EB",
  gray300:       "#D1D5DB",
  gray400:       "#9CA3AF",
  gray500:       "#6B7280",
  gray600:       "#4B5563",
  gray700:       "#374151",
  gray800:       "#1F2937",
  gray900:       "#111827",
  black:         "#000000",
};

export const fonts = {
  heading: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body:    "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono:    "'JetBrains Mono', 'Courier New', monospace",
};

export const fontWeights = {
  light:    300,
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
  extrabold: 800,
};

export const fontSizes = {
  xs:    "0.75rem",   // 12px
  sm:    "0.85rem",   // 13.6px
  base:  "1rem",      // 16px
  md:    "1.0625rem", // 17px
  lg:    "1.125rem",  // 18px
  xl:    "1.25rem",   // 20px
  "2xl": "1.5rem",    // 24px
  "3xl": "1.75rem",   // 28px
  "4xl": "2.5rem",    // 40px
  "5xl": "3.25rem",   // 52px
  "6xl": "4rem",      // 64px
};

export const spacing = {
  sectionPadding:    "100px 40px",
  sectionPaddingMob: "64px 20px",
  containerMax:      "1280px",
  cardPadding:       "28px",
  cardRadius:        "16px",
  buttonRadius:      "10px",
  badgeRadius:       "50px",
  navHeight:         "64px",
};

export const breakpoints = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  xxl: "1536px",
};

export const animation = {
  // Reveal animation defaults
  revealDuration:  "0.8s",
  revealEasing:    "cubic-bezier(0.16, 1, 0.3, 1)",
  revealDistance:   30, // px translateY
  staggerDelay:    100, // ms between siblings

  // Hover
  hoverLift:       "translateY(-4px)",
  hoverDuration:   "0.3s",
  hoverShadow:     "0 10px 40px rgba(0, 0, 0, 0.08)",

  // Hero load sequence (ms)
  heroSequence: {
    nav:       0,
    badge:     100,
    headline:  250,
    subhead:   400,
    ctas:      500,
    stats:     650,
    visual:    300, // parallel
    badges:    800,
    dataFeed:  1200,
  },

  // Count-up
  countUpDuration: 2000,
  countUpEasing:   "cubic-bezier(0.16, 1, 0.3, 1)",
};

export const shadows = {
  sm:    "0 1px 3px rgba(0, 0, 0, 0.04)",
  md:    "0 4px 20px rgba(0, 0, 0, 0.08)",
  lg:    "0 10px 40px rgba(0, 0, 0, 0.08)",
  xl:    "0 25px 60px rgba(0, 0, 0, 0.12)",
  blue:  "0 4px 20px rgba(91, 127, 255, 0.3)",
  coral: "0 4px 20px rgba(255, 127, 110, 0.3)",
};
