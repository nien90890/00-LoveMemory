<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'
import PageHeader from '@/components/PageHeader.vue'
import Timeline from './Timeline.vue'

const couple = useCoupleStore()
</script>

<template>
  <div>
    <PageHeader title="我们的故事" description="从相识到相知，每一个瞬间都值得铭记" />
    <section class="max-w-3xl mx-auto px-4 pb-16">
      <Timeline :milestones="couple.story" />
    </section>
  </div>
</template>
