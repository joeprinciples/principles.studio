<script setup lang="ts">
// Drag-to-compare before/after slider. Pass `before` / `after` image URLs; when
// omitted it shows labelled placeholder panels (ready for real visuals later).
const props = withDefaults(
  defineProps<{
    before?: string;
    after?: string;
    beforeLabel?: string;
    afterLabel?: string;
    alt?: string;
  }>(),
  { before: "", after: "", beforeLabel: "Before", afterLabel: "After", alt: "" }
);

const root = ref<HTMLElement | null>(null);
const pos = ref(50); // percent revealed of the "before" layer
const dragging = ref(false);

function setFromClientX(clientX: number) {
  const el = root.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  pos.value = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
}
function onDown(e: PointerEvent) {
  dragging.value = true;
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  setFromClientX(e.clientX);
}
function onMove(e: PointerEvent) {
  if (dragging.value) setFromClientX(e.clientX);
}
function onUp() {
  dragging.value = false;
}
function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") pos.value = Math.max(0, pos.value - 4);
  if (e.key === "ArrowRight") pos.value = Math.min(100, pos.value + 4);
}

const beforeStyle = computed(() =>
  props.before
    ? { backgroundImage: `url(${props.before})` }
    : {}
);
const afterStyle = computed(() =>
  props.after
    ? { backgroundImage: `url(${props.after})` }
    : {}
);
</script>

<template>
  <div
    ref="root"
    class="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
    role="slider"
    tabindex="0"
    :aria-valuenow="Math.round(pos)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="alt || 'Before and after comparison'"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="onUp"
    @keydown="onKey"
  >
    <!-- After layer (full) -->
    <div class="absolute inset-0 bg-cover bg-center" :style="afterStyle">
      <div
        v-if="!after"
        class="flex h-full items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300"
      >
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">After visual</span>
      </div>
    </div>

    <!-- Before layer (clipped to pos%) -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="[beforeStyle, { clipPath: `inset(0 ${100 - pos}% 0 0)` }]"
    >
      <div
        v-if="!before"
        class="flex h-full items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-400"
      >
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">Before visual</span>
      </div>
    </div>

    <!-- Divider + handle -->
    <div class="pointer-events-none absolute inset-y-0 z-10" :style="{ left: `${pos}%` }">
      <div class="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white"></div>
      <div
        class="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0e0d17] shadow-lg ring-1 ring-black/5"
      >
        <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <!-- Labels -->
    <span class="pointer-events-none absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white">
      {{ beforeLabel }}
    </span>
    <span class="pointer-events-none absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white">
      {{ afterLabel }}
    </span>
  </div>
</template>
