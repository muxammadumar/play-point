<template>
  <el-dialog
    v-model="visible"
    width="540"
    align-center
    :show-close="false"
    @close="emit('close')"
  >
    <template #header>
      <p class="text-xl text-left font-normal">
        {{ $t("auth.changePasswordDialog.title") }}
      </p>
    </template>

    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item
        prop="oldPassword"
        :label="$t('form.oldPassword.label')"
        class="mb-4"
      >
        <el-input
          v-model="form.oldPassword"
          :placeholder="$t('form.oldPassword.placeholder')"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        prop="password"
        :label="$t('form.password.label')"
        class="mb-4"
      >
        <el-input
          v-model="form.password"
          :placeholder="$t('form.password.placeholder')"
          type="password"
          show-password
          autocomplete="off"
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
          show-password
          autocomplete="off"
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
      <div class="flex justify-center gap-4 mt-6">
        <el-button class="!h-12 w-1/2" size="large" @click="emit('close')">
          {{ $t("common.button.cancel") }}
        </el-button>
        <el-button
          class="!h-12 w-1/2"
          size="large"
          type="primary"
          :disabled="!isFormValid"
          @click="handleSubmit"
        >
          {{ $t("common.button.save") }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import type { FormRules } from "element-plus";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/auth";

const { t } = useI18n();
const authStore = useAuthStore();

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["close", "submit"]);

const visible = computed(() => props.open);

type FormModel = {
  oldPassword: string;
  password: string;
  password_confirmation: string;
};

const formRef = ref<FormInstance>();
const form = ref<FormModel>({
  oldPassword: "",
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

const rules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: t("form.oldPassword.required"),
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: t("form.password.required"),
      trigger: "blur",
    },
    {
      validator: (
        rule: any,
        value: string,
        callback: (err?: Error) => void
      ) => {
        const pwd = value ?? "";

        if (pwd.length < 8) {
          return callback(new Error(t("form.password.minLen")));
        }
        if (!/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd)) {
          return callback(new Error(t("form.password.characters")));
        }
        if (!/[\d\W]/.test(pwd)) {
          return callback(new Error(t("form.password.digit")));
        }

        callback();
      },
      trigger: "blur",
    },
  ],

  password_confirmation: [
    {
      required: true,
      message: t("form.password.required"),
      trigger: "blur",
    },
    {
      validator: (
        rule: any,
        value: string,
        callback: (err?: Error) => void
      ) => {
        const confirmation = value ?? "";
        if (confirmation === "") {
          return callback(new Error(t("form.password.required")));
        }
        if (confirmation !== form.value.password) {
          return callback(new Error(t("form.password.match")));
        }
        callback();
      },
      trigger: "blur",
    },
  ],
};

const isFormValid = computed(() => {
  return (
    form.value.oldPassword.trim().length > 0 &&
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
    await authStore.updatePassword({
      oldPassword: form.value.oldPassword,
      newPassword: form.value.password,
    });
    // emit("submit", {
    //   oldPassword: form.value.oldPassword,
    //   newPassword: form.value.password,
    // });
    emit("close");
  } catch (err) {
    console.log("Validation failed:", err);
  }
};
</script>
