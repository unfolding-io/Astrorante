<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
defineProps<{
  categories: Record<string, any>[];
}>();
</script>

<template>
  <Tabs default-value="datasources" class="w-full">
    <TabsList class="bold mb-4 gap-2 bg-primary">
      <TabsTrigger v-for="({ content, slug }, index) in categories" :key="index" value="datasources"
        class="font-bold text-secondary hover:bg-black/10 data-[state=active]:bg-secondary data-[state=active]:text-primary">
        {{ content.title }}
      </TabsTrigger>
    </TabsList>
    <hr class="border-secondary pb-3 text-secondary opacity-50" />
  </Tabs>
</template>
