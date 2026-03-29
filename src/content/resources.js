// ─────────────────────────────────────────────────
// GateIn AI — Resources / Blog Section Content
// Placeholder structure for articles, press, and
// downloadable content as it becomes available.
// ─────────────────────────────────────────────────

export const resourcesContent = {
  sectionTag: "RESOURCES",

  title: {
    text: "Insights from the",
    highlight: "container yard",
  },

  subtitle:
    "Research, industry analysis, and practical guides for modernizing your yard operations.",

  // ── Blog / Article Cards ──
  // [FUTURE] Connect to headless CMS or populate from markdown
  articles: [
    {
      id: "article-1",
      title: "Why 90% of Container Yards Still Run on Spreadsheets",
      excerpt:
        "The logistics industry moves $14 trillion in goods annually — yet the yard remains the most analog link in the chain. Here's why that's changing.",
      category: "Industry",
      categoryColor: "blue",
      date: "March 2026",
      readTime: "5 min",
      image: null, // [IMAGE_SLOT] "/assets/images/blog/spreadsheets.webp"
      href: null,  // [LINK_SLOT] "/blog/why-yards-use-spreadsheets"
      featured: true,
    },
    {
      id: "article-2",
      title: "Edge Computing vs Cloud: Why Your Yard Data Should Stay On-Site",
      excerpt:
        "When every millisecond counts at the gate, sending data to the cloud and back isn't just slow — it's a security risk your customers won't accept.",
      category: "Technology",
      categoryColor: "coral",
      date: "February 2026",
      readTime: "4 min",
      image: null,
      href: null,
      featured: false,
    },
    {
      id: "article-3",
      title: "The Hidden Cost of Container Demurrage: A $300/Day Problem",
      excerpt:
        "Most depot operators don't realize they're bleeding money on detention and demurrage fees until the quarterly invoice arrives. Here's how to stop it.",
      category: "ROI",
      categoryColor: "orange",
      date: "January 2026",
      readTime: "6 min",
      image: null,
      href: null,
      featured: false,
    },
  ],

  // ── Downloadable Resources / Lead Magnets ──
  // [FUTURE] Gated content for email capture
  downloads: [
    {
      id: "roi-calculator",
      title: "ROI Calculator: Container OCR for Your Yard",
      description: "Input your volume, error rate, and demurrage costs — get an instant savings estimate.",
      type: "calculator",
      icon: "calculator",
      href: null,       // [GATED_CONTENT_SLOT]
      gated: true,      // Requires email to access
    },
    {
      id: "buyers-guide",
      title: "Buyer's Guide: Choosing a Yard Management System",
      description: "Compare legacy TOS, cloud YMS, and AI-native solutions for your operation size.",
      type: "pdf",
      icon: "file-text",
      href: null,
      gated: true,
    },
  ],

  // ── Press Mentions ──
  press: [
    {
      source: "Industry Publication",
      title: "GateIn AI deploys AI-powered OCR at European container facility",
      url: null,  // [PRESS_URL_SLOT]
      date: "2025",
    },
  ],

  // Bottom CTA
  cta: {
    label: "View All Resources",
    href: "/blog", // [FUTURE] multi-page
  },
};
