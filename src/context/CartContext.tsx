'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
    productId: string
    slug: string
    title: string
    price: number
    image: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'akanksha_cart_v1'

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY)
            if (saved) {
                setItems(JSON.parse(saved))
            }
        } catch (e) {
            console.error('Failed to load cart from storage', e)
        } finally {
            setIsInitialized(true)
        }
    }, [])

    // Sync cart to localStorage on changes
    useEffect(() => {
        if (!isInitialized) return
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
        } catch (e) {
            console.error('Failed to save cart to storage', e)
        }
    }, [items, isInitialized])

    const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        const qty = newItem.quantity || 1
        setItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.productId === newItem.productId)
            if (existingIndex > -1) {
                const updated = [...prevItems]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + qty,
                }
                return updated
            }
            return [...prevItems, { ...newItem, quantity: qty }]
        })
        setIsOpen(true) // Automatically open cart drawer when adding item
    }

    const removeItem = (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.productId !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

