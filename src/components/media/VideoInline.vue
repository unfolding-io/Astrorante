<template>
  <div
    class="pointer-events-auto relative grid h-full w-full grid-cols-1 grid-rows-1 content-center items-center justify-center text-center"
    :class="className">
    <slot />

    <video ref="videoRef" class="lazy pointer-events-none absolute inset-0 z-20 block h-full w-full object-cover"
      autoplay muted loop playsinline preload="true" width="610" height="254">
      <source :data-src="url" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const videoLoaded = ref(false);
    const isVisible = useElementVisibility(videoRef);

    function loadVideo() {
      if (!videoRef.value) return;
      const sources = videoRef.value.children;
      for (let i = 0; i < sources.length; i++) {
        const videoSource = sources[i] as HTMLSourceElement;
        if (videoSource.tagName === "SOURCE") {
          videoSource.src = videoSource.dataset.src || "";
        }
      }

      videoRef.value.load();
      videoRef.value.classList.remove("lazy");
      videoLoaded.value = true;
    }

    onMounted(() => {
      if (
        document.documentElement.dataset.speed &&
        parseInt(document.documentElement.dataset.speed) > 2
      )
        return;
      if (window.scrollY < 100) {
        setTimeout(() => {
          loadVideo();
        }, 1500);
      } else {
        loadVideo();
      }
    });

    watch(
      isVisible,
      (val) => {
        if (!val) {
          if (videoLoaded.value && videoRef.value) {
            videoRef.value.pause();
          }
        } else {
          if (videoLoaded.value && videoRef.value) {
            videoRef.value.play();
          }
        }
      },
      { immediate: true },
    );

    return { videoRef, isVisible };
  },
});
</script>

<style lang="postcss">
.video-inline {
  &:after {
    content: "";
    @apply absolute inset-0 isolate z-20 overflow-hidden rounded-2xl opacity-70;
    mix-blend-mode: overlay;
    filter: url(#noiseFilter);
  }

  video {
    opacity: 1;
    object-fit: cover;
    transition: opacity 0.3s ease;

    &.lazy {
      opacity: 0;
    }
  }
}
</style>
