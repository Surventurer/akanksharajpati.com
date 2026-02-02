import { GlobalConfig } from 'payload'

export const BlogPage: GlobalConfig = {
    slug: 'blog-page',
    label: 'Blog Page',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Pages',
    },
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable Blog Page',
            defaultValue: true,
            admin: {
                description: 'If disabled, a coming soon message will be shown',
            },
        },
        {
            name: 'headerEnabled',
            type: 'checkbox',
            label: 'Enable Header Section',
            defaultValue: true,
        },
        {
            name: 'sectionLabel',
            type: 'text',
            defaultValue: 'The Blog',
            required: true,
        },
        {
            name: 'sectionLabelFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Section Label Font',
        },
        {
            name: 'sectionLabelColor',
            type: 'text',
            label: 'Section Label Color',
            defaultValue: '#868753',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'headingNormal',
            type: 'text',
            defaultValue: 'Stories &',
            required: true,
        },
        {
            name: 'headingNormalFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Heading Normal Font',
        },
        {
            name: 'headingNormalColor',
            type: 'text',
            label: 'Heading Normal Color',
            defaultValue: '#4a4b34',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'headingAccent',
            type: 'text',
            defaultValue: 'Inspiration',
            required: true,
        },
        {
            name: 'headingAccentFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Heading Accent Font',
        },
        {
            name: 'headingAccentColor',
            type: 'text',
            label: 'Heading Accent Color',
            defaultValue: '#B88078',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'description',
            type: 'textarea',
            defaultValue: 'A curated collection of thoughts on design, lifestyle, and the beauty of slow living.',
            required: true,
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
            label: 'Description Color',
            defaultValue: '#6b6c4f',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'newsletterHeading',
            type: 'text',
            defaultValue: 'Join Our Inner Circle',
            required: true,
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
            name: 'newsletterText',
            type: 'textarea',
            defaultValue: 'Receive exclusive stories, early access to new collections, and weekly inspiration delivered to your inbox.',
            required: true,
        },
        {
            name: 'newsletterTextFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Newsletter Text Font',
        },
        {
            name: 'newsletterTextColor',
            type: 'text',
            label: 'Newsletter Text Color',
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
            defaultValue: 'Subscribe',
            required: true,
        },
        {
            name: 'newsletterButtonTextFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Newsletter Button Text Font',
        },
        {
            name: 'newsletterButtonTextColor',
            type: 'text',
            label: 'Newsletter Button Text Color',
            defaultValue: '#F2EBD0',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'shareHeading',
            type: 'text',
            defaultValue: 'Share this story',
            required: true,
            label: 'Share Section Heading',
        },
        {
            name: 'shareHeadingFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Share Heading Font',
        },
        {
            name: 'shareHeadingColor',
            type: 'text',
            label: 'Share Heading Color',
            defaultValue: '#4a4b34',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'shareSubheading',
            type: 'text',
            defaultValue: 'Spread the inspiration with your circle.',
            required: true,
            label: 'Share Section Subheading',
        },
        {
            name: 'shareSubheadingFont',
            type: 'relationship',
            relationTo: 'fonts',
            label: 'Share Subheading Font',
        },
        {
            name: 'shareSubheadingColor',
            type: 'text',
            label: 'Share Subheading Color',
            defaultValue: '#6b6c4f',
            admin: {
                components: {
                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                },
            },
        },
        {
            name: 'socialPlatforms',
            type: 'array',
            label: 'Social Share Icons',
            minRows: 1,
            fields: [
                {
                    name: 'platform',
                    type: 'text',
                    label: 'Platform Name (e.g. Facebook, Instagram)',
                    required: true,
                },
                {
                    name: 'shareUrl',
                    type: 'text',
                    label: 'Share URL Pattern (Optional)',
                    admin: {
                        description: 'Use {url} and {title} as placeholders. E.g. https://example.com/share?u={url}',
                    },
                },
                {
                    name: 'showIcon',
                    type: 'checkbox',
                    label: 'Show Icon',
                    defaultValue: true,
                    admin: {
                        description: 'If disabled, only the text will be shown',
                    },
                },
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Custom Icon (Optional)',
                    required: false,
                    admin: {
                        condition: (data, siblingData) => siblingData?.showIcon,
                        description: 'Upload a custom icon, or leave empty to use the default icon',
                    },
                },
                {
                    name: 'customText',
                    type: 'text',
                    label: 'Custom Display Text (Optional)',
                    admin: {
                        description: 'Override the platform name with custom text. Leave empty to use platform name.',
                    },
                },
                {
                    name: 'textFont',
                    type: 'relationship',
                    relationTo: 'fonts',
                    label: 'Text Font (Optional)',
                    admin: {
                        description: 'Custom font for this platform text',
                    },
                },
                {
                    name: 'textColor',
                    type: 'text',
                    label: 'Text Color (Optional)',
                    admin: {
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                        description: 'Custom color for this platform text',
                    },
                },
            ],
            defaultValue: [
                { platform: 'Facebook' },
                { platform: 'Twitter' },
                { platform: 'LinkedIn' },
                { platform: 'Instagram' },
                { platform: 'Copy Link' },
            ],
        },
        // =====================
        // THEME SETTINGS
        // =====================
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
                    name: 'backgroundColor',
                    type: 'text',
                    label: 'Page Background Color',
                    defaultValue: '#F2EBD0',
                    admin: {
                        description: 'Main page background color (Cream)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
                {
                    name: 'cardBackgroundColor',
                    type: 'text',
                    label: 'Card Background Color',
                    defaultValue: '#F2EBD0',
                    admin: {
                        description: 'Background color for blog cards',
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
                        description: 'Default border color (Golden)',
                        components: {
                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                        },
                    },
                },
            ],
        },
    ],
}
