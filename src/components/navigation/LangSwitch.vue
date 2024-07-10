<template>
  <div class="contents">
    <DropdownMenu :modal="false">
      <DropdownMenuTrigger asChild>
        <button aria-label="select language"
          :class="`${surface || 'surface-secondary'} btn btn-icon sm:text-md rounded-full text-sm shadow-md sm:p-2.5`">
          {{ lang }}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :class="`${surface || 'surface-secondary'} w-fit min-w-0 rounded-3xl border-0`"
        align="center" :sideOffset="10">
        <DropdownMenuItem v-for="{ locale, url } in localeUrls" :key="lang" asChild>
          <a :href="url" class="cursor-pointer text-lg uppercase">
            {{ locale }}</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

defineProps<{
  localeUrls: Record<string, string>[];
  lang: string;
  surface?: string | undefined;
}>();
</script>
