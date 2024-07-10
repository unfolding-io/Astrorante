import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import vue from "@astrojs/vue";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel/serverless";

const env = loadEnv("", process.cwd(), ["STORYBLOK", "NETLIFY"]);

// https://astro.build/config
export default defineConfig({
  site: "https://astrorante.unfolding.io/",
  output: "hybrid",
  adapter: env.NETLIFY ? netlify() : vercel(), // vercel() or netlify()
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_PREVIEW_TOKEN,
      bridge: false,
      components: {
        page: "components/bloks/Page",
        post: "components/bloks/Post",
        hero: "components/bloks/Hero",
        text_media: "components/bloks/TextMedia",
        menus: "components/bloks/Menu",
        menu_items: "components/bloks/MenuItems",
        news_items: "components/bloks/NewsItems",
        richtext: "components/bloks/RichText",
        banner: "components/bloks/Banner",
      },
      apiOptions: {
        region: "eu", // optional,  or 'eu' (default)
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    vue({
      appEntrypoint: "/src/pages/_app",
    }),
    icon(),
    sitemap(),
  ],
  trailingSlash: "ignore",
  compressHTML: true,
  scopedStyleStrategy: "attribute",
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  experimental: {
    env: {
      schema: {
        STORYBLOK_PREVIEW_TOKEN: envField.string({
          context: "server",
          access: "secret",
          optional: false,
        }),
        STORYBLOK_SPACE_ID: envField.number({
          context: "server",
          access: "public",
          optional: false,
        }),
        STORYBLOK_PERSONAL_TOKEN: envField.string({
          context: "server",
          access: "secret",
        }),
        SITE_LANG: envField.string({
          context: "server",
          access: "public",
          default: "en",
        }),
        CURRENCY: envField.string({
          context: "server",
          access: "public",
          default: "USD",
        }),
        LOCALE: envField.string({
          context: "server",
          access: "public",
          default: "en-US",
        }),
        MAILCHIMP_SERVER_PREFIX: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        MAILCHIMP_LIST_ID: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        MAILCHIMP_API_KEY: envField.string({
          context: "server",
          access: "secret",
          optional: true,
        }),

        MAILGUN_API_KEY: envField.string({
          context: "server",
          access: "secret",
          optional: true,
        }),

        MAILGUN_API_URL: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),

        MAILGUN_DOMAIN: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),

        FROM_EMAIL_ADDRESS: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        TO_EMAIL_ADDRESS: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        POSTMARK_SERVER_TOKEN: envField.string({
          context: "server",
          access: "secret",
          optional: true,
        }),
        SLACK_TOKEN: envField.string({
          context: "server",
          access: "secret",
          optional: true,
        }),
        SLACK_CHANNEL_ID: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
      },
    },
  },
});
