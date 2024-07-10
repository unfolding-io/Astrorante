<template>
  <div v-intersection-observer="[onIntersectionObserver, { rootMargin }]" :class="`${className} ${isVisible ? 'in-screen' : 'out-of-screen'} ${firstVisible ? 'is-active' : 'is-inactive'
    }`">
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";

import { vIntersectionObserver } from "@vueuse/components";
const isVisible = ref(false);
const rootMargin = "10%";
const firstVisible = ref(false);

function onIntersectionObserver([{ isIntersecting }]) {
  isVisible.value = isIntersecting;
  if (isIntersecting) firstVisible.value = true;
}

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>
<style lang="postcss"></style>
