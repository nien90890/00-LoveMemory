<script setup lang="ts">
import { useCoupleStore } from '@/stores/couple'
import ChinaMap from './ChinaMap.vue'

const couple = useCoupleStore()
</script>

<template>
  <ChinaMap :cities="couple.journey" />
</template>
