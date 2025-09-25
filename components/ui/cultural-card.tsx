'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CulturalCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'folk' | 'modern'
  backgroundImage?: string
  onClick?: () => void
}

export function CulturalCard({
  children,
  className,
  variant = 'default',
  backgroundImage,
  onClick
}: CulturalCardProps) {
  const baseStyles = 'relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'

  const variantStyles = {
    default: 'bg-white border-2 border-russian-gold/20 shadow-lg',
    folk: 'bg-gradient-to-br from-russian-red/10 to-russian-gold/5 border-2 border-russian-gold/30',
    modern: 'bg-gradient-to-br from-russian-green/5 to-russian-cream border border-russian-brown/20'
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-russian-red/20 via-transparent to-russian-gold/10" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}