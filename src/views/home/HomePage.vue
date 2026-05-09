<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'
import HeroSection from './HeroSection.vue'
import CountdownCard from './CountdownCard.vue'
import QuickStats from './QuickStats.vue'
import StaggerFadeIn from '@/components/StaggerFadeIn.vue'
import WaveDivider from './WaveDivider.vue'

const couple = useCoupleStore()
</script>

<template>
  <div>
    <StaggerFadeIn>
      <HeroSection />
      <!-- <WaveDivider /> -->
      <div>
        <section class="max-w-3xl mx-auto px-4 pt-4">
          <CountdownCard :start-date="couple.info.anniversary" :label="couple.info.sinceLabel" />
        </section>
        <section class="max-w-3xl mx-auto px-4 pt-10 pb-4">
          <QuickStats :stats="couple.info.stats" />
        </section>
      </div>
    </StaggerFadeIn>
  </div>
</template>
