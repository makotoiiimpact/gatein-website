export interface Resource {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  url: string | null
}

export const resources: Resource[] = [
  {
    title: 'Edge Computing vs Cloud: Why On-Premises AI Matters for Yard Operations',
    excerpt: 'Exploring data privacy, latency, and operational independence benefits of edge-based container OCR systems.',
    category: 'Technology',
    date: 'January 2026',
    readTime: '5 min read',
    url: null,
  },
  {
    title: 'The Future of Gate Automation: From Manual Check-ins to Unmanned Operations',
    excerpt: 'How AI computer vision is transforming gate processing times from 7-10 minutes to under 2 minutes.',
    category: 'Industry',
    date: 'January 2026',
    readTime: '7 min read',
    url: null,
  },
  {
    title: 'ROI Calculator: Measuring the Impact of Automated Container Tracking',
    excerpt: 'A practical framework for calculating cost savings from detention fee reduction, labor optimization, and throughput gains.',
    category: 'Guide',
    date: 'December 2025',
    readTime: '10 min read',
    url: null,
  },
  {
    title: 'Container Damage Detection: How AI Reduces Disputes and Insurance Claims',
    excerpt: 'Automated 360-degree inspection catches damage at the gate, creating timestamped evidence that eliminates costly disputes.',
    category: 'Technology',
    date: 'December 2025',
    readTime: '6 min read',
    url: null,
  },
  {
    title: 'Yard Management in 2026: Trends Reshaping Container Logistics',
    excerpt: 'From autonomous vehicles to predictive analytics, the technologies that are redefining yard efficiency.',
    category: 'Industry',
    date: 'November 2025',
    readTime: '8 min read',
    url: null,
  },
  {
    title: 'Getting Started with GateIn AI: Implementation Guide',
    excerpt: 'A step-by-step guide to deploying AI-powered container tracking at your facility, from hardware setup to go-live.',
    category: 'Guide',
    date: 'November 2025',
    readTime: '12 min read',
    url: null,
  },
]

export const categoryColors: Record<string, string> = {
  Technology: 'bg-[#5B7FFF]/10 text-[#5B7FFF] border-[#5B7FFF]/20',
  Industry: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Guide: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Case Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}
