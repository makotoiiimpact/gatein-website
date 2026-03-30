# GateIn AI: Vite → Next.js 15 Migration + PostHog + Form Capture

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the GateIn AI marketing site from Vite + React to Next.js 15.3+ App Router, integrate PostHog analytics, and wire up the contact form with a server action.

**Architecture:** Single-page marketing site using Next.js App Router. All current components become client components (they use `useState`, `useEffect`, `framer-motion`). PostHog integrated via provider pattern. Contact form submits via Next.js Server Action to Formspree (zero-infrastructure email capture). Static images served from `/public`.

**Tech Stack:** Next.js 15.3+, React 18, TypeScript, Tailwind CSS v3, Framer Motion, Lucide React, PostHog JS SDK, Formspree

---

## File Structure

```
gatein-website/
├── public/
│   ├── GateIn_AI_Brand_Icon.png        (existing)
│   ├── nvidia-inception-program-badge-rgb-for-screen.png (existing)
│   └── favicon.ico                     (new - convert from existing svg)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  (new - root layout with fonts, PostHog)
│   │   ├── page.tsx                    (new - homepage assembling all sections)
│   │   ├── globals.css                 (moved from src/index.css)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts            (new - form submission handler)
│   ├── components/                     (existing - add "use client" directives)
│   │   ├── AllWeather.tsx
│   │   ├── CompetitiveEdge.tsx
│   │   ├── Contact.tsx                 (modify - wire up form with server action)
│   │   ├── Container3D.tsx
│   │   ├── DroneScanVisualization.tsx
│   │   ├── Footer.tsx
│   │   ├── GateScanVisualization.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Navbar.tsx
│   │   ├── PainPoints.tsx
│   │   ├── Products.tsx
│   │   └── Team.tsx
│   └── providers/
│       └── PostHogProvider.tsx          (new - PostHog context provider)
├── next.config.ts                       (new)
├── tailwind.config.ts                   (rewrite for Next.js paths)
├── postcss.config.mjs                   (new)
├── tsconfig.json                        (rewrite for Next.js)
├── package.json                         (rewrite)
├── .env.local                           (new - PostHog keys)
└── .gitignore                           (update for Next.js)
```

---

## Chunk 1: Project Scaffold & Config

### Task 1: Initialize Next.js project config

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Write new `package.json`**

```json
{
  "name": "gatein-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.6.0",
    "lucide-react": "^0.469.0",
    "posthog-js": "^1.205.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.0",
    "@tailwindcss/typography": "^0.5.16",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.3.0"
  }
}
```

- [ ] **Step 2: Write `next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 5: Write `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Write `.env.local`**

```
NEXT_PUBLIC_POSTHOG_KEY=phc_3mvPbPQulDvJAKVAzyP6QxaZutoTwglMyeNeexrYTOO
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

- [ ] **Step 7: Update `.gitignore` for Next.js**

```
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
.env*.local

# debug
npm-debug.log*

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 8: Delete old Vite config files**

Remove: `vite.config.ts`, `vite.config.js`, `eslint.config.js`, `.eslintrc.cjs`, `tsconfig.node.json`, `index.html`

- [ ] **Step 9: Install dependencies**

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project config, remove Vite"
```

---

## Chunk 2: App Shell & PostHog

### Task 2: Create root layout with PostHog

**Files:**
- Create: `src/app/globals.css`
- Create: `src/providers/PostHogProvider.tsx`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Move and adapt `src/index.css` → `src/app/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Plus Jakarta Sans', sans-serif;
    scroll-behavior: smooth;
  }
  body {
    @apply bg-[#0F172A] text-white overflow-x-hidden;
  }
}

@layer utilities {
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
}
```

- [ ] **Step 2: Create `src/providers/PostHogProvider.tsx`**

```tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll capture manually with router events
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
```

- [ ] **Step 3: Create `src/app/layout.tsx`**

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add root layout with PostHog analytics provider"
```

---

## Chunk 3: Migrate Components

### Task 3: Add "use client" to all components and move to `src/components/`

Every component uses `useState`, `useEffect`, `framer-motion`, or event handlers — they all need the `'use client'` directive.

**Files:** All 13 files in `src/components/`

- [ ] **Step 1: Add `'use client'` directive to every component**

Add `'use client'` as the very first line (before any imports) to each of these files:
- `src/components/AllWeather.tsx`
- `src/components/CompetitiveEdge.tsx`
- `src/components/Contact.tsx`
- `src/components/Container3D.tsx`
- `src/components/DroneScanVisualization.tsx`
- `src/components/Footer.tsx`
- `src/components/GateScanVisualization.tsx`
- `src/components/Hero.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/Navbar.tsx`
- `src/components/PainPoints.tsx`
- `src/components/Products.tsx`
- `src/components/Team.tsx`

For each file, the first two lines should be:
```tsx
'use client'

import React from 'react';
// ... rest of imports
```

- [ ] **Step 2: Update image paths in components**

In `Hero.tsx`, `Navbar.tsx`, and `Footer.tsx`, image `src` attributes already use `/` prefix paths (e.g. `/GateIn_AI_Brand_Icon.png`). These work with Next.js `/public` folder — **no changes needed** for basic usage. (Later optimization: convert to `next/image`.)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add 'use client' directives to all components for App Router"
```

### Task 4: Wire up Contact form with API route

**Files:**
- Modify: `src/components/Contact.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create API route `src/app/api/contact/route.ts`**

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, company, email, fleetSize, message } = body

  if (!email || !name) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    )
  }

  // Send to Formspree (replace FORM_ID with actual Formspree form ID)
  // For now, log and return success — swap endpoint when Formspree is set up
  try {
    const formspreeId = process.env.FORMSPREE_FORM_ID
    if (formspreeId) {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          fleetSize,
          message,
          _subject: `GateIn AI Demo Request from ${name} at ${company}`,
        }),
      })
    } else {
      // Fallback: log to console in dev
      console.log('Contact form submission:', { name, company, email, fleetSize, message })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Rewrite `Contact.tsx` with form state and submission**

Replace the existing Contact component with a version that has:
- `useState` for all form fields: `name`, `company`, `email`, `fleetSize`, `message`
- `useState` for `status`: `'idle' | 'submitting' | 'success' | 'error'`
- `handleSubmit` function that POSTs to `/api/contact`
- PostHog event capture on successful submission
- Success/error feedback UI

Key changes to the form JSX:
- Each `<input>` and `<select>` gets `value={field}` and `onChange={(e) => setField(e.target.value)}`
- `<form>` gets `onSubmit={handleSubmit}`
- Button changes from `type="button"` to `type="submit"` with loading/success states
- Add a success message div that shows after submission

```tsx
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import posthog from 'posthog-js';

export function Contact() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [fleetSize, setFleetSize] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, fleetSize, message }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      posthog.capture('demo_requested', { company, fleetSize });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-32 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            See it in action.
          </h2>
          <p className="text-xl text-gray-400">
            <span className="font-mono">30</span>-minute demo. No commitment.
            See GateIn AI tracking containers in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#1E293B] p-8 md:p-10 rounded-lg border border-white/5"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={48} className="text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Demo request sent!</h3>
                <p className="text-gray-400">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="Logistics Corp"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Fleet Size</label>
                    <select
                      value={fleetSize}
                      onChange={(e) => setFleetSize(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors appearance-none"
                    >
                      <option value="">Select size...</option>
                      <option value="1-50">1-50 trucks</option>
                      <option value="51-200">51-200 trucks</option>
                      <option value="200+">200+ trucks</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors resize-none"
                    placeholder="Tell us about your yard challenges..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[#5B7FFF] hover:bg-[#4A6BEE] disabled:opacity-60 text-white px-8 py-4 rounded-md text-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Request a Demo'
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Alternative Contact — same as before */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B] p-8 rounded-lg border border-white/5 h-[calc(50%-12px)] flex flex-col justify-center"
            >
              <div className="w-12 h-12 bg-[#5B7FFF]/10 rounded-lg flex items-center justify-center text-[#5B7FFF] mb-6 border border-[#5B7FFF]/20">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email us directly</h3>
              <a href="mailto:bernardo@gatein.ai" className="text-gray-400 hover:text-white transition-colors">
                bernardo@gatein.ai
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] p-8 rounded-lg border border-white/5 h-[calc(50%-12px)] flex flex-col justify-center"
            >
              <div className="w-12 h-12 bg-[#5B7FFF]/10 rounded-lg flex items-center justify-center text-[#5B7FFF] mb-6 border border-[#5B7FFF]/20">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Book a time</h3>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-medium transition-colors text-left w-full flex justify-between items-center">
                Open Calendar
                <Calendar size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: wire up Contact form with API route and PostHog tracking"
```

---

## Chunk 4: Homepage & Cleanup

### Task 5: Create homepage and remove old entry points

**Files:**
- Create: `src/app/page.tsx`
- Delete: `src/index.tsx`, `src/main.jsx`, `src/App.tsx`, `src/App.jsx`, `src/App.css`
- Delete: `src/components/hero/` (old JSX duplicates)
- Delete: `src/components/sections/` (old JSX duplicates)
- Delete: `src/components/ui/` (old JSX duplicates)
- Delete: `src/content/` (old content files)
- Delete: `src/assets/` (unused)
- Delete: `dist/` (Vite build output)

- [ ] **Step 1: Create `src/app/page.tsx`**

```tsx
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { PainPoints } from '@/components/PainPoints'
import { Container3D } from '@/components/Container3D'
import { Products } from '@/components/Products'
import { HowItWorks } from '@/components/HowItWorks'
import { GateScanVisualization } from '@/components/GateScanVisualization'
import { DroneScanVisualization } from '@/components/DroneScanVisualization'
import { AllWeather } from '@/components/AllWeather'
import { CompetitiveEdge } from '@/components/CompetitiveEdge'
import { Team } from '@/components/Team'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#5B7FFF]/30">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Container3D />
        <Products />
        <HowItWorks />
        <GateScanVisualization />
        <DroneScanVisualization />
        <AllWeather />
        <CompetitiveEdge />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Delete old Vite entry points and duplicate files**

```bash
rm -f src/index.tsx src/main.jsx src/App.tsx src/App.jsx src/App.css
rm -rf src/components/hero/ src/components/sections/ src/components/ui/ src/content/ src/assets/ dist/
rm -f src/index.css  # now at src/app/globals.css
rm -f public/favicon.svg public/icons.svg  # old Vite assets
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Successful Next.js build with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: create Next.js homepage, remove old Vite entry points and duplicates"
```

---

## Chunk 5: Verify & Push

### Task 6: Smoke test and push

- [ ] **Step 1: Run dev server and verify**

```bash
npm run dev
```

Check in browser at `http://localhost:3000`:
- All sections render correctly
- Navbar scrolling behavior works
- Framer Motion animations fire
- Contact form submits (check console for log output)
- PostHog initializes (check Network tab for `us.i.posthog.com` requests)

- [ ] **Step 2: Run production build**

```bash
npm run build && npm run start
```

Verify the production build serves correctly.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 4: (Optional) Connect to Vercel**

If Vercel project exists, it will auto-deploy from GitHub push. If not:

```bash
npx vercel --yes
```

---

## Notes

- **Formspree setup:** Create a form at formspree.io, get the form ID, and add `FORMSPREE_FORM_ID` to `.env.local`. Until then, submissions log to console.
- **PostHog pageview tracking:** The provider has `capture_pageview: false` since this is a single-page site. For multi-page in the future, add a `PostHogPageView` component that captures on route change.
- **next/image optimization:** Not included in this migration to minimize risk. Can be added later by replacing `<img>` tags with `<Image>` from `next/image`.
- **Container3D.tsx:** This file is >10KB of SVG animation. It works as-is with `'use client'` — no changes needed.
