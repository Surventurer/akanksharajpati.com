import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'

export const WatchPage: GlobalConfig = {
    slug: 'watch-page',
    label: 'Watch Page',
    admin: {
        group: 'Pages',
    },
    access: globalAccess('pages', 'watchPage'),
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable Watch Page',
            defaultValue: true,
            admin: {
                description: 'If disabled, a coming soon message will be shown',
            },
        },
        {
            type: 'tabs',
            tabs: [
                // =====================
                // HERO / HEADLINE SECTION
                // =====================
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
                            name: 'heroHeading',
                            type: 'text',
                            label: 'Hero Heading',
                            defaultValue: 'Cinematic Vlogs',
                        },
                        {
                            name: 'heroHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Hero Heading Font',
                        },
                        {
                            name: 'heroHeadingColor',
                            type: 'text',
                            label: 'Hero Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroSubheading',
                            type: 'text',
                            label: 'Hero Subheading',
                            defaultValue: 'Autumn 2024 Collection & Global Journeys',
                        },
                        {
                            name: 'heroSubheadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Hero Subheading Font',
                        },
                        {
                            name: 'heroSubheadingColor',
                            type: 'text',
                            label: 'Hero Subheading Color',
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
                // FEATURED VIDEO SECTION
                // =====================
                {
                    label: 'Featured Video',
                    fields: [
                        {
                            name: 'featuredVideoEnabled',
                            type: 'checkbox',
                            label: 'Enable Featured Video Section',
                            defaultValue: true,
                        },
                        {
                            name: 'featuredVideoBadge',
                            type: 'text',
                            label: 'Featured Badge Text',
                            defaultValue: 'Featured Premiere',
                        },
                        {
                            name: 'featuredVideoBadgeColor',
                            type: 'text',
                            label: 'Badge Background Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'featuredVideoBadgeTextColor',
                            type: 'text',
                            label: 'Badge Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'featuredVideoTitle',
                            type: 'text',
                            label: 'Featured Video Title',
                            defaultValue: 'THE AUTUMN EDIT: PARIS FASHION WEEK 2024',
                        },
                        {
                            name: 'featuredVideoTitleFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Featured Video Title Font',
                        },
                        {
                            name: 'featuredVideoTitleColor',
                            type: 'text',
                            label: 'Featured Video Title Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'featuredVideoThumbnail',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Featured Video Thumbnail',
                        },
                        {
                            name: 'featuredVideoUrl',
                            type: 'text',
                            label: 'Featured Video URL (YouTube/Vimeo embed)',
                            admin: {
                                description: 'Enter YouTube or Vimeo video URL',
                            },
                        },
                        {
                            name: 'featuredVideoDuration',
                            type: 'text',
                            label: 'Video Duration',
                            defaultValue: '15:45',
                        },
                        {
                            name: 'featuredVideoDescription',
                            type: 'textarea',
                            label: 'Video Description',
                        },
                        // Player Styling
                        {
                            name: 'playerBorderEnabled',
                            type: 'checkbox',
                            label: 'Show Gradient Border',
                            defaultValue: true,
                        },
                        {
                            name: 'playerBorderColor',
                            type: 'text',
                            label: 'Player Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'playButtonColor',
                            type: 'text',
                            label: 'Play Button Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // CATEGORIES
                // =====================
                {
                    label: 'Categories',
                    fields: [
                        {
                            name: 'categoriesEnabled',
                            type: 'checkbox',
                            label: 'Enable Category Filter',
                            defaultValue: true,
                        },
                        {
                            name: 'categories',
                            type: 'array',
                            label: 'Video Categories',
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    label: 'Category Name',
                                    required: true,
                                },
                                {
                                    name: 'slug',
                                    type: 'text',
                                    label: 'Category Slug',
                                    admin: {
                                        description: 'Used for filtering (auto-generated if empty)',
                                    },
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Category Icon (optional)',
                                },
                            ],
                            defaultValue: [
                                { name: 'All Collections', slug: 'all' },
                                { name: 'Autumn Lookbooks', slug: 'lookbooks' },
                                { name: 'Luxury Travel', slug: 'travel' },
                                { name: 'Beauty Masterclass', slug: 'beauty' },
                                { name: 'Behind the Scenes', slug: 'bts' },
                                { name: 'Lifestyle', slug: 'lifestyle' },
                            ],
                        },
                        {
                            name: 'categoryPillActiveColor',
                            type: 'text',
                            label: 'Active Category Pill Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'categoryPillActiveTextColor',
                            type: 'text',
                            label: 'Active Category Pill Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'categoryPillInactiveColor',
                            type: 'text',
                            label: 'Inactive Category Pill Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'categoryPillInactiveTextColor',
                            type: 'text',
                            label: 'Inactive Category Pill Text Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // VIDEO GALLERY / VLOGS
                // =====================
                {
                    label: 'Video Gallery',
                    fields: [
                        {
                            name: 'galleryEnabled',
                            type: 'checkbox',
                            label: 'Enable Video Gallery',
                            defaultValue: true,
                        },
                        {
                            name: 'gallerySectionTitle',
                            type: 'text',
                            label: 'Gallery Section Title',
                            defaultValue: 'Latest Vlogs',
                        },
                        {
                            name: 'gallerySectionTitleFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Gallery Section Title Font',
                        },
                        {
                            name: 'gallerySectionTitleColor',
                            type: 'text',
                            label: 'Gallery Section Title Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'galleryBorderAccentColor',
                            type: 'text',
                            label: 'Title Border Accent Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        // Video Grid Layout
                        {
                            name: 'galleryColumns',
                            type: 'select',
                            label: 'Grid Columns (Desktop)',
                            defaultValue: '2',
                            options: [
                                { label: '2 Columns', value: '2' },
                                { label: '3 Columns', value: '3' },
                                { label: '4 Columns', value: '4' },
                            ],
                        },
                        {
                            name: 'galleryGap',
                            type: 'select',
                            label: 'Grid Gap',
                            defaultValue: 'gap-6',
                            options: [
                                { label: 'Small', value: 'gap-4' },
                                { label: 'Medium', value: 'gap-6' },
                                { label: 'Large', value: 'gap-8' },
                            ],
                        },
                        // Videos Array
                        {
                            name: 'videos',
                            type: 'array',
                            label: 'Videos',
                            admin: {
                                description: 'Add and manage your video/vlog collection',
                            },
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Video Title',
                                    required: true,
                                },
                                {
                                    name: 'slug',
                                    type: 'text',
                                    label: 'Video Slug (for URL)',
                                },
                                {
                                    name: 'thumbnail',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Thumbnail Image',
                                    required: false,
                                },
                                {
                                    name: 'videoUrl',
                                    type: 'text',
                                    label: 'Video URL (YouTube/Vimeo)',
                                    admin: {
                                        description: 'Full YouTube or Vimeo URL',
                                    },
                                },
                                {
                                    name: 'embedCode',
                                    type: 'textarea',
                                    label: 'Custom Embed Code (optional)',
                                    admin: {
                                        description: 'Use this for custom video players or other embed sources',
                                    },
                                },
                                {
                                    name: 'duration',
                                    type: 'text',
                                    label: 'Duration',
                                    defaultValue: '10:00',
                                },
                                {
                                    name: 'category',
                                    type: 'text',
                                    label: 'Category',
                                    admin: {
                                        description: 'Must match one of the category slugs',
                                    },
                                },
                                {
                                    name: 'views',
                                    type: 'number',
                                    label: 'View Count',
                                    defaultValue: 0,
                                },
                                {
                                    name: 'publishedAt',
                                    type: 'date',
                                    label: 'Published Date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'dayOnly',
                                        },
                                    },
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Video Description',
                                },
                                {
                                    name: 'tags',
                                    type: 'text',
                                    label: 'Tags (comma separated)',
                                },
                                {
                                    name: 'isFeatured',
                                    type: 'checkbox',
                                    label: 'Mark as Featured',
                                    defaultValue: false,
                                },
                                {
                                    name: 'showNewBadge',
                                    type: 'checkbox',
                                    label: 'Show "New" Badge',
                                    defaultValue: false,
                                },
                            ],
                            defaultValue: [
                                {
                                    title: 'A Week in Tuscany: Autumn Aesthetic',
                                    slug: 'week-in-tuscany',
                                    duration: '12:34',
                                    category: 'travel',
                                    views: 15420,
                                    description: 'Join me for a dreamy week exploring the rolling hills of Tuscany during golden autumn.',
                                    showNewBadge: true,
                                },
                                {
                                    title: 'Fall Skincare Routine 2024',
                                    slug: 'fall-skincare-routine',
                                    duration: '18:22',
                                    category: 'beauty',
                                    views: 28930,
                                    description: 'My complete fall skincare routine featuring luxury products and techniques.',
                                },
                                {
                                    title: 'Cozy Autumn Lookbook: Knits & Neutrals',
                                    slug: 'autumn-lookbook-knits',
                                    duration: '10:15',
                                    category: 'lookbooks',
                                    views: 42100,
                                    description: 'Styling cozy knitwear and neutral tones for the perfect autumn wardrobe.',
                                },
                                {
                                    title: 'Behind the Scenes: Paris Photoshoot',
                                    slug: 'bts-paris-photoshoot',
                                    duration: '08:45',
                                    category: 'bts',
                                    views: 9850,
                                    description: 'Take a peek behind the camera at our Paris fashion shoot.',
                                },
                            ],
                        },
                        // Video Card Styling
                        {
                            name: 'videoCardTitleFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Video Card Title Font',
                        },
                        {
                            name: 'videoCardTitleColor',
                            type: 'text',
                            label: 'Video Card Title Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'videoCardCategoryColor',
                            type: 'text',
                            label: 'Video Card Category Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'videoCardViewsColor',
                            type: 'text',
                            label: 'Video Card Views Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'videoCardPlayButtonColor',
                            type: 'text',
                            label: 'Video Card Play Button Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'videoCardDurationBgColor',
                            type: 'text',
                            label: 'Duration Badge Background Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'videoCardDurationTextColor',
                            type: 'text',
                            label: 'Duration Badge Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // SUBSCRIBE CARD (SIDEBAR)
                // =====================
                {
                    label: 'Subscribe Card',
                    fields: [
                        {
                            name: 'subscribeCardEnabled',
                            type: 'checkbox',
                            label: 'Enable Subscribe Card',
                            defaultValue: true,
                        },
                        {
                            name: 'subscribeCardBackgroundColor',
                            type: 'text',
                            label: 'Card Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'subscribeCardHeading',
                            type: 'text',
                            label: 'Card Heading',
                            defaultValue: 'Never Miss a Video',
                        },
                        {
                            name: 'subscribeCardHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Card Heading Font',
                        },
                        {
                            name: 'subscribeCardHeadingColor',
                            type: 'text',
                            label: 'Card Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'subscribeCardDescription',
                            type: 'textarea',
                            label: 'Card Description',
                            defaultValue: 'Subscribe to receive notifications when new vlogs are released.',
                        },
                        {
                            name: 'subscribeCardDescriptionColor',
                            type: 'text',
                            label: 'Card Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'subscribeButtonText',
                            type: 'text',
                            label: 'Subscribe Button Text',
                            defaultValue: 'Subscribe',
                        },
                        {
                            name: 'subscribeButtonUrl',
                            type: 'text',
                            label: 'Subscribe Button URL (optional)',
                            admin: {
                                description: 'YouTube channel, newsletter link, etc.',
                            },
                        },
                        {
                            name: 'subscribeButtonBgColor',
                            type: 'text',
                            label: 'Subscribe Button Background Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'subscribeButtonTextColor',
                            type: 'text',
                            label: 'Subscribe Button Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        // YouTube Integration
                        {
                            name: 'showYouTubeStats',
                            type: 'checkbox',
                            label: 'Show YouTube Stats',
                            defaultValue: false,
                        },
                        {
                            name: 'youtubeSubscriberCount',
                            type: 'text',
                            label: 'YouTube Subscriber Count',
                            admin: {
                                condition: (data) => data?.showYouTubeStats,
                                description: 'e.g. "125K subscribers"',
                            },
                        },
                        {
                            name: 'youtubeTotalViews',
                            type: 'text',
                            label: 'YouTube Total Views',
                            admin: {
                                condition: (data) => data?.showYouTubeStats,
                                description: 'e.g. "2.5M views"',
                            },
                        },
                    ],
                },
                // =====================
                // MUST WATCH SECTION (SIDEBAR)
                // =====================
                {
                    label: 'Must Watch',
                    fields: [
                        {
                            name: 'mustWatchEnabled',
                            type: 'checkbox',
                            label: 'Enable Must Watch Section',
                            defaultValue: true,
                        },
                        {
                            name: 'mustWatchBackgroundColor',
                            type: 'text',
                            label: 'Section Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'mustWatchBorderColor',
                            type: 'text',
                            label: 'Section Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'mustWatchHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: 'Must Watch',
                        },
                        {
                            name: 'mustWatchHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Heading Font',
                        },
                        {
                            name: 'mustWatchHeadingColor',
                            type: 'text',
                            label: 'Section Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'mustWatchItems',
                            type: 'array',
                            label: 'Must Watch Items',
                            maxRows: 5,
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Title',
                                    required: true,
                                },
                                {
                                    name: 'subtitle',
                                    type: 'text',
                                    label: 'Subtitle',
                                },
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Thumbnail',
                                },
                                {
                                    name: 'videoUrl',
                                    type: 'text',
                                    label: 'Video URL',
                                },
                            ],
                            defaultValue: [
                                {
                                    title: 'Morning Routine: Autumn Edition',
                                    subtitle: '850K views • 2 weeks ago',
                                },
                                {
                                    title: 'Vintage Shopping in Paris',
                                    subtitle: '620K views • 1 month ago',
                                },
                                {
                                    title: 'My Capsule Wardrobe Secrets',
                                    subtitle: '1.2M views • 3 months ago',
                                },
                            ],
                        },
                        {
                            name: 'mustWatchTitleColor',
                            type: 'text',
                            label: 'Item Title Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'mustWatchSubtitleColor',
                            type: 'text',
                            label: 'Item Subtitle Color',
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
                // SOCIAL FOLLOW SECTION
                // =====================
                {
                    label: 'Social Follow',
                    fields: [
                        {
                            name: 'socialFollowEnabled',
                            type: 'checkbox',
                            label: 'Enable Social Follow Section',
                            defaultValue: true,
                        },
                        {
                            name: 'socialFollowHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: 'Follow us on Socials',
                        },
                        {
                            name: 'socialFollowHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Heading Font',
                        },
                        {
                            name: 'socialFollowHeadingColor',
                            type: 'text',
                            label: 'Section Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'socialLinks',
                            type: 'array',
                            label: 'Social Links',
                            fields: [
                                {
                                    name: 'platform',
                                    type: 'select',
                                    label: 'Platform',
                                    options: [
                                        { label: 'YouTube', value: 'youtube' },
                                        { label: 'Instagram', value: 'instagram' },
                                        { label: 'TikTok', value: 'tiktok' },
                                        { label: 'Twitter/X', value: 'twitter' },
                                        { label: 'Facebook', value: 'facebook' },
                                        { label: 'Pinterest', value: 'pinterest' },
                                        { label: 'Custom', value: 'custom' },
                                    ],
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
                                    label: 'Custom Icon (optional)',
                                },
                                {
                                    name: 'materialIcon',
                                    type: 'text',
                                    label: 'Material Symbol Icon Name',
                                    admin: {
                                        description: 'e.g. "smart_display", "camera", "share"',
                                    },
                                },
                            ],
                            defaultValue: [
                                { platform: 'youtube', materialIcon: 'smart_display', url: 'https://youtube.com' },
                                { platform: 'instagram', materialIcon: 'camera', url: 'https://instagram.com' },
                                { platform: 'tiktok', materialIcon: 'share', url: 'https://tiktok.com' },
                            ],
                        },
                        {
                            name: 'socialIconColor',
                            type: 'text',
                            label: 'Social Icon Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'socialIconHoverColor',
                            type: 'text',
                            label: 'Social Icon Hover Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'socialSectionBorderColor',
                            type: 'text',
                            label: 'Section Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // PLAYLISTS SECTION
                // =====================
                {
                    label: 'Playlists',
                    fields: [
                        {
                            name: 'playlistsEnabled',
                            type: 'checkbox',
                            label: 'Enable Playlists Section',
                            defaultValue: false,
                        },
                        {
                            name: 'playlistsSectionHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: 'Video Playlists',
                        },
                        {
                            name: 'playlistsSectionHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Heading Font',
                        },
                        {
                            name: 'playlistsSectionHeadingColor',
                            type: 'text',
                            label: 'Section Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'playlists',
                            type: 'array',
                            label: 'Playlists',
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    label: 'Playlist Name',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Playlist Description',
                                },
                                {
                                    name: 'coverImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Cover Image',
                                },
                                {
                                    name: 'videoCount',
                                    type: 'number',
                                    label: 'Number of Videos',
                                },
                                {
                                    name: 'youtubePlaylistUrl',
                                    type: 'text',
                                    label: 'YouTube Playlist URL',
                                },
                            ],
                            defaultValue: [
                                {
                                    name: 'Travel Diaries',
                                    description: 'Explore the world through my lens',
                                    videoCount: 24,
                                },
                                {
                                    name: 'Beauty & Skincare',
                                    description: 'Tips, routines, and product reviews',
                                    videoCount: 18,
                                },
                                {
                                    name: 'Fashion Lookbooks',
                                    description: 'Seasonal styling inspiration',
                                    videoCount: 32,
                                },
                            ],
                        },
                        {
                            name: 'playlistCardBgColor',
                            type: 'text',
                            label: 'Playlist Card Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'playlistCardBorderColor',
                            type: 'text',
                            label: 'Playlist Card Border Color',
                            defaultValue: '#C49A48',
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
                            name: 'pageBackgroundColor',
                            type: 'text',
                            label: 'Page Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'primaryAccentColor',
                            type: 'text',
                            label: 'Primary Accent Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                                description: 'Used for buttons, highlights, play buttons',
                            },
                        },
                        {
                            name: 'secondaryBackgroundColor',
                            type: 'text',
                            label: 'Secondary Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                                description: 'Used for cards, sidebar sections',
                            },
                        },
                        {
                            name: 'cardBackgroundColor',
                            type: 'text',
                            label: 'Card Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'borderColor',
                            type: 'text',
                            label: 'Default Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'textColor',
                            type: 'text',
                            label: 'Default Text Color',
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
                            label: 'Muted Text Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        // Layout Options
                        {
                            name: 'showSidebar',
                            type: 'checkbox',
                            label: 'Show Sidebar',
                            defaultValue: true,
                        },
                        {
                            name: 'sidebarPosition',
                            type: 'select',
                            label: 'Sidebar Position',
                            defaultValue: 'right',
                            options: [
                                { label: 'Right', value: 'right' },
                                { label: 'Left', value: 'left' },
                            ],
                            admin: {
                                condition: (data) => data?.showSidebar,
                            },
                        },
                        {
                            name: 'maxContentWidth',
                            type: 'select',
                            label: 'Max Content Width',
                            defaultValue: '7xl',
                            options: [
                                { label: 'Medium (4xl)', value: '4xl' },
                                { label: 'Large (5xl)', value: '5xl' },
                                { label: 'Extra Large (6xl)', value: '6xl' },
                                { label: 'Full Width (7xl)', value: '7xl' },
                            ],
                        },
                    ],
                },
                // =====================
                // SEO & METADATA
                // =====================
                {
                    label: 'SEO & Metadata',
                    fields: [
                        {
                            name: 'metaTitle',
                            type: 'text',
                            label: 'Meta Title',
                            defaultValue: 'Watch | Cinematic Vlogs',
                        },
                        {
                            name: 'metaDescription',
                            type: 'textarea',
                            label: 'Meta Description',
                            defaultValue: 'Explore our collection of cinematic vlogs featuring travel, lifestyle, beauty, and fashion content.',
                        },
                        {
                            name: 'ogImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Open Graph Image',
                        },
                    ],
                },
            ],
        },
    ],
}
