<template>
  <div class="overflow-auto h-full">
    <el-row :gutter="12">
      <el-col :span="12">
        <div class="bg-[#FAFAFA] rounded-xl p-4">
          <el-descriptions :column="1" label-width="220">
            <el-descriptions-item :label="$t('user.profile.email')">
              <el-link
                class="!text-[#171717] hover:!text-[#E93544]"
                :href="`mailto:${user?.email}`"
              >
                {{ user?.email }}
              </el-link>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.phone')">
              <el-link
                class="!text-[#171717] hover:!text-[#E93544]"
                :href="`tel:+998909909099`"
              >
                +99890 990 90 99
              </el-link>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.gender')">
              {{ $t("user.profile.female") }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.birthDate')">
              19.04.1980 (45 {{ $t("common.date.year") }})
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bg-[#FAFAFA] rounded-xl p-4">
          <el-descriptions :column="1" label-width="220">
            <el-descriptions-item :label="$t('user.profile.role')">
              <!-- {{ user?.role }} -->
              Агент технической поддержки
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.languages')">
              <div class="flex items-center gap-3">
                <div class="flex items-center">
                  <Icon name="local-flag-en" class="mr-2" :size="18" />
                  English
                </div>
                <div class="flex items-center">
                  <Icon name="local-flag-ru" class="mr-2" :size="18" />
                  Русский
                </div>
                <div class="flex items-center">
                  <Icon name="local-flag-uz" class="mr-2" :size="18" />
                  O'zbekcha
                </div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.createdAt')">
              <!-- {{ user?.createdAt }} -->
              29 Июня, 2024
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.profile.lastLogin')">
              <!-- {{ user?.lastLogin }} -->
              20:02, 26 Октября, 2025
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>
