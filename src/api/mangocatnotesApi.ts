import axios, { Axios } from 'axios'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

export const mangocatnotesApi: Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

mangocatnotesApi.interceptors.request.use(
  (config) => {
    if (authStore.jwt) {
      config.headers.Authorization = `Bearer ${authStore.jwt}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
