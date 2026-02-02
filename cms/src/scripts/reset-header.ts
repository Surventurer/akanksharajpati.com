import { getPayload } from 'payload'
import config from '../payload.config'

const resetHeader = async () => {
    const payload = await getPayload({ config })

    console.log('Resetting Header data...')

    try {
        await payload.updateGlobal({
            slug: 'header',
            data: {
                socialLinks: [],
                navIcons: [],
            },
        })
        console.log('Successfully reset Header socialLinks and navIcons.')
    } catch (error) {
        console.error('Error resetting header:', error)
    }

    process.exit(0)
}

resetHeader()
