<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
</script>

<template>
  <span>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <slot />
        </TooltipTrigger>
        <TooltipContent class="surface-primary border-0 text-lg">
          <slot name="tooltip" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </span>
</template>
