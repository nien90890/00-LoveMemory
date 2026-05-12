<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'
import HeroSection from './HeroSection.vue'
import CountdownCard from './CountdownCard.vue'
import QuickStats from './QuickStats.vue'
import StaggerFadeIn from '@/components/StaggerFadeIn.vue'
import MemoryIntro from './MemoryIntro.vue'
import AnniversaryMoments from './AnniversaryMoments.vue'
import MemoryPreviewGrid from './MemoryPreviewGrid.vue'

const couple = useCoupleStore()
</script>

<template>
  <div class="pb-8">
    <StaggerFadeIn>
      <HeroSection />
      <section class="max-w-4xl mx-auto px-4 pt-2 sm:px-6 lg:px-8">
          <CountdownCard :start-date="couple.info.anniversary" :label="couple.info.sinceLabel" />
      </section>
      <section class="max-w-4xl mx-auto px-4 pt-6 pb-2 sm:px-6 lg:px-8">
          <QuickStats :stats="couple.info.stats" />
      </section>
      <MemoryIntro />
      <AnniversaryMoments />
      <MemoryPreviewGrid />
    </StaggerFadeIn>
  </div>
</template>
