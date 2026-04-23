export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '5qmn2ecm2v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'iodailynews',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press release distribution for teams that need reach',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Distribute announcements to thousands of outlets, track pickup, and keep your newsroom workflow organized on iodailynews.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'iodailynews.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iodailynews.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
