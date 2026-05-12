<script setup lang="ts">
import { Camera, Compass, HeartHandshake, Music4 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

interface PreviewItem {
  title: string
  description: string
  to: string
  icon: typeof Camera
}

const items: PreviewItem[] = [
  {
    title: '故事时间线',
    description: '把最重要的时刻按顺序排开，像重新走一遍我们的相识、相爱与成长。',
    to: '/story',
    icon: HeartHandshake,
  },
  {
    title: '回忆相册',
    description: '桌面端保留沉浸式轮播，手机端则用更稳定的方式轻松翻看每张照片。',
    to: '/gallery',
    icon: Camera,
  },
  {
    title: '回忆旅程',
    description: '把一起去过的城市连起来，未来也可以继续把新的坐标写上去。',
    to: '/journey',
    icon: Compass,
  },
  {
    title: '专属歌单',
    description: '歌会替我们保管情绪，一首首串起来，就是另一种形式的纪念册。',
    to: '/music',
    icon: Music4,
  },
]
</script>

<template>
  <section class="px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="mb-6 text-center md:mb-8">
        <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Chapters</p>
        <h2 class="section-title mt-4 font-semibold text-text">继续翻下去，每一页都和你有关</h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="section-card group rounded-[1.75rem] p-5 transition-transform duration-300 hover:-translate-y-1"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
          >
            <component :is="item.icon" :size="20" />
          </div>
          <h3 class="mt-5 text-2xl font-semibold text-text">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-text-secondary">{{ item.description }}</p>
          <p class="mt-5 text-sm uppercase tracking-[0.25em] text-primary/70">Open chapter</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
