<template>
  <div class="h-full w-full flex flex-col space-y-4">
    <div class="bg-white rounded-2xl p-4 flex items-center justify-between">
      <h2 class="text-2xl font-medium">{{ $t("user.settings.title") }}</h2>
      <el-button @click="logout()" class="square">
        <Icon name="local-notification" size="20" />
      </el-button>
    </div>
    <div class="bg-white rounded-2xl p-6">
      <h3 class="text-2xl font-medium mb-4">
        {{ $t("user.settings.general.title") }}
      </h3>
      <div
        @click="showLocaleDialog = true"
        class="cursor-pointer bg-[#F7F7F7] rounded-2xl p-4 flex items-center justify-between"
      >
        <div>
          <h3 class="text-xl font-medium mb-2 text-[#303133]">
            {{ $t("user.settings.general.language") }}
          </h3>
          <p class="text-[#909399] text-base">
            {{ localeText }}
          </p>
        </div>
        <Icon name="local-arrow-right" size="24" />
      </div>
    </div>
    <div class="bg-white rounded-2xl p-6">
      <h3 class="text-2xl font-medium mb-4">
        {{ $t("user.settings.notifications.title") }}
      </h3>
      <div
        class="bg-[#F7F7F7] rounded-2xl p-4 flex items-center justify-between mb-3"
      >
        <div>
          <h3 class="text-xl font-medium mb-2 text-[#303133]">
            {{ $t("user.settings.notifications.newAppeal.title") }}
          </h3>
          <p class="text-[#909399] text-base">
            {{ $t("user.settings.notifications.newAppeal.description") }}
          </p>
        </div>
        <el-switch v-model="newAppeal" size="default" />
      </div>
      <div
        class="bg-[#F7F7F7] rounded-2xl p-4 flex items-center justify-between mb-3"
      >
        <div>
          <h3 class="text-xl font-medium mb-2 text-[#303133]">
            {{ $t("user.settings.notifications.newMessage.title") }}
          </h3>
          <p class="text-[#909399] text-base">
            {{ $t("user.settings.notifications.newMessage.description") }}
          </p>
        </div>
        <el-switch v-model="newMessage" size="default" />
      </div>
      <div
        class="bg-[#F7F7F7] rounded-2xl p-4 flex items-center justify-between"
      >
        <div>
          <h3 class="text-xl font-medium mb-2 text-[#303133]">
            {{ $t("user.settings.notifications.sound.title") }}
          </h3>
          <p class="text-[#909399] text-base">
            {{ $t("user.settings.notifications.sound.description") }}
          </p>
        </div>
        <el-switch v-model="sound" size="default" />
      </div>
    </div>
    <LocaleDialog :open="showLocaleDialog" @close="showLocaleDialog = false" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};

import { computed, ref } from "vue";
import { useLocale } from "@/composables/useLocale";

import LocaleDialog from "@/components/ui/LocaleDialog.vue";
const { locale } = useLocale();

const localeText = computed(() => {
  if (locale.value === "en") {
    return "English";
  } else if (locale.value === "ru") {
    return "Русский";
  } else if (locale.value === "uz") {
    return "O'zbekcha";
  }
});

const showLocaleDialog = ref(false);
const newAppeal = ref(true);
const newMessage = ref(true);
const sound = ref(false);
</script>
