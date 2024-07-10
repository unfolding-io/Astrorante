<template>
  <div class="rounded-lgs relative grid w-full gap-3 text-left">
    <div class="flex items-center gap-3">
      <button class="surface-danger btn-sm" @click="removeComponents">
        1. Delete
      </button>
      <button class="surface-success btn-sm" @click="pushComponents">
        2. Sync
        {{ success ? "✅" : "⚠️" }}
      </button>

      <button class="btn btn-icon surface-primary ml-auto" @click="pullComponents">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12.079 2.25c-4.794 0-8.734 3.663-9.118 8.333H2a.75.75 0 0 0-.528 1.283l1.68 1.666a.75.75 0 0 0 1.056 0l1.68-1.666a.75.75 0 0 0-.528-1.283h-.893c.38-3.831 3.638-6.833 7.612-6.833a7.658 7.658 0 0 1 6.537 3.643a.75.75 0 1 0 1.277-.786A9.158 9.158 0 0 0 12.08 2.25m8.761 8.217a.75.75 0 0 0-1.054 0L18.1 12.133a.75.75 0 0 0 .527 1.284h.899c-.382 3.83-3.651 6.833-7.644 6.833a7.697 7.697 0 0 1-6.565-3.644a.75.75 0 1 0-1.277.788a9.197 9.197 0 0 0 7.842 4.356c4.808 0 8.765-3.66 9.15-8.333H22a.75.75 0 0 0 .527-1.284z" />
        </svg>
      </button>
    </div>
    <div class="text-xs" v-if="!success"> not all components are imported, sync again {{ success }}</div>
    <div class="text-xs">
      <ul class="flex w-full flex-wrap gap-4 text-left">
        <li v-for="component in components" :key="component.id" class="surface-muted flex-1 rounded-lg p-4 shadow-md">
          <div class="text-nowrap pb-4 text-sm font-bold capitalize flex gap-1 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
              v-if="component.name === 'page'">
              <path fill="currentColor"
                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2" />
            </svg>


            {{ component.name.replaceAll("_", " ") }}
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
import { onMounted, ref, computed } from "vue";

const components = ref([]);
const loading = ref(false);
import seed from "@/seed/components.json";

const success = computed(() => {
  console.log(components.value.length,seed.length )
  return components.value.length === seed.length;
});

const fetchComponents = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/components/pull");
    if (!response.ok) {
      loading.value = false;
      throw new Error("Failed to fetch components");
    }
    const data = await response.json();
    components.value = data;

    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error) {
    loading.value = false;
    console.error("Error fetching components:", error);
  }
};

// Function to push components
const pushComponents = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/components/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      loading.value = false;
      throw new Error("Failed to push components");
    }
    await response.json();
    setTimeout(() => {
      loading.value = false;
      fetchComponents();
    }, 5000);
  } catch (error) {
    console.error("Error pushing components:", error);
    loading.value = false;
  }
};

const removeComponents = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/setup/components/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      loading.value = true;
      throw new Error("Failed to push components");
    }
    await response.json();
    setTimeout(() => {
      loading.value = false;
      fetchComponents();
    }, 1000);

    fetchComponents();
  } catch (error) {
    loading.value = false;
    console.error("Error pushing components:", error);
  }
};

// Sync components function, callable on button click
const pullComponents = () => {
  fetchComponents();
};

// Fetch components on component mount
onMounted(() => {
  fetchComponents();
});
</script>
