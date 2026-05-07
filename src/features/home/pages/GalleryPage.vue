<script setup lang="ts">
import { ref } from 'vue'
import { useCoupleStore } from '@/stores/couple'
import HexagonCarousel from '@/components/HexagonCarousel.vue'
import PhotoModal from '@/components/PhotoModal.vue'
import StaggerFadeIn from '@/components/StaggerFadeIn.vue'
import type { GalleryItem } from '@/types'

const couple = useCoupleStore()
const selectedItem = ref<GalleryItem | null>(null)

// Preload all gallery images into browser cache so modal opens instantly
couple.gallery.forEach((item) => {
  const img = new Image()
  img.src = item.src
})

function onSelect(item: GalleryItem) {
  selectedItem.value = item
}

function onCloseModal() {
  selectedItem.value = null
}
</script>

<template>
  <div>
    <section class="max-w-5xl mx-auto px-4 pb-4">
      <StaggerFadeIn :delay="0" :initial-delay="100">
        <HexagonCarousel :items="couple.gallery" @select="onSelect" />
      </StaggerFadeIn>
    </section>
    <PhotoModal v-if="selectedItem" :item="selectedItem" @close="onCloseModal" />
  </div>
</template>
