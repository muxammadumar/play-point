<template>
  <div class="w-fit flex items-center gap-2">
    <el-avatar
      :size="Number(size)"
      :src="imageError ? undefined : src"
      :shape="shape"
      class="avatar-fallback"
      @error="handleError"
    >
      <Icon name="local-avatar" :size="props.size" />
    </el-avatar>
    <span>{{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "@/components/ui/Icon.vue";
import type { IUserInfoProps } from "@/types";

const props = withDefaults(defineProps<IUserInfoProps>(), {
  src: "",
  size: "default",
  shape: "circle",
  name: "",
});

const imageError = ref<boolean>(false);

const handleError = (): boolean => {
  imageError.value = true;
  return true;
};
</script>
