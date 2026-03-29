// ─────────────────────────────────────────────────
// GateIn AI — Products Section Content
// Primary product showcase + secondary product cards
// with status badges and future media slots.
// ─────────────────────────────────────────────────

export const productsContent = {
  sectionTag: "SOLUTIONS",

  title: {
    text: "AI that",
    highlight: "sees, reads, and thinks",
  },

  subtitle:
    "Purpose-built computer vision for container logistics — from gate automation to damage detection to intelligent data reconciliation.",

  // ── Primary Product (large showcase) ──
  primary: {
    id: "gate-ocr",
    title: "Gate-In / Gate-Out OCR",
    tagline: "Read every container. Miss nothing.",
    description:
      "Cameras + edge AI that reads container codes, license plates, DOT numbers, and chassis IDs — without trucks stopping. Works day, night, rain, or shine.",

    // [VIDEO_SLOT] — embed product demo video when available
    media: {
      type: "placeholder", // "video" | "image" | "placeholder"
      src: null,           // "/assets/video/gate-ocr-demo.mp4"
      poster: null,        // "/assets/images/gate-ocr-poster.jpg"
      alt: "GateIn AI OCR system reading container codes in real-time",
    },

    specs: [
      { icon: "zap",         label: "< 2 seconds per container" },
      { icon: "target",      label: "99.9% character accuracy" },
      { icon: "gauge",       label: "Works up to 10 km/h pass-through" },
      { icon: "cloud-off",   label: "100% edge processing — no cloud" },
      { icon: "package",     label: "Plug and play hardware kit" },
      { icon: "wifi",        label: "Optional Starlink connectivity" },
    ],

    captures: [
      "Container serial numbers (ISO 6346)",
      "License plates (multi-region)",
      "DOT numbers",
      "Chassis numbers",
      "Container type & size (20', 40', HC)",
      "Truck identification",
    ],

    cta: {
      label: "See Gate OCR in Action",
      href: "#contact",
    },
  },

  // ── Secondary Products (card grid) ──
  secondary: [
    {
      id: "damage-detection",
      title: "Container Damage Detection",
      status: "coming-soon",      // "active" | "coming-soon" | "in-development"
      statusLabel: "Coming Soon",
      description:
        "AI-powered visual inspection that identifies dents, corrosion, structural damage, and seal integrity — replacing 7-minute manual assessments with consistent, automated reporting.",
      icon: "shield-check",
      color: "coral",
      // Source: Bernardo — this is the Abu Dhabi pilot offering
      // "it takes me like seven minutes to do this and it's all
      // over the place because everybody assesses damage differently"
    },
    {
      id: "yard-analytics",
      title: "Yard Analytics Dashboard",
      status: "active",
      statusLabel: "Active",
      description:
        "Real-time container inventory, dwell time tracking, demurrage countdown alerts, and operational metrics. Delivered via web dashboard or daily spreadsheet export.",
      icon: "bar-chart-2",
      color: "blue",
    },
    {
      id: "data-reconciliation",
      title: "Data Reconciliation Agent",
      status: "in-development",
      statusLabel: "In Development",
      description:
        "AI agent that cross-references OCR captures against your existing database to surface discrepancies — comparing ground truth images to stored records and flagging errors automatically.",
      icon: "git-compare",
      color: "orange",
      // Source: Bernardo — "every time I query it with the agent,
      // I'm going to compare it to the actual ground truth, to the
      // physical truth that I have in these images"
    },
  ],

  // ── Integration Partners ──
  integrations: {
    sectionTitle: "Plays Nice With Your Stack",
    items: [
      { name: "SAP",          category: "ERP" },
      { name: "Oracle",       category: "ERP" },
      { name: "Navis N4",     category: "TOS" },
      { name: "Custom API",   category: "REST/Webhook" },
    ],
    note: "Don't see your system? We integrate via REST API, CSV export, or direct database connection.",
  },
};
