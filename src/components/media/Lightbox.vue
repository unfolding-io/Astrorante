<template>
  <a :href="src" ref="image" aria-label="enlarge image" :class="className" :data-pswp-width="width"
    :data-pswp-height="height" target="_blank" rel="noreferrer">
    <slot />
  </a>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
const lightbox = ref(null);
const image = ref(null);

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
});

const width = props.src.split("/")[5].split("x")[0];
const height = props.src.split("/")[5].split("x")[1];

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: image.value,
      pswpModule: () => import("photoswipe"),
    });
    lightbox.value.init();

    lightbox.value.addFilter(
      "useContentPlaceholder",
      (useContentPlaceholder, content) => {

        return useContentPlaceholder;
      },
    );
  }
});
</script>
