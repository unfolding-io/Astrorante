<script setup>
import { onMounted } from "vue";
import { loadStoryblokBridge } from "@storyblok/astro";
onMounted(() => {
  loadStoryblokBridge().then(() => {
    const { StoryblokBridge, location } = window;

    const storyblokInstance = new StoryblokBridge({
      /* preventClicks: true, */
    });

    /* storyblokInstance.on(
      ["published", "change", "input"],
      handleStoryblokMessage,
    ); */
    storyblokInstance.on(["published", "change"], (event) => {
      if (!event.slugChanged) {

        location.reload(true);
      }
    });
  });
});
</script>

<template>
  <!-- Storyblok Bridge Loaded-->
</template>
