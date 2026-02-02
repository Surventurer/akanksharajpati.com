'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopPage as ShopPageType, Media, Font } from "@/payload-types";

interface ShopClientProps {
    pageData: ShopPageType | null;
}

export default function ShopClient({ pageData }: ShopClientProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // Helper function to get font family
    const getFontFamily = (font: Font | string | number | null | undefined): string => {
        if (!font) return 'inherit';
        if (typeof font === 'string' || typeof font === 'number') return 'inherit';
        return font.filename || 'inherit';
    };

    // Helper function to get media URL
    const getMediaUrl = (media: Media | string | number | null | undefined): string => {
        if (!media) return '';
        if (typeof media === 'string') return media;
        if (typeof media === 'number') return '';
        return media.url || '';
    };

    // If page is disabled or no data, show placeholder
    if (!pageData || !pageData.pageEnabled) {
        return (
            <>
                <div className="pt-24"></div>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-display mb-4">Coming Soon</h1>
                        <p className="text-foreground/60">Our shop is currently being updated.</p>
                    </div>
                </div>
            </>
        );
    }

    const categories = pageData.categories || [{ name: 'All Objects', slug: 'all' }];
    const products = pageData.products || [];
    const sortOptions = pageData.sortOptions || [{ label: 'Newest Arrivals', value: 'newest' }];

    // Filter products by category
    const filteredProducts = activeCategory === 'all' 
        ? products 
        : products.filter(p => p.category?.toLowerCase().replace(/\s+/g, '-') === activeCategory);

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') {
            const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
            const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
            return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
            const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
            const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
            return priceB - priceA;
        }
        return 0; // newest - keep original order
    });

    // Card hover effect class
    const getHoverClass = () => {
        switch (pageData.cardHoverEffect) {
            case 'scale': return 'group-hover:scale-105';
            case 'shadow': return 'group-hover:shadow-2xl';
            case 'border': return 'group-hover:border-primary';
            default: return '';
        }
    };

    // Grid columns class
    const getGridClass = () => {
        switch (pageData.productsGridColumns) {
            case '2': return 'lg:grid-cols-2';
            case '4': return 'lg:grid-cols-4';
            default: return 'lg:grid-cols-3';
        }
    };

    return (
        <>
            {/* Spacer for fixed header */}
            <div className="pt-24"></div>

            {/* Hero Section */}
            {pageData.heroEnabled && (
                <header 
                    className="relative py-24 overflow-hidden"
                    style={{ backgroundColor: pageData.heroBackgroundColor || undefined }}
                >
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-2xl">
                            {pageData.heroSectionLabel && (
                                <span 
                                    className="section-label mb-4 block"
                                    style={{
                                        fontFamily: getFontFamily(pageData.heroSectionLabelFont),
                                        color: pageData.heroSectionLabelColor || undefined,
                                    }}
                                >
                                    {pageData.heroSectionLabel}
                                </span>
                            )}
                            <h1 
                                className="font-display text-5xl md:text-7xl mb-6 leading-tight"
                                style={{
                                    fontFamily: getFontFamily(pageData.heroHeadingFont),
                                    color: pageData.heroHeadingColor || undefined,
                                }}
                            >
                                {pageData.heroHeading || 'Shop'}
                            </h1>
                            {pageData.heroDescription && (
                                <p 
                                    className="text-lg text-foreground/70 max-w-lg mb-10 leading-relaxed"
                                    style={{
                                        fontFamily: getFontFamily(pageData.heroDescriptionFont),
                                        color: pageData.heroDescriptionColor || undefined,
                                    }}
                                >
                                    {pageData.heroDescription}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4">
                                {pageData.heroPrimaryButtonEnabled && pageData.heroPrimaryButtonText && (
                                    <Link 
                                        href={pageData.heroPrimaryButtonLink || '#shop'} 
                                        className="btn-gold"
                                        style={{
                                            fontFamily: getFontFamily(pageData.heroPrimaryButtonFont),
                                            backgroundColor: pageData.heroPrimaryButtonBgColor || undefined,
                                            color: pageData.heroPrimaryButtonTextColor || undefined,
                                        }}
                                    >
                                        {pageData.heroPrimaryButtonText}
                                    </Link>
                                )}
                                {pageData.heroSecondaryButtonEnabled && pageData.heroSecondaryButtonText && (
                                    <Link 
                                        href={pageData.heroSecondaryButtonLink || '#digital'} 
                                        className="btn-outline"
                                        style={{
                                            fontFamily: getFontFamily(pageData.heroSecondaryButtonFont),
                                            borderColor: pageData.heroSecondaryButtonBorderColor || undefined,
                                            color: pageData.heroSecondaryButtonTextColor || undefined,
                                        }}
                                    >
                                        {pageData.heroSecondaryButtonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {pageData.showHeroImage && pageData.heroImage && (
                        <div 
                            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                            style={{ opacity: (pageData.heroImageOpacity || 10) / 100 }}
                        >
                            <Image
                                alt="Shop hero background"
                                className="object-cover grayscale"
                                src={getMediaUrl(pageData.heroImage)}
                                fill
                                priority
                            />
                        </div>
                    )}
                </header>
            )}

            {/* Filter Bar */}
            {pageData.filterBarEnabled && (
                <section className="max-w-7xl mx-auto px-6 mb-12">
                    <div 
                        className="flex flex-col md:flex-row md:items-center justify-between border-y py-6 gap-4"
                        style={{ borderColor: pageData.borderColor || 'rgba(var(--accent), 0.1)' }}
                    >
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(category.slug || 'all')}
                                    className={
                                        activeCategory === (category.slug || 'all')
                                            ? "font-medium border-b pb-1"
                                            : "font-medium text-foreground/50 hover:text-foreground transition-colors pb-1"
                                    }
                                    style={{
                                        fontFamily: getFontFamily(pageData.categoryFont),
                                        ...(activeCategory === (category.slug || 'all') ? {
                                            color: pageData.categoryActiveColor || 'var(--primary)',
                                            borderColor: pageData.categoryActiveColor || 'var(--primary)',
                                        } : {
                                            color: pageData.categoryInactiveColor || undefined,
                                        }),
                                    }}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        {pageData.showSortDropdown && (
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="text-foreground/50 uppercase tracking-widest text-[10px] font-bold">
                                    Sort By
                                </span>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium uppercase tracking-widest text-xs focus:outline-none"
                                >
                                    {sortOptions.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Products Grid */}
            {pageData.productsEnabled && (
                <main 
                    className="max-w-7xl mx-auto px-6 pb-24" 
                    id="shop"
                    style={{ backgroundColor: pageData.pageBackgroundColor || undefined }}
                >
                    {sortedProducts.length > 0 ? (
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridClass()} gap-12`}>
                            {sortedProducts.map((product, index) => {
                                const productImage = getMediaUrl(product.image);
                                return (
                                    <div key={index} className="group">
                                        <div 
                                            className={`relative overflow-hidden product-card mb-6 transition-all duration-700 ${pageData.cardHoverEffect === 'shadow' ? 'group-hover:shadow-2xl' : ''} ${pageData.cardHoverEffect === 'border' ? 'border group-hover:border-primary' : ''}`}
                                            style={{ 
                                                height: `${pageData.productCardHeight || 450}px`,
                                                backgroundColor: pageData.cardBackgroundColor || undefined,
                                            }}
                                        >
                                            {productImage && (
                                                <Image
                                                    alt={product.name}
                                                    className={`object-cover transition-transform duration-700 ${pageData.cardHoverEffect === 'scale' ? 'group-hover:scale-105' : ''}`}
                                                    src={productImage}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            )}
                                            {/* Badge */}
                                            {product.badge && (
                                                <div 
                                                    className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold"
                                                    style={{ 
                                                        backgroundColor: product.badgeColor || pageData.saleBadgeColor || 'var(--accent)',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {product.badge}
                                                </div>
                                            )}
                                            {/* Sale Badge */}
                                            {pageData.showSaleBadge && product.salePrice && !product.badge && (
                                                <div 
                                                    className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold"
                                                    style={{ 
                                                        backgroundColor: pageData.saleBadgeColor || 'var(--destructive)',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {pageData.saleBadgeText || 'Sale'}
                                                </div>
                                            )}
                                            {/* Quick View Button */}
                                            {pageData.showQuickViewButton && (
                                                <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button className="bg-background text-foreground px-6 py-2 font-medium tracking-wide shadow-xl">
                                                        {pageData.quickViewButtonText || 'Quick View'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                {product.category && (
                                                    <p 
                                                        className="text-[10px] uppercase tracking-widest font-bold mb-1"
                                                        style={{ color: pageData.productCategoryColor || 'var(--secondary)' }}
                                                    >
                                                        {product.category}
                                                    </p>
                                                )}
                                                <h3 
                                                    className="text-xl font-display mb-1"
                                                    style={{
                                                        fontFamily: getFontFamily(pageData.productNameFont),
                                                        color: pageData.productNameColor || undefined,
                                                    }}
                                                >
                                                    {product.link ? (
                                                        <Link href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                            {product.name}
                                                        </Link>
                                                    ) : product.name}
                                                </h3>
                                                {product.description && (
                                                    <p className="text-foreground/60 text-sm">{product.description}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                {product.salePrice ? (
                                                    <>
                                                        <p 
                                                            className="font-display text-lg"
                                                            style={{
                                                                fontFamily: getFontFamily(pageData.productPriceFont),
                                                                color: pageData.productPriceColor || 'var(--primary)',
                                                            }}
                                                        >
                                                            {product.salePrice}
                                                        </p>
                                                        <p className="text-foreground/40 text-sm line-through">{product.price}</p>
                                                    </>
                                                ) : (
                                                    <p 
                                                        className="font-display text-lg"
                                                        style={{
                                                            fontFamily: getFontFamily(pageData.productPriceFont),
                                                            color: pageData.productPriceColor || 'var(--primary)',
                                                        }}
                                                    >
                                                        {product.price}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/* External Checkout Button */}
                                        {pageData.externalCheckoutEnabled && product.link && (
                                            <Link 
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors"
                                            >
                                                {pageData.externalCheckoutButtonText || 'Shop Now'}
                                            </Link>
                                        )}
                                        {/* Add to Cart Button */}
                                        {pageData.showAddToCartButton && (
                                            <button className="mt-4 bg-foreground text-background px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-foreground/90 transition-colors">
                                                {pageData.addToCartButtonText || 'Add to Cart'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            {pageData.emptyStateIcon && (
                                <div className="w-24 h-24 mx-auto mb-6 relative">
                                    <Image
                                        src={getMediaUrl(pageData.emptyStateIcon)}
                                        alt="No products"
                                        fill
                                        className="object-contain opacity-40"
                                    />
                                </div>
                            )}
                            <h3 className="text-2xl font-display mb-4">
                                {pageData.emptyStateHeading || 'No Products Available'}
                            </h3>
                            <p className="text-foreground/60">
                                {pageData.emptyStateDescription || 'Check back soon for new arrivals.'}
                            </p>
                        </div>
                    )}
                </main>
            )}

            {/* Featured Banner */}
            {pageData.bannerEnabled && (
                <section 
                    className="py-20 px-6"
                    style={{ backgroundColor: pageData.bannerBackgroundColor || 'var(--secondary)' }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        {pageData.bannerSectionLabel && (
                            <span 
                                className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block"
                                style={{
                                    fontFamily: getFontFamily(pageData.bannerSectionLabelFont),
                                    color: pageData.bannerSectionLabelColor || 'var(--accent)',
                                }}
                            >
                                {pageData.bannerSectionLabel}
                            </span>
                        )}
                        {pageData.bannerHeading && (
                            <h2 
                                className="font-display text-4xl md:text-5xl mb-6 italic"
                                style={{
                                    fontFamily: getFontFamily(pageData.bannerHeadingFont),
                                    color: pageData.bannerHeadingColor || 'var(--secondary-foreground)',
                                }}
                            >
                                {pageData.bannerHeading}
                            </h2>
                        )}
                        {pageData.bannerDescription && (
                            <p 
                                className="mb-8 max-w-2xl mx-auto leading-relaxed"
                                style={{
                                    fontFamily: getFontFamily(pageData.bannerDescriptionFont),
                                    color: pageData.bannerDescriptionColor || 'rgba(var(--secondary-foreground), 0.8)',
                                }}
                            >
                                {pageData.bannerDescription}
                            </p>
                        )}
                        {pageData.bannerButtonText && (
                            <Link
                                href={pageData.bannerButtonLink || '#'}
                                className="inline-block px-12 py-4 text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-colors"
                                style={{
                                    fontFamily: getFontFamily(pageData.bannerButtonFont),
                                    backgroundColor: pageData.bannerButtonBgColor || 'var(--accent)',
                                    color: pageData.bannerButtonTextColor || 'var(--foreground)',
                                }}
                            >
                                {pageData.bannerButtonText}
                            </Link>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
