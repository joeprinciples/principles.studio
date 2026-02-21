<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 pt-32 pb-0 sm:pt-48 lg:px-8 lg:pt-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            Singlio
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            A focus training app designed to help strengthen executive function.
            Start a session, tap when you get distracted, and get a detailed
            score showing exactly where your attention held and where it slipped.
          </p>
          <div class="mt-4">
            <span
              class="inline-flex items-center rounded-full bg-[#0e0d17]/60 px-4 py-2 text-sm text-white"
            >
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshots -->
    <section
      class="py-24 sm:py-32 overflow-hidden"
      v-scroll-reveal
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <AppScreenshotSlider
          :images="screenshots"
          alt="Singlio app screenshot"
        />
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="py-24 sm:py-32"
      v-scroll-reveal
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-4xl">
          <h2
            class="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Frequently asked questions
          </h2>
          <dl class="mt-16 divide-y divide-white/10">
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              class="py-8 first:pt-0 last:pb-0"
            >
              <dt>
                <button
                  class="flex w-full items-start justify-between text-left text-white"
                  @click="toggleFaq(index)"
                >
                  <span class="text-lg font-bold sm:text-xl">{{
                    faq.question
                  }}</span>
                  <span class="ml-6 flex h-7 items-center">
                    <Plus
                      v-if="openFaq !== index"
                      class="size-6"
                      aria-hidden="true"
                    />
                    <Minus v-else class="size-6" aria-hidden="true" />
                  </span>
                </button>
              </dt>
              <dd v-if="openFaq === index" class="mt-4 pr-12">
                <p class="text-base/7 text-white/80 sm:text-lg/8">
                  {{ faq.answer }}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Plus, Minus } from "lucide-vue-next";

const screenshots = [
  "/screenshots/singlio/1.jpeg",
  "/screenshots/singlio/2.jpeg",
  "/screenshots/singlio/3.jpeg",
  "/screenshots/singlio/4.jpeg",
  "/screenshots/singlio/5.jpeg",
  "/screenshots/singlio/5b.jpeg",
  "/screenshots/singlio/6.jpeg",
  "/screenshots/singlio/8.jpeg",
  "/screenshots/singlio/9.jpeg",
  "/screenshots/singlio/10.jpeg",
];

const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

const faqs = [
  {
    question: "What is Singlio?",
    answer:
      "Singlio is a focus training app that helps you understand and improve your attention. Start a session, tap the screen when you get distracted, and get a detailed focus score showing where your attention held and where it slipped.",
  },
  {
    question: "How does the scoring work?",
    answer:
      "Your focus score (0\u2013100) is calculated using a multi-factor algorithm that considers distraction clusters, recovery time between interruptions, flow state bonuses, consistency, and your longest uninterrupted streak. It\u2019s not just a count of taps \u2014 it understands the shape of your focus.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All your data stays on your device. Singlio has no accounts, no servers, and no tracking. You can delete everything at any time from within the app.",
  },
  {
    question: "Is Singlio free?",
    answer:
      "Singlio is free on Android. The iOS version is available as a one-time purchase.",
  },
  {
    question: "Does Singlio work offline?",
    answer:
      "Yes. Singlio works entirely offline. No internet connection is needed to run sessions, track progress, or view your history.",
  },
  {
    question: "What are flow states?",
    answer:
      "Flow states are periods of deep, uninterrupted focus. Singlio detects three tiers: Entry flow (10+ minutes uninterrupted), Sustained flow (15+ minutes), and Deep flow (23+ minutes). Each tier earns increasing bonus points on your score.",
  },
];

useHead({
  title: "Singlio \u2014 Focus Training App | first principles",
  meta: [
    {
      name: "description",
      content:
        "Singlio is a focus training app that helps you understand and improve your attention through timed sessions, smart scoring, and flow state detection.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: "Singlio",
            description:
              "A focus training app designed to help strengthen executive function through deliberate practice, minimal distraction, and measurable progress.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
              availability: "https://schema.org/PreOrder",
            },
            author: {
              "@type": "Organization",
              name: "First Principles Studio Ltd",
              url: "https://firstprinciples.studio",
            },
          },
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Singlio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Singlio is a focus training app that helps you understand and improve your attention. Start a session, tap the screen when you get distracted, and get a detailed focus score showing where your attention held and where it slipped.",
                },
              },
              {
                "@type": "Question",
                name: "How does the scoring work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your focus score (0\u2013100) is calculated using a multi-factor algorithm that considers distraction clusters, recovery time between interruptions, flow state bonuses, consistency, and your longest uninterrupted streak.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data private?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All your data stays on your device. Singlio has no accounts, no servers, and no tracking. You can delete everything at any time from within the app.",
                },
              },
              {
                "@type": "Question",
                name: "Is Singlio free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Singlio is free on Android. The iOS version is available as a one-time purchase.",
                },
              },
              {
                "@type": "Question",
                name: "Does Singlio work offline?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Singlio works entirely offline. No internet connection is needed to run sessions, track progress, or view your history.",
                },
              },
              {
                "@type": "Question",
                name: "What are flow states?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Flow states are periods of deep, uninterrupted focus. Singlio detects three tiers: Entry flow (10+ minutes uninterrupted), Sustained flow (15+ minutes), and Deep flow (23+ minutes). Each tier earns increasing bonus points on your score.",
                },
              },
            ],
          },
        ],
      }),
    },
  ],
});
</script>
