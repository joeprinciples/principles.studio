<script setup lang="ts">
import {
  ArrowRight,
  Globe,
  Palette,
  TrendingUp,
  Target,
  Mail,
  Boxes,
} from "lucide-vue-next";

definePageMeta({ layout: "light" });

useHead({
  title: "Services,Websites, Branding, CRO, PPC & Custom Software | First Principles",
  meta: [
    {
      name: "description",
      content:
        "What First Principles Studio offers UK businesses: websites and rebrands, conversion optimisation and usability, PPC and tracking, email and comms, and custom software, from one accountable studio.",
    },
    { name: "robots", content: "index, follow" },
  ],
  script: [
    useBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/" },
    ]),
    useServicesSchema([
      { name: "Websites", description: "New builds and redesigns of existing sites, built to convert." },
      { name: "Branding & rebrands", description: "New brands and rebrands: logo, guidelines and a design system." },
      { name: "CRO & usability", description: "Conversion-rate optimisation and usability reviews." },
      { name: "PPC & tracking", description: "Paid campaigns, landing pages and conversion tracking." },
      { name: "Email & comms", description: "Email marketing and customer communications." },
      { name: "Custom software", description: "CRMs, portals, integrations and full web and mobile apps." },
    ]),
  ],
});

const services = [
  {
    icon: Globe,
    name: "Websites",
    lead: "New builds, and new life for tired ones.",
    body: "Fast, accessible sites that are built to convert, whether that's a fresh build or a redesign of something that's stopped pulling its weight. Comfortable across WordPress, ProcessWire and modern JavaScript (Nuxt / Vue).",
    includes: ["New site builds", "Redesigns & refreshes", "Speed & accessibility", "CMS setup"],
  },
  {
    icon: Palette,
    name: "Branding & rebrands",
    lead: "A proper identity, quickly and effectively.",
    body: "New brands from scratch and full rebrands: logo, guidelines, colour and type, and a design system your site and materials can actually be built from. Delivered fast, without the six-week agency runaround.",
    includes: ["Logo & identity", "Brand guidelines", "Design systems", "Figma libraries"],
  },
  {
    icon: TrendingUp,
    name: "CRO & usability",
    lead: "Get more from the traffic you already have.",
    body: "Conversion-rate optimisation and clear-headed usability reviews. I find where visitors hesitate, drop out or get confused, and fix the journey, from first impression through to checkout.",
    includes: ["Usability audits & reports", "Funnel & checkout UX", "A/B testing", "Landing-page optimisation"],
  },
  {
    icon: Target,
    name: "PPC & tracking",
    lead: "Campaigns that pay their way, and prove it.",
    body: "Paid search and social campaigns, the landing pages behind them, and the conversion tracking and analytics that show what's actually working, so budget goes where it earns.",
    includes: ["Campaign setup & management", "Conversion landing pages", "Conversion tracking", "Analytics (GA4 & more)"],
  },
  {
    icon: Mail,
    name: "Email & comms",
    lead: "Stay in front of the people who already know you.",
    body: "Email marketing and customer communications, from one-off campaigns to automated sequences, written and built to sound like you and drive a response.",
    includes: ["Email campaigns", "Automations & sequences", "Templates", "Customer comms"],
  },
  {
    icon: Boxes,
    name: "Custom software",
    lead: "When off-the-shelf won't cut it.",
    body: "CRMs, secure client portals, integrations and full web and mobile applications, including SaaS platforms, built and hosted properly. If your business needs a system that doesn't exist yet, I build it.",
    includes: ["CRMs & internal tools", "Client portals", "Integrations & APIs", "Web & mobile apps"],
  },
];
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto max-w-7xl px-6 pt-48 pb-16 lg:px-8 lg:pt-56">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">What I do</p>
    <h1 class="mt-6 text-6xl font-black leading-[0.95] tracking-tight text-mesh sm:text-8xl">
      Services.
    </h1>
    <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
      The brand, the site, the campaigns that drive traffic, and the software
      underneath, usually split between three or four suppliers. Here it's one
      studio, one point of accountability.
    </p>
  </section>

  <!-- Services -->
  <section class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="border-t border-zinc-200">
      <article
        v-for="s in services"
        :key="s.name"
        class="grid gap-6 border-b border-zinc-200 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <div class="flex size-12 items-center justify-center rounded-xl bg-[#0e0d17]">
            <component :is="s.icon" class="size-6 text-teal-400" aria-hidden="true" />
          </div>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-[#0e0d17]">{{ s.name }}</h2>
          <p class="mt-2 text-lg font-medium text-teal-700">{{ s.lead }}</p>
        </div>
        <div>
          <p class="text-lg leading-8 text-zinc-700">{{ s.body }}</p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="i in s.includes"
              :key="i"
              class="rounded-full border border-zinc-200 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-zinc-700"
            >
              {{ i }}
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div data-nav-theme="dark" class="overflow-hidden rounded-3xl bg-[#0e0d17] px-8 py-16 sm:px-16 sm:py-20">
      <h2 class="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Not sure which of these you need?
      </h2>
      <p class="mt-4 max-w-xl text-lg leading-8 text-white/70">
        That's fine, most projects are a mix. Tell me what you're trying to
        achieve and I'll suggest the shortest route to it.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <NuxtLink
          to="/#contact"
          class="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-base font-bold text-zinc-950 transition hover:bg-teal-400"
        >
          Start a project <ArrowRight class="size-4" />
        </NuxtLink>
        <NuxtLink
          to="/work"
          class="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition hover:border-teal-400/60 hover:text-teal-300"
        >
          See the work
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
