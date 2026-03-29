// ─────────────────────────────────────────────────
// GateIn AI — SEO & Meta Configuration
// Page-level meta, OpenGraph, Schema.org markup,
// and keyword strategy.
// ─────────────────────────────────────────────────

export const seoConfig = {
  // ── Primary Page Meta ──
  title: "GateIn AI — AI-Powered Container OCR & Yard Management | Gate Automation",
  titleTemplate: "%s | GateIn AI", // For future multi-page

  description:
    "GateIn AI delivers AI-native container OCR and gate automation for ports, depots, and warehouses. 99% accuracy, 80% cost reduction, 100% edge computing. Deployed in weeks, not months.",

  url: "https://gatein.ai",
  siteName: "GateIn AI",
  locale: "en_US",

  // ── Open Graph ──
  og: {
    title: "GateIn AI — AI-Powered Container OCR & Yard Management",
    description:
      "Transform your container operations with AI-native OCR technology. 99% accuracy, 82% faster gate processing, 100% edge computing.",
    type: "website",
    url: "https://gatein.ai",
    image: "/assets/images/og-image.png",     // [IMAGE_SLOT] 1200x630px
    imageAlt: "GateIn AI — Container OCR and Yard Management System",
    imageWidth: 1200,
    imageHeight: 630,
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    site: "@gatein_ai",    // [CONFIRM] Twitter/X handle
    title: "GateIn AI — AI-Powered Container OCR & Yard Management",
    description:
      "99% accuracy. 80% cost reduction. 100% edge computing. Container tracking that actually works.",
    image: "/assets/images/og-image.png",
  },

  // ── Schema.org Structured Data ──
  schema: {
    software: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "GateIn AI",
      applicationCategory: "BusinessApplication",
      description:
        "AI-powered container OCR and yard management system for logistics automation",
      operatingSystem: "Edge Computing",
      url: "https://gatein.ai",
      offers: {
        "@type": "Offer",
        category: "Subscription",
      },
      creator: {
        "@type": "Organization",
        name: "GateIn AI",
        url: "https://gatein.ai",
      },
    },

    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GateIn AI",
      url: "https://gatein.ai",
      logo: "https://gatein.ai/assets/svg/GateIn-AI-Full-Logo.svg",
      description:
        "AI-native container OCR and yard management for ports, depots, and logistics operations.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@gatein.ai",
        contactType: "sales",
      },
      sameAs: [
        "https://www.linkedin.com/company/gateinai-containertech",
      ],
      // [FUTURE] Add memberOf for NVIDIA Inception
    },
  },

  // ── Target Keywords (for content strategy) ──
  keywords: {
    primary: [
      "container OCR",
      "gate automation",
      "yard management system",
      "container tracking AI",
      "gate operating system",
    ],
    secondary: [
      "container depot software",
      "intermodal terminal technology",
      "AI computer vision logistics",
      "edge computing container tracking",
      "license plate recognition logistics",
      "chassis tracking system",
      "container damage detection AI",
      "yard management automation",
    ],
    longTail: [
      "AI powered container code recognition",
      "automated gate in gate out system",
      "container demurrage tracking software",
      "real time yard visibility platform",
      "OCR for shipping containers",
      "edge AI for logistics operations",
      "container depot digital transformation",
      "automated container damage inspection",
    ],
  },

  // ── Robots & Crawl ──
  robots: "index, follow",
  canonical: "https://gatein.ai",
  // [FUTURE] sitemap: "https://gatein.ai/sitemap.xml",
};

// ── Analytics IDs ──
export const analyticsConfig = {
  gtmId: null,         // [GTM_ID_SLOT] "GTM-XXXXXXX"
  ga4Id: null,         // [GA4_ID_SLOT] "G-XXXXXXXXXX"
  hubspotId: null,     // [HUBSPOT_SLOT]
  hotjarId: null,      // [FUTURE] Heat mapping

  // ── Event Tracking Map ──
  events: {
    ctaClick:          "cta_click",
    formStart:         "form_start",
    formFieldFocus:    "form_field_focus",
    formSubmit:        "form_submit",
    formError:         "form_error",
    scrollDepth:       "scroll_depth",      // 25, 50, 75, 100
    videoPlay:         "video_play",
    videoPause:        "video_pause",
    videoComplete:     "video_complete",
    outboundClick:     "outbound_click",
    abVariantAssign:   "ab_variant_assign",
  },
};
