import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://bookshelf-api-kqst.onrender.com',
  headers: {
    Accept: 'application/json',
    Content: 'application/json',
  },
})
