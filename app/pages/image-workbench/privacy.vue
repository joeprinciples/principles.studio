<template>
  <div>
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-48 lg:px-8 lg:pt-56">
        <h1
          class="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl"
        >
          Image Workbench - Privacy Policy
        </h1>
        <p class="mt-4 text-sm text-white/50">Last updated: February 20, 2025</p>

        <div class="mt-12 space-y-10 text-base/7 text-white/80 sm:text-lg/8">
          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">Overview</h2>
            <p class="mt-3">
              Image Workbench is a browser extension built by First Principles
              Studio Ltd. It is designed to run entirely on your device. We do
              not collect, transmit, or store any personal data, images, or
              usage information.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              What the extension does
            </h2>
            <p class="mt-3">
              Image Workbench lets you inspect image metadata and image content,
              with supporting tools such as color inspection and basic
              non-destructive edits. When you right-click an image in your
              browser, the extension fetches that image directly from its
              original source URL into the side panel, using your browser,
              without routing it through any servers. All processing - metadata
              parsing, palette extraction, and image editing - happens locally
              in your browser. No image data is sent to our servers or any
              third-party service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Permissions explained
            </h2>
            <ul class="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong class="text-white">Host permissions (all URLs)</strong>
                - Required so the extension can fetch the image you right-clicked,
                regardless of which website it is hosted on. The extension only
                fetches the specific image you select; it does not read or
                modify page content.
              </li>
              <li>
                <strong class="text-white">Side panel</strong>
                - Used to display the Image Workbench interface alongside your
                browser tabs.
              </li>
              <li>
                <strong class="text-white">Context menus</strong>
                - Adds the "Open in Image Workbench" option when you right-click
                an image.
              </li>
              <li>
                <strong class="text-white">Storage (session only)</strong>
                - Temporarily holds the URL of the image you selected so the
                side panel can load it. This data is cleared when you close
                your browser.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Data collection
            </h2>
            <p class="mt-3">
              Image Workbench collects no data whatsoever. Specifically:
            </p>
            <ul class="mt-3 list-disc pl-5 space-y-2">
              <li>No personal information is collected or stored.</li>
              <li>No images are uploaded, transmitted, or logged.</li>
              <li>No analytics, telemetry, or tracking scripts are included.</li>
              <li>No cookies are set.</li>
              <li>No network requests are made except to fetch the image you selected.</li>
              <li>No data is sold, shared, or used for advertising or profiling.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Third-party services
            </h2>
            <p class="mt-3">
              Image Workbench does not use any third-party services, APIs,
              analytics platforms, or advertising networks.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Changes to this policy
            </h2>
            <p class="mt-3">
              If this policy is updated, the changes will be published at this
              URL with an updated date. The extension will never introduce data
              collection without clearly disclosing it here first.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">Contact</h2>
            <p class="mt-3">
              If you have questions about this privacy policy, contact us at
              <a
                href="mailto:hello@firstprinciples.studio"
                class="text-teal-400 hover:text-teal-300 underline"
              >hello@firstprinciples.studio</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Privacy Policy - Image Workbench | first principles",
  meta: [
    {
      name: "description",
      content:
        "Privacy policy for Image Workbench, a Chrome extension for viewing image metadata and editing photos. No data is collected - everything runs locally in your browser.",
    },
  ],
});
</script>
