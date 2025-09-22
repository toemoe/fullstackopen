import axios from 'axios'
import type { BlogType } from '../types/types'
const baseUrl = 'http://localhost:3001/api/blogs/'

let token: string | null = null

const setToken = (newToken: string | null) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog: Omit<BlogType, 'id'>) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, create, setToken }