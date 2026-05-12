<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

interface Props {
  delay?: number
  duration?: number
  initialDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 200,
  duration: 600,
  initialDelay: 0,
})

const containerRef = useTemplateRef<HTMLElement>('containerRef')
let applied = false

onMounted(() => {
  const children = containerRef.value?.children
  if (!children || children.length === 0) return
  applied = true
  Array.from(children).forEach((child, i) => {
    const el = child as HTMLElement
    el.style.animation = `fadeInUp ${props.duration}ms ease-out both`
    el.style.animationDelay = `${props.initialDelay + i * props.delay}ms`
  })
})

onUnmounted(() => {
  if (!applied) return
  const children = containerRef.value?.children
  if (!children) return
  Array.from(children).forEach((child) => {
    const el = child as HTMLElement
    el.style.animation = ''
    el.style.animationDelay = ''
  })
})
</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
