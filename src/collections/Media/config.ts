import path from 'path'
import type { CollectionConfig } from 'payload'
import { generateBlurDataURL, isEligibleForBlurDataURL } from './lib/generate-blur-data-url'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        group: 'Media',
    },
    access: collectionAccess('media', 'mediaFiles', { publicRead: true }),
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: false,
            admin: {
                description: 'Leave empty to auto-generate',
            },
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: false,
            admin: { hidden: true },
        },
    ],
    upload: {
        staticDir: path.resolve(process.cwd(), 'media'),
        mimeTypes: [
            'image/*',
            'image/svg+xml',
            'application/xml',
            'text/xml',
        ],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'small',
                width: 768,
                height: undefined,
            },
            {
                name: 'medium',
                width: 1200,
                height: undefined,
            },
        ],
        adminThumbnail: 'thumbnail',
    },
    hooks: {
        beforeValidate: [
            async ({ data, operation }) => {
                // Auto-generate alt text if not provided during upload
                if (operation === 'create' && data && !data.alt) {
                    const adjectives = ['Beautiful', 'Elegant', 'Stunning', 'Lovely', 'Charming', 'Graceful', 'Exquisite', 'Refined', 'Sophisticated', 'Timeless'];
                    const nouns = ['image', 'photo', 'picture', 'visual', 'artwork', 'illustration'];
                    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
                    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
                    data.alt = `${randomAdjective} ${randomNoun}`;
                }
                return data;
            },
        ],
        beforeChange: [
            async ({ operation, data, req }) => {
                if (operation !== 'create') return data
                // 1. check for eligibility
                if (!isEligibleForBlurDataURL(req.file?.mimetype)) return data
                // 2. if it is, generate blur hash
                const base64 = await generateBlurDataURL(req.file?.data)
                if (!base64) return data
                // 3. set it to data.blurDataUrl
                data.blurDataUrl = base64
                console.log(`Generated blur data URL for ${data.filename}`)
                return data
            },
        ],
        afterChange: [createRevalidateHook(CACHE_TAGS.MEDIA)],
    },
}
