export interface CulturalRegion {
  id: string
  name: string
  description: string
  image: string
  lessonsCompleted: number
  totalLessons: number
  culturalHighlight: string
}

export interface CulturalLesson {
  id: string
  title: string
  description: string
  region: string
  type: 'festival' | 'tradition' | 'food' | 'art' | 'history'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  vocabulary: string[]
  culturalContext: string
  interactiveElements: string[]
}

export const culturalRegions: CulturalRegion[] = [
  {
    id: 'moscow',
    name: 'Московский регион',
    description: 'Discover the heart of Russian culture in the capital region',
    image: '/generated/moscow-cultural-region.png',
    lessonsCompleted: 3,
    totalLessons: 8,
    culturalHighlight: 'Red Square and Kremlin traditions'
  },
  {
    id: 'golden-ring',
    name: 'Золотое кольцо',
    description: 'Ancient cities preserving centuries of Russian heritage',
    image: '/generated/russian-folk-patterns.png',
    lessonsCompleted: 2,
    totalLessons: 6,
    culturalHighlight: 'Traditional crafts and architecture'
  },
  {
    id: 'siberia',
    name: 'Сибирская глушь',
    description: 'Experience the vast wilderness and indigenous cultures',
    image: '/currentImgContext/ai-generated-preview.png',
    lessonsCompleted: 1,
    totalLessons: 5,
    culturalHighlight: 'Indigenous traditions and nature connection'
  },
  {
    id: 'st-petersburg',
    name: 'Санкт-Петербург',
    description: 'Imperial arts, literature, and cultural refinement',
    image: '/generated/russian-tea-culture.png',
    lessonsCompleted: 4,
    totalLessons: 7,
    culturalHighlight: 'Literary salons and artistic heritage'
  }
]

export const culturalLessons: CulturalLesson[] = [
  {
    id: 'maslenitsa',
    title: 'Масленица: The Pancake Festival',
    description: 'Learn about the joyous week-long celebration before Lent',
    region: 'moscow',
    type: 'festival',
    difficulty: 'intermediate',
    duration: 25,
    vocabulary: ['блины', 'масленица', 'прощание с зимой', 'чучело', 'костёр'],
    culturalContext: 'Maslenitsa is one of Russia\'s most beloved folk festivals, marking the end of winter with pancakes, games, and community celebrations.',
    interactiveElements: ['Virtual pancake making', 'Traditional games', 'Folk song listening']
  },
  {
    id: 'tea-culture',
    title: 'Русское чаепитие: Tea Culture',
    description: 'Explore the social ritual of Russian tea drinking',
    region: 'st-petersburg',
    type: 'tradition',
    difficulty: 'beginner',
    duration: 20,
    vocabulary: ['самовар', 'чай', 'варенье', 'сахар', 'беседа'],
    culturalContext: 'Russian tea culture represents hospitality, family bonding, and intellectual conversation, centered around the traditional samovar.',
    interactiveElements: ['Virtual samovar operation', 'Tea etiquette practice', 'Conversation scenarios']
  },
  {
    id: 'banya',
    title: 'Русская баня: Steam Bath Experience',
    description: 'Understand the cultural significance of Russian bathhouses',
    region: 'siberia',
    type: 'tradition',
    difficulty: 'intermediate',
    duration: 30,
    vocabulary: ['баня', 'веник', 'пар', 'здоровье', 'традиция'],
    culturalContext: 'The banya is more than just bathing - it\'s a social institution for health, purification, and community bonding across Russian society.',
    interactiveElements: ['Virtual banya tour', 'Health benefits quiz', 'Traditional rituals']
  }
]

export const userProgress = {
  totalLessonsCompleted: 10,
  currentStreak: 7,
  favoriteRegion: 'moscow',
  studyTimeThisWeek: 180, // minutes
  culturalBadges: ['Tea Master', 'Folk Art Explorer', 'Festival Enthusiast'],
  proficiencyLevel: 'Intermediate (B1)'
}