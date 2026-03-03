import { defineStore } from "pinia";
import Cookies from "js-cookie";
import type { ISettingsState, Language } from "@/types";

export const useSettingsStore = defineStore("settings", {
  state: (): ISettingsState => ({
    locale: (Cookies.get("akfaadmin_language") as Language) || "ru",
  }),
  actions: {
    setLocale(newLocale: Language) {
      Cookies.set("akfaadmin_language", newLocale), { expires: 7 };
      this.locale = newLocale;
    },
  },
});
