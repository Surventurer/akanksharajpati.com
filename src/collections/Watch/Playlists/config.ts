import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const generateSlug: FieldHook = ({ value, data }) => {
    if (value) return slugify(String(value).trim()) || ''
    return slugify(String(data?.title || '').trim()) || ''
}

export const Playlists: CollectionConfig = {
    slug: 'playlists',
    admin: {
        useAsTitle: 'title',
        group: 'Media',
    },
    access: collectionAccess('media', 'playlists', { publicRead: true }),
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: { beforeValidate: [generateSlug] },
            admin: {
                description: 'URL slug for playlist/series page',
            },
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'videos',
            type: 'relationship',
            relationTo: 'videos',
            hasMany: true,
            admin: {
                description: 'Videos in this playlist / series in playback order',
            },
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.PLAYLISTS)],
    },
}

