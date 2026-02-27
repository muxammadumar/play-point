// Telegram Web App SDK helpers
// Docs: https://core.telegram.org/bots/webapps

export const tg = window.Telegram?.WebApp

export function initTelegram() {
  if (!tg) return
  tg.ready()
  tg.expand()
  tg.enableClosingConfirmation()
}

export const tgUser = tg?.initDataUnsafe?.user
