import type { APIRoute } from "astro";
import { removeStories } from "@util/storyblokApi";

export const prerender = false;

export const POST: APIRoute = async (/* { request, url } */) => {
  try {
    const res = await removeStories();
    return new Response(JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in :", error);
  }

  return new Response(null, { status: 400 });
};
