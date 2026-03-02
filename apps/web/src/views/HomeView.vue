<template>
  <div class="p-4 space-y-6">
    <h1 class="text-xl font-bold">
      PlayPoint Debug
      <span class="text-xs font-mono text-gray-400">{{ version }}</span>
    </h1>

    <!-- Auth status -->
    <section>
      <h2 class="font-semibold mb-1">Auth</h2>
      <p v-if="userStore.loading" class="text-gray-400 text-sm">Authenticating...</p>
      <p v-else-if="userStore.error" class="text-red-500 text-sm">{{ userStore.error }}</p>
      <p v-else-if="userStore.isAuthenticated" class="text-green-500 text-sm">Authenticated</p>
    </section>

    <!-- Telegram raw data -->
    <section>
      <h2 class="font-semibold mb-1">Telegram initDataUnsafe</h2>
      <pre class="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-auto">{{ telegramRaw }}</pre>
    </section>

    <!-- Backend DB user -->
    <section>
      <h2 class="font-semibold mb-1">Backend user (DB)</h2>
      <pre class="bg-gray-900 text-green-400 text-xs p-3 rounded overflow-auto">{{ backendRaw }}</pre>
    </section>

    <!-- JWT -->
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
const version = __COMMIT_HASH__

const telegramRaw = computed(() =>
  JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe ?? 'No Telegram context', null, 2)
)

const backendRaw = computed(() =>
  JSON.stringify(userStore.dbUser ?? 'Not authenticated yet', null, 2)
)

onMounted(() => {
  userStore.authenticate()
})
</script>
