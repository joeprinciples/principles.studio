<script setup lang="ts">
import {
  ArrowRight,
  Globe,
  Palette,
  TrendingUp,
  Target,
  Mail,
  Boxes,
  Compass,
  BarChart3,
  Wrench,
} from "lucide-vue-next";

definePageMeta({ layout: "light" });

useHead({
  title: "About Joe Coulam, First Principles Studio | UX from first principles",
  meta: [
    {
      name: "description",
      content:
        "I'm Joe Coulam. I start every project from what your users actually need, then design and build up from there: UX, brand, websites and custom software for UK businesses.",
    },
    { name: "robots", content: "index, follow" },
  ],
  script: [
    useBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]),
  ],
});

const principles = [
  {
    icon: Compass,
    title: "Start with the need, not the deliverable.",
    body: "I don't begin with a website or a rebrand. I begin with who your users are and what they're really trying to do, then reason the solution up from there. The format follows the need, not the other way round.",
  },
  {
    icon: BarChart3,
    title: "Decisions from evidence, not taste.",
    body: "What I suggest comes from how people actually use your product and what the data shows, not from whatever's in fashion. Opinions are cheap; behaviour is the brief.",
  },
  {
    icon: Wrench,
    title: "Build around purpose and pragmatism.",
    body: "The right answer is the one your users need and one you can realistically run. I get something solid in front of real people, watch how it performs, and sharpen it from there.",
  },
];

const services = [
  { icon: Globe, name: "Websites", note: "New builds and refreshing older sites" },
  { icon: Palette, name: "Branding & rebrands", note: "New brands and rebrands, done fast" },
  { icon: TrendingUp, name: "CRO & usability", note: "Convert more of the traffic you have" },
  { icon: Target, name: "PPC & tracking", note: "Campaigns, landing pages, analytics" },
  { icon: Mail, name: "Email & comms", note: "Marketing and customer comms" },
  { icon: Boxes, name: "Custom software", note: "CRMs, portals, integrations, full apps" },
];
</script>

<template>
  <!-- Inverted hero: light paper, fixed brand gradient through the knockout heading -->
  <section class="mx-auto max-w-7xl px-6 pt-48 pb-20 lg:px-8 lg:pt-56">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
      UX from first principles
    </p>
    <h1
      class="mt-6 max-w-4xl text-6xl font-black leading-[0.95] tracking-tight text-mesh sm:text-8xl"
    >
      Start with what users need.
    </h1>
    <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
      I listen first, then work out who your customers actually are and what they
      need from how they really use things. I design around that: around your
      users, around purpose, around what's pragmatic to build. The brand, the
      website, the software underneath, those are just the output. The work is
      understanding the need and reasoning up from it.
    </p>
    <div class="mt-10 flex flex-wrap items-center gap-4">
      <NuxtLink
        to="/work"
        class="inline-flex items-center gap-2 rounded-xl bg-[#0e0d17] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-teal-700"
      >
        See the work <ArrowRight class="size-4" />
      </NuxtLink>
      <NuxtLink
        to="/#contact"
        class="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-6 py-3.5 text-base font-semibold text-zinc-800 transition hover:border-teal-600/50 hover:text-teal-700"
      >
        Start a project
      </NuxtLink>
    </div>
  </section>

  <!-- The short version -->
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
    <div class="grid gap-10 border-t border-zinc-200 pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">The short version</h2>
      <div class="max-w-2xl space-y-6 text-lg leading-8 text-zinc-700">
        <p>
          First Principles Studio is my independent practice, working with
          businesses across the UK. I'm Joe Coulam. I started it to do the work
          the way I think it should be done: from first principles. Before a pixel
          or a line of code, I want the same answer every time. Who is this for,
          how do they actually use it, and what do they genuinely need.
        </p>
        <p>
          I almost want to say I don't care about websites. I care about making
          what your users need, which is the core of UX. Brand, site, campaigns
          and custom software are how that gets delivered, but they're never the
          starting point. The starting point is your customers and the evidence of
          how they behave. I reason up from there, build around you, and stay
          accountable for whether it actually works.
        </p>
        <p>
          That thinking runs through client work and my own products, like
          <NuxtLink to="/singlio" class="font-semibold text-teal-700 hover:underline">Singlio</NuxtLink>
          and
          <a href="https://thyroidtools.com" target="_blank" rel="noopener" class="font-semibold text-teal-700 hover:underline">ThyroidTools</a>.
        </p>
      </div>
    </div>
  </section>

  <!-- How I work -->
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
    <div class="border-t border-zinc-200 pt-16">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">How I work</h2>
      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        <div
          v-for="p in principles"
          :key="p.title"
          class="rounded-2xl border border-zinc-200 bg-white/60 p-8"
        >
          <div class="flex size-11 items-center justify-center rounded-xl bg-teal-600/10">
            <component :is="p.icon" class="size-5 text-teal-700" aria-hidden="true" />
          </div>
          <h3 class="mt-6 text-lg font-bold text-[#0e0d17]">{{ p.title }}</h3>
          <p class="mt-3 text-base leading-7 text-zinc-600">{{ p.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- What I can help with -->
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
    <div class="border-t border-zinc-200 pt-16">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">What I can help with</h2>
        <NuxtLink to="/services" class="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:underline">
          All services <ArrowRight class="size-4" />
        </NuxtLink>
      </div>
      <dl class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="s in services" :key="s.name" class="relative pl-12">
          <dt class="text-base font-bold text-[#0e0d17]">
            <span class="absolute left-0 top-0.5 flex size-8 items-center justify-center rounded-lg bg-[#0e0d17]">
              <component :is="s.icon" class="size-4 text-teal-400" aria-hidden="true" />
            </span>
            {{ s.name }}
          </dt>
          <dd class="mt-1 text-sm text-zinc-600">{{ s.note }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- Reveal: hard edge into the actual background the knockout letters showed -->
  <section
    data-nav-theme="dark"
    class="reveal-bg relative mt-16 overflow-hidden text-white"
  >
    <div class="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
      <h2 class="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
        Everything starts with what your users need.
      </h2>
      <p class="mt-6 max-w-xl text-lg leading-8 text-white/75">
        Tell me what you're trying to do and who it's for. I'll tell you what I
        think your users actually need, and how I'd build up from there.
      </p>
      <NuxtLink
        to="/#contact"
        class="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-[#0e0d17] transition hover:bg-teal-300"
      >
        Start with the problem <ArrowRight class="size-4" />
      </NuxtLink>
    </div>
  </section>
</template>
