import { fetchWatchPage, fetchVideos } from '@/lib/cms';
import WatchClient from './WatchClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchWatchPage();
    return {
        title: data?.metaTitle || 'Watch | Cinematic Vlogs',
        description: data?.metaDescription || 'Explore our collection of cinematic vlogs featuring travel, lifestyle, beauty, and fashion content.',
        openGraph: data?.ogImage && typeof data.ogImage !== 'string' ? {
            images: [{ url: data.ogImage.url || '' }]
        } : undefined,
    };
}

export default async function WatchPage() {
    const [data, collectionVideos] = await Promise.all([
        fetchWatchPage(),
        fetchVideos(),
    ]);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Watch</h1>
                    <p className="text-foreground/60">Page content is being configured. Please check back later.</p>
                </div>
            </div>
        );
    }

    // Serialize data to prevent enqueueModel errors
    const serializedData = JSON.parse(JSON.stringify(data));

    // If videos exist in the Videos collection, merge them into the page
    if (collectionVideos && collectionVideos.length > 0) {
        const mappedVideos = collectionVideos.map((v: any) => ({
            id: v.id,
            title: v.title,
            slug: v.slug,
            videoUrl: v.videoUrl,
            duration: v.duration || '10:00',
            category: v.category || 'Cinematic',
            views: v.views || 0,
            publishedAt: v.publishedAt,
            thumbnail: v.thumbnail,
            summary: v.summary,
            featured: Boolean(v.featured),
        }));

        serializedData.videos = mappedVideos;
    }

    return <WatchClient data={serializedData} />;
}
