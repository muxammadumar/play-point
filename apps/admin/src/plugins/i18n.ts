import { createI18n } from "vue-i18n";
import ru from "@/locales/ru/index.ts";
import en from "@/locales/en/index.ts";
import uz from "@/locales/uz/index.ts";

import Cookies from "js-cookie";

const savedLanguage = Cookies.get("akfaadmin_language");

// fallbackLocale: "en",
export const i18n = createI18n({
  locale: savedLanguage,
  legacy: false,
  globalInjection: true,
  messages: {
    ru,
    en,
    uz,
  },
});
