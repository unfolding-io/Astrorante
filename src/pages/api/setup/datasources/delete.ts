import type { APIRoute } from "astro";
import { removeDataSources } from "@util/storyblokApi";

export const prerender = false;

export const POST: APIRoute = async (/* { request, url } */) => {
  try {
    const res = await removeDataSources();
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
