<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataSources from "@components/setup/DataSources.vue";
import Components from "@components/setup/Components.vue";
import Stories from "@components/setup/Stories.vue";
</script>

<template>
  <Tabs default-value="datasources" class="w-full">
    <TabsList class="bold mb-4 gap-2 bg-primary">
      <TabsTrigger value="datasources"
        class="font-bold text-secondary hover:bg-black/10 data-[state=active]:bg-secondary data-[state=active]:text-primary">
        1. Data Sources
      </TabsTrigger>
      <TabsTrigger value="components"
        class="font-bold text-secondary hover:bg-black/10 data-[state=active]:bg-secondary data-[state=active]:text-primary">
        2. Components
      </TabsTrigger>
      <TabsTrigger value="stories"
        class="font-bold text-secondary hover:bg-black/10 data-[state=active]:bg-secondary data-[state=active]:text-primary">
        3. Stories
      </TabsTrigger>
      <TabsTrigger value="restart"
        class="font-bold text-secondary hover:bg-black/10 data-[state=active]:bg-secondary data-[state=active]:text-primary">
        4. Configure Storyblok
      </TabsTrigger>
    </TabsList>
    <hr class="border-secondary pb-3 text-secondary opacity-50" />

    <TabsContent value="datasources">
      <DataSources />
    </TabsContent>
    <TabsContent value="components">
      <Components />
    </TabsContent>
    <TabsContent value="stories">
      <Stories />
    </TabsContent>
    <TabsContent value="restart">
      <div class="richtext text-balance pb-20 pt-8">
        <h4>Start developing</h4>

        <p>
          Check ou your site at:
          <a href="/" class="surface-secondary rounded-sm p-0.5">https://localhost:4321/</a>
        </p>

        <h4>Configure Storyblok</h4>
        <p>
          You can also configure the Storyblok Visual Editor to

          <i class="surface-secondary rounded-sm p-0.5">
            https://localhost:4321/cms/?url=
          </i>
        </p>
        <p>
          Or when you have published your project to a live server, you can
          configure the Visual Editor to.

          <i class="surface-secondary rounded-sm p-0.5">
            https://your-amazing-website.com/cms/?url=
          </i>
        </p>
        <h4>Update your site configuration</h4>
        <p>
          In Storyblok, go to
          <i class="surface-secondary rounded-sm p-0.5">Content > Site Settings > Settings</i>
          and update your site configuration to your needs.
        </p>
        <p>
          <u>Don't forget to publish your stories before deploying your site!</u>
        </p>
      </div>
    </TabsContent>
  </Tabs>
</template>
