import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { coupleData } from '@/data/couple'
import { galleryItems } from '@/data/gallery'
import { storyMilestones } from '@/data/story'
import { journeyCities } from '@/data/journey'
import { playlistTracks } from '@/data/playlist'
import type { GalleryItem, StoryMilestone, JourneyCity, PlaylistTrack } from '@/types'

export const useCoupleStore = defineStore('couple', () => {
  const info = reactive({ ...coupleData })
  const gallery = ref<GalleryItem[]>([...galleryItems])
  const story = ref<StoryMilestone[]>([...storyMilestones])
  const journey = ref<JourneyCity[]>([...journeyCities])
  const playlist = ref<PlaylistTrack[]>([...playlistTracks])

  const displayedName = computed(() => `${info.person1.name} & ${info.person2.name}`)

  return { info, gallery, story, journey, playlist, displayedName }
})
