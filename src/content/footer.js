// ─────────────────────────────────────────────────
// GateIn AI — Footer Content
// ─────────────────────────────────────────────────

export const footerContent = {
  logo: {
    text: { gate: "Gate", in: "In", ai: "AI" },
    svgPath: "/assets/svg/GateIn-AI-Full-Logo.svg",
  },

  links: [
    { label: "Home",      href: "#home" },
    { label: "About",     href: "#about" },
    { label: "Markets",   href: "#markets" },
    { label: "Products",  href: "#products" },
    { label: "Resources", href: "#blog" },
    { label: "Contact",   href: "#contact" },
  ],

  // [FUTURE] Expand to multi-column footer with categories
  // columns: [
  //   { title: "Product", links: [...] },
  //   { title: "Company", links: [...] },
  //   { title: "Resources", links: [...] },
  //   { title: "Legal", links: [...] },
  // ],

  social: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/gateinai-containertech",
      label: "Follow us on LinkedIn",
    },
    // [FUTURE] Add Twitter/X, YouTube when active
  ],

  badges: [
    {
      label: "Member of",
      value: "NVIDIA Inception Program",
      color: "nvidia",
    },
  ],

  copyright: `© ${new Date().getFullYear()} GateIn AI. All rights reserved.`,

  // [FUTURE] Legal links
  legal: [
    // { label: "Privacy Policy", href: "/privacy" },
    // { label: "Terms of Service", href: "/terms" },
  ],
};
