<script setup lang="ts">
import type { IconName } from '@/types/content'

withDefaults(defineProps<{ name: IconName; size?: number; strokeWidth?: number }>(), {
  size: 20,
  strokeWidth: 1.75,
})

const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0Z`

const paths: Record<IconName, string[]> = {
  build: ['m8 7-5 5 5 5', 'm16 7 5 5-5 5', 'm13.5 4.5-3 15'],
  intelligence: [circle(6, 6, 2.5), circle(18, 6, 2.5), circle(12, 18, 2.5), 'M8.5 6h7', 'M7.1 8.2 10.9 15.8', 'M16.9 8.2 13.1 15.8'],
  access: [circle(12, 4.5, 1.5), 'M5 8.5 12 10l7-1.5', 'M12 10v4.5', 'm12 14.5-3 6', 'm12 14.5 3 6'],
  check: ['m5 12.5 4.5 4.5L19 7'],
  'arrow-right': ['M5 12h14', 'm13 6 6 6-6 6'],
  'arrow-up-right': ['M7 17 17 7', 'M8 7h9v9'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  'chevron-down': ['m6 9 6 6 6-6'],
  mail: ['M4.5 5.5h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z', 'm3.5 7 8.5 6 8.5-6'],
  sparkle: ['M11 4.5 12.6 10l5.4 1.5-5.4 1.5L11 18.5 9.4 13 4 11.5 9.4 10 11 4.5Z', 'M18.5 3v4', 'M16.5 5h4'],
  compass: [circle(12, 12, 8.5), 'm15.5 8.5-2 5-5 2 2-5 5-2Z'],
  shield: ['M12 3.5 19 6v5.5c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-2.5Z', 'm9 12 2 2 4-4'],
  globe: [circle(12, 12, 8.5), 'M3.5 12h17', 'M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5Z'],
  phone: ['M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5Z', 'M11 17.5h2'],
  cart: ['M3.5 4.5h2.2l2.1 10.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.8l1.3-6.7H6.4', circle(9.5, 19, 1.25), circle(16.5, 19, 1.25)],
  calendar: ['M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z', 'M4 10h16', 'M8.5 3.5v4', 'M15.5 3.5v4', 'm9.5 15 2 2 3.5-3.5'],
  table: ['M4.5 5h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'M3.5 10h17', 'M3.5 14.5h17', 'M9.5 10v9'],
  users: [circle(9, 8.5, 3), 'M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5', 'M15.5 5.8a3 3 0 0 1 0 5.4', 'M17 14.6c1.9.4 3.1 1.9 3.5 4.4'],
  chat: ['M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4.5 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'M8 9.5h8', 'M8 12.5h5'],
  wrench: ['M14.5 4a4.5 4.5 0 0 0-4.2 6.1L4 16.4 7.6 20l6.3-6.3A4.5 4.5 0 0 0 20 9.5l-2.8 2.8-3-.5-.5-3L16.5 6A4.5 4.5 0 0 0 14.5 4Z'],
  bolt: ['M13 3.5 5.5 13.5H12l-1 7 7.5-10H12l1-7Z'],
  lock: ['M6.5 10.5h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z', 'M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5', 'M12 14.5v2.5'],
  key: [circle(8, 15, 4), 'm11 12 8.5-8.5', 'm16.5 6.5 2.5 2.5', 'm14 9 2 2'],
  activity: ['M3.5 12h4l2.5-6 4 12 2.5-6h4'],
  refresh: ['M19.5 12a7.5 7.5 0 1 1-2.2-5.3', 'M19.5 4.5v4h-4'],
  whatsapp: ['M8 19.4A8.5 8.5 0 1 0 4.6 16l-1.1 4.5Z', 'M11 8.5H9.5V10a4.5 4.5 0 0 0 4.5 4.5h1.5V13'],
  rocket: [
    'M14 4.5c2.8-1 4.9-1 5.5-.5.5.6.5 2.7-.5 5.5-1.2 3.3-4.3 6.6-7.5 8l-3-3c1.4-3.2 4.7-6.3 8-7.5',
    'M9.5 11.5H6l-2 3 4 .5',
    'M12.5 14.5V18l-3 2-.5-4',
    circle(15, 9, 1.5),
  ],
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>
