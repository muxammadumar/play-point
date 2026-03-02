<template>
  <div class="p-4 space-y-6">
    <h1 class="text-xl font-bold">PlayPoint Debug</h1>

    <section>
      <h2 class="font-semibold mb-1">Telegram initDataUnsafe</h2>
      <pre class="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-auto">{{ telegramRaw }}</pre>
    </section>

    <section>
      <h2 class="font-semibold mb-1">initData (raw string)</h2>
      <pre class="bg-gray-900 text-yellow-400 text-xs p-3 rounded overflow-auto break-all whitespace-pre-wrap">{{ initDataRaw }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const telegramRaw = computed(() =>
  JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe ?? 'No Telegram context', null, 2)
)

const initDataRaw = computed(() =>
  window.Telegram?.WebApp?.initData || 'No initData'
)
</script>
