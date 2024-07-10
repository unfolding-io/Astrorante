import type { APIRoute } from "astro";
import { pushStories, pullStories } from "@util/storyblokApi";

import folders from "@/seed/folders.json";
import subfolders from "@/seed/subfolders.json";
import settings from "@/seed/settings.json";

import pages from "@/seed/pages.json";
import posts from "@/seed/posts.json";
import menu_categories from "@/seed/menu_categories.json";
import menu_items from "@/seed/menu_items.json";

export const prerender = false;

export const POST: APIRoute = async () => {
  try {
    const currentStories = await pullStories();
    const res = await pushStories(
      {
        folders,
        subfolders,
        settings,
        pages,
        posts,
        menu_categories,
        menu_items,
      },
      currentStories,
    );
    return new Response(JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in searchListings:", error);
  }

  return new Response(null, { status: 400 });
};
