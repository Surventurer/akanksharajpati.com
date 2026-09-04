import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { fetchProductBySlug } from '@/lib/cms'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await fetchProductBySlug(slug)

    if (!product) {
        return {
            title: 'Product Not Found | Akanksha Rajpati',
        }
    }

    const featuredMedia = typeof product.featuredImage === 'object' ? product.featuredImage : null
    const ogImageUrl = (featuredMedia as any)?.url || ''

    return {
        title: `${product.title} | Akanksha Rajpati Shop`,
        description: product.shortDescription || `Discover ${product.title} in our curated collection.`,
        openGraph: ogImageUrl ? {
            images: [{ url: ogImageUrl }],
        } : undefined,
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const rawProduct = await fetchProductBySlug(slug)

    if (!rawProduct) {
        notFound()
    }

    // Helper to extract media URL
    const getMediaUrl = (media: any): string => {
        if (!media) return ''
        if (typeof media === 'string') return media
        return media.url || ''
    }

    const featuredMedia = typeof rawProduct.featuredImage === 'object' ? rawProduct.featuredImage : null
    const galleryImages: string[] = (rawProduct.gallery || [])
        .map((g: any) => getMediaUrl(g?.image))
        .filter(Boolean)

    const categories = (rawProduct.categories || []).map((cat: any) => {
        if (typeof cat === 'object' && cat !== null) {
            return { name: cat.name || '', slug: cat.slug || '' }
        }
        return { name: String(cat), slug: String(cat).toLowerCase() }
    })

    const serializedProduct = {
        id: rawProduct.id,
        title: rawProduct.title,
        slug: rawProduct.slug,
        price: Number(rawProduct.price) || 0,
        compareAtPrice: rawProduct.compareAtPrice ? Number(rawProduct.compareAtPrice) : undefined,
        inventory: rawProduct.inventory || 0,
        sku: rawProduct.sku || undefined,
        shortDescription: rawProduct.shortDescription || undefined,
        featuredImage: getMediaUrl(featuredMedia),
        gallery: galleryImages,
        categories,
        specifications: rawProduct.specifications || [],
    }

    return <ProductDetailClient product={serializedProduct} />
}

