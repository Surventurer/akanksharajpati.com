export const CACHE_TAGS = {
  ARTICLES: 'articles',
  ARTICLE_AUTHORS: 'article-authors',
  COMMENTS: 'comments',
  MEDIA: 'media',
  FONTS: 'fonts',
  BLOG_PAGE: 'blog-page',
  ABOUT_PAGE: 'about-page',
  HEADER: 'header',
  HOME_PAGE: 'home-page',
  SHOP_PAGE: 'shop-page',
  CONTACT_PAGE: 'contact-page',
  WATCH_PAGE: 'watch-page',
  FOOTER: 'footer',
  JOIN_INNER_CIRCLE: 'join-our-inner-circle',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]
