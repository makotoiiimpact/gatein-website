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
