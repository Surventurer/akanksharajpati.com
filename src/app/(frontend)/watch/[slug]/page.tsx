import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { fetchVideoBySlug, fetchVideos } from '@/lib/cms'
import WatchDetailClient from './WatchDetailClient'

interface WatchPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
    const { slug } = await params
    const video = await fetchVideoBySlug(slug)

    if (!video) {
        return {
            title: 'Video Not Found | Akanksha Rajpati',
        }
    }

    const thumbnail = typeof video.thumbnail === 'object' ? video.thumbnail : null
    const ogImageUrl = (thumbnail as any)?.url || ''

    return {
        title: `${video.title} | Watch`,
        description: video.summary || `Watch ${video.title} on Akanksha Rajpati.`,
        openGraph: ogImageUrl ? {
            images: [{ url: ogImageUrl }],
        } : undefined,
    }
}

export default async function WatchVideoPage({ params }: WatchPageProps) {
    const { slug } = await params
    const rawVideo = await fetchVideoBySlug(slug)

    if (!rawVideo) {
        notFound()
    }

    const getMediaUrl = (media: any): string => {
        if (!media) return ''
        if (typeof media === 'string') return media
        return media.url || ''
    }

    const allVideos = await fetchVideos()

    const relatedVideos = allVideos
        .filter((v: any) => v.slug !== slug)
        .slice(0, 6)
        .map((v: any) => {
            const thumb = typeof v.thumbnail === 'object' ? v.thumbnail : null
            return {
                id: v.id,
                title: v.title,
                slug: v.slug,
                thumbnail: getMediaUrl(thumb),
                duration: v.duration,
                views: v.views || 0,
                category: v.category || 'Cinematic',
            }
        })

    const thumb = typeof rawVideo.thumbnail === 'object' ? rawVideo.thumbnail : null

    const serializedVideo = {
        id: rawVideo.id,
        title: rawVideo.title,
        slug: rawVideo.slug,
        videoUrl: rawVideo.videoUrl,
        videoProvider: rawVideo.videoProvider || 'youtube',
        videoId: rawVideo.videoId || '',
        duration: rawVideo.duration || '',
        category: rawVideo.category || 'Cinematic',
        views: rawVideo.views || 0,
        publishedAt: rawVideo.publishedAt || '',
        summary: rawVideo.summary || '',
        thumbnail: getMediaUrl(thumb),
    }

    return (
        <WatchDetailClient
            video={serializedVideo}
            relatedVideos={relatedVideos}
        />
    )
}

