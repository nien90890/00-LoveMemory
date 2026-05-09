<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { StoryMilestone } from '@/types'
import TimelineItem from './TimelineItem.vue'

interface Props {
  milestones: StoryMilestone[]
}

defineProps<Props>()

const visibleIndexes = ref<Set<number>>(new Set())
const elements = ref<(HTMLElement | null)[]>([])

function setEl(el: HTMLElement | null, index: number) {
  elements.value[index] = el
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          visibleIndexes.value = new Set([...visibleIndexes.value, index])
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  elements.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})
</script>

<template>
  <div class="relative">
    <div class="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-secondary/30" />

    <div class="space-y-12">
      <div
        v-for="(milestone, index) in milestones"
        :key="milestone.id"
        :ref="(el) => setEl(el as HTMLElement | null, index)"
        :data-index="index"
        class="relative transition-all duration-700"
        :class="
          visibleIndexes.has(index)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        "
      >
        <TimelineItem
          :milestone="milestone"
          :is-odd="index % 2 === 0"
        />
      </div>
    </div>
  </div>
</template>
