<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 lg:py-48">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
            UX from first principles
          </p>
          <h1
            class="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-balance text-white sm:text-7xl"
          >
            What do your users actually need?
          </h1>
          <p
            class="mt-8 max-w-2xl text-lg/8 font-regular text-pretty text-white/80 sm:text-xl/9"
          >
            That's the only question I start from. I work out who your customers
            are and how they really behave, then design and build up from there:
            the brand, the site, the software, whatever the need calls for. One
            studio, one point of accountability.
          </p>
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              class="rounded-xl bg-teal-500 px-6 py-3.5 text-base font-bold text-zinc-950 transition hover:bg-teal-400"
            >
              Start a project
            </a>
            <NuxtLink
              to="/work"
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-base font-semibold text-white transition hover:border-teal-400/50 hover:text-teal-300"
            >
              See the work <ArrowRight class="size-4" />
            </NuxtLink>
          </div>
        </div>
        <div
          ref="marqueeRef"
          class="mt-16 max-w-3xl overflow-hidden [--marquee-duration:30s] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div class="flex w-max animate-marquee will-change-transform" :class="{ 'marquee-paused': marqueePaused }">
            <img
              v-for="logo in techLogos"
              :key="logo.alt + '-a'"
              :src="logo.src"
              :alt="logo.alt"
              class="mx-6 h-12 w-auto brightness-0 invert opacity-60"
            />
            <img
              v-for="logo in techLogos"
              :key="logo.alt + '-b'"
              :src="logo.src"
              :alt="logo.alt"
              class="mx-6 h-10 w-auto brightness-0 invert opacity-60"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Services teaser (full detail lives on /services) -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What I can help with
            </h2>
            <p class="mt-4 text-lg text-white/70">
              The brand, the site, the campaigns that drive traffic, and the
              software underneath. Usually split between suppliers, here it's one
              studio.
            </p>
          </div>
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:underline"
          >
            All services <ArrowRight class="size-4" />
          </NuxtLink>
        </div>
        <dl class="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="s in servicesTeaser" :key="s.name" class="relative pl-14">
            <dt class="text-lg font-bold text-white">
              <span class="absolute left-0 top-0 flex size-10 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                <component :is="s.icon" class="size-5 text-teal-400" aria-hidden="true" />
              </span>
              {{ s.name }}
            </dt>
            <dd class="mt-1.5 text-base text-white/70">{{ s.note }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Selected work teaser (full portfolio lives on /work) -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">Selected work</h2>
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:underline"
          >
            All work <ArrowRight class="size-4" />
          </NuxtLink>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="w in workTeaser"
            :key="w.name"
            to="/work"
            class="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-teal-400/40 hover:bg-white/[0.05]"
          >
            <p class="text-xs font-semibold uppercase tracking-wide text-teal-400">{{ w.kind }}</p>
            <h3 class="mt-2 text-xl font-bold text-white group-hover:text-teal-300">{{ w.name }}</h3>
            <p class="mt-2 flex-1 text-sm text-white/60">{{ w.note }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="scroll-mt-24 py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 grid gap-4">
        <h2 class="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Start a project
        </h2>
        <p class="max-w-2xl text-lg font-regular text-pretty text-white/80 sm:text-2xl/9">
          Tell me what you're trying to do and who it's for. I'll tell you what I
          think your users actually need, and how I'd build up from there.
        </p>
        <div class="mt-8 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <!-- Left: Contact Form -->
          <div class="sm:rounded-[2.5rem] rounded-2xl bg-[#0e0d17]/90 shadow-xl p-8 sm:p-10">
            <form @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label for="name" class="block text-base font-semibold text-white">Name</label>
                  <div class="mt-2.5">
                    <input
                      type="text" name="name" id="name" autocomplete="name" required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="email" class="block text-base font-semibold text-white">Email</label>
                  <div class="mt-2.5">
                    <input
                      type="email" name="email" id="email" autocomplete="email" required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="message" class="block text-base font-semibold text-white">Message</label>
                  <div class="mt-2.5">
                    <textarea
                      id="message" name="message" rows="4" required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="mt-10">
                <button
                  type="submit" :disabled="formStatus === 'sending'"
                  class="block w-full rounded-xl bg-teal-500 px-3.5 py-4 text-center text-lg font-bold text-black shadow-sm transition hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50"
                >
                  {{ formStatus === "sending" ? "Sending..." : formStatus === "sent" ? "Sent!" : "Let's talk" }}
                </button>
              </div>
            </form>
          </div>
          <!-- Right: reassurance -->
          <div class="lg:pt-2">
            <h3 class="text-3xl font-bold tracking-tight text-white">How it starts</h3>
            <dl class="mt-8 space-y-8 text-base/7 text-white/80">
              <div v-for="step in intake" :key="step.name" class="relative pl-14">
                <dt class="text-lg font-bold text-white">
                  <span class="absolute left-0 top-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#0e0d17]/90">
                    <component :is="step.icon" class="size-4 text-teal-400" aria-hidden="true" />
                  </span>
                  {{ step.name }}
                </dt>
                <dd>{{ step.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  ArrowRight, Globe, Palette, TrendingUp, Target, Mail, Boxes,
  Ear, Search, Hammer,
} from "lucide-vue-next";

useHead({
  title: "first principles - UX-first Product & Software Studio",
});

const marqueeRef = ref(null);
const marqueePaused = ref(false);
let marqueeObserver = null;

onMounted(() => {
  if (marqueeRef.value) {
    marqueeObserver = new IntersectionObserver(
      ([entry]) => { marqueePaused.value = !entry.isIntersecting; },
      { threshold: 0 }
    );
    marqueeObserver.observe(marqueeRef.value);
  }
});
onBeforeUnmount(() => { marqueeObserver?.disconnect(); });

const formStatus = ref("idle");
async function handleSubmit(e) {
  formStatus.value = "sending";
  const data = new FormData(e.target);
  try {
    const res = await fetch("https://formspree.io/f/mkovbjqz", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      formStatus.value = "sent";
      e.target.reset();
    } else {
      formStatus.value = "idle";
    }
  } catch {
    formStatus.value = "idle";
  }
}

const techLogos = [
  { src: "/vuedotjs.svg", alt: "Vue.js" },
  { src: "/nuxt.svg", alt: "Nuxt" },
  { src: "/react.svg", alt: "React" },
  { src: "/expo.svg", alt: "Expo" },
  { src: "/typescript.svg", alt: "TypeScript" },
  { src: "/tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/figma.svg", alt: "Figma" },
  { src: "/php.svg", alt: "PHP" },
  { src: "/wordpress.svg", alt: "WordPress" },
  { src: "/processwire.svg", alt: "ProcessWire" },
];

const servicesTeaser = [
  { icon: Globe, name: "Websites", note: "New builds and refreshing older sites" },
  { icon: Palette, name: "Branding & rebrands", note: "New brands and rebrands, done fast" },
  { icon: TrendingUp, name: "CRO & usability", note: "Convert more of the traffic you have" },
  { icon: Target, name: "PPC & tracking", note: "Campaigns, landing pages, analytics" },
  { icon: Mail, name: "Email & comms", note: "Marketing and customer comms" },
  { icon: Boxes, name: "Custom software", note: "CRMs, portals, integrations, full apps" },
];

const workTeaser = [
  { kind: "Rebrand", name: "Kress", note: "A ground-up rebrand: logo, brand system and Figma library, through to the live site." },
  { kind: "PPC & landing pages", name: "Greenfields", note: "Campaign landing pages, CRM integration and ongoing paid-search support." },
  { kind: "Product", name: "Singlio", note: "My own focus-training app, live on Google Play." },
];

const intake = [
  { icon: Ear, name: "I listen", description: "You tell me what you're trying to do and who it's for. I ask about your customers before anything else." },
  { icon: Search, name: "I figure out the need", description: "I work out who your users are and how they really behave, then say what I think they actually need." },
  { icon: Hammer, name: "I build around it", description: "Design and development from there, in front of real people, sharpened from how it performs." },
];
</script>
