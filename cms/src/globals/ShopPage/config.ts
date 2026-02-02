import { GlobalConfig } from 'payload'

export const ShopPage: GlobalConfig = {
    slug: 'shop-page',
    label: 'Shop Page',
    admin: {
        group: 'Pages',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable Shop Page',
            defaultValue: true,
            admin: {
                description: 'If disabled, a coming soon message will be shown',
            },
        },
        {
            type: 'tabs',
            tabs: [
                // =====================
                // HERO SECTION
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
                            name: 'heroBackgroundColor',
                            type: 'text',
                            label: 'Hero Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                condition: (data) => data?.heroEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'showHeroImage',
                            type: 'checkbox',
                            label: 'Show Hero Background Image',
                            defaultValue: true,
                            admin: {
                                condition: (data) => data?.heroEnabled,
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
                            name: 'heroImageOpacity',
                            type: 'number',
                            label: 'Hero Image Opacity (%)',
                            defaultValue: 10,
                            min: 0,
                            max: 100,
                            admin: {
                                condition: (data) => data?.heroEnabled && data?.showHeroImage,
                            },
                        },
                        {
                            name: 'heroSectionLabel',
                            type: 'text',
                            label: 'Section Label',
                            defaultValue: 'Autumn Collection 2024',
                        },
                        {
                            name: 'heroSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Label Font',
                        },
                        {
                            name: 'heroSectionLabelColor',
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
                            name: 'heroHeading',
                            type: 'text',
                            label: 'Hero Heading',
                            defaultValue: 'Curated Living: Books & Digital',
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
                            name: 'heroDescription',
                            type: 'textarea',
                            label: 'Hero Description',
                            defaultValue: 'A collection designed for the slow-living enthusiast. Elevate your coffee table and digital workspace with our signature earth-toned aesthetics.',
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
                        // Primary Button
                        {
                            name: 'heroPrimaryButtonEnabled',
                            type: 'checkbox',
                            label: 'Show Primary Button',
                            defaultValue: true,
                        },
                        {
                            name: 'heroPrimaryButtonText',
                            type: 'text',
                            label: 'Primary Button Text',
                            defaultValue: 'Browse Collection',
                            admin: {
                                condition: (data) => data?.heroPrimaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroPrimaryButtonLink',
                            type: 'text',
                            label: 'Primary Button Link',
                            defaultValue: '#shop',
                            admin: {
                                condition: (data) => data?.heroPrimaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroPrimaryButtonFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Primary Button Font',
                            admin: {
                                condition: (data) => data?.heroPrimaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroPrimaryButtonBgColor',
                            type: 'text',
                            label: 'Primary Button Background Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                condition: (data) => data?.heroPrimaryButtonEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroPrimaryButtonTextColor',
                            type: 'text',
                            label: 'Primary Button Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                condition: (data) => data?.heroPrimaryButtonEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        // Secondary Button
                        {
                            name: 'heroSecondaryButtonEnabled',
                            type: 'checkbox',
                            label: 'Show Secondary Button',
                            defaultValue: true,
                        },
                        {
                            name: 'heroSecondaryButtonText',
                            type: 'text',
                            label: 'Secondary Button Text',
                            defaultValue: 'Digital Assets',
                            admin: {
                                condition: (data) => data?.heroSecondaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroSecondaryButtonLink',
                            type: 'text',
                            label: 'Secondary Button Link',
                            defaultValue: '#digital',
                            admin: {
                                condition: (data) => data?.heroSecondaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroSecondaryButtonFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Secondary Button Font',
                            admin: {
                                condition: (data) => data?.heroSecondaryButtonEnabled,
                            },
                        },
                        {
                            name: 'heroSecondaryButtonBorderColor',
                            type: 'text',
                            label: 'Secondary Button Border Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                condition: (data) => data?.heroSecondaryButtonEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'heroSecondaryButtonTextColor',
                            type: 'text',
                            label: 'Secondary Button Text Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                condition: (data) => data?.heroSecondaryButtonEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // CATEGORIES / FILTER
                // =====================
                {
                    label: 'Categories & Filters',
                    fields: [
                        {
                            name: 'filterBarEnabled',
                            type: 'checkbox',
                            label: 'Enable Filter Bar',
                            defaultValue: true,
                        },
                        {
                            name: 'categories',
                            type: 'array',
                            label: 'Product Categories',
                            admin: {
                                condition: (data) => data?.filterBarEnabled,
                            },
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
                                    label: 'Category Slug (for filtering)',
                                },
                            ],
                            defaultValue: [
                                { name: 'All Objects', slug: 'all' },
                                { name: 'Hardcovers', slug: 'hardcovers' },
                                { name: 'Digital Planners', slug: 'digital-planners' },
                                { name: 'E-Books', slug: 'e-books' },
                            ],
                        },
                        {
                            name: 'categoryFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Category Font',
                        },
                        {
                            name: 'categoryActiveColor',
                            type: 'text',
                            label: 'Active Category Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'categoryInactiveColor',
                            type: 'text',
                            label: 'Inactive Category Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'showSortDropdown',
                            type: 'checkbox',
                            label: 'Show Sort Dropdown',
                            defaultValue: true,
                        },
                        {
                            name: 'sortOptions',
                            type: 'array',
                            label: 'Sort Options',
                            admin: {
                                condition: (data) => data?.showSortDropdown,
                            },
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Sort Label',
                                    required: true,
                                },
                                {
                                    name: 'value',
                                    type: 'text',
                                    label: 'Sort Value',
                                    required: true,
                                },
                            ],
                            defaultValue: [
                                { label: 'Newest Arrivals', value: 'newest' },
                                { label: 'Price: Low to High', value: 'price-asc' },
                                { label: 'Price: High to Low', value: 'price-desc' },
                            ],
                        },
                    ],
                },
                // =====================
                // PRODUCTS
                // =====================
                {
                    label: 'Products',
                    fields: [
                        {
                            name: 'productsEnabled',
                            type: 'checkbox',
                            label: 'Enable Products Section',
                            defaultValue: true,
                        },
                        {
                            name: 'productsGridColumns',
                            type: 'select',
                            label: 'Products Grid Columns (Desktop)',
                            defaultValue: '3',
                            options: [
                                { label: '2 Columns', value: '2' },
                                { label: '3 Columns', value: '3' },
                                { label: '4 Columns', value: '4' },
                            ],
                        },
                        {
                            name: 'productCardHeight',
                            type: 'number',
                            label: 'Product Card Image Height (px)',
                            defaultValue: 450,
                            min: 200,
                            max: 800,
                        },
                        {
                            name: 'showQuickViewButton',
                            type: 'checkbox',
                            label: 'Show Quick View Button on Hover',
                            defaultValue: true,
                        },
                        {
                            name: 'quickViewButtonText',
                            type: 'text',
                            label: 'Quick View Button Text',
                            defaultValue: 'Quick View',
                            admin: {
                                condition: (data) => data?.showQuickViewButton,
                            },
                        },
                        {
                            name: 'products',
                            type: 'array',
                            label: 'Products',
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    label: 'Product Name',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    type: 'text',
                                    label: 'Product Description',
                                },
                                {
                                    name: 'price',
                                    type: 'text',
                                    label: 'Price (e.g. $49)',
                                    required: true,
                                },
                                {
                                    name: 'salePrice',
                                    type: 'text',
                                    label: 'Sale Price (Optional)',
                                },
                                {
                                    name: 'category',
                                    type: 'text',
                                    label: 'Category',
                                },
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Product Image',
                                    required: true,
                                },
                                {
                                    name: 'badge',
                                    type: 'text',
                                    label: 'Badge (e.g. "New", "Sale", "Bestseller")',
                                },
                                {
                                    name: 'badgeColor',
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
                                    name: 'link',
                                    type: 'text',
                                    label: 'Product Link (URL)',
                                },
                                {
                                    name: 'isDigital',
                                    type: 'checkbox',
                                    label: 'Is Digital Product',
                                    defaultValue: false,
                                },
                            ],
                        },
                        // Product Card Styling
                        {
                            name: 'productNameFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Product Name Font',
                        },
                        {
                            name: 'productNameColor',
                            type: 'text',
                            label: 'Product Name Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'productPriceFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Product Price Font',
                        },
                        {
                            name: 'productPriceColor',
                            type: 'text',
                            label: 'Product Price Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'productCategoryColor',
                            type: 'text',
                            label: 'Product Category Text Color',
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
                // FEATURED BANNER
                // =====================
                {
                    label: 'Featured Banner',
                    fields: [
                        {
                            name: 'bannerEnabled',
                            type: 'checkbox',
                            label: 'Enable Featured Banner',
                            defaultValue: true,
                        },
                        {
                            name: 'bannerBackgroundColor',
                            type: 'text',
                            label: 'Banner Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'bannerSectionLabel',
                            type: 'text',
                            label: 'Banner Section Label',
                            defaultValue: 'Limited Edition',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerSectionLabelFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Section Label Font',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerSectionLabelColor',
                            type: 'text',
                            label: 'Banner Section Label Color',
                            defaultValue: '#B88078',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'bannerHeading',
                            type: 'text',
                            label: 'Banner Heading',
                            defaultValue: 'The Autumn Journal Collection',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Heading Font',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerHeadingColor',
                            type: 'text',
                            label: 'Banner Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'bannerDescription',
                            type: 'textarea',
                            label: 'Banner Description',
                            defaultValue: 'A carefully curated bundle featuring our bestselling journal, digital planner, and signature candle. Available while supplies last.',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Description Font',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerDescriptionColor',
                            type: 'text',
                            label: 'Banner Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'bannerButtonText',
                            type: 'text',
                            label: 'Banner Button Text',
                            defaultValue: 'Shop the Bundle — $180',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerButtonLink',
                            type: 'text',
                            label: 'Banner Button Link',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerButtonFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Button Font',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                            },
                        },
                        {
                            name: 'bannerButtonBgColor',
                            type: 'text',
                            label: 'Banner Button Background Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'bannerButtonTextColor',
                            type: 'text',
                            label: 'Banner Button Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                condition: (data) => data?.bannerEnabled,
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
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                                description: 'Used for buttons, highlights, etc.',
                            },
                        },
                        {
                            name: 'secondaryAccentColor',
                            type: 'text',
                            label: 'Secondary Accent Color',
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
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'cardBackgroundColor',
                            type: 'text',
                            label: 'Card Background Color',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'cardHoverEffect',
                            type: 'select',
                            label: 'Card Hover Effect',
                            defaultValue: 'scale',
                            options: [
                                { label: 'Scale Up', value: 'scale' },
                                { label: 'Shadow', value: 'shadow' },
                                { label: 'Border Highlight', value: 'border' },
                                { label: 'None', value: 'none' },
                            ],
                        },
                    ],
                },
                // =====================
                // ECOMMERCE SETTINGS
                // =====================
                {
                    label: 'E-Commerce Settings',
                    fields: [
                        {
                            name: 'currencySymbol',
                            type: 'text',
                            label: 'Currency Symbol',
                            defaultValue: '$',
                        },
                        {
                            name: 'currencyPosition',
                            type: 'select',
                            label: 'Currency Position',
                            defaultValue: 'before',
                            options: [
                                { label: 'Before Price ($99)', value: 'before' },
                                { label: 'After Price (99$)', value: 'after' },
                            ],
                        },
                        {
                            name: 'showAddToCartButton',
                            type: 'checkbox',
                            label: 'Show Add to Cart Button',
                            defaultValue: false,
                            admin: {
                                description: 'Enable for full ecommerce functionality',
                            },
                        },
                        {
                            name: 'addToCartButtonText',
                            type: 'text',
                            label: 'Add to Cart Button Text',
                            defaultValue: 'Add to Cart',
                            admin: {
                                condition: (data) => data?.showAddToCartButton,
                            },
                        },
                        {
                            name: 'externalCheckoutEnabled',
                            type: 'checkbox',
                            label: 'Enable External Checkout Links',
                            defaultValue: true,
                            admin: {
                                description: 'Products link to external stores (Etsy, Gumroad, etc.)',
                            },
                        },
                        {
                            name: 'externalCheckoutButtonText',
                            type: 'text',
                            label: 'External Checkout Button Text',
                            defaultValue: 'Shop Now',
                            admin: {
                                condition: (data) => data?.externalCheckoutEnabled,
                            },
                        },
                        {
                            name: 'showOutOfStock',
                            type: 'checkbox',
                            label: 'Show Out of Stock Products',
                            defaultValue: true,
                        },
                        {
                            name: 'outOfStockText',
                            type: 'text',
                            label: 'Out of Stock Text',
                            defaultValue: 'Sold Out',
                            admin: {
                                condition: (data) => data?.showOutOfStock,
                            },
                        },
                        {
                            name: 'showSaleBadge',
                            type: 'checkbox',
                            label: 'Show Sale Badge',
                            defaultValue: true,
                        },
                        {
                            name: 'saleBadgeText',
                            type: 'text',
                            label: 'Sale Badge Text',
                            defaultValue: 'Sale',
                            admin: {
                                condition: (data) => data?.showSaleBadge,
                            },
                        },
                        {
                            name: 'saleBadgeColor',
                            type: 'text',
                            label: 'Sale Badge Color',
                            admin: {
                                condition: (data) => data?.showSaleBadge,
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                    ],
                },
                // =====================
                // EMPTY STATE
                // =====================
                {
                    label: 'Empty State',
                    fields: [
                        {
                            name: 'emptyStateHeading',
                            type: 'text',
                            label: 'Empty State Heading',
                            defaultValue: 'No Products Available',
                        },
                        {
                            name: 'emptyStateDescription',
                            type: 'textarea',
                            label: 'Empty State Description',
                            defaultValue: 'Check back soon for new arrivals.',
                        },
                        {
                            name: 'emptyStateIcon',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Empty State Icon',
                        },
                    ],
                },
            ],
        },
    ],
}
