import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Initializing payload for NotFoundPage update...');
    const payload = await getPayload({ config: configPromise })
    
    try {
        console.log('Updating NotFoundPage global...');
        const notFound = await payload.findGlobal({ slug: 'not-found-page' });
        await payload.updateGlobal({
            slug: 'not-found-page',
            data: {
                ...notFound,
                backgroundColor: '#F9F6F0',
                sectionLabelColor: null,
                headingNormalColor: null,
                headingAccentColor: null,
                descriptionColor: null,
            }
        });
        console.log('NotFoundPage palette synced successfully.');
    } catch(e) {
        console.error('Error updating NotFoundPage:', e);
    }
    process.exit(0);
}

run();
