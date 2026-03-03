import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token as Bearer on every request (except auth endpoint)
api.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url?.startsWith('/auth')
  if (!isAuthEndpoint) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api
