<template>
  <el-config-provider size="large" :locale="epLocales[locale] || en">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import en from "element-plus/es/locale/lang/en";
import ru from "element-plus/es/locale/lang/ru";

import { useLocale } from "@/composables/useLocale";
import { useIdle } from "@/composables/useIdle";

const { locale } = useLocale();

const epLocales: Record<string, any> = {
  en,
  ru,
};

useIdle(300 * 60 * 1000);
</script>
