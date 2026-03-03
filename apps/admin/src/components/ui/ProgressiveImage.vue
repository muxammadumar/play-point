<template>
  <div
    class="w-full h-full relative overflow-hidden cursor-pointer select-none group"
    @click="loadFullImage"
  >
    <img
      v-if="placeholder && !loaded"
      :src="placeholder"
      class="w-full object-cover blur-md scale-105 transition"
      :class="{ 'opacity-0': loaded }"
      alt="preview"
    />

    <img
      v-if="loaded"
      :src="src"
      @load="onLoad"
      @click.stop="openLightbox"
      class="w-full object-cover transition-opacity duration-500"
      :class="{
        'opacity-0': !imageReady,
        'opacity-100': imageReady,
      }"
      alt="image"
    />

    <div
      v-if="!loaded"
      class="z-10 absolute inset-0 flex items-center justify-center bg-black/20 text-white text-sm opacity-0 group-hover:opacity-100 transition"
    >
      <Icon name="el-download" size="32" />
    </div>

    <vue-easy-lightbox
      v-if="src"
      :visible="visible"
      :imgs="[src]"
      @hide="visible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

defineProps<{
  src?: string;
  placeholder?: string;
}>();

const loaded = ref(false);
const imageReady = ref(false);
const visible = ref(false);

function loadFullImage() {
  if (!loaded.value) loaded.value = true;
}

function onLoad() {
  imageReady.value = true;
}

function openLightbox() {
  if (imageReady.value) visible.value = true;
}
</script>
