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
  { key: 'photosTogether', icon: Heart, label: '张照片', color: 'text-accent', to: '/gallery' },
  { key: 'citiesVisited', icon: MapPin, label: '座城市', color: 'text-secondary', to: '/journey' },
  { key: 'songsShared', icon: Music, label: '首歌曲', color: 'text-primary', to: '/music' },
] as const
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div
      v-for="item in statItems"
      :key="item.key"
      class="section-card rounded-[1.75rem] p-6 text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      @click="router.push(item.to)"
    >
      <component :is="item.icon" :size="28" :class="item.color" class="mx-auto mb-3" />
      <p class="text-3xl font-semibold text-text tabular-nums">
        {{ stats[item.key as keyof CoupleStats] }}
      </p>
      <p class="mt-2 text-sm text-text-secondary">{{ item.label }}</p>
    </div>
  </div>
</template>
