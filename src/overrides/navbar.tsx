'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import dynamic from 'next/dynamic'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const STATIC_LINKS = [
  { label: 'Press releases', href: '/updates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Search', href: '/search' },
  { label: 'Contact', href: '/contact' },
]

const SCROLL_THRESHOLD_PX = 16

/** Routes whose first section is a dark hero under the sticky nav — only here we use light text before scroll. */
const DARK_HERO_PREFIXES = ['/', '/pricing', '/contact'] as const

function matchesDarkHeroRoute(pathname: string) {
  return DARK_HERO_PREFIXES.some((prefix) => {
    if (prefix === '/') return pathname === '/'
    return pathname === prefix || pathname.startsWith(`${prefix}/`)
  })
}

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()

  const darkHeroAtTop = matchesDarkHeroRoute(pathname)
  /** Light bar + dark text: after scroll, or on pages that are not dark-under-nav at the top. */
  const lightNav = scrolled || !darkHeroAtTop

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'py-2 text-center text-[11px] font-medium sm:text-xs',
          lightNav ? 'border-b border-[#e7ddd8] bg-[#f7f1ec] text-[#5f3e32]' : 'border-b border-white/12 bg-[#1b1229] text-[#f2ecf7]',
        )}
      >
        <span>{siteContent.navbar.tagline}</span>
        <span className={cn('mx-2', lightNav ? 'opacity-45' : 'opacity-55')} aria-hidden>
          ·
        </span>
        <Link
          href="/pricing"
          className={cn('font-semibold underline-offset-4 hover:underline', lightNav ? 'text-[#3f2c26]' : 'text-white')}
        >
          View plans
        </Link>
      </div>

      <div
        className={cn(
          'border-b transition-[background-color,border-color,box-shadow,color] duration-200',
          lightNav
            ? 'border-[var(--io-border)] bg-[#f8f6f2] text-[var(--io-ink)] shadow-[0_1px_0_rgba(23,16,16,0.06)]'
            : 'border-[#2a1b3a] bg-[#1f1530] text-[var(--primary-foreground)] shadow-[0_16px_46px_rgba(0,0,0,0.35)]',
        )}
      >
        <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight shadow-sm',
                lightNav ? 'bg-[#2a1b3a] text-white' : 'bg-[#ff4f1f] text-white',
              )}
            >
              io
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  'block truncate font-[family-name:var(--site-font-display)] text-lg font-semibold tracking-tight sm:text-xl',
                  lightNav ? 'text-[var(--io-heading)]' : 'text-[var(--primary-foreground)]',
                )}
              >
                {SITE_CONFIG.name}
              </span>
              <span
                className={cn(
                  'hidden text-[10px] font-medium uppercase tracking-[0.22em] sm:block',
                  lightNav ? 'text-[var(--io-stone)]' : 'text-[var(--io-on-dark)]',
                )}
              >
                Press wire
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {STATIC_LINKS.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    lightNav
                      ? active
                        ? 'bg-[color-mix(in_srgb,var(--io-stone)_14%,white)] text-[var(--io-heading)]'
                        : 'text-[var(--io-heading)] hover:bg-[color-mix(in_srgb,var(--io-stone)_10%,white)] hover:text-[var(--io-heading)]'
                      : active
                        ? 'bg-[#ff4f1f] text-white shadow-[0_8px_24px_rgba(255,79,31,0.35)]'
                        : 'text-white/95 hover:bg-white/12 hover:text-white',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn('hidden rounded-full md:flex', lightNav ? 'text-[var(--io-stone)]' : 'text-white/95 hover:bg-white/12 hover:text-white')}
            >
              <Link href="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                'hidden rounded-full px-4 font-semibold shadow-sm sm:inline-flex',
                lightNav ? 'bg-[#2a1b3a] text-white hover:bg-[#3a2852]' : 'bg-[#ff4f1f] text-white hover:bg-[#f13f10]',
              )}
            >
              <Link href="/create/mediaDistribution">Submit Press Release</Link>
            </Button>

            {isAuthenticated ? (
              <div className="hidden md:block">
                <NavbarAuthControls tone={lightNav ? 'default' : 'on-dark'} />
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    'rounded-full font-semibold',
                    lightNav ? 'text-[var(--io-heading)]' : 'text-white hover:bg-white/12',
                  )}
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  variant="outline"
                  className={cn(
                    'rounded-full font-semibold',
                    lightNav
                      ? 'border-[var(--io-border)] text-[var(--io-heading)]'
                      : 'border-white/45 bg-transparent text-white hover:bg-white/15',
                  )}
                >
                  <Link href="/register">Create account</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn('rounded-full lg:hidden', lightNav ? 'text-[var(--io-heading)]' : 'text-white hover:bg-white/12')}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {open ? (
          <div
            className={cn(
              'border-t px-4 py-4 lg:hidden',
              lightNav
                ? 'border-[var(--io-border)] bg-[color-mix(in_srgb,white_98%,var(--io-canvas))]'
                : 'border-white/10 bg-[rgba(23,16,16,0.98)]',
            )}
          >
            <div className="flex flex-col gap-1">
              {STATIC_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-semibold',
                    lightNav
                      ? 'text-[var(--io-heading)] hover:bg-[color-mix(in_srgb,var(--io-stone)_8%,white)]'
                      : 'text-[var(--io-on-dark)] hover:bg-white/10',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/create/mediaDistribution"
                className="mt-2 rounded-xl bg-[var(--io-brand)] px-4 py-3 text-center text-sm font-semibold text-[var(--primary-foreground)]"
                onClick={() => setOpen(false)}
              >
                Submit Press Release
              </Link>
              {!isAuthenticated ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    className={cn(
                      'rounded-xl py-3 text-center text-sm font-semibold',
                      lightNav ? 'border border-[var(--io-border)] text-[var(--io-heading)]' : 'border border-white/20 text-[var(--primary-foreground)]',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className={cn(
                      'rounded-xl py-3 text-center text-sm font-semibold',
                      lightNav ? 'border border-[var(--io-border)] text-[var(--io-heading)]' : 'border border-white/20 text-[var(--primary-foreground)]',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
