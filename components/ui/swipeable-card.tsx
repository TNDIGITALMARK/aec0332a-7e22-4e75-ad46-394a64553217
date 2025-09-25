'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SwipeableCardProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onTapHold?: () => void
}

export function SwipeableCard({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onTapHold
}: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isHolding, setIsHolding] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const holdTimeoutRef = useRef<NodeJS.Timeout>()
  const tapStartTime = useRef<number>(0)

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX)
    setStartY(clientY)
    setCurrentX(0)
    setIsDragging(true)
    tapStartTime.current = Date.now()

    // Start hold detection
    holdTimeoutRef.current = setTimeout(() => {
      setIsHolding(true)
      onTapHold?.()
      // Add haptic feedback if available
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100)
      }
    }, 800)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return

    const deltaX = clientX - startX
    const deltaY = clientY - startY

    // If vertical movement is significant, don't treat as swipe
    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      return
    }

    setCurrentX(deltaX)

    // Clear hold timeout if moving
    if (holdTimeoutRef.current && Math.abs(deltaX) > 10) {
      clearTimeout(holdTimeoutRef.current)
    }
  }

  const handleEnd = () => {
    if (!isDragging) return

    const swipeThreshold = 100
    const tapDuration = Date.now() - tapStartTime.current

    // Clear hold timeout
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current)
    }

    // Handle swipe
    if (Math.abs(currentX) > swipeThreshold && tapDuration > 100) {
      if (currentX > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    }

    setIsDragging(false)
    setCurrentX(0)
    setIsHolding(false)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY)
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd()
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current)
      }
    }
  }, [])

  const transform = isDragging ? `translateX(${currentX}px) rotate(${currentX * 0.1}deg)` : ''
  const opacity = isDragging ? Math.max(0.7, 1 - Math.abs(currentX) / 300) : 1

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-200 ease-out cursor-grab active:cursor-grabbing select-none',
        {
          'scale-105 shadow-2xl': isHolding,
          'shadow-lg': !isHolding
        },
        className
      )}
      style={{
        transform,
        opacity
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}

      {/* Swipe indicators */}
      {isDragging && Math.abs(currentX) > 50 && (
        <>
          <div
            className={cn(
              'absolute top-1/2 left-4 transform -translate-y-1/2 text-4xl transition-opacity',
              currentX > 0 ? 'opacity-100' : 'opacity-0'
            )}
          >
            ➡️
          </div>
          <div
            className={cn(
              'absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl transition-opacity',
              currentX < 0 ? 'opacity-100' : 'opacity-0'
            )}
          >
            ⬅️
          </div>
        </>
      )}

      {/* Hold indicator */}
      {isHolding && (
        <div className="absolute inset-0 border-4 border-russian-gold rounded-lg animate-pulse" />
      )}
    </div>
  )
}