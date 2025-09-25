"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwipeableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onTapHold?: () => void
  children: React.ReactNode
}

const SwipeableCard = React.forwardRef<HTMLDivElement, SwipeableCardProps>(
  ({ className, onSwipeLeft, onSwipeRight, onTapHold, children, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [startX, setStartX] = React.useState(0)
    const [currentX, setCurrentX] = React.useState(0)
    const [holdTimer, setHoldTimer] = React.useState<NodeJS.Timeout | null>(null)

    const handleStart = (clientX: number) => {
      setIsDragging(true)
      setStartX(clientX)
      setCurrentX(clientX)

      // Start hold timer
      const timer = setTimeout(() => {
        onTapHold?.()
      }, 500)
      setHoldTimer(timer)
    }

    const handleMove = (clientX: number) => {
      if (!isDragging) return
      setCurrentX(clientX)

      // Clear hold timer on movement
      if (holdTimer) {
        clearTimeout(holdTimer)
        setHoldTimer(null)
      }
    }

    const handleEnd = () => {
      if (!isDragging) return

      // Clear hold timer
      if (holdTimer) {
        clearTimeout(holdTimer)
        setHoldTimer(null)
      }

      const deltaX = currentX - startX
      const threshold = 100

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      }

      setIsDragging(false)
      setStartX(0)
      setCurrentX(0)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      handleStart(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      handleMove(e.clientX)
    }

    const handleMouseUp = () => {
      handleEnd()
    }

    const handleTouchStart = (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
      handleEnd()
    }

    React.useEffect(() => {
      if (isDragging) {
        const handleGlobalMouseMove = (e: MouseEvent) => {
          handleMove(e.clientX)
        }

        const handleGlobalMouseUp = () => {
          handleEnd()
        }

        document.addEventListener('mousemove', handleGlobalMouseMove)
        document.addEventListener('mouseup', handleGlobalMouseUp)

        return () => {
          document.removeEventListener('mousemove', handleGlobalMouseMove)
          document.removeEventListener('mouseup', handleGlobalMouseUp)
        }
      }
    }, [isDragging, currentX, startX])

    const translateX = isDragging ? currentX - startX : 0

    return (
      <div
        ref={ref}
        className={cn(
          "touch-pan-y select-none cursor-grab active:cursor-grabbing transition-transform duration-300",
          isDragging && "transition-none",
          className
        )}
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SwipeableCard.displayName = "SwipeableCard"

export { SwipeableCard }