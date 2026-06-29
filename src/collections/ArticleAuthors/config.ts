import { CollectionConfig } from 'payload'
import { collectionAccess } from '@/payload/access'

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    admin: {
        useAsTitle: 'name',
        group: 'Content',
    },
    access: collectionAccess('content', 'articleAuthors'),
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'role',
            type: 'text',
            defaultValue: 'Staff Writer',
            required: true,
        },
        {
            name: 'bio',
            type: 'textarea',
            defaultValue: 'Evaluating the intersections of design, culture, and sustainable living.',
        },
    ],
}
