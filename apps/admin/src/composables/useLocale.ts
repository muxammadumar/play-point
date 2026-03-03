import { useI18n } from "vue-i18n";
import { useSettingsStore } from "@/store/settings";
import type { Language } from "@/types";

export function useLocale() {
  const { locale } = useI18n();
  const settings = useSettingsStore();

  locale.value = settings.locale;

  const setLocale = (newLocale: Language) => {
    locale.value = newLocale;
    settings.setLocale(newLocale);
  };

  return {
    locale,
    setLocale,
  };
}
