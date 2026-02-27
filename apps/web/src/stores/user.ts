import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tgUser } from '@/config/telegram'

export const useUserStore = defineStore('user', () => {
  const telegramUser = ref(tgUser ?? null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!telegramUser.value)
  const displayName = computed(() =>
    telegramUser.value
      ? `${telegramUser.value.first_name} ${telegramUser.value.last_name ?? ''}`.trim()
      : 'Guest'
  )

  function setToken(t: string) {
    token.value = t
  }

  function reset() {
    telegramUser.value = null
    token.value = null
  }

  return { telegramUser, token, isAuthenticated, displayName, setToken, reset }
})
