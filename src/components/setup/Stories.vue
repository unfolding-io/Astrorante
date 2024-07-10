<template>
  <div class="relative grid w-full gap-3 rounded-lg text-left">
    <div class="flex items-center gap-3">
      <button class="surface-danger btn-sm" @click="removeStories">
        1. Delete
      </button>
      <button class="surface-success btn-sm" @click="pushStories">
        2. Sync
      </button>
      <button class="btn btn-icon surface-primary ml-auto" @click="pullStories">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.658 7.658 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.158 9.158 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.697 7.697 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.197 9.197 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z" />
        </svg>
      </button>
    </div>

    <div class="text-xs">
      <ul class="flex w-full flex-wrap gap-4 text-left">
        <li v-for="story in stories" :key="story.id"
          class="surface-muted relative min-w-[180px] flex-1 overflow-hidden rounded-lg p-3 shadow-md">
          <div class="text-sm font-thin">
            <div v-if="story?.full_slug" class="truncate text-[10px] uppercase opacity-80">
              {{ story.full_slug }}
            </div>

            <div class="font-bold">{{ story.name }}</div>
            <div class="absolute right-2 top-2 h-2 w-2 rounded-full shadow-sm"
              :class="story.published ? 'bg-green-400' : 'bg-neutral-400'"></div>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="loading" class="absolute -inset-4 z-10 grid place-items-center text-white backdrop-blur-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
        <circle cx="4" cy="12" r="3" fill="currentColor">
          <animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity"
            begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;0.2" />
        </circle>
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4">
          <animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s"
            values="1;0.2" />
        </circle>
        <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3">
          <animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity"
            begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;0.2" />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const stories = ref([]);
const loading = ref(false);

const fetchStories = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/stories/pull");
    if (!response.ok) {
      loading.value = false;
      throw new Error("Failed to fetch stories");
    }
    const data = await response.json();
    stories.value = data;

    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error) {
    loading.value = false;
    console.error("Error fetching stories:", error);
  }
};

// Function to push stories
const pushStories = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/stories/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      loading.value = false;
      throw new Error("Failed to push stories");
    }
    await response.json();
    setTimeout(() => {
      loading.value = false;
      fetchStories();
    }, 5000);
  } catch (error) {
    console.error("Error pushing stories:", error);
    loading.value = false;
  }
};

const removeStories = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/stories/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      loading.value = true;
      throw new Error("Failed to push stories");
    }
    await response.json();
    setTimeout(() => {
      loading.value = false;
      fetchStories();
    }, 1000);

    fetchStories();
  } catch (error) {
    loading.value = false;
    console.error("Error removing stories:", error);
  }
};

// Sync stories function, callable on button click
const pullStories = () => {
  fetchStories();
};

// Fetch stories on story mount
onMounted(() => {
  fetchStories();
});
</script>
