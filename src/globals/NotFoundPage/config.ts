import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const NotFoundPage: GlobalConfig = {
    slug: 'not-found-page',
    label: '404 Not Found Page',
    access: globalAccess('pages', 'notFoundPage'),
    admin: {
        group: 'Pages',
        description: 'Manage the 404 error page typography, copy, colors, and quick navigation links.',
    },
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.NOT_FOUND_PAGE)],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero & Content',
                    fields: [
                        {
                            name: 'sectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: '404 Error',
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
                            label: 'Heading (Normal)',
                            defaultValue: 'Page',
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
                            label: 'Heading (Accent)',
                            defaultValue: 'Not Found',
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
                            label: 'Description Text',
                            defaultValue: 'The story, object, or page you are looking for has either been moved, renamed, or is taking a quiet pause.',
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
                    ],
                },
                {
                    label: 'Action Buttons',
                    fields: [
                        {
                            name: 'primaryButtonText',
                            type: 'text',
                            label: 'Primary Button Text',
                            defaultValue: 'Return Home',
                        },
                        {
                            name: 'primaryButtonLink',
                            type: 'text',
                            label: 'Primary Button Link',
                            defaultValue: '/',
                        },
                        {
                            name: 'primaryButtonIcon',
                            type: 'text',
                            label: 'Primary Button Icon (Material Symbol)',
                            defaultValue: 'home',
                        },
                        {
                            name: 'secondaryButtonText',
                            type: 'text',
                            label: 'Secondary Button Text',
                            defaultValue: 'Explore Stories',
                        },
                        {
                            name: 'secondaryButtonLink',
                            type: 'text',
                            label: 'Secondary Button Link',
                            defaultValue: '/blog',
                        },
                        {
                            name: 'secondaryButtonIcon',
                            type: 'text',
                            label: 'Secondary Button Icon (Material Symbol)',
                            defaultValue: 'menu_book',
                        },
                        {
                            name: 'tertiaryButtonText',
                            type: 'text',
                            label: 'Tertiary Button Text',
                            defaultValue: 'Visit Shop',
                        },
                        {
                            name: 'tertiaryButtonLink',
                            type: 'text',
                            label: 'Tertiary Button Link',
                            defaultValue: '/shop',
                        },
                        {
                            name: 'tertiaryButtonIcon',
                            type: 'text',
                            label: 'Tertiary Button Icon (Material Symbol)',
                            defaultValue: 'shopping_bag',
                        },
                    ],
                },
                {
                    label: 'Theme & Background',
                    fields: [
                        {
                            name: 'backgroundColor',
                            type: 'text',
                            label: 'Page Background Color',
                            defaultValue: '#F2EBD0',
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
    ],
}
