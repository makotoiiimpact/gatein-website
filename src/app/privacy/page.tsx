import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How GateIn AI, Inc. collects, uses, and protects information submitted through our website and demo request forms.',
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = 'April 2026'
const COMPANY = 'GateIn AI, Inc.'
const CONTACT_EMAIL = 'websitecontactus@gatein.ai'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#2563EB]/30">
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 text-gray-200">
          <header className="mb-12">
            <span className="text-[#2563EB] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 font-mono">Effective: {EFFECTIVE_DATE}</p>
          </header>

          <p className="text-gray-300 leading-relaxed mb-10">
            {COMPANY} (&ldquo;GateIn AI,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your
            privacy. This policy explains what information we collect when you visit our website
            or request a demo, how we use it, and the choices you have.
          </p>

          <Section title="Information We Collect">
            <p>
              We collect information you submit directly to us through forms on this site &mdash;
              including the demo request form &mdash; such as your name, email address, company
              name, and any message you provide. We also collect basic technical information your
              browser sends automatically (IP address, user agent, referring URL) and standard
              analytics data about how the site is used.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <ul>
              <li>To respond to inquiries and demo requests.</li>
              <li>To provide, maintain, and improve our services.</li>
              <li>To send service-related communications you have requested.</li>
              <li>To detect, prevent, and address technical or security issues.</li>
            </ul>
          </Section>

          <Section title="Data Sharing">
            <p>
              We do not sell your personal information. We may share information with trusted
              service providers who help us operate the website and our business (for example,
              hosting, email delivery, and analytics providers), and only to the extent necessary
              to perform those services. We may also disclose information when required by law or
              to protect our legal rights.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain personal information for as long as necessary to fulfill the purposes for
              which it was collected, including to satisfy legal, accounting, or reporting
              obligations. When information is no longer needed, we securely delete or anonymize
              it.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              Depending on where you live, you may have the right to access, correct, or delete
              the personal information we hold about you, and to opt out of certain uses. To
              exercise any of these rights, contact us at{' '}
              <a className="text-[#2563EB] hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              . We will respond within a reasonable timeframe.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or how we handle your information can be sent to{' '}
              <a className="text-[#2563EB] hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="Updates to this Policy">
            <p>
              We may update this policy from time to time. When we do, we will revise the
              effective date at the top of this page. Material changes will be communicated via
              the website or by email where appropriate.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h2>
      <div className="text-gray-300 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  )
}
