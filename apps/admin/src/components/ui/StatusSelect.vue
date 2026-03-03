<template>
  <el-select v-model="status">
    <template #prefix>
      <div
        class="rounded-full w-3 h-3 mr-1"
        :style="{ backgroundColor: activeStatus?.color }"
      ></div>
    </template>
    <el-option
      v-for="status in statuses"
      :key="status.value"
      :label="status.label"
      :value="status.value"
    >
      <div class="flex items-center">
        <div
          class="rounded-full w-3 h-3 mr-2"
          :style="{ backgroundColor: status.color }"
        ></div>
        {{ status.label }}
      </div>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref, computed} from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const statuses = [
  {
    label: t("operator.status.online"),
    value: "online",
    color: "#1FC16B",
  },
  {
    label: t("operator.status.offline"),
    value: "offline",
    color: "#CACFD8",
  },
  {
    label: t("operator.status.on_break"),
    value: "on_break",
    color: "#FFD268",
  },
];

const status = ref("online");

const activeStatus = computed(() => {
  return statuses.find(s => s.value === status.value);
});

</script>
