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

      <div v-if="!userStore.isAuthenticated && !userStore.loading" class="mt-3 space-y-2">
        <textarea
          v-model="manualInitData"
          placeholder="Paste initData here to test in browser..."
          class="w-full bg-gray-900 text-green-400 text-xs p-2 rounded border border-gray-700 h-20 resize-none"
        />
        <button
          class="px-3 py-1 bg-blue-600 text-white text-sm rounded disabled:opacity-50"
          :disabled="!manualInitData"
          @click="authenticateManual"
        >
          Authenticate
        </button>
      </div>
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
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const version = __COMMIT_HASH__
const manualInitData = ref(localStorage.getItem('tg_init_data') ?? '')

const telegramRaw = computed(() =>
  JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe ?? 'No Telegram context', null, 2)
)

const backendRaw = computed(() =>
  JSON.stringify(userStore.dbUser ?? 'Not authenticated yet', null, 2)
)

function toUrlEncoded(input: string): string {
  try {
    const obj = JSON.parse(input)
    // Convert JSON object to URL-encoded initData string
    return Object.entries(obj)
      .map(([key, val]) => {
        const value = typeof val === 'object' ? JSON.stringify(val) : String(val)
        return `${key}=${encodeURIComponent(value)}`
      })
      .join('&')
  } catch {
    // Already a raw string, return as-is
    return input
  }
}

function authenticateManual() {
  const encoded = toUrlEncoded(manualInitData.value.trim())
  localStorage.setItem('tg_init_data', encoded)
  userStore.authenticate()
}

onMounted(() => {
  userStore.authenticate()
})
</script>
