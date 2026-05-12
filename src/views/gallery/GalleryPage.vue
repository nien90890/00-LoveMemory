<script setup lang="ts">
import { ref } from 'vue'
import { useCoupleStore } from '@/stores/couple'
import HexagonCarousel from './HexagonCarousel.vue'
import PhotoModal from './PhotoModal.vue'
import StaggerFadeIn from '@/components/StaggerFadeIn.vue'
import PageHeader from '@/components/PageHeader.vue'
import GalleryMasonry from './GalleryMasonry.vue'
import MobileGalleryCarousel from './MobileGalleryCarousel.vue'
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
  <div class="px-4 pb-10 sm:px-6 lg:px-8">
    <PageHeader
      eyebrow="Gallery"
      title="回忆相册"
      description="有些照片不是因为构图完美才珍贵，而是因为它把当时的光线、温度和心情都一起留了下来。"
    />

    <section class="section-card mx-auto mb-8 max-w-6xl rounded-[2rem] p-5 md:p-6">
      <div class="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p class="font-script text-4xl text-primary sm:text-5xl">Favorite moments</p>
          <p class="mt-4 text-sm leading-8 text-text-secondary">
            桌面端保留 3D 轮播来承载氛围感，手机端则改成更稳定的滑动相册。
            下方照片网格继续作为补充，方便慢慢翻看更多日常。
          </p>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-4">
            <p class="text-3xl font-semibold text-primary">{{ couple.gallery.length }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Moments</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-4">
            <p class="text-3xl font-semibold text-primary">
              {{ couple.gallery.filter((item) => item.featured).length }}
            </p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Featured</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-4">
            <p class="text-3xl font-semibold text-primary">
              {{ new Set(couple.gallery.map((item) => item.category)).size }}
            </p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Themes</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl pb-6">
      <div class="hidden md:block">
        <StaggerFadeIn :delay="0" :initial-delay="100">
          <HexagonCarousel :items="couple.gallery" @select="onSelect" />
        </StaggerFadeIn>
      </div>

      <div class="md:hidden">
        <div class="mb-5 text-center">
          <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Mobile album</p>
          <h2 class="mt-3 text-2xl font-semibold text-text">手机端轻松翻看</h2>
          <p class="mx-auto mt-3 max-w-md text-sm leading-7 text-text-secondary">
            横向滑动即可浏览，每张卡片都保留标题、地点与日期，让相册自然融入页面内容流。
          </p>
        </div>
        <MobileGalleryCarousel :items="couple.gallery" @select="onSelect" />
      </div>
    </section>

    <section class="mx-auto mt-6 max-w-6xl">
      <div class="mb-6 text-center">
        <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Gallery grid</p>
        <h2 class="section-title mt-4 font-semibold text-text">慢慢翻看的回忆相册</h2>
      </div>
      <GalleryMasonry :items="couple.gallery" @select="onSelect" />
    </section>

    <PhotoModal v-if="selectedItem" :item="selectedItem" @close="onCloseModal" />
  </div>
</template>
