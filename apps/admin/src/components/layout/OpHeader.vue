<template>
  <header class="w-full px-12 py-5 bg-white flex items-center justify-between">
    <div class="flex">
      <img class="w-10 mr-6" src="/logo-circle.svg" alt="Logo" />
      <el-menu
        :default-active="activeName"
        class="min-w-[500px]"
        mode="horizontal"
      >
        <router-link
          v-for="item in menu.slice(0, menu.length - 1)"
          :key="item.name"
          :to="{ name: item.name }"
        >
          <el-menu-item :index="item.name">{{ item.title }}</el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <div class="flex">
      <StatusSelect class="!w-40 mr-4" />
      <el-dropdown trigger="click">
        <el-button class="!px-2 !pr-3">
          <div class="flex items-center mr-2">
            <Icon name="local-avatar" size="32" class="mr-2" />
            <p class="font-medium">София</p>
          </div>
          <Icon size="14" name="el-ArrowDown" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="w-40">
            <el-dropdown-item>Выход</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import StatusSelect from "../ui/StatusSelect.vue";

const { t } = useI18n();
const route = useRoute();
const activeName = computed(() => route.meta.activeMenu);

const menu = computed(() => [
  {
    title: t("common.menu.activeConsultation"),
    name: "ActiveConsultation",
  },
  {
    title: t("common.menu.consultationHistory"),
    name: "ConsultationHistory",
  },
  {
    title: t("common.menu.directoryDiseases"),
    name: "DirectoryDiseases",
  },
]);
</script>
