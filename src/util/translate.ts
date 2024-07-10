import { SITE_LANG, CURRENCY, LOCALE } from "astro:env/server";

import en from "@/i18n/en.json";
import de from "@/i18n/de.json";
import es from "@/i18n/es.json";
import nl from "@/i18n/nl.json";
import fr from "@/i18n/fr.json";

const translations: Record<string, Locale> = {
  en,
  de,
  es,
  nl,
  fr,
};

export function useTranslations(lang: string) {
  return function t(key: string) {
    if (!translations[lang]) return key;
    return translations[lang][key] || translations[SITE_LANG][key] || key;
  };
}

export function translateUrl(
  url: URL,
  locales: string[],
  removeCurrentLanguage?: boolean,
) {
  const [, lang] = url.pathname.split("/");
  let baseUrl = url.pathname;
  let currentLang = SITE_LANG;

  if (locales.includes(lang)) {
    baseUrl = url.pathname.replace(`/${lang}`, "");
    currentLang = lang;
  }

  let urls = locales.map((locale) => {
    return {
      locale,
      url: locale === SITE_LANG ? baseUrl : `/${locale}${baseUrl}`,
    };
  });

  if (removeCurrentLanguage)
    urls = urls.filter((u) => u.locale !== currentLang);

  return urls;
}

export function getLangFromUrl(url: URL) {
  const ui = Object.keys(translations);
  const [, lang] = url.pathname.split("/");
  if (ui.includes(lang)) return lang as string;
  return SITE_LANG;
}

export function mergeOpeningHours(days: OpeningHourStoryblok[], lang: string) {
  const t = useTranslations(lang);
  const arr = [0, 1, 2, 3, 4, 5, 6];
  let merged = arr.map((d) => {
    /* get opening hours of the day */
    let openString = "";
    days
      .filter((day) => day.day == d + "")
      .map((hours) => {
        openString += `<span>${hours.time.time.start} - ${hours.time.time.end} </span>`;
      });

    /* get the localized day names */
    let newDay = new Date("08/07/2022");
    newDay.setDate(newDay.getDate() + d);

    const content = {
      day: newDay.toLocaleString(lang, { weekday: "short" }),
      hours: openString !== "" ? openString : t("closed"),
    };
    return content;
  });

  return merged;
}

export const formatPrice = function (price: string) {
  const formatted = parseFloat(price).toLocaleString(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 2,
  });

  const decimalSeparator = (1.1).toLocaleString(LOCALE).substring(1, 2);
  const parts = formatted.split(decimalSeparator);

  if (parts.length > 1) {
    const wholePart = parts[0];
    const decimalPart = parts[1].replace(/\D/g, "");
    return `<span>${wholePart}<sup class="pl-px opacity-90 font-xxs">${decimalPart}</sup></span>`;
  } else {
    return `<span>${parts[0]}</span>`;
  }
};
