import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload/client'
import { CACHE_TAGS } from '@/lib/cache-tags'
import type {
  Article,
  Media,
  ArticleAuthor,
  BlogPage,
  AboutPage,
  Header,
  Font,
  JoinOurInnerCircle,
  HomePage,
  Footer,
  ShopPage,
  ContactPage,
  WatchPage,
  Comment,
} from '@/payload-types'

const getCmsUrl = () => {
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

export interface BlogPost {
  id: string
  slug: string
  image: string
  category: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  views: number
  content?: any
  featuredMedia?: string
  featuredMediaCaption?: string
  authorRole?: string
  authorBio?: string
  authorImage?: string
  relatedProducts?: Array<{
    name: string
    price: string
    image: string
    category?: string
    link?: string
  }>
}

// ─── Articles ────────────────────────────────────────────

export function fetchArticles(category?: string) {
  const cacheKey = ['articles', category ?? 'all']
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const where: any = {}
        if (category && category !== 'All') {
          where.category = { equals: category }
        }
        const data = await payload.find({
          collection: 'articles',
          limit: 100,
          sort: '-publishedAt',
          depth: 2,
          where: Object.keys(where).length > 0 ? where : undefined,
        })
        const CMS_URL = getCmsUrl()
        return data.docs.map((doc: Article) => {
          const coverImage = doc.coverImage as Media
          const author = doc.author as ArticleAuthor
          const readTime = (doc as any).readTimeInMins
            ? `${(doc as any).readTimeInMins} min read`
            : '5 min read'
          return {
            id: doc.id,
            slug: doc.slug,
            image: coverImage?.url ? `${CMS_URL}${coverImage.url}` : '',
            category: doc.category || 'Uncategorized',
            title: doc.title,
            excerpt: doc.contentSummary || '',
            author: author?.name || 'Unknown',
            date: new Date(doc.publishedAt || '').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            readTime,
            views: (doc as any).views || 0,
            content: doc.content,
          }
        })
      } catch (error) {
        console.error('Error fetching articles:', error)
        return []
      }
    },
    cacheKey,
    { tags: [CACHE_TAGS.ARTICLES] },
  )()
}

export function fetchArticleBySlug(slug: string) {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.find({
          collection: 'articles',
          where: { slug: { equals: slug } },
          depth: 2,
        })
        if (data.docs.length === 0) return null

        const doc = data.docs[0] as Article
        const CMS_URL = getCmsUrl()
        const coverImage = doc.coverImage as Media
        const author = doc.author as ArticleAuthor
        const authorAvatar = author?.avatar as Media
        const featuredMediaImage = (doc as any).featuredMedia as Media
        const readTime = (doc as any).readTimeInMins
          ? `${(doc as any).readTimeInMins} min read`
          : '5 min read'

        const relatedProducts = (doc.relatedProducts || []).map((p: any) => {
          const pImage = p.image as Media
          return {
            name: p.name,
            price: p.price,
            category: p.category || '',
            link: p.link || '',
            image: pImage?.url ? `${CMS_URL}${pImage.url}` : '',
          }
        })

        return {
          id: doc.id,
          slug: doc.slug,
          image: coverImage?.url ? `${CMS_URL}${coverImage.url}` : '',
          category: doc.category || 'Uncategorized',
          title: doc.title,
          excerpt: doc.contentSummary || '',
          author: author?.name || 'Unknown',
          authorRole: author?.role || '',
          authorBio: author?.bio || '',
          authorImage: authorAvatar?.url
            ? `${CMS_URL}${authorAvatar.url}`
            : '',
          date: new Date(doc.publishedAt || '').toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          readTime,
          views: (doc as any).views || 0,
          content: doc.content,
          featuredMedia: featuredMediaImage?.url
            ? `${CMS_URL}${featuredMediaImage.url}`
            : undefined,
          featuredMediaCaption:
            (doc as any).featuredMediaCaption || undefined,
          relatedProducts,
        } as BlogPost
      } catch (error) {
        console.error('Error fetching article:', error)
        return null
      }
    },
    ['article', slug],
    { tags: [CACHE_TAGS.ARTICLES] },
  )()
}

// ─── Comments ────────────────────────────────────────────

export function fetchApprovedComments(articleId: string) {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.find({
          collection: 'comments',
          where: {
            and: [
              { article: { equals: articleId } },
              { status: { equals: 'approved' } },
            ],
          },
          sort: '-createdAt',
        })
        return data.docs as Comment[]
      } catch (error) {
        console.error('Error fetching comments:', error)
        return []
      }
    },
    ['comments', articleId],
    { tags: [CACHE_TAGS.COMMENTS] },
  )()
}

// ─── Globals ─────────────────────────────────────────────

export function fetchBlogPage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({ slug: 'blog-page' })
        return data as BlogPage
      } catch (e) {
        console.error('Error fetching blog page:', e)
        return null
      }
    },
    ['globals', 'blog-page'],
    { tags: [CACHE_TAGS.BLOG_PAGE] },
  )()
}

export function fetchAboutPage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'about-page',
          depth: 2,
        })
        return data as AboutPage
      } catch (e) {
        console.error('Error fetching about page:', e)
        return null
      }
    },
    ['globals', 'about-page'],
    { tags: [CACHE_TAGS.ABOUT_PAGE] },
  )()
}

export function fetchHeader() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'header',
          depth: 2,
        })
        return data as Header
      } catch (e) {
        console.error('Error fetching header:', e)
        return null
      }
    },
    ['globals', 'header'],
    { tags: [CACHE_TAGS.HEADER] },
  )()
}

export function fetchHomePage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'home-page',
          depth: 2,
        })
        return data as HomePage
      } catch (e) {
        console.error('Error fetching home page:', e)
        return null
      }
    },
    ['globals', 'home-page'],
    { tags: [CACHE_TAGS.HOME_PAGE] },
  )()
}

export function fetchFooter() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({ slug: 'footer', depth: 2 })
        return data as Footer
      } catch (e) {
        console.error('Error fetching footer:', e)
        return null
      }
    },
    ['globals', 'footer'],
    { tags: [CACHE_TAGS.FOOTER] },
  )()
}

export function fetchShopPage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'shop-page',
          depth: 2,
        })
        return data as ShopPage
      } catch (e) {
        console.error('Error fetching shop page:', e)
        return null
      }
    },
    ['globals', 'shop-page'],
    { tags: [CACHE_TAGS.SHOP_PAGE] },
  )()
}

export function fetchContactPage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'contact-page',
          depth: 2,
        })
        return data as ContactPage
      } catch (e) {
        console.error('Error fetching contact page:', e)
        return null
      }
    },
    ['globals', 'contact-page'],
    { tags: [CACHE_TAGS.CONTACT_PAGE] },
  )()
}

export function fetchWatchPage() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'watch-page',
          depth: 2,
        })
        return data as WatchPage
      } catch (e) {
        console.error('Error fetching watch page:', e)
        return null
      }
    },
    ['globals', 'watch-page'],
    { tags: [CACHE_TAGS.WATCH_PAGE] },
  )()
}

export function fetchJoinOurInnerCircle() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
          slug: 'join-our-inner-circle',
          depth: 2,
        })
        return data as JoinOurInnerCircle
      } catch (e) {
        console.error('Error fetching join our inner circle:', e)
        return null
      }
    },
    ['globals', 'join-our-inner-circle'],
    { tags: [CACHE_TAGS.JOIN_INNER_CIRCLE] },
  )()
}

export function fetchFonts() {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayloadClient()
        const data = await payload.find({ collection: 'fonts', limit: 100 })
        return data.docs as Font[]
      } catch (e) {
        console.error('Error fetching fonts:', e)
        return []
      }
    },
    ['fonts'],
    { tags: [CACHE_TAGS.FONTS] },
  )()
}
