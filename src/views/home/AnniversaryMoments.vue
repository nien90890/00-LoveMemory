<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'

const couple = useCoupleStore()

function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <section class="px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="mb-6 text-center md:mb-8">
        <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Milestones</p>
        <h2 class="section-title mt-4 font-semibold text-text">属于我们的纪念节点</h2>
        <p class="section-subtitle mx-auto mt-4 max-w-2xl">
          有些日子不是因为盛大才难忘，而是因为从那之后，我们开始有了更多“以后”。
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="moment in couple.info.anniversaryMoments"
          :key="moment.id"
          class="section-card rounded-[1.75rem] p-5"
        >
          <p class="text-xs uppercase tracking-[0.3em] text-secondary/80">{{ moment.label }}</p>
          <p class="mt-4 text-2xl font-semibold text-text">{{ formatDate(moment.date) }}</p>
          <p class="mt-4 text-sm leading-7 text-text-secondary">{{ moment.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
