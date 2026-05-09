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

export interface CoupleData {
  person1: Person
  person2: Person
  anniversary: Date
  sinceLabel: string
  tagline: string
  stats: CoupleStats
}

export interface GalleryItem {
  id: number
  src: string
  title: string
  description: string
  date: Date
  category: string
}

export interface StoryMilestone {
  id: number
  date: Date
  title: string
  description: string
  icon: string
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
}

export type MapLoadingState = 'idle' | 'loading' | 'success' | 'error'
