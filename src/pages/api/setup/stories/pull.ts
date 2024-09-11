import type { APIRoute } from "astro";
import { pullStories } from "@util/storyblokApi";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
 
  const type = url.searchParams.get("type");
 
  try {
    let stories = await pullStories();

    if (!!type) {
      console.log("filtering stories by type", type);
      stories = stories.filter((story) => story?.content?.component === type);
    }
    return new Response(JSON.stringify(stories || []), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Storyblok error:", error);
  }

  return new Response(null, { status: 400 });
};
