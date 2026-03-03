<template>
  <el-dialog
    @close="emit('close')"
    v-model="visible"
    width="448"
    align-center
    :show-close="false"
    center
  >
    <template #header>
      <p class="text-2xl font-medium mb-2">
        {{ $t("user.profile.logOut") }}
      </p>
    </template>

    <div class="flex justify-center">
      <el-button class="!h-12 w-1/2" size="large" @click="emit('close')">{{
        $t("common.button.cancel")
      }}</el-button>
      <el-button
        class="!h-12 w-1/2"
        size="large"
        type="primary"
        @click="logout()"
        >{{ $t("user.profile.logOut") }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const authStore = useAuthStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const visible = computed(() => props.open);

const logout = () => {
  authStore.logout();
  emit("close");
};
</script>
