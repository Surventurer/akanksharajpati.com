import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const generateSlug: FieldHook = ({ value, data }) => {
    if (value) return slugify(String(value).trim()) || ''
    return slugify(String(data?.title || '').trim()) || ''
}

const extractVideoDetails: FieldHook = ({ value, data }) => {
    const url = String(data?.videoUrl || '').trim()
    if (!url) return value

    // YouTube pattern
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (ytMatch && ytMatch[1]) {
        return ytMatch[1]
    }

    // Vimeo pattern
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch && vimeoMatch[1]) {
        return vimeoMatch[1]
    }

    return value || ''
}

export const Videos: CollectionConfig = {
    slug: 'videos',
    admin: {
        useAsTitle: 'title',
        group: 'Media',
        defaultColumns: ['title', 'videoProvider', 'category', 'featured', 'publishedAt'],
    },
    access: collectionAccess('media', 'videos', { publicRead: true }),
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
                description: 'Unique URL slug for watch page',
            },
        },
        {
            name: 'videoUrl',
            type: 'text',
            required: true,
            admin: {
                description: 'YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'videoProvider',
                    type: 'select',
                    defaultValue: 'youtube',
                    options: [
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Vimeo', value: 'vimeo' },
                    ],
                    admin: { width: '50%' },
                },
                {
                    name: 'videoId',
                    type: 'text',
                    hooks: { beforeValidate: [extractVideoDetails] },
                    admin: {
                        width: '50%',
                        description: 'Extracted identifier (auto-filled from URL)',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'category',
                    type: 'text',
                    defaultValue: 'Cinematic',
                    required: true,
                    admin: {
                        width: '50%',
                        description: 'Category tag (e.g. Travel, Fashion, Vlog, Design)',
                    },
                },
                {
                    name: 'duration',
                    type: 'text',
                    admin: {
                        width: '50%',
                        description: 'Duration string (e.g. 12:45)',
                    },
                },
            ],
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Custom high-res poster (optional: defaults to YouTube thumbnail)',
            },
        },
        {
            name: 'summary',
            type: 'textarea',
            admin: {
                description: 'Short video overview displayed in cards and previews',
            },
        },
        {
            name: 'description',
            type: 'richText',
            admin: {
                description: 'Full video description, show notes, and links',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: 'Pin to top of Watch page as Hero Feature',
            },
        },
        {
            name: 'views',
            type: 'number',
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: 'sidebar',
                description: 'Total video views',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            defaultValue: () => new Date().toISOString(),
            admin: {
                position: 'sidebar',
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.VIDEOS)],
    },
}

