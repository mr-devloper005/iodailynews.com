import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing',
    description: 'Plans for press release distribution, analytics, and add-ons on iodailynews.',
    image: SITE_CONFIG.defaultOgImage,
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$199',
    cadence: '/ release',
    description: 'For occasional announcements and lean teams getting started with structured distribution.',
    features: ['Standard syndication tier', 'Core analytics snapshot', 'Email support', 'Category tagging'],
    cta: 'Choose Basic',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$449',
    cadence: '/ release',
    description: 'For teams publishing monthly with stronger reach signals and faster review cycles.',
    features: ['Expanded distribution tier', 'Full analytics & export', 'Priority review', 'Media database access', 'Add-on bundles'],
    cta: 'Choose Pro',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    cadence: '',
    description: 'For high-volume programs, regulated industries, and dedicated account coordination.',
    features: ['Custom distribution map', 'Dedicated strategist', 'SLA-backed support', 'Volume discounts', 'Private reporting views'],
    cta: 'Talk to sales',
    href: '/contact',
    highlight: false,
  },
]

const comparison = [
  { label: 'Distribution depth', basic: 'Standard', pro: 'Expanded', premium: 'Custom routing' },
  { label: 'Analytics', basic: 'Snapshot', pro: 'Full suite', premium: 'Custom dashboards' },
  { label: 'Media reach tooling', basic: '—', pro: 'Included', premium: 'White-glove' },
]

const addons = [
  { title: 'Multimedia boost', body: 'Rich embeds, galleries, and file attachments tuned for pickup surfaces.' },
  { title: 'Geo targeting', body: 'Layer regional emphasis for launches with location-aware syndication cues.' },
  { title: 'Embargo scheduling', body: 'Time releases for market open, earnings windows, or coordinated events.' },
]

const faq = [
  {
    q: 'How does billing work?',
    a: 'Plans are scoped per release for self-serve tiers. Premium engagements use annual or multi-release agreements depending on volume.',
  },
  {
    q: 'Can we upgrade mid-quarter?',
    a: 'Yes—upgrades apply to new submissions. Historical releases keep the terms that were active when they were published.',
  },
  {
    q: 'Do you support compliance-heavy industries?',
    a: 'Premium includes tighter review workflows and documentation support. Speak with the team about your regulatory context.',
  },
  {
    q: 'What analytics are included?',
    a: 'Pro includes engagement-oriented reporting suitable for leadership summaries. Premium adds private views and exports aligned to your stack.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2b2b2b]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#19111f_0%,#1f1530_46%,#211121_100%)] px-4 py-16 text-center text-white sm:px-6 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,95,24,0.35), transparent 42%), radial-gradient(circle at 80% 0%, rgba(124,77,255,0.22), transparent 40%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f7c9ad]">Transparent plans</p>
          <h1 className="mt-4 font-[family-name:var(--site-font-display)] text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Pricing that scales with your news cycle
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#ddd4e3] sm:text-lg">
            Pick a lane that matches release frequency, analytics needs, and the level of hands-on support your program requires.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/create/mediaDistribution"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4f1f] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,79,31,0.32)] hover:bg-[#f13f10]"
            >
              Submit a release
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white hover:bg-white/12">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-[0_14px_34px_rgba(49,33,26,0.08)] transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_42px_rgba(49,33,26,0.12)] ${
                plan.highlight
                  ? 'border-[#ff4f1f] ring-2 ring-[#ffd9cc]'
                  : 'border-[#eadfda]'
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#ff4f1f] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  Most popular
                </span>
              ) : null}
              <h2 className="font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a]">{plan.name}</h2>
              <p className="mt-3 text-sm text-[#6a5b55]">{plan.description}</p>
              <p className="mt-8 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-[#2f1b1a]">{plan.price}</span>
                {plan.cadence ? <span className="text-sm text-[#8a5f4d]">{plan.cadence}</span> : null}
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-[#2b2b2b]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4f1f]" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold ${
                  plan.highlight
                    ? 'bg-[#ff4f1f] text-white hover:bg-[#f13f10]'
                    : 'border border-[#e5d6ce] text-[#2f1b1a] hover:bg-[#fff7f2]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#ebdfd8] bg-[#fff5ef] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a] sm:text-3xl">Feature comparison</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e5d6ce] bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#fff7f2] text-xs font-semibold uppercase tracking-wide text-[#8a5f4d]">
                <tr>
                  <th className="px-4 py-4">Capability</th>
                  <th className="px-4 py-4">Basic</th>
                  <th className="px-4 py-4 text-[#c44714]">Pro</th>
                  <th className="px-4 py-4">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-[#ece2dc]">
                    <td className="px-4 py-4 font-medium text-[#2f1b1a]">{row.label}</td>
                    <td className="px-4 py-4 text-[#6a5b55]">{row.basic}</td>
                    <td className="px-4 py-4 font-medium text-[#c44714]">{row.pro}</td>
                    <td className="px-4 py-4 text-[#6a5b55]">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a] sm:text-3xl">Add-ons</h2>
        <p className="mt-3 max-w-2xl text-[#6a5b55]">Layer capabilities when a launch needs more than a standard wire package.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {addons.map((a) => (
            <div key={a.title} className="rounded-2xl border border-[#e5d6ce] bg-[#fff7f2] p-6">
              <h3 className="text-lg font-semibold text-[#2f1b1a]">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6a5b55]">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#ebdfd8] bg-[#f7f2f8] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a] sm:text-3xl">FAQ</h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-[#e8ddea]">
                <AccordionTrigger className="text-left text-base font-semibold text-[#2f1b1a] hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#6a5b55]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#ffd149] py-14 text-center text-[#2f1b1a]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f4f00]">Next step</p>
        <h2 className="mt-3 font-[family-name:var(--site-font-display)] text-2xl font-semibold sm:text-3xl">
          Ready to line up your next announcement?
        </h2>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#1f1530] px-8 py-3 text-sm font-semibold text-white hover:bg-[#2b1c3f]">
          Contact the team
        </Link>
      </section>

      <Footer />
    </div>
  )
}
