import { GlobalConfig } from 'payload'
import { globalAccess } from '@/payload/access'

export const ContactPage: GlobalConfig = {
    slug: 'contact-page',
    label: 'Contact Page',
    admin: {
        group: 'Pages',
    },
    access: globalAccess('pages', 'contactPage'),
    fields: [
        {
            name: 'pageEnabled',
            type: 'checkbox',
            label: 'Enable Contact Page',
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
                            name: 'heroHeading',
                            type: 'text',
                            label: 'Hero Heading',
                            defaultValue: 'Get In Touch',
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
                            defaultValue: "Have a question, a project idea, or just want to say hello? I'd love to hear from you and explore how we can work together.",
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
                    ],
                },
                // =====================
                // CONTACT METHODS
                // =====================
                {
                    label: 'Contact Methods',
                    fields: [
                        {
                            name: 'contactMethodsEnabled',
                            type: 'checkbox',
                            label: 'Enable Contact Methods Section',
                            defaultValue: true,
                        },
                        {
                            name: 'contactMethodsHeading',
                            type: 'text',
                            label: 'Section Heading',
                            defaultValue: "Let's Start a Conversation",
                        },
                        {
                            name: 'contactMethodsHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Section Heading Font',
                        },
                        {
                            name: 'contactMethodsHeadingColor',
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
                            name: 'contactMethodsSubheading',
                            type: 'text',
                            label: 'Section Subheading',
                            defaultValue: 'Choose your preferred way to reach out',
                        },
                        {
                            name: 'contactMethods',
                            type: 'array',
                            label: 'Contact Methods',
                            fields: [
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon',
                                },
                                {
                                    name: 'iconMaterialSymbol',
                                    type: 'text',
                                    label: 'Material Symbol Icon Name (fallback)',
                                    admin: {
                                        description: 'e.g. "mail", "location_on", "schedule"',
                                    },
                                },
                                {
                                    name: 'iconColor',
                                    type: 'text',
                                    label: 'Icon Background Color',
                                    defaultValue: '#B88078',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Title',
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
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'description',
                                    type: 'text',
                                    label: 'Description',
                                },
                                {
                                    name: 'value',
                                    type: 'text',
                                    label: 'Value (email, address, etc.)',
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    label: 'Link (optional)',
                                    admin: {
                                        description: 'e.g. mailto:email@example.com',
                                    },
                                },
                            ],
                            defaultValue: [
                                {
                                    iconMaterialSymbol: 'mail',
                                    iconColor: '#B88078',
                                    title: 'Email',
                                    description: 'Drop me a line anytime',
                                    value: 'hello@akanksharajpati.com',
                                    link: 'mailto:hello@akanksharajpati.com',
                                },
                                {
                                    iconMaterialSymbol: 'location_on',
                                    iconColor: '#B88078',
                                    title: 'Location',
                                    description: 'Bridging cultures & continents',
                                    value: 'India',
                                },
                            ],
                        },
                        // Quick Response Promise
                        {
                            name: 'quickResponseEnabled',
                            type: 'checkbox',
                            label: 'Show Quick Response Promise',
                            defaultValue: true,
                        },
                        {
                            name: 'quickResponseIcon',
                            type: 'text',
                            label: 'Quick Response Icon (Material Symbol)',
                            defaultValue: 'schedule',
                        },
                        {
                            name: 'quickResponseTitle',
                            type: 'text',
                            label: 'Quick Response Title',
                            defaultValue: 'Quick Response Promise',
                        },
                        {
                            name: 'quickResponseDescription',
                            type: 'text',
                            label: 'Quick Response Description',
                            defaultValue: 'I typically respond within 24 hours. For urgent matters, feel free to call directly.',
                        },
                        {
                            name: 'quickResponseBgColor',
                            type: 'text',
                            label: 'Quick Response Background Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'quickResponseTextColor',
                            type: 'text',
                            label: 'Quick Response Text Color',
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
                // CONTACT FORM
                // =====================
                {
                    label: 'Contact Form',
                    fields: [
                        {
                            name: 'formEnabled',
                            type: 'checkbox',
                            label: 'Enable Contact Form',
                            defaultValue: true,
                        },
                        {
                            name: 'formIcon',
                            type: 'text',
                            label: 'Form Icon (Material Symbol)',
                            defaultValue: 'send',
                        },
                        {
                            name: 'formIconColor',
                            type: 'text',
                            label: 'Form Icon Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'formHeading',
                            type: 'text',
                            label: 'Form Heading',
                            defaultValue: 'Send a Message',
                        },
                        {
                            name: 'formHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Form Heading Font',
                        },
                        {
                            name: 'formHeadingColor',
                            type: 'text',
                            label: 'Form Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'formBackgroundColor',
                            type: 'text',
                            label: 'Form Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'formBorderColor',
                            type: 'text',
                            label: 'Form Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        // Form Fields
                        {
                            name: 'nameFieldLabel',
                            type: 'text',
                            label: 'Name Field Label',
                            defaultValue: 'Name',
                        },
                        {
                            name: 'nameFieldPlaceholder',
                            type: 'text',
                            label: 'Name Field Placeholder',
                            defaultValue: 'Your Name',
                        },
                        {
                            name: 'emailFieldLabel',
                            type: 'text',
                            label: 'Email Field Label',
                            defaultValue: 'Email',
                        },
                        {
                            name: 'emailFieldPlaceholder',
                            type: 'text',
                            label: 'Email Field Placeholder',
                            defaultValue: 'your.email@example.com',
                        },
                        {
                            name: 'messageFieldLabel',
                            type: 'text',
                            label: 'Message Field Label',
                            defaultValue: 'Message',
                        },
                        {
                            name: 'messageFieldPlaceholder',
                            type: 'text',
                            label: 'Message Field Placeholder',
                            defaultValue: 'Tell me about your project, ideas, or just say hello...',
                        },
                        {
                            name: 'submitButtonText',
                            type: 'text',
                            label: 'Submit Button Text',
                            defaultValue: 'Send Message',
                        },
                        {
                            name: 'submitButtonIcon',
                            type: 'text',
                            label: 'Submit Button Icon (Material Symbol)',
                            defaultValue: 'send',
                        },
                        {
                            name: 'submitButtonBgColor',
                            type: 'text',
                            label: 'Submit Button Background Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'submitButtonTextColor',
                            type: 'text',
                            label: 'Submit Button Text Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'inputBackgroundColor',
                            type: 'text',
                            label: 'Input Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'inputBorderColor',
                            type: 'text',
                            label: 'Input Border Color',
                            defaultValue: '#C49A48',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'inputTextColor',
                            type: 'text',
                            label: 'Input Text Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'labelColor',
                            type: 'text',
                            label: 'Label Color',
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
                // SERVICES / HELP SECTION
                // =====================
                {
                    label: 'Services Section',
                    fields: [
                        {
                            name: 'servicesEnabled',
                            type: 'checkbox',
                            label: 'Enable Services Section',
                            defaultValue: true,
                        },
                        {
                            name: 'servicesHeading',
                            type: 'text',
                            label: 'Services Heading',
                            defaultValue: 'What I Can Help You With',
                        },
                        {
                            name: 'servicesHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Services Heading Font',
                        },
                        {
                            name: 'servicesHeadingColor',
                            type: 'text',
                            label: 'Services Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'servicesDescription',
                            type: 'textarea',
                            label: 'Services Description',
                            defaultValue: "Whether you're a brand looking for authentic cultural content, a student wanting to learn more, or someone curious about life and culture, I'm here to help. Here are the types of inquiries I regularly receive and respond to.",
                        },
                        {
                            name: 'servicesDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Services Description Font',
                        },
                        {
                            name: 'servicesDescriptionColor',
                            type: 'text',
                            label: 'Services Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'services',
                            type: 'array',
                            label: 'Services',
                            fields: [
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon',
                                },
                                {
                                    name: 'iconEmoji',
                                    type: 'text',
                                    label: 'Icon Emoji (fallback)',
                                    admin: {
                                        description: 'e.g. 🤝, 📚, 🎙️, 💬',
                                    },
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Service Title',
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
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Service Description',
                                },
                                {
                                    name: 'descriptionColor',
                                    type: 'text',
                                    label: 'Description Color',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                            ],
                            defaultValue: [
                                {
                                    iconEmoji: '🤝',
                                    title: 'Brand Collaborations',
                                    description: 'Interested in partnering for content creation, sponsorships, or cultural campaigns? I work with brands that align with my values of authenticity and cultural bridge-building.',
                                },
                                {
                                    iconEmoji: '🇯🇵',
                                    title: 'Cultural Learning',
                                    description: 'Questions about learning about different cultures, traditions, or cross-cultural experiences? I\'ve helped 100s of students and achieved expertise through years of study.',
                                },
                                {
                                    iconEmoji: '🎙️',
                                    title: 'Media & Interview Requests',
                                    description: 'Journalists, podcasters, and content creators looking to discuss cultural topics are welcome to reach out for interviews and features.',
                                },
                                {
                                    iconEmoji: '💬',
                                    title: 'General Questions',
                                    description: 'Have questions about my content, living abroad, or cultural topics? I love hearing from my community and answering your curiosity.',
                                },
                            ],
                        },
                        {
                            name: 'serviceCardBackgroundColor',
                            type: 'text',
                            label: 'Service Card Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'serviceCardBorderColor',
                            type: 'text',
                            label: 'Service Card Border Color',
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
                // FAQ SECTION
                // =====================
                {
                    label: 'FAQ Section',
                    fields: [
                        {
                            name: 'faqEnabled',
                            type: 'checkbox',
                            label: 'Enable FAQ Section',
                            defaultValue: true,
                        },
                        {
                            name: 'faqHeading',
                            type: 'text',
                            label: 'FAQ Heading',
                            defaultValue: 'Frequently Asked Questions',
                        },
                        {
                            name: 'faqHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'FAQ Heading Font',
                        },
                        {
                            name: 'faqHeadingColor',
                            type: 'text',
                            label: 'FAQ Heading Color',
                            defaultValue: '#4a4b34',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'faqDescription',
                            type: 'textarea',
                            label: 'FAQ Description',
                            defaultValue: 'Before reaching out, you might find your answer here. These are the most common questions I receive from visitors and potential collaborators.',
                        },
                        {
                            name: 'faqDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'FAQ Description Font',
                        },
                        {
                            name: 'faqDescriptionColor',
                            type: 'text',
                            label: 'FAQ Description Color',
                            defaultValue: '#6b6c4f',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'faqs',
                            type: 'array',
                            label: 'FAQ Items',
                            fields: [
                                {
                                    name: 'question',
                                    type: 'text',
                                    label: 'Question',
                                    required: true,
                                },
                                {
                                    name: 'questionFont',
                                    type: 'relationship',
                                    relationTo: 'fonts',
                                    label: 'Question Font',
                                },
                                {
                                    name: 'questionColor',
                                    type: 'text',
                                    label: 'Question Color',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                                {
                                    name: 'answer',
                                    type: 'textarea',
                                    label: 'Answer',
                                    required: true,
                                },
                                {
                                    name: 'answerColor',
                                    type: 'text',
                                    label: 'Answer Color',
                                    admin: {
                                        components: {
                                            Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                        },
                                    },
                                },
                            ],
                            defaultValue: [
                                {
                                    question: 'How quickly do you respond to messages?',
                                    answer: 'I typically respond within 24-48 hours on business days. For urgent collaboration inquiries, please mention "URGENT" in your subject line, and I\'ll prioritize your message.',
                                },
                                {
                                    question: 'Do you accept brand collaborations?',
                                    answer: 'Yes! I work with brands that align with my content focus on culture, lifestyle, and cross-cultural exchange. Please share details about your brand and campaign goals in your message.',
                                },
                                {
                                    question: 'Can you teach me privately?',
                                    answer: 'I offer consultation sessions for those interested in cultural learning. These include study planning, cultural guidance, and personalized learning strategies. Visit my Services page for more details.',
                                },
                                {
                                    question: 'Are you available for speaking engagements?',
                                    answer: 'Yes, I\'m available for cultural seminars, webinars, and speaking events related to cross-cultural experiences, lifestyle, and cultural appreciation. Please include event details and dates in your inquiry.',
                                },
                                {
                                    question: 'How can I support your content?',
                                    answer: 'The best way to support is by subscribing to my YouTube channel, following on Instagram, and sharing content that resonates with you. You can also subscribe to my newsletter for exclusive updates.',
                                },
                                {
                                    question: 'Do you offer content licensing?',
                                    answer: 'Yes, my content can be licensed for educational or commercial purposes. Please reach out with specific requirements, intended use, and duration for a custom quote.',
                                },
                            ],
                        },
                        {
                            name: 'faqCardBackgroundColor',
                            type: 'text',
                            label: 'FAQ Card Background Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'faqCardBorderColor',
                            type: 'text',
                            label: 'FAQ Card Border Color',
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
                // BUSINESS INQUIRIES BANNER
                // =====================
                {
                    label: 'Business Banner',
                    fields: [
                        {
                            name: 'businessBannerEnabled',
                            type: 'checkbox',
                            label: 'Enable Business Inquiries Banner',
                            defaultValue: true,
                        },
                        {
                            name: 'businessBannerBackgroundColor',
                            type: 'text',
                            label: 'Banner Background Color',
                            defaultValue: '#B88078',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'businessBannerHeading',
                            type: 'text',
                            label: 'Banner Heading',
                            defaultValue: 'Looking for Business Inquiries?',
                        },
                        {
                            name: 'businessBannerHeadingFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Heading Font',
                        },
                        {
                            name: 'businessBannerHeadingColor',
                            type: 'text',
                            label: 'Banner Heading Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'businessBannerDescription',
                            type: 'textarea',
                            label: 'Banner Description',
                            defaultValue: 'For formal business proposals, media kits, or partnership opportunities, please include your company name, the nature of your request, and any relevant deadlines. I review all professional inquiries personally and will respond with detailed information tailored to your needs.',
                        },
                        {
                            name: 'businessBannerDescriptionFont',
                            type: 'relationship',
                            relationTo: 'fonts',
                            label: 'Banner Description Font',
                        },
                        {
                            name: 'businessBannerDescriptionColor',
                            type: 'text',
                            label: 'Banner Description Color',
                            defaultValue: '#F2EBD0',
                            admin: {
                                components: {
                                    Field: '@/components/payload/ColorPickerField#ColorPickerField',
                                },
                            },
                        },
                        {
                            name: 'businessBannerNote',
                            type: 'text',
                            label: 'Banner Note',
                            defaultValue: 'Please note: I receive many messages daily and prioritize inquiries with clear, detailed information. Generic or spam messages may not receive a response.',
                        },
                        {
                            name: 'businessBannerNoteColor',
                            type: 'text',
                            label: 'Banner Note Color',
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
                                description: 'Used for buttons, icons, highlights',
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
                    ],
                },
            ],
        },
    ],
}
