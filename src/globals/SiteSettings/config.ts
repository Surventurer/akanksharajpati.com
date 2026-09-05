import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'
import { createRevalidateHook } from '@/lib/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site & Theme Settings',
    admin: {
        group: 'Design',
        description: 'Configure global site branding, color palettes, typography, and meta settings.',
    },
    access: globalAccess('design', 'siteSettings'),
    hooks: {
        afterChange: [createRevalidateHook(CACHE_TAGS.SITE_SETTINGS)],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Branding & Meta',
                    fields: [
                        {
                            name: 'siteTitle',
                            type: 'text',
                            label: 'Site Title',
                            defaultValue: 'Akanksha Rajpati',
                            required: true,
                        },
                        {
                            name: 'siteTagline',
                            type: 'text',
                            label: 'Site Tagline',
                            defaultValue: 'A Luxury Lifestyle Journal',
                        },
                        {
                            name: 'siteDescription',
                            type: 'textarea',
                            label: 'Default Meta Description',
                            defaultValue: 'Bespoke insights from my mind to yours — guiding you toward a more personalized way of living',
                        },
                        {
                            name: 'logo',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Primary Logo (Light Mode / Default)',
                        },
                        {
                            name: 'logoDark',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Dark Mode Logo (White / Inverted)',
                        },
                        {
                            name: 'favicon',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Favicon (Light Mode / Default)',
                        },
                        {
                            name: 'faviconDark',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Dark Mode Favicon (White / Inverted for dark tabs)',
                        },
                        {
                            name: 'ogImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Default Social Share Image (OpenGraph)',
                        },
                    ],
                },
                {
                    label: 'Color Theme',
                    description: 'Global design system colors injected as CSS variables across the frontend.',
                    fields: [
                        {
                            name: 'primaryColor',
                            type: 'text',
                            label: 'Primary Accent Color (e.g. Buttons, Highlights)',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'secondaryColor',
                            type: 'text',
                            label: 'Secondary Brand Color',
                            defaultValue: '#868753',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'accentColor',
                            type: 'text',
                            label: 'Accent Highlight Color (Gold / Mustard)',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'backgroundColor',
                            type: 'text',
                            label: 'Main Page Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'cardBackgroundColor',
                            type: 'text',
                            label: 'Card / Panel Background Color',
                            defaultValue: '#f7f3e8',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'textColor',
                            type: 'text',
                            label: 'Primary Text Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'mutedTextColor',
                            type: 'text',
                            label: 'Muted / Secondary Text Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'borderColor',
                            type: 'text',
                            label: 'Border Color',
                            defaultValue: '#868753',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                {
                    label: 'Typography',
                    fields: [
                        {
                            name: 'displayFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Display / Heading Font',
                            admin: {
                                description: 'Select an uploaded font for hero headings and titles',
                            },
                        },
                        {
                            name: 'serifFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Editorial / Serif Font',
                            admin: {
                                description: 'Select an uploaded font for editorial body text and quotes',
                            },
                        },
                        {
                            name: 'sansFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'UI / Sans Font',
                            admin: {
                                description: 'Select an uploaded font for navigation, buttons, and badges',
                            },
                        },
                    ],
                },
                {
                    label: 'Social Media',
                    fields: [
                        {
                            name: 'socialLinks',
                            type: 'array',
                            label: 'Social Media Profiles',
                            fields: [
                                {
                                    name: 'platform',
                                    type: 'select',
                                    options: [
                                        { label: 'Instagram', value: 'instagram' },
                                        { label: 'YouTube', value: 'youtube' },
                                        { label: 'Pinterest', value: 'pinterest' },
                                        { label: 'Twitter / X', value: 'twitter' },
                                        { label: 'Facebook', value: 'facebook' },
                                        { label: 'LinkedIn', value: 'linkedin' },
                                    ],
                                    required: true,
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: 'Profile URL',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Floating Action Button',
                    description: 'Configure the draggable floating CTA button that appears across the website.',
                    fields: [
                        {
                            name: 'floatingButtonEnabled',
                            type: 'checkbox',
                            label: 'Enable Floating Action Button',
                            defaultValue: true,
                        },
                        {
                            name: 'floatingButtonDraggable',
                            type: 'checkbox',
                            label: 'Allow visitors to drag and move the button anywhere on screen',
                            defaultValue: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'floatingButtonLabel',
                                    type: 'text',
                                    label: 'Hover Label / Tooltip',
                                    defaultValue: 'Shopping Bag',
                                    admin: { width: '50%' },
                                },
                                {
                                    name: 'floatingButtonLink',
                                    type: 'text',
                                    label: 'Destination Link URL',
                                    defaultValue: '/shop',
                                    admin: { width: '50%' },
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'floatingButtonIcon',
                                    type: 'select',
                                    label: 'Preset Icon',
                                    defaultValue: 'shopping_bag',
                                    options: [
                                        { label: 'Shopping Bag (shopping_bag)', value: 'shopping_bag' },
                                        { label: 'Shopping Cart (shopping_cart)', value: 'shopping_cart' },
                                        { label: 'Book / Journal (menu_book)', value: 'menu_book' },
                                        { label: 'Auto Stories (auto_stories)', value: 'auto_stories' },
                                        { label: 'Sparkles / Atelier (auto_awesome)', value: 'auto_awesome' },
                                        { label: 'Video / Watch (smart_display)', value: 'smart_display' },
                                        { label: 'Mail / Contact (mail)', value: 'mail' },
                                        { label: 'Custom Icon Upload', value: 'custom' },
                                    ],
                                    admin: { width: '50%' },
                                },
                                {
                                    name: 'floatingButtonPosition',
                                    type: 'select',
                                    label: 'Default Screen Corner',
                                    defaultValue: 'bottom-right',
                                    options: [
                                        { label: 'Bottom Right', value: 'bottom-right' },
                                        { label: 'Bottom Left', value: 'bottom-left' },
                                        { label: 'Top Right', value: 'top-right' },
                                        { label: 'Top Left', value: 'top-left' },
                                    ],
                                    admin: { width: '50%' },
                                },
                            ],
                        },
                        {
                            name: 'floatingButtonIconUpload',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Custom Icon Upload (Optional)',
                            admin: {
                                condition: (_, siblingData) => siblingData?.floatingButtonIcon === 'custom',
                            },
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'floatingButtonBgColor',
                                    type: 'text',
                                    label: 'Background Color',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'floatingButtonTextColor',
                                    type: 'text',
                                    label: 'Icon / Text Color',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'floatingButtonBorderColor',
                                    type: 'text',
                                    label: 'Border Color',
                                    admin: {
                                        width: '33%',
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            name: 'floatingButtonHideOnMobile',
                            type: 'checkbox',
                            label: 'Hide on Mobile Devices',
                            defaultValue: false,
                        },
                    ],
                },
            ],
        },
    ],
}
