'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Icon } from '@/components/ui/Icon'

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    if (!isOpen) return null

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true)
            setErrorMessage(null)

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to initiate checkout')
            }

            if (data.url) {
                window.location.href = data.url
            }
        } catch (err: any) {
            console.error('Checkout failed:', err)
            setErrorMessage(err.message || 'Something went wrong during checkout. Please try again.')
            setIsCheckingOut(false)
        }
    }

    const freeShippingThreshold = 150
    const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))
    const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-background border-l border-border/40 shadow-2xl flex flex-col justify-between">
                    {/* Header */}
                    <div className="p-6 border-b border-border/40 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-xl font-display uppercase tracking-wider font-semibold">Your Bag</h2>
                            <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                                {totalItems} {totalItems === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-foreground/60 hover:text-foreground p-1 transition-colors rounded-full hover:bg-foreground/5"
                            aria-label="Close bag"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Free shipping banner */}
                    <div className="px-6 py-3 bg-muted/30 border-b border-border/20 text-xs">
                        {amountToFreeShipping === 0 ? (
                            <p className="text-green-600 dark:text-green-400 font-medium text-center">
                                ✨ You unlocked complimentary shipping!
                            </p>
                        ) : (
                            <div>
                                <p className="text-foreground/70 text-center mb-1.5">
                                    Add <span className="font-semibold text-foreground">${amountToFreeShipping.toFixed(2)}</span> more to unlock complimentary delivery
                                </p>
                                <div className="w-full bg-border/40 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full transition-all duration-300"
                                        style={{ width: `${progressToFreeShipping}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Items list */}
                    <div className="flex-1 overflow-y-auto p-6 divide-y divide-border/30">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-foreground/60 py-12">
                                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4 text-foreground/40">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-lg mb-2">Your bag is empty</p>
                                <p className="text-sm text-foreground/50 max-w-xs mb-6">
                                    Discover our curated objects of art and design pieces.
                                </p>
                                <Link
                                    href="/shop"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-gold text-xs px-6 py-2.5 uppercase tracking-widest inline-flex items-center justify-center"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.productId} className="py-4 flex gap-4">
                                    <div className="relative w-20 h-24 bg-muted/40 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="text-sm font-medium text-foreground line-clamp-1">
                                                    {item.title}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.productId)}
                                                    className="text-foreground/40 hover:text-destructive text-xs transition-colors"
                                                    title="Remove item"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-xs text-foreground/60 mt-1">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-border/60 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="px-2.5 py-0.5 text-xs text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    className="px-2.5 py-0.5 text-xs text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-sm font-semibold text-foreground">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-border/40 bg-background/50 backdrop-blur-md">
                            {errorMessage && (
                                <div className="mb-4 p-3 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="text-foreground/60">Subtotal</span>
                                <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-xs text-foreground/50">
                                <span>Shipping & taxes</span>
                                <span>{subtotal >= 150 ? 'Free' : 'Calculated at checkout'}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full btn-gold py-3.5 uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                            >
                                {isCheckingOut ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Preparing Checkout...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Checkout
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

