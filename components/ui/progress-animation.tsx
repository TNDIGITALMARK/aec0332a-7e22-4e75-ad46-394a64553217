'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressAnimationProps {
  progress: number
  variant?: 'traditional' | 'folk' | 'modern'
  showIcon?: boolean
  className?: string
}

export function ProgressAnimation({
  progress,
  variant = 'traditional',
  showIcon = true,
  className
}: ProgressAnimationProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [showStars, setShowStars] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)

    return () => clearTimeout(timer)
  }, [progress])

  useEffect(() => {
    if (progress === 100) {
      setShowStars(true)
      const timer = setTimeout(() => setShowStars(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const getProgressIcon = () => {
    if (progress === 0) return '🌱'
    if (progress < 25) return '🌿'
    if (progress < 50) return '🌾'
    if (progress < 75) return '🌻'
    if (progress < 100) return '🏰'
    return '👑'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'traditional':
        return {
          container: 'bg-gradient-to-r from-russian-red/10 to-russian-gold/10 border-2 border-russian-gold/30',
          progress: 'bg-gradient-to-r from-russian-red via-russian-gold to-russian-red-light',
          glow: 'shadow-[0_0_20px_rgba(220,38,38,0.3)]'
        }
      case 'folk':
        return {
          container: 'bg-gradient-to-r from-russian-green/10 to-russian-gold/10 border-2 border-russian-green/30',
          progress: 'bg-gradient-to-r from-russian-green via-russian-gold to-russian-green-light',
          glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        }
      case 'modern':
        return {
          container: 'bg-gradient-to-r from-russian-cream to-white border-2 border-russian-brown/20',
          progress: 'bg-gradient-to-r from-russian-brown via-russian-gold to-russian-brown',
          glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={cn('relative p-6 rounded-lg overflow-hidden', styles.container, className)}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(/generated/russian-folk-patterns.png)',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {showIcon && (
            <div className="flex items-center space-x-2">
              <span className="text-2xl animate-bounce">{getProgressIcon()}</span>
              <span className="font-playfair font-semibold text-russian-brown">
                Прогресс
              </span>
            </div>
          )}
          <span className="text-lg font-bold text-russian-brown">
            {Math.round(animatedProgress)}%
          </span>
        </div>

        {/* Progress bar container */}
        <div className="relative h-8 bg-russian-cream rounded-full overflow-hidden mb-4">
          {/* Animated progress fill */}
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden',
              styles.progress,
              animatedProgress > 50 ? styles.glow : ''
            )}
            style={{
              width: `${animatedProgress}%`
            }}
          >
            {/* Flowing animation */}
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  animation: 'flow 2s linear infinite'
                }}
              />
            </div>

            {/* Traditional Russian ornament on progress bar */}
            {animatedProgress > 10 && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="text-white text-sm opacity-80">⚜️</div>
              </div>
            )}
          </div>

          {/* Milestone markers */}
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className="absolute top-0 bottom-0 w-0.5 bg-russian-brown/20"
              style={{ left: `${milestone}%` }}
            >
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                <span className="text-xs text-russian-brown/60">{milestone}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress text */}
        <div className="text-center">
          <p className="text-sm text-russian-brown/70">
            {progress === 0 && 'Начало вашего культурного путешествия'}
            {progress > 0 && progress < 25 && 'Изучение основ русской культуры'}
            {progress >= 25 && progress < 50 && 'Погружение в традиции'}
            {progress >= 50 && progress < 75 && 'Понимание культурных нюансов'}
            {progress >= 75 && progress < 100 && 'Мастерство культурного знания'}
            {progress === 100 && 'Культурный эксперт! Поздравляем!'}
          </p>
        </div>

        {/* Celebration animation for 100% */}
        {showStars && progress === 100 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-ping"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${20 + ((i % 3) * 20)}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS for custom flow animation */}
      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}