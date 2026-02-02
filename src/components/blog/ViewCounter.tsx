'use client'

import { useEffect, useRef } from 'react'
import { incrementViewCount } from '@/app/(frontend)/blog/[slug]/actions'

export const ViewCounter = ({ articleId }: { articleId: string }) => {
    const hasIncremented = useRef(false)

    useEffect(() => {
        if (!hasIncremented.current) {
            incrementViewCount(articleId)
            hasIncremented.current = true
        }
    }, [articleId])

    return null // This component doesn't render anything itself
}
