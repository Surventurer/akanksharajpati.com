'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface ProductDetailClientProps {
    product: {
        id: string
        title: string
        slug: string
        price: number
        compareAtPrice?: number
        inventory: number
        sku?: string
        shortDescription?: string
        featuredImage: string
        gallery: string[]
        categories: Array<{ name: string; slug: string }>
        specifications?: Array<{ label: string; value: string }>
    }
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addItem } = useCart()
    const [selectedImage, setSelectedImage] = useState(product.featuredImage)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    const allImages = [product.featuredImage, ...(product.gallery || [])].filter(Boolean)

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.featuredImage,
            quantity,
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : null

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="mb-8 text-xs text-foreground/50 flex items-center gap-2 uppercase tracking-wider font-semibold">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-xs">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Image Gallery Column */}
                <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] flex-shrink-0">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                        selectedImage === img
                                            ? 'border-primary ring-2 ring-primary/20'
                                            : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.title} view ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Main Featured Image */}
                    <div className="relative flex-1 aspect-[3/4] md:aspect-[4/5] bg-muted/30 rounded-2xl overflow-hidden border border-border/40">
                        {selectedImage ? (
                            <Image
                                src={selectedImage}
                                alt={product.title}
                                fill
                                className="object-cover transition-all duration-300"
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No image available
                            </div>
                        )}

                        {discountPercent && (
                            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                {discountPercent}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Product Information Column */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                        {product.categories?.length > 0 && (
                            <div className="flex gap-2 mb-3">
                                {product.categories.map((cat, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-md"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4 leading-tight">
                            {product.title}
                        </h1>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-2xl md:text-3xl font-semibold text-foreground">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <span className="text-lg text-foreground/40 line-through">
                                    ${product.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {product.shortDescription && (
                            <p className="text-foreground/70 text-base leading-relaxed mb-8">
                                {product.shortDescription}
                            </p>
                        )}

                        {/* Quantity and Add to Bag */}
                        <div className="space-y-4 mb-10 pt-6 border-t border-border/40">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded-lg bg-background">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="px-4 text-sm font-semibold min-w-[2rem] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 py-4 px-8 rounded-lg uppercase tracking-widest text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                                        added ? 'bg-green-600 text-white' : 'btn-gold'
                                    }`}
                                >
                                    {added ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to Bag!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Add to Bag
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-[11px] text-foreground/50 text-center">
                                Complimentary worldwide delivery on orders over $150. Tax calculated at checkout.
                            </p>
                        </div>

                        {/* Specifications */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="border-t border-border/40 pt-6 mb-8">
                                <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-4">
                                    Object Details
                                </h3>
                                <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                                    {product.specifications.map((spec, i) => (
                                        <div key={i} className="border-b border-border/20 pb-2">
                                            <dt className="text-foreground/50 text-xs">{spec.label}</dt>
                                            <dd className="font-medium text-foreground mt-0.5">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>

                    {/* Guarantees */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-foreground/[0.02] border border-border/30 text-xs text-foreground/70">
                        <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Authentic Design Object</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>14-Day Global Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

