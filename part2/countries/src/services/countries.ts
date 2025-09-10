import axios from 'axios'
import type { Country } from '../types'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = (): Promise<Country[]> => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


export default { getAll }