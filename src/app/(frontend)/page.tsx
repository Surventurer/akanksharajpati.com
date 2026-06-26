import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { fetchHomePage, fetchArticles, fetchShopPage } from '@/lib/cms.server'
import { Media, Font } from '@/payload-types'

// Force dynamic rendering to always fetch fresh CMS data
export const dynamic = 'force-dynamic'

export default async function Home() {
    const [pageData, articles, shopData] = await Promise.all([
        fetchHomePage(),
        fetchArticles(),
        fetchShopPage()
    ]);

    // Serialize data to prevent enqueueModel errors
    const serializedPageData = pageData ? JSON.parse(JSON.stringify(pageData)) : null;
    const serializedArticles = JSON.parse(JSON.stringify(articles));
    const serializedShopData = shopData ? JSON.parse(JSON.stringify(shopData)) : null;

    // If page is disabled or no data, show placeholder
    if (!serializedPageData || !serializedPageData.pageEnabled) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display mb-4">Coming Soon</h1>
                    <p className="text-foreground/60">This page is currently being updated.</p>
                </div>
            </div>
        );
    }

    // Helper function to get font family
    const getFontFamily = (font: Font | string | null | undefined): string => {
        if (!font) return 'inherit';
        if (typeof font === 'string') return 'inherit';
        return font.filename || 'inherit';
    };

    // Helper function to get media URL
    const getMediaUrl = (media: Media | string | null | undefined): string => {
        if (!media) return '';
        if (typeof media === 'string') return media;
        return media.url || '';
    };

    // Get recent blog posts for the journal section
    const recentPosts = serializedArticles.slice(0, 3);

    return (
        <>
            {/* Hero Section */}
            {serializedPageData.heroEnabled && (
                <header className="relative h-screen flex items-center justify-center overflow-hidden">
                    {pageData?.showHeroImage !== false && (
                        <div className="absolute inset-0 z-0">
                            {pageData?.heroImage && (
                                <Image
                                    src={getMediaUrl(pageData?.heroImage) || 'https://via.assets.so/img.jpg?w=1920&h=1080&tc=white&bg=333333&t=Hero+Image'}
                                    alt={pageData?.heroHeadingLine1 || 'Hero Image'}
                                    fill
                                    className="object-cover opacity-90"
                                    priority
                                />
                            )}
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    )}
                    <div className="absolute inset-0 hero-gradient"></div>
                    <div className="relative z-10 text-center px-6 max-w-4xl">
                        <h1
                            className="text-6xl md:text-9xl mb-6 drop-shadow-sm leading-none"
                            style={{
                                fontFamily: getFontFamily(pageData?.heroHeadingLine1Font),
                                color: pageData?.heroHeadingLine1Color || undefined
                            }}
                        >
                            {pageData?.heroHeadingLine1 || 'Between Summer'} <br />
                            <span
                                className="text-serif-accent"
                                style={{
                                    fontFamily: getFontFamily(pageData?.heroHeadingLine2Font),
                                    color: pageData?.heroHeadingLine2Color || undefined
                                }}
                            >
                                {pageData?.heroHeadingLine2 || '& Autumn'}
                            </span>
                        </h1>
                        {pageData?.heroDescription && (
                            <p
                                className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed italic"
                                style={{
                                    fontFamily: getFontFamily(pageData?.heroDescriptionFont),
                                    color: pageData?.heroDescriptionColor || 'rgba(var(--foreground), 0.8)'
                                }}
                            >
                                {pageData?.heroDescription}
                            </p>
                        )}
                        {pageData?.heroButtonText && pageData?.heroButtonLink && (
                            <Link
                                href={pageData?.heroButtonLink}
                                className="btn-primary"
                                style={{
                                    fontFamily: getFontFamily(pageData?.heroButtonFont),
                                    backgroundColor: pageData?.heroButtonBgColor || undefined,
                                    color: pageData?.heroButtonTextColor || undefined
                                }}
                            >
                                {pageData?.heroButtonText}
                            </Link>
                        )}
                    </div>
                </header>
            )}

            {/* About Preview Section */}
            {pageData?.aboutPreviewEnabled && (
                <section className="py-32 px-6 bg-card" id="about">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
                        {pageData?.showAboutPreviewImage !== false && (
                            <div className="md:col-span-5 relative">
                                <div className="absolute -inset-4 border border-accent/40 translate-x-8 translate-y-8 -z-0"></div>
                                {pageData?.aboutPreviewImage && (
                                    <Image
                                        alt={pageData?.aboutPreviewHeadingNormal || 'About Image'}
                                        className="relative z-10 object-cover grayscale-[0.2] sepia-[0.1]"
                                        src={getMediaUrl(pageData?.aboutPreviewImage) || 'https://via.assets.so/img.jpg?w=400&h=500&tc=white&bg=333333&t=About+Me'}
                                        width={400}
                                        height={500}
                                    />
                                )}
                            </div>
                        )}
                        <div className={pageData?.showAboutPreviewImage !== false ? "md:col-span-7 space-y-10 pl-0 md:pl-12" : "md:col-span-12 space-y-10 text-center"}>
                            <div className="space-y-4">
                                {pageData?.aboutPreviewSectionLabel && (
                                    <span
                                        className="section-label"
                                        style={{
                                            fontFamily: getFontFamily(pageData?.aboutPreviewSectionLabelFont),
                                            color: pageData?.aboutPreviewSectionLabelColor || undefined
                                        }}
                                    >
                                        {pageData?.aboutPreviewSectionLabel}
                                    </span>
                                )}
                                <h2
                                    className="heading-display"
                                    style={{
                                        fontFamily: getFontFamily(pageData?.aboutPreviewHeadingNormalFont),
                                        color: pageData?.aboutPreviewHeadingNormalColor || undefined
                                    }}
                                >
                                    {pageData?.aboutPreviewHeadingNormal || "Hello, I'm"}{' '}
                                    <span
                                        className="text-serif-accent"
                                        style={{
                                            fontFamily: getFontFamily(pageData?.aboutPreviewHeadingAccentFont),
                                            color: pageData?.aboutPreviewHeadingAccentColor || undefined
                                        }}
                                    >
                                        {pageData?.aboutPreviewHeadingAccent || 'Sarah'}
                                    </span>
                                </h2>
                            </div>
                            <div className="space-y-6 body-editorial">
                                {pageData?.aboutPreviewTextMain && (
                                    <p
                                        style={{
                                            fontFamily: getFontFamily(pageData?.aboutPreviewTextMainFont),
                                            color: pageData?.aboutPreviewTextMainColor || undefined
                                        }}
                                    >
                                        {pageData?.aboutPreviewTextMain}
                                    </p>
                                )}
                                {pageData?.aboutPreviewTextSecondary && (
                                    <p
                                        className="text-base font-sans not-italic text-foreground/70"
                                        style={{
                                            fontFamily: getFontFamily(pageData?.aboutPreviewTextSecondaryFont),
                                            color: pageData?.aboutPreviewTextSecondaryColor || undefined
                                        }}
                                    >
                                        {pageData?.aboutPreviewTextSecondary}
                                    </p>
                                )}
                            </div>
                            {pageData?.aboutPreviewButtonText && pageData?.aboutPreviewButtonLink && (
                                <div className="flex items-center gap-8">
                                    <Link
                                        href={pageData?.aboutPreviewButtonLink}
                                        className="text-[10px] uppercase tracking-widest font-bold border-b border-accent pb-1 hover:text-primary hover:border-primary transition-colors"
                                    >
                                        {pageData?.aboutPreviewButtonText}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Shop Preview Section */}
            {pageData?.shopPreviewEnabled && (
                <section className="py-24 bg-beige overflow-hidden border-y border-accent/10" id="shop">
                    <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div className="space-y-2">
                            <h2
                                className="font-display text-4xl"
                                style={{
                                    fontFamily: getFontFamily(pageData?.shopPreviewHeadingNormalFont),
                                    color: pageData?.shopPreviewHeadingNormalColor || undefined
                                }}
                            >
                                {pageData?.shopPreviewHeadingNormal || 'Shop My'}{' '}
                                <span
                                    className="text-serif-accent"
                                    style={{
                                        fontFamily: getFontFamily(pageData?.shopPreviewHeadingAccentFont),
                                        color: pageData?.shopPreviewHeadingAccentColor || undefined
                                    }}
                                >
                                    {pageData?.shopPreviewHeadingAccent || 'Autumn Edits'}
                                </span>
                            </h2>
                            {pageData?.shopPreviewDescription && (
                                <p
                                    className="text-foreground/50 text-sm tracking-wide"
                                    style={{
                                        fontFamily: getFontFamily(pageData?.shopPreviewDescriptionFont),
                                        color: pageData?.shopPreviewDescriptionColor || undefined
                                    }}
                                >
                                    {pageData?.shopPreviewDescription}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="max-w-7xl mx-auto px-6 pb-12">
                        {serializedShopData?.products && serializedShopData.products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {serializedShopData.products.map((product: any, index: number) => {
                                    const productImage = getMediaUrl(product.image)
                                    return (
                                        <div key={index} className="group">
                                            <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-card">
                                                {productImage && (
                                                    <Image
                                                        alt={product.name}
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        src={productImage}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                )}
                                                {product.badge && (
                                                    <div
                                                        className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-widest font-bold"
                                                        style={{ backgroundColor: product.badgeColor || 'var(--accent)', color: '#fff' }}
                                                    >
                                                        {product.badge}
                                                    </div>
                                                )}
                                            </div>
                                            {product.category && (
                                                <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-secondary">{product.category}</p>
                                            )}
                                            <h3 className="text-lg font-display mb-1">
                                                {product.link ? (
                                                    <Link href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                        {product.name}
                                                    </Link>
                                                ) : product.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                {product.salePrice ? (
                                                    <>
                                                        <span className="font-display text-base text-primary">{product.salePrice}</span>
                                                        <span className="text-foreground/40 text-sm line-through">{product.price}</span>
                                                    </>
                                                ) : (
                                                    <span className="font-display text-base">{product.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-foreground/50">
                                <p>Products coming soon</p>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/shop" className="btn-outline">
                            View All Products
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog Preview Section */}
            {pageData?.blogPreviewEnabled && (
                <section className="py-24 px-6 bg-card" id="journal">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
                            <div className="space-y-2">
                                {pageData?.blogPreviewSectionLabel && (
                                    <span
                                        className="section-label"
                                        style={{
                                            fontFamily: getFontFamily(pageData?.blogPreviewSectionLabelFont),
                                            color: pageData?.blogPreviewSectionLabelColor || undefined
                                        }}
                                    >
                                        {pageData?.blogPreviewSectionLabel}
                                    </span>
                                )}
                                <h2
                                    className="font-display text-4xl"
                                    style={{
                                        fontFamily: getFontFamily(pageData?.blogPreviewHeadingNormalFont),
                                        color: pageData?.blogPreviewHeadingNormalColor || undefined
                                    }}
                                >
                                    {pageData?.blogPreviewHeadingNormal || 'Latest'}{' '}
                                    <span
                                        className="text-serif-accent"
                                        style={{
                                            fontFamily: getFontFamily(pageData?.blogPreviewHeadingAccentFont),
                                            color: pageData?.blogPreviewHeadingAccentColor || undefined
                                        }}
                                    >
                                        {pageData?.blogPreviewHeadingAccent || 'Stories'}
                                    </span>
                                </h2>
                            </div>
                            {pageData?.blogPreviewButtonText && pageData?.blogPreviewButtonLink && (
                                <Link
                                    href={pageData?.blogPreviewButtonLink}
                                    className="btn-outline"
                                >
                                    {pageData?.blogPreviewButtonText}
                                </Link>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentPosts.length > 0 ? recentPosts.map((post: any) => (
                                <article key={post.id} className="group cursor-pointer">
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative mb-6 overflow-hidden aspect-[4/3]">
                                            {post.image && (
                                                <Image
                                                    alt={post.title}
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    src={post.image}
                                                    fill
                                                />
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-foreground/60 text-sm">{post.excerpt}</p>
                                    </Link>
                                </article>
                            )) : (
                                <div className="col-span-3 text-center py-12 text-foreground/50">
                                    <p>No blog posts available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Floating Shop Button */}
            <div className="fixed bottom-8 right-8 z-40">
                <Link
                    href="/shop"
                    className="bg-secondary text-secondary-foreground w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group border border-accent/30"
                >
                    <span className="material-symbols-outlined">menu_book</span>
                    <span className="absolute right-full mr-4 bg-secondary text-secondary-foreground px-4 py-2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest uppercase border border-accent/30">
                        Atelier Shop
                    </span>
                </Link>
            </div>
        </>
    );
}
