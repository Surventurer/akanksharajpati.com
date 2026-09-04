import { CollectionConfig } from 'payload'
import { collectionAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'orderNumber',
        group: 'Shop',
        defaultColumns: ['orderNumber', 'customerEmail', 'total', 'paymentStatus', 'fulfillmentStatus', 'createdAt'],
    },
    access: {
        read: ({ req }) => Boolean(req.user),
        create: () => true,
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    fields: [
        {
            name: 'orderNumber',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                readOnly: true,
                description: 'Unique order reference identifier',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'customerEmail',
                    type: 'email',
                    required: true,
                    admin: { width: '50%' },
                },
                {
                    name: 'customerName',
                    type: 'text',
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'shippingAddress',
            type: 'group',
            fields: [
                { name: 'line1', type: 'text' },
                { name: 'line2', type: 'text' },
                {
                    type: 'row',
                    fields: [
                        { name: 'city', type: 'text', admin: { width: '33%' } },
                        { name: 'state', type: 'text', admin: { width: '33%' } },
                        { name: 'postalCode', type: 'text', admin: { width: '34%' } },
                    ],
                },
                { name: 'country', type: 'text' },
            ],
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                    min: 1,
                },
                {
                    name: 'unitPrice',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'totalPrice',
                    type: 'number',
                    required: true,
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'subtotal',
                    type: 'number',
                    required: true,
                    admin: { width: '25%' },
                },
                {
                    name: 'shipping',
                    type: 'number',
                    defaultValue: 0,
                    admin: { width: '25%' },
                },
                {
                    name: 'tax',
                    type: 'number',
                    defaultValue: 0,
                    admin: { width: '25%' },
                },
                {
                    name: 'total',
                    type: 'number',
                    required: true,
                    admin: { width: '25%' },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'paymentStatus',
                    type: 'select',
                    required: true,
                    defaultValue: 'pending',
                    options: [
                        { label: 'Pending', value: 'pending' },
                        { label: 'Paid', value: 'paid' },
                        { label: 'Failed', value: 'failed' },
                        { label: 'Refunded', value: 'refunded' },
                    ],
                    admin: { width: '50%' },
                },
                {
                    name: 'fulfillmentStatus',
                    type: 'select',
                    required: true,
                    defaultValue: 'unfulfilled',
                    options: [
                        { label: 'Unfulfilled', value: 'unfulfilled' },
                        { label: 'Processing', value: 'processing' },
                        { label: 'Shipped', value: 'shipped' },
                        { label: 'Delivered', value: 'delivered' },
                        { label: 'Cancelled', value: 'cancelled' },
                    ],
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'stripeSessionId',
            type: 'text',
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
        },
        {
            name: 'stripePaymentIntentId',
            type: 'text',
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.ORDERS)],
    },
}
