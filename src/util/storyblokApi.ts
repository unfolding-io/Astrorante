import { useStoryblokApi } from "@storyblok/astro";
import StoryblokClient from "storyblok-js-client";
import type { ISbStories, ISbStoryData, ISbResult } from "@storyblok/astro";

import { STORYBLOK_SPACE_ID, getSecret } from "astro:env/server";

const token = getSecret("STORYBLOK_PERSONAL_TOKEN");
export const api = useStoryblokApi();

const Storyblok = new StoryblokClient({
  oauthToken: token,
});

function extractDataSlug(slug: string, lang: string) {
  if (lang === "default") return slug;

  return slug.replace(`${lang}/`, "");
}

export const getSettings = async (lang: string | undefined) => {
  const { data: settingsData } = (await api.get(
    "cdn/stories/site-settings/settings",
    {
      version: import.meta.env.DEV ? "draft" : "published",
      language: !lang ? "default" : lang,
    },
  )) as ISbResult;

  return settingsData?.story?.content as SettingsStoryblok;
};

export const getPage = async (
  slug: string | undefined,
  lang: string | undefined,
) => {
  const { data } = (await api.get(
    `cdn/stories/${slug !== undefined ? slug : "index"}`,
    {
      version: "draft",
      language: !lang ? "default" : lang,
    },
  )) as ISbResult;
  return data.story.content;
};

export const getPages = async (
  lang: string,
  status: "draft" | "published" | undefined,
  settings: SettingsStoryblok,
  locales: string[],
) => {
  const per_page = 50;
  let stories: ISbStoryData<PageStoryblok>[] | [] = [];
  let page = 0; // Initialize page counter
  while (true) {
    const pages = (await api.get(`cdn/stories`, {
      version: status || "published",
      content_type: "page",
      language: lang,
      per_page,
      page: per_page * page, // Use page counter instead of pages.length
    })) as ISbStories;

    stories = [
      ...stories,
      ...(pages.data.stories as ISbStoryData<PageStoryblok>[]),
    ];

    if (pages.data.stories.length < per_page) {
      break;
    }
    page++; // Increment page counter after each loop
  }

  return stories.flatMap((story) => {
    return {
      params: {
        slug:
          story.slug === "index"
            ? undefined
            : extractDataSlug(story.full_slug, lang),
        lang: lang === "default" ? undefined : lang,
      },
      props: {
        dataSlug: story.slug,
        story: story.content,
        settings,
        locales,
        lang: lang === "default" ? undefined : lang,
        slug:
          story.slug === "index"
            ? undefined
            : extractDataSlug(story.full_slug, lang),
      },
    };
  });
};

export const getPosts = async (
  lang: string,
  status: "draft" | "published" | undefined,
  settings: SettingsStoryblok,
  locales: string[],
) => {
  const per_page = 50;
  let stories: ISbStoryData<PostStoryblok>[] | [] = [];
  let page = 0;
  while (true) {
    const pages = (await api.get(`cdn/stories`, {
      version: status || "published",
      content_type: "post",
      language: lang,
      per_page,
      page: per_page * page,
    })) as ISbStories;

    stories = [
      ...stories,
      ...(pages.data.stories as ISbStoryData<PostStoryblok>[]),
    ];

    if (pages.data.stories.length < per_page) {
      break;
    }
    page++;
  }

  return stories.flatMap((story) => {
    return {
      params: {
        slug: extractDataSlug(story.full_slug, lang),
        lang: lang === "default" ? undefined : lang,
      },
      props: {
        dataSlug: story.slug,
        story: story.content,
        settings,
        locales,
        lang: lang === "default" ? undefined : lang,
        slug:
          story.slug === "index"
            ? undefined
            : extractDataSlug(story.full_slug, lang),
      },
    };
  });
};

export const getPostsData = async (
  lang: string,
  status: "draft" | "published" | undefined,
) => {
  const per_page = 50;
  let stories: ISbStoryData<PostStoryblok>[] | [] = [];
  let page = 0;
  while (true) {
    const pages = (await api.get(`cdn/stories`, {
      version: status || "published",
      content_type: "post",
      language: lang,
      per_page,
      page: per_page * page,
    })) as ISbStories;

    stories = [
      ...stories,
      ...(pages.data.stories as ISbStoryData<PostStoryblok>[]),
    ];

    if (pages.data.stories.length < per_page) {
      break;
    }
    page++;
  }

  return stories.flatMap((story) => {
    return {
      slug: story.slug,
      full_slug: story.full_slug,
      ...story.content,
    };
  });
};

export const getMenu = async ({ categories, lang, status }: MenuParams) => {
  let cat = (await api.get(`cdn/stories`, {
    version: status || "published",
    by_uuids_ordered: categories.join(","),
    per_page: 100,
    language: lang,
  })) as ISbStories;

  interface MenuData {
    category: ISbStoryData<MenuCategoryStoryblok>;
    items: MenuItemStoryblok[];
  }
  const menu = await Promise.all(
    cat.data.stories.map(async (cat) => {
      const items = (await api.get(`cdn/stories`, {
        content_type: "menu_item",
        version: status || "published",
        language: lang,
        per_page: 100,
        filter_query: {
          category: {
            any_in_array: cat.uuid,
          },
        },
      })) as ISbStories;
      return {
        category: cat,
        items: items.data.stories.map((item) => item.content),
      } as MenuData;
    }),
  );

  return {
    menu: menu,
    categories: cat.data.stories,
  };
};

export const pullDataSources = async () => {
  const dataSources = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/datasources/`,
    {},
  );

  let result: DataSource[] | [] = [];

  if (
    dataSources &&
    dataSources?.data?.datasources &&
    dataSources.data.datasources.length > 0
  ) {
    result = await Promise.all(
      dataSources.data.datasources.map(async (ds: any) => {
        const params: IStoryblokDatasourceParams = {
          datasource_id: ds.id,
        };
        const data = (await Storyblok.get(
          `/spaces/${STORYBLOK_SPACE_ID}/datasource_entries/`,
          params,
        )) as any;
        return {
          name: ds.name,
          slug: ds.slug,
          dimensions: [],
          datasource_entries: data?.data?.datasource_entries.map(
            (entry: DataSourceEntry) => {
              return {
                name: entry.name,
                value: entry.value,
              };
            },
          ),
        };
      }),
    );
  }

  return result;
};

export const pushDataSources = async (
  data: DataSource[],
  current: DataSource[],
) => {
  if (!data) return;

  for (const item of data) {
    if (!current || !current.some((ds: DataSource) => ds.slug === item.slug)) {
      const params: any = {
        datasource: {
          name: item.name,
          slug: item.slug,
        },
      };

      const datasources = (await Storyblok.post(
        `/spaces/${STORYBLOK_SPACE_ID}/datasources/`,
        params,
      )) as any;
      if (datasources.data.datasource) {
        await Promise.all(
          item.datasource_entries.map(async (entry: DataSourceEntry) => {
            const params: any = {
              datasource_entry: {
                datasource_id: datasources.data.datasource.id,
                name: entry.name,
                value: entry.value,
              },
            };

            await Storyblok.post(
              `/spaces/${STORYBLOK_SPACE_ID}/datasource_entries/`,
              params,
            );
          }),
        );
      }
    }
  }

  return { ok: "ok" };
};

export const removeDataSources = async () => {
  const dataSources = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/datasources/`,
    {},
  );

  for (const item of dataSources?.data?.datasources) {
    await Storyblok.delete(
      `/spaces/${STORYBLOK_SPACE_ID}/datasources/${item.id}`,
      {},
    );
  }

  return { ok: "ok" };
};

export const pullComponents = async () => {
  const components = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/components/`,
    {},
  );

  return components?.data?.components;
};

export const pushComponents = async (data: any, current: any) => {
  if (!data) return;

  for (const item of data) {
    const existing = current?.find((comp: any) => comp.name === item.name);

    if (!existing) {
      // add component
      await Storyblok.post(`/spaces/${STORYBLOK_SPACE_ID}/components/`, {
        component: item,
      });
    } else {
      //update component
      await Storyblok.put(
        `/spaces/${STORYBLOK_SPACE_ID}/components/${existing.id}`,
        {
          component: item,
        },
      );
    }
  }

  return { ok: "ok" };
};

export const removeComponents = async () => {
  const components = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/components/`,
    {},
  );

  for (const item of components?.data?.components) {
    // cant remove page component
    if (item?.name !== "page") {
      await Storyblok.delete(
        `/spaces/${STORYBLOK_SPACE_ID}/components/${item.id}`,
        {},
      );
    }
  }

  return { ok: "ok" };
};

export const pullStories = async () => {
  const stories = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/stories/`,
    {},
  );

  const data = await Promise.all(
    stories.data.stories.map(async (story: any) => {
      const s = await Storyblok.get(
        `/spaces/${STORYBLOK_SPACE_ID}/stories/${story.id}`,
        {},
      );
      return s.data.story;
    }),
  );

  return data;
};

async function createStory(story: any, current: any, parent?: any) {
  if (
    !current ||
    !current.some((comp: any) => comp.full_slug === story.full_slug)
  ) {
    try {
      const data = (await Storyblok.post(
        `/spaces/${STORYBLOK_SPACE_ID}/stories/`,
        {
          story: {
            ...story,
            parent_id: parent?.id,
            parent,
          },
        },
      )) as any;

      let item = data?.data?.story;
      if (!item || !item.is_folder) return;
      return {
        name: item?.name,
        slug: item?.slug,
        full_slug: item?.full_slug,
        id: item?.id,
        uuid: item?.uuid,
      };
    } catch (error) {
      console.log("ERROR:::", error);
    }
  }
}

export const pushStories = async (data: any, current: any) => {
  if (!data) return;

  let folders: any, subfolders: any;
  /* Create folders */
  if (data.folders) {
    folders = await Promise.all(
      data.folders.map(async (item: any) => {
        return await createStory(item, current);
      }),
    );
  }

  if (folders && data.subfolders) {
    /* Create subfolders */
    subfolders = await Promise.all(
      data.subfolders.map(async (item: any) => {
        const parent = folders.find(
          (f: ISbStoryData) => f.slug === item.parent.slug,
        );
        return await createStory(item, current, parent);
      }),
    );
    folders = [...folders, ...subfolders];
  }

  /* create settings */
  if (folders && data.settings) {
    const parent = folders.find(
      (f: ISbStoryData) => f.slug === data.settings.parent.slug,
    );
    await createStory(data.settings, current, parent);
  }

  /* create pages */

  if (folders && data.pages) {
    await Promise.all(
      data.pages.map(async (item: any) => {
        const parent = folders.find((f: any) => f.slug === item?.parent?.slug);
        await createStory(item, current, parent);
      }),
    );
  }

  /* create posts */

  if (folders && data.posts) {
    await Promise.all(
      data.posts.map(async (item: any) => {
        const parent = folders.find((f: any) => f.slug === item?.parent?.slug);
        await createStory(item, current, parent);
      }),
    );
  }

  /* create menu categories */
  if (folders && data.menu_categories) {
    await Promise.all(
      data.menu_categories.map(async (item: any) => {
        const parent = folders.find((f: any) => f.slug === item?.parent?.slug);
        await createStory(item, current, parent);
      }),
    );
  }

  /* create menu items */
  if (folders && data.menu_items) {
    await Promise.all(
      data.menu_items.map(async (item: any) => {
        const parent = folders.find((f: any) => f.slug === item?.parent?.slug);
        await createStory(item, current, parent);
      }),
    );
  }

  return { ok: "ok" };
};

export const removeStories = async () => {
  const stories = await Storyblok.get(
    `/spaces/${STORYBLOK_SPACE_ID}/stories/`,
    {},
  );
  const folders = stories?.data?.stories.filter((item: any) => item.is_folder);
  const st = stories?.data?.stories.filter((item: any) => !item.is_folder);
  for (const item of st) {
    await Storyblok.delete(
      `/spaces/${STORYBLOK_SPACE_ID}/stories/${item.id}`,
      {},
    );
  }

  // remove folders

  for (const item of folders) {
    await Storyblok.delete(
      `/spaces/${STORYBLOK_SPACE_ID}/stories/${item.id}`,
      {},
    );
  }

  return { ok: "ok" };
};
