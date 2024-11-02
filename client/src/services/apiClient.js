import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const get = (path, params) => apiClient.get(path, { params })

export const post = (path, data) => apiClient.post(path, data)

export const put = (path, data) => apiClient.put(path, data)

export const del = path => apiClient.delete(path)

export default apiClient
