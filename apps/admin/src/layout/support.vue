<template>
  <el-container>
    <el-aside class="!overflow-visible" width="272px">
      <Sidebar />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from "@/components/layout/SIdebar.vue";
</script>
