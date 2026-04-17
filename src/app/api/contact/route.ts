import { NextResponse } from 'next/server'

// ─── Rate limit ─── In-memory token bucket keyed by IP.
// 3 submissions per hour per IP. This is per-lambda instance, not global — good enough
// for baseline spam defense on Vercel; graduate to Upstash/KV if abuse persists.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 3
type Bucket = { count: number; windowStart: number }
const buckets = new Map<string, Bucket>()

function rateLimitHit(key: string): { limited: true; retryAfterSec: number } | { limited: false } {
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || now - b.windowStart > RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now })
    return { limited: false }
  }
  if (b.count >= RATE_LIMIT_MAX) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - b.windowStart)
    return { limited: true, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) }
  }
  b.count += 1
  return { limited: false }
}

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

// RFC 5322 pragmatic regex — good enough for server-side validation.
// Rejects obvious malformed input without trying to parse every esoteric valid address.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FACILITY_TYPES = new Set([
  'container-depot',
  'intermodal-terminal',
  'warehouse',
  '3pl',
  'container-port',
  'manufacturing',
  'cold-storage',
  'other',
])

const HELP_TYPES = new Set([
  'schedule-demo',
  'roi-consultation',
  'pilot-program',
  'something-else',
])

const LIMITS = {
  name: { min: 1, max: 100 },
  company: { min: 0, max: 200 },
  email: { min: 3, max: 254 },
  message: { min: 0, max: 4000 },
}

type Errors = Record<string, string>

function validate(body: unknown): { ok: true; data: {
  name: string
  company: string
  email: string
  facilityType: string
  helpType: string
  message: string
} } | { ok: false; errors: Errors } {
  const errors: Errors = {}
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: { _form: 'Invalid payload.' } }
  }
  const b = body as Record<string, unknown>

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const name = str(b.name)
  const company = str(b.company)
  const email = str(b.email).toLowerCase()
  const facilityType = str(b.facilityType)
  const helpType = str(b.helpType)
  const message = str(b.message)

  if (name.length < LIMITS.name.min) errors.name = 'Name is required.'
  if (name.length > LIMITS.name.max) errors.name = `Name too long (max ${LIMITS.name.max}).`

  if (company.length > LIMITS.company.max) errors.company = `Company too long (max ${LIMITS.company.max}).`

  if (email.length < LIMITS.email.min) errors.email = 'Email is required.'
  else if (email.length > LIMITS.email.max) errors.email = 'Email too long.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  if (facilityType && !FACILITY_TYPES.has(facilityType)) {
    errors.facilityType = 'Unknown facility type.'
  }
  if (helpType && !HELP_TYPES.has(helpType)) {
    errors.helpType = 'Unknown help type.'
  }

  if (message.length > LIMITS.message.max) {
    errors.message = `Message too long (max ${LIMITS.message.max}).`
  }

  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, data: { name, company, email, facilityType, helpType, message } }
}

export async function POST(request: Request) {
  // Rate limit first — cheaper than parsing JSON for an abusive client.
  const ip = clientIp(request)
  const rl = rateLimitHit(ip)
  if (rl.limited) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // Honeypot — hidden field a human never fills. Rejects obvious bot submissions.
  if (body && typeof body === 'object' && 'website' in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true })
  }

  const result = validate(body)
  if (!result.ok) {
    return NextResponse.json({ error: 'Validation failed', fields: result.errors }, { status: 400 })
  }
  const { name, company, email, facilityType, helpType, message } = result.data

  try {
    const formspreeId = process.env.FORMSPREE_FORM_ID
    if (formspreeId) {
      const upstream = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          facilityType,
          helpType,
          message,
          _subject: `GateIn AI Demo Request from ${name}${company ? ` at ${company}` : ''}`,
        }),
      })
      if (!upstream.ok) throw new Error(`Formspree returned ${upstream.status}`)
    } else {
      // No FORMSPREE_FORM_ID configured — submission would be lost.
      // Using warn so the noise surfaces in production logs as a config gap.
      console.warn('Contact form submission dropped — FORMSPREE_FORM_ID not set.', {
        name,
        company,
        email,
        facilityType,
        helpType,
        message,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form failed to reach Formspree:', err)
    return NextResponse.json({ error: 'Failed to submit form.' }, { status: 502 })
  }
}
