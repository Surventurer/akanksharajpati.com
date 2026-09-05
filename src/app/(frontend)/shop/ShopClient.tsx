'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopPage as ShopPageType, Media, Font } from "@/payload-types";
import { useCart } from "@/context/CartContext";

interface ShopClientProps {
    pageData: ShopPageType | null;
    collectionProducts?: any[];
    collectionCategories?: any[];
}

export default function ShopClient({ pageData, collectionProducts, collectionCategories }: ShopClientProps) {
    const { addItem } = useCart();
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
                        <h1 className="text-4xl font-display mb-4">{(pageData as any)?.comingSoonText || 'Coming Soon'}</h1>
                        <p className="text-foreground/60">{(pageData as any)?.comingSoonDescription || 'Our shop is currently being updated.'}</p>
                    </div>
                </div>
            </>
        );
    }

    // Build category list from Payload collection or fallback ShopPage global
    const cmsCategories = (collectionCategories && collectionCategories.length > 0)
        ? collectionCategories.map((c: any) => ({
            name: c.name,
            slug: (c.slug || c.name || '').toLowerCase().trim(),
        }))
        : (pageData.categories || []).map((c: any) => ({
            name: c.name,
            slug: (c.slug || c.name || '').toLowerCase().trim(),
        }));

    const categories = [
        { name: 'All Objects', slug: 'all' },
        ...cmsCategories.filter((c: any) => c.slug !== 'all' && c.name?.toLowerCase() !== 'all objects')
    ];

    // Map products from Collection or Global
    const mappedCollectionProducts = (collectionProducts || []).map((p: any) => {
        const rawCats = Array.isArray(p.categories) ? p.categories : (p.categories ? [p.categories] : []);
        const catSlugs: string[] = [];
        const catNames: string[] = [];
        
        rawCats.forEach((c: any) => {
            if (typeof c === 'object' && c !== null) {
                if (c.slug) catSlugs.push(String(c.slug).toLowerCase().trim());
                if (c.name) {
                    catNames.push(c.name);
                    catSlugs.push(String(c.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }
                if (c.id) catSlugs.push(String(c.id));
            } else if (typeof c === 'string') {
                catSlugs.push(c.toLowerCase().trim());
                catSlugs.push(c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                catNames.push(c);
            }
        });

        const primaryCategory = catNames[0] || (typeof p.category === 'string' ? p.category : 'Object');

        return {
            id: p.id,
            name: p.title || p.name || 'Untitled',
            slug: p.slug,
            price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : (p.price || '$0.00'),
            rawPrice: typeof p.price === 'number' ? p.price : parseFloat(String(p.price || '0').replace(/[^0-9.]/g, '') || '0'),
            salePrice: p.compareAtPrice ? `$${Number(p.compareAtPrice).toFixed(2)}` : undefined,
            category: primaryCategory,
            categorySlugs: catSlugs,
            categoryNames: catNames,
            image: p.featuredImage || p.image,
            description: p.shortDescription || p.description || '',
            link: p.slug ? `/shop/${p.slug}` : (p.link || '#'),
            badge: p.featured ? 'Featured' : undefined,
            createdAt: p.createdAt,
        };
    });

    const fallbackProducts = (pageData.products || []).map((p: any) => {
        const catName = p.category || 'Object';
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
            ...p,
            rawPrice: parseFloat(String(p.price || '0').replace(/[^0-9.]/g, '') || '0'),
            categorySlugs: [catSlug, catName.toLowerCase().trim()],
            categoryNames: [catName],
            link: p.slug ? `/shop/${p.slug}` : (p.link || '#'),
        };
    });

    const products = mappedCollectionProducts.length > 0
        ? mappedCollectionProducts
        : fallbackProducts;

    const defaultSortOptions = [
        { label: 'Newest Arrivals', value: 'newest' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
    ];
    const sortOptions = (pageData.sortOptions && pageData.sortOptions.length > 0)
        ? pageData.sortOptions
        : defaultSortOptions;

    // Filter products by category
    const filteredProducts = activeCategory === 'all' 
        ? products 
        : products.filter(p => {
            const target = activeCategory.toLowerCase().trim();
            // Match any associated slug
            if (p.categorySlugs && p.categorySlugs.some((s: string) => s === target || s.includes(target) || target.includes(s))) {
                return true;
            }
            // Match category names
            if (p.categoryNames && p.categoryNames.some((name: string) => {
                const norm = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return norm === target || norm.includes(target) || target.includes(norm);
            })) {
                return true;
            }
            // Fallback match on primary category
            if (p.category) {
                const norm = String(p.category).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return norm === target || norm.includes(target) || target.includes(norm);
            }
            return false;
        });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getPrice = (item: any) => {
            if (typeof item.rawPrice === 'number' && !isNaN(item.rawPrice)) return item.rawPrice;
            const parsed = parseFloat(String(item.price || '0').replace(/[^0-9.]/g, ''));
            return isNaN(parsed) ? 0 : parsed;
        };

        const getDate = (item: any) => {
            if (item.createdAt) return new Date(item.createdAt).getTime();
            return 0;
        };

        const sortVal = String(sortBy).toLowerCase();

        if (sortVal === 'price-asc' || sortVal === 'price_asc' || sortVal === 'low-to-high' || sortVal.includes('low')) {
            return getPrice(a) - getPrice(b);
        }
        if (sortVal === 'price-desc' || sortVal === 'price_desc' || sortVal === 'high-to-low' || sortVal.includes('high')) {
            return getPrice(b) - getPrice(a);
        }
        if (sortVal === 'oldest' || sortVal === 'date-asc') {
            return getDate(a) - getDate(b);
        }
        if (sortVal === 'name-asc' || sortVal === 'title-asc' || sortVal === 'a-z') {
            return (a.name || '').localeCompare(b.name || '');
        }
        if (sortVal === 'name-desc' || sortVal === 'title-desc' || sortVal === 'z-a') {
            return (b.name || '').localeCompare(a.name || '');
        }
        // Default 'newest'
        const dateDiff = getDate(b) - getDate(a);
        if (dateDiff !== 0) return dateDiff;
        return 0;
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
                                sizes="50vw"
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
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {categories.map((category, index) => {
                                const isActive = activeCategory === (category.slug || 'all');
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(category.slug || 'all')}
                                        className={`rounded-lg transition-all duration-200 px-4 py-2 text-xs uppercase tracking-widest font-bold ${
                                            isActive
                                                ? "bg-secondary/40 text-foreground border border-accent/40 shadow-sm"
                                                : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                                        }`}
                                        style={{
                                            fontFamily: getFontFamily(pageData.categoryFont),
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                        {pageData.showSortDropdown && (
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="text-foreground/50 uppercase tracking-widest text-[10px] font-bold">
                                    Sort By
                                </span>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-background rounded-lg border border-border/40 px-3 py-2 cursor-pointer font-medium uppercase tracking-widest text-xs focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
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
                                            className={`relative overflow-hidden mb-6 rounded-xl shadow-sm transition-all duration-300 ${pageData.cardHoverEffect === 'shadow' ? 'group-hover:shadow-xl' : 'hover:shadow-lg'} ${pageData.cardHoverEffect === 'border' ? 'border group-hover:border-primary' : ''} ${pageData.cardHoverEffect !== 'border' ? 'group-hover:-translate-y-1' : ''}`}
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
                                                    className="badge-premium absolute top-4 left-4"
                                                    style={{ 
                                                        backgroundColor: (product as any).badgeColor || pageData.saleBadgeColor || 'var(--accent)',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {product.badge}
                                                </div>
                                            )}
                                            {/* Sale Badge */}
                                            {pageData.showSaleBadge && product.salePrice && !product.badge && (
                                                <div 
                                                    className="badge-premium absolute top-4 left-4 shadow-sm"
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
                                                <div className="absolute inset-0 bg-foreground/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                    <button className="bg-background text-foreground px-6 py-2.5 font-medium tracking-wide rounded-lg shadow-lg hover:shadow-xl transition-all">
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
                                                className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
                                            >
                                                {pageData.externalCheckoutButtonText || 'Shop Now'}
                                            </Link>
                                        )}
                                        {/* Add to Cart Button */}
                                        {pageData.showAddToCartButton && (
                                            <button 
                                                onClick={() => {
                                                    const priceNum = (product as any).rawPrice ?? parseFloat(String(product.price || '0').replace(/[^0-9.]/g, '')) ?? 0;
                                                    addItem({
                                                        productId: (product as any).id || (product as any).slug || `prod-${index}`,
                                                        slug: (product as any).slug || '',
                                                        title: product.name,
                                                        price: priceNum,
                                                        image: productImage,
                                                    });
                                                }}
                                                className="mt-4 inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-foreground/90 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                                            >
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
                                        sizes="96px"
                                        className="object-contain opacity-30 hover:opacity-50 transition-opacity duration-200"
                                    />
                                </div>
                            )}
                            <h3 className="text-2xl font-display mb-4">
                                {pageData.emptyStateHeading || 'No Products Available'}
                            </h3>
                            <p className="text-foreground/60">
                                {pageData.emptyStateDescription || 'Check back soon for new arrivals.'}
                            </p>
                            {activeCategory !== 'all' && (
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className="mt-6 inline-flex items-center px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-lg bg-secondary/30 hover:bg-secondary/50 text-foreground transition-all duration-200"
                                >
                                    Show All Objects
                                </button>
                            )}
                        </div>
                    )}
                </main>
            )}

            {/* Featured Banner */}
            {pageData.bannerEnabled && (
                <section 
                    className="py-20 px-6 shadow-inner border-t border-accent/10"
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
                                className="inline-block px-12 py-4 text-[10px] uppercase tracking-widest font-bold hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
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
