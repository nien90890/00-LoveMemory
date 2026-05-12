<script setup lang="ts">
interface Props {
  title: string
  description?: string
  eyebrow?: string
}

defineProps<Props>()
</script>

<template>
  <div class="px-4 py-10 text-center md:py-14">
    <p
      v-if="eyebrow"
      class="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 sm:text-sm"
    >
      {{ eyebrow }}
    </p>
    <h1 class="section-title font-semibold text-text">{{ title }}</h1>
    <p v-if="description" class="section-subtitle mx-auto mt-4 max-w-2xl">
      {{ description }}
    </p>
  </div>
</template>
