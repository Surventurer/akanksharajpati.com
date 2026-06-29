import type { CollectionConfig } from 'payload'
import { usersAccess } from '@/payload/access'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'name',
        group: 'Settings',
        defaultColumns: ['name', 'email', 'role'],
    },
    auth: {
        tokenExpiration: 28800,
        depth: 1,
    },
    access: usersAccess(),
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
            type: 'relationship',
            relationTo: 'roles',
            required: true,
            label: 'Role',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Contact an owner to change your role',
            },
        },
    ],
}
