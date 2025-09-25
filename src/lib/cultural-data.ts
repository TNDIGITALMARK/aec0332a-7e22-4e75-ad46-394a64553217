export interface CulturalRegion {
  id: string
  name: string
  description: string
  image: string
  totalLessons: number
  lessonsCompleted: number
  culturalHighlight: string
}

export interface UserProgress {
  totalLessonsCompleted: number
  currentStreak: number
  proficiencyLevel: string
  culturalBadges: string[]
}

export interface CulturalLesson {
  id: string
  region: string
  title: string
  description: string
  type: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  culturalContext: string
  vocabulary: string[]
  interactiveElements: string[]
}

export const culturalRegions: CulturalRegion[] = [
  {
    id: 'moscow',
    name: 'Москва и Центральная Россия',
    description: 'Explore the heart of Russian culture in Moscow and Central Russia',
    image: '/generated/moscow-kremlin.png',
    totalLessons: 15,
    lessonsCompleted: 8,
    culturalHighlight: 'Red Square and the Kremlin represent the political and spiritual center of Russia'
  },
  {
    id: 'petersburg',
    name: 'Санкт-Петербург',
    description: 'Discover the imperial heritage and artistic treasures of St. Petersburg',
    image: '/generated/petersburg-palace.png',
    totalLessons: 12,
    lessonsCompleted: 5,
    culturalHighlight: 'The Hermitage Museum houses one of the world\'s largest art collections'
  },
  {
    id: 'siberia',
    name: 'Сибирь и Дальний Восток',
    description: 'Journey through the vast wilderness and indigenous cultures of Siberia',
    image: '/generated/siberian-landscape.png',
    totalLessons: 10,
    lessonsCompleted: 3,
    culturalHighlight: 'Home to over 40 indigenous peoples with unique languages and traditions'
  },
  {
    id: 'caucasus',
    name: 'Кавказ',
    description: 'Experience the diverse cultures and mountainous beauty of the Caucasus',
    image: '/generated/caucasus-mountains.png',
    totalLessons: 8,
    lessonsCompleted: 2,
    culturalHighlight: 'A crossroads of European and Asian cultures with ancient wine-making traditions'
  }
]

export const userProgress: UserProgress = {
  totalLessonsCompleted: 18,
  currentStreak: 7,
  proficiencyLevel: 'Intermediate',
  culturalBadges: [
    'Tea Ceremony Master',
    'Folk Dance Enthusiast',
    'Traditional Craft Explorer',
    'Language Pioneer',
    'Cultural Ambassador'
  ]
}

export const culturalLessons: CulturalLesson[] = [
  {
    id: 'moscow-intro',
    region: 'moscow',
    title: 'Introduction to Moscow Culture',
    description: 'Learn about the cultural significance of Moscow as Russia\'s capital',
    type: 'Culture',
    duration: 15,
    difficulty: 'beginner',
    culturalContext: 'Moscow has been the political and cultural center of Russia for centuries. The city combines ancient traditions with modern life, from the historic Kremlin to contemporary art galleries.',
    vocabulary: ['столица', 'кремль', 'культура', 'традиции', 'история'],
    interactiveElements: ['Virtual Kremlin Tour', 'Traditional Moscow Foods', 'Metro Station Art Gallery']
  },
  {
    id: 'petersburg-palaces',
    region: 'petersburg',
    title: 'Imperial Palaces and Gardens',
    description: 'Explore the magnificent palaces built by Russian tsars',
    type: 'History',
    duration: 20,
    difficulty: 'intermediate',
    culturalContext: 'St. Petersburg\'s palaces showcase the grandeur of imperial Russia. Built by European architects for Russian tsars, they represent a unique blend of Russian and Western European styles.',
    vocabulary: ['дворец', 'сад', 'царь', 'архитектура', 'роскошь'],
    interactiveElements: ['Palace Room Explorer', 'Garden Design Activity', 'Imperial Fashion Show']
  },
  {
    id: 'siberian-peoples',
    region: 'siberia',
    title: 'Indigenous Peoples of Siberia',
    description: 'Discover the rich cultures of Siberian native peoples',
    type: 'Ethnography',
    duration: 25,
    difficulty: 'advanced',
    culturalContext: 'Siberia is home to many indigenous groups who have maintained their traditional lifestyles for thousands of years. Each group has unique languages, spiritual beliefs, and survival techniques adapted to the harsh climate.',
    vocabulary: ['коренные народы', 'традиции', 'шаман', 'оленеводство', 'тундра'],
    interactiveElements: ['Traditional Craft Workshop', 'Shamanic Ritual Simulation', 'Reindeer Herding Game']
  },
  {
    id: 'caucasus-cuisine',
    region: 'caucasus',
    title: 'Culinary Traditions of the Caucasus',
    description: 'Taste the diverse flavors of Caucasian cuisine',
    type: 'Culinary',
    duration: 30,
    difficulty: 'beginner',
    culturalContext: 'Caucasian cuisine reflects the region\'s position at the crossroads between Europe and Asia. Each ethnic group contributes unique dishes, spices, and cooking techniques that have been passed down through generations.',
    vocabulary: ['кухня', 'специи', 'хлеб', 'мясо', 'вино'],
    interactiveElements: ['Virtual Cooking Class', 'Spice Identification Game', 'Traditional Table Setting']
  }
]