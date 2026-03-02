<template>
  <div class="p-4 space-y-6">
    <h1 class="text-xl font-bold">PlayPoint Debug 1.0</h1>

    <button
      class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      :disabled="userStore.loading"
      @click="userStore.authenticate()"
    >
      {{ userStore.loading ? 'Authenticating...' : 'Authenticate with Telegram' }}
    </button>

    <p v-if="userStore.error" class="text-red-500 text-sm">{{ userStore.error }}</p>

    <!-- Telegram raw data -->
    <section>
      <h2 class="font-semibold mb-1">Telegram initDataUnsafe</h2>
      <pre class="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-auto">{{ telegramRaw }}</pre>
    </section>

    <!-- Backend response -->
    <section>
      <h2 class="font-semibold mb-1">Backend user (DB)</h2>
      <pre class="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-auto">{{ backendRaw }}</pre>
    </section>

    <!-- JWT token -->
    <section v-if="userStore.token">
      <h2 class="font-semibold mb-1">JWT token</h2>
      <pre class="bg-gray-900 text-yellow-400 text-xs p-3 rounded overflow-auto break-all whitespace-pre-wrap">{{ userStore.token }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const telegramRaw = computed(() =>
  JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe ?? 'No Telegram context', null, 2)
)

const backendRaw = computed(() =>
  JSON.stringify(userStore.dbUser ?? 'Not authenticated yet', null, 2)
)

onMounted(() => {
  // Auto-authenticate if running inside Telegram
  if (window.Telegram?.WebApp?.initData) {
    userStore.authenticate()
  }
})
</script>
