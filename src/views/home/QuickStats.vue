<script setup lang="ts">
import { Heart, MapPin, Music } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { CoupleStats } from '@/types'

interface Props {
  stats: CoupleStats
}

defineProps<Props>()

const router = useRouter()

const statItems = [
  { key: 'photosTogether', icon: Heart, label: '张照片', color: 'text-accent', to: '/love-photo' },
  { key: 'citiesVisited', icon: MapPin, label: '座城市', color: 'text-secondary', to: '/journey' },
  { key: 'songsShared', icon: Music, label: '首歌曲', color: 'text-primary', to: '/music' },
] as const
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div
      v-for="item in statItems"
      :key="item.key"
      class="rounded-2xl bg-surface shadow-sm border border-gray-100 p-6 text-center cursor-pointer transition-shadow hover:shadow-md"
      @click="router.push(item.to)"
    >
      <component :is="item.icon" :size="28" :class="item.color" class="mx-auto mb-2" />
      <p class="text-2xl font-bold text-text tabular-nums">
        {{ stats[item.key as keyof CoupleStats] }}
      </p>
      <p class="text-sm text-text-secondary">{{ item.label }}</p>
    </div>
  </div>
</template>
