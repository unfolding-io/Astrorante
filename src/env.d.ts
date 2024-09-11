/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/env.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@storyblok/astro" />
interface SpaceData {
  id: number;
  name: string;
  domain: string;
  version: string;
  language_codes: string[];
}
interface Space {
  space: SpaceData;
}

interface SpaceObj {
  data: Space;
}
type StoryStatus = "draft" | "published" | undefined;
interface RouteParams {
  slug: string | undefined;
  lang: string | undefined;
}
interface MenuParams {
  status?: StoryStatus;
  categories: string[];
  lang: string;
}
interface PostParams {
  status?: StoryStatus;
  lang: string;
}

interface Locale {
  [key: string]: string;
}

interface DataSourceParams {
  name: string;
  slug: string;
}

interface DataSourceEntry {
  name: string;
  value: string;
}

interface DataSource {
  name: string;
  slug: string;
  dimensions?: any[]; // Assuming dimensions is an array of a type not specified here
  datasource_entries: DataSourceEntry[];
}

interface IStoryblokDatasourceParams {
  datasource_id: string;
  dimension?: string; // Marked as optional since it may not always be needed
}

interface ISbManagmentApiResult {
  data: any;
  headers?: any;
}

interface Color {
  color: string;
}

interface ColorVars {
  [key: string]: string;
}

/* STORYBLOK COMPONENTS */

interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

interface BannerStoryblok {
  image: AssetStoryblok;
  video?: AssetStoryblok;
  surface?: string;
  align?:
    | ""
    | "text-left mr-auto justify-items-start"
    | "text-right ml-auto justify-items-end"
    | "text-center mx-auto justify-items-center";
  container?: "" | "normal" | "breakout" | "full-width";
  content: RichtextStoryblok;
  opacity?:
    | ""
    | "opacity-10"
    | "opacity-20"
    | "opacity-30"
    | "opacity-40"
    | "opacity-50"
    | "opacity-60"
    | "opacity-70"
    | "opacity-80"
    | "opacity-90";
  links?: LinkStoryblok[];
  component: "banner";
  _uid: string;
  [k: string]: any;
}

interface HeroStoryblok {
  surface?: string;
  accent_color?:
    | ""
    | "--primary-bg"
    | "--secondary-bg"
    | "--accent-bg"
    | "--dark-bg"
    | "--light-bg"
    | "--success-bg"
    | "--info-bg"
    | "--warning-bg"
    | "--danger-bg";
  bg_opacity?:
    | ""
    | "opacity-10"
    | "opacity-20"
    | "opacity-30"
    | "opacity-40"
    | "opacity-50"
    | "opacity-60"
    | "opacity-70"
    | "opacity-80"
    | "opacity-90"
    | "opacity-100";
  title: string;
  content: RichtextStoryblok;
  links?: LinkStoryblok[];
  thumbnail?: AssetStoryblok;
  video?: AssetStoryblok;
  component: "hero";
  _uid: string;
  [k: string]: any;
}

type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

interface LinkStoryblok {
  label: string;
  href: Exclude<MultilinkStoryblok, { linktype?: "asset" }>;
  icon?: number | string;
  surface?: string;
  component: "link";
  _uid: string;
  [k: string]: any;
}

interface MenuCategoryStoryblok {
  title: string;
  icon: number | string;
  content?: RichtextStoryblok;
  thumbnail?: AssetStoryblok;
  component: "menu_category";
  _uid: string;
  [k: string]: any;
}

interface MenuItemStoryblok {
  category?: (ISbStoryData<MenuCategoryStoryblok> | string)[];
  title: string;
  intro?: RichtextStoryblok;
  price?: PriceStoryblok[];
  image?: AssetStoryblok;
  labels?: (number | string)[];
  allergic_ingredients?: (number | string)[];
  component: "menu_item";
  _uid: string;
  [k: string]: any;
}

interface MenuItemsStoryblok {
  surface?: string;
  accent_surface?: string;
  template?: "" | "menu" | "cards";
  title?: string;
  content?: RichtextStoryblok;
  offers?: boolean;
  menu_categories?: (ISbStoryData<MenuCategoryStoryblok> | string)[];
  menu_items?: (ISbStoryData<MenuItemStoryblok> | string)[];
  component: "menu_items";
  _uid: string;
  [k: string]: any;
}

interface MenusStoryblok {
  menus?: (
    | ISbStoryData<MenuStoryblok>
    | ISbStoryData<MenuCategoryStoryblok>
    | string
  )[];
  surface?: string;
  component: "menus";
  _uid: string;
  [k: string]: any;
}

interface NewsItemsStoryblok {
  surface?: string;
  accent_surface?: string;
  title?: string;
  content?: RichtextStoryblok;
  items?: (ISbStoryData<PostStoryblok> | string)[];
  component: "news_items";
  _uid: string;
  [k: string]: any;
}

interface OpeningHourStoryblok {
  day?: "" | "1" | "2" | "3" | "4" | "5" | "6" | "0";
  component: "opening_hour";
  _uid: string;
  [k: string]: any;
}

interface PageStoryblok {
  body?: (
    | HeroStoryblok
    | MenuItemsStoryblok
    | MenusStoryblok
    | TextMediaStoryblok
    | RichtextStoryblok
    | NewsItemsStoryblok
    | BannerStoryblok
  )[];
  og_title: string;
  og_description: string;
  og_image: AssetStoryblok;
  surface?: string;
  component: "page";
  _uid: string;
  [k: string]: any;
}

interface PostStoryblok {
  title: string;
  intro: string;
  content: RichtextStoryblok;
  thumbnail: AssetStoryblok;
  body?: (
    | HeroStoryblok
    | MenuItemsStoryblok
    | MenusStoryblok
    | RichtextStoryblok
    | TextMediaStoryblok
    | BannerStoryblok
    | NewsItemsStoryblok
  )[];
  og_title: string;
  og_description: string;
  og_image: AssetStoryblok;
  surface?: string;
  component: "post";
  _uid: string;
  [k: string]: any;
}

interface PriceStoryblok {
  name?: string;
  price: string;
  is_offer?: boolean;
  offer_text?: RichtextStoryblok;
  component: "price";
  _uid: string;
  [k: string]: any;
}

interface RichtextStoryblok {
  surface?: string;
  align?:
    | ""
    | "text-left mr-atuo justify-items-start"
    | "text-right ml-auto justify-items-end"
    | "text-center mx-auto justify-items-center";
  content: RichtextStoryblok;
  links?: LinkStoryblok[];
  component: "richtext";
  _uid: string;
  [k: string]: any;
}

interface SettingsStoryblok {
  main_menu: LinkStoryblok[];
  footer_text?: RichtextStoryblok;
  footer_menu_1_label: string;
  footer_menu_1?: LinkStoryblok[];
  footer_menu_2_label: string;
  footer_menu_2?: LinkStoryblok[];
  footer_3_label: string;
  surface_light?: string;
  surface_dark?: string;
  surface_primary?: string;
  surface_secondary?: string;
  surface_accent?: string;
  surface_success?: string;
  surface_info?: string;
  surface_warning?: string;
  surface_danger?: string;
  surface_footer?: string;
  surface_page?: string;
  surface_menu?: string;
  company_name?: string;
  slogan?: string;
  address?: string;
  logo: AssetStoryblok;
  opening_hours?: OpeningHourStoryblok[];
  font_headings?: number | string;
  font_weight_headings?:
    | ""
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  font_body?: number | string;
  font_weight_body?:
    | ""
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  blog_title: string;
  blog_content?: RichtextStoryblok;
  blog_og_title: string;
  blog_og_description: string;
  blog_og_image: AssetStoryblok;
  email: string;
  phone: string;
  phone_label?: string;
  whatsapp?: string;
  links?: LinkStoryblok[];
  component: "settings";
  _uid: string;
  [k: string]: any;
}

interface TextMediaStoryblok {
  image: AssetStoryblok;
  media_width: "" | "33.33" | "50" | "66.66";
  aspect_ratio?: "" | "1.777" | "1.25" | "1" | "0.8" | "0.5625";
  layout?: "" | "fit" | "fill";
  video?: AssetStoryblok;
  reverse?: boolean;
  surface?: string;
  align?:
    | ""
    | "text-left mr-auto justify-items-start"
    | "text-right ml-auto justify-items-end"
    | "text-center mx-auto justify-items-center";
  container?: "" | "normal" | "breakout" | "full-width" ;
  content: RichtextStoryblok;
  links?: LinkStoryblok[];
  component: "text_media";
  _uid: string;
  [k: string]: any;
}
