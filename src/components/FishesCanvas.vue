<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- Types ---
interface FishPoint {
  x: number
  y: number
  previous: FishPoint | null
  next: FishPoint | null
  initHeight: number
  height: number
  fy: number
  force: { previous: number; next: number }
}

interface FishObj {
  direction: boolean
  x: number
  y: number
  previousY: number
  vx: number
  vy: number
  ay: number
  isOut: boolean
  theta: number
  phi: number
}

// --- Responsive rate constants (fraction of canvas size, NOT fixed pixels) ---
// Key: vx = width * rate, so fish takes same proportion of frames to cross
// any screen size. Fixes the bug where fish appear faster on narrow screens.
const VX_RATE_MIN = 0.002 // min vx as fraction of canvas width
const VX_RATE_MAX = 0.004 // max vx as fraction of canvas width
const VY_RATE_MIN = 0.002 // min vy as fraction of canvas height
const VY_RATE_MAX = 0.002 // max vy as fraction of canvas height
const AY_RATE_MIN = 0.0001 // min ay as fraction of canvas height
const AY_RATE_MAX = 0.0001 // max ay as fraction of canvas height
const GRAVITY_RATE = 0.0002 // gravity as fraction of canvas height
const THRESHOLD_RATE = 0.03 // threshold as fraction of canvas width
const POINT_INTERVAL = 5
const MAX_INTERVAL_COUNT = 50
const INIT_HEIGHT_RATE = 0.5
const SPRING_CONSTANT = 0.03
const SPRING_FRICTION = 0.9
const WAVE_SPREAD = 0.3
const ACCELARATION_RATE = 0.03

// --- State ---
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let points: FishPoint[] = []
let fishes: FishObj[] = []
let intervalCount = MAX_INTERVAL_COUNT
let fishCount = 3
let pointInterval = 0
let animId = 0
let resizeObserver: ResizeObserver | null = null
let prefersReducedMotion = false

function getRandomValue(min: number, max: number): number {
  return min + (max - min) * Math.random()
}

function createSurfacePoints() {
  const count = Math.round(width / POINT_INTERVAL)
  pointInterval = width / (count - 1)
  points = []
  const first: FishPoint = {
    x: 0,
    y: 0,
    previous: null,
    next: null,
    initHeight: height * INIT_HEIGHT_RATE,
    height: height * INIT_HEIGHT_RATE,
    fy: 0,
    force: { previous: 0, next: 0 },
  }
  points.push(first)

  for (let i = 1; i < count; i++) {
    const pt: FishPoint = {
      x: i * pointInterval,
      y: 0,
      previous: null,
      next: null,
      initHeight: height * INIT_HEIGHT_RATE,
      height: height * INIT_HEIGHT_RATE,
      fy: 0,
      force: { previous: 0, next: 0 },
    }
    const prev = points[i - 1]!
    pt.previous = prev
    prev.next = pt
    points.push(pt)
  }
}

function initFish(): FishObj {
  const direction = Math.random() < 0.5
  const threshold = width * THRESHOLD_RATE
  const fish: FishObj = {
    direction,
    x: direction ? width + threshold : -threshold,
    y: getRandomValue(height * 0.6, height * 0.85),
    previousY: 0,
    vx: width * getRandomValue(VX_RATE_MIN, VX_RATE_MAX) * (direction ? -1 : 1),
    vy: height * getRandomValue(-VY_RATE_MAX, -VY_RATE_MIN),
    ay: height * getRandomValue(-AY_RATE_MAX, -AY_RATE_MIN),
    isOut: false,
    theta: 0,
    phi: 0,
  }
  return fish
}

function interferePoint(x: number, y: number, velocity: number) {
  const waterSurfaceY = height * INIT_HEIGHT_RATE
  const splashThreshold = height * 0.3
  if (y < waterSurfaceY - splashThreshold || y > waterSurfaceY + splashThreshold) return
  const index = Math.round(x / pointInterval)
  if (index < 0 || index >= points.length) return
  const pt = points[index]!
  pt.fy = height * ACCELARATION_RATE * (height - pt.height - y >= 0 ? -1 : 1) * Math.abs(velocity)
}

function controlStatus() {
  // Match original RENDERER.controlStatus: only updateSelf + updateNeighbors + fish count
  for (const pt of points) {
    pt.fy += SPRING_CONSTANT * (pt.initHeight - pt.height)
    pt.fy *= SPRING_FRICTION
    pt.height += pt.fy
  }

  for (const pt of points) {
    if (pt.previous) pt.force.previous = WAVE_SPREAD * (pt.height - pt.previous.height)
    if (pt.next) pt.force.next = WAVE_SPREAD * (pt.height - pt.next.height)
  }

  const gravity = height * GRAVITY_RATE
  const threshold = width * THRESHOLD_RATE

  for (const fish of fishes) {
    fish.previousY = fish.y
    fish.x += fish.vx
    fish.y += fish.vy
    fish.vy += fish.ay

    if (fish.y < height * INIT_HEIGHT_RATE) {
      fish.vy += gravity
      fish.isOut = true
    } else {
      if (fish.isOut) fish.ay = height * getRandomValue(-AY_RATE_MAX, -AY_RATE_MIN)
      fish.isOut = false
    }

    if (!fish.isOut) {
      fish.theta += Math.PI / 20
      fish.theta %= Math.PI * 2
      fish.phi += Math.PI / 30
      fish.phi %= Math.PI * 2
    }

    interferePoint(fish.x + (fish.direction ? -1 : 1) * threshold, fish.y, fish.y - fish.previousY)

    if ((fish.vx > 0 && fish.x > width + threshold) || (fish.vx < 0 && fish.x < -threshold)) {
      Object.assign(fish, initFish())
    }
  }

  if (fishes.length < fishCount) {
    if (--intervalCount === 0) {
      intervalCount = MAX_INTERVAL_COUNT
      fishes.push(initFish())
    }
  }
}

function renderFish(context: CanvasRenderingContext2D, fish: FishObj) {
  // Scale fish body with canvas width so visual proportion stays consistent
  // Reference: fish body = 70px at 1200px canvas width (5.8% of width)
  const s = width / 1200

  context.save()
  context.translate(fish.x, fish.y)
  context.rotate(Math.PI + Math.atan2(fish.vy, fish.vx))
  context.scale(1, fish.direction ? 1 : -1)

  // Fish body
  context.beginPath()
  context.moveTo(-30 * s, 0)
  context.bezierCurveTo(-20 * s, 15 * s, 15 * s, 10 * s, 40 * s, 0)
  context.bezierCurveTo(15 * s, -10 * s, -20 * s, -15 * s, -30 * s, 0)
  context.closePath()
  context.fill()

  // Tail fin
  context.save()
  context.translate(40 * s, 0)
  context.scale(0.9 + 0.2 * Math.sin(fish.theta), 1)
  context.beginPath()
  context.moveTo(0, 0)
  context.quadraticCurveTo(5 * s, 10 * s, 20 * s, 8 * s)
  context.quadraticCurveTo(12 * s, 5 * s, 10 * s, 0)
  context.quadraticCurveTo(12 * s, -5 * s, 20 * s, -8 * s)
  context.quadraticCurveTo(5 * s, -10 * s, 0, 0)
  context.closePath()
  context.fill()
  context.restore()

  // Dorsal fin
  context.save()
  context.translate(-3 * s, 0)
  context.rotate(Math.PI / 3 + (Math.PI / 10) * Math.sin(fish.phi))
  context.beginPath()
  context.moveTo(-5 * s, 0)
  context.bezierCurveTo(-10 * s, -10 * s, -10 * s, -30 * s, 0, -40 * s)
  context.bezierCurveTo(12 * s, -25 * s, 8 * s, -10 * s, 0, 0)
  context.closePath()
  context.fill()
  context.restore()

  context.restore()
}

function render() {
  if (prefersReducedMotion) return
  animId = requestAnimationFrame(render)
  controlStatus()
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  // Step 1: Water surface first (below fish, normal composite)
  // SURFACE_POINT.render() applies neighbor forces THEN lineTo
  ctx.beginPath()
  ctx.moveTo(0, height)
  for (const pt of points) {
    // Apply neighbor forces like original SURFACE_POINT.render
    if (pt.previous) {
      pt.previous.height += pt.force.previous
      pt.previous.fy += pt.force.previous
    }
    if (pt.next) {
      pt.next.height += pt.force.next
      pt.next.fy += pt.force.next
    }
    ctx.lineTo(pt.x, height - pt.height)
  }
  ctx.lineTo(width, height)
  ctx.closePath()
  ctx.fillStyle = '#f4999c'
  ctx.fill()

  // Step 2: Fish on top of water (normal composite)
  for (const fish of fishes) {
    ctx.fillStyle = fish.isOut ? '#f4999c' : 'rgba(255,255,255,0.6)'
    renderFish(ctx, fish)
  }
}

function setup() {
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return

  width = parent.clientWidth
  height = parent.clientHeight
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)

  fishCount = Math.max(2, Math.round(((3 * width) / 500) * (height / 500)))
  points = []
  fishes = []
  intervalCount = MAX_INTERVAL_COUNT
  createSurfacePoints()
  fishes.push(initFish())
}

function start() {
  if (!canvas) return
  setup()
  render()
}

function stop() {
  if (animId) {
    cancelAnimationFrame(animId)
    animId = 0
  }
}

function handleResize() {
  stop()
  start()
}

onMounted(() => {
  canvas = canvasRef.value
  if (!canvas) return

  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    setup()
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#f3c0c6'
      ctx.fillRect(0, height * 0.5, width, height * 0.5)
    }
    return
  }

  resizeObserver = new ResizeObserver(() => handleResize())
  resizeObserver.observe(canvas.parentElement!)

  start()
})

onUnmounted(() => {
  stop()
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div class="w-full h-full">
    <canvas ref="canvasRef" class="block w-full h-full" />
  </div>
</template>
