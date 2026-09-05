'use client'

import React from 'react'
import Link from 'next/link'
import '../globals.css'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#F2EBD0] text-[#4a4b34] font-sans antialiased flex flex-col justify-between">
                {/* Header Fallback */}
                <header className="w-full border-b border-[#4a4b34]/10 px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="font-display text-2xl tracking-widest font-bold text-[#4a4b34]">
                        AKANKSHA RAJPATI
                    </Link>
                    <nav className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
                        <Link href="/" className="hover:text-[#B88078] transition-colors">Home</Link>
                        <Link href="/blog" className="hover:text-[#B88078] transition-colors">Blog</Link>
                        <Link href="/shop" className="hover:text-[#B88078] transition-colors">Shop</Link>
                        <Link href="/watch" className="hover:text-[#B88078] transition-colors">Watch</Link>
                    </nav>
                </header>

                {/* Content */}
                <main className="flex-1 flex items-center justify-center px-6 py-20">
                    <div className="max-w-xl mx-auto text-center">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#868753] mb-4 block">System Notice</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                            Something Went Wrong
                        </h1>
                        <p className="text-sm md:text-base opacity-75 mb-8 leading-relaxed">
                            A critical issue occurred while loading the application. Please try reloading or visit our home journal.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => reset()}
                                className="bg-[#4a4b34] text-[#F2EBD0] px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Try Again
                            </button>
                            <a
                                href="/"
                                className="border border-[#4a4b34] text-[#4a4b34] px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#4a4b34]/5 transition-colors"
                            >
                                Return Home
                            </a>
                        </div>
                    </div>
                </main>

                {/* Footer Fallback */}
                <footer className="w-full border-t border-[#4a4b34]/10 px-6 py-6 text-center text-xs opacity-60 tracking-wider">
                    © {new Date().getFullYear()} Akanksha Rajpati. All rights reserved.
                </footer>
            </body>
        </html>
    )
}
