import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })
    
    console.log('=== ABOUT PAGE GLOBAL ===');
    const aboutPage = await payload.findGlobal({ slug: 'about-page' })
    console.log(JSON.stringify(aboutPage, null, 2))

    console.log('=== HOME PAGE ABOUT PREVIEW ===');
    const homePage = await payload.findGlobal({ slug: 'home-page' })
    console.log('aboutPreviewEnabled:', homePage.aboutPreviewEnabled);
    console.log('aboutPreviewHeadingNormal:', homePage.aboutPreviewHeadingNormal);
    console.log('aboutPreviewHeadingAccent:', homePage.aboutPreviewHeadingAccent);
    console.log('aboutPreviewImage:', homePage.aboutPreviewImage);
    console.log('showAboutPreviewImage:', homePage.showAboutPreviewImage);
    
    process.exit(0)
}
run()
