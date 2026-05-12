import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(threshold = 0.15) {
  const elements = ref<(HTMLElement | null)[]>([])
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    elements.value.forEach((el) => {
      if (el) {
        el.classList.add('animate-hidden')
        observer?.observe(el)
      }
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  function setElementRef(el: HTMLElement | null, index: number) {
    if (elements.value[index] !== el) {
      elements.value[index] = el
    }
  }

  return { setElementRef }
}
