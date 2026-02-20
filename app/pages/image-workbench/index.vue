<template>
  <div>
    <!-- Hero -->
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-7xl px-6 pt-32 pb-0 sm:pt-48 lg:px-8 lg:pt-56">
        <div class="max-w-4xl grid gap-4">
          <h1
            class="text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-7xl"
          >
            Image Workbench
          </h1>
          <p
            class="max-w-2xl text-lg/7 font-regular text-pretty text-white/80 sm:text-2xl/9"
          >
            A free Chrome extension for viewing image metadata, detecting
            AI-generated images, extracting color palettes, and editing photos -
            all from your browser's side panel.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a
              href="https://chromewebstore.google.com/detail/image-workbench/placeholder"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              Chrome Web Store
            </a>
            <NuxtLink
              to="/image-workbench/privacy"
              class="inline-flex items-center rounded-full bg-black px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-teal-500/20 transition"
            >
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshots -->
    <section class="py-24 sm:py-32" data-aos="fade-up" data-aos-duration="600">
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
    <section class="py-24 sm:py-32" data-aos="fade-up" data-aos-duration="600">
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
    src: "/screenshots/image-workbench/1.jpg",
    caption:
      "View EXIF data, AI generation metadata, and C2PA Content Credentials for any image - right from your browser.",
  },
  {
    src: "/screenshots/image-workbench/2.jpg",
    caption:
      "Use the eyedropper to sample any color, then copy its HEX or RGB value instantly.",
  },
  {
    src: "/screenshots/image-workbench/3.jpg",
    caption:
      "Extract full color palettes from images and export them as PNG, PAL, ASE, GPL, HEX, or JSON.",
  },
  {
    src: "/screenshots/image-workbench/4.jpg",
    caption:
      "Crop, rotate, flip, scale, and sharpen images with a non-destructive editor - undo any step.",
  },
  {
    src: "/screenshots/image-workbench/5.jpg",
    caption:
      "Adjust brightness, contrast, saturation, and hue. Apply sepia, grayscale, or invert with one click.",
  },
];

const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

const faqs = [
  {
    question: "Can you tell if an image is AI-generated?",
    answer:
      "Sometimes, yes. Many AI generators \u2014 including ChatGPT, DALL\u00B7E, Adobe Firefly, and Midjourney \u2014 embed metadata that identifies the image as AI-generated. This can include C2PA Content Credentials, which record the creator tool, model used, and a digital signature chain. Image Workbench reads this data automatically and displays it in a clear, readable format. However, not all AI tools embed metadata, and metadata can be stripped when images are shared on social media or messaging apps.",
  },
  {
    question: "How do I strip metadata from an image?",
    answer:
      "Open any image in Image Workbench, go to the Metadata tab, and click the Strip button. This removes all EXIF, IPTC, XMP, and C2PA data from the image, giving you a clean file with no embedded information. The stripped image can then be downloaded directly. This is useful for protecting your privacy before sharing photos online, as metadata can contain your camera model, GPS location, timestamps, and software details.",
  },
  {
    question: "What is metadata in an image?",
    answer:
      "Image metadata is hidden information embedded inside a photo file. EXIF data records camera settings like aperture, shutter speed, ISO, and sometimes GPS coordinates. IPTC and XMP fields store copyright, captions, and keywords. C2PA Content Credentials are a newer standard that records the full creation history of an image \u2014 which tool made it, what edits were applied, and whether AI was involved. Most of this data is invisible when you view the image normally, but Image Workbench surfaces all of it.",
  },
  {
    question: "What is Image Workbench?",
    answer:
      "Image Workbench is a free Chrome extension that opens as a browser side panel. Right-click any image on the web to inspect its metadata, extract colors, or edit it. It handles EXIF, IPTC, XMP, and C2PA parsing, supports AI-specific metadata from tools like Stable Diffusion, ComfyUI, and Midjourney, and includes a color picker, palette extractor, and a non-destructive image editor with crop, rotate, resize, and color adjustments.",
  },
  {
    question: "Which AI generators does it detect?",
    answer:
      "Image Workbench can identify metadata from ChatGPT/DALL\u00B7E, Adobe Firefly, Midjourney, Stable Diffusion (A1111/Forge), ComfyUI, InvokeAI, Fooocus, SwarmUI, EasyDiffusion, Draw Things, and other tools that embed C2PA Content Credentials or generation parameters. It reads PNG text chunks, EXIF UserComment fields, and JUMBF/CBOR-encoded C2PA manifests.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Image Workbench is completely free to use. There are no accounts, no subscriptions, and no data collection. Everything runs locally in your browser \u2014 your images are never uploaded to any server.",
  },
];

useHead({
  title: "Image Workbench \u2014 Chrome Extension | first principles",
  meta: [
    {
      name: "description",
      content:
        "A free Chrome extension for viewing image metadata, detecting AI-generated images, extracting color palettes, and editing photos. Reads EXIF, C2PA, and AI generation data from any image.",
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
            name: "Image Workbench",
            description:
              "A free Chrome extension for viewing image metadata, detecting AI-generated images, extracting color palettes, and editing photos. Reads EXIF, IPTC, XMP, and C2PA Content Credentials from any image.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Windows, macOS, Linux, ChromeOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
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
                name: "Can you tell if an image is AI-generated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sometimes, yes. Many AI generators \u2014 including ChatGPT, DALL\u00B7E, Adobe Firefly, and Midjourney \u2014 embed metadata that identifies the image as AI-generated. This can include C2PA Content Credentials, which record the creator tool, model used, and a digital signature chain. Image Workbench reads this data automatically and displays it in a clear, readable format. However, not all AI tools embed metadata, and metadata can be stripped when images are shared on social media or messaging apps.",
                },
              },
              {
                "@type": "Question",
                name: "How do I strip metadata from an image?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Open any image in Image Workbench, go to the Metadata tab, and click the Strip button. This removes all EXIF, IPTC, XMP, and C2PA data from the image, giving you a clean file with no embedded information. The stripped image can then be downloaded directly.",
                },
              },
              {
                "@type": "Question",
                name: "What is metadata in an image?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Image metadata is hidden information embedded inside a photo file. EXIF data records camera settings like aperture, shutter speed, ISO, and sometimes GPS coordinates. IPTC and XMP fields store copyright, captions, and keywords. C2PA Content Credentials are a newer standard that records the full creation history of an image \u2014 which tool made it, what edits were applied, and whether AI was involved.",
                },
              },
              {
                "@type": "Question",
                name: "What is Image Workbench?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Image Workbench is a free Chrome extension that opens as a browser side panel. Right-click any image on the web to inspect its metadata, extract colors, or edit it. It handles EXIF, IPTC, XMP, and C2PA parsing, supports AI-specific metadata from tools like Stable Diffusion, ComfyUI, and Midjourney, and includes a color picker, palette extractor, and a non-destructive image editor.",
                },
              },
              {
                "@type": "Question",
                name: "Which AI generators does it detect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Image Workbench can identify metadata from ChatGPT/DALL\u00B7E, Adobe Firefly, Midjourney, Stable Diffusion (A1111/Forge), ComfyUI, InvokeAI, Fooocus, SwarmUI, EasyDiffusion, Draw Things, and other tools that embed C2PA Content Credentials or generation parameters.",
                },
              },
              {
                "@type": "Question",
                name: "Is it free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Image Workbench is completely free to use. There are no accounts, no subscriptions, and no data collection. Everything runs locally in your browser.",
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
