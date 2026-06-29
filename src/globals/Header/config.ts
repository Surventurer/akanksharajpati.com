// import { ColorPickerField } from '@/components/payload/ColorPickerField'
import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'

export const Header: GlobalConfig = {
    slug: 'header',
    label: 'Header',
    access: globalAccess('design', 'header'),
    admin: {
        group: 'Design',
    },
    fields: [
        {
            name: 'headerBackgroundColor',
            type: 'text',
            label: 'Header Background Color',
            defaultValue: '#F2EBD0',
            admin: {
                description: 'Background color for both the top bar and menu overlay',
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'headerTextColor',
            type: 'text',
            label: 'Header Text Color',
            defaultValue: '#4a4b34',
            admin: {
                description: 'Default text color for the header (can be overridden per item)',
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Identity',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'logo',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: false,
                                    label: 'Logo',
                                },
                                {
                                    name: 'ownerName',
                                    type: 'text',
                                    label: 'Owner Name',
                                },
                                {
                                    name: 'ownerFont',
                                    type: 'relationship',
                                    relationTo: 'fonts',
                                    label: 'Owner Name Font',
                                },
                                {
                                    name: 'ownerColor',
                                    type: 'text',
                                    label: 'Owner Name Color (Hex)',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Navigation',
                    fields: [
                        {
                            name: 'navItems',
                            type: 'array',
                            label: 'Navigation Tabs',
                            minRows: 1,
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
                                {
                                    name: 'font',
                                    type: 'relationship',
                                    relationTo: 'fonts',
                                    label: 'Label Font',
                                },
                                {
                                    name: 'color',
                                    type: 'text',
                                    label: 'Label Color (Hex)',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Actions',
                    fields: [
                        {
                            name: 'socialLinks',
                            type: 'array',
                            label: 'Social Links',
                            fields: [
                                {
                                    name: 'platform',
                                    type: 'text',
                                    required: true,
                                    label: 'Platform Name (e.g. Instagram)',
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: 'URL',
                                    required: true,
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon (SVG/Image)',
                                },
                                {
                                    name: 'font',
                                    type: 'relationship',
                                    relationTo: 'fonts',
                                    label: 'Label Font (fallback)',
                                },
                                {
                                    name: 'color',
                                    type: 'text',
                                    label: 'Label Color (Hex)',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                }
                            ],
                        },
                        {
                            name: 'navIcons',
                            type: 'array',
                            label: 'Header Icons',
                            fields: [
                                {
                                    name: 'enabled',
                                    type: 'checkbox',
                                    label: 'Show this icon',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Uncheck to hide this icon from the header',
                                    },
                                },
                                {
                                    name: 'type',
                                    type: 'select',
                                    options: [
                                        { label: 'Search', value: 'search' },
                                        { label: 'Link', value: 'link' },
                                    ],
                                    defaultValue: 'link',
                                    required: true,
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon (SVG/Image)',
                                },
                                {
                                    name: 'showIcon',
                                    type: 'checkbox',
                                    label: 'Show Icon Image',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Display this icon',
                                    },
                                },
                                {
                                    name: 'showIconOnDesktop',
                                    type: 'checkbox',
                                    label: 'Show Icon on Desktop',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Display icon on desktop view',
                                        condition: (_, siblingData) => siblingData.showIcon === true,
                                    },
                                },
                                {
                                    name: 'showIconOnMobile',
                                    type: 'checkbox',
                                    label: 'Show Icon on Mobile',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Display icon on mobile view',
                                        condition: (_, siblingData) => siblingData.showIcon === true,
                                    },
                                },
                                {
                                    name: 'showLabel',
                                    type: 'checkbox',
                                    label: 'Show Text Label',
                                    defaultValue: false,
                                    admin: {
                                        description: 'Display text label independently',
                                    },
                                },
                                {
                                    name: 'showLabelOnDesktop',
                                    type: 'checkbox',
                                    label: 'Show Label on Desktop',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Display label on desktop view',
                                        condition: (_, siblingData) => siblingData.showLabel === true,
                                    },
                                },
                                {
                                    name: 'showLabelOnMobile',
                                    type: 'checkbox',
                                    label: 'Show Label on Mobile',
                                    defaultValue: true,
                                    admin: {
                                        description: 'Display label on mobile view',
                                        condition: (_, siblingData) => siblingData.showLabel === true,
                                    },
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    label: 'Link URL',
                                    admin: {
                                        condition: (_, siblingData) => siblingData.type === 'link',
                                    },
                                },
                                {
                                    name: 'newTab',
                                    type: 'checkbox',
                                    label: 'Open in new tab',
                                    defaultValue: false,
                                    admin: {
                                        condition: (_, siblingData) => siblingData.type === 'link',
                                    },
                                },
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Label (for accessibility)',
                                },
                                {
                                    name: 'font',
                                    type: 'relationship',
                                    relationTo: 'fonts',
                                    label: 'Label Font',
                                },
                                {
                                    name: 'color',
                                    type: 'text',
                                    label: 'Label Color (Hex)',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },

                            ],
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
                                description: 'Page/section background color (Cream)',
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
