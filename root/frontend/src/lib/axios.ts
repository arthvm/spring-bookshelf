import axios from 'axios'
import { getCookie } from 'typescript-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Content: 'application/json',
    Authorization: `${getCookie('_auth') ?? ''}`, // DEV ONLY
  },
  // withCredentials: true, // PROD
})
