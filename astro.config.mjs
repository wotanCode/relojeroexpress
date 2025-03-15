import { defineConfig } from "astro/config";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const defaultLocale = "es";
const locales = {
    es: "es-ES",
};

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': '/src'
            }
        }
    },
    site: "https://example.com/",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    integrations: [
        i18n({
            locales,
            defaultLocale,
        }),
        sitemap({
            i18n: {
                locales,
                defaultLocale,
            },
            filter: filterSitemapByDefaultLocale({ defaultLocale }),
        }),
    ],
});