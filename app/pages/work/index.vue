<script setup lang="ts">
import { ArrowUpRight, ArrowRight } from "lucide-vue-next";
import { caseStudies } from "~/data/work";

definePageMeta({ layout: "light" });

useHead({
  title: "Work, First Principles Studio | Websites, Rebrands & Software",
  meta: [
    {
      name: "description",
      content:
        "Selected work from First Principles Studio: rebrands, high-converting landing pages, PPC, CRMs and custom software for UK businesses, plus our own products, Singlio and ThyroidTools.",
    },
    { name: "robots", content: "index, follow" },
  ],
  script: [
    useBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work/" },
    ]),
  ],
});

const clientStudies = caseStudies.filter((c) => c.kind === "client");
const productStudies = caseStudies.filter((c) => c.kind === "product");
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto max-w-7xl px-6 pt-48 pb-16 lg:px-8 lg:pt-56">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Selected work</p>
    <h1 class="mt-6 text-6xl font-black leading-[0.95] tracking-tight text-mesh sm:text-8xl">
      The work.
    </h1>
    <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
      A cross-section of recent projects: rebrands, sites that need to convert,
      the campaigns that feed them, and the custom software underneath. Open a
      case study to see the involvement, or visit the live site.
    </p>
  </section>

  <!-- Client work -->
  <section class="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
    <h2 class="border-t border-zinc-200 pt-12 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
      Client work
    </h2>
    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <WorkCard v-for="c in clientStudies" :key="c.slug" :study="c" />
    </div>
  </section>

  <!-- Products -->
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <h2 class="border-t border-zinc-200 pt-12 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
      Our own products
    </h2>
    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <WorkCard v-for="c in productStudies" :key="c.slug" :study="c" />
    </div>
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div data-nav-theme="dark" class="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0e0d17] px-8 py-14 sm:flex-row sm:items-center sm:px-16">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Want to be the next one?</h2>
        <p class="mt-2 max-w-md text-white/70">Tell me what you're trying to do and I'll tell you how I'd approach it.</p>
      </div>
      <NuxtLink
        to="/#contact"
        class="inline-flex flex-none items-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-base font-bold text-zinc-950 transition hover:bg-teal-400"
      >
        Start a project <ArrowRight class="size-4" />
      </NuxtLink>
    </div>
  </section>
</template>
