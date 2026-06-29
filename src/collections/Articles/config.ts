import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { CollectionConfig } from 'payload'
import { STATUS_OPTIONS } from './constants'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const Articles: CollectionConfig = {
    slug: 'articles',
    admin: {
        group: 'Content',
    },
    access: collectionAccess('content', 'articles'),
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: { beforeValidate: [generateSlugHook] },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'featuredMedia',
            type: 'upload',
            relationTo: 'media',
            label: 'Featured Media',
            admin: {
                description: 'Image or media displayed between content and summary (optional)',
            },
        },
        {
            name: 'featuredMediaCaption',
            type: 'text',
            label: 'Featured Media Caption',
            admin: {
                description: 'Optional caption for the featured media',
                condition: (data) => Boolean(data?.featuredMedia),
            },
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: { beforeValidate: [generateContentSummaryHook] },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        // If value is provided (manual override), use it.
                        // If not, calculate it.
                        if (value && value > 0) return value

                        // Otherwise calculate it
                        if (siblingData?.content) {
                            const text = convertLexicalToPlaintext({ data: siblingData.content })
                            const wordsPerMinute = 200
                            const words = text.trim().split(/\s+/).length
                            return Math.max(1, Math.ceil(words / wordsPerMinute))
                        }
                        return 0
                    },
                ],
            },
            admin: {
                description: 'Automatically calculated but can be overridden manually',
            },
        },
        {
            name: 'views',
            type: 'number',
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: 'sidebar',
                description: 'Total number of views',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: Object.values(STATUS_OPTIONS),
            defaultValue: STATUS_OPTIONS.DRAFT,
        },
        {
            name: 'category',
            type: 'text',
            required: true,
            index: true, // Useful for filtering
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === STATUS_OPTIONS.PUBLISHED,
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
        {
            name: 'relatedProducts',
            type: 'array',
            label: 'Shop The Look',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'category', // Product category
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'link', // External link or internal shop handle
                    type: 'text',
                },
            ],
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.ARTICLES)],
    },
}
