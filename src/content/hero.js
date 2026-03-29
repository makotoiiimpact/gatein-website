// ─────────────────────────────────────────────────
// GateIn AI — Hero Section Content
// A/B testable. Swap `activeVariant` to switch.
// ─────────────────────────────────────────────────

export const heroContent = {
  activeVariant: "a", // Change to "b" or "c" to test

  variants: {
    // ── Variant A: Cost comparison (default) ──
    a: {
      badge: {
        icon: "dot-green", // pulsing green dot
        text: "NVIDIA Inception Member · Deployed in US & Europe",
      },
      headline: {
        lines: [
          { text: "Your competitors spend ", highlight: false },
          { text: "$2M", highlight: true },
          { text: " on container tracking.", highlight: false },
        ],
        secondLine: [
          { text: "You don't have to.", highlight: false, color: "blue" },
        ],
      },
      subhead:
        "AI-powered OCR that reads container codes, license plates, and chassis numbers at full speed — rain or shine, day or night. 100% edge computing. No cloud dependency. Deployed in weeks, not months.",
      ctaPrimary: {
        label: "Schedule a Demo",
        href: "#contact",
        icon: "arrow-right",
      },
      ctaSecondary: {
        label: "See It In Action",
        href: "#products",
        icon: null,
      },
    },

    // ── Variant B: Pain-first ──
    b: {
      badge: {
        icon: "dot-green",
        text: "Now accepting pilot partners",
      },
      headline: {
        lines: [
          { text: "Stop ", highlight: false },
          { text: "losing containers.", highlight: true },
        ],
        secondLine: [
          { text: "Start tracking them with AI.", highlight: false, color: "blue" },
        ],
      },
      subhead:
        "GateIn AI replaces manual gate logs and spreadsheets with real-time OCR that works in any weather, on any shift — running entirely on edge hardware at your facility.",
      ctaPrimary: {
        label: "Request a Pilot",
        href: "#contact",
        icon: "arrow-right",
      },
      ctaSecondary: {
        label: "Watch 60-Second Demo",
        href: "#demo-video",
        icon: "play",
      },
    },

    // ── Variant C: Question-led ──
    c: {
      badge: {
        icon: "dot-green",
        text: "Deployed in Oakland, CA & Koper, Europe",
      },
      headline: {
        lines: [
          { text: "What if your gate processed trucks in ", highlight: false },
          { text: "2 seconds", highlight: true },
          { text: " instead of 10 minutes?", highlight: false },
        ],
        secondLine: [],
      },
      subhead:
        "GateIn AI uses computer vision to instantly read container codes, license plates, DOT numbers, and chassis IDs — at full speed, in any conditions. No cloud. No manual entry. No mistakes.",
      ctaPrimary: {
        label: "Calculate Your ROI",
        href: "#contact",
        icon: "arrow-right",
      },
      ctaSecondary: {
        label: "Explore Solutions",
        href: "#products",
        icon: null,
      },
    },
  },
};

// ── Stats Bar ──
// Shown below hero copy. Each stat animates on viewport entry.
export const heroStats = {
  activeVariant: "a",

  variants: {
    a: [
      { value: 82,   suffix: "%",  label: "Faster",          color: "blue",   decimals: 0 },
      { value: 99.9, suffix: "%",  label: "Accuracy",        color: "coral",  decimals: 1 },
      { value: 80,   suffix: "%",  label: "Cost Reduction",  color: "orange", decimals: 0 },
      { value: null, display: "24/7", label: "Autonomous",    color: "green",  decimals: 0 },
    ],
    b: [
      { value: 2,    prefix: "< ", suffix: " sec", label: "Per Container",    color: "blue",   decimals: 0 },
      { value: 99.9, suffix: "%",  label: "Accuracy",          color: "coral",  decimals: 1 },
      { value: 1.80, prefix: "$",  suffix: "+",    label: "Saved Per Unit",   color: "orange", decimals: 2 },
      { value: null,  display: "24/7", label: "Works at Night", color: "green",  decimals: 0 },
    ],
  },
};

// ── Hero Visual Slot ──
// Defines which visual component renders on the right side.
export const heroVisual = {
  activeSlot: "3d-container", // "3d-container" | "video" | "image"

  slots: {
    "3d-container": {
      component: "Container3D", // React component name
      props: {
        containerCode: "EGHU 826260-6",
        isoType: "45G1 | 40' HC",
        confidence: 0.997,
        showScanLine: true,
        showDataFeed: true,
        showMetricBadges: true,
      },
    },
    video: {
      component: "HeroVideo",
      props: {
        src: "/assets/video/hero-reel.mp4",       // [VIDEO_SLOT]
        poster: "/assets/images/hero-poster.jpg",  // [IMAGE_SLOT]
        muted: true,
        autoPlay: true,
        loop: true,
        overlayGradient: true,
      },
    },
    image: {
      component: "HeroImage",
      props: {
        src: "/assets/images/hero-container-yard.webp", // [IMAGE_SLOT]
        alt: "AI-powered container tracking at a shipping yard",
        parallax: true,
        overlayGradient: true,
      },
    },
  },
};

// ── Floating Metric Badges ──
// Positioned absolutely over the hero visual
export const heroBadges = [
  {
    icon: "⚡",
    value: "< 2 sec",
    label: "Per Container",
    color: "blue",
    position: { bottom: "42%", left: "-5%" },
    delay: 200,
  },
  {
    icon: "🌧️",
    value: "All Weather",
    label: "Day & Night",
    color: "coral",
    position: { top: "38%", right: "-3%" },
    delay: 400,
  },
];

// ── Data Feed Entries ──
// Seed data for the live data stream component
export const dataFeedConfig = {
  containerCodes: [
    "MSCU 748291-3",
    "EGHU 826260-6",
    "TCLU 509347-1",
    "OOLU 663182-9",
    "CMAU 441256-7",
    "ZIMU 892103-5",
    "HLXU 337864-2",
    "MAEU 115938-8",
  ],
  containerTypes: ["40' HC", "20' STD", "40' STD", "20' REF", "40' REF"],
  statuses: ["GATE IN", "GATE OUT", "VALIDATED", "SCANNED"],
  intervalMs: 2800,
  maxVisible: 5,
};
