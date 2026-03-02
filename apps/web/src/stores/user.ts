import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tgUser } from '@/config/telegram'
import api from '@/lib/axios'

export const useUserStore = defineStore('user', () => {
  const telegramUser = ref(tgUser ?? null)
  const token = ref<string | null>(null)
  const dbUser = ref<Record<string, unknown> | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const displayName = computed(() =>
    telegramUser.value
      ? `${telegramUser.value.first_name} ${telegramUser.value.last_name ?? ''}`.trim()
      : 'Guest'
  )

  async function authenticate() {
    const telegramInitData = window.Telegram?.WebApp?.initData
    if (telegramInitData) {
      // Save for devtools testing
      localStorage.setItem('tg_init_data', telegramInitData)
    }
    const initData = telegramInitData || localStorage.getItem('tg_init_data')
    if (!initData) {
      error.value = 'Not running inside Telegram'
      return
    }

    loading.value = true
    error.value = null
    try {
      const res = await api.post('/auth/telegram', { initData })
      token.value = res.data.access_token
      dbUser.value = res.data.user
      localStorage.setItem('token', res.data.access_token)
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Authentication failed'
    } finally {
      loading.value = false
    }
  }

  function setToken(t: string) {
    token.value = t
  }

  function reset() {
    telegramUser.value = null
    token.value = null
    dbUser.value = null
    localStorage.removeItem('token')
  }

  return { telegramUser, token, dbUser, loading, error, isAuthenticated, displayName, setToken, reset, authenticate }
})
