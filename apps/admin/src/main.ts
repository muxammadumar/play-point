import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import { i18n } from "@/plugins/i18n";
import VueEasyLightbox from "vue-easy-lightbox";

// IMPORTANT: Keep these imports right before createApp()
import "@/assets/style/main.scss";
import "@/assets/style/tailwind/main.css";
import "@/assets/style/element/theme.scss";
import "@/assets/style/element/components.scss";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(i18n)
  .use(VueEasyLightbox)
  .mount("#app");
