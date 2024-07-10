import type { APIRoute } from "astro";
import { pushDataSources, pullDataSources } from "@util/storyblokApi";
import datasources from "@/seed/datasources.json";

export const prerender = false;

export const POST: APIRoute = async (/* { request, url } */) => {
  try {
    const currentDataSources: DataSource[] | [] = await pullDataSources();

    const res = await pushDataSources(
      datasources as DataSource[],
      currentDataSources,
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
