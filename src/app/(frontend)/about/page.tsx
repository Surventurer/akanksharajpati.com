
import { fetchAboutPage } from "@/lib/cms.server";
import { Media } from "@/payload-types";
import Image from "next/image";

// Force dynamic rendering to always fetch fresh CMS data
export const dynamic = 'force-dynamic'


export default async function About() {
    const pageData = await fetchAboutPage();

    // Serialize data to prevent enqueueModel errors
    const serializedPageData = pageData ? JSON.parse(JSON.stringify(pageData)) : null;

    // If no CMS data or page is disabled, show a simple message
    if (!serializedPageData || serializedPageData.pageEnabled === false) {
        return (
            <>
                <div className="pt-32"></div>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-display mb-4">Coming Soon</h1>
                        <p className="text-foreground/60">This page is currently being updated.</p>
                    </div>
                </div>
            </>
        );
    }

    // Helper to get image URL safely
    const getImageUrl = (imageField: string | number | Media | null | undefined) => {
        if (!imageField) return "";
        if (typeof imageField === 'string' || typeof imageField === 'number') return ""; // Numbers or strings are usually IDs, not URLs
        return imageField.url || "";
    };

    /* @ts-ignore */
    const getStyle = (fontField: any, colorField: string | null | undefined) => {
        const style: React.CSSProperties = {};
        if (fontField?.name) style.fontFamily = fontField.name;
        if (colorField) style.color = colorField;
        return style;
    };

    const heroImage = getImageUrl(serializedPageData?.heroImage);
    const signatureImage = getImageUrl(serializedPageData?.signatureImage);

    return (
        <>
            {/* Spacer for fixed header */}
            <div className="pt-32"></div>

            {/* About Section - only show if enabled */}
            {serializedPageData.heroEnabled !== false && (
                <section className="py-20 px-6 bg-card" id="about">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
                        {serializedPageData.showHeroImage !== false && heroImage && (
                            <div className="md:col-span-5 relative">
                                <div className="absolute -inset-4 border border-accent/40 translate-x-8 translate-y-8 -z-0"></div>
                                <img
                                    alt="Sarah in a curated interior"
                                    className="relative z-10 w-full aspect-[4/5] object-cover grayscale-[0.2] sepia-[0.1]"
                                    src={heroImage}
                                />
                            </div>
                        )}
                        <div className={serializedPageData.showHeroImage !== false && heroImage ? "md:col-span-7 space-y-10 pl-0 md:pl-12" : "md:col-span-12 space-y-10 text-center"}>
                            <div className="space-y-4">
                                {/* @ts-ignore */}
                                {serializedPageData.sectionLabel && (
                                    <span className="section-label" style={getStyle(serializedPageData?.sectionLabelFont, serializedPageData?.sectionLabelColor)}>{serializedPageData.sectionLabel}</span>
                                )}
                                <h2 className="heading-display">
                                    {/* @ts-ignore */}
                                    {serializedPageData.headingNormal && <span style={getStyle(serializedPageData?.headingNormalFont, serializedPageData?.headingNormalColor)}>{serializedPageData.headingNormal}</span>}
                                    {serializedPageData.headingAccent && <> <span className="text-serif-accent" style={getStyle(serializedPageData?.headingAccentFont, serializedPageData?.headingAccentColor)}>{serializedPageData.headingAccent}</span></>}
                                </h2>
                            </div>
                            <div className="space-y-6 body-editorial">
                                {/* @ts-ignore */}
                                {serializedPageData.introTextMain && (
                                    <p style={getStyle(serializedPageData?.introTextMainFont, serializedPageData?.introTextMainColor)}>
                                        {serializedPageData.introTextMain}
                                    </p>
                                )}
                                {/* @ts-ignore */}
                                {serializedPageData.introTextSecondary && (
                                    <p className="text-base font-sans not-italic text-foreground/70" style={getStyle(serializedPageData?.introTextSecondaryFont, serializedPageData?.introTextSecondaryColor)}>
                                        {serializedPageData.introTextSecondary}
                                    </p>
                                )}
                            </div>
                            {serializedPageData.showSignatureImage !== false && signatureImage && (
                                <div className="flex items-center gap-8">
                                    <img
                                        alt="Signature"
                                        className="h-12 opacity-80"
                                        src={signatureImage}
                                        style={{ filter: "invert(1)", mixBlendMode: "multiply" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Philosophy Section - only show if data exists and is enabled */}
            {serializedPageData.philosophyEnabled !== false && (serializedPageData.philosophyLabel || serializedPageData.philosophyQuote || serializedPageData.philosophyText) && (
                <section className="py-20 px-6 bg-beige">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* @ts-ignore */}
                        {serializedPageData.philosophyLabel && (
                            <span className="section-label mb-4 block" style={getStyle(serializedPageData?.philosophyLabelFont, serializedPageData?.philosophyLabelColor)}>{serializedPageData.philosophyLabel}</span>
                        )}
                        {/* @ts-ignore */}
                        {serializedPageData.philosophyQuote && (
                            <h2 className="font-display text-4xl md:text-5xl mb-8 italic" style={getStyle(serializedPageData?.philosophyQuoteFont, serializedPageData?.philosophyQuoteColor)}>
                                {serializedPageData.philosophyQuote}
                            </h2>
                        )}
                        {/* @ts-ignore */}
                        {serializedPageData.philosophyText && (
                            <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto" style={getStyle(serializedPageData?.philosophyTextFont, serializedPageData?.philosophyTextColor)}>
                                {serializedPageData.philosophyText}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Values Section - only show if data exists and is enabled */}
            {serializedPageData.valuesEnabled !== false && serializedPageData.values && serializedPageData.values.length > 0 && (
                <section className="py-20 px-6 bg-card">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            {/* @ts-ignore */}
                            {serializedPageData.valuesLabel && (
                                <span className="section-label mb-4 block" style={getStyle(serializedPageData?.valuesLabelFont, serializedPageData?.valuesLabelColor)}>{serializedPageData.valuesLabel}</span>
                            )}
                            <h2 className="font-display text-4xl">
                                {/* @ts-ignore */}
                                {serializedPageData.valuesHeadingNormal && <span style={getStyle(serializedPageData?.valuesHeadingNormalFont, serializedPageData?.valuesHeadingNormalColor)}>{serializedPageData.valuesHeadingNormal}</span>}
                                {serializedPageData.valuesHeadingAccent && <> <span className="text-serif-accent" style={getStyle(serializedPageData?.valuesHeadingAccentFont, serializedPageData?.valuesHeadingAccentColor)}>{serializedPageData.valuesHeadingAccent}</span></>}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {serializedPageData.values.map((value: any, index: number) => {
                                /* @ts-ignore */
                                const iconUrl = value.icon?.url;
                                /* @ts-ignore */
                                const shouldShowIcon = value.showIcon !== false;
                                return (
                                    <div key={index} className="text-center">
                                        {shouldShowIcon && (
                                            <div className="w-16 h-16 mx-auto mb-6 border border-accent/40 rounded-full flex items-center justify-center relative overflow-hidden">
                                                {iconUrl ? (
                                                    <Image
                                                        src={iconUrl}
                                                        alt={value.title}
                                                        fill
                                                        className="object-contain p-3"
                                                    />
                                                ) : (
                                                    <span className="material-symbols-outlined text-primary">star</span>
                                                )}
                                            </div>
                                        )}
                                        {/* @ts-ignore */}
                                        <h3 className="font-display text-xl mb-4" style={getStyle(value.titleFont, value.titleColor)}>{value.title}</h3>
                                        {/* @ts-ignore */}
                                        <p className="text-foreground/60 text-sm leading-relaxed" style={getStyle(value.descriptionFont, value.descriptionColor)}>
                                            {value.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
