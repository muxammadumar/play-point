import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = import.meta.env.VITE_API_TOKEN
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - Please check your credentials')
          break
        case 403:
          console.error('Forbidden - You do not have permission')
          break
        case 404:
          console.error('Not Found - The requested resource was not found')
          break
        case 500:
          console.error('Server Error - Please try again later')
          break
        default:
          console.error(`Error ${error.response.status}: ${error.message}`)
      }
    } else if (error.request) {
      console.error('Network Error - Please check your connection')
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient


