<script setup lang="ts">
import type { GalleryItem } from '@/types'

interface Props {
  items: GalleryItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', item: GalleryItem): void
}>()

function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<template>
  <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
    <article
      v-for="item in items"
      :key="item.id"
      class="section-card min-w-[82vw] max-w-[82vw] snap-center overflow-hidden rounded-[1.75rem] cursor-pointer"
      @click="emit('select', item)"
    >
      <img
        :src="item.src"
        :alt="item.title"
        class="aspect-[4/5] w-full object-cover"
        loading="lazy"
      />
      <div class="p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="text-xl font-semibold text-text">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-text-secondary">{{ item.location }}</p>
          </div>
          <span class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            {{ item.category }}
          </span>
        </div>
        <p class="mt-3 text-sm leading-7 text-text-secondary">{{ item.description }}</p>
        <p class="mt-4 text-xs uppercase tracking-[0.2em] text-text-secondary/80">
          {{ formatDate(item.date) }}
        </p>
      </div>
    </article>
  </div>
</template>
