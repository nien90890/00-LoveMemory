<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'

const couple = useCoupleStore()
</script>

<template>
  <section
    class="relative overflow-hidden"
  >
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-12 text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-text mb-4">
        {{ couple.info.person1.name }}
        <span class="inline-block mx-3 text-primary/60 text-3xl md:text-5xl align-middle"
          >&#9829;</span
        >
        {{ couple.info.person2.name }}
      </h1>
      <p class="text-lg md:text-xl text-text-secondary max-w-lg mx-auto">
        {{ couple.info.tagline }}
      </p>
    </div>
  </section>
</template>
