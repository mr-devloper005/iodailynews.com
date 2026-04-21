import Link from 'next/link'
import { Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const mailHref = `mailto:hello@${SITE_CONFIG.domain}?subject=${encodeURIComponent(`${SITE_CONFIG.name} inquiry`)}`

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2b2b2b]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#19111f_0%,#1f1530_46%,#211121_100%)] px-4 pb-24 pt-16 text-white sm:px-6 lg:pb-28 lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 10% 20%, rgba(255,95,24,0.38), transparent 50%), radial-gradient(ellipse at 88% 18%, rgba(124,77,255,0.28), transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <span className="inline-block h-1 w-12 rounded-full bg-[#ff4f1f]" aria-hidden />
            <h1 className="mt-6 font-[family-name:var(--site-font-display)] text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Contact us</h1>
            <p className="mt-6 text-base leading-relaxed text-[#ddd4e3]">
              For distribution questions, enterprise pricing, or editorial corrections, email the iodailynews desk—we route media, billing, and compliance
              requests to the right owner.
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfda] bg-white p-8 text-[#2b2b2b] shadow-[0_24px_60px_rgba(17,10,24,0.28)]">
            <h2 className="text-lg font-semibold text-[#2f1b1a]">Direct line</h2>
            <p className="mt-2 text-sm text-[#6a5b55]">Use a business domain so we can verify your organization quickly.</p>
            <a
              href={mailHref}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[#ff4f1f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f13f10]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              hello@{SITE_CONFIG.domain}
            </a>
            <p className="mt-6 text-xs leading-relaxed text-[#7f736d]">
              For volume programs and SLAs, mention your expected release cadence so we can respond with the right plan context.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: 'Distribution support',
              body: 'Syndication tiers, timing, multimedia add-ons, and launch coordination.',
            },
            {
              title: 'Billing & plans',
              body: 'Invoices, upgrades, and enterprise agreements.',
            },
            {
              title: 'Editorial & corrections',
              body: 'Factual updates to published releases and metadata fixes after go-live.',
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#eadfda] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#2f1b1a]">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6a5b55]">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-dashed border-[#dbc8bf] bg-[#fff8f4] px-6 py-10 text-center">
          <p className="text-sm text-[#6a5b55]">
            Compare{' '}
            <Link href="/pricing" className="font-semibold text-[#c44714] hover:underline">
              pricing
            </Link>{' '}
            or browse the latest{' '}
            <Link href="/updates" className="font-semibold text-[#c44714] hover:underline">
              press releases
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
