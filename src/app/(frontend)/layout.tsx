import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Plus_Jakarta_Sans, Playfair_Display, Libre_Baskerville } from 'next/font/google'
import { cn, hexToHsl } from '@/lib/utils'
import { fetchHeader, fetchFonts, fetchSiteSettings } from '@/lib/cms'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/shop/CartDrawer'
import '../globals.css'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export async function generateMetadata() {
    const siteSettings = await fetchSiteSettings()
    const title = siteSettings?.siteTitle || 'Akanksha Rajpati'
    const description = siteSettings?.siteDescription || 'Bespoke insights from my mind to yours — guiding you toward a more personalized way of living'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akanksharajpati.vercel.app'

    const ogImageUrl = siteSettings?.ogImage && typeof siteSettings.ogImage === 'object' && siteSettings.ogImage.url
        ? siteSettings.ogImage.url
        : `${siteUrl}/asset/logo.png`

    const faviconUrl = (siteSettings?.favicon && typeof siteSettings.favicon === 'object' && siteSettings.favicon.url) || '/favicon.ico'

    return {
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description,
        metadataBase: new URL(siteUrl),
        icons: {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
        },
        openGraph: {
            type: 'website',
            siteName: title,
            title,
            description,
            url: siteUrl,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    }
}

const fontSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
})

const fontDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-display',
})

const fontSerif = Libre_Baskerville({
    subsets: ['latin'],
    variable: '--font-serif',
    style: ['normal', 'italic'],
})

export default async function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [headerData, fonts, siteSettings] = await Promise.all([
        fetchHeader(),
        fetchFonts(),
        fetchSiteSettings(),
    ])

    // Generate @font-face CSS for all uploaded fonts
    const fontFaces = fonts.map(font => {
        const fontUrl = font.url;
        if (!fontUrl) return '';

        return `
            @font-face {
                font-family: '${font.name}';
                src: url('${fontUrl}') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }
        `;
    }).join('\n');

    // Generate theme CSS variables from Payload SiteSettings
    const themeStyles = siteSettings ? `
        :root {
            ${siteSettings.primaryColor ? `--primary: ${hexToHsl(siteSettings.primaryColor)}; --color-primary: ${siteSettings.primaryColor};` : ''}
            ${siteSettings.secondaryColor ? `--secondary: ${hexToHsl(siteSettings.secondaryColor)}; --color-secondary: ${siteSettings.secondaryColor};` : ''}
            ${siteSettings.accentColor ? `--accent: ${hexToHsl(siteSettings.accentColor)}; --color-accent: ${siteSettings.accentColor};` : ''}
            ${siteSettings.backgroundColor ? `--background: ${hexToHsl(siteSettings.backgroundColor)}; --color-background: ${siteSettings.backgroundColor};` : ''}
            ${siteSettings.textColor ? `--foreground: ${hexToHsl(siteSettings.textColor)}; --color-foreground: ${siteSettings.textColor};` : ''}
            ${siteSettings.cardBackgroundColor ? `--card: ${hexToHsl(siteSettings.cardBackgroundColor)}; --color-card: ${siteSettings.cardBackgroundColor};` : ''}
            ${siteSettings.borderColor ? `--border: ${hexToHsl(siteSettings.borderColor)}; --color-border: ${siteSettings.borderColor};` : ''}
            ${siteSettings.mutedTextColor ? `--muted-foreground: ${hexToHsl(siteSettings.mutedTextColor)}; --color-muted-foreground: ${siteSettings.mutedTextColor};` : ''}
        }
    ` : ''

    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
            <head>
                <style dangerouslySetInnerHTML={{
                    __html: `${fontFaces}\n${themeStyles}`
                }} />
            </head>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased overflow-x-hidden',
                    fontSans.variable,
                    fontDisplay.variable,
                    fontSerif.variable
                )}
            >
                <CartProvider>
                    <Header data={headerData} />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    )
}
