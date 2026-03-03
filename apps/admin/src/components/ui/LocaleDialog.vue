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
        {{ $t("user.settings.general.language") }}
      </p>
    </template>
    <el-radio-group
      v-model="tempLocale"
      class="custom-radio mb-6"
      size="large"
    >
      <el-radio value="en">
        <div class="flex items-center">
          <Icon name="local-flag-en" class="mr-4 w-5" size="24" />
          English
        </div>
      </el-radio>
      <el-radio value="ru">
        <div class="flex items-center">
          <Icon name="local-flag-ru" class="mr-4 w-5" size="24" />
          Русский
        </div>
      </el-radio>
      <el-radio value="uz">
        <div class="flex items-center">
          <Icon name="local-flag-uz" class="mr-4 w-5" size="24" />
          O'zbekcha
        </div>
      </el-radio>
    </el-radio-group>
    <div class="flex justify-center">
      <el-button class="!h-12 w-1/2" size="large" @click="emit('close')">{{
        $t("common.button.cancel")
      }}</el-button>
      <el-button
        class="!h-12 w-1/2"
        size="large"
        type="primary"
        @click="saveLocale()"
        >{{ $t("common.button.save") }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";
import { computed, ref } from "vue";
import type { Language } from "@/types";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const visible = computed(() => props.open);

const { locale, setLocale } = useLocale();

const tempLocale = ref<Language>(locale.value as Language);

const saveLocale = () => {
  setLocale(tempLocale.value);
  emit("close");
};
</script>
