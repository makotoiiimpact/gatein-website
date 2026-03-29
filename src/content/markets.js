// ─────────────────────────────────────────────────
// GateIn AI — Markets Section Content
// Target verticals based on Bernardo's go-to-market
// strategy: start small, move upstream.
// ─────────────────────────────────────────────────

export const marketsContent = {
  sectionTag: "INDUSTRIES WE SERVE",

  title: {
    text: "Purpose-built for",
    highlight: "your operations",
  },

  subtitle:
    "From container depots to distribution centers, our AI-native platform adapts to your unique yard management challenges.",

  cards: [
    {
      id: "depots",
      icon: "container",      // Custom or Lucide: "layers"
      title: "Container Depots",
      description:
        "Automate gate-in/gate-out processes for container storage, repair, and repositioning operations. Track empty and full containers with 99% accuracy.",
      benefits: ["Container OCR", "Damage Detection", "Inventory Accuracy"],
      color: "blue",
      priority: 1, // Primary target market
      // [FUTURE] link: "/markets/container-depots"
    },
    {
      id: "intermodal",
      icon: "truck",
      title: "Intermodal Terminals",
      description:
        "Seamlessly manage rail-to-truck and truck-to-rail transfers. Coordinate chassis, containers, and trailers across your intermodal operation.",
      benefits: ["Rail OCR", "Chassis Tracking", "Cross-dock Flow"],
      color: "coral",
      priority: 2,
    },
    {
      id: "warehouse",
      icon: "warehouse",     // Lucide: "package"
      title: "Warehouse & DC Yards",
      description:
        "Accelerate dock door throughput with automated trailer check-in. Reduce dwell time and eliminate manual yard audits at distribution centers.",
      benefits: ["Dock Scheduling", "Trailer Tracking", "WMS Integration"],
      color: "green",
      priority: 3,
    },
    {
      id: "3pl",
      icon: "globe",
      title: "3PL Operations",
      description:
        "Multi-client yard visibility with per-customer reporting. Track SLAs, automate billing reconciliation, and provide real-time data feeds to your clients.",
      benefits: ["Multi-client Visibility", "SLA Tracking", "API Integration"],
      color: "orange",
      priority: 4,
    },
  ],

  // Bottom note — reinforces the small/mid-size positioning
  footnote:
    "We specialize in small and mid-size facilities that legacy vendors ignore. Enterprise-grade accuracy at a fraction of the cost.",
};
