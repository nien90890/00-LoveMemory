<script setup lang="ts">
import { ArrowRight, Heart, Sparkles } from 'lucide-vue-next'
import { useCoupleStore } from '@/stores/couple'
import { RouterLink } from 'vue-router'

const couple = useCoupleStore()
</script>

<template>
  <section class="relative overflow-hidden px-4 pt-4 pb-6 sm:px-6 lg:px-8">
    <div class="section-card mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8 lg:p-10">
      <div class="flex flex-col justify-center">
        <div class="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          <Sparkles :size="16" />
          <span class="tracking-[0.2em] uppercase">{{ couple.info.hero.eyebrow }}</span>
        </div>

        <p class="mt-6 text-sm uppercase tracking-[0.35em] text-text-secondary">
          {{ couple.info.person1.nickname }} &amp; {{ couple.info.person2.nickname }}
        </p>

        <h1 class="mt-4 text-5xl font-semibold leading-none text-text sm:text-6xl lg:text-7xl">
          {{ couple.info.person1.name }}
          <span class="mx-2 inline-flex translate-y-[-0.08em] items-center text-primary/80">
            <Heart class="fill-primary/15" :size="34" />
          </span>
          {{ couple.info.person2.name }}
        </h1>

        <h2 class="mt-6 max-w-3xl text-3xl leading-tight text-text sm:text-4xl lg:text-5xl">
          {{ couple.info.hero.title }}
        </h2>

        <p class="section-subtitle mt-5 max-w-2xl">
          {{ couple.info.hero.description }}
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink
            to="/story"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-white shadow-[0_16px_40px_rgba(188,95,111,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            查看我们的故事
            <ArrowRight :size="16" />
          </RouterLink>
          <RouterLink
            to="/gallery"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-5 py-3 text-sm text-text transition-colors duration-300 hover:bg-white"
          >
            翻看回忆相册
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-4">
        <div class="rounded-[2rem] bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-5 sm:p-6">
          <p class="font-script text-4xl text-primary sm:text-5xl">Love Letter</p>
          <p class="mt-4 text-base leading-8 text-text">
            {{ couple.info.hero.dedication }}
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-[1.75rem] border border-border/80 bg-white/85 p-5">
            <p class="text-xs uppercase tracking-[0.3em] text-secondary/80">Tagline</p>
            <p class="mt-3 text-2xl leading-tight text-text">{{ couple.info.tagline }}</p>
          </div>
          <div class="rounded-[1.75rem] border border-border/80 bg-white/85 p-5">
            <p class="text-xs uppercase tracking-[0.3em] text-secondary/80">Together</p>
            <p class="mt-3 font-script text-4xl text-primary">Forever in progress</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
