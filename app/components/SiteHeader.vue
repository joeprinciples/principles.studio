<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <nav
      class="mx-auto flex max-w-7xl items-center px-6 py-6 lg:px-8 lg:py-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="group -m-1.5 flex items-center gap-3 p-1.5">
          <!-- Single glyph mark, recoloured to match the current section:
               near-black on light, white on dark. -->
          <svg
            class="h-9 w-auto transition-colors duration-300"
            :class="isLight ? 'text-[#0e0d17]' : 'text-white'"
            viewBox="0 0 334 369"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M179 0C187.277 0 196.379 0.131199 207.912 3.9668C219.195 7.71945 232.096 14.7571 249.133 27.3496C269.687 42.5419 284.322 53.7951 294.443 61.8066C296.473 63.0584 298.475 64.387 300.436 65.7939C317.409 77.9742 333.491 97.7473 333.989 124.711L334.001 126V215.328C334.001 245.546 320.38 266.633 301.43 279.344C283.551 291.335 262.205 295.135 245.723 295.135H169.302V331C169.302 351.986 152.289 369 131.302 369H66.8809L63.3379 365.305L3.36426 302.756L0.0263672 299.274V294.451C0.0263672 151.249 0.0200768 131.948 0.0136719 125.054C0.0104633 121.6 0.00742288 121.247 0.00488281 110.062L0 30.0723C0.000242233 13.5669 13.3689 0 30 0H179ZM98 65.5488C87.5066 65.5488 79 74.0554 79 84.5488V139.55L80.001 139.549L227.701 139.354C237.089 139.341 244.708 146.937 244.713 156.323C244.718 166.68 244.718 178.384 244.713 188.906H245.712V188.907L244.713 188.906C244.708 198.279 237.111 205.871 227.736 205.879L98.0107 205.985C87.5234 205.994 79.0264 214.498 79.0264 224.985V350H131.302C141.795 350 150.302 341.493 150.302 331V276.135H245.723C259.754 276.135 277.038 272.826 290.846 263.564C304.708 254.267 315.001 239.008 315.001 215.328V126C315.001 106.593 303.617 91.4625 289.358 81.2305C275.115 71.0088 257.838 65.5488 245.696 65.5488H98Z"
              fill="currentColor"
            />
          </svg>
          <span
            class="text-2xl font-extrabold tracking-tight transition-colors duration-500"
            :class="isLight ? 'text-[#0e0d17] group-hover:text-teal-700' : 'text-white group-hover:text-teal-400'"
          >
            first principles
          </span>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-1 sm:gap-2">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="hidden rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-500 sm:inline-flex"
          :class="isLight ? 'text-zinc-600 hover:text-teal-700' : 'text-zinc-300 hover:text-teal-300'"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/clients"
          class="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-500"
          :class="isLight
            ? 'border-zinc-300 text-zinc-800 hover:border-teal-600/50 hover:text-teal-700'
            : 'border-white/15 text-zinc-200 hover:border-teal-400/50 hover:text-teal-300'"
        >
          <LogIn class="size-4" aria-hidden="true" />
          Client Login
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { LogIn } from "lucide-vue-next";

// `theme` is the fallback used before scroll runs and wherever no section
// declares its own theme (dark pages, or the light hero on inverted pages).
const props = defineProps({
  theme: { type: String, default: "dark" },
});

const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

// Scroll-aware theme: whichever [data-nav-theme] section sits under the header
// line wins; otherwise fall back to the layout's theme. Colour transitions on
// the elements above make the swap glide rather than snap.
const scrollTheme = ref(null);
const isLight = computed(() => (scrollTheme.value ?? props.theme) === "light");

onMounted(() => {
  const LINE = 44; // header's vertical mid-line, px from viewport top
  let ticking = false;

  const measure = () => {
    ticking = false;
    let found = null;
    for (const el of document.querySelectorAll("[data-nav-theme]")) {
      const r = el.getBoundingClientRect();
      if (r.top <= LINE && r.bottom >= LINE) found = el.getAttribute("data-nav-theme");
    }
    scrollTheme.value = found;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(measure);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  measure();

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  });
});
</script>
