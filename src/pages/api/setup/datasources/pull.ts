import type { APIRoute } from "astro";
import { pullDataSources } from "@util/storyblokApi";

export const prerender = false;

export const GET: APIRoute = async (/* { request, url } */) => {
  try {
    const datasources = await pullDataSources();

    return new Response(JSON.stringify(datasources || {}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Storyblok error:", error);
  }

  return new Response(null, { status: 400 });
};
