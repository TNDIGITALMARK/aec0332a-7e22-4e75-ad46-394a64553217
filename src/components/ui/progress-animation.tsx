"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  variant?: "default" | "traditional" | "modern"
  showPercentage?: boolean
}

const ProgressAnimation = React.forwardRef<HTMLDivElement, ProgressAnimationProps>(
  ({ className, progress, variant = "default", showPercentage = true, ...props }, ref) => {
    const [animatedProgress, setAnimatedProgress] = React.useState(0)

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress)
      }, 100)

      return () => clearTimeout(timer)
    }, [progress])

    const getProgressBarClasses = () => {
      switch (variant) {
        case "traditional":
          return "bg-gradient-to-r from-russian-red via-russian-gold to-russian-green"
        case "modern":
          return "bg-gradient-to-r from-russian-brown to-russian-gold"
        default:
          return "bg-gradient-to-r from-russian-red to-russian-gold"
      }
    }

    const getBackgroundClasses = () => {
      switch (variant) {
        case "traditional":
          return "bg-russian-cream border-2 border-russian-gold/30"
        case "modern":
          return "bg-gradient-to-r from-gray-100 to-gray-200"
        default:
          return "bg-russian-cream"
      }
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showPercentage && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-russian-brown">Прогресс</span>
            <span className="text-sm font-bold text-russian-red">{Math.round(animatedProgress)}%</span>
          </div>
        )}

        <div className={cn(
          "w-full h-3 rounded-full overflow-hidden relative",
          getBackgroundClasses()
        )}>
          {/* Progress bar */}
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-out rounded-full",
              getProgressBarClasses()
            )}
            style={{ width: `${Math.max(0, Math.min(100, animatedProgress))}%` }}
          >
            {/* Shimmer effect for traditional variant */}
            {variant === "traditional" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            )}
          </div>

          {/* Decorative elements for traditional variant */}
          {variant === "traditional" && (
            <>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full" />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full" />
            </>
          )}
        </div>

        {/* Progress milestones for traditional variant */}
        {variant === "traditional" && (
          <div className="flex justify-between mt-1 text-xs text-russian-brown/60">
            <span>Начало</span>
            <span>Мастерство</span>
          </div>
        )}
      </div>
    )
  }
)
ProgressAnimation.displayName = "ProgressAnimation"

export { ProgressAnimation }