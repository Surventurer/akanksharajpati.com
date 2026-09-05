import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })
    const header = await payload.findGlobal({ slug: 'header' })
    console.log('HEADER ICONS:', JSON.stringify((header as any).iconItems, null, 2))
    process.exit(0)
}
run()
