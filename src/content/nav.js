// ─────────────────────────────────────────────────
// GateIn AI — Navigation Content
// ─────────────────────────────────────────────────

export const nav = {
  logo: {
    text: { gate: "Gate", in: "In", ai: "AI" },
    svgPath: "/assets/svg/GateIn-AI-Full-Logo.svg",
    iconPath: "/assets/svg/GateIn-AI-Brand-Icon.svg",
    href: "#home",
  },

  links: [
    { label: "About",     href: "#about" },
    { label: "Markets",   href: "#markets" },
    { label: "Products",  href: "#products" },
    { label: "Resources", href: "#blog" },
    { label: "Contact",   href: "#contact" },
  ],

  cta: {
    label: "Request Demo",
    href: "#contact",
    // AB variant
    variants: {
      a: "Request Demo",
      b: "Get Started",
      c: "See Pricing",
    },
  },

  // Behavior
  blurOnScroll: true,
  scrollThreshold: 50, // px before adding shadow
};
