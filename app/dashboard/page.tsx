'use client'

import { useState } from 'react'
import { CulturalCard } from '@/components/ui/cultural-card'
import { SwipeableCard } from '@/components/ui/swipeable-card'
import { ProgressAnimation } from '@/components/ui/progress-animation'
import { culturalRegions, userProgress } from '@/lib/cultural-data'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0)
  const [showRegionDetails, setShowRegionDetails] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
    router.push(`/lesson?region=${regionId}`)
  }

  const handleSwipeLeft = (regionIndex: number) => {
    if (regionIndex < culturalRegions.length - 1) {
      setCurrentRegionIndex(regionIndex + 1)
    }
  }

  const handleSwipeRight = (regionIndex: number) => {
    if (regionIndex > 0) {
      setCurrentRegionIndex(regionIndex - 1)
    }
  }

  const handleTapHold = (regionId: string) => {
    setShowRegionDetails(showRegionDetails === regionId ? null : regionId)
  }

  const progressPercentage = Math.round(
    (userProgress.totalLessonsCompleted / culturalRegions.reduce((sum, region) => sum + region.totalLessons, 0)) * 100
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-russian-cream via-white to-russian-gold/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-russian-gold/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-russian-red to-russian-gold flex items-center justify-center">
                <span className="text-white text-lg font-bold font-playfair">К</span>
              </div>
              <h1 className="text-2xl font-playfair font-bold text-russian-brown">
                Культура
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-russian-brown/70">Уровень</p>
              <p className="font-semibold text-russian-red">{userProgress.proficiencyLevel}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-russian-red/10 to-russian-gold/10 rounded-xl p-8 mb-8 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(/generated/russian-folk-patterns.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-playfair font-bold text-russian-brown mb-4">
                Откройте душу России
              </h2>
              <p className="text-lg text-russian-brown/80 max-w-2xl">
                Unlock the Soul of Russia through immersive cultural experiences.
                Discover traditions, taste authentic flavors, and connect with centuries of heritage.
              </p>
            </div>
          </div>

          {/* Progress Animation */}
          <ProgressAnimation
            progress={progressPercentage}
            variant="traditional"
            className="mb-8"
          />

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-russian-gold/20 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-russian-red mb-2">{userProgress.totalLessonsCompleted}</div>
                <div className="text-sm text-russian-brown/70">Lessons Completed</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-russian-gold/20 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-russian-gold mb-2">{userProgress.currentStreak}</div>
                <div className="text-sm text-russian-brown/70">Day Streak</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-russian-gold/20 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-russian-green mb-2">{progressPercentage}%</div>
                <div className="text-sm text-russian-brown/70">Overall Progress</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-russian-gold/20 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-russian-brown mb-2">{userProgress.culturalBadges.length}</div>
                <div className="text-sm text-russian-brown/70">Cultural Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Regions */}
        <div className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-russian-brown mb-6">
            Культурные регионы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalRegions.map((region, index) => (
              <SwipeableCard
                key={region.id}
                onSwipeLeft={() => handleSwipeLeft(index)}
                onSwipeRight={() => handleSwipeRight(index)}
                onTapHold={() => handleTapHold(region.id)}
                className="h-64"
              >
                <CulturalCard
                  variant="folk"
                  backgroundImage={region.image}
                  onClick={() => handleRegionClick(region.id)}
                  className="h-full"
                >
                  <div className="p-6 h-full flex flex-col justify-end">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="text-xl font-playfair font-bold text-russian-brown mb-2">
                        {region.name}
                      </h4>
                      <p className="text-russian-brown/80 text-sm mb-3">
                        {region.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-russian-brown/60">
                          {region.lessonsCompleted}/{region.totalLessons} lessons
                        </div>
                        <div className="w-16 h-2 bg-russian-cream rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-russian-red to-russian-gold rounded-full"
                            style={{ width: `${(region.lessonsCompleted / region.totalLessons) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Cultural context popup */}
                      {showRegionDetails === region.id && (
                        <div className="mt-3 p-3 bg-russian-gold/10 rounded-lg border border-russian-gold/30">
                          <p className="text-xs text-russian-brown/80 font-medium mb-1">
                            Культурная особенность:
                          </p>
                          <p className="text-xs text-russian-brown/70">
                            {region.culturalHighlight}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CulturalCard>
              </SwipeableCard>
            ))}
          </div>
        </div>

        {/* Cultural Badges */}
        <div className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-russian-brown mb-6">
            Культурные достижения
          </h3>
          <div className="flex flex-wrap gap-3">
            {userProgress.culturalBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-russian-gold to-russian-gold-light text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                🏆 {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CulturalCard variant="modern" onClick={() => router.push('/practice')}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-playfair font-bold text-russian-brown mb-2">Practice Hub</h4>
              <p className="text-sm text-russian-brown/70">Interactive exercises and cultural games</p>
            </div>
          </CulturalCard>

          <CulturalCard variant="modern" onClick={() => router.push('/lesson')}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="font-playfair font-bold text-russian-brown mb-2">Continue Learning</h4>
              <p className="text-sm text-russian-brown/70">Resume your cultural journey</p>
            </div>
          </CulturalCard>

          <CulturalCard variant="modern">
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="font-playfair font-bold text-russian-brown mb-2">Cultural Calendar</h4>
              <p className="text-sm text-russian-brown/70">Upcoming Russian holidays and festivals</p>
            </div>
          </CulturalCard>
        </div>
      </div>
    </div>
  )
}