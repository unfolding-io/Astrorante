<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from "vaul-vue";
import type { DialogContentEmits, DialogContentProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";
import type { HtmlHTMLAttributes } from "vue";
import DrawerOverlay from "./DrawerOverlay.vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  DialogContentProps & { class?: HtmlHTMLAttributes["class"] }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay class="bg-black/10" />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'menu-content fixed inset-y-0 left-auto right-0 z-50 ml-auto flex h-auto max-w-3xl flex-col justify-between shadow-lg',
          props.class,
        )
      "
    >
      <div
        class="absolute inset-y-0 left-4 my-auto h-[100px] w-2 rounded-full bg-current opacity-25 shadow-inner"
      />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>

<style lang="postcss">
.menu-content {
  min-width: max(320px, 40vw);
}
</style>
