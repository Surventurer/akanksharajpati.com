'use client';

import { useState } from 'react';
import { ContactPage, Media, Font } from '@/payload-types';

interface ContactClientProps {
    data: ContactPage;
}

const getMediaUrl = (media: Media | string | null | undefined): string => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    return media.url || '';
};

const getFontFamily = (font: Font | string | null | undefined): string | undefined => {
    if (!font || typeof font === 'string') return undefined;
    return font.filename?.replace(/\.[^/.]+$/, '');
};

export default function ContactClient({ data }: ContactClientProps) {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Theme colors
    const pageBackgroundColor = data.pageBackgroundColor || '#F2EBD0';
    const primaryAccentColor = data.primaryAccentColor || '#B88078';
    const cardBackgroundColor = data.cardBackgroundColor || '#f7f3e8';
    const borderColor = data.borderColor || '#868753';
    const textColor = data.textColor || '#4a4b34';
    const mutedTextColor = data.mutedTextColor || '#6b6c4f';

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
    };

    if (!data.pageEnabled) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: pageBackgroundColor }}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: textColor }}>Coming Soon</h1>
                    <p style={{ color: mutedTextColor }}>This page is currently being updated. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: pageBackgroundColor }}>
            {/* Hero Section */}
            {data.heroEnabled && (
                <section className="pt-32 pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 
                            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
                            style={{ 
                                color: data.heroHeadingColor || textColor,
                                fontFamily: getFontFamily(data.heroHeadingFont)
                            }}
                        >
                            {data.heroHeading || 'Get In Touch'}
                        </h1>
                        {data.heroDescription && (
                            <p 
                                className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                                style={{ 
                                    color: data.heroDescriptionColor || mutedTextColor,
                                    fontFamily: getFontFamily(data.heroDescriptionFont)
                                }}
                            >
                                {data.heroDescription}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Contact Methods + Form Section */}
            {(data.contactMethodsEnabled || data.formEnabled) && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Methods */}
                            {data.contactMethodsEnabled && (
                                <div>
                                    <h2 
                                        className="text-3xl font-bold mb-2"
                                        style={{ 
                                            color: data.contactMethodsHeadingColor || textColor,
                                            fontFamily: getFontFamily(data.contactMethodsHeadingFont)
                                        }}
                                    >
                                        {data.contactMethodsHeading || "Let's Start a Conversation"}
                                    </h2>
                                    {data.contactMethodsSubheading && (
                                        <p className="mb-8" style={{ color: mutedTextColor }}>
                                            {data.contactMethodsSubheading}
                                        </p>
                                    )}

                                    {/* Contact Method Cards */}
                                    <div className="space-y-4">
                                        {data.contactMethods?.map((method, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                                style={{ 
                                                    backgroundColor: cardBackgroundColor,
                                                    borderColor: borderColor
                                                }}
                                            >
                                                <div 
                                                    className="w-12 h-12 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: method.iconColor || primaryAccentColor }}
                                                >
                                                    {method.icon ? (
                                                        <img 
                                                            src={getMediaUrl(method.icon)} 
                                                            alt="" 
                                                            className="w-6 h-6 object-contain"
                                                        />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-white text-2xl">
                                                            {method.iconMaterialSymbol || 'mail'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 
                                                        className="font-semibold text-lg"
                                                        style={{ 
                                                            color: method.titleColor || textColor,
                                                            fontFamily: getFontFamily(method.titleFont)
                                                        }}
                                                    >
                                                        {method.title}
                                                    </h3>
                                                    {method.description && (
                                                        <p className="text-sm" style={{ color: mutedTextColor }}>
                                                            {method.description}
                                                        </p>
                                                    )}
                                                    {method.value && (
                                                        method.link ? (
                                                            <a 
                                                                href={method.link}
                                                                className="font-medium hover:underline underline-offset-2"
                                                                style={{ color: primaryAccentColor }}
                                                            >
                                                                {method.value}
                                                            </a>
                                                        ) : (
                                                            <p className="font-medium" style={{ color: textColor }}>
                                                                {method.value}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Response Promise */}
                                    {data.quickResponseEnabled && (
                                        <div 
                                            className="mt-6 p-4 rounded-xl shadow-sm border border-white/10 flex items-start gap-4"
                                            style={{ backgroundColor: data.quickResponseBgColor || primaryAccentColor }}
                                        >
                                            <span 
                                                className="material-symbols-outlined text-2xl"
                                                style={{ color: data.quickResponseTextColor || '#F2EBD0' }}
                                            >
                                                {data.quickResponseIcon || 'schedule'}
                                            </span>
                                            <div>
                                                <h4 
                                                    className="font-semibold"
                                                    style={{ color: data.quickResponseTextColor || '#F2EBD0' }}
                                                >
                                                    {data.quickResponseTitle || 'Quick Response Promise'}
                                                </h4>
                                                <p 
                                                    className="text-sm opacity-90"
                                                    style={{ color: data.quickResponseTextColor || '#F2EBD0' }}
                                                >
                                                    {data.quickResponseDescription}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Contact Form */}
                            {data.formEnabled && (
                                <div 
                                    className="p-8 rounded-2xl shadow-md"
                                    style={{ 
                                        backgroundColor: data.formBackgroundColor || cardBackgroundColor,
                                        borderColor: data.formBorderColor || 'transparent',
                                        borderWidth: data.formBorderColor ? 1 : 0,
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${data.formIconColor || primaryAccentColor}20` }}
                                        >
                                            <span 
                                                className="material-symbols-outlined"
                                                style={{ color: data.formIconColor || primaryAccentColor }}
                                            >
                                                {data.formIcon || 'send'}
                                            </span>
                                        </div>
                                        <h2 
                                            className="text-2xl font-bold"
                                            style={{ 
                                                color: data.formHeadingColor || textColor,
                                                fontFamily: getFontFamily(data.formHeadingFont)
                                            }}
                                        >
                                            {data.formHeading || 'Send a Message'}
                                        </h2>
                                    </div>

                                    {submitted ? (
                                        <div className="text-center py-8 animate-fade-in-up">
                                            <span 
                                                className="material-symbols-outlined text-5xl mb-4"
                                                style={{ color: primaryAccentColor }}
                                            >
                                                check_circle
                                            </span>
                                            <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>
                                                Message Sent!
                                            </h3>
                                            <p style={{ color: mutedTextColor }}>
                                                Thank you for reaching out. I&apos;ll get back to you soon.
                                            </p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-4 px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5 shadow-sm"
                                                style={{ 
                                                    backgroundColor: primaryAccentColor,
                                                    color: '#F2EBD0'
                                                }}
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label 
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: data.labelColor || mutedTextColor }}
                                                >
                                                    {data.nameFieldLabel || 'Name'}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={data.nameFieldPlaceholder || 'Your Name'}
                                                    className="premium-input"
                                                    style={{ 
                                                        backgroundColor: data.inputBackgroundColor || pageBackgroundColor,
                                                        borderColor: data.inputBorderColor || borderColor,
                                                        color: data.inputTextColor || textColor,
                                                        '--tw-ring-color': primaryAccentColor
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                            <div>
                                                <label 
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: data.labelColor || mutedTextColor }}
                                                >
                                                    {data.emailFieldLabel || 'Email'}
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={data.emailFieldPlaceholder || 'your.email@example.com'}
                                                    className="premium-input"
                                                    style={{ 
                                                        backgroundColor: data.inputBackgroundColor || pageBackgroundColor,
                                                        borderColor: data.inputBorderColor || borderColor,
                                                        color: data.inputTextColor || textColor,
                                                        '--tw-ring-color': primaryAccentColor
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                            <div>
                                                <label 
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: data.labelColor || mutedTextColor }}
                                                >
                                                    {data.messageFieldLabel || 'Message'}
                                                </label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder={data.messageFieldPlaceholder || 'Tell me about your project, ideas, or just say hello...'}
                                                    className="premium-input resize-none"
                                                    style={{ 
                                                        backgroundColor: data.inputBackgroundColor || pageBackgroundColor,
                                                        borderColor: data.inputBorderColor || borderColor,
                                                        color: data.inputTextColor || textColor,
                                                        '--tw-ring-color': primaryAccentColor
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 shadow-md hover:shadow-xl"
                                                style={{ 
                                                    backgroundColor: data.submitButtonBgColor || primaryAccentColor,
                                                    color: data.submitButtonTextColor || '#F2EBD0'
                                                }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        {data.submitButtonText || 'Send Message'}
                                                        <span className="material-symbols-outlined">
                                                            {data.submitButtonIcon || 'send'}
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            {data.servicesEnabled && data.services && data.services.length > 0 && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={{ 
                                    color: data.servicesHeadingColor || textColor,
                                    fontFamily: getFontFamily(data.servicesHeadingFont)
                                }}
                            >
                                {data.servicesHeading || 'What I Can Help You With'}
                            </h2>
                            {data.servicesDescription && (
                                <p 
                                    className="max-w-3xl mx-auto leading-relaxed"
                                    style={{ 
                                        color: data.servicesDescriptionColor || mutedTextColor,
                                        fontFamily: getFontFamily(data.servicesDescriptionFont)
                                    }}
                                >
                                    {data.servicesDescription}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.services.map((service, index) => (
                                <div 
                                    key={index}
                                    className="p-6 rounded-xl border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    style={{ 
                                        backgroundColor: data.serviceCardBackgroundColor || cardBackgroundColor,
                                        borderColor: data.serviceCardBorderColor || borderColor
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">
                                            {service.icon ? (
                                                <img 
                                                    src={getMediaUrl(service.icon)} 
                                                    alt="" 
                                                    className="w-10 h-10 object-contain"
                                                />
                                            ) : (
                                                service.iconEmoji || '💬'
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 
                                                className="text-xl font-semibold mb-2"
                                                style={{ 
                                                    color: service.titleColor || textColor,
                                                    fontFamily: getFontFamily(service.titleFont)
                                                }}
                                            >
                                                {service.title}
                                            </h3>
                                            {service.description && (
                                                <p 
                                                    className="text-sm leading-relaxed"
                                                    style={{ color: service.descriptionColor || mutedTextColor }}
                                                >
                                                    {service.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {data.faqEnabled && data.faqs && data.faqs.length > 0 && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={{ 
                                    color: data.faqHeadingColor || textColor,
                                    fontFamily: getFontFamily(data.faqHeadingFont)
                                }}
                            >
                                {data.faqHeading || 'Frequently Asked Questions'}
                            </h2>
                            {data.faqDescription && (
                                <p 
                                    className="max-w-3xl mx-auto leading-relaxed"
                                    style={{ 
                                        color: data.faqDescriptionColor || mutedTextColor,
                                        fontFamily: getFontFamily(data.faqDescriptionFont)
                                    }}
                                >
                                    {data.faqDescription}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.faqs.map((faq, index) => (
                                <div 
                                    key={index}
                                    className="rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md"
                                    style={{ 
                                        backgroundColor: data.faqCardBackgroundColor || cardBackgroundColor,
                                        borderColor: data.faqCardBorderColor || borderColor
                                    }}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-black/5"
                                    >
                                        <span 
                                            className="font-medium"
                                            style={{ 
                                                color: faq.questionColor || textColor,
                                                fontFamily: getFontFamily(faq.questionFont)
                                            }}
                                        >
                                            {faq.question}
                                        </span>
                                        <span 
                                            className={`material-symbols-outlined transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                                            style={{ color: primaryAccentColor }}
                                        >
                                            expand_more
                                        </span>
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                        <p 
                                            className="px-5 pb-5 text-sm leading-relaxed"
                                            style={{ color: faq.answerColor || mutedTextColor }}
                                        >
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Business Inquiries Banner */}
            {data.businessBannerEnabled && (
                <section className="py-16 px-4">
                    <div 
                        className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl shadow-md border border-white/5 text-center"
                        style={{ backgroundColor: data.businessBannerBackgroundColor || cardBackgroundColor }}
                    >
                        <h2 
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{ 
                                color: data.businessBannerHeadingColor || textColor,
                                fontFamily: getFontFamily(data.businessBannerHeadingFont)
                            }}
                        >
                            {data.businessBannerHeading || 'Looking for Business Inquiries?'}
                        </h2>
                        {data.businessBannerDescription && (
                            <p 
                                className="mb-6 max-w-2xl mx-auto leading-relaxed"
                                style={{ 
                                    color: data.businessBannerDescriptionColor || mutedTextColor,
                                    fontFamily: getFontFamily(data.businessBannerDescriptionFont)
                                }}
                            >
                                {data.businessBannerDescription}
                            </p>
                        )}
                        {data.businessBannerNote && (
                            <p 
                                className="text-sm italic"
                                style={{ color: data.businessBannerNoteColor || mutedTextColor }}
                            >
                                {data.businessBannerNote}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Bottom Spacing */}
            <div className="h-16"></div>
        </div>
    );
}
