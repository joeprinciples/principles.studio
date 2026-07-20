<template>
  <div class="mesh-gradient fixed inset-0" aria-hidden="true" />
</template>

<script setup>
// Static CSS mesh gradient — no canvas, no WebGL, no rAF loop.
//
// This replaced a 531-line WebGL shader (see git history for the original:
// `git log -- app/components/MeshGradient.vue`). The shader compiled two
// programs, ran an animation loop and a ripple system, and cost ~500ms before
// first paint. The visual payoff did not justify that on a marketing site, so
// the composition is now baked into layered radial-gradients that the
// compositor paints immediately.
//
// Trade-off worth knowing: the shader randomised blob positions per page load
// (`u_seed`), so every visit looked slightly different. This version is fixed.
// If that variety is wanted back, the cheap way is to pick one of N preset
// class names at random — still zero JS on the render path.
</script>

<style scoped>
.mesh-gradient {
  background-color: #0e0d17;
  background-image:
    /* vignette — must stay first so it sits above the colour layers */
    radial-gradient(118% 98% at 46% 46%, transparent 10%, rgba(14, 13, 23, .50) 52%, rgba(14, 13, 23, .94) 84%, #0e0d17 100%),
    /* warm amber / sunset — right */
    radial-gradient(46% 62% at 70% 41%, rgba(210, 126, 68, .55), transparent 70%),
    /* magenta / pink — centre */
    radial-gradient(50% 64% at 47% 45%, rgba(199, 84, 141, .58), transparent 68%),
    /* teal — left */
    radial-gradient(44% 68% at 12% 47%, rgba(26, 150, 138, .60), transparent 68%),
    /* indigo wash — upper left */
    radial-gradient(62% 56% at 26% 6%, rgba(56, 29, 118, .45), transparent 72%),
    /* purple depth — lower centre */
    radial-gradient(58% 46% at 56% 94%, rgba(88, 34, 128, .34), transparent 72%);
}

/* Narrow viewports: pull the blobs inward and lift the vignette a little, so the
   composition still reads as a mesh rather than three stripes down the page. */
@media (max-width: 768px) {
  .mesh-gradient {
    background-image:
      radial-gradient(130% 88% at 50% 44%, transparent 8%, rgba(14, 13, 23, .48) 54%, rgba(14, 13, 23, .93) 86%, #0e0d17 100%),
      radial-gradient(64% 40% at 76% 30%, rgba(210, 126, 68, .52), transparent 70%),
      radial-gradient(72% 42% at 44% 50%, rgba(199, 84, 141, .55), transparent 70%),
      radial-gradient(66% 40% at 10% 62%, rgba(26, 150, 138, .58), transparent 70%),
      radial-gradient(86% 40% at 30% 4%, rgba(56, 29, 118, .45), transparent 74%),
      radial-gradient(80% 34% at 56% 96%, rgba(88, 34, 128, .32), transparent 74%);
  }
}
</style>
