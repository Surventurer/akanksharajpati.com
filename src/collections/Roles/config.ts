import type { CollectionConfig } from 'payload'
import { checkPermission } from '@/payload/access'

export const Roles: CollectionConfig = {
    slug: 'roles',
    admin: {
        useAsTitle: 'name',
        group: 'Settings',
        defaultColumns: ['name', 'description', 'isOwner'],
    },
    access: {
        read: ({ req }) => !!req.user,
        create: ({ req }) => checkPermission(req, 'admin', 'roles', 'create'),
        update: ({ req }) => checkPermission(req, 'admin', 'roles', 'update'),
        delete: ({ req }) => checkPermission(req, 'admin', 'roles', 'delete'),
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Role Name',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
                description: 'Brief description of what this role allows',
            },
        },
        {
            name: 'isOwner',
            type: 'checkbox',
            label: 'Owner (Full Access)',
            defaultValue: false,
            admin: {
                position: 'sidebar',
                description: 'If checked, this role bypasses ALL permission checks (like Super Admin)',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'content',
                            type: 'group',
                            label: 'Content Permissions',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                {
                                    name: 'articles',
                                    type: 'group',
                                    label: 'Articles',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                                {
                                    name: 'articleAuthors',
                                    type: 'group',
                                    label: 'Article Authors',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                                {
                                    name: 'comments',
                                    type: 'group',
                                    label: 'Comments',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Pages',
                    fields: [
                        {
                            name: 'pages',
                            type: 'group',
                            label: 'Page Permissions',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                { name: 'homePage', type: 'group', label: 'Home', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'blogPage', type: 'group', label: 'Blog', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'aboutPage', type: 'group', label: 'About', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'shopPage', type: 'group', label: 'Shop', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'contactPage', type: 'group', label: 'Contact', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'watchPage', type: 'group', label: 'Watch', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                            ],
                        },
                    ],
                },
                {
                    label: 'Design',
                    fields: [
                        {
                            name: 'design',
                            type: 'group',
                            label: 'Design Permissions',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                { name: 'header', type: 'group', label: 'Header', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'footer', type: 'group', label: 'Footer', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                                { name: 'joinOurInnerCircle', type: 'group', label: 'Newsletter Popup', fields: [{ name: 'read', type: 'checkbox', label: 'Read' }, { name: 'update', type: 'checkbox', label: 'Update' }] },
                            ],
                        },
                    ],
                },
                {
                    label: 'Media',
                    fields: [
                        {
                            name: 'media',
                            type: 'group',
                            label: 'Media Permissions',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                {
                                    name: 'mediaFiles',
                                    type: 'group',
                                    label: 'Media',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                                {
                                    name: 'fonts',
                                    type: 'group',
                                    label: 'Fonts',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Admin',
                    fields: [
                        {
                            name: 'admin',
                            type: 'group',
                            label: 'Admin Permissions',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                {
                                    name: 'users',
                                    type: 'group',
                                    label: 'Users',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                                {
                                    name: 'roles',
                                    type: 'group',
                                    label: 'Roles',
                                    fields: [
                                        { name: 'read', type: 'checkbox', label: 'Read' },
                                        { name: 'create', type: 'checkbox', label: 'Create' },
                                        { name: 'update', type: 'checkbox', label: 'Update' },
                                        { name: 'delete', type: 'checkbox', label: 'Delete' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
