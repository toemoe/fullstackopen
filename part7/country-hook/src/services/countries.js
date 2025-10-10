import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = (name) => {
  return axios.get(`${baseUrl}${name}`)
  .then(response => response.data)
  .catch(() => null)
}


export default { getCountry }