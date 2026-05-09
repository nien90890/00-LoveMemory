<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import SakuraPetals from '@/components/SakuraPetals.vue'
import FishesCanvas from '@/components/FishesCanvas.vue'
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-page">
    <!-- Semi-transparent overlay for readability -->
    <div class="absolute inset-0 bg-white/70" />

    <div class="relative z-10 flex flex-col min-h-screen">
      <SakuraPetals />
      <HeaderNav />
      <main class="flex-1 pt-14">
        <RouterView v-slot="{ Component }">
          <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <div class="relative h-[25vh] min-h-[200px] max-h-[350px]">
        <FishesCanvas />
        <footer class="absolute inset-x-0 bottom-0 z-10 py-6 text-center text-white text-sm">
          <p class="flex items-center justify-center gap-1">
            Made with
            <span class="text-white text-lg leading-none">&#9829;</span>
            by Long &amp; Tian
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
