import { fetchWatchPage } from '@/lib/cms.server';
import WatchClient from './WatchClient';
import { Metadata } from 'next';

// Force dynamic rendering to always fetch fresh CMS data
export const dynamic = 'force-dynamic'

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
    const data = await fetchWatchPage();

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

    return <WatchClient data={serializedData} />;
}
