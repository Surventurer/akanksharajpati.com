import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Initializing payload...');
    const payload = await getPayload({ config: configPromise })
    
    console.log('Seeding Home Page...');
    try {
        const homeData = await payload.findGlobal({ slug: 'home-page' });
        await payload.updateGlobal({
            slug: 'home-page',
            data: {
                ...homeData,
                comingSoonText: homeData.comingSoonText || 'Coming Soon',
                comingSoonDescription: homeData.comingSoonDescription || 'This page is currently being updated.',
                blogEmptyText: homeData.blogEmptyText || 'No blog posts available yet.',
                shopEmptyText: homeData.shopEmptyText || 'Products coming soon',
                watchEmptyText: homeData.watchEmptyText || 'Videos coming soon',
            }
        });
        console.log('Home Page seeded successfully.');
    } catch(e) {
        console.log('Home page error:', e)
    }

    const pages = ['shop-page', 'blog-page', 'watch-page', 'contact-page'];
    for (const slug of pages) {
        console.log(`Seeding ${slug}...`);
        try {
            const data = await payload.findGlobal({ slug: slug as any });
            
            let defaultDesc = 'This page is currently being updated.';
            if (slug === 'shop-page') defaultDesc = 'Our shop is currently being updated.';
            if (slug === 'watch-page') defaultDesc = 'Our video content is being curated. Please check back later.';

            await payload.updateGlobal({
                slug: slug as any,
                data: {
                    ...data,
                    comingSoonText: (data as any).comingSoonText || 'Coming Soon',
                    comingSoonDescription: (data as any).comingSoonDescription || defaultDesc,
                }
            });
            console.log(`${slug} seeded successfully.`);
        } catch(e) {
            console.log(`Error seeding ${slug}:`, e)
        }
    }

    console.log('Done.');
    process.exit(0);
}

run();
