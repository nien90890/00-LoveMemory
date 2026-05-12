<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import type { GalleryItem } from '@/types'

const props = defineProps<{
  items: GalleryItem[]
}>()

const emit = defineEmits<{
  (e: 'select', item: GalleryItem): void
}>()

const carouselRef = useTemplateRef<HTMLDivElement>('carouselRef')
const currentAngle = ref(0)
const isManualRotating = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const viewportWidth = ref(0)
let resizeObserver: ResizeObserver | null = null

// Hexagonal prism geometry:
//   r   = circumradius (vertex → center)
//   a   = apothem (face center → center) = r * cos(30°)
//   len = face width (smaller than r creates breathing gaps)
//   h   = face height
const dims = computed(() => {
  const vw = viewportWidth.value
  // if (vw < 480) return { r: 140, len: 90, h: 80 }
  // if (vw < 768) return { r: 220, len: 150, h: 140 }
  if (vw < 480) return { r: 280, len: 180, h: 160 }
  if (vw < 768) return { r: 440, len: 300, h: 280 }
  // Proportional scaling: r ≈ vw * 0.27, matching 220 at 768px
  const r = Math.min(vw * 0.27, 520)
  const ratio = r / 220
  return { r, len: 150 * ratio, h: 140 * ratio }
})

/** Perspective depth scales with viewport for consistent 3D feel */
const perspective = computed(() => Math.min(dims.value.r * 5, 3000))

/** Reflection height as a fraction of image height */
const REFLECT_RATIO = 0.35
/** Gap between image and reflection (px) */
const REFLECT_GAP = 5

function getFaceStyle(i: number) {
  const { r, len, h } = dims.value
  const a = r * Math.cos(Math.PI / 6) // apothem
  const totalH = h + REFLECT_GAP + h * REFLECT_RATIO
  return {
    transform: `rotateY(${i * 60}deg) translateZ(${a}px)`,
    width: `${len}px`,
    height: `${totalH}px`,
    marginLeft: `${-len / 2}px`,
    marginTop: `${-totalH / 2}px`,
  }
}

/** Index of the face currently at the front (closest to viewer) */
const frontIndex = computed(() => {
  const step = currentAngle.value / 60
  return (6 - (step % 6) + 6) % 6
})

const transitionDuration = ref(600)

function getShortestRotation(targetFaceIndex: number): number {
  const f = frontIndex.value
  const N = (((f - targetFaceIndex) % 6) + 6) % 6 // clockwise steps to bring target to front
  return N > 3 ? N - 6 : N
}

function handleFaceClick(i: number) {
  if (isManualRotating.value) return
  if (i === frontIndex.value) {
    const item = props.items[i]
    if (item) emit('select', item)
    return
  }
  // Non-front face: rotate to bring it to front
  const steps = getShortestRotation(i)
  const angle = steps * 60
  const duration = Math.min(Math.abs(steps), 3) * 400 + 200 // 600/1000/1400ms
  transitionDuration.value = duration
  isManualRotating.value = true
  stopTimer()
  currentAngle.value += angle
}

function onTransitionEnd() {
  if (isManualRotating.value) {
    isManualRotating.value = false
    transitionDuration.value = 600
    startTimer()
  }
}

function rotate() {
  if (isManualRotating.value) return
  currentAngle.value += 60
}

function startTimer() {
  if (timer) return
  timer = setInterval(rotate, 3000)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startTimer()
  if (carouselRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      viewportWidth.value = entry.contentRect.width
    })
    resizeObserver.observe(carouselRef.value)
    viewportWidth.value = carouselRef.value.clientWidth
  }
})

onUnmounted(() => {
  stopTimer()
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div
    ref="carouselRef"
    class="flex items-center justify-center py-6 select-none cursor-pointer"
    :style="{ perspective: `${perspective}px` }"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
  >
    <div
      class="transform-3d relative flex items-center justify-center"
      :style="{ minHeight: `${dims.r * 1.4}px`, minWidth: `${dims.r * 1.4}px` }"
    >
      <div
        class="absolute rounded-full bg-accent/5 blur-3xl pointer-events-none"
        :style="{ width: `${dims.r * 1.4}px`, height: `${dims.r * 0.5}px` }"
      />

      <div
        class="transform-3d absolute left-1/2 top-1/2"
        :style="{
          transform: `translate(-50%, -50%) rotateX(-20deg) rotateY(${currentAngle}deg)`,
          transition: `transform ${transitionDuration}ms ease-out`,
        }"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(item, i) in items"
          :key="item.id"
          class="absolute left-1/2 top-1/2 rounded-xl overflow-hidden shadow-lg transition-[transform,box-shadow] duration-[600ms] ease-out cursor-pointer"
          :class="{
            'shadow-[0_0_20px_8px_rgba(253,121,168,0.25)] brightness-110 ring-2 ring-accent/40':
              i === frontIndex,
          }"
          :style="getFaceStyle(i)"
          @click="handleFaceClick(i)"
        >
          <!-- Main image area -->
          <div class="relative" :style="{ height: dims.h + 'px' }">
            <img
              :src="item.src"
              :alt="item.title"
              class="w-full h-full object-cover"
              draggable="false"
              loading="eager"
            />
            <div
              class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2"
            >
              <p class="text-white text-xs text-center truncate">{{ item.title }}</p>
            </div>
          </div>
          <!-- Gap between image and reflection (water surface) -->
          <div :style="{ height: REFLECT_GAP + 'px' }" />
          <!-- Water reflection area -->
          <div
            class="relative overflow-hidden"
            :style="{ height: Math.round(dims.h * REFLECT_RATIO) + 'px' }"
          >
            <img
              :src="item.src"
              class="w-full object-cover scale-y-[-1] blur-sm"
              :style="{ height: dims.h + 'px' }"
              draggable="false"
              aria-hidden="true"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
