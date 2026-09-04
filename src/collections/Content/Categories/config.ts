import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const generateSlug: FieldHook = ({ value, data }) => {
    if (value) return slugify(String(value).trim()) || ''
    return slugify(String(data?.name || '').trim()) || ''
}

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
        group: 'Content',
    },
    access: collectionAccess('content', 'categories', { publicRead: true }),
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: { beforeValidate: [generateSlug] },
            admin: {
                description: 'Unique URL slug',
            },
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.CATEGORIES)],
    },
}

