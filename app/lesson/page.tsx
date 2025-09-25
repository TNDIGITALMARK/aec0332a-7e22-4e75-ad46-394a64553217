'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CulturalCard } from '@/components/ui/cultural-card'
import { culturalLessons, culturalRegions } from '@/lib/cultural-data'

export default function LessonPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const regionId = searchParams.get('region')
  const lessonId = searchParams.get('lesson')

  const [selectedLesson, setSelectedLesson] = useState<string | null>(lessonId)
  const [showContext, setShowContext] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const region = culturalRegions.find(r => r.id === regionId)
  const lessons = culturalLessons.filter(l => l.region === regionId || !regionId)
  const currentLesson = lessons.find(l => l.id === selectedLesson) || lessons[0]

  useEffect(() => {
    if (!selectedLesson && lessons.length > 0) {
      setSelectedLesson(lessons[0].id)
    }
  }, [lessons, selectedLesson])

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLesson(lessonId)
    setProgress(0)
  }

  const handleContextToggle = (vocab: string) => {
    setShowContext(showContext === vocab ? null : vocab)
  }

  const startLearning = () => {
    if (currentLesson) {
      setProgress(25)
    }
  }

  const continueLesson = () => {
    setProgress(Math.min(progress + 25, 100))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-russian-cream via-white to-russian-gold/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-russian-gold/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-russian-red to-russian-gold flex items-center justify-center">
                <span className="text-white text-lg font-bold font-playfair">К</span>
              </div>
              <h1 className="text-2xl font-playfair font-bold text-russian-brown">
                Культура
              </h1>
            </button>
            <div className="text-right">
              <p className="text-sm text-russian-brown/70">
                {region ? region.name : 'Все уроки'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedLesson ? (
          /* Lesson Selection */
          <div>
            <h2 className="text-3xl font-playfair font-bold text-russian-brown mb-8">
              Выберите урок
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <CulturalCard
                  key={lesson.id}
                  variant="folk"
                  onClick={() => handleLessonSelect(lesson.id)}
                  className="h-48"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-russian-gold text-white rounded-full">
                        {lesson.type}
                      </span>
                      <span className="text-xs text-russian-brown/60">
                        {lesson.duration} мин
                      </span>
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-russian-brown mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-russian-brown/80 text-sm flex-1">
                      {lesson.description}
                    </p>
                    <div className="mt-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                </CulturalCard>
              ))}
            </div>
          </div>
        ) : (
          /* Lesson Content */
          currentLesson && (
            <div className="max-w-4xl mx-auto">
              {/* Lesson Header */}
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
                    {currentLesson.title}
                  </h2>
                  <p className="text-lg text-russian-brown/80 mb-6">
                    {currentLesson.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-russian-brown/70 mb-2">
                      <span>Прогресс урока</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-russian-cream rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-russian-red to-russian-gold h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      currentLesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      currentLesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentLesson.difficulty}
                    </span>
                    <span className="text-xs px-3 py-1 bg-russian-gold text-white rounded-full">
                      {currentLesson.duration} минут
                    </span>
                  </div>
                </div>
              </div>

              {progress === 0 && (
                /* Lesson Introduction */
                <CulturalCard variant="default" className="mb-8">
                  <div className="p-8">
                    <h3 className="text-xl font-playfair font-bold text-russian-brown mb-4">
                      Культурный контекст
                    </h3>
                    <p className="text-russian-brown/80 leading-relaxed mb-6">
                      {currentLesson.culturalContext}
                    </p>
                    <button
                      onClick={startLearning}
                      className="bg-gradient-to-r from-russian-red to-russian-red-light text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Начать изучение
                    </button>
                  </div>
                </CulturalCard>
              )}

              {progress > 0 && (
                <>
                  {/* Vocabulary Section */}
                  <CulturalCard variant="folk" className="mb-8">
                    <div className="p-8">
                      <h3 className="text-xl font-playfair font-bold text-russian-brown mb-6">
                        Ключевые слова
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentLesson.vocabulary.map((word, index) => (
                          <div
                            key={index}
                            className="bg-white/80 rounded-lg p-4 border border-russian-gold/20 cursor-pointer hover:bg-russian-gold/5 transition-all duration-300"
                            onClick={() => handleContextToggle(word)}
                            onTouchStart={() => handleContextToggle(word)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-russian-brown">{word}</span>
                              <span className="text-russian-gold">🔄</span>
                            </div>
                            {showContext === word && (
                              <div className="mt-3 p-3 bg-russian-cream rounded-lg">
                                <p className="text-sm text-russian-brown/80">
                                  Tap and hold for pronunciation and cultural context
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CulturalCard>

                  {/* Interactive Elements */}
                  <CulturalCard variant="modern" className="mb-8">
                    <div className="p-8">
                      <h3 className="text-xl font-playfair font-bold text-russian-brown mb-6">
                        Интерактивные элементы
                      </h3>
                      <div className="space-y-4">
                        {currentLesson.interactiveElements.map((element, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-russian-green/10 to-russian-gold/10 rounded-lg p-4 border border-russian-green/20"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-russian-green rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🎮</span>
                              </div>
                              <span className="text-russian-brown font-medium">{element}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CulturalCard>

                  {/* Continue Button */}
                  <div className="text-center">
                    {progress < 100 ? (
                      <button
                        onClick={continueLesson}
                        className="bg-gradient-to-r from-russian-gold to-russian-gold-light text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Продолжить урок
                      </button>
                    ) : (
                      <div className="space-x-4">
                        <button
                          onClick={() => router.push('/practice')}
                          className="bg-gradient-to-r from-russian-green to-russian-green-light text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Практика
                        </button>
                        <button
                          onClick={() => router.push('/dashboard')}
                          className="bg-gradient-to-r from-russian-brown to-russian-red-dark text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          К дашборду
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}