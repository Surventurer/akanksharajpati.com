import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Seeding NotFoundPage in Payload CMS with CRUD buttons and palette...');
    const payload = await getPayload({ config: configPromise })
    
    try {
        const notFound = await payload.findGlobal({ slug: 'not-found-page' });
        await payload.updateGlobal({
            slug: 'not-found-page',
            data: {
                ...notFound,
                sectionLabel: '404 ERROR',
                sectionLabelColor: '#868753',
                headingNormal: 'Page',
                headingNormalColor: '#3E3A39',
                headingAccent: 'Not Found',
                headingAccentColor: '#B88078',
                description: 'The story, object, or page you are looking for has either been moved, renamed, or is taking a quiet pause.',
                descriptionColor: '#6b6c4f',
                backgroundColor: '#F9F6F0',
                actionButtons: [
                    {
                        label: 'Return Home',
                        link: '/',
                        icon: 'home',
                        variant: 'primary',
                        newTab: false,
                    },
                    {
                        label: 'Explore Stories',
                        link: '/blog',
                        icon: 'menu_book',
                        variant: 'outline',
                        newTab: false,
                    }
                ]
            }
        });
        console.log('NotFoundPage seeded with CRUD action buttons successfully.');
    } catch(e) {
        console.error('Error seeding NotFoundPage:', e);
    }
    process.exit(0);
}

run();
