export interface Person {
  name: string
  nickname: string
  avatar: string
}

export interface CoupleStats {
  photosTogether: number
  citiesVisited: number
  songsShared: number
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  dedication: string
}

export interface AnniversaryMoment {
  id: number
  label: string
  date: Date
  description: string
}

export interface CoupleData {
  person1: Person
  person2: Person
  anniversary: Date
  sinceLabel: string
  tagline: string
  intro: string
  footerNote: string
  hero: HeroContent
  stats: CoupleStats
  promises: string[]
  anniversaryMoments: AnniversaryMoment[]
  letters: string[]
}

export type GalleryCategory = '旅行' | '日常' | '庆祝' | '肖像'
export type MemoryCardSize = 'wide' | 'tall' | 'square'

export interface GalleryItem {
  id: number
  src: string
  title: string
  description: string
  date: Date
  category: GalleryCategory
  location: string
  featured?: boolean
  size?: MemoryCardSize
}

export interface StoryMilestone {
  id: number
  date: Date
  title: string
  description: string
  icon: string
  chapter: string
  place: string
  quote?: string
  image?: string
}

export interface JourneyCity {
  id: number
  name: string
  province: string
  lat: number
  lng: number
  date?: Date
  note?: string
  photo?: string
}

export interface PlaylistTrack {
  id: number
  title: string
  artist: string
  mood: string
  lyric: string
  note: string
  date: Date
}

export type MapLoadingState = 'idle' | 'loading' | 'success' | 'error'
