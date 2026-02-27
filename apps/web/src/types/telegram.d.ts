// Minimal Telegram Web App type declarations
// Full types available via @twa-dev/types if needed later

interface TelegramWebAppUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

interface TelegramWebApp {
  ready(): void
  expand(): void
  close(): void
  enableClosingConfirmation(): void
  initData: string
  initDataUnsafe: {
    user?: TelegramWebAppUser
    query_id?: string
    auth_date: number
    hash: string
  }
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    show(): void
    hide(): void
    onClick(fn: () => void): void
    offClick(fn: () => void): void
  }
  BackButton: {
    isVisible: boolean
    show(): void
    hide(): void
    onClick(fn: () => void): void
    offClick(fn: () => void): void
  }
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp
  }
}
