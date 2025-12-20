import { createMemoryHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";

import Default from "@/layout/Default.vue";

const routes = [
  {
    path: "/",
    name: "DefaultLayout",
    component: Default,
    children: [{ path: "/", component: Home }],
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
