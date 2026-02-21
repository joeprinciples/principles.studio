<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8 lg:py-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            Designing & developing user-centred solutions
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            First Principles is an independent studio based in Nottingham,
            working with clients across the UK. We focus on user-centred
            projects that aim to solve real problems clearly and thoughtfully.
          </p>
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

    <!-- Products Section -->
    <section
      id="products"
      class="overflow-hidden py-24 sm:py-32"
      v-scroll-reveal
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center"
        >
          <div class="lg:pr-4 lg:pt-4">
            <div class="max-w-lg grid gap-4">
              <h2
                class="mt-2 text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Products
              </h2>
              <p
                class="max-w-2xl text-lg font-regular text-pretty text-white/80 sm:text-2xl/9"
              >
                We design and build web, mobile, and desktop applications
                in-house. The focus is on simple, usable software that addresses
                real user needs.
              </p>
              <dl
                class="mt-10 max-w-xl space-y-8 text-lg/7 text-white/80 lg:max-w-none"
              >
                <div
                  v-for="product in products"
                  :key="product.name"
                  class="relative pl-10"
                >
                  <dt class="inline font-semibold text-white">
                    <component
                      :is="product.icon"
                      class="absolute left-1 top-1 size-6 text-teal-400"
                      aria-hidden="true"
                    />
                    <NuxtLink
                      v-if="product.to"
                      :to="product.to"
                      class="hover:text-teal-400 transition"
                    >
                      {{ product.name }}
                    </NuxtLink>
                    <template v-else>{{ product.name }}</template>
                  </dt>
                  {{ " " }}
                  <dd class="inline">{{ product.description }}</dd>
                  <dd v-if="product.badge" class="mt-4">
                    <NuxtLink
                      v-if="product.to"
                      :to="product.to"
                      class="inline-flex items-center rounded-full bg-[#0e0d17]/60 px-4 py-2 text-xs text-white hover:bg-teal-500/20 transition"
                    >
                      {{ product.badge }}
                    </NuxtLink>
                    <span
                      v-else
                      class="inline-flex items-center rounded-full bg-[#0e0d17]/60 px-4 py-2 text-xs text-white"
                    >
                      {{ product.badge }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="sm:px-6 lg:px-0">
            <img
              src="/singlio.png"
              alt="Singlio - Focus training app"
              class="w-full rounded-3xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Client Work Section -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 grid gap-4">
        <h2
          class="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Get in touch
        </h2>
        <p
          class="max-w-2xl text-lg font-regular text-pretty text-white/80 sm:text-2xl/9"
        >
          If you're interested in working with us, please get in touch and we'll
          get back to you as soon as possible.
        </p>
        <div class="mt-8 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <!-- Left: Contact Form -->
          <div
            class="sm:rounded-[2.5rem] rounded-2xl bg-[#0e0d17]/90 shadow-xl p-8 sm:p-10"
          >
            <form @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label
                    for="name"
                    class="block text-base font-semibold text-white"
                    >Name</label
                  >
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="name"
                      required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="email"
                    class="block text-base font-semibold text-white"
                    >Email</label
                  >
                  <div class="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autocomplete="email"
                      required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="message"
                    class="block text-base font-semibold text-white"
                    >Message</label
                  >
                  <div class="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      class="block w-full rounded-xl border-2 border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="mt-10">
                <button
                  type="submit"
                  :disabled="formStatus === 'sending'"
                  class="block w-full rounded-xl bg-teal-500 px-3.5 py-4 text-center text-lg font-bold text-black shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 transition disabled:opacity-50"
                >
                  {{
                    formStatus === "sending"
                      ? "Sending..."
                      : formStatus === "sent"
                      ? "Sent!"
                      : "Let's talk"
                  }}
                </button>
              </div>
            </form>
          </div>
          <!-- Right: Services -->
          <div class="lg:pt-2">
            <h3 class="text-3xl font-bold tracking-tight text-white">
              How We Can Help
            </h3>
            <dl class="mt-8 space-y-8 text-base/7 text-white/80">
              <div
                v-for="service in services"
                :key="service.name"
                class="relative pl-14"
              >
                <dt class="font-bold text-lg text-white">
                  <span
                    class="absolute left-0 top-0 flex h-10 w-10 mt-1 items-center justify-center rounded-full bg-[#0e0d17]/90"
                  >
                    <component
                      :is="service.icon"
                      class="size-4 text-teal-400"
                      aria-hidden="true"
                    />
                  </span>
                  {{ service.name }}
                </dt>
                <dd>{{ service.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Focus, ListTodo, Plus, Code, Layers, Zap, Lightbulb } from "lucide-vue-next";

useHead({
  title: "first principles - Independent Product & Software Studio",
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

onBeforeUnmount(() => {
  marqueeObserver?.disconnect();
});

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

const products = [
  {
    name: "Singlio.",
    description:
      "A focus training app designed to help strengthen executive function. Centres on deliberate practice, minimal distraction, and measurable progress.",
    icon: Focus,
    badge: "Learn more",
    to: "/singlio",
  },
  {
    name: "VS Code Extensions.",
    description:
      "Developer tools and editor extensions for managing projects and workflows.",
    icon: ListTodo,
    badge: "Learn more",
    to: "/ai-task-manager",
  },
  {
    name: "More to come.",
    description:
      "We're always working on new tools and products. Stay tuned.",
    icon: Plus,
  },
];

const services = [
  {
    name: "Design & Development",
    description:
      "End-to-end product design, UI/UX, and full-stack development for web and mobile applications.",
    icon: Code,
  },
  {
    name: "Design Systems & Components",
    description:
      "Scalable, consistent foundations - component libraries, design tokens, and documentation.",
    icon: Layers,
  },
  {
    name: "Prototyping & Experimentation",
    description:
      "Rapid prototyping, proof-of-concept builds, and A/B testing to validate ideas fast.",
    icon: Zap,
  },
  {
    name: "Product Strategy & Direction",
    description:
      "Early-stage product thinking, technical direction, and helping shape ideas before they scale.",
    icon: Lightbulb,
  },
];
</script>
