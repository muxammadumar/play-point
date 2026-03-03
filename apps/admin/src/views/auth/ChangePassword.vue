<template>
  <div class="bg-white p-6 rounded-xl w-[480px]">
    <h2 class="heading-2 mb-4 text-center">{{ $t("auth.changePassword.title") }}</h2>
    <!-- <el-alert
      :title="t('error.accountBlocked')"
      type="error"
      show-icon
      class="!mb-4"
      :closable="false"
    /> -->
    <!-- <el-form ref="formRef" :model="form" :rules="rules" :label-position="'top'"> -->
    <el-form ref="formRef" :model="form" :label-position="'top'">
      <el-form-item
        prop="password"
        :label="$t('form.password.label')"
        class="mb-4"
      >
        <el-input
          v-model="form.password"
          :placeholder="$t('form.password.placeholder')"
          type="password"
          :show-password="true"
        />
      </el-form-item>
      <el-form-item
        prop="password_confirmation"
        :label="$t('form.password.confirmationLabel')"
        class="mb-4"
      >
        <el-input
          v-model="form.password_confirmation"
          :placeholder="$t('form.password.placeholder')"
          type="password"
          :show-password="true"
        />
      </el-form-item>
      <ul class="el-bullet_list mb-4">
        <li
          class="text-sm mb-1 flex items-center"
          :class="getValidationClass('minLength')"
        >
          <span class="mr-2 w-2">
            {{ passwordValidation.minLength ? "✓" : form.password ? "✕" : "•" }}
          </span>
          {{ $t("form.password.minLen") }}
        </li>

        <li
          class="text-sm mb-1 flex items-center"
          :class="getValidationClass('hasCase')"
        >
          <span class="mr-2 w-2">
            {{ passwordValidation.hasCase ? "✓" : form.password ? "✕" : "•" }}
          </span>
          {{ $t("form.password.characters") }}
        </li>

        <li
          class="text-sm mb-1 flex items-center"
          :class="getValidationClass('hasDigitOrSymbol')"
        >
          <span class="mr-2 w-2">
            {{
              passwordValidation.hasDigitOrSymbol
                ? "✓"
                : form.password
                ? "✕"
                : "•"
            }}
          </span>
          {{ $t("form.password.digit") }}
        </li>

        <li
          class="text-sm mb-1 flex items-center"
          :class="getValidationClass('passwordsMatch')"
        >
          <span class="mr-2 w-2">
            {{
              passwordValidation.passwordsMatch
                ? "✓"
                : form.password && form.password_confirmation
                ? "✕"
                : "•"
            }}
          </span>
          {{ $t("form.password.match") }}
        </li>
      </ul>

      <el-button
        type="primary"
        class="w-full mb-4"
        @click="handleSubmit"
        :disabled="!isFormValid"
      >
        {{ $t("common.button.next") }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";

const route = useRoute();
const formRef = ref<FormInstance>();
const authStore = useAuthStore();

const form = ref({
  password: "",
  password_confirmation: "",
});

const passwordValidation = computed(() => ({
  minLength: form.value.password.length >= 8,
  hasCase:
    /[A-Z]/.test(form.value.password) && /[a-z]/.test(form.value.password),
  hasDigitOrSymbol: /[\d\W]/.test(form.value.password),
  passwordsMatch:
    form.value.password === form.value.password_confirmation &&
    form.value.password !== "" &&
    form.value.password_confirmation !== "",
}));

const getValidationClass = (rule: keyof typeof passwordValidation.value) => {
  const isValid = passwordValidation.value[rule];

  if (rule === "passwordsMatch") {
    if (form.value.password !== "" && form.value.password_confirmation !== "") {
      return isValid ? "text-green-600" : "text-red-600";
    }
    return "text-gray-500";
  } else {
    if (form.value.password !== "") {
      return isValid ? "text-green-600" : "text-red-600";
    }
    return "text-gray-500";
  }
};

const isFormValid = computed(() => {
  return (
    passwordValidation.value.minLength &&
    passwordValidation.value.hasCase &&
    passwordValidation.value.hasDigitOrSymbol &&
    passwordValidation.value.passwordsMatch
  );
});

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    await authStore.changePassword({
      password: form.value.password,
      token: route.query.t as string,
    });
  } catch (error) {
    console.log("Validation failed:", error);
  }
};
</script>
