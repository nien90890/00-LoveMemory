<script setup lang="ts">
import { Heart, Menu, X } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const isMenuOpen = ref(false)

const links = [
  { to: '/', label: '首页' },
  { to: '/story', label: '我们的故事' },
  { to: '/gallery', label: '回忆相册' },
  { to: '/journey', label: '回忆旅程' },
  { to: '/music', label: '专属歌单' },
]

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4">
    <nav
      class="section-card mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 sm:h-16 sm:px-6"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-primary"
      >
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <Heart :size="15" />
        </span>
        <span class="font-script text-2xl sm:text-3xl">LoveMemory</span>
      </RouterLink>
      <div class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-3 py-2 text-sm transition-all duration-200"
          :class="
            route.path === link.to
              ? 'bg-primary text-white shadow-[0_10px_30px_rgba(188,95,111,0.28)]'
              : 'text-text-secondary hover:bg-white/75 hover:text-text'
          "
        >
          {{ link.label }}
        </RouterLink>
      </div>
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/15 md:hidden"
        type="button"
        aria-label="切换导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Menu v-if="!isMenuOpen" :size="18" />
        <X v-else :size="18" />
      </button>
    </nav>

    <div
      v-if="isMenuOpen"
      class="section-card mx-auto mt-3 max-w-6xl rounded-[1.75rem] p-3 md:hidden"
    >
      <div class="grid grid-cols-2 gap-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-2xl px-4 py-3 text-sm transition-colors duration-200"
          :class="
            route.path === link.to
              ? 'bg-primary text-white'
              : 'bg-white/70 text-text-secondary hover:bg-primary/8 hover:text-text'
          "
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
