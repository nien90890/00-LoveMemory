<script setup lang="ts">
import { Heart, Sparkles, Plane, Gift, Cake } from 'lucide-vue-next'
import type { StoryMilestone } from '@/types'
import { computed } from 'vue'

interface Props {
  milestone: StoryMilestone
  isOdd: boolean
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  const iconMap: Record<string, object> = {
    Heart,
    Sparkles,
    Plane,
    Gift,
    Cake,
  }
  return iconMap[props.milestone.icon]
})

const formattedDate = computed(() => {
  const d = props.milestone.date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
})
</script>

<template>
  <div class="flex md:items-start" :class="isOdd ? 'md:flex-row' : 'md:flex-row-reverse'">
    <!-- Timeline dot -->
    <div class="flex-shrink-0 relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20 md:absolute md:left-1/2 md:-translate-x-1/2">
      <component
        :is="iconComponent"
        v-if="iconComponent"
        :size="18"
        class="text-secondary"
      />
    </div>

    <!-- Content card -->
    <div class="ml-4 md:ml-0 md:w-[calc(50%-2rem)] flex-1" :class="isOdd ? 'md:pr-8 md:text-right' : 'md:pl-8'">
      <div class="bg-surface rounded-xl shadow-sm border border-gray-100 p-5">
        <span class="text-xs text-secondary font-medium">{{ formattedDate }}</span>
        <h3 class="text-lg font-semibold text-text mt-1">{{ milestone.title }}</h3>
        <p class="text-sm text-text-secondary mt-2 leading-relaxed">{{ milestone.description }}</p>
        <img
          v-if="milestone.image"
          :src="milestone.image"
          :alt="milestone.title"
          class="mt-3 rounded-lg w-full object-cover max-h-48"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Spacer for the other side on desktop -->
    <div class="hidden md:block md:w-[calc(50%-2rem)]" />
  </div>
</template>
