<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

interface Labels {
  close: string;
  menu: string;
  back_to_home: string;
}

defineProps<{
  labels: Labels;
  surface?: string;
}>();

const html = ref<HTMLHtmlElement | null>(null);

function onOpen() {
  if (html.value) {
    html.value.style["scroll-behavior"] = "auto";
  }
}

function onClose() {
  setTimeout(() => {
    if (html.value) {
      html.value.style["scroll-behavior"] = "smooth";
    }
  }, 500);
}

onMounted(() => {
  html.value = document.getElementsByTagName("html")[0];
});
</script>

<template>
  <div class="contents">
    <Drawer direction="right" @update:open="onOpen" @close="onClose">
      <DrawerTrigger :aria-label="labels.menu"
        class="pointer-events-auto aspect-square overflow-hidden rounded-full p-2 shadow-lg"
        :class="surface || 'surface-secondary'">
        <slot name="icon" />
      </DrawerTrigger>
      <DrawerContent :class="surface || 'surface-secondary'">
        <DrawerHeader>
          <slot name="logo" />

          <DrawerTitle class="hidden">{{ labels.menu }}</DrawerTitle>
          <DrawerDescription class="hidden">{{
            labels.menu
            }}</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 pl-8 sm:p-10">
          <slot name="menu" />
        </div>
        <DrawerFooter class="mt-0 h-fit">
          <DrawerClose>
            <button variant="outline">{{ labels.close }}</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
