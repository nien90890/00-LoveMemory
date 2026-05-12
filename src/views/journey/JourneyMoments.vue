<script setup lang="ts">
import type { JourneyCity } from '@/types'

interface Props {
  cities: JourneyCity[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <article
      v-for="city in cities"
      :key="city.id"
      class="section-card overflow-hidden rounded-[1.75rem]"
    >
      <img
        v-if="city.photo"
        :src="city.photo"
        :alt="city.name"
        class="aspect-[4/3] w-full object-cover"
        loading="lazy"
      />
      <div class="p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="text-2xl font-semibold text-text">{{ city.name }}</h3>
            <p class="mt-1 text-sm text-text-secondary">{{ city.province }}</p>
          </div>
          <p class="text-xs uppercase tracking-[0.2em] text-primary/70">
            {{
              city.date?.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
            }}
          </p>
        </div>
        <p class="mt-4 text-sm leading-7 text-text-secondary">{{ city.note }}</p>
      </div>
    </article>
  </div>
</template>
