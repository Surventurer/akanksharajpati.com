'use client'

import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, Copy, MoreHorizontal, Share2 } from 'lucide-react'
import Image from 'next/image'

interface ShareButtonProps {
    title: string
    slug: string
    variant?: 'popup' | 'inline'
    socialPlatforms?: any[] // Config from CMS
}

const ShareButton = ({ title, slug, variant = 'popup', socialPlatforms }: ShareButtonProps) => {
    const [copied, setCopied] = React.useState(false)

    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : ''

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = (item: string | { platform: string; shareUrl?: string }) => (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const platformName = typeof item === 'string' ? item : item.platform
        const shareUrlPattern = typeof item === 'object' ? item.shareUrl : undefined

        const key = platformName.toLowerCase().trim()

        // Handle copy link specially
        if (key.includes('copy') || (key.includes('link') && !key.includes('linkedin'))) {
            navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            return
        }

        const text = encodeURIComponent(`Check out "${title}"`)
        const encodedUrl = encodeURIComponent(url)

        // 1. Dynamic Share URL from CMS
        if (shareUrlPattern) {
            const finalUrl = shareUrlPattern
                .replace('{url}', encodedUrl)
                .replace('{title}', text)
            window.open(finalUrl, '_blank', 'width=600,height=400')
            return
        }

        // 2. Hardcoded Fallbacks
        let shareUrl = ''
        if (key.includes('twitter') || key === 'x') {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`
        } else if (key.includes('facebook')) {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        } else if (key.includes('linkedin')) {
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${text}`
        } else if (key.includes('instagram')) {
            navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            window.open('https://www.instagram.com/', '_blank')
            return
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400')
        }
    }

    const renderIcon = (platform: string, icon: any) => {
        const key = platform.toLowerCase()

        // 1. Handle "Copied" state PRIORITY override for copy link
        if ((key.includes('copy') || (key.includes('link') && !key.includes('linkedin'))) && copied) {
            return (
                <div className="relative">
                    <Check className="w-5 h-5 relative z-10" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-foreground text-background px-2 py-1 rounded whitespace-nowrap">Copied</span>
                </div>
            )
        }

        // 2. Use custom icon if available (and not in copied state)
        if (icon && (typeof icon === 'string' || icon.url)) {
            return <Image src={icon.url || icon} alt={platform} width={20} height={20} className="w-5 h-5 object-contain" />
        }

        // 3. Fallbacks for default icons
        if (key.includes('facebook')) return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
        if (key.includes('twitter') || key === 'x') return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
        if (key.includes('linkedin')) return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        if (key.includes('instagram')) return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>

        if (key.includes('copy') || (key.includes('link') && !key.includes('linkedin'))) {
            return <div className="relative"><Copy className="w-5 h-5 relative z-10" /></div>
        }

        return <Share2 className="w-5 h-5" />
    }

    if (variant === 'inline') {
        const platforms = socialPlatforms || [
            { platform: 'Facebook', icon: null, showIcon: true },
            { platform: 'Twitter', icon: null, showIcon: true },
            { platform: 'LinkedIn', icon: null, showIcon: true },
            { platform: 'Instagram', icon: null, showIcon: true },
            { platform: 'Copy Link', icon: null, showIcon: true }
        ]

        return (
            <div className="flex items-center gap-3">
                {platforms.map((item, index) => {
                    // @ts-ignore
                    const shouldShowIcon = item.showIcon !== false;
                    // @ts-ignore
                    const displayText = item.customText || item.platform;
                    // @ts-ignore
                    const textFont = item.textFont?.filename;
                    // @ts-ignore
                    const textColor = item.textColor;
                    
                    return (
                        <React.Fragment key={index}>
                            <button
                                onClick={handleShare(item)}
                                className="text-foreground/60 hover:text-primary transition-colors flex items-center justify-center gap-2 p-1"
                                aria-label={`Share on ${item.platform}`}
                                style={{
                                    fontFamily: textFont || undefined,
                                    color: textColor || undefined
                                }}
                            >
                                {shouldShowIcon && renderIcon(item.platform, item.icon)}
                                {!shouldShowIcon && <span className="text-xs">{displayText}</span>}
                            </button>
                            {index < platforms.length - 1 && <span className="text-foreground/40 text-xs">•</span>}
                        </React.Fragment>
                    );
                })}
            </div>
        )
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="p-1 rounded-full hover:bg-foreground/10 transition-colors bg-transparent border-none z-30 relative"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    aria-label="Share options"
                >
                    <MoreHorizontal className="w-4 h-4 text-foreground/50 hover:text-foreground transition-colors" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[160px] bg-background border border-border rounded-md shadow-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-200"
                    sideOffset={5}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenu.Item
                        className="flex items-center px-2 py-2 text-sm text-foreground/80 hover:bg-secondary/50 rounded-sm cursor-pointer outline-none focus:bg-secondary/50 transition-colors"
                        onClick={handleShare('Facebook')}
                    >
                        {renderIcon('Facebook', null)}
                        <span className="ml-2">Facebook</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="flex items-center px-2 py-2 text-sm text-foreground/80 hover:bg-secondary/50 rounded-sm cursor-pointer outline-none focus:bg-secondary/50 transition-colors"
                        onClick={handleShare('Twitter')}
                    >
                        {renderIcon('Twitter', null)}
                        <span className="ml-2">X</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="flex items-center px-2 py-2 text-sm text-foreground/80 hover:bg-secondary/50 rounded-sm cursor-pointer outline-none focus:bg-secondary/50 transition-colors"
                        onClick={handleShare('LinkedIn')}
                    >
                        {renderIcon('LinkedIn', null)}
                        <span className="ml-2">LinkedIn</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="flex items-center px-2 py-2 text-sm text-foreground/80 hover:bg-secondary/50 rounded-sm cursor-pointer outline-none focus:bg-secondary/50 transition-colors"
                        onClick={handleShare('Instagram')}
                    >
                        {renderIcon('Instagram', null)}
                        <span className="ml-2">Instagram</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-border my-1" />

                    <DropdownMenu.Item
                        className="flex items-center px-2 py-2 text-sm text-foreground/80 hover:bg-secondary/50 rounded-sm cursor-pointer outline-none focus:bg-secondary/50 transition-colors"
                        onClick={handleCopy}
                    >
                        {renderIcon('Copy Link', null)}
                        <span className="ml-2">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default ShareButton
