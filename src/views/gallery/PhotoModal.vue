<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import type { GalleryItem } from '@/types'

interface Props {
  item: GalleryItem
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    @click="onBackdropClick"
  >
    <div
      class="relative max-w-2xl w-full animate-[fadeIn_0.3s_ease-out]"
    >
      <!-- Close button -->
      <button
        class="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors cursor-pointer"
        @click="emit('close')"
      >
        <X :size="24" />
      </button>

      <!-- Image -->
      <img
        :src="item.src"
        :alt="item.title"
        class="w-full aspect-[4/3] object-cover rounded-t-2xl"
        draggable="false"
      />

      <!-- Info panel -->
      <div
        class="bg-white rounded-b-2xl p-6 animate-[fadeInUp_0.4s_ease-out_0.15s_both]"
      >
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-xl font-bold text-gray-800">{{ item.title }}</h2>
          <span
            class="shrink-0 px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-rose-100 text-rose-600': item.category === '旅行',
              'bg-sky-100 text-sky-600': item.category === '日常',
              'bg-amber-100 text-amber-600': item.category === '庆祝',
            }"
          >
            {{ item.category }}
          </span>
        </div>
        <p class="mt-3 text-gray-600 leading-relaxed">{{ item.description }}</p>
        <p class="mt-3 text-sm text-gray-400">
          {{ item.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </div>
  </div>
</template>
