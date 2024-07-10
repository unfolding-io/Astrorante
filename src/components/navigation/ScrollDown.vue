<template>
  <div class="pointer-events none sticky inset-x-0 bottom-4 -mb-5 -mt-5 flex h-10 items-center justify-end z-40">
    <button aria-label="scroll down or up"
      class="scroll-down btn btn-icon pointer-events-auto m-4 h-10 w-10 text-2xl shadow-md"
      :class="surface || 'surface-secondary'" @click="scrollUpOrDown">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
        class="pointer-events-none transition-all duration-200" viewBox="0 0 24 24">
        <g transform="rotate(-90 12 12)">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M19 12H5.5"></path>
            <path d="M5 12L10 17M5 12L10 7"></path>
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  surface?: string | undefined;
}>();

const scrollUpOrDown = () => {
  window.scrollTo({
    top: window.scrollY >= window.innerHeight / 2 ? 0 : window.innerHeight,
    behavior: "smooth",
  });
};
</script>

<style lang="postcss">
[data-is-hero="false"] {
  .scroll-down svg {
    @apply rotate-180;
  }
}
</style>
