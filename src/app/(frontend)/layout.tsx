import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Plus_Jakarta_Sans, Playfair_Display, Libre_Baskerville } from 'next/font/google'
import { cn } from '@/lib/utils'
import '../globals.css'

export const metadata = {
    title: 'Autumn Stories',
    description: 'A luxury lifestyle journal',
    icons: {
        icon: '/favicon.ico',
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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

import { fetchHeader, fetchFonts } from "@/lib/cms";
import { Media } from "@/payload-types";

export default async function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headerData = await fetchHeader();
    const fonts = await fetchFonts();

    // Generate @font-face CSS for all uploaded fonts
    const fontFaces = fonts.map(font => {
        const fontUrl = font.url;
        if (!fontUrl) return '';

        return `
            @font-face {
                font-family: '${font.name}';
                src: url('${fontUrl}') format('woff2'); /* Assuming WOFF2/TTF/OTF uploaded */
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }
        `;
    }).join('\n');

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <style dangerouslySetInnerHTML={{
                    __html: fontFaces
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
                <Header data={headerData} />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
