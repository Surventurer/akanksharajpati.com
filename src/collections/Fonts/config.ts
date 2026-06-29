import { CollectionConfig } from 'payload'
import path from 'path'
import { collectionAccess } from '@/payload/access'

export const Fonts: CollectionConfig = {
    slug: 'fonts',
    admin: {
        useAsTitle: 'name',
        group: 'Media',
    },
    access: collectionAccess('media', 'fonts', { publicRead: true }),
    upload: {
        staticDir: path.resolve(process.cwd(), 'fonts'),
        mimeTypes: [
            'font/woff',
            'font/woff2',
            'font/ttf',
            'font/otf',
            'application/font-woff',
            'application/font-woff2',
            'application/x-font-ttf',
            'application/vnd.ms-opentype'
        ],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Font Name (e.g. My Custom Font)',
        },
    ],
}
