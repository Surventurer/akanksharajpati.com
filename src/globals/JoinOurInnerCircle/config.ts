import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const JoinOurInnerCircle: GlobalConfig = {
    slug: 'join-our-inner-circle',
    label: 'Join Our Inner Circle',
    access: globalAccess('design', 'joinOurInnerCircle'),
    admin: {
        group: 'Design',
    },
    fields: [
        {
            name: 'enabled',
            type: 'checkbox',
            label: 'Enable Join Our Inner Circle Section',
            defaultValue: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'Title',
                    defaultValue: 'Join Our Inner Circle',
                },
                {
                    name: 'titleFont',
                    type: 'relationship',
                    relationTo: 'fonts',
                    label: 'Title Font',
                },
                {
                    name: 'titleColor',
                    type: 'text',
                    label: 'Title Color (Hex)',
                    defaultValue: '#4a4b34',
                    admin: {
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description',
                    defaultValue: 'Subscribe to get exclusive updates, offers, and early access.',
                },
                {
                    name: 'descriptionFont',
                    type: 'relationship',
                    relationTo: 'fonts',
                    label: 'Description Font',
                },
                {
                    name: 'descriptionColor',
                    type: 'text',
                    label: 'Description Color (Hex)',
                    defaultValue: '#6b6c4f',
                    admin: {
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'buttonText',
                    type: 'text',
                    label: 'Button Text',
                    defaultValue: 'Subscribe',
                },
                {
                    name: 'buttonFont',
                    type: 'relationship',
                    relationTo: 'fonts',
                    label: 'Button Font',
                },
                {
                    name: 'buttonTextColor',
                    type: 'text',
                    label: 'Button Text Color (Hex)',
                    defaultValue: '#F2EBD0',
                    admin: {
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'buttonBackgroundColor',
                    type: 'text',
                    label: 'Button Background Color (Hex)',
                    defaultValue: '#4a4b34',
                    admin: {
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
            ],
        },
        {
            name: 'backgroundColor',
            type: 'text',
            label: 'Section Background Color (Hex)',
            defaultValue: '#F2EBD0',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        // Theme Settings Group
        {
            type: 'collapsible',
            label: 'Theme Settings',
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: 'primaryColor',
                    type: 'text',
                    label: 'Primary Color',
                    defaultValue: '#B88078',
                    admin: {
                        description: 'Main accent color (Dusty Rose)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'secondaryColor',
                    type: 'text',
                    label: 'Secondary Color',
                    defaultValue: '#C49A48',
                    admin: {
                        description: 'Secondary accent color (Golden)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'textColor',
                    type: 'text',
                    label: 'Text Color',
                    defaultValue: '#4a4b34',
                    admin: {
                        description: 'Main text color (Dark Olive)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'mutedTextColor',
                    type: 'text',
                    label: 'Muted Text Color',
                    defaultValue: '#6b6c4f',
                    admin: {
                        description: 'Secondary/muted text color (Muted Olive)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'borderColor',
                    type: 'text',
                    label: 'Border Color',
                    defaultValue: '#C49A48',
                    admin: {
                        description: 'Default border color',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'inputBackgroundColor',
                    type: 'text',
                    label: 'Input Background Color',
                    defaultValue: '#FFFFFF',
                    admin: {
                        description: 'Background color for input fields',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
            ],
        },
    ],
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.JOIN_INNER_CIRCLE)],
    },
}
