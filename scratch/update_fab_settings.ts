import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Updating SiteSettings for floating cart button...');
    const payload = await getPayload({ config: configPromise })
    
    try {
        const site = await payload.findGlobal({ slug: 'site-settings' });
        await payload.updateGlobal({
            slug: 'site-settings',
            data: {
                ...site,
                floatingButtonBgColor: '#FDFBF7',
                floatingButtonTextColor: '#3E3A39',
                floatingButtonBorderColor: 'rgba(62, 58, 57, 0.15)',
                floatingButtonIcon: 'menu_book',
                floatingButtonLabel: 'Shopping Bag'
            }
        });
        console.log('SiteSettings updated successfully.');
    } catch(e) {
        console.error('Error updating SiteSettings:', e);
    }
    process.exit(0);
}

run();
