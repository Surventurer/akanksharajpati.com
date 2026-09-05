import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })
    const aboutPage = await payload.findGlobal({ slug: 'about-page' })
    console.log('pageEnabled:', aboutPage.pageEnabled)
    console.log('heroEnabled:', aboutPage.heroEnabled)
    console.log('philosophyEnabled:', aboutPage.philosophyEnabled)
    console.log('valuesEnabled:', aboutPage.valuesEnabled)
    console.log('sectionLabel:', aboutPage.sectionLabel)
    console.log('headingNormal:', aboutPage.headingNormal)
    console.log('headingAccent:', aboutPage.headingAccent)
    console.log('heroImage:', aboutPage.heroImage ? 'EXISTS' : 'NULL')
    process.exit(0)
}
run()
