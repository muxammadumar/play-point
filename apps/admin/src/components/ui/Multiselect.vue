<template>
  <div ref="selectRef" class="relative">
    <div class="cursor-pointer select-none" @click="toggleDropdown">
      <div
        v-if="!selectedValues || selectedValues.length === 0"
        class="py-1.5 px-2 rounded-xl leading-normal h-8"
        :class="{
          'bg-white text-[#303133]': showOptions,
          'text-[#909399]': !showOptions,
        }"
      >
        {{ $t("appeals.single.notAssigned") }}
      </div>

      <div v-else class="flex flex-wrap gap-1 py-1 px-2">
        <slot name="selected" :options="selectedValues">
          <div
            v-for="(item, idx) in selectedValues"
            :key="idx"
            class="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-lg text-sm"
          >
            <span>{{ item?.name }}</span>
            <button
              @click.stop="removeOption(item)"
              class="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </slot>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-show="showOptions"
        ref="dropdownRef"
        class="fixed z-[9999] bg-white rounded-xl shadow-[0px_12px_32px_4px_#0000000A] min-w-[220px] py-1 px-2 max-h-[300px] overflow-y-auto"
        :style="dropdownStyle"
      >
        <el-input
          size="default"
          v-if="showSearch"
          v-model="searchInput"
          class="responsive-input sticky top-0 bg-white z-10 mb-2"
          :placeholder="$t('common.filter.search.placeholder')"
          :suffix-icon="Search"
        />
        <el-empty
          v-if="!filteredOptions?.length"
          :image-size="48"
          class="w-full"
        >
        </el-empty>
        <div
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors flex items-center gap-2"
          :class="{ 'bg-blue-50': isSelected(option) }"
          @click="toggleOption(option)"
        >
          <input
            type="checkbox"
            :checked="isSelected(option)"
            class="w-4 h-4"
            @click.stop
          />
          <slot name="option" :option="option">
            {{ option?.name }}
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: {
    type: [Array, null] as () => any[] | null,
    default: null,
  },
  options: {
    type: Array as () => any[],
    required: true,
  },
  showSearch: {
    type: Boolean,
  },
  searchKey: {
    type: String,
    default: "name",
  },
  compareKey: {
    type: String,
    default: "id",
  },
});

const emit = defineEmits(["update:modelValue"]);

const showOptions = ref(false);
const searchInput = ref("");
const selectRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref({});

const selectedValues = computed(() => {
  return props.modelValue ?? [];
});

const filteredOptions = computed(() => {
  if (!searchInput.value) return props.options;

  const query = searchInput.value.toLowerCase();
  return props.options.filter((option) => {
    const searchValue = option[props.searchKey];
    return searchValue && searchValue.toLowerCase().includes(query);
  });
});

const updateDropdownPosition = () => {
  if (!selectRef.value) return;

  nextTick(() => {
    if (!selectRef.value) return;

    const rect = selectRef.value.getBoundingClientRect();

    dropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    };
  });
};

const toggleDropdown = () => {
  showOptions.value = !showOptions.value;
  if (showOptions.value) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
};

const isSelected = (option: any) => {
  return selectedValues.value.some(
    (item) => item[props.compareKey] === option[props.compareKey]
  );
};

const toggleOption = (option: any) => {
  const currentValues = selectedValues.value;
  const index = currentValues.findIndex(
    (item) => item[props.compareKey] === option[props.compareKey]
  );

  let newValue;
  if (index > -1) {
    newValue = currentValues.filter(
      (item) => item[props.compareKey] !== option[props.compareKey]
    );
  } else {
    newValue = [...currentValues, option];
  }

  emit("update:modelValue", newValue);
};

const removeOption = (option: any) => {
  const newValue = selectedValues.value.filter(
    (item) => item[props.compareKey] !== option[props.compareKey]
  );
  emit("update:modelValue", newValue);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    selectRef.value &&
    !selectRef.value.contains(target) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(target)
  ) {
    showOptions.value = false;
    searchInput.value = "";
  }
};

const handleScroll = () => {
  if (showOptions.value) {
    updateDropdownPosition();
  }
};

const handleResize = () => {
  if (showOptions.value) {
    updateDropdownPosition();
  }
};

watch(showOptions, (visible) => {
  if (visible) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll, true);
  window.removeEventListener("resize", handleResize);
});
</script>
