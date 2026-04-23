import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleDot,
  Globe2,
  Megaphone,
  Palette,
  Radio,
  Sparkles,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPostUrl, fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const TRUST_LABELS = ['Wire feeds', 'Editorial desks', 'Search surfaces', 'Industry verticals', 'Comms teams']

const CATEGORY_LINKS = [
  { label: 'Business', slug: 'business' },
  { label: 'Tech', slug: 'technology' },
  { label: 'Health', slug: 'health' },
  { label: 'Finance', slug: 'finance' },
  { label: 'News', slug: 'news' },
]

const TESTIMONIALS = [
  {
    quote: 'The sectioned homepage makes it easier for leadership to spot key announcements without endless scrolling.',
    name: 'Communications director',
    org: 'B2B software',
  },
  {
    quote: 'Our editors can move from hero updates to recent releases in one pass, and mobile readability is much better.',
    name: 'PR manager',
    org: 'Healthcare network',
  },
  {
    quote: 'The visual hierarchy feels like a real publishing front page while still preserving submission flow and archive depth.',
    name: 'VP Marketing',
    org: 'Financial services',
  },
]

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { fresh: true })
  const topStories = posts.slice(0, 3)
  const latestStories = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2b2b2b]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#19111f_0%,#1f1530_46%,#211121_100%)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(circle at 16% 36%, rgba(255,95,24,0.42), transparent 40%), radial-gradient(circle at 78% 12%, rgba(124,77,255,0.35), transparent 43%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f7c9ad]">{siteContent.hero.badge}</p>
            <h1 className="mt-5 font-[family-name:var(--site-font-display)] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.2rem]">
              {siteContent.hero.title[0]}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ddd4e3] sm:text-lg">{siteContent.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4f1f] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,79,31,0.32)] transition hover:bg-[#f13f10]"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="mt-12 grid content-start gap-4 lg:mt-2">
            <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#cfbfda]">Distribution preview</p>
              <p className="mt-2 text-xl font-semibold">Release pulse</p>
              <ul className="mt-5 space-y-2.5 text-sm text-[#e8e0ed]">
                {[
                  'Structured headline and body validation',
                  'Category routing into the wire archive',
                  'Pickup and engagement reporting snapshots',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 rounded-xl bg-white/6 px-3 py-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ff9367]" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#cfbfda]">Social pickup</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {['X', 'LinkedIn', 'Newsroom', 'APIs', 'Press', 'Media'].map((node) => (
                  <span key={node} className="rounded-full border border-white/25 bg-white/12 px-3 py-1.5 text-[#f4edf8]">
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
        <div className="rounded-[1.9rem] border border-[#eadfda] bg-white px-6 py-7 shadow-[0_26px_65px_rgba(26,16,26,0.14)] sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a5f4d]">Trusted distribution footprint</p>
              <h2 className="mt-3 font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a] sm:text-3xl">
                Designed like a publishing front page, powered by release workflows.
              </h2>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {TRUST_LABELS.map((label) => (
                <div key={label} className="inline-flex items-center gap-2 rounded-xl border border-[#eadfda] bg-[#fff9f6] px-3 py-2 text-xs font-semibold text-[#5f3e32]">
                  <CircleDot className="h-3.5 w-3.5 text-[#ff5f18]" aria-hidden />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a5f4d]">Top stories</p>
            <h2 className="mt-2 font-[family-name:var(--site-font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#2f1b1a] sm:text-4xl">
              Curated release highlights
            </h2>
          </div>
          <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c44714] hover:underline">
            Browse all updates
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {topStories.length ? (
            topStories.map((post, idx) => (
              <Link
                key={post.id}
                href={buildPostUrl('mediaDistribution', post.slug)}
                className="group rounded-2xl border border-[#eadfda] bg-white p-5 shadow-[0_14px_34px_rgba(49,33,26,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(49,33,26,0.12)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a17f73]">Feature {idx + 1}</p>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[#2f1b1a]">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#6a5b55]">{post.summary || post.content?.excerpt || 'Open the release for full details.'}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#c44714]">
                  Read release
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d9cbc4] bg-[#fffbf8] p-7 text-sm text-[#6a5b55] md:col-span-3">
              No featured stories yet. Publish a release to populate this section.
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#fff5ef] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.07fr_0.93fr] lg:items-center">
            <article className="rounded-[2rem] border border-[#eadfda] bg-white p-7 shadow-[0_18px_48px_rgba(49,33,26,0.08)] sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a5f4d]">Featured workflow</p>
              <h3 className="mt-3 font-[family-name:var(--site-font-display)] text-3xl font-semibold leading-tight text-[#2f1b1a]">
                Build, review, and publish faster with a newsroom-ready structure.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6a5b55]">
                Keep teams aligned from first draft to final distribution. Your release metadata, categories, and archive visibility all live in one repeatable flow.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/create/mediaDistribution"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4f1f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#f13f10]"
                >
                  Start submission
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/pricing" className="inline-flex items-center rounded-full border border-[#e4d4ce] bg-[#fffaf7] px-5 py-2.5 text-sm font-semibold text-[#5f3e32] hover:bg-white">
                  Compare plans
                </Link>
              </div>
            </article>
            <div className="grid gap-4">
              {[
                { title: 'Release quality checks', icon: BadgeCheck, body: 'Automatic formatting and consistency checks before publishing.' },
                { title: 'Distribution controls', icon: Megaphone, body: 'Route stories to the right category and partner surfaces.' },
                { title: 'Visual storytelling', icon: Palette, body: 'Mix announcements with highlights and editorial-style blocks.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#eadfda] bg-white px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#271b3a] text-[#ffd149]">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2f1b1a]">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#6a5b55]">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a5f4d]">Categories</p>
          <h2 className="mt-3 font-[family-name:var(--site-font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#2f1b1a] sm:text-4xl">
            Browse by topic
          </h2>
          <p className="mt-4 text-[#6a5b55]">Jump into the archive with a category filter built for fast scanning on every device.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_LINKS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/updates?category=${encodeURIComponent(cat.slug)}`}
              className="group flex items-center justify-between rounded-2xl border border-[#eadfda] bg-white px-6 py-5 text-left shadow-sm transition hover:border-[#d5c2b8] hover:shadow-md"
            >
              <span className="text-base font-semibold text-[#2f1b1a]">{cat.label}</span>
              <ArrowRight className="h-4 w-4 text-[#8a5f4d] transition group-hover:translate-x-0.5 group-hover:text-[#c44714]" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#ebdfd8] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[#ede2dc] pb-10 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a5f4d]">{siteContent.taskSectionHeading}</p>
              <h2 className="mt-2 font-[family-name:var(--site-font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#2f1b1a] sm:text-4xl">
                Latest from the wire
              </h2>
              <p className="mt-3 max-w-xl text-[#6a5b55]">{siteContent.taskSectionDescriptionSuffix}</p>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#e5d6ce] px-5 py-2.5 text-sm font-semibold text-[#2f1b1a] transition hover:border-[#d5c2b8] hover:bg-[#fff7f2]"
            >
              Open full archive
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {latestStories.length ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestStories.map((post) => (
                <TaskPostCard key={post.id} post={post} href={buildPostUrl('mediaDistribution', post.slug)} taskKey="mediaDistribution" />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-[#dbc8bf] bg-[#fff8f4] px-6 py-16 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-[#c44714]" aria-hidden />
              <p className="mt-4 text-lg font-semibold text-[#2f1b1a]">No releases published yet</p>
              <p className="mt-2 text-sm text-[#6a5b55]">When your team publishes, the newest items will appear here automatically.</p>
              <Link
                href="/create/mediaDistribution"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ff4f1f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#f13f10]"
              >
                Submit Press Release
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f7f2f8] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--site-font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#2f1b1a] sm:text-4xl">
            What teams say
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-[#e8ddea] bg-white p-7 shadow-sm"
              >
                <Radio className="h-5 w-5 text-[#5d2e8a]" aria-hidden />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#6a5b55]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-[#f0e7f2] pt-5">
                  <p className="text-sm font-semibold text-[#2f1b1a]">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.org}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ffd149] py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f4f00]">{siteContent.cta.badge}</p>
            <h2 className="mt-2 max-w-3xl font-[family-name:var(--site-font-display)] text-2xl font-semibold text-[#2f1b1a] sm:text-3xl">
              {siteContent.cta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5f3e32]">{siteContent.cta.description}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={siteContent.cta.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#21152f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2b1c3f]"
            >
              {siteContent.cta.primaryCta.label}
            </Link>
            <Link
              href={siteContent.cta.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-[#3c2a28] bg-white/55 px-6 py-3 text-sm font-semibold text-[#2f1b1a] hover:bg-white"
            >
              {siteContent.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
