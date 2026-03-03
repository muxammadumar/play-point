<template>
  <div class="bg-white p-6 rounded-xl w-[480px]">
    <h2 class="heading-2 mb-4 text-center">{{ $t("auth.login.title") }}</h2>

    <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      class="!mb-4"
      :closable="false"
    />

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-position="'top'"
      @submit.prevent="handleLogin"
    >
      <el-form-item
        prop="email"
        :label="$t('form.email.label')"
        :error="error ? t('form.email.invalid') : ''"
      >
        <el-input
          v-model="form.email"
          :placeholder="$t('form.email.placeholder')"
        />
      </el-form-item>

      <el-form-item
        prop="password"
        :label="$t('form.password.label')"
        :error="error ? t('form.password.invalid') : ''"
        class="mb-4"
      >
        <el-input
          v-model="form.password"
          :placeholder="$t('form.password.placeholder')"
          type="password"
          show-password
        />
      </el-form-item>

      <el-button
        type="primary"
        class="w-full mb-4"
        :loading="loading"
        :disabled="loading"
        @click="handleLogin"
      >
        {{ $t("common.button.login") }}
      </el-button>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import type { ILoginPayload } from "@/types";

const { t } = useI18n();
const authStore = useAuthStore();

const formRef = ref();
const form = ref<ILoginPayload>({
  email: "",
  password: "",
});

const error = ref<string | null>(null);

const loading = ref(false);

const rules = {
  email: [
    { required: true, message: t("form.email.required") },
    { type: "email", message: t("form.email.invalid") },
  ],
  password: [{ required: true, message: t("form.password.required") }],
};

const handleLogin = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;

    try {
      loading.value = true;
      await authStore.login(form.value);
    } catch (err: any) {
      error.value = err.response?.data?.message;
    } finally {
      loading.value = false;
    }
  });
};
</script>
