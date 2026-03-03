<template>
  <div class="bg-white p-6 rounded-xl w-[480px]">
    <h2 class="heading-2 mb-2 text-center">{{ $t("auth.idleLock.title") }}</h2>
    <p class="paragraph-1 mb-4 text-center">{{ $t("auth.idleLock.description") }}</p>
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
      @submit.prevent="unlock"
    >
      <el-form-item
        :error="error ? t('form.email.invalid') : ''"
        prop="email"
        :label="$t('form.email.label')"
      >
        <el-input
          :readonly="authStore.user?.email !== ''"
          v-model="form.email"
          :placeholder="$t('form.email.placeholder')"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        :label="$t('form.password.label')"
        class="mb-4"
        :error="error ? t('form.password.invalid') : ''"
      >
        <el-input
          v-model="form.password"
          :placeholder="$t('form.password.placeholder')"
          type="password"
          :show-password="true"
        />
      </el-form-item>

      <el-button @click="unlock" type="primary" class="w-full mb-4">{{
        t("common.button.unblock")
      }}</el-button>
      <router-link
        :to="{ name: 'ForgotPassword' }"
        class="w-full block text-center"
      >
        <el-link>{{ $t("common.link.forgotPassword") }}</el-link>
      </router-link>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ILoginPayload } from "@/types";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const { t } = useI18n();

const formRef = ref();

const form = ref<ILoginPayload>({
  email: authStore.user?.email || "",
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

const unlock = async () => {
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
