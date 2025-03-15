import esHome from '@/i18n/locales/es/home.json'

type TranslationDataT = { [key: string]: string };

export const translations: { [locale: string]: { [section: string]: TranslationDataT } } = {
    es: {
        home: esHome,
    },
}