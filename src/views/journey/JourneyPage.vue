<script setup lang="ts">
import { computed } from 'vue'
import { journeyCities } from '@/data/journey'
import JourneyMapBoard from './JourneyMapBoard.vue'
import PageHeader from '@/components/PageHeader.vue'
import JourneyMoments from './JourneyMoments.vue'

const regionCount = computed(() => new Set(journeyCities.map((city) => city.province)).size)
const latestCity = computed(() => journeyCities[journeyCities.length - 1]?.name ?? '待补充')
</script>

<template>
  <div class="px-4 pb-10 sm:px-6 lg:px-8">
    <PageHeader
      eyebrow="Journey"
      title="回忆旅程"
      description="我们一起走过的城市，不只是地图上的坐标，更是当时的温度、天气和心情。"
    />

    <section class="section-card mx-auto mb-8 max-w-6xl rounded-[2rem] p-5 md:p-6">
      <div class="grid gap-4 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <div>
          <p class="font-script text-4xl text-primary sm:text-5xl">Cities we reached</p>
          <p class="mt-4 text-sm leading-8 text-text-secondary">
            地图负责展示轨迹，城市卡片负责保存细节。以后继续把新的城市、坐标、日期和备注补进来，
            这里就会慢慢长成一份真正属于你们的恋爱旅行地图。
          </p>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5">
            <p class="text-3xl font-semibold text-primary">{{ journeyCities.length }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Cities</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5">
            <p class="text-3xl font-semibold text-primary">{{ regionCount }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Regions</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5">
            <p class="text-3xl font-semibold text-primary">{{ latestCity }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Latest</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl">
      <JourneyMapBoard :cities="journeyCities" />
    </section>

    <section class="mx-auto mt-8 max-w-6xl">
      <div class="mb-6 text-center">
        <p class="text-xs uppercase tracking-[0.35em] text-primary/70">Moments on the road</p>
        <h2 class="section-title mt-4 font-semibold text-text">每座城市都有一句备注</h2>
      </div>
      <JourneyMoments :cities="journeyCities" />
    </section>
  </div>
</template>
