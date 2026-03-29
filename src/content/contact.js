// ─────────────────────────────────────────────────
// GateIn AI — Contact Section Content
// Form configuration, CTA variants, and process.
// ─────────────────────────────────────────────────

export const contactContent = {
  sectionTag: "GET STARTED",

  title: {
    text: "See GateIn AI in",
    highlight: "your yard",
  },

  subtitle:
    "Whether you're managing 50 containers or 5,000 — we'll show you exactly how GateIn AI fits your operation and what ROI to expect.",

  // ── Contact Info ──
  info: {
    email: "info@gatein.ai",
    location: "Seattle, WA, USA",
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/gateinai-containertech",
    },
  },

  nextSteps: [
    { number: 1, title: "Discovery call", text: "Understanding your specific operational bottlenecks and yard throughput goals." },
    { number: 2, title: "ROI analysis", text: "Financial modeling of potential labor savings and terminal efficiency gains." },
    { number: 3, title: "Proof of value", text: "Limited trial deployment to validate AI accuracy in your unique environment." },
    { number: 4, title: "Go live", text: "Seamless integration with your TOS and full-scale deployment across your fleet." },
  ],

  // ── Form Configuration ──
  form: {
    // Submission endpoint — swap for production
    action: "https://formspree.io/f/[FORM_ID]", // [FORM_ENDPOINT_SLOT]
    method: "POST",

    fields: [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "John",
        required: true,
        halfWidth: true, // Side-by-side with lastName
      },
      {
        id: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Smith",
        required: true,
        halfWidth: true,
      },
      {
        id: "email",
        type: "email",
        label: "Business Email",
        placeholder: "john@company.com",
        required: true,
        halfWidth: false,
      },
      {
        id: "company",
        type: "text",
        label: "Company",
        placeholder: "Your Company",
        required: true,
        halfWidth: false,
      },
      {
        id: "facilityType",
        type: "select",
        label: "Facility Type",
        required: false,
        halfWidth: false,
        options: [
          { value: "",              label: "Select facility type" },
          { value: "depot",         label: "Container Depot" },
          { value: "intermodal",    label: "Intermodal Terminal" },
          { value: "warehouse",     label: "Warehouse / Distribution Center" },
          { value: "3pl",           label: "3PL Operation" },
          { value: "port",          label: "Container Port" },
          { value: "manufacturing", label: "Manufacturing Facility" },
          { value: "cold",          label: "Refrigerated / Cold Storage" },
          { value: "other",         label: "Other" },
        ],
      },
      {
        id: "interest",
        type: "select",
        label: "How can we help?",
        required: false,
        halfWidth: false,
        options: [
          { value: "",       label: "Select an option" },
          { value: "demo",   label: "Schedule a demo" },
          { value: "roi",    label: "ROI consultation" },
          { value: "pilot",  label: "Discuss pilot program" },
          { value: "other",  label: "Something else" },
        ],
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Tell us about your operations and challenges...",
        required: false,
        halfWidth: false,
        rows: 3,
      },
    ],

    // ── Submit Button (A/B testable) ──
    submit: {
      activeVariant: "a",
      variants: {
        a: { label: "Submit Request",       icon: "arrow-right" },
        b: { label: "Get My ROI Analysis",  icon: "bar-chart" },
        c: { label: "Book My Demo",         icon: "calendar" },
      },
    },

    disclaimer:
      "By submitting, you agree to receive communications from GateIn AI.",

    // Success / error messages
    successMessage: {
      title: "We received your request!",
      body: "Our team will reach out within 1 business day to schedule your discovery call.",
    },
    errorMessage: {
      title: "Something went wrong",
      body: "Please try again or email us directly at info@gatein.ai.",
    },
  },

  // ── Short Form Variant (A/B test) ──
  // Set `activeFormVariant` to "short" to test minimal form
  activeFormVariant: "full", // "full" | "short"

  shortForm: {
    fields: [
      {
        id: "email",
        type: "email",
        label: "Business Email",
        placeholder: "john@company.com",
        required: true,
      },
      {
        id: "company",
        type: "text",
        label: "Company",
        placeholder: "Your Company",
        required: true,
      },
    ],
    submit: {
      label: "Get Started →",
    },
    note: "We'll follow up within 24 hours to schedule your demo.",
  },
};
