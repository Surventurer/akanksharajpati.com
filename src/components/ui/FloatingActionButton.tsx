'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Icon, IconName } from '@/components/ui/Icon'
import { SiteSetting, Media } from '@/payload-types'
import { useCart } from '@/context/CartContext'

interface FloatingActionButtonProps {
  settings?: SiteSetting | null
}

export default function FloatingActionButton({ settings }: FloatingActionButtonProps) {
  const { totalItems, setIsOpen } = useCart()
  // Check if enabled (default true)
  const isEnabled = settings?.floatingButtonEnabled !== false
  const isDraggable = settings?.floatingButtonDraggable !== false
  const hideOnMobile = settings?.floatingButtonHideOnMobile === true

  const label = settings?.floatingButtonLabel || 'Shopping Bag'
  // Default to shopping_bag icon
  const iconName = (settings?.floatingButtonIcon as IconName) || 'shopping_bag'
  const customIconUrl =
    settings?.floatingButtonIconUpload &&
    typeof settings.floatingButtonIconUpload !== 'string'
      ? (settings.floatingButtonIconUpload as Media).url
      : null

  const bgColor = settings?.floatingButtonBgColor
  const textColor = settings?.floatingButtonTextColor
  const borderColor = settings?.floatingButtonBorderColor
  const defaultPosition = settings?.floatingButtonPosition || 'bottom-right'

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{
    startX: number
    startY: number
    origX: number
    origY: number
    hasMoved: boolean
  }>({ startX: 0, startY: 0, origX: 0, origY: 0, hasMoved: false })

  const buttonRef = useRef<HTMLDivElement>(null)

  // Initialize position based on screen corners
  useEffect(() => {
    const updateDefaultPos = () => {
      if (typeof window === 'undefined') return
      const margin = 32
      const btnSize = 56

      let x = window.innerWidth - btnSize - margin
      let y = window.innerHeight - btnSize - margin

      if (defaultPosition === 'bottom-left') {
        x = margin
        y = window.innerHeight - btnSize - margin
      } else if (defaultPosition === 'top-right') {
        x = window.innerWidth - btnSize - margin
        y = margin + 80 // below header
      } else if (defaultPosition === 'top-left') {
        x = margin
        y = margin + 80
      }

      setPosition((prev) => prev ?? { x, y })
    }

    updateDefaultPos()
    window.addEventListener('resize', updateDefaultPos)
    return () => window.removeEventListener('resize', updateDefaultPos)
  }, [defaultPosition])

  // Mouse / Touch handlers for dragging
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: rect.left,
        origY: rect.top,
        hasMoved: false,
      }
      setIsDragging(true)
    },
    []
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !isDraggable) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY

      // Only mark as moved and capture pointer once actual drag movement occurs
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        dragRef.current.hasMoved = true
        try {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.setPointerCapture(e.pointerId)
          }
        } catch {
          // Ignore capture error
        }
      }

      if (dragRef.current.hasMoved) {
        const btnSize = 56
        const minX = 12
        const maxX = window.innerWidth - btnSize - 12
        const minY = 12
        const maxY = window.innerHeight - btnSize - 12

        const nextX = Math.min(Math.max(dragRef.current.origX + dx, minX), maxX)
        const nextY = Math.min(Math.max(dragRef.current.origY + dy, minY), maxY)

        setPosition({ x: nextX, y: nextY })
      }
    },
    [isDragging, isDraggable]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      setIsDragging(false)
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
      } catch {
        // Pointer capture release safety
      }

      // If user clicked/tapped without dragging, open cart!
      if (!dragRef.current.hasMoved) {
        setIsOpen(true)
      }
    },
    [isDragging, setIsOpen]
  )

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragRef.current.hasMoved) {
      setIsOpen(true)
    }
  }

  if (!isEnabled) return null

  const isPositioned = position !== null
  const displayTooltip = totalItems > 0 ? `Shopping Bag (${totalItems})` : label

  return (
    <div
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'fixed',
        left: isPositioned ? `${position.x}px` : undefined,
        top: isPositioned ? `${position.y}px` : undefined,
        bottom: !isPositioned ? '2rem' : undefined,
        right: !isPositioned ? '2rem' : undefined,
        zIndex: 50,
        touchAction: 'none',
        cursor: isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
        userSelect: 'none',
      }}
      className={`transition-opacity duration-300 ${
        hideOnMobile ? 'hidden md:block' : 'block'
      } ${!isPositioned ? 'opacity-0' : 'opacity-100'}`}
    >
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label={`Open shopping cart (${totalItems} items)`}
        className="relative group w-14 h-14 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-accent/20 select-none overflow-visible cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{
          backgroundColor: bgColor || 'var(--secondary, #868753)',
          color: textColor || 'var(--secondary-foreground, #FAF7EE)',
          borderColor: borderColor || 'rgba(196, 154, 72, 0.2)',
        }}
      >
        {settings?.floatingButtonIcon === 'custom' && customIconUrl ? (
          <div className="relative w-6 h-6">
            <Image
              src={customIconUrl}
              alt={label}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <Icon name={iconName === 'menu_book' ? 'shopping_bag' : iconName} size={24} />
        )}

        {/* Cart Count Badge */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center shadow-lg border border-background animate-scale-in">
            {totalItems}
          </span>
        )}

        {/* Floating Tooltip / Label */}
        <span
          className="absolute right-full mr-3.5 px-3.5 py-1.5 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tracking-widest uppercase rounded-lg shadow-xl font-medium border"
          style={{
            backgroundColor: bgColor || 'var(--secondary, #868753)',
            color: textColor || 'var(--secondary-foreground, #FAF7EE)',
            borderColor: borderColor || 'rgba(196, 154, 72, 0.3)',
          }}
        >
          {displayTooltip}
        </span>
      </button>
    </div>
  )
}
