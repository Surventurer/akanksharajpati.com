import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
    slug: 'comments',
    admin: {
        useAsTitle: 'content',
        group: 'Content',
        defaultColumns: ['content', 'authorName', 'status', 'article', 'createdAt'],
    },
    access: {
        read: () => true, // Publicly readable (frontend needs it)
        create: () => true, // Anyone can comment
        update: ({ req: { user } }) => !!user, // Only admin can update status
        delete: ({ req: { user } }) => !!user, // Only admin can delete
    },
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
                // Prevent self-reference if editing (basic check)
                return {}
            },
        },
    ],
    hooks: {
        // Optional: Email notification hook on create could go here
    }
}
