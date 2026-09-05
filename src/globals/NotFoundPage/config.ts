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
                            name: 'actionButtons',
                            type: 'array',
                            label: 'Action Buttons (CRUD)',
                            minRows: 0,
                            maxRows: 6,
                            labels: {
                                singular: 'Action Button',
                                plural: 'Action Buttons',
                            },
                            defaultValue: [
                                {
                                    label: 'Return Home',
                                    link: '/',
                                    icon: 'home',
                                    variant: 'primary',
                                    newTab: false,
                                },
                                {
                                    label: 'Explore Stories',
                                    link: '/blog',
                                    icon: 'menu_book',
                                    variant: 'outline',
                                    newTab: false,
                                },
                            ],
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'label',
                                            type: 'text',
                                            label: 'Button Label',
                                            required: true,
                                            admin: { width: '50%' },
                                        },
                                        {
                                            name: 'link',
                                            type: 'text',
                                            label: 'Link URL',
                                            required: true,
                                            admin: { width: '50%' },
                                        },
                                    ],
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'icon',
                                            type: 'text',
                                            label: 'Icon (Material Symbol name, e.g., home, menu_book, arrow_back)',
                                            admin: { width: '50%' },
                                        },
                                        {
                                            name: 'variant',
                                            type: 'select',
                                            label: 'Style Variant',
                                            defaultValue: 'primary',
                                            options: [
                                                { label: 'Primary (Dark / Inverted)', value: 'primary' },
                                                { label: 'Secondary (Sage Green)', value: 'secondary' },
                                                { label: 'Outline (Bordered)', value: 'outline' },
                                                { label: 'Gold / Accent', value: 'gold' },
                                            ],
                                            admin: { width: '50%' },
                                        },
                                    ],
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'customBgColor',
                                            type: 'text',
                                            label: 'Custom Background Color (Optional)',
                                            admin: {
                                                width: '50%',
                                                components: {
                                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                                },
                                            },
                                        },
                                        {
                                            name: 'customTextColor',
                                            type: 'text',
                                            label: 'Custom Text Color (Optional)',
                                            admin: {
                                                width: '50%',
                                                components: {
                                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    name: 'newTab',
                                    type: 'checkbox',
                                    label: 'Open in New Tab',
                                    defaultValue: false,
                                },
                            ],
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
                            defaultValue: '#F9F6F0',
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
