<script setup lang="ts">
import { ArrowUpRight, ArrowLeft, ArrowRight, Check } from "lucide-vue-next";
import { getCaseStudy } from "~/data/work";

definePageMeta({ layout: "light" });

const route = useRoute();
const study = getCaseStudy(String(route.params.slug));
if (!study) {
  throw createError({ statusCode: 404, statusMessage: "Case study not found" });
}

useHead({
  title: `${study.name}, ${study.category} | First Principles Studio`,
  meta: [
    { name: "description", content: study.summary },
    { name: "robots", content: "index, follow" },
  ],
  script: [
    useBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work/" },
      { name: study.name, path: `/work/${study.slug}/` },
    ]),
  ],
});
</script>

<template>
  <article v-if="study">
    <!-- Hero -->
    <section class="mx-auto max-w-5xl px-6 pt-40 pb-12 lg:px-8 lg:pt-48">
      <NuxtLink to="/work" class="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition hover:text-teal-700">
        <ArrowLeft class="size-4" /> All work
      </NuxtLink>
      <p class="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{{ study.category }}</p>
      <h1 class="mt-4 text-6xl font-black leading-[0.95] tracking-tight text-mesh sm:text-7xl">
        {{ study.name }}
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">{{ study.intro }}</p>
      <a
        :href="study.url"
        target="_blank"
        rel="noopener"
        class="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0e0d17] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Visit {{ study.urlLabel }} <ArrowUpRight class="size-4" />
      </a>
    </section>

    <!-- Lead visual: drag-to-compare for a rebrand, else a placeholder frame -->
    <section class="mx-auto max-w-5xl px-6 lg:px-8">
      <BeforeAfterSlider
        v-if="study.beforeAfter"
        before-label="Before"
        after-label="After"
        :alt="`${study.name} before and after`"
      />
      <div
        v-else
        class="flex aspect-[16/9] items-center justify-center rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200"
      >
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Lead visual coming</span>
      </div>
    </section>

    <!-- The work + meta -->
    <section class="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <h2 class="text-2xl font-bold text-[#0e0d17]">The work</h2>
          <div class="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
            <p v-for="(para, i) in study.work" :key="i">{{ para }}</p>
          </div>
        </div>
        <aside class="lg:pt-1">
          <div class="rounded-2xl border border-zinc-200 bg-white/60 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Role</p>
            <p class="mt-1.5 font-semibold text-[#0e0d17]">{{ study.role }}</p>
            <p class="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">What's involved</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="t in study.tags" :key="t" class="flex items-center gap-2 text-sm text-zinc-700">
                <Check class="size-4 flex-none text-teal-600" /> {{ t }}
              </li>
            </ul>
            <a
              :href="study.url"
              target="_blank"
              rel="noopener"
              class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:underline"
            >
              Visit {{ study.urlLabel }} <ArrowUpRight class="size-4" />
            </a>
          </div>
        </aside>
      </div>

      <!-- Visuals gallery (placeholders) -->
      <div class="mt-14 grid gap-6 sm:grid-cols-2">
        <div
          v-for="n in study.visuals"
          :key="n"
          class="flex aspect-[16/10] items-center justify-center rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200"
        >
          <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Visual coming</span>
        </div>
      </div>
    </section>

    <!-- CTA reveal -->
    <section data-nav-theme="dark" class="reveal-bg relative mt-8 overflow-hidden text-white">
      <div class="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
        <h2 class="max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Want something like this?</h2>
        <p class="mt-4 max-w-xl text-lg text-white/75">
          Tell me what you're trying to do and who it's for, and I'll tell you how
          I'd approach it.
        </p>
        <NuxtLink
          to="/#contact"
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-[#0e0d17] transition hover:bg-teal-300"
        >
          Start a project <ArrowRight class="size-4" />
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
