'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CulturalCard } from '@/components/ui/cultural-card'
import { userProgress } from '@/lib/cultural-data'

interface PracticeActivity {
  id: string
  title: string
  type: 'vocabulary' | 'cultural-quiz' | 'listening' | 'speaking'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  icon: string
  completedToday: boolean
}

const practiceActivities: PracticeActivity[] = [
  {
    id: 'vocab-tea',
    title: 'Чайная лексика',
    type: 'vocabulary',
    difficulty: 'beginner',
    description: 'Practice tea culture vocabulary with flashcards',
    icon: '🍵',
    completedToday: true
  },
  {
    id: 'festival-quiz',
    title: 'Русские праздники',
    type: 'cultural-quiz',
    difficulty: 'intermediate',
    description: 'Test your knowledge of Russian festivals',
    icon: '🎭',
    completedToday: false
  },
  {
    id: 'folk-listening',
    title: 'Народные песни',
    type: 'listening',
    difficulty: 'intermediate',
    description: 'Listen and identify traditional Russian folk songs',
    icon: '🎵',
    completedToday: false
  },
  {
    id: 'pronunciation',
    title: 'Произношение',
    type: 'speaking',
    difficulty: 'advanced',
    description: 'Practice pronunciation of cultural terms',
    icon: '🗣️',
    completedToday: true
  }
]

export default function PracticePage() {
  const router = useRouter()
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)

  const quizQuestions = [
    {
      question: 'Когда празднуется Масленица?',
      options: ['Зимой', 'Весной', 'Летом', 'Осенью'],
      correct: 1,
      explanation: 'Масленица празднуется весной, за неделю до Великого поста'
    },
    {
      question: 'Что такое самовар?',
      options: ['Музыкальный инструмент', 'Устройство для чая', 'Предмет одежды', 'Игрушка'],
      correct: 1,
      explanation: 'Самовар - традиционное русское устройство для приготовления и подачи чая'
    },
    {
      question: 'Какой цвет традиционно используется в русском народном искусстве?',
      options: ['Синий', 'Красный', 'Зелёный', 'Жёлтый'],
      correct: 1,
      explanation: 'Красный цвет символизирует жизнь, любовь и красоту в русской культуре'
    }
  ]

  const handleActivityClick = (activityId: string) => {
    if (activityId === 'festival-quiz') {
      setSelectedActivity(activityId)
      setCurrentQuestion(0)
      setScore(0)
      setAnswers([])
      setShowResult(false)
    } else {
      setSelectedActivity(activityId)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setSelectedActivity(null)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setShowResult(false)
  }

  if (selectedActivity === 'festival-quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-russian-cream via-white to-russian-gold/10">
        <header className="bg-white/80 backdrop-blur-sm border-b border-russian-gold/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-russian-red to-russian-gold flex items-center justify-center">
                  <span className="text-white text-lg font-bold font-playfair">К</span>
                </div>
                <h1 className="text-2xl font-playfair font-bold text-russian-brown">
                  Квиз: Русские праздники
                </h1>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {!showResult ? (
            <CulturalCard variant="folk" className="mb-8">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-russian-brown/70">
                    Вопрос {currentQuestion + 1} из {quizQuestions.length}
                  </span>
                  <span className="text-sm text-russian-brown/70">
                    Счёт: {score}/{currentQuestion + (answers.length > currentQuestion ? 1 : 0)}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="w-full bg-russian-cream rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-russian-red to-russian-gold h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-playfair font-bold text-russian-brown mb-8">
                  {quizQuestions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answers.length > currentQuestion}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        answers.length > currentQuestion
                          ? index === quizQuestions[currentQuestion].correct
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-red-100 border-red-500 text-red-800 opacity-50'
                          : 'border-russian-gold/20 hover:border-russian-gold hover:bg-russian-gold/5'
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>

                {answers.length > currentQuestion && (
                  <div className="mt-6 p-4 bg-russian-cream rounded-lg">
                    <p className="text-sm text-russian-brown">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </div>
            </CulturalCard>
          ) : (
            <CulturalCard variant="modern" className="text-center">
              <div className="p-8">
                <div className="text-6xl mb-6">
                  {score === quizQuestions.length ? '🎉' : score >= quizQuestions.length / 2 ? '👏' : '📚'}
                </div>
                <h2 className="text-3xl font-playfair font-bold text-russian-brown mb-4">
                  Квиз завершён!
                </h2>
                <p className="text-xl text-russian-brown/80 mb-6">
                  Ваш результат: {score} из {quizQuestions.length}
                </p>
                <div className="space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-russian-gold to-russian-gold-light text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Попробовать снова
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-russian-brown to-russian-red-dark text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    К дашборду
                  </button>
                </div>
              </div>
            </CulturalCard>
          )}
        </div>
      </div>
    )
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
                Центр практики
              </h1>
            </button>
            <div className="text-right">
              <p className="text-sm text-russian-brown/70">Изучение через практику</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Daily Progress */}
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
              Ежедневная практика
            </h2>
            <p className="text-lg text-russian-brown/80 mb-6">
              Strengthen your cultural knowledge through interactive exercises
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-russian-red">
                  {practiceActivities.filter(a => a.completedToday).length}
                </div>
                <div className="text-sm text-russian-brown/70">Completed Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-russian-gold">{userProgress.currentStreak}</div>
                <div className="text-sm text-russian-brown/70">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Activities */}
        <div className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-russian-brown mb-6">
            Упражнения для практики
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceActivities.map((activity) => (
              <CulturalCard
                key={activity.id}
                variant={activity.completedToday ? 'modern' : 'folk'}
                onClick={() => handleActivityClick(activity.id)}
                className="h-48 relative"
              >
                {activity.completedToday && (
                  <div className="absolute top-4 right-4 bg-russian-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    ✓
                  </div>
                )}
                <div className="p-6 h-full flex flex-col">
                  <div className="text-4xl mb-4">{activity.icon}</div>
                  <h4 className="text-xl font-playfair font-bold text-russian-brown mb-2">
                    {activity.title}
                  </h4>
                  <p className="text-russian-brown/80 text-sm flex-1">
                    {activity.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      activity.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-xs text-russian-brown/60 capitalize">
                      {activity.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </CulturalCard>
            ))}
          </div>
        </div>

        {/* Cultural Games */}
        <div className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-russian-brown mb-6">
            Культурные игры
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CulturalCard variant="modern">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="font-playfair font-bold text-russian-brown mb-2">Memory Palace</h4>
                <p className="text-sm text-russian-brown/70">Match cultural items with their regions</p>
              </div>
            </CulturalCard>

            <CulturalCard variant="modern">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h4 className="font-playfair font-bold text-russian-brown mb-2">Cultural Charades</h4>
                <p className="text-sm text-russian-brown/70">Act out Russian traditions</p>
              </div>
            </CulturalCard>

            <CulturalCard variant="modern">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🔤</div>
                <h4 className="font-playfair font-bold text-russian-brown mb-2">Word Builder</h4>
                <p className="text-sm text-russian-brown/70">Build cultural vocabulary</p>
              </div>
            </CulturalCard>
          </div>
        </div>

        {/* Study Goals */}
        <CulturalCard variant="folk">
          <div className="p-8">
            <h3 className="text-2xl font-playfair font-bold text-russian-brown mb-6">
              Цели изучения
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-russian-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">📅</span>
                </div>
                <h4 className="font-semibold text-russian-brown mb-2">Daily</h4>
                <p className="text-sm text-russian-brown/70">Complete 2 practice exercises</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-russian-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <h4 className="font-semibold text-russian-brown mb-2">Weekly</h4>
                <p className="text-sm text-russian-brown/70">Maintain 7-day streak</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-russian-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h4 className="font-semibold text-russian-brown mb-2">Monthly</h4>
                <p className="text-sm text-russian-brown/70">Earn 3 cultural badges</p>
              </div>
            </div>
          </div>
        </CulturalCard>
      </div>
    </div>
  )
}