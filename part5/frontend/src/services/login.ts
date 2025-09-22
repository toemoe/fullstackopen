import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login/'

export type Credentials = {
  username: string,
  password: string
}

export type LoginResponse = {
  token: string,
  name: string,
  username: string
}

const login = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(baseUrl, credentials)
  return response.data
}

export default { login }