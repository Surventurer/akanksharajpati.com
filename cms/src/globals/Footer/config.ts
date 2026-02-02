import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Footer',
    admin: {
        group: 'Layout',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'enabled',
            type: 'checkbox',
            label: 'Enable Footer',
            defaultValue: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Brand Section',
                    fields: [
                        {
                            name: 'brandEnabled',
                            type: 'checkbox',
                            label: 'Enable Brand Section',
                            defaultValue: true,
                        },
                        {
                            name: 'brandName',
                            type: 'text',
                            label: 'Brand Name',
                            defaultValue: 'Autumn Stories',
                        },
                        {
                            name: 'brandNameFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Brand Name Font',
                        },
                        {
                            name: 'brandNameColor',
                            type: 'text',
                            label: 'Brand Name Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'brandDescription',
                            type: 'textarea',
                            label: 'Brand Description',
                            defaultValue: 'A luxury lifestyle journal dedicated to the refined aesthetics of the transitional seasons. Based in England, reaching the world.',
                        },
                        {
                            name: 'brandDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Brand Description Font',
                        },
                        {
                            name: 'brandDescriptionColor',
                            type: 'text',
                            label: 'Brand Description Color',
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
                    label: 'Discover Links',
                    fields: [
                        {
                            name: 'discoverLinksEnabled',
                            type: 'checkbox',
                            label: 'Enable Discover Links Section',
                            defaultValue: true,
                        },
                        {
                            name: 'discoverLinksHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: 'Discover',
                        },
                        {
                            name: 'discoverLinks',
                            type: 'array',
                            label: 'Links',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'newTab',
                                    type: 'checkbox',
                                    label: 'Open in new tab',
                                    defaultValue: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Information Links',
                    fields: [
                        {
                            name: 'infoLinksEnabled',
                            type: 'checkbox',
                            label: 'Enable Information Links Section',
                            defaultValue: true,
                        },
                        {
                            name: 'infoLinksHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: 'Information',
                        },
                        {
                            name: 'infoLinks',
                            type: 'array',
                            label: 'Links',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'newTab',
                                    type: 'checkbox',
                                    label: 'Open in new tab',
                                    defaultValue: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Newsletter Section',
                    fields: [
                        {
                            name: 'newsletterEnabled',
                            type: 'checkbox',
                            label: 'Enable Newsletter Section',
                            defaultValue: true,
                        },
                        {
                            name: 'newsletterHeading',
                            type: 'text',
                            label: 'Newsletter Heading',
                            defaultValue: 'Stay Inspired',
                        },
                        {
                            name: 'newsletterHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Newsletter Heading Font',
                        },
                        {
                            name: 'newsletterHeadingColor',
                            type: 'text',
                            label: 'Newsletter Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'newsletterDescription',
                            type: 'textarea',
                            label: 'Newsletter Description',
                            defaultValue: 'Join our community for exclusive content, early access, and seasonal inspirations.',
                        },
                        {
                            name: 'newsletterDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Newsletter Description Font',
                        },
                        {
                            name: 'newsletterDescriptionColor',
                            type: 'text',
                            label: 'Newsletter Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'newsletterButtonText',
                            type: 'text',
                            label: 'Button Text',
                            defaultValue: 'Subscribe',
                        },
                    ],
                },
                {
                    label: 'Social Links',
                    fields: [
                        {
                            name: 'socialLinksEnabled',
                            type: 'checkbox',
                            label: 'Enable Social Links',
                            defaultValue: true,
                        },
                        {
                            name: 'socialLinks',
                            type: 'array',
                            label: 'Social Links',
                            fields: [
                                {
                                    name: 'platform',
                                    type: 'text',
                                    label: 'Platform Name',
                                    required: true,
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: 'URL',
                                    required: true,
                                },
                                {
                                    name: 'showIcon',
                                    type: 'checkbox',
                                    label: 'Show Icon',
                                    defaultValue: true,
                                    admin: {
                                        description: 'If disabled, only the platform name text will be shown',
                                    },
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Custom Icon (Optional)',
                                    admin: {
                                        condition: (data, siblingData) => siblingData?.showIcon,
                                        description: 'Upload a custom icon, or leave empty to use the default icon',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Copyright',
                    fields: [
                        {
                            name: 'copyrightEnabled',
                            type: 'checkbox',
                            label: 'Enable Copyright Section',
                            defaultValue: true,
                        },
                        {
                            name: 'copyrightText',
                            type: 'text',
                            label: 'Copyright Text',
                            defaultValue: '© 2024 Autumn Stories. All rights reserved.',
                        },
                        {
                            name: 'copyrightTextFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Copyright Font',
                        },
                        {
                            name: 'copyrightTextColor',
                            type: 'text',
                            label: 'Copyright Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // THEME SETTINGS
                // =====================
                {
                    label: 'Theme Settings',
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
                            name: 'backgroundColor',
                            type: 'text',
                            label: 'Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                description: 'Footer background color (Cream)',
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
                    ],
                },
            ],
        },
    ],
}
