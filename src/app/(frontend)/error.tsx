'use client'

import React, { useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        console.error('Frontend Application Error:', error)
    }, [error])

    const handleRetry = () => {
        startTransition(() => {
            router.refresh()
            reset()
        })
    }

    return (
        <div className="pt-32 pb-24 min-h-[75vh] flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                <span className="section-label mb-4 block">Unexpected Interruption</span>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">
                    Something Went <span className="text-serif-accent">Wrong</span>
                </h1>
                <p className="body-editorial text-lg text-foreground/70 mb-10 max-w-lg mx-auto leading-relaxed">
                    We encountered an unexpected moment of discord while preparing this view. You may retry or return to tranquility.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={handleRetry}
                        disabled={isPending}
                        className="btn-primary flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        aria-label="Try refreshing this view"
                    >
                        <Icon name="refresh" size={18} className={isPending ? 'animate-spin' : ''} />
                        {isPending ? 'Retrying...' : 'Try Again'}
                    </button>
                    <Link
                        href="/"
                        className="btn-outline flex items-center gap-2"
                    >
                        <Icon name="home" size={18} />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
