<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import type { PlatformLayer } from '@/types/content'
import { pad } from '@/utils/format'

defineProps<{ layers: PlatformLayer[]; label: string; loop: string }>()

/* The travelling packets and flowing loop repeat forever, so they only run while the diagram is on screen. */
const figure = useTemplateRef<HTMLElement>('figure')
const onScreen = ref(true)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!figure.value || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(([entry]) => {
    onScreen.value = entry?.isIntersecting ?? true
  })
  observer.observe(figure.value)
})

onBeforeUnmount(() => observer?.disconnect())

/*
 * From 640px up, geometry lives in a 100 × 120 viewBox that matches the figure's
 * 5:6 aspect ratio, so SVG coordinates line up with the panels' percentage positions:
 * panel i sits at top = 4% + 35%·i, left = 14%·i, size 72% × 22%.
 * Each layer feeds the one above it (Software → Intelligence → Access), and the dashed
 * loop carries what customers teach us back down into the foundation.
 * Narrower screens stack the panels in normal flow, joined by short connectors instead.
 */
const feeds = [
  { x: 40, from: 88.8, to: 73.2 },
  { x: 26, from: 46.8, to: 31.2 },
].map(({ x, from, to }, i) => ({
  key: `${x}`,
  x,
  from,
  wire: `M${x} ${from}V${to + 0.4}`,
  arrow: `M${x - 1.4} ${to + 2} ${x} ${to + 0.4} ${x + 1.4} ${to + 2}`,
  travel: `${to + 3 - from}px`,
  delay: `${i * -1.2}s`,
}))

const loopWire = 'M72 14H94V88.4'
const loopArrow = 'M92.6 86.8 94 88.4 95.4 86.8'
</script>

<template>
  <figure ref="figure" class="diagram" :class="{ 'is-paused': !onScreen }" role="img" :aria-label="label">
    <div v-for="(layer, i) in layers" :key="layer.name" class="panel" :style="{ '--i': i }">
      <IconBadge :icon="layer.icon" size="sm" />
      <div class="min-w-0">
        <span class="block text-[0.6875rem] font-semibold tracking-eyebrow text-brand-600 uppercase sm:text-xs">
          {{ pad(i + 1) }} · {{ layer.tag }}
        </span>
        <span class="mt-1 block font-display text-base font-bold tracking-tight text-ink sm:text-xl">
          {{ layer.name }}
        </span>
        <span class="mt-0.5 block text-xs text-muted sm:text-sm">{{ layer.caption }}</span>
      </div>
      <span v-if="i < layers.length - 1" class="link" aria-hidden="true" />
    </div>

    <svg class="wires" viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      <g v-for="feed in feeds" :key="feed.key">
        <path :d="feed.wire" class="wire" />
        <path :d="feed.arrow" class="wire arrow" />
        <circle :cx="feed.x" :cy="feed.from" r="0.7" class="packet" :style="{ '--travel': feed.travel, animationDelay: feed.delay }" />
        <circle :cx="feed.x" :cy="feed.from" r="1" class="node" />
      </g>
      <path :d="loopWire" class="wire wire-loop" />
      <path :d="loopArrow" class="wire wire-loop-arrow" />
      <circle cx="72" cy="14" r="1" class="node node-loop" />
    </svg>

    <p class="loop">
      <AppIcon name="refresh" :size="14" :stroke-width="2.25" class="shrink-0" />
      <span>{{ loop }}</span>
    </p>
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
  align-items: center;
  gap: 0.875rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
}

/* Narrow screens: a line from the panel below up into this one, with a port at the bottom and an arrow at the top. */
.link {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 20%;
  width: 1px;
  height: 2.5rem;
  background-color: color-mix(in oklab, var(--color-brand-200) 45%, transparent);
}

.link::before {
  content: "";
  position: absolute;
  top: 0.3rem;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-top: 1.5px solid var(--color-brand-200);
  border-left: 1.5px solid var(--color-brand-200);
  translate: -50% 0;
  rotate: 45deg;
}

.link::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border: 1.5px solid var(--color-brand-200);
  border-radius: 9999px;
  background-color: var(--color-ink);
  translate: -50% -50%;
}

.wires {
  display: none;
}

.loop {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
  padding: 0.5rem 1rem;
  border: 1px dashed var(--color-maroon-300);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
  color: var(--color-maroon-200);
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
    gap: 1rem;
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

  /* Sits on the loop's vertical run, masking the dashes behind it, and reads downwards with the flow. */
  .loop {
    position: absolute;
    top: 50%;
    left: 94%;
    flex-direction: column;
    margin: 0;
    padding: 0.75rem 0;
    border: 0;
    border-radius: 0;
    background-color: var(--color-ink);
    translate: -50% -50%;
  }

  .loop span {
    writing-mode: vertical-rl;
  }
}

.wire {
  fill: none;
  stroke: color-mix(in oklab, var(--color-brand-200) 45%, transparent);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.arrow {
  stroke: var(--color-brand-200);
  stroke-width: 1.5;
}

.wire-loop {
  stroke: var(--color-maroon-300);
  stroke-dasharray: 4 4;
  stroke-linecap: butt;
  animation: flow 1.6s linear infinite;
}

.wire-loop-arrow {
  stroke: var(--color-maroon-300);
  stroke-width: 1.5;
}

.node {
  fill: var(--color-ink);
  stroke: var(--color-brand-200);
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}

.node-loop {
  stroke: var(--color-maroon-300);
}

/* A dot that rides each wire upwards: Software into Intelligence, then Intelligence into Access. */
.packet {
  fill: var(--color-brand-200);
  opacity: 0;
  animation: travel 2.4s var(--ease-smooth) infinite;
}

@keyframes travel {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  8%,
  42% {
    opacity: 1;
  }

  50%,
  100% {
    transform: translateY(var(--travel));
    opacity: 0;
  }
}

@keyframes flow {
  to {
    stroke-dashoffset: -8;
  }
}

.is-paused .wire-loop,
.is-paused .packet {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .wire-loop,
  .packet {
    animation: none;
  }
}
</style>
