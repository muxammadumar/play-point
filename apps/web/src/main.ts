import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { initTelegram } from './config/telegram'
import './style.css'
import App from './App.vue'

initTelegram()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
