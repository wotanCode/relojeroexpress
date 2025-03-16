import esCompany from '@/i18n/locales/es/company.json'
import esContact from '@/i18n/locales/es/contact.json'
import esFooter from '@/i18n/locales/es/footer.json'
import esServices from '@/i18n/locales/es/services.json'
import esHero from '@/i18n/locales/es/hero.json'
import esMeta from '@/i18n/locales/es/meta.json'
import esAria from '@/i18n/locales/es/aria.json'

type Translations = {
    [locale: string]: {
        hero: typeof esHero;
        company: typeof esCompany;
        contact: typeof esContact;
        footer: typeof esFooter;
        services: typeof esServices;
        meta: typeof esMeta;
        aria: typeof esAria;
    };
};

export const translations: Translations = {
    es: {
        hero: esHero,
        company: esCompany,
        contact: esContact,
        footer: esFooter,
        services: esServices,
        meta: esMeta,
        aria: esAria
    },
}