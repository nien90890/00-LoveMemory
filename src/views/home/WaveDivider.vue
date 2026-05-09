<script setup lang="ts">
</script>

<template>
  <div class="relative w-full overflow-hidden leading-none h-16 md:h-24 -mb-px">
    <svg
      class="absolute bottom-0 w-full h-16 md:h-24"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="wave-layer-1">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(253,121,168,0.04)" />
      </g>
      <g class="wave-layer-2">
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(253,121,168,0.07)" />
      </g>
      <g class="wave-layer-3">
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(253,121,168,0.10)" />
      </g>
      <g class="wave-layer-4">
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(253,121,168,0.15)" />
      </g>
    </svg>
  </div>
</template>
