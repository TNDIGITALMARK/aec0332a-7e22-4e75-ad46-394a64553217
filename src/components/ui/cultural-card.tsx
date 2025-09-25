"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CulturalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "folk" | "modern"
  backgroundImage?: string
  children: React.ReactNode
}

const CulturalCard = React.forwardRef<HTMLDivElement, CulturalCardProps>(
  ({ className, variant = "default", backgroundImage, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-russian-gold/20 shadow-sm transition-all duration-300",
          {
            "bg-white hover:shadow-md": variant === "default",
            "bg-gradient-to-br from-russian-cream to-white hover:shadow-lg relative overflow-hidden": variant === "folk",
            "bg-gradient-to-br from-white to-russian-cream hover:shadow-md border-russian-gold/30": variant === "modern",
          },
          className
        )}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        {...props}
      >
        {variant === "folk" && backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
        <div className={cn("relative", variant === "folk" && backgroundImage && "text-white")}>
          {children}
        </div>
      </div>
    )
  }
)
CulturalCard.displayName = "CulturalCard"

export { CulturalCard }