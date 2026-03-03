import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    svgLoader({
      svgo: true,
    }),
  ],
  server: {
    allowedHosts: ["admin.caupuls.uz", ".trycloudflare.com"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
