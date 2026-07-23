<script setup lang="ts">
import { ArrowUpRight, ArrowRight } from "lucide-vue-next";
import type { CaseStudy } from "~/data/work";

defineProps<{ study: CaseStudy }>();
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 transition hover:border-teal-600/40 hover:shadow-lg hover:shadow-zinc-900/5"
  >
    <NuxtLink :to="`/work/${study.slug}`" class="block">
      <div class="flex aspect-[16/10] items-center justify-center border-b border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200">
        <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Visual coming</span>
      </div>
    </NuxtLink>
    <div class="flex flex-1 flex-col p-7">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">{{ study.category }}</p>
      <h3 class="mt-2 text-2xl font-bold text-[#0e0d17]">
        <NuxtLink :to="`/work/${study.slug}`" class="transition hover:text-teal-700">{{ study.name }}</NuxtLink>
      </h3>
      <p class="mt-2 flex-1 text-base leading-7 text-zinc-600">{{ study.summary }}</p>
      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="t in study.tags"
          :key="t"
          class="rounded-full bg-[#0e0d17]/[0.04] px-3 py-1 text-xs font-medium text-zinc-600"
        >
          {{ t }}
        </span>
      </div>
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <NuxtLink
          :to="`/work/${study.slug}`"
          class="inline-flex items-center gap-1.5 rounded-lg bg-[#0e0d17] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Case study <ArrowRight class="size-4" />
        </NuxtLink>
        <a
          :href="study.url"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 transition hover:text-teal-700"
        >
          Visit site <ArrowUpRight class="size-4" />
        </a>
      </div>
    </div>
  </div>
</template>
