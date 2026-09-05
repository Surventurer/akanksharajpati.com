import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    console.log('Initializing payload...');
    const payload = await getPayload({ config: configPromise })
    
    // Palette
    const bg = '#F9F6F0'; // Cream
    const text = '#3E3A39'; // Dark olive/grey
    const accent = '#C8A9A9'; // Dusty Rose
    const btnBg = '#A3B19B'; // Sage Green
    const btnText = '#FFFFFF';

    try {
        console.log('Updating Header...');
        const header = await payload.findGlobal({ slug: 'header' });
        await payload.updateGlobal({
            slug: 'header',
            data: {
                ...header,
                headerBackgroundColor: bg,
                headerTextColor: text
            }
        });

        console.log('Updating Footer...');
        const footer = await payload.findGlobal({ slug: 'footer' });
        await payload.updateGlobal({
            slug: 'footer',
            data: {
                ...footer,
                brandNameColor: text,
                brandDescriptionColor: text,
                newsletterHeadingColor: text,
                newsletterDescriptionColor: text,
                copyrightTextColor: text
            }
        });

        console.log('Updating SiteSettings...');
        const site = await payload.findGlobal({ slug: 'site-settings' });
        await payload.updateGlobal({
            slug: 'site-settings',
            data: {
                ...site,
                floatingButtonBgColor: btnBg,
                floatingButtonTextColor: btnText,
                floatingButtonBorderColor: btnBg
            }
        });

        // For pages, we want to clear the specific color overrides so they use globals.css
        const pages = ['home-page', 'shop-page', 'blog-page', 'watch-page', 'contact-page'];
        for (const slug of pages) {
            console.log(`Updating ${slug}...`);
            const data = await payload.findGlobal({ slug: slug as any });
            
            // Loop through all keys. If they end with 'Color', set them to null.
            const newData: any = { ...data };
            for (const key of Object.keys(newData)) {
                if (key.endsWith('Color')) {
                    newData[key] = null;
                }
            }

            // Exceptions or specific overrides
            if (newData.pageBackgroundColor !== undefined) newData.pageBackgroundColor = bg;
            if (newData.textColor !== undefined) newData.textColor = text;
            if (newData.mutedTextColor !== undefined) newData.mutedTextColor = accent;

            await payload.updateGlobal({
                slug: slug as any,
                data: newData
            });
        }
        
        console.log('All globals updated.');
    } catch(e) {
        console.error('Error applying palette:', e)
    }

    process.exit(0);
}

run();
