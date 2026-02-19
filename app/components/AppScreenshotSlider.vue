<template>
  <div class="overflow-visible">
    <div ref="sliderRef" class="keen-slider" style="overflow: visible;">
      <div
        v-for="img in images"
        :key="img"
        class="keen-slider__slide"
        :class="slideClass"
      >
        <img
          :src="img"
          :alt="alt"
          class="w-full rounded-3xl shadow-2xl"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    default: "Screenshot",
  },
  wide: {
    type: Boolean,
    default: false,
  },
});

const slideClass = props.wide ? "slide-wide" : "slide-mobile";

const sliderRef = ref(null);
let slider = null;

onMounted(() => {
  if (sliderRef.value) {
    const isMobile = window.innerWidth < 640;
    slider = new KeenSlider(sliderRef.value, {
      loop: false,
      mode: "free-snap",
      slides: {
        perView: "auto",
        spacing: isMobile ? 16 : 48,
      },
      drag: true,
    });
  }
});

onBeforeUnmount(() => {
  if (slider) slider.destroy();
});
</script>

<style scoped>
.slide-mobile {
  min-width: 220px;
  max-width: 260px;
}
@media (min-width: 640px) {
  .slide-mobile {
    min-width: 320px;
    max-width: 380px;
  }
}

.slide-wide {
  min-width: 300px;
  max-width: 400px;
}
@media (min-width: 640px) {
  .slide-wide {
    min-width: 500px;
    max-width: 640px;
  }
}
</style>
