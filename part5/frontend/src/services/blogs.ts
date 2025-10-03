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

const update = async (id: string, updatedBlog: BlogType) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put<BlogType>(baseUrl + id, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id: string) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + id, config)
  return response.data
}

export default { getAll, create, update, deleteBlog, setToken }