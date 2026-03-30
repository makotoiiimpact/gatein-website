import type { Metadata } from 'next'
import { PostHogProvider } from '@/providers/PostHogProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'GateIn AI — AI-Powered Container Intelligence',
  description:
    'Automated container tracking with AI-powered OCR. 82% faster gate processing, 99.7% accuracy, 24/7 all-weather operation.',
  openGraph: {
    title: 'GateIn AI — AI-Powered Container Intelligence',
    description:
      'Automated container tracking with AI-powered OCR. Real-time visibility for every container, every condition, every time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
