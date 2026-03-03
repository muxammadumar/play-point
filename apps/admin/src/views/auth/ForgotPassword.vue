<template>
  <div class="bg-white p-6 rounded-xl w-[480px]">
    <el-button @click="back()" class="square mb-3" :icon="ArrowLeft" />
    <div v-if="!emailSent">
      <h2 class="heading-2 mb-3">{{ $t("auth.forgotPassword.title") }}</h2>
      <p class="paragraph-1 mb-4">{{ $t("auth.forgotPassword.description") }}</p>
      <el-alert
        v-if="error"
        :title="t(`error.${error}`)"
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
      >
        <el-form-item prop="email" :label="$t('form.email.label')">
          <el-input
            v-model="form.email"
            :placeholder="$t('form.email.placeholder')"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          :disabled="loading"
          @click="submitForm"
          type="primary"
          class="w-full"
          >{{ t("common.button.next") }}</el-button
        >
      </el-form>
    </div>
    <div v-else>
      <!-- <el-alert
        :title="t('warning.linkExpired')"
        type="info"
        show-icon
        class="!mb-3"
        :closable="false"
      /> -->
      <h2 class="heading-2 mb-3">{{ $t("auth.linkVerification.title") }}</h2>
      <p class="paragraph-1 mb-4">{{ $t("auth.linkVerification.description") }}</p>
      <a
        class="w-full block mb-4"
        href="https://mail.google.com/mail/"
        target="_blank"
      >
        <el-button class="w-full flex items-center">
          <Icon name="local-gmail" size="16" class="mr-2" />
          {{ $t("common.button.gmail") }}</el-button
        >
      </a>
      <a
        class="w-full block mb-5"
        href="https://outlook.live.com"
        target="_blank"
      >
        <el-button class="w-full flex items-center"
          ><Icon name="local-outlook" size="16" class="mr-2" />
          {{ $t("common.button.outlook") }}</el-button
        >
      </a>
      <div @click="submitForm('resend')" class="text-center block">
        <el-link> {{ $t("common.link.resend") }} </el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import type { IForgotPasswordRequest } from "@/types";
import { ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const { t } = useI18n();

const authStore = useAuthStore();

const loading = ref(false);
const error = ref<string | null>(null);
const emailSent = ref(false);

const formRef = ref();
const form = ref<IForgotPasswordRequest>({
  email: "",
});

const rules = {
  email: [
    { required: true, message: t("form.email.required") },
    { type: "email", message: t("form.email.invalid") },
  ],
};

const submitForm = (type?: "submit" | "resend") => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    try {
      loading.value = true;
      await authStore.forgotPassword(form.value);
      emailSent.value = true;
    } catch (err: any) {
      if (err.response?.data?.message) {
        error.value = err.response?.data?.message;
      }
    } finally {
      loading.value = false;

      // should be removed this is just a mock
      // emailSent.value = true;
    }
  });
};

const back = () => {
  if (emailSent.value) {
    emailSent.value = false;
  } else {
    router.back();
  }
};
</script>
