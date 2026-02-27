<template>
  <div>
    <div class="relative isolate pt-14">
      <div class="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-48 lg:px-8 lg:pt-56">
        <h1
          class="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl"
        >
          Invoice Tracker - Privacy Policy
        </h1>
        <p class="mt-4 text-sm text-white/50">Last updated: February 27, 2026</p>

        <div class="mt-12 space-y-10 text-base/7 text-white/80 sm:text-lg/8">
          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">Overview</h2>
            <p class="mt-3">
              Invoice Tracker is a browser extension built by First Principles
              Studio Ltd. It is designed to run entirely on your device. We do
              not collect, transmit, or store any personal data, session
              recordings, or usage information.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              What the extension does
            </h2>
            <p class="mt-3">
              Invoice Tracker lets you track time spent on tasks directly in your
              browser. It displays a floating timer overlay on web pages, records
              which domains you visit during each task, and lets you create
              professional invoices from your tracked sessions. All data -
              sessions, invoices, client details, and business information - is
              stored locally on your device using Chrome's built-in storage API.
              Nothing is sent to any external server.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Permissions explained
            </h2>
            <ul class="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong class="text-white">Host permissions (all URLs)</strong>
                - Required so the extension can inject the floating timer overlay
                onto any web page you visit. The overlay is a small, draggable
                widget that shows your running timer. The extension also records
                the domain of pages you visit during a task for time attribution.
              </li>
              <li>
                <strong class="text-white">Side panel</strong>
                - Used to display the Invoice Tracker interface alongside your
                browser tabs, where you manage sessions, invoices, and settings.
              </li>
              <li>
                <strong class="text-white">Storage</strong>
                - Stores your sessions, invoices, client details, business
                information, and settings locally on your device. This data
                persists between browser sessions and is never transmitted
                externally.
              </li>
              <li>
                <strong class="text-white">Active tab</strong>
                - Used to detect which tab is currently active so the timer
                overlay can be displayed on the correct page.
              </li>
              <li>
                <strong class="text-white">Tabs</strong>
                - Allows the extension to inject the timer overlay into existing
                tabs when the extension is first installed or when the browser
                restarts with a session in progress.
              </li>
              <li>
                <strong class="text-white">Scripting</strong>
                - Used to programmatically inject the timer overlay content
                script into web pages.
              </li>
              <li>
                <strong class="text-white">Context menus</strong>
                - Adds a right-click menu option for quickly starting a timer
                session.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Data collection
            </h2>
            <p class="mt-3">
              Invoice Tracker collects no data whatsoever. Specifically:
            </p>
            <ul class="mt-3 list-disc pl-5 space-y-2">
              <li>No personal information is collected or stored on any server.</li>
              <li>No session data, time records, or invoices are uploaded or transmitted.</li>
              <li>No analytics, telemetry, or tracking scripts are included.</li>
              <li>No cookies are set.</li>
              <li>No network requests are made to our servers or any third-party service.</li>
              <li>No data is sold, shared, or used for advertising or profiling.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Domain tracking
            </h2>
            <p class="mt-3">
              During an active session, Invoice Tracker records the domain names
              of websites you visit (e.g. "google.com") to help you see where
              your time was spent. This information is stored locally on your
              device alongside your session data. It is never transmitted
              externally. You can hide or remove domain entries from the session
              view at any time.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Third-party services
            </h2>
            <p class="mt-3">
              Invoice Tracker does not use any third-party services, APIs,
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
                href="mailto:joe@principles.studio"
                class="text-teal-400 hover:text-teal-300 underline"
              >joe@principles.studio</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Privacy Policy - Invoice Tracker | first principles",
  meta: [
    {
      name: "description",
      content:
        "Privacy policy for Invoice Tracker, a Chrome extension for time tracking and invoicing. No data is collected - everything runs locally in your browser.",
    },
  ],
});
</script>
