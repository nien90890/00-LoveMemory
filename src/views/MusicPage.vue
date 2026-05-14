<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { useCoupleStore } from '@/stores/couple'
import { playlistTracks } from '@/data/playlist'

const couple = useCoupleStore()
const moodCount = computed(() => new Set(playlistTracks.map((track) => track.mood)).size)
</script>

<template>
  <div class="px-4 pb-10 sm:px-6 lg:px-8">
    <PageHeader
      eyebrow="Playlist"
      title="专属歌单"
      description="有些回忆不是被照片记住的，而是被旋律重新唤起的。每首歌都像一个能回去的小入口。"
    />

    <section class="section-card mx-auto mb-8 max-w-6xl rounded-[2rem] p-6 md:p-8">
      <div class="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p class="font-script text-4xl text-primary sm:text-5xl">Songs we keep</p>
          <p class="mt-4 text-sm leading-8 text-text-secondary">
            这里更像是一份歌单备忘。它不强调播放器功能，而是把“哪首歌对应哪段情绪和哪一天”
            这件事安静地保存下来，方便以后继续补充和回看。
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5 text-center">
            <p class="text-3xl font-semibold text-primary">{{ playlistTracks.length }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Tracks</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5 text-center">
            <p class="text-3xl font-semibold text-primary">{{ couple.info.stats.songsShared }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Shared</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/75 px-4 py-5 text-center">
            <p class="text-3xl font-semibold text-primary">{{ moodCount }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">Moods</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl space-y-4">
      <article
        v-for="track in playlistTracks"
        :key="track.id"
        class="section-card rounded-[1.75rem] p-5 md:p-6"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-primary/70">{{ track.mood }}</p>
            <h2 class="mt-2 text-2xl font-semibold text-text">{{ track.title }}</h2>
            <p class="mt-2 text-sm text-text-secondary">{{ track.artist }}</p>
          </div>
          <p class="text-xs uppercase tracking-[0.2em] text-text-secondary/80">
            {{ track.date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
          </p>
        </div>

        <blockquote class="mt-5 rounded-[1.5rem] bg-white/75 px-5 py-4 text-lg leading-8 text-primary">
          {{ track.memoryLine }}
        </blockquote>

        <p class="mt-4 text-sm leading-7 text-text-secondary">{{ track.note }}</p>
      </article>
    </section>
  </div>
</template>
