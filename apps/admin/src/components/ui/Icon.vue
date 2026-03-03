<template>
  <component
    v-if="isElementIcon && ElIconComp"
    :is="ElIconComp"
    :style="{
      color,
      width: normalizedSize,
      height: normalizedSize,
    }"
  />

  <component
    v-else-if="isLocalIcon && LocalIconComp"
    :is="LocalIconComp"
    :style="{
      color: color,
      width: normalizedSize,
      height: normalizedSize,
      display: 'block',
    }"
  />
  <span v-else style="color: red">⚠ Unknown icon</span>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
import type { IIconProps } from "@/types";

const props = withDefaults(defineProps<IIconProps>(), {
  color: "currentColor",
  size: 20,
});

const isElementIcon = computed(() => props.name.startsWith("el-"));
const isLocalIcon = computed(() => props.name.startsWith("local-"));

const iconName = computed(() => props.name.replace(/^el-|^local-/, ""));

const normalizedSize = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size
);

const ElIconComp = computed(() => {
  if (!isElementIcon.value) return null;
  const compName =
    iconName.value.charAt(0).toUpperCase() + iconName.value.slice(1);
  return (ElIcons as Record<string, any>)[compName] || null;
});

const LocalIconComp = computed(() => {
  if (!isLocalIcon.value) return null;
  return defineAsyncComponent(
    () => import(`@/assets/icons/${iconName.value}.svg`)
  );
});
</script>
