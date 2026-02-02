import { Article, Media, ArticleAuthor, BlogPage, AboutPage, Header, Font, JoinOurInnerCircle, HomePage, Footer, ShopPage, ContactPage, WatchPage } from '@/payload-types';

import { getPayload } from 'payload'
import config from '../payload.config'

// Cache the payload instance
let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

const getPayloadClient = async () => {
    if (cachedPayload) return cachedPayload
    try {
        cachedPayload = await getPayload({ config })
        return cachedPayload
    } catch (error) {
        console.error('Failed to initialize Payload:', error)
        throw error
    }
}

const getCmsUrl = () => {
    if (typeof window !== 'undefined') return ''; // Client side: use relative path
    return process.env.NEXT_PUBLIC_SERVER_URL || ''; // Server side: use env var or relative
};

export interface BlogPost {
    id: string; // Add ID
    slug: string;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    views: number; // Add Views
    content?: any; // Rich text content

    // Featured Media (between content and summary)
    featuredMedia?: string;
    featuredMediaCaption?: string;

    // Detailed author info
    authorRole?: string;
    authorBio?: string;
    authorImage?: string;

    // Related Products (Shop The Look)
    relatedProducts?: Array<{
        name: string;
        price: string;
        image: string;
        category?: string;
        link?: string;
    }>;
}

export const fetchArticles = async (category?: string): Promise<BlogPost[]> => {
    try {
        const payload = await getPayloadClient()

        const where: any = {}
        if (category && category !== 'All') {
            where.category = {
                equals: category
            }
        }

        const data = await payload.find({
            collection: 'articles',
            limit: 100,
            sort: '-publishedAt',
            depth: 2,
            where: Object.keys(where).length > 0 ? where : undefined,
        })

        const CMS_URL = getCmsUrl();

        return data.docs.map((doc: Article) => {
            const coverImage = doc.coverImage as Media;
            const author = doc.author as ArticleAuthor;

            const readTime = (doc as any).readTimeInMins ? `${(doc as any).readTimeInMins} min read` : '5 min read';

            // We don't need detailed author/products for the list view, so we omit them or keep them undefined
            return {
                id: doc.id,
                slug: doc.slug,
                image: coverImage?.url ? `${CMS_URL}${coverImage.url}` : '', // URL is relative in Payload response usually
                category: doc.category || 'Uncategorized',
                title: doc.title,
                excerpt: doc.contentSummary || '',
                author: author?.name || 'Unknown',
                date: new Date(doc.publishedAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                readTime: readTime,
                views: (doc as any).views || 0,
                content: doc.content
            };
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};

export const fetchArticleBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.find({
            collection: 'articles',
            where: {
                slug: {
                    equals: slug,
                },
            },
            depth: 2,
        })

        if (data.docs.length === 0) return null;

        const doc = data.docs[0] as Article;
        const CMS_URL = getCmsUrl();
        const coverImage = doc.coverImage as Media;
        const author = doc.author as ArticleAuthor;
        const authorAvatar = author?.avatar as Media;
        const featuredMediaImage = (doc as any).featuredMedia as Media;

        const readTime = (doc as any).readTimeInMins ? `${(doc as any).readTimeInMins} min read` : '5 min read';

        // Map Related Products
        const relatedProducts = (doc.relatedProducts || []).map((p: any) => {
            const pImage = p.image as Media;
            return {
                name: p.name,
                price: p.price,
                category: p.category || '',
                link: p.link || '',
                image: pImage?.url ? `${CMS_URL}${pImage.url}` : '',
            };
        });

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
            authorImage: authorAvatar?.url ? `${CMS_URL}${authorAvatar.url}` : '',
            date: new Date(doc.publishedAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: readTime,
            views: (doc as any).views || 0,
            content: doc.content,
            featuredMedia: featuredMediaImage?.url ? `${CMS_URL}${featuredMediaImage.url}` : undefined,
            featuredMediaCaption: (doc as any).featuredMediaCaption || undefined,
            relatedProducts: relatedProducts
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export const fetchBlogPage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'blog-page',
        })
        return data as BlogPage;
    } catch (e) {
        console.error('Error fetching blog page:', e);
        return null;
    }
}

export const fetchAboutPage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'about-page',
            depth: 2,
        })
        return data as AboutPage;
    } catch (e) {
        console.error('Error fetching about page:', e);
        return null;
    }
}

export const fetchHeader = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'header',
            depth: 2,
        })
        return data as Header;
    } catch (e) {
        console.error('Error fetching header:', e);
        return null;
    }
}

export const fetchFonts = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.find({
            collection: 'fonts',
            limit: 100,
        })
        return data.docs as Font[];
    } catch (e) {
        console.error('Error fetching fonts:', e);
        return [];
    }
}

export const fetchJoinOurInnerCircle = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'join-our-inner-circle',
            depth: 2,
        })
        return data as JoinOurInnerCircle;
    } catch (e) {
        console.error('Error fetching join our inner circle:', e);
        return null;
    }
}

export const fetchHomePage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'home-page',
            depth: 2,
        })
        return data as HomePage;
    } catch (e) {
        console.error('Error fetching home page:', e);
        return null;
    }
}

export const fetchFooter = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'footer',
            depth: 2,
        })
        return data as Footer;
    } catch (e) {
        console.error('Error fetching footer:', e);
        return null;
    }
}

export const fetchShopPage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'shop-page',
            depth: 2,
        })
        return data as ShopPage;
    } catch (e) {
        console.error('Error fetching shop page:', e);
        return null;
    }
}

export const fetchContactPage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'contact-page',
            depth: 2,
        })
        return data as ContactPage;
    } catch (e) {
        console.error('Error fetching contact page:', e);
        return null;
    }
}

export const fetchWatchPage = async () => {
    try {
        const payload = await getPayloadClient()
        const data = await payload.findGlobal({
            slug: 'watch-page',
            depth: 2,
        })
        return data as WatchPage;
    } catch (e) {
        console.error('Error fetching watch page:', e);
        return null;
    }
}
