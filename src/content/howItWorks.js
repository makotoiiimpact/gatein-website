// ─────────────────────────────────────────────────
// GateIn AI — How It Works Section Content
// 4-step process designed to reduce friction.
// Emphasis: fast, low-risk, no long contracts.
// ─────────────────────────────────────────────────

export const howItWorksContent = {
  sectionTag: "HOW IT WORKS",

  title: {
    text: "Live in",
    highlight: "weeks, not months",
  },

  subtitle:
    "Legacy systems take 3 months and $500K to install. We deploy a working system in under 30 days with zero disruption to your operations.",

  steps: [
    {
      number: 1,
      title: "Discovery Call",
      description:
        "30-minute conversation to assess your yard layout, traffic volume, existing systems, and integration requirements. No commitment.",
      duration: "30 min",
      icon: "phone",
      color: "blue",
    },
    {
      number: 2,
      title: "Site Assessment",
      description:
        "We analyze your gate configuration, lighting conditions, network infrastructure, and traffic patterns to design the optimal camera placement.",
      duration: "1 week",
      icon: "map-pin",
      color: "coral",
    },
    {
      number: 3,
      title: "Deploy & Calibrate",
      description:
        "Camera installation, edge computer setup, and AI model calibration on-site. Your team watches the system work on day one.",
      duration: "2-3 weeks",
      icon: "settings",
      color: "orange",
    },
    {
      number: 4,
      title: "Go Live",
      description:
        "System operational with real-time monitoring, accuracy tracking, and ongoing model optimization. We stay engaged as your operations scale.",
      duration: "Continuous",
      icon: "check-circle",
      color: "green",
      isFinal: true, // Special visual treatment
    },
  ],

  // Bottom trust strip
  trustBadges: [
    {
      icon: "nvidia",
      label: "NVIDIA Inception Program",
      color: "nvidia",
    },
    {
      icon: "globe",
      label: "Deployed in 2 Countries",
      color: "blue",
    },
    {
      icon: "shield",
      label: "100% Edge — Your Data Stays On-Site",
      color: "green",
    },
  ],
};
