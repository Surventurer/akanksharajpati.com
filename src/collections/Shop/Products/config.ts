import { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const generateSlug: FieldHook = ({ value, data }) => {
    if (value) return slugify(String(value).trim()) || ''
    return slugify(String(data?.title || '').trim()) || ''
}

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
        group: 'Shop',
        defaultColumns: ['title', 'price', 'inventory', 'status', 'featured'],
    },
    access: collectionAccess('content', 'products', { publicRead: true }),
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
                description: 'Unique product URL handle',
            },
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'active',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                    min: 0,
                    admin: {
                        description: 'Current price (e.g. 45.00)',
                        width: '50%',
                    },
                },
                {
                    name: 'compareAtPrice',
                    type: 'number',
                    min: 0,
                    admin: {
                        description: 'Original retail price for sale strikethrough (optional)',
                        width: '50%',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'sku',
                    type: 'text',
                    admin: {
                        description: 'Stock Keeping Unit (optional)',
                        width: '50%',
                    },
                },
                {
                    name: 'inventory',
                    type: 'number',
                    defaultValue: 10,
                    required: true,
                    min: 0,
                    admin: {
                        description: 'Available stock quantity',
                        width: '50%',
                    },
                },
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'product-categories',
            hasMany: true,
            admin: {
                description: 'Product categories for browsing and filtering',
            },
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Primary product thumbnail and hero image',
            },
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'Additional Gallery Images',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            admin: {
                description: 'Brief product teaser displayed in grids and cards',
            },
        },
        {
            name: 'description',
            type: 'richText',
            admin: {
                description: 'Full product details, story, and specifications',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: 'Highlight this product on homepage or featured banners',
            },
        },
        {
            name: 'specifications',
            type: 'array',
            label: 'Specifications & Details',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.PRODUCTS)],
    },
}

