<template>
  <div class="flex flex-col h-screen relative overflow-visible">
    <Notifications
      @close="showNotificationModal = false"
      v-if="showNotificationModal"
    />
    <div class="flex items-center gap-3 p-6">
      <img class="w-10" src="/logo-circle.svg" alt="Logo" />
      <div>
        <h6 class="heading-6">Akfa Medline</h6>
        <p class="paragraph-3">Support panel</p>
      </div>
    </div>
    <div class="grow w-full p-5" id="sidebar">
      <el-menu
        :default-active="activeName"
        class="h-full border-b border-[#EBEBEB] pb-4"
      >
        <div class="grow">
          <el-menu-item
            ref="notificationMenu"
            index="notifications"
            @click="showNotifications"
            :class="{ 'is-active': showNotificationModal }"
          >
            <Icon name="local-bell" size="20" class="mr-2" />
            <template #title
              ><p class="paragraph-2">
                {{ t("common.menu.notifications") }}
              </p></template
            >
          </el-menu-item>
          <el-divider class="!my-5 !border-[#EBEBEB]" />
          <router-link
            v-for="item in menu.slice(0, menu.length - 1)"
            :key="item.name"
            :to="{ name: item.name }"
          >
            <el-menu-item
              :index="item.name"
              :class="{ 'is-active': activeName === item.name }"
            >
              <Icon :name="item.icon" size="20" class="mr-2" />
              <template #title
                ><p class="paragraph-2">{{ item.title }}</p></template
              >
            </el-menu-item>
          </router-link>
        </div>
        <router-link :to="{ name: menu[menu.length - 1].name }">
          <el-menu-item :index="menu[menu.length - 1].name">
            <Icon :name="menu[menu.length - 1].icon" size="20" class="mr-2" />
            <template #title
              ><p class="paragraph-2">
                {{ menu[menu.length - 1].title }}
              </p></template
            >
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
    <RouterLink :to="{ name: 'Profile' }" class="p-6 flex items-center gap-3">
      <img class="w-10 h-10" src="@/assets/images/profile.png" />
      <div class="grow min-w-0 overflow-hidden">
        <div class="flex items-center gap-1">
          <h6 class="heading-6 truncate max-w-[200px]">{{ user?.fullName }}</h6>
        </div>
        <p class="paragraph-3 truncate">{{ user?.role }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Notifications from "@/components/layout/Notifications.vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const { t } = useI18n();

const route = useRoute();
const activeName = computed(() => route.meta.activeMenu);

const user = computed(() => authStore.user);

const menu = computed(() => [
  {
    title: t("common.menu.settings"),
    icon: "local-settings",
    name: "Settings",
  },
]);

const showNotificationModal = ref(false);

const showNotifications = () => {
  showNotificationModal.value = !showNotificationModal.value;
};
</script>
