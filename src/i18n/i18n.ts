import { getLocale } from "astro-i18n-aut";
import { translations } from "./locales";

export function useI18n(Astro: any) {
    const locale = getLocale(Astro.url);
    return (key: string) => {
        const [section, term] = key.split(".");
        return translations[locale]?.[section]?.[term] || key;
    };
}