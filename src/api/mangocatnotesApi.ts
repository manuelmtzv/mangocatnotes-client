import axios, { Axios } from 'axios'

export const mangocatnotesApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
