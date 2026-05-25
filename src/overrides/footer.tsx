import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Submit release', href: '/create/mediaDistribution' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
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
    ],
  },
]

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

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

        {categories.length ? (
          <div className="mt-8 border-t border-current/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </footer>
  )
}
