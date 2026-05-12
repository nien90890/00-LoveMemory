<script setup lang="ts">
import type { GalleryItem } from '@/types'

interface Props {
  items: GalleryItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', item: GalleryItem): void
}>()

function getSizeClass(size: GalleryItem['size']): string {
  if (size === 'wide') return 'sm:col-span-2'
  if (size === 'tall') return 'sm:row-span-2'
  return ''
}
</script>

<template>
  <div class="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article
      v-for="item in items"
      :key="item.id"
      class="section-card group relative overflow-hidden rounded-[1.75rem] cursor-pointer"
      :class="getSizeClass(item.size)"
      @click="emit('select', item)"
    >
      <img
        :src="item.src"
        :alt="item.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 p-5 text-white">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-lg font-semibold">{{ item.title }}</p>
            <p class="mt-1 text-sm text-white/80">{{ item.location }}</p>
          </div>
          <span class="rounded-full bg-white/18 px-3 py-1 text-xs backdrop-blur-sm">
            {{ item.category }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>
