import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { fetchNotFoundPage } from '@/lib/cms'
import { Font } from '@/payload-types'

export default async function NotFound() {
    const pageData = await fetchNotFoundPage()

    const getFontFamily = (font: Font | string | null | undefined): string | undefined => {
        if (!font || typeof font === 'string') return undefined
        return font.filename || undefined
    }

    const sectionLabel = pageData?.sectionLabel || '404 Error'
    const headingNormal = pageData?.headingNormal || 'Page'
    const headingAccent = pageData?.headingAccent || 'Not Found'
    const description = pageData?.description || 'The story, object, or page you are looking for has either been moved, renamed, or is taking a quiet pause.'

    // Parse Action Buttons (CRUD array or fallback to legacy/default)
    const rawButtons = (pageData as any)?.actionButtons
    const hasButtonsArray = Array.isArray(rawButtons) && rawButtons.length > 0

    const actionButtons = hasButtonsArray
        ? rawButtons
        : [
            {
                label: (pageData as any)?.primaryButtonText || 'Return Home',
                link: (pageData as any)?.primaryButtonLink || '/',
                icon: (pageData as any)?.primaryButtonIcon || 'home',
                variant: 'primary',
                newTab: false,
            },
            {
                label: (pageData as any)?.secondaryButtonText || 'Explore Stories',
                link: (pageData as any)?.secondaryButtonLink || '/blog',
                icon: (pageData as any)?.secondaryButtonIcon || 'menu_book',
                variant: 'outline',
                newTab: false,
            },
        ].filter(btn => Boolean(btn.label && btn.link))

    const getButtonClass = (variant?: string) => {
        switch (variant) {
            case 'secondary':
                return 'btn-secondary'
            case 'outline':
                return 'btn-outline'
            case 'gold':
                return 'btn-gold'
            case 'primary':
            default:
                return 'btn-primary'
        }
    }

    return (
        <div 
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 text-center transition-colors duration-300"
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
                    {actionButtons.map((btn: any, index: number) => {
                        const customStyles: React.CSSProperties = {}
                        if (btn.customBgColor) customStyles.backgroundColor = btn.customBgColor
                        if (btn.customTextColor) customStyles.color = btn.customTextColor
                        if (btn.customBgColor) customStyles.borderColor = btn.customBgColor

                        return (
                            <Link
                                key={index}
                                href={btn.link || '/'}
                                target={btn.newTab ? '_blank' : undefined}
                                rel={btn.newTab ? 'noopener noreferrer' : undefined}
                                className={`${getButtonClass(btn.variant)} flex items-center gap-2`}
                                style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
                            >
                                {btn.icon && <Icon name={btn.icon} size={18} />}
                                <span>{btn.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

