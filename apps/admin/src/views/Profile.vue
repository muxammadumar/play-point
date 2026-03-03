<template>
  <div class="h-full w-full flex flex-col">
    <div
      class="bg-white p-4 rounded-2xl flex items-center justify-between mb-4"
    >
      <h1 class="heading-2">{{ $t("user.profile.title") }}</h1>
      <el-button @click="logOut()" type="danger" plain>
        {{ $t("user.profile.logOut") }}
      </el-button>
    </div>
    <div class="grow bg-white rounded-2xl p-4">
      <div class="flex w-full gap-3 mb-4">
        <el-avatar
          :size="56"
          :src="'aaa'"
          :shape="'circle'"
          class="avatar-fallback"
          @error="() => {}"
        >
          <Icon name="local-avatar" :size="56" />
        </el-avatar>
        <div class="flex flex-col items-start justify-center">
          <p class="text-base leading-6 font-medium text-[#171717] mb-1">
            {{ user?.fullName }}
          </p>
          <p class="text-base leading-5 text-[#5C5C5C]">
            {{ user?.role }}
          </p>
        </div>
      </div>
      <el-tabs class="grow overflow-hidden" v-model="activeTab">
        <el-tab-pane class="overflow-hidden h-full" name="information">
          <template #label>
            <span class="custom-tabs-label">
              <span>{{ $t("user.profile.tabs.information") }}</span>
            </span>
          </template>
          <Information />
        </el-tab-pane>
      </el-tabs>
    </div>
    <LogoutDialog :open="openLogoutDialog" @close="openLogoutDialog = false" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { computed, ref } from "vue";

import Information from "@/components/ui/Profile/Information.vue";
import LogoutDialog from "@/components/ui/Profile/LogoutDialog.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const openLogoutDialog = ref(false);

const logOut = () => {
  openLogoutDialog.value = true;
};

const activeTab = ref("information");
</script>
