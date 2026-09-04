'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

interface WatchDetailClientProps {
    video: {
        id: string
        title: string
        slug: string
        videoUrl: string
        videoProvider?: string
        videoId?: string
        duration?: string
        category: string
        views: number
        publishedAt?: string
        summary?: string
        thumbnail?: string
    }
    relatedVideos: Array<{
        id: string
        title: string
        slug: string
        thumbnail?: string
        duration?: string
        views: number
        category: string
    }>
}

export default function WatchDetailClient({ video, relatedVideos }: WatchDetailClientProps) {
    const [copied, setCopied] = useState(false)

    // YouTube / Vimeo embed URL extractor
    const getEmbedUrl = (url: string) => {
        if (!url) return null
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
        if (ytMatch && ytMatch[1]) {
            return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
        }
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
        if (vimeoMatch && vimeoMatch[1]) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
        }
        return null
    }

    const embedUrl = getEmbedUrl(video.videoUrl)

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-xs text-foreground/50 flex items-center gap-2 uppercase tracking-wider font-semibold">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <Link href="/watch" className="hover:text-foreground transition-colors">Watch</Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-sm">{video.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Player Column */}
                <div className="lg:col-span-8">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-border/40">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={video.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/60">
                                Invalid or unsupported video URL
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
                            <div>
                                <span className="text-xs uppercase tracking-widest font-bold text-primary mb-2 block">
                                    {video.category}
                                </span>
                                <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                                    {video.title}
                                </h1>
                            </div>

                            <button
                                onClick={handleShare}
                                className="btn-outline text-xs px-4 py-2 flex items-center gap-2 uppercase tracking-widest font-bold rounded-lg"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                {copied ? 'Link Copied!' : 'Share'}
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-foreground/60 py-3">
                            {video.publishedAt && (
                                <span>
                                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            )}
                            {video.duration && (
                                <>
                                    <span>•</span>
                                    <span>{video.duration} min duration</span>
                                </>
                            )}
                        </div>

                        {video.summary && (
                            <div className="mt-4 p-5 rounded-xl bg-card border border-border/40 text-foreground/80 leading-relaxed text-sm">
                                {video.summary}
                            </div>
                        )}
                    </div>
                </div>

                {/* Up Next / Related Videos Sidebar */}
                <div className="lg:col-span-4">
                    <h2 className="text-sm font-display uppercase tracking-widest font-bold text-foreground mb-4 pb-2 border-b border-border/40">
                        Up Next & Recommended
                    </h2>

                    <div className="space-y-4">
                        {relatedVideos.length === 0 ? (
                            <p className="text-xs text-foreground/50 py-4">No additional videos available in this series.</p>
                        ) : (
                            relatedVideos.map(rel => (
                                <Link
                                    key={rel.id}
                                    href={`/watch/${rel.slug}`}
                                    className="group flex gap-3 p-2 rounded-xl hover:bg-foreground/5 transition-all"
                                >
                                    <div className="relative w-28 h-18 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                        {rel.thumbnail ? (
                                            <Image
                                                src={rel.thumbnail}
                                                alt={rel.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="112px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-foreground/10 text-foreground/40 text-[10px]">
                                                Watch
                                            </div>
                                        )}
                                        {rel.duration && (
                                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                                                {rel.duration}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] uppercase tracking-wider text-primary font-bold line-clamp-1 mb-1">
                                            {rel.category}
                                        </p>
                                        <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                            {rel.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

