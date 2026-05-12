<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'

const couple = useCoupleStore()
</script>

<template>
  <section class="px-4 py-6 sm:px-6 lg:px-8">
    <div class="section-card mx-auto grid max-w-6xl gap-6 rounded-[2rem] p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8 lg:p-10">
      <div>
        <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Preface</p>
        <h2 class="section-title mt-4 font-semibold text-text">
          这不是展示页面，而是一份会继续生长的恋爱纪念册
        </h2>
        <p class="section-subtitle mt-5">
          {{ couple.info.intro }}
        </p>
      </div>

      <div class="grid gap-4">
        <div
          v-for="promise in couple.info.promises"
          :key="promise"
          class="rounded-[1.5rem] border border-border/80 bg-white/80 px-5 py-4 shadow-[0_12px_30px_rgba(188,95,111,0.06)]"
        >
          <p class="text-base leading-7 text-text">{{ promise }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
