import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Updating SiteSettings in DB with shopping_bag icon...');
    const payload = await getPayload({ config: configPromise })
    
    try {
        const site = await payload.findGlobal({ slug: 'site-settings' });
        await payload.updateGlobal({
            slug: 'site-settings',
            data: {
                ...site,
                floatingButtonIcon: 'shopping_bag',
                floatingButtonLabel: 'Shopping Bag',
                floatingButtonLink: '/shop'
            }
        });
        console.log('SiteSettings updated in DB successfully.');
    } catch(e) {
        console.error('Error updating SiteSettings:', e);
    }
    process.exit(0);
}

run();
