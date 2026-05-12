<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNav from '@/components/HeaderNav.vue'
import SakuraPetals from '@/components/SakuraPetals.vue'
import FishesCanvas from '@/components/FishesCanvas.vue'
import { useCoupleStore } from '@/stores/couple'

const couple = useCoupleStore()
const route = useRoute()

watchEffect(() => {
  const pageTitle = typeof route.meta.title === 'string' ? route.meta.title : '我们的故事'
  document.title = `LoveMemory - ${pageTitle}`
})
</script>

<template>
  <div class="romantic-shell relative min-h-screen flex flex-col bg-page">
    <div class="relative z-10 flex flex-col min-h-screen">
      <SakuraPetals />
      <HeaderNav />
      <main class="flex-1 pt-20 md:pt-24">
        <RouterView v-slot="{ Component }">
          <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <div class="relative mt-10 h-[28dvh] min-h-[220px] max-h-[360px] overflow-hidden">
        <FishesCanvas />
        <div class="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/5 to-transparent" />
        <footer
          class="absolute inset-x-0 bottom-0 z-10 px-4 py-8 text-center text-white sm:px-6"
        >
          <p class="font-script text-3xl sm:text-4xl">Long &amp; Tian</p>
          <p class="mx-auto mt-2 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {{ couple.info.footerNote }}
          </p>
          <p class="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">
            Love Memory Archive
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
