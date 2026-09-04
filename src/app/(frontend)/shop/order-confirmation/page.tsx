import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Order Confirmed | Akanksha Rajpati',
    description: 'Thank you for your order.',
}

interface OrderConfirmationProps {
    searchParams: Promise<{
        orderNumber?: string
        demo?: string
        session_id?: string
    }>
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationProps) {
    const params = await searchParams
    const orderNumber = params.orderNumber || 'ORD-RECENT'
    const isDemo = params.demo === 'true'

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <span className="section-label mb-3 block text-xs uppercase tracking-widest text-primary font-bold">
                    Order Confirmed
                </span>

                <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
                    Thank You For Your Order
                </h1>

                <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                    We have received your purchase and are preparing it with utmost care. A confirmation notice with tracking details will be delivered to your inbox.
                </p>

                {isDemo && (
                    <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm max-w-md mx-auto">
                        <p className="font-semibold mb-1">Development Demo Mode</p>
                        <p className="text-xs opacity-90">
                            Stripe test checkout was simulated. The order record has been successfully written to the Payload CMS database under <strong>Orders</strong>.
                        </p>
                    </div>
                )}

                <div className="bg-card border border-border/40 rounded-2xl p-6 mb-10 max-w-md mx-auto text-left shadow-sm">
                    <div className="flex justify-between py-2 border-b border-border/30 text-sm">
                        <span className="text-foreground/60">Order Reference</span>
                        <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30 text-sm">
                        <span className="text-foreground/60">Payment Status</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">Confirmed / Paid</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm">
                        <span className="text-foreground/60">Estimated Delivery</span>
                        <span className="text-foreground font-medium">3-5 Business Days</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/shop"
                        className="btn-gold px-8 py-3.5 text-xs uppercase tracking-widest font-bold"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/blog"
                        className="btn-outline px-8 py-3.5 text-xs uppercase tracking-widest font-bold"
                    >
                        Explore Stories & Journal
                    </Link>
                </div>
            </div>
        </div>
    )
}

