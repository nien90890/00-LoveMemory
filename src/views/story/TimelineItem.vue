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
    <div
      class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-[0_14px_35px_rgba(188,95,111,0.12)] ring-4 ring-primary/10 md:absolute md:left-1/2 md:-translate-x-1/2"
    >
      <component
        :is="iconComponent"
        v-if="iconComponent"
        :size="18"
        class="text-primary"
      />
    </div>

    <div
      class="ml-4 flex-1 md:ml-0 md:w-[calc(50%-2rem)]"
      :class="isOdd ? 'md:pr-8 md:text-right' : 'md:pl-8'"
    >
      <div class="section-card rounded-[1.75rem] p-5 md:p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-secondary/80">{{ milestone.chapter }}</p>
        <span class="mt-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary/80">
          {{ formattedDate }}
        </span>
        <h3 class="mt-2 text-2xl font-semibold text-text">{{ milestone.title }}</h3>
        <p class="mt-2 text-sm uppercase tracking-[0.2em] text-text-secondary/80">
          {{ milestone.place }}
        </p>
        <p class="mt-4 text-sm leading-7 text-text-secondary">{{ milestone.description }}</p>
        <p
          v-if="milestone.quote"
          class="mt-4 border-l-2 border-primary/30 pl-4 text-sm italic leading-7 text-primary/80 md:border-l-0 md:border-r-2 md:pl-0"
          :class="isOdd ? 'md:border-r-primary/30 md:pr-4' : 'md:border-l-2 md:border-l-primary/30 md:pl-4 md:border-r-0 md:pr-0'"
        >
          “{{ milestone.quote }}”
        </p>
        <img
          v-if="milestone.image"
          :src="milestone.image"
          :alt="milestone.title"
          class="mt-5 max-h-56 w-full rounded-[1.25rem] object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <div class="hidden md:block md:w-[calc(50%-2rem)]" />
  </div>
</template>
