import type { Metadata } from 'next'
import Script from 'next/script'
import { PostHogProvider } from '@/providers/PostHogProvider'
import './globals.css'

const siteUrl = 'https://gatein.ai'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GateIn AI — AI-Powered Container Intelligence for Ports, Yards & Terminals',
    template: '%s | GateIn AI',
  },
  description:
    'GateIn AI automates gate operations, damage detection, and yard analytics with computer vision. 82% faster gate processing, real-time container tracking, and AI-powered damage assessment for ports, intermodal terminals, warehouses, and 3PLs.',
  keywords: [
    'container OCR',
    'gate automation',
    'AI container inspection',
    'damage detection AI',
    'yard management system',
    'intermodal terminal software',
    'port logistics AI',
    'computer vision logistics',
    'container code recognition',
    'chassis tracking',
    'IICL damage coding',
    'automated gate system',
    'terminal operating system',
    'logistics AI platform',
  ],
  authors: [{ name: 'GateIn AI' }],
  creator: 'GateIn AI',
  publisher: 'GateIn AI',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'GateIn AI',
    title: 'GateIn AI — AI-Powered Container Intelligence',
    description:
      'Automate gate operations, damage detection, and yard analytics with computer vision. Purpose-built AI for ports, terminals, and 3PLs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GateIn AI — AI-Powered Container Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GateIn AI — AI-Powered Container Intelligence',
    description:
      'Automate gate operations, damage detection, and yard analytics with computer vision.',
    images: ['/og-image.png'],
    creator: '@gateinai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GateIn AI',
  url: siteUrl,
  logo: `${siteUrl}/GateIn_AI_Brand_Icon.png`,
  description:
    'AI-powered container intelligence platform for ports, intermodal terminals, warehouses, and 3PLs.',
  sameAs: [
    'https://www.linkedin.com/company/gateinai-containertech/',
    'https://twitter.com/gateinai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'hello@gatein.ai',
    availableLanguage: ['English'],
  },
}

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GateIn AI Platform',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Logistics Software',
  operatingSystem: 'Web-based, Cloud',
  description:
    'AI-powered container intelligence platform with Gate OCR, Yard Analytics, Damage Detection, and Vehicle Manager modules.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '0',
    priceSpecification: {
      '@type': 'PriceSpecification',
      description: 'Contact for enterprise pricing',
    },
  },
  featureList: [
    'AI-powered container code OCR — 82% faster gate processing',
    'Real-time yard analytics with NLP queries',
    'Automated damage detection with IICL coding',
    'Vehicle and personnel tracking across facilities',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GateIn AI',
  url: siteUrl,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="ld-software"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
