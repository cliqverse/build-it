<script setup lang="ts">
import type { PlatformLayer } from '@/types/content'
import { pad } from '@/utils/format'

defineProps<{ layers: PlatformLayer[]; label: string }>()

/*
 * From 640px up, geometry lives in a 100 × 120 viewBox that matches the figure's
 * 5:6 aspect ratio, so SVG coordinates line up with the panels' percentage positions:
 * panel i sits at top = 4% + 35%·i, left = 14%·i, size 72% × 22%.
 * Narrower screens can't fit the copy in fixed-size panels, so the panels stack in
 * normal flow, grow with their text and are joined by short connectors instead.
 */
const wires = [
  { d: 'M26 46.8V31.2', loop: false },
  { d: 'M40 88.8V73.2', loop: false },
  { d: 'M28 102H6V31.2', loop: false },
  { d: 'M72 14H93V60H86', loop: true },
]

const nodes = [
  [26, 46.8],
  [26, 31.2],
  [40, 88.8],
  [40, 73.2],
  [28, 102],
  [6, 31.2],
  [72, 14],
  [86, 60],
] as const
</script>

<template>
  <figure class="diagram" role="img" :aria-label="label">
    <div v-for="(layer, i) in layers" :key="layer.name" class="panel" :style="{ '--i': i }">
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-semibold tracking-eyebrow text-brand-600 uppercase">
          {{ pad(i + 1) }} · {{ layer.tag }}
        </span>
        <span class="size-2 shrink-0 rounded-full bg-brand-600" />
      </div>
      <span class="font-display text-base font-bold tracking-tight text-ink sm:text-xl">
        {{ layer.name }}
      </span>
      <span class="text-xs text-muted sm:text-sm">{{ layer.caption }}</span>
      <span v-if="i < layers.length - 1" class="link" aria-hidden="true" />
    </div>

    <svg class="wires" viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      <path v-for="wire in wires" :key="wire.d" :d="wire.d" class="wire" :class="{ 'wire-loop': wire.loop }" />
      <circle v-for="[cx, cy] in nodes" :key="`${cx}-${cy}`" :cx="cx" :cy="cy" r="1.2" class="node" />
    </svg>
  </figure>
</template>

<style scoped>
.diagram {
  position: relative;
  width: 100%;
  max-width: 32rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.panel {
  position: relative;
  width: 88%;
  margin-left: calc(var(--i) * 6%);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.08),
    0 24px 48px -18px rgb(97 8 230 / 0.65);
}

/* Narrow screens: a line from this panel down into the next one, with a node at each end. */
.link {
  position: absolute;
  top: 100%;
  left: 20%;
  width: 1px;
  height: 2.5rem;
  background-color: color-mix(in oklab, white 35%, transparent);
}

.link::before,
.link::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border: 1.5px solid var(--color-maroon-300);
  border-radius: 9999px;
  background-color: var(--color-ink);
  translate: -50% -50%;
  animation: pulse 2.4s ease-in-out infinite;
}

.link::before {
  top: 0;
}

.link::after {
  top: 100%;
  animation-delay: -1.2s;
}

.wires {
  display: none;
}

@media (width >= 40rem) {
  .diagram {
    display: block;
    aspect-ratio: 5 / 6;
  }

  .panel {
    position: absolute;
    top: calc(4% + var(--i) * 35%);
    left: calc(var(--i) * 14%);
    width: 72%;
    height: 22%;
    margin: 0;
    justify-content: space-between;
    gap: 0;
    padding: clamp(0.75rem, 3.5%, 1.25rem);
  }

  .link {
    display: none;
  }

  .wires {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }
}

.wire {
  fill: none;
  stroke: color-mix(in oklab, white 35%, transparent);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.wire-loop {
  stroke: var(--color-maroon-300);
  stroke-dasharray: 4 4;
  animation: flow 1.6s linear infinite;
}

.node {
  fill: var(--color-ink);
  stroke: var(--color-maroon-300);
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
  transform-box: fill-box;
  transform-origin: center;
  animation: pulse 2.4s ease-in-out infinite;
}

.node:nth-of-type(even) {
  animation-delay: -1.2s;
}

@keyframes pulse {
  50% {
    transform: scale(1.4);
  }
}

@keyframes flow {
  to {
    stroke-dashoffset: -8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wire-loop,
  .node,
  .link::before,
  .link::after {
    animation: none;
  }
}
</style>
