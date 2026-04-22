import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Submit release', href: '/create/mediaDistribution' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[var(--io-border)] bg-[var(--io-canvas)] text-[var(--io-ink)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 border-b border-[var(--io-border)] pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[var(--io-heading)]">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--io-muted-text)]">{siteContent.footer.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-[color:color-mix(in_srgb,var(--io-stone)_78%,var(--io-muted-text))]">
              {SITE_CONFIG.description}
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--io-heading)]">{g.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {g.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[var(--io-muted-text)] underline-offset-4 transition hover:text-[var(--io-heading)] hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs text-[var(--io-muted-text)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[color:color-mix(in_srgb,var(--io-stone)_65%,var(--io-muted-text))]">{SITE_CONFIG.domain}</p>
        </div>
      </div>
    </footer>
  )
}
