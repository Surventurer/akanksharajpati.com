// import { ColorPickerField } from '@/components/payload/ColorPickerField'
import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'

export const AboutPage: GlobalConfig = {
    slug: 'about-page',
    label: 'About Page',
    admin: {
        group: 'Pages',
    },
    access: globalAccess('pages', 'aboutPage'),
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable About Page',
            defaultValue: true,
            admin: {
                description: 'If disabled, a coming soon message will be shown',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero Section',
                    fields: [
                        {
                            name: 'heroEnabled',
                            type: 'checkbox',
                            label: 'Enable Hero Section',
                            defaultValue: true,
                        },
                        {
                            name: 'showHeroImage',
                            type: 'checkbox',
                            label: 'Show Hero Image',
                            defaultValue: true,
                            admin: {
                                condition: (data) => data?.heroEnabled,
                                description: 'If disabled, the hero section will show without the image',
                            },
                        },
                        {
                            name: 'heroImage',
                            type: 'upload',
                            relationTo: 'media',
                            required: false,
                            label: 'Main Image',
                            admin: {
                                condition: (data) => data?.heroEnabled && data?.showHeroImage,
                            },
                        },
                        {
                            name: 'sectionLabel',
                            type: 'text',
                            defaultValue: 'The Creative Vision',
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
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'headingNormal',
                            type: 'text',
                            defaultValue: "Hello, I'm",
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
                            defaultValue: 'Sarah',
                            label: 'Accent Heading (Serif/Italic)',
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
                            name: 'introTextMain',
                            type: 'textarea',
                            defaultValue: 'Welcome to my digital editorial—a dedicated space for slow living, high-end fashion, and the quiet luxury of the autumnal season.',
                        },
                        {
                            name: 'introTextMainFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Intro Text Main Font',
                        },
                        {
                            name: 'introTextMainColor',
                            type: 'text',
                            label: 'Intro Text Main Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'introTextSecondary',
                            type: 'textarea',
                            defaultValue: "Based in the Cotswolds, I've spent years refining an aesthetic that honors the seasons. This platform serves as a curated guide for those who seek beauty in the mundane and elegance in the everyday.",
                        },
                        {
                            name: 'introTextSecondaryFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Intro Text Secondary Font',
                        },
                        {
                            name: 'introTextSecondaryColor',
                            type: 'text',
                            label: 'Intro Text Secondary Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'showSignatureImage',
                            type: 'checkbox',
                            label: 'Show Signature Image',
                            defaultValue: true,
                            admin: {
                                description: 'If disabled, no signature image will be shown',
                            },
                        },
                        {
                            name: 'signatureImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Signature Image',
                            admin: {
                                condition: (data) => data?.showSignatureImage,
                            },
                        }
                    ]
                },
                {
                    label: 'Philosophy Section',
                    fields: [
                        {
                            name: 'philosophyEnabled',
                            type: 'checkbox',
                            label: 'Enable Philosophy Section',
                            defaultValue: true,
                        },
                        {
                            name: 'philosophyLabel',
                            type: 'text',
                            defaultValue: 'My Philosophy',
                        },
                        {
                            name: 'philosophyLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Philosophy Label Font',
                        },
                        {
                            name: 'philosophyLabelColor',
                            type: 'text',
                            label: 'Philosophy Label Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'philosophyQuote',
                            type: 'textarea',
                            defaultValue: '"Beauty lies in the details we often overlook"',
                        },
                        {
                            name: 'philosophyQuoteFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Philosophy Quote Font',
                        },
                        {
                            name: 'philosophyQuoteColor',
                            type: 'text',
                            label: 'Philosophy Quote Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'philosophyText',
                            type: 'textarea',
                            defaultValue: "Every piece I curate, every story I tell, is rooted in the belief that luxury isn't about excess—it's about intention. It's the warmth of a handwoven throw, the scent of a perfectly blended candle, the way autumn light falls through a window.",
                        },
                        {
                            name: 'philosophyTextFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Philosophy Text Font',
                        },
                        {
                            name: 'philosophyTextColor',
                            type: 'text',
                            label: 'Philosophy Text Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ]
                },
                {
                    label: 'Values Section',
                    fields: [
                        {
                            name: 'valuesEnabled',
                            type: 'checkbox',
                            label: 'Enable Values Section',
                            defaultValue: true,
                        },
                        {
                            name: 'valuesLabel',
                            type: 'text',
                            defaultValue: 'Core Values',
                        },
                        {
                            name: 'valuesLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Values Label Font',
                        },
                        {
                            name: 'valuesLabelColor',
                            type: 'text',
                            label: 'Values Label Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'valuesHeadingNormal',
                            type: 'text',
                            defaultValue: 'What I',
                        },
                        {
                            name: 'valuesHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Values Heading Normal Font',
                        },
                        {
                            name: 'valuesHeadingNormalColor',
                            type: 'text',
                            label: 'Values Heading Normal Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'valuesHeadingAccent',
                            type: 'text',
                            defaultValue: 'Stand For',
                        },
                        {
                            name: 'valuesHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Values Heading Accent Font',
                        },
                        {
                            name: 'valuesHeadingAccentColor',
                            type: 'text',
                            label: 'Values Heading Accent Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'values',
                            type: 'array',
                            minRows: 1,
                            maxRows: 3,
                            fields: [
                                {
                                    name: 'showIcon',
                                    type: 'checkbox',
                                    label: 'Show Icon',
                                    defaultValue: true,
                                    admin: {
                                        description: 'If disabled, only the title and description will be shown',
                                    },
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon (SVG/Image)',
                                    admin: {
                                        condition: (data, siblingData) => siblingData?.showIcon,
                                    },
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
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
                                    label: 'Title Color',
                                    defaultValue: '#4a4b34',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
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
                                }
                            ]
                        }
                    ]
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
                                description: 'Background color for cards',
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
            ]
        }
    ]
}
