import type { APIRoute } from "astro";
import { pushComponents, pullComponents } from "@util/storyblokApi";
import components from "@/seed/components.json";

export const prerender = false;

export const POST: APIRoute = async () => {
  try {
    const currentComponents = await pullComponents();
    const res = await pushComponents(components, currentComponents);
    return new Response(JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Storyblok error:", error);
  }

  return new Response(null, { status: 400 });
};
