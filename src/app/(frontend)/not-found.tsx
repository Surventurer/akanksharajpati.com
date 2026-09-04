import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { fetchNotFoundPage } from '@/lib/cms'
import { Font } from '@/payload-types'

export default async function NotFound() {
    const pageData = await fetchNotFoundPage()

    const getFontFamily = (font: Font | string | null | undefined): string | undefined => {
        if (!font || typeof font === 'string') return undefined
        return font.filename?.replace(/\.[^/.]+$/, '')
    }

    const sectionLabel = pageData?.sectionLabel || '404 Error'
    const headingNormal = pageData?.headingNormal || 'Page'
    const headingAccent = pageData?.headingAccent || 'Not Found'
    const description = pageData?.description || 'The story, object, or page you are looking for has either been moved, renamed, or is taking a quiet pause.'

    const primaryBtnText = pageData?.primaryButtonText || 'Return Home'
    const primaryBtnLink = pageData?.primaryButtonLink || '/'
    const primaryBtnIcon = pageData?.primaryButtonIcon || 'home'

    const secondaryBtnText = pageData?.secondaryButtonText || 'Explore Stories'
    const secondaryBtnLink = pageData?.secondaryButtonLink || '/blog'
    const secondaryBtnIcon = pageData?.secondaryButtonIcon || 'menu_book'

    const tertiaryBtnText = pageData?.tertiaryButtonText || 'Visit Shop'
    const tertiaryBtnLink = pageData?.tertiaryButtonLink || '/shop'
    const tertiaryBtnIcon = pageData?.tertiaryButtonIcon || 'shopping_bag'

    return (
        <div 
            className="pt-32 pb-24 min-h-[75vh] flex items-center justify-center px-6 transition-colors duration-300"
            style={{
                backgroundColor: pageData?.backgroundColor || undefined,
            }}
        >
            <div className="max-w-2xl mx-auto text-center">
                <span 
                    className="section-label mb-4 block"
                    style={{
                        color: pageData?.sectionLabelColor || undefined,
                        fontFamily: getFontFamily(pageData?.sectionLabelFont as Font),
                    }}
                >
                    {sectionLabel}
                </span>

                <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 tracking-tight">
                    <span
                        style={{
                            color: pageData?.headingNormalColor || undefined,
                            fontFamily: getFontFamily(pageData?.headingNormalFont as Font),
                        }}
                    >
                        {headingNormal}
                    </span>{' '}
                    <span 
                        className="text-serif-accent"
                        style={{
                            color: pageData?.headingAccentColor || undefined,
                            fontFamily: getFontFamily(pageData?.headingAccentFont as Font),
                        }}
                    >
                        {headingAccent}
                    </span>
                </h1>

                <p 
                    className="body-editorial text-lg mb-10 max-w-lg mx-auto leading-relaxed"
                    style={{
                        color: pageData?.descriptionColor || undefined,
                        fontFamily: getFontFamily(pageData?.descriptionFont as Font),
                    }}
                >
                    {description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    {primaryBtnText && (
                        <Link
                            href={primaryBtnLink}
                            className="btn-primary flex items-center gap-2"
                        >
                            {primaryBtnIcon && <Icon name={primaryBtnIcon} size={18} />}
                            {primaryBtnText}
                        </Link>
                    )}

                    {secondaryBtnText && (
                        <Link
                            href={secondaryBtnLink}
                            className="btn-outline flex items-center gap-2"
                        >
                            {secondaryBtnIcon && <Icon name={secondaryBtnIcon} size={18} />}
                            {secondaryBtnText}
                        </Link>
                    )}

                    {tertiaryBtnText && (
                        <Link
                            href={tertiaryBtnLink}
                            className="btn-outline flex items-center gap-2"
                        >
                            {tertiaryBtnIcon && <Icon name={tertiaryBtnIcon} size={18} />}
                            {tertiaryBtnText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

