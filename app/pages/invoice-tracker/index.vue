<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 pt-32 pb-0 sm:pt-48 lg:px-8 lg:pt-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            Invoice Tracker
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            A free Chrome extension that tracks your time as you work and turns
            sessions into professional invoices - all from your browser's side
            panel.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a
              href="https://chromewebstore.google.com/detail/invoice-tracker/placeholder"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              Chrome Web Store
            </a>
            <NuxtLink
              to="/invoice-tracker/privacy"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshots -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10">
          <figure
            v-for="shot in screenshots"
            :key="shot.src"
            class="max-w-[890px]"
          >
            <img
              :src="shot.src"
              :alt="shot.caption"
              class="w-full rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <figcaption
              class="mt-3 text-base not-italic text-white/75 sm:text-lg"
            >
              {{ shot.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 sm:py-32" v-scroll-reveal>
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
  {
    src: "/screenshots/invoice-tracker/1.png",
    caption:
      "Track time with a floating overlay on any page. The side panel shows your current session with tasks, durations, domains visited, and a live running total.",
  },
  {
    src: "/screenshots/invoice-tracker/2.png",
    caption:
      "Manage clients with full contact details - name, email, address, and phone. All stored locally in your browser.",
  },
  {
    src: "/screenshots/invoice-tracker/3.png",
    caption:
      "View all your invoices and uninvoiced sessions in one place. Create invoices from tracked sessions or start a blank invoice for ad-hoc work.",
  },
  {
    src: "/screenshots/invoice-tracker/4.png",
    caption:
      "Create invoices with a client picker, auto-calculated line items from your sessions, a date picker, and notes. Hours and amounts are computed automatically.",
  },
  {
    src: "/screenshots/invoice-tracker/5.png",
    caption:
      "Preview and print invoices with your business details, client info, and line items. Save as PDF directly from the print dialog.",
  },
];

const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

const faqs = [
  {
    question: "How does Invoice Tracker work?",
    answer:
      "Click the extension icon to open the side panel, name your task, and start a session. A floating timer overlay appears on the page so you can track time as you browse. Switch tasks, pause, or end the session at any time. When you're done, your tracked sessions are ready to be turned into invoices.",
  },
  {
    question: "Can I create invoices without tracking time?",
    answer:
      "Yes. The \"Create Blank Invoice\" feature lets you add manual line items with custom descriptions, hours, and rates. This is useful for flat-fee projects, retroactive billing, or any work that wasn't tracked live in the extension.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Everything is stored locally in your browser using Chrome's built-in storage API. Your sessions, invoices, client details, and business information never leave your device. There are no accounts, no cloud sync, and no servers involved.",
  },
  {
    question: "Can I print or save invoices as PDF?",
    answer:
      "Yes. Each invoice has a Print / PDF button that opens a formatted invoice in a new window with your business logo, company details, client information, and line items. Use your browser's print dialog to save it as a PDF or send it directly to a printer.",
  },
  {
    question: "What domains and websites does it track?",
    answer:
      "Invoice Tracker records which domains you visit during each task so you can see where your time was spent. This data stays entirely local and is only visible to you in the session view. You can hide or remove domain entries at any time.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Invoice Tracker is completely free to use. There are no accounts, no subscriptions, and no data collection. Everything runs locally in your browser.",
  },
];

useHead({
  title: "Invoice Tracker \u2014 Chrome Extension | first principles",
  meta: [
    {
      name: "description",
      content:
        "A free Chrome extension that tracks your time and turns sessions into professional invoices. Floating timer overlay, task management, client billing, and PDF export - all from your browser's side panel.",
    },
  ],
  script: [
    useProductSchema({
      name: "Invoice Tracker",
      description:
        "A free Chrome extension that tracks your time as you work and turns sessions into professional invoices. Features a floating timer overlay, task switching, domain tracking, client management, and PDF export - all running locally in your browser.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows, macOS, Linux, ChromeOS",
      faqs: [
        { question: "How does Invoice Tracker work?", answer: "Click the extension icon to open the side panel, name your task, and start a session. A floating timer overlay appears on the page so you can track time as you browse. Switch tasks, pause, or end the session at any time. When you're done, your tracked sessions are ready to be turned into invoices." },
        { question: "Can I create invoices without tracking time?", answer: "Yes. The \"Create Blank Invoice\" feature lets you add manual line items with custom descriptions, hours, and rates. This is useful for flat-fee projects, retroactive billing, or any work that wasn't tracked live in the extension." },
        { question: "Where is my data stored?", answer: "Everything is stored locally in your browser using Chrome's built-in storage API. Your sessions, invoices, client details, and business information never leave your device. There are no accounts, no cloud sync, and no servers involved." },
        { question: "Can I print or save invoices as PDF?", answer: "Yes. Each invoice has a Print / PDF button that opens a formatted invoice in a new window with your business logo, company details, client information, and line items. Use your browser's print dialog to save it as a PDF or send it directly to a printer." },
        { question: "What domains and websites does it track?", answer: "Invoice Tracker records which domains you visit during each task so you can see where your time was spent. This data stays entirely local and is only visible to you in the session view. You can hide or remove domain entries at any time." },
        { question: "Is it free?", answer: "Yes. Invoice Tracker is completely free to use. There are no accounts, no subscriptions, and no data collection. Everything runs locally in your browser." },
      ],
    }),
  ],
});
</script>
