import type { APIRoute } from "astro";
import { pullComponents } from "@util/storyblokApi";

export const prerender = false;

export const GET: APIRoute = async (/* { request, url } */) => {
  try {
    const components = await pullComponents();

    return new Response(JSON.stringify(components), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in searchListings:", error);
  }

  return new Response(null, { status: 400 });
};
