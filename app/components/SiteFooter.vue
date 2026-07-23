<template>
  <footer class="sm:mt-32 flex-none">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="pb-16 pt-10" :class="isLight ? 'border-t border-zinc-200' : ''">
        <div
          class="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center"
        >
          <p class="text-sm" :class="isLight ? 'text-zinc-500' : 'text-white/60'">
            &copy; {{ new Date().getFullYear() }} First Principles Studio Ltd.
            All rights reserved.
          </p>
          <p class="text-sm" :class="isLight ? 'text-zinc-500' : 'text-white/60'">
            Company number 16962497
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  theme: { type: String, default: "dark" },
});
const isLight = computed(() => props.theme === "light");
</script>
