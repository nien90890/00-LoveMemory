<script setup lang="ts">
import { useLoveDuration } from '@/composables/useLoveDuration'

interface Props {
  startDate: Date
  label: string
}

const props = defineProps<Props>()

const { duration } = useLoveDuration(props.startDate)

interface TimeUnit {
  value: number
  label: string
}

const units = [
  { key: 'years', label: '年' },
  { key: 'months', label: '月' },
  { key: 'days', label: '天' },
  { key: 'hours', label: '时' },
  { key: 'minutes', label: '分' },
  { key: 'seconds', label: '秒' },
] as const
</script>

<template>
  <div class="rounded-2xl bg-surface shadow-sm border border-gray-100 p-8 text-center">
    <p class="text-text-secondary mb-6">{{ label }}</p>
    <div class="flex justify-center gap-3 md:gap-6 flex-wrap">
      <div v-for="unit in units" :key="unit.label" class="flex flex-col items-center min-w-[60px]">
        <span class="text-3xl md:text-4xl font-bold text-primary tabular-nums">
          {{ duration[unit.key as keyof typeof duration] }}
        </span>
        <span class="text-xs text-text-secondary mt-1">{{ unit.label }}</span>
      </div>
    </div>
  </div>
</template>
