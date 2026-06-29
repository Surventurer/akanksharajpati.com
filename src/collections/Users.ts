import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'name',
        group: 'Settings',
        defaultColumns: ['name', 'email', 'role'],
    },
    auth: {
        tokenExpiration: 28800, // 8 hours
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Full Name',
            required: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            label: 'Profile Photo',
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
            ],
            defaultValue: 'editor',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
