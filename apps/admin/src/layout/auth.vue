<template>
  <el-container>
    <el-header class="fixed top-0 z-50 w-full">
      <AuthHeader />
    </el-header>
    <el-main class="!flex items-center justify-center">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import AuthHeader from "@/components/layout/AuthHeader.vue";
</script>
