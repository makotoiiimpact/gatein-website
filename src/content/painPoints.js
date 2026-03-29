// ─────────────────────────────────────────────────
// GateIn AI — Pain Points Section Content
// Data sourced from Bernardo's actual customer
// conversations and industry metrics.
// ─────────────────────────────────────────────────

export const painPointsContent = {
  sectionTag: "THE PROBLEM",

  title: {
    text: "The yard is logistics'",
    highlight: "black hole",
  },

  activeVariant: "a",

  variants: {
    a: {
      subtitle:
        "Spreadsheets, handwritten logs, and $300/day demurrage fees. Your containers deserve better than the 1970s.",
    },
    b: {
      subtitle:
        "While the rest of the supply chain went digital, yards got left behind. The cost of that gap is measured in millions.",
    },
  },

  cards: [
    {
      id: "manual-gates",
      icon: "clock",           // Lucide icon name
      title: "7-10 min per truck",
      description:
        "Manual gate processing creates bottlenecks. One slow gate backs up the entire yard during peak hours when 70+ containers need processing.",
      stat: {
        value: "$20K+",
        label: "monthly waste",
        color: "coral",
      },
      // Source: Bernardo conversation — "these guys pay like 10 to 20 thousand
      // dollars per month because they forget that they have the container"
    },
    {
      id: "error-rates",
      icon: "alert-triangle",
      title: "7-30% error rates",
      description:
        "Handwritten logs and rushed data entry during peak volume. Wrong container codes mean lost shipments, billing disputes, and hours of manual reconciliation.",
      stat: {
        value: "30%",
        label: "peak error rate",
        color: "coral",
      },
      // Source: Bernardo — "anything from single digits to 30%"
    },
    {
      id: "demurrage",
      icon: "dollar-sign",
      title: "$300/day demurrage",
      description:
        "Containers sit past their free period because nobody tracks the clock. After 30 days, charges accumulate silently until the invoice shock arrives.",
      stat: {
        value: "$300",
        label: "per container/day",
        color: "coral",
      },
      // Source: Bernardo — "after 30 days they start getting charged
      // 300 dollars per container"
    },
  ],

  // [FUTURE] Add a "Before vs After" comparison toggle
  // beforeAfter: { ... }

  // Optional inline CTA (A/B testable)
  inlineCta: {
    active: false, // Set true to A/B test
    label: "Calculate your losses →",
    href: "#contact",
  },
};
