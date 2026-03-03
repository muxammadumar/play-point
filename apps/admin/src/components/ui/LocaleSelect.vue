<template>
  <el-select v-model="locale" @change="setLocale">
    <template #prefix>
      <Icon v-show="locale === 'en'" name="local-flag-en" class="w-5" />
      <Icon v-show="locale === 'ru'" name="local-flag-ru" class="w-5" />
      <Icon v-show="locale === 'uz'" name="local-flag-uz" class="w-5" />
    </template>
    <el-option label="English" value="en">
      <div class="flex items-center">
        <Icon name="local-flag-en" class="mr-2 w-5" />
        English
        <Icon name="el-check" class="ml-auto" v-if="locale === 'en'" size="16"/>
      </div>
    </el-option>
    <el-option label="Русский" value="ru">
      <div class="flex items-center">
        <Icon name="local-flag-ru" class="mr-2 w-5" />
        Русский
        <Icon name="el-check" class="ml-auto" v-if="locale === 'ru'" size="16"/>
      </div>
    </el-option>
    <el-option label="O'zbekcha" value="uz">
      <div class="flex items-center">
        <Icon name="local-flag-uz" class="mr-2 w-5" />
        O'zbekcha
        <Icon name="el-check" class="ml-auto" v-if="locale === 'uz'" size="16"/>
      </div>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";
import Icon from "./Icon.vue";

const { locale, setLocale } = useLocale();
</script>
