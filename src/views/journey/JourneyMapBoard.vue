<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { JourneyCity } from '@/types'

interface Props {
  cities: JourneyCity[]
}

interface StampCard {
  id: number
  city: JourneyCity
  order: number
  angle: number
  tone: 'rose' | 'gold' | 'violet' | 'sky'
  page: 'left' | 'right'
  rowClass: string
  alignClass: string
  label: string
}

const props = defineProps<Props>()

const STAMP_TONES = [
  {
    wrapper: 'border-[#e8b3c1] bg-[#fff7f9] text-[#b86c84]',
    badge: 'bg-[#f8d9e2] text-[#c66d8c]',
    ring: 'border-[#d97895]',
    fill: 'bg-[#f7c4d3]',
  },
  {
    wrapper: 'border-[#e6c99d] bg-[#fffaf2] text-[#b48b51]',
    badge: 'bg-[#f5e5bf] text-[#c09254]',
    ring: 'border-[#d8ab67]',
    fill: 'bg-[#efd29b]',
  },
  {
    wrapper: 'border-[#d7c4f0] bg-[#fbf8ff] text-[#8668b8]',
    badge: 'bg-[#ebe0fb] text-[#9a79cb]',
    ring: 'border-[#ae8ddd]',
    fill: 'bg-[#d9c3f6]',
  },
  {
    wrapper: 'border-[#bfd7ef] bg-[#f7fbff] text-[#6385ac]',
    badge: 'bg-[#deebf8] text-[#7b9ec5]',
    ring: 'border-[#8db4dc]',
    fill: 'bg-[#c4dcf4]',
  },
] as const

const STAMP_LAYOUTS = [
  { page: 'left', rowClass: 'justify-start', alignClass: 'ml-2', angle: -7 },
  { page: 'left', rowClass: 'justify-end', alignClass: 'mr-10', angle: 5 },
  { page: 'left', rowClass: 'justify-start', alignClass: 'ml-12', angle: -4 },
  { page: 'left', rowClass: 'justify-end', alignClass: 'mr-4', angle: 8 },
  { page: 'left', rowClass: 'justify-start', alignClass: 'ml-6', angle: -8 },
  { page: 'left', rowClass: 'justify-end', alignClass: 'mr-12', angle: 4 },
  { page: 'right', rowClass: 'justify-start', alignClass: 'ml-10', angle: -5 },
  { page: 'right', rowClass: 'justify-end', alignClass: 'mr-2', angle: 7 },
  { page: 'right', rowClass: 'justify-start', alignClass: 'ml-4', angle: -6 },
  { page: 'right', rowClass: 'justify-end', alignClass: 'mr-10', angle: 6 },
  { page: 'right', rowClass: 'justify-start', alignClass: 'ml-12', angle: -4 },
  { page: 'right', rowClass: 'justify-end', alignClass: 'mr-6', angle: 5 },
] as const

const sortedCities = computed(() =>
  [...props.cities].sort((a, b) => {
    const aTime = a.date?.getTime() ?? 0
    const bTime = b.date?.getTime() ?? 0
    return aTime - bTime
  }),
)

const stampCards = computed<StampCard[]>(() =>
  sortedCities.value.map((city, index) => {
    const layout = STAMP_LAYOUTS[index] ?? {
      page: index < Math.ceil(sortedCities.value.length / 2) ? 'left' : 'right',
      rowClass: index % 2 === 0 ? 'justify-start' : 'justify-end',
      alignClass: index % 2 === 0 ? 'ml-6' : 'mr-6',
      angle: index % 2 === 0 ? -5 : 5,
    }
    const toneIndex = index % STAMP_TONES.length

    return {
      id: city.id,
      city,
      order: index + 1,
      angle: layout.angle,
      tone:
        toneIndex === 0 ? 'rose'
        : toneIndex === 1 ? 'gold'
        : toneIndex === 2 ? 'violet'
        : 'sky',
      page: layout.page,
      rowClass: layout.rowClass,
      alignClass: layout.alignClass,
      label: city.date?.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
      }) ?? '待补充',
    }
  }),
)

const leftPageCards = computed(() => stampCards.value.filter((card) => card.page === 'left'))
const rightPageCards = computed(() => stampCards.value.filter((card) => card.page === 'right'))
const latestCard = computed(() => stampCards.value.at(-1) ?? null)
const activeCityId = ref<number | null>(null)

watch(
  latestCard,
  (card) => {
    if (!card) return

    const exists = stampCards.value.some((item) => item.id === activeCityId.value)
    if (!exists) {
      activeCityId.value = card.id
    }
  },
  { immediate: true },
)

const activeCard = computed(
  () => stampCards.value.find((card) => card.id === activeCityId.value) ?? latestCard.value,
)

const recentCards = computed(() => [...stampCards.value].slice(-4).reverse())
const latestCity = computed(() => latestCard.value?.city.name ?? '下一站')

function setActiveCard(id: number): void {
  activeCityId.value = id
}

function getToneClasses(tone: StampCard['tone']) {
  if (tone === 'gold') return STAMP_TONES[1]
  if (tone === 'violet') return STAMP_TONES[2]
  if (tone === 'sky') return STAMP_TONES[3]
  return STAMP_TONES[0]
}
</script>

<template>
  <div class="section-card overflow-hidden rounded-[2rem] p-5 md:p-6">
    <div class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div class="rounded-[1.75rem] bg-white/75 p-4 sm:p-5">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-primary/70">Passport Memory</p>
            <h3 class="mt-2 text-2xl font-semibold text-text">把去过的城市，盖成一本旅行纪念册</h3>
          </div>
          <div class="rounded-full bg-primary/10 px-4 py-2 text-xs tracking-[0.24em] text-primary/80">
            Latest · {{ latestCity }}
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,249,246,0.98),rgba(255,242,238,0.96))] p-4 sm:p-5"
        >
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute left-[8%] top-[12%] h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
            <div class="absolute right-[12%] top-[18%] h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
            <div class="absolute bottom-[10%] left-[18%] h-28 w-28 rounded-full bg-secondary/10 blur-2xl" />
          </div>

          <div
            class="relative z-10 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,247,0.94))] p-4 shadow-[0_20px_60px_rgba(188,95,111,0.08)]"
          >
            <div class="pointer-events-none absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-primary/12 lg:block" />
            <div class="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/8 bg-white/55 blur-sm lg:block" />

            <div class="grid gap-5 lg:grid-cols-2">
              <div class="rounded-[1.25rem] bg-white/68 px-3 py-4">
                <p class="px-2 text-[11px] uppercase tracking-[0.34em] text-primary/55">Passport Page A</p>
                <div class="mt-3 space-y-3">
                  <div
                    v-for="card in leftPageCards"
                    :key="card.id"
                    class="flex"
                    :class="[card.rowClass]"
                  >
                    <button
                      type="button"
                      class="w-[11.5rem] rounded-[1.35rem] border px-4 py-3 text-left transition duration-300 hover:-translate-y-0.5 cursor-pointer"
                      :class="[
                        getToneClasses(card.tone).wrapper,
                        activeCard?.id === card.id ? 'scale-[1.02] shadow-[0_16px_36px_rgba(188,95,111,0.12)]' : 'opacity-92',
                        card.alignClass,
                      ]"
                      :style="{ transform: `rotate(${card.angle}deg)` }"
                      @click="setActiveCard(card.id)"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <span
                          class="rounded-full px-2.5 py-1 text-[11px] tracking-[0.2em]"
                          :class="getToneClasses(card.tone).badge"
                        >
                          第 {{ card.order }} 站
                        </span>
                        <span class="text-[11px] tracking-[0.18em] opacity-80">{{ card.label }}</span>
                      </div>
                      <div class="mt-3 flex items-center gap-3">
                        <span
                          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                          :class="[getToneClasses(card.tone).ring, getToneClasses(card.tone).fill]"
                        >
                          <span class="text-xs font-semibold">{{ card.city.name }}</span>
                        </span>
                        <div>
                          <p class="text-base font-semibold">{{ card.city.name }}</p>
                          <p class="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">{{ card.city.province }}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div class="rounded-[1.25rem] bg-white/68 px-3 py-4">
                <p class="px-2 text-[11px] uppercase tracking-[0.34em] text-primary/55">Passport Page B</p>
                <div class="mt-3 space-y-3">
                  <div
                    v-for="card in rightPageCards"
                    :key="card.id"
                    class="flex"
                    :class="[card.rowClass]"
                  >
                    <button
                      type="button"
                      class="w-[11.5rem] rounded-[1.35rem] border px-4 py-3 text-left transition duration-300 hover:-translate-y-0.5 cursor-pointer"
                      :class="[
                        getToneClasses(card.tone).wrapper,
                        activeCard?.id === card.id ? 'scale-[1.02] shadow-[0_16px_36px_rgba(188,95,111,0.12)]' : 'opacity-92',
                        card.alignClass,
                      ]"
                      :style="{ transform: `rotate(${card.angle}deg)` }"
                      @click="setActiveCard(card.id)"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <span
                          class="rounded-full px-2.5 py-1 text-[11px] tracking-[0.2em]"
                          :class="getToneClasses(card.tone).badge"
                        >
                          第 {{ card.order }} 站
                        </span>
                        <span class="text-[11px] tracking-[0.18em] opacity-80">{{ card.label }}</span>
                      </div>
                      <div class="mt-3 flex items-center gap-3">
                        <span
                          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                          :class="[getToneClasses(card.tone).ring, getToneClasses(card.tone).fill]"
                        >
                          <span class="text-xs font-semibold">{{ card.city.name }}</span>
                        </span>
                        <div>
                          <p class="text-base font-semibold">{{ card.city.name }}</p>
                          <p class="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">{{ card.city.province }}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative z-10 mt-4 rounded-[1.25rem] bg-white/78 px-4 py-4">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.28em] text-primary/70">Current Stamp</p>
                <h4 class="mt-2 text-xl font-semibold text-text">{{ activeCard?.city.name }}</h4>
                <p class="mt-1 text-sm text-text-secondary">{{ activeCard?.city.province }}</p>
              </div>
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs tracking-[0.2em] text-primary/80">
                {{
                  activeCard?.city.date?.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                }}
              </span>
            </div>
            <p class="mt-3 text-sm leading-7 text-text-secondary">
              {{ activeCard?.city.note }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <article
          v-for="card in recentCards"
          :key="card.id"
          class="rounded-[1.5rem] bg-white/75 px-4 py-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-text">{{ card.city.name }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.2em] text-primary/70">{{ card.city.province }}</p>
            </div>
            <span class="rounded-full bg-primary/10 px-3 py-1 text-[11px] tracking-[0.2em] text-primary/80">
              第 {{ card.order }} 站
            </span>
          </div>
          <p class="mt-3 text-sm leading-7 text-text-secondary">{{ card.city.note }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
