<template>
  <div
    ref="notificationRef"
    class="w-110 absolute top-5 left-[calc(100%+20px)] bg-white p-6 pt-8 z-10 h-[calc(100%-40px)] rounded-3xl overflow-hidden nt-shadow"
  >
    <div class="flex items-center justify-between w-full mb-4">
      <h2 class="text-xl">{{ $t("common.notifications.title") }}</h2>
      <div class="flex gap-4">
        <el-tooltip
          class="box-item"
          effect="light"
          :content="$t('common.notifications.markAllAsRead')"
          placement="bottom-end"
        >
          <Icon
            @click="markAllAsRead"
            class="cursor-pointer"
            name="local-double-check"
            color="#171717"
            size="24"
          />
        </el-tooltip>
        <Icon
          @click="close"
          class="cursor-pointer"
          name="el-close"
          color="#171717"
          size="24"
        />
      </div>
    </div>
    <!-- <p>This is where notification content would go.</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["close"]);
const notificationRef = ref<HTMLElement | null>(null);

const markAllAsRead = () => {};

const close = () => {
  emit("close");
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    notificationRef.value &&
    !notificationRef.value.contains(event.target as Node)
  ) {
    close();
  }
};

onMounted(() => {
  // Add a small delay to prevent immediate closing if the notification was just opened
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 100);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss">
.nt-shadow {
  box-shadow: 0px 96px 96px -32px #3333330f, 0px 48px 48px -24px #3333330a,
    0px 24px 24px -12px #3333330a, 0px 12px 12px -6px #3333330a,
    0px 6px 6px -3px #3333330a, 0px 3px 3px -1.5px #33333305,
    0px 1px 1px 0.5px #3333330a, 0px 0px 0px 1px #3333330a,
    0px -1px 1px -0.5px #3333330f inset;
}
</style>
