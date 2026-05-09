<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useChinaMap } from './useChinaMap'
import type { JourneyCity } from '@/types'
import 'leaflet/dist/leaflet.css'

interface Props {
  cities: JourneyCity[]
}

const props = defineProps<Props>()
const mapContainer = ref<HTMLDivElement>()

const {
  loadingState,
  errorMessage,
  geoJsonData,
  initMap,
  fetchGeoJson,
  renderProvinceLayer,
  renderCityMarkers,
  destroy,
} = useChinaMap()

onMounted(() => {
  if (mapContainer.value) {
    initMap(mapContainer.value)
    fetchGeoJson()
  }
})

watch(geoJsonData, (data) => {
  if (!data) return
  const visitedNames = [...new Set(props.cities.map((c) => c.province))]
  renderProvinceLayer(visitedNames)
  // brief delay so province layer renders before markers start appearing
  setTimeout(() => {
    renderCityMarkers(props.cities)
  }, 200)
})

onUnmounted(() => {
  destroy()
})
</script>

<template>
  <div class="relative w-full" style="height: calc(100vh - 56px)">
    <!-- Loading overlay -->
    <div
      v-if="loadingState === 'loading'"
      class="absolute inset-0 z-1000 flex items-center justify-center bg-white"
    >
      <div class="flex flex-col items-center gap-3">
        <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span class="text-sm text-text-secondary">加载地图...</span>
      </div>
    </div>

    <!-- Error overlay -->
    <div
      v-else-if="loadingState === 'error'"
      class="absolute inset-0 z-1000 flex items-center justify-center bg-white"
    >
      <div class="text-center">
        <p class="text-red-400 mb-2">地图加载失败</p>
        <p class="text-xs text-text-secondary mb-3">{{ errorMessage }}</p>
        <button
          class="text-sm text-primary hover:underline cursor-pointer"
          @click="fetchGeoJson()"
        >
          重新加载
        </button>
      </div>
    </div>

    <!-- Leaflet map container -->
    <div ref="mapContainer" class="w-full h-full" />
  </div>
</template>
