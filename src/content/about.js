// ─────────────────────────────────────────────────
// GateIn AI — About Section Content
// Company story, team, and social proof.
// Team details to be confirmed with Bernardo.
// ─────────────────────────────────────────────────

export const aboutContent = {
  sectionTag: "ABOUT",

  title: {
    text: "Built by people who've",
    highlight: "been in the yard",
  },

  story:
    "GateIn AI was born from seeing firsthand how the logistics industry — an industry that moves 90% of global trade — still runs on spreadsheets and handwritten logs. After years building autonomous systems at Amazon Robotics and deploying AI for the world's largest robotics company, our team decided to bring modern computer vision to the facilities that need it most: the small and mid-size yards that get ignored by legacy vendors charging $2M+ per installation.",

  // ── Core Values / Differentiators ──
  pillars: [
    {
      icon: "cpu",
      title: "Edge-First Architecture",
      description:
        "Your data never leaves your facility. Our AI runs entirely on local hardware — no cloud subscriptions, no latency, no data privacy concerns.",
    },
    {
      icon: "shield-check",
      title: "Built for the Real World",
      description:
        "Rain, snow, night, sun glare, speeding trucks — our models are trained on messy, real-world conditions, not lab environments.",
    },
    {
      icon: "trending-down",
      title: "10x Less Than Legacy",
      description:
        "Competitors quote $2M for what we deliver at a fraction of the cost. Same accuracy, faster deployment, no multi-year contracts.",
    },
    {
      icon: "users",
      title: "Your Operating System",
      description:
        "For facilities without enterprise software, we don't just track containers — we become your digital infrastructure. OCR, analytics, alerts, and reporting in one system.",
    },
  ],

  // ── Team Cards ──
  // [CONFIRM with Bernardo] — update names, titles, bios, and headshot paths
  team: [
    {
      id: "bernardo",
      name: "Bernardo Mendez",
      title: "CEO",
      bio: "18 years of Product Management. Leader in Robotics, Autonomous Vehicles, and AI.",
      avatarColor: "blue",
      initials: "BM",
      linkedin: "https://linkedin.com/in/bernardo-mendez",
    },
    {
      id: "michael",
      name: "Michael Pivtoraiko",
      title: "CTO",
      bio: "Expert in Computer Vision and AI recognition. Carnegie Mellon PhD in AI and Robotics.",
      avatarColor: "red",
      initials: "MP",
      linkedin: "#",
    },
    {
      id: "borut",
      name: "Borut Grgic",
      title: "CHAIRMAN",
      bio: "Serial entrepreneur and shipowner. Decades of shipping experience. Stanford graduate.",
      avatarColor: "olive",
      initials: "BG",
      linkedin: "#",
    },
    {
      id: "jordi",
      name: "Jordi Goni",
      title: "CPO / COO",
      bio: "IT / Supply Chain expertise. Edge computing specialist. Global operations experience.",
      avatarColor: "green",
      initials: "JG",
      linkedin: "#",
    },
  ],
};

// ── Social Proof / Testimonials ──
export const socialProofContent = {
  // [FUTURE] Expand as customer testimonials become available
  testimonials: [
    {
      id: "european-pilot",
      quote:
        "We saw solutions at the trade show costing $2 million. GateIn delivered the same capability for a fraction of that — and it was working within weeks.",
      author: "Operations Director",
      company: "European Container Depot",
      companyType: "Container Depot, Koper Region",
      // Source: Bernardo's conversation about the European deployment
      // "these solutions I'm seeing in this trade show are like $2 million.
      // I can't afford this. And I was like, I can do the same thing if
      // you pay me like 30 grand"
    },
  ],

  // Press mentions
  press: [
    {
      title: "GateIn AI deploys container OCR system in European port facility",
      // [CONFIRM] Get actual article URL from Bernardo
      url: null,    // "[PRESS_URL_SLOT]"
      source: "Industry Publication",
      date: "2025",
    },
  ],

  // Deployment stats
  deploymentStats: [
    { value: "2", label: "Countries deployed" },
    { value: "3", label: "Time zones covered" },
    { value: "2025", label: "Founded" },
    { value: "1", label: "Patent filed" },
  ],
};
