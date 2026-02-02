import { Article, Media, ArticleAuthor, BlogPage, AboutPage, Header, JoinOurInnerCircle } from '@/payload-types';

const getCmsUrl = () => {
    if (typeof window !== 'undefined') return ''; // Client side: use relative path
    return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'; // Server side: use absolute path
};

export interface BlogPost {
    slug: string;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    content?: any; // Rich text content

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
        const CMS_URL = getCmsUrl();
        let url = `${CMS_URL}/api/articles?limit=100&sort=-publishedAt&depth=2`;

        if (category && category !== 'All') {
            url += `&where[category][equals]=${category}`;
        }

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch articles');

        const data = await res.json();

        return data.docs.map((doc: Article) => {
            const coverImage = doc.coverImage as Media;
            const author = doc.author as ArticleAuthor;

            const readTime = (doc as any).readTimeInMins ? `${(doc as any).readTimeInMins} min read` : '5 min read';

            // We don't need detailed author/products for the list view, so we omit them or keep them undefined
            return {
                slug: doc.slug,
                image: coverImage?.url ? `${coverImage.url}` : '', // URL is relative in Payload response usually
                category: doc.category || 'Uncategorized',
                title: doc.title,
                excerpt: doc.contentSummary || '',
                author: author?.name || 'Unknown',
                date: new Date(doc.publishedAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                readTime: readTime,
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
        const CMS_URL = getCmsUrl();
        const url = `${CMS_URL}/api/articles?where[slug][equals]=${slug}&depth=2`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch article');

        const data = await res.json();
        if (data.docs.length === 0) return null;

        const doc = data.docs[0] as Article;
        const coverImage = doc.coverImage as Media;
        const author = doc.author as ArticleAuthor;
        const authorAvatar = author?.avatar as Media;

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
            content: doc.content,
            relatedProducts: relatedProducts
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export const fetchBlogPage = async () => {
    try {
        const CMS_URL = getCmsUrl();
        // Globals endpoint: /api/globals/slug
        const res = await fetch(`${CMS_URL}/api/globals/blog-page`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch blog page globals');
        const data = await res.json();
        return data as BlogPage;
    } catch (e) {
        console.error('Error fetching blog page:', e);
        return null;
    }
}

export const fetchAboutPage = async () => {
    try {
        const CMS_URL = getCmsUrl();
        const res = await fetch(`${CMS_URL}/api/globals/about-page?depth=2`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch about page globals');
        const data = await res.json();
        return data as AboutPage;
    } catch (e) {
        console.error('Error fetching about page:', e);
        return null;
    }
}

export const fetchHeader = async () => {
    try {
        const CMS_URL = getCmsUrl();
        const res = await fetch(`${CMS_URL}/api/globals/header?depth=2`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch header globals');
        const data = await res.json();
        return data as Header;
    } catch (e) {
        console.error('Error fetching header:', e);
        return null;
    }
}

export const fetchJoinOurInnerCircle = async () => {
    try {
        const CMS_URL = getCmsUrl();
        const res = await fetch(`${CMS_URL}/api/globals/join-our-inner-circle?depth=2`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch join our inner circle globals');
        const data = await res.json();
        return data as JoinOurInnerCircle;
    } catch (e) {
        console.error('Error fetching join our inner circle:', e);
        return null;
    }
}
