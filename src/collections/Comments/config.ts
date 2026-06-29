import type { CollectionConfig } from 'payload'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const Comments: CollectionConfig = {
    slug: 'comments',
    admin: {
        useAsTitle: 'content',
        group: 'Content',
        defaultColumns: ['content', 'authorName', 'status', 'article', 'createdAt'],
    },
    access: collectionAccess('content', 'comments', { publicRead: true, publicCreate: true }),
    fields: [
        {
            name: 'content',
            type: 'textarea',
            required: true,
            label: 'Comment',
        },
        {
            name: 'authorName',
            type: 'text',
            required: true,
            label: 'Name',
        },
        {
            name: 'authorEmail',
            type: 'email',
            required: false, // Changed to optional
            label: 'Email',
            admin: {
                description: 'Kept private, not shown on frontend',
            },
        },
        {
            name: 'article',
            type: 'relationship',
            relationTo: 'articles',
            required: true,
            hasMany: false,
            index: true,
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
            ],
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'comments',
            required: false,
            label: 'Reply To (Parent Comment)',
            filterOptions: ({ siblingData }) => {
                return {}
            },
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.COMMENTS)],
    },
}
