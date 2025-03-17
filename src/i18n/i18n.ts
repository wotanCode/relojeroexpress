import { getLocale } from "astro-i18n-aut";
import { translations } from "@/i18n/locales";

type AnyRecord = Record<string, any>;

export function useI18n(Astro: { url: string | URL }) {
    const locale = getLocale(Astro.url);
    return (key: string): string => {
        const keys = key.split(".");
        let result: AnyRecord | string = translations[locale];

        for (const k of keys) {
            if (typeof result !== 'object') return key;
            result = result[k];
            if (result === undefined) return key;
        }

        return typeof result === 'string' ? result : key;
    };
}