import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Mail, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

type PostContent = {
  category?: string
  body?: string
  description?: string
  excerpt?: string
  images?: string[]
}

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as PostContent
}

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images) ? content.images.filter((url): url is string => isValidImageUrl(url)) : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  return ['/placeholder.svg?height=900&width=1400']
}

const absoluteUrl = (value?: string | null) => {
  if (!value) return null
  if (/^https?:\/\//i.test(value)) return value
  if (!value.startsWith('/')) return null
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${value}`
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig('mediaDistribution')
  const content = getContent(post)
  const related = (await fetchTaskPosts('mediaDistribution', 10, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 5)

  const images = getImageUrls(post, content)
  const featured = images[0]
  const html = formatRichHtml(
    (typeof content.body === 'string' && content.body.trim()) ||
      (typeof content.description === 'string' && content.description.trim()) ||
      post.summary ||
      '',
    'Content will appear here once published.',
  )

  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary && post.summary.trim()) ||
    ''

  const category = typeof content.category === 'string' && content.category.trim() ? content.category.trim() : 'Press release'
  const author = post.authorName || 'Editorial desk'
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/updates/${post.slug}`
  const encoded = encodeURIComponent(pageUrl)
  const shareTitle = encodeURIComponent(post.title)
  const shareLinks = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: Facebook },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${shareTitle}`, icon: Twitter },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, icon: Linkedin },
    { label: 'Email', href: `mailto:?subject=${shareTitle}&body=${encoded}`, icon: Mail },
  ]

  const articleImage = absoluteUrl(featured) || absoluteUrl(SITE_CONFIG.defaultOgImage)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title,
      description: subtitle || post.summary || category,
      image: articleImage ? [articleImage] : [],
      datePublished: post.publishedAt || undefined,
      dateModified: post.publishedAt || undefined,
      author: { '@type': 'Person', name: author },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
        },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.baseUrl.replace(/\/$/, '') },
        {
          '@type': 'ListItem',
          position: 2,
          name: taskConfig?.label || 'Press releases',
          item: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskConfig?.route || '/updates'}`,
        },
        { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--io-canvas)] text-[var(--io-ink)]">
      <NavbarShell />
      <SchemaJsonLd data={schema} />

      <article className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:pt-14">
        <div>
          <nav className="text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[var(--io-brand)]">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href={taskConfig?.route || '/updates'} className="hover:text-[var(--io-brand)]">
              {taskConfig?.label || 'Press releases'}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-slate-700">Release</span>
          </nav>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Press release</p>
          <h1 className="mt-3 font-[family-name:var(--site-font-display)] text-3xl font-semibold leading-tight tracking-[-0.03em] text-[var(--io-heading)] sm:text-4xl lg:text-[2.35rem]">
            {post.title}
          </h1>

          {subtitle ? (
            <p className="mt-5 border-l-4 border-[var(--io-brand)] bg-[color-mix(in_srgb,var(--io-stone)_10%,var(--io-canvas))] py-3 pl-5 pr-4 text-base italic leading-relaxed text-[var(--io-muted-text)]">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">{category}</span>
            <span className="text-slate-400">·</span>
            <span>
              By <span className="font-medium text-slate-900">{author}</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {shareLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--io-border)] bg-white text-[var(--io-muted-text)] shadow-sm transition hover:border-[var(--io-stone)] hover:text-[var(--io-brand)]"
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="sr-only">Share on {label}</span>
              </a>
            ))}
          </div>

          {featured ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--io-border)] bg-slate-100 shadow-inner">
              <ContentImage src={featured} alt={post.title} fill className="object-cover" />
            </div>
          ) : null}

          <div className="prose prose-slate prose-lg mt-12 max-w-none prose-headings:font-[family-name:var(--site-font-display)] prose-headings:text-[var(--io-heading)] prose-headings:tracking-tight prose-a:text-[var(--io-brand)] prose-img:rounded-xl">
            <RichContent html={html} />
          </div>
        </div>

        <aside className="mt-14 space-y-8 lg:mt-0">
          <div className="rounded-2xl border border-[var(--io-border)] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Publisher</p>
            <p className="mt-3 text-lg font-semibold text-[var(--io-heading)]">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm text-[var(--io-muted-text)]">{SITE_CONFIG.tagline}</p>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-[var(--io-brand)] hover:underline">
              Media contact →
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--io-border)] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">More press releases</p>
            <ul className="mt-4 space-y-4">
              {related.map((item) => (
                <li key={item.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <Link href={`/updates/${item.slug}`} className="text-sm font-semibold text-[var(--io-heading)] hover:text-[var(--io-brand)]">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/updates" className="mt-6 inline-flex text-sm font-semibold text-[var(--io-brand)] hover:underline">
              View all releases →
            </Link>
          </div>
        </aside>
      </article>

      <Footer />
    </div>
  )
}
