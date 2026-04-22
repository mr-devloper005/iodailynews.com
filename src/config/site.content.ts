import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press wire & distribution',
  },
  footer: {
    tagline: 'Professional press release distribution',
  },
  hero: {
    badge: 'Distribution platform',
    title: ['Reach audiences through a structured press release workflow.'],
    description:
      'Submit once, route to broad syndication targets, and keep your team aligned with clear analytics and media reach signals.',
    primaryCta: {
      label: 'Submit Press Release',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'View press releases',
      href: '/updates',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Distribution',
    featureCardTitle: 'New releases surface on the archive as soon as they publish.',
    featureCardDescription:
      'The homepage highlights distribution value, categories, and the most recent announcements without filler placeholders.',
  },
  home: {
    metadata: {
      title: 'Press release distribution & announcements',
      description:
        'Distribute announcements, read the latest press releases, and explore categories including business, technology, health, and finance.',
      openGraphTitle: 'Press release distribution & announcements',
      openGraphDescription:
        'Professional press release distribution: syndication reach, media discovery, and readable release pages.',
      keywords: [
        'press release',
        'media distribution',
        'announcements',
        'public relations',
        'newsroom',
        'iodailynews',
      ],
    },
    introBadge: 'Why teams use iodailynews',
    introTitle: 'Built for announcement velocity and audit-friendly publishing.',
    introParagraphs: [
      'The experience is tuned for press workflows: clear headlines, category signals, and archive scanning that stays fast on mobile.',
      'Distribution messaging stays upfront so stakeholders understand reach and reporting without digging through unrelated modules.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Broad syndication positioning and structured release pages.',
      'Category-aware archive with filters that match your publishing model.',
      'Readable detail pages with sharing tools and related releases.',
    ],
    primaryLink: {
      label: 'Open press releases',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to publish',
    title: 'Ship your next announcement with a distribution-first workflow.',
    description:
      'Use the submission flow when you are ready to publish, or contact the team for volume and enterprise options.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest press releases',
  taskSectionDescriptionSuffix: 'Recently published announcements from the wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press releases',
    description: 'Browse the archive, filter by category, and open full release pages.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press release archive',
    paragraphs: [
      'Scan headlines, filter by category, and open any release for the full story, metadata, and related items.',
      'Use search from the header when you need to jump directly to a topic or issuer keyword.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
