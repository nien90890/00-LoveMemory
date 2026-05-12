<script setup lang="ts">
import { useLoveDuration } from '@/composables/useLoveDuration'

interface Props {
  startDate: Date
  label: string
}

const props = defineProps<Props>()

const { duration } = useLoveDuration(props.startDate)

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
  <div class="section-card rounded-[2rem] p-6 text-center sm:p-8">
    <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Anniversary Counter</p>
    <p class="mt-4 text-xl text-text-secondary sm:text-2xl">{{ label }}</p>
    <div class="mt-7 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
      <div
        v-for="unit in units"
        :key="unit.label"
        class="min-w-[72px] rounded-[1.5rem] border border-border/80 bg-white/75 px-4 py-4"
      >
        <span class="block text-3xl font-semibold text-primary tabular-nums md:text-4xl">
          {{ duration[unit.key as keyof typeof duration] }}
        </span>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-text-secondary">
          {{ unit.label }}
        </span>
      </div>
    </div>
  </div>
</template>
