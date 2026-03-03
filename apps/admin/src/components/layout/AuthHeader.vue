<template>
  <header class="flex items-center justify-between py-10 px-[120px]">
    <router-link :to="{ name: 'Profile' }" name="home">
      <img src="/Logo.svg" alt="Logo" />
    </router-link>
    <el-form-item class="w-[170px] !mb-0">
      <LocaleSelect />
    </el-form-item>
  </header>
</template>

<script setup lang="ts">
import LocaleSelect from "@/components/ui/LocaleSelect.vue";
</script>
