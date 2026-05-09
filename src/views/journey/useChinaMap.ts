import { ref, shallowRef } from 'vue'
import L from 'leaflet'
import type { FeatureCollection } from 'geojson'
import type { MapLoadingState, JourneyCity } from '@/types'

const GEOJSON_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const TILE_ATTR = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'

export function useChinaMap() {
  const loadingState = ref<MapLoadingState>('idle')
  const errorMessage = ref('')
  const geoJsonData = shallowRef<FeatureCollection | null>(null)

  let map: L.Map | null = null
  let provinceLayer: L.GeoJSON | null = null
  let abortController: AbortController | null = null
  const timers: ReturnType<typeof setTimeout>[] = []
  const intervals: ReturnType<typeof setInterval>[] = []

  function initMap(container: HTMLElement): void {
    if (map) return

    map = L.map(container, {
      center: [35, 104],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    })

    L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(map)
  }

  async function fetchGeoJson(): Promise<void> {
    if (loadingState.value === 'loading') return
    loadingState.value = 'loading'
    errorMessage.value = ''

    abortController = new AbortController()
    try {
      const res = await fetch(GEOJSON_URL, { signal: abortController.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      geoJsonData.value = await res.json()
      loadingState.value = 'success'
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      errorMessage.value = err instanceof Error ? err.message : '加载失败'
      loadingState.value = 'error'
    }
  }

  function renderProvinceLayer(visitedProvinceNames: string[]): void {
    const m = map
    if (!m || !geoJsonData.value) return
    if (provinceLayer) m.removeLayer(provinceLayer)

    provinceLayer = L.geoJSON(geoJsonData.value, {
      style: (feature) => {
        const name = feature?.properties?.name as string | undefined
        const isVisited = name ? visitedProvinceNames.includes(name) : false
        return {
          fillColor: '#fd79a8',
          fillOpacity: isVisited ? 0.8 : 0.3,
          color: isVisited ? '#fd79a8' : '#d0d0d0',
          weight: isVisited ? 0.8 : 0.4,
        }
      },
    }).addTo(m)
  }

  function renderCityMarkers(cities: JourneyCity[]): void {
    const m = map
    if (!m) return
    clearAnimations()

    cities.forEach((city, index) => {
      const dot = L.circleMarker([city.lat, city.lng], {
        radius: 0,
        fillColor: '#e74c6f',
        fillOpacity: 1,
        opacity: 0,
      }).addTo(m)

      const ring = L.circleMarker([city.lat, city.lng], {
        radius: 6,
        color: '#fd79a8',
        weight: 1.5,
        fill: false,
        opacity: 0,
      }).addTo(m)

      dot.bindTooltip(city.name, {
        direction: 'top',
        offset: [0, -10],
        className: 'city-tooltip',
      })

      // Staggered reveal: wait 500ms then animate over ~420ms
      const timer = setTimeout(
        () => {
          let step = 0
          const totalSteps = 12
          const interval = setInterval(() => {
            step++
            const p = step / totalSteps
            dot.setRadius(3.5 * p)
            dot.setStyle({ opacity: p })
            ring.setStyle({ opacity: p })
            if (step >= totalSteps) clearInterval(interval)
          }, 35)
          intervals.push(interval)
        },
        500 + index * 300,
      )
      timers.push(timer)
    })
  }

  function clearAnimations(): void {
    timers.forEach(clearTimeout)
    intervals.forEach(clearInterval)
    timers.length = 0
    intervals.length = 0
  }

  function destroy(): void {
    abortController?.abort()
    clearAnimations()
    if (provinceLayer) {
      provinceLayer.remove()
      provinceLayer = null
    }
    if (map) {
      map.remove()
      map = null
    }
  }

  return {
    loadingState,
    errorMessage,
    geoJsonData,
    initMap,
    fetchGeoJson,
    renderProvinceLayer,
    renderCityMarkers,
    destroy,
  }
}
