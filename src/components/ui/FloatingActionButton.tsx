'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Icon, IconName } from '@/components/ui/Icon'
import { SiteSetting, Media } from '@/payload-types'
import { useCart } from '@/context/CartContext'

interface FloatingActionButtonProps {
  settings?: SiteSetting | null
}

type Corner = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

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
  const defaultPosition = (settings?.floatingButtonPosition as Corner) || 'bottom-right'

  const [activeCorner, setActiveCorner] = useState<Corner>(defaultPosition)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const dragRef = useRef<{
    startX: number
    startY: number
    hasMoved: boolean
  }>({ startX: 0, startY: 0, hasMoved: false })

  const buttonRef = useRef<HTMLDivElement>(null)

  // Sync default position if settings change
  useEffect(() => {
    setActiveCorner(defaultPosition)
  }, [defaultPosition])

  // Mouse / Touch handlers for dragging
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
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

      // Only mark as moved and capture pointer once actual drag movement occurs (>6px)
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
        setDragOffset({ x: dx, y: dy })
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

      if (dragRef.current.hasMoved && buttonRef.current) {
        // Calculate the center of the button on screen to determine closest corner
        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800

        const isLeft = centerX < screenWidth / 2
        const isTop = centerY < screenHeight / 2

        let targetCorner: Corner
        if (isTop && isLeft) targetCorner = 'top-left'
        else if (isTop && !isLeft) targetCorner = 'top-right'
        else if (!isTop && isLeft) targetCorner = 'bottom-left'
        else targetCorner = 'bottom-right'

        setActiveCorner(targetCorner)
        setDragOffset({ x: 0, y: 0 })
      } else {
        // If user tapped without dragging, reset drag offset and open cart
        setDragOffset({ x: 0, y: 0 })
        if (!dragRef.current.hasMoved) {
          setIsOpen(true)
        }
      }
    },
    [isDragging, isDraggable, setIsOpen]
  )

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragRef.current.hasMoved) {
      setIsOpen(true)
    }
  }

  if (!isEnabled) return null

  const isLeftCorner = activeCorner === 'bottom-left' || activeCorner === 'top-left'
  const isTopCorner = activeCorner === 'top-left' || activeCorner === 'top-right'
  const displayTooltip = totalItems > 0 ? `Shopping Bag (${totalItems})` : label

  // Dynamic corner positioning with safe-area insets to never cut off on mobile during scroll
  const cornerStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
    touchAction: 'none',
    userSelect: 'none',
    cursor: isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
    transform: isDragging
      ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`
      : 'translate3d(0, 0, 0)',
    transition: isDragging
      ? 'none'
      : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1), left 0.4s cubic-bezier(0.16, 1, 0.3, 1), right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    top: isTopCorner ? 'calc(env(safe-area-inset-top, 0px) + 5.5rem)' : undefined,
    bottom: !isTopCorner ? 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' : undefined,
    left: isLeftCorner ? 'calc(env(safe-area-inset-left, 0px) + 1.25rem)' : undefined,
    right: !isLeftCorner ? 'calc(env(safe-area-inset-right, 0px) + 1.25rem)' : undefined,
  }

  return (
    <div
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={cornerStyles}
      className={`will-change-transform ${
        hideOnMobile ? 'hidden md:block' : 'block'
      }`}
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

        {/* Floating Tooltip / Label - positioned intelligently based on active corner */}
        <span
          className={`absolute ${
            isLeftCorner ? 'left-full ml-3.5' : 'right-full mr-3.5'
          } px-3.5 py-1.5 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tracking-widest uppercase rounded-lg shadow-xl font-medium border`}
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
