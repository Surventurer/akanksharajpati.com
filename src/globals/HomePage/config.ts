import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const HomePage: GlobalConfig = {
    slug: 'home-page',
    label: 'Home Page',
    admin: {
        group: 'Pages',
    },
    access: globalAccess('pages', 'homePage'),
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable Home Page',
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
                            label: 'Show Hero Background Image',
                            defaultValue: true,
                            admin: {
                                condition: (data) => data?.heroEnabled,
                                description: 'If disabled, the hero section will show without the background image',
                            },
                        },
                        {
                            name: 'heroImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Hero Background Image',
                            admin: {
                                condition: (data) => data?.heroEnabled && data?.showHeroImage,
                            },
                        },
                        {
                            name: 'heroHeadingLine1',
                            type: 'text',
                            label: 'Heading Line 1',
                            defaultValue: 'Between Summer',
                        },
                        {
                            name: 'heroHeadingLine1Font',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Line 1 Font',
                        },
                        {
                            name: 'heroHeadingLine1Color',
                            type: 'text',
                            label: 'Heading Line 1 Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroHeadingLine2',
                            type: 'text',
                            label: 'Heading Line 2 (Accent)',
                            defaultValue: '& Autumn',
                        },
                        {
                            name: 'heroHeadingLine2Font',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Line 2 Font',
                        },
                        {
                            name: 'heroHeadingLine2Color',
                            type: 'text',
                            label: 'Heading Line 2 Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroDescription',
                            type: 'textarea',
                            label: 'Hero Description',
                            defaultValue: 'Capturing the golden transition where warmth meets the crisp morning air, curated for the modern romantic.',
                        },
                        {
                            name: 'heroDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Hero Description Font',
                        },
                        {
                            name: 'heroDescriptionColor',
                            type: 'text',
                            label: 'Hero Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroButtonText',
                            type: 'text',
                            label: 'Hero Button Text',
                            defaultValue: 'The Journal',
                        },
                        {
                            name: 'heroButtonLink',
                            type: 'text',
                            label: 'Hero Button Link',
                            defaultValue: '/blog',
                        },
                        {
                            name: 'heroButtonFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Hero Button Font',
                        },
                        {
                            name: 'heroButtonTextColor',
                            type: 'text',
                            label: 'Hero Button Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroButtonBgColor',
                            type: 'text',
                            label: 'Hero Button Background Color',
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
                    label: 'About Preview Section',
                    fields: [
                        {
                            name: 'aboutPreviewEnabled',
                            type: 'checkbox',
                            label: 'Enable About Preview Section',
                            defaultValue: true,
                        },
                        {
                            name: 'showAboutPreviewImage',
                            type: 'checkbox',
                            label: 'Show About Preview Image',
                            defaultValue: true,
                            admin: {
                                condition: (data) => data?.aboutPreviewEnabled,
                                description: 'If disabled, the section will show without the image',
                            },
                        },
                        {
                            name: 'aboutPreviewImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'About Preview Image',
                            admin: {
                                condition: (data) => data?.aboutPreviewEnabled && data?.showAboutPreviewImage,
                            },
                        },
                        {
                            name: 'aboutPreviewSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'The Creative Vision',
                        },
                        {
                            name: 'aboutPreviewSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'aboutPreviewSectionLabelColor',
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
                            name: 'aboutPreviewHeadingNormal',
                            type: 'text',
                            label: 'Heading Normal',
                            defaultValue: "Hello, I'm",
                        },
                        {
                            name: 'aboutPreviewHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Normal Font',
                        },
                        {
                            name: 'aboutPreviewHeadingNormalColor',
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
                            name: 'aboutPreviewHeadingAccent',
                            type: 'text',
                            label: 'Heading Accent',
                            defaultValue: 'Sarah',
                        },
                        {
                            name: 'aboutPreviewHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Accent Font',
                        },
                        {
                            name: 'aboutPreviewHeadingAccentColor',
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
                            name: 'aboutPreviewTextMain',
                            type: 'textarea',
                            label: 'Main Text',
                            defaultValue: 'Welcome to my digital editorial—a dedicated space for slow living, high-end fashion, and the quiet luxury of the autumnal season.',
                        },
                        {
                            name: 'aboutPreviewTextMainFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Main Text Font',
                        },
                        {
                            name: 'aboutPreviewTextMainColor',
                            type: 'text',
                            label: 'Main Text Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'aboutPreviewTextSecondary',
                            type: 'textarea',
                            label: 'Secondary Text',
                            defaultValue: "Based in the Cotswolds, I've spent years refining an aesthetic that honors the seasons. This platform serves as a curated guide for those who seek beauty in the mundane and elegance in the everyday.",
                        },
                        {
                            name: 'aboutPreviewTextSecondaryFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Secondary Text Font',
                        },
                        {
                            name: 'aboutPreviewTextSecondaryColor',
                            type: 'text',
                            label: 'Secondary Text Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'aboutPreviewButtonText',
                            type: 'text',
                            label: 'Button Text',
                            defaultValue: 'Learn More About My Story',
                        },
                        {
                            name: 'aboutPreviewButtonLink',
                            type: 'text',
                            label: 'Button Link',
                            defaultValue: '/about',
                        },
                    ],
                },
                {
                    label: 'Shop Preview Section',
                    fields: [
                        {
                            name: 'shopPreviewEnabled',
                            type: 'checkbox',
                            label: 'Enable Shop Preview Section',
                            defaultValue: true,
                        },
                        {
                            name: 'shopPreviewSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'The Atelier',
                        },
                        {
                            name: 'shopPreviewSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'shopPreviewSectionLabelColor',
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
                            name: 'shopPreviewHeadingNormal',
                            type: 'text',
                            label: 'Heading Normal',
                            defaultValue: 'Shop My',
                        },
                        {
                            name: 'shopPreviewHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Normal Font',
                        },
                        {
                            name: 'shopPreviewHeadingNormalColor',
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
                            name: 'shopPreviewHeadingAccent',
                            type: 'text',
                            label: 'Heading Accent',
                            defaultValue: 'Autumn Edits',
                        },
                        {
                            name: 'shopPreviewHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Accent Font',
                        },
                        {
                            name: 'shopPreviewHeadingAccentColor',
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
                            name: 'shopPreviewDescription',
                            type: 'text',
                            label: 'Description',
                            defaultValue: 'Handpicked pieces for your wardrobe and home.',
                        },
                        {
                            name: 'shopPreviewDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Description Font',
                        },
                        {
                            name: 'shopPreviewDescriptionColor',
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
                            name: 'shopPreviewButtonText',
                            type: 'text',
                            label: 'View All Button Text',
                            defaultValue: 'View All Products',
                        },
                        {
                            name: 'shopPreviewButtonLink',
                            type: 'text',
                            label: 'View All Button Link',
                            defaultValue: '/shop',
                        },
                    ],
                },
                {
                    label: 'Blog Preview Section',
                    fields: [
                        {
                            name: 'blogPreviewEnabled',
                            type: 'checkbox',
                            label: 'Enable Blog Preview Section',
                            defaultValue: true,
                        },
                        {
                            name: 'blogPreviewSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'The Journal',
                        },
                        {
                            name: 'blogPreviewSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'blogPreviewSectionLabelColor',
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
                            name: 'blogPreviewHeadingNormal',
                            type: 'text',
                            label: 'Heading Normal',
                            defaultValue: 'Latest',
                        },
                        {
                            name: 'blogPreviewHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Normal Font',
                        },
                        {
                            name: 'blogPreviewHeadingNormalColor',
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
                            name: 'blogPreviewHeadingAccent',
                            type: 'text',
                            label: 'Heading Accent',
                            defaultValue: 'Stories',
                        },
                        {
                            name: 'blogPreviewHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Accent Font',
                        },
                        {
                            name: 'blogPreviewHeadingAccentColor',
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
                            name: 'blogPreviewButtonText',
                            type: 'text',
                            label: 'View All Button Text',
                            defaultValue: 'View All Stories',
                        },
                        {
                            name: 'blogPreviewButtonLink',
                            type: 'text',
                            label: 'View All Button Link',
                            defaultValue: '/blog',
                        },
                    ],
                },
                {
                    label: 'Watch Preview Section',
                    fields: [
                        {
                            name: 'watchPreviewEnabled',
                            type: 'checkbox',
                            label: 'Enable Watch Preview Section',
                            defaultValue: true,
                        },
                        {
                            name: 'watchPreviewSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'The Visual Diary',
                        },
                        {
                            name: 'watchPreviewSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'watchPreviewSectionLabelColor',
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
                            name: 'watchPreviewHeadingNormal',
                            type: 'text',
                            label: 'Heading Normal',
                            defaultValue: 'Recent',
                        },
                        {
                            name: 'watchPreviewHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Normal Font',
                        },
                        {
                            name: 'watchPreviewHeadingNormalColor',
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
                            name: 'watchPreviewHeadingAccent',
                            type: 'text',
                            label: 'Heading Accent',
                            defaultValue: 'Videos',
                        },
                        {
                            name: 'watchPreviewHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Accent Font',
                        },
                        {
                            name: 'watchPreviewHeadingAccentColor',
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
                            name: 'watchPreviewDescription',
                            type: 'textarea',
                            label: 'Description',
                            defaultValue: 'Visual stories capturing the beauty of seasonal living.',
                        },
                        {
                            name: 'watchPreviewDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Description Font',
                        },
                        {
                            name: 'watchPreviewDescriptionColor',
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
                            name: 'watchPreviewButtonText',
                            type: 'text',
                            label: 'View All Button Text',
                            defaultValue: 'Watch All Videos',
                        },
                        {
                            name: 'watchPreviewButtonLink',
                            type: 'text',
                            label: 'View All Button Link',
                            defaultValue: '/watch',
                        },
                    ],
                },
                {
                    label: 'Contact Preview Section',
                    fields: [
                        {
                            name: 'contactPreviewEnabled',
                            type: 'checkbox',
                            label: 'Enable Contact Preview Section',
                            defaultValue: true,
                        },
                        {
                            name: 'contactPreviewSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'Let’s Connect',
                        },
                        {
                            name: 'contactPreviewSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'contactPreviewSectionLabelColor',
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
                            name: 'contactPreviewHeadingNormal',
                            type: 'text',
                            label: 'Heading Normal',
                            defaultValue: 'Get in',
                        },
                        {
                            name: 'contactPreviewHeadingNormalFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Normal Font',
                        },
                        {
                            name: 'contactPreviewHeadingNormalColor',
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
                            name: 'contactPreviewHeadingAccent',
                            type: 'text',
                            label: 'Heading Accent',
                            defaultValue: 'Touch',
                        },
                        {
                            name: 'contactPreviewHeadingAccentFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Heading Accent Font',
                        },
                        {
                            name: 'contactPreviewHeadingAccentColor',
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
                            name: 'contactPreviewDescription',
                            type: 'textarea',
                            label: 'Description',
                            defaultValue: "Have a question, collaboration idea, or just want to say hello? I'd love to hear from you.",
                        },
                        {
                            name: 'contactPreviewDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Description Font',
                        },
                        {
                            name: 'contactPreviewDescriptionColor',
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
                            name: 'contactPreviewButtonText',
                            type: 'text',
                            label: 'Button Text',
                            defaultValue: 'Get in Touch',
                        },
                        {
                            name: 'contactPreviewButtonLink',
                            type: 'text',
                            label: 'Button Link',
                            defaultValue: '/contact',
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
                        {
                            name: 'buttonPrimaryBgColor',
                            type: 'text',
                            label: 'Primary Button Background',
                            defaultValue: '#4a4b34',
                            admin: {
                                description: 'Background color for primary buttons',
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'buttonPrimaryTextColor',
                            type: 'text',
                            label: 'Primary Button Text',
                            defaultValue: '#F2EBD0',
                            admin: {
                                description: 'Text color for primary buttons',
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
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.HOME_PAGE)],
    },
}
