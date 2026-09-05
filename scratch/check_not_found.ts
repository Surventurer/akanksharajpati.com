import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'not-found-page' })
    console.log('NOT FOUND PAGE IN DB:', JSON.stringify(data, null, 2))
    process.exit(0)
}
run()
