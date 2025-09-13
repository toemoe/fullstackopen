import axios from 'axios'

interface Person {
    id?: string;
    name: string;
    number: string;
}

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject: Person) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id: string, newObject: Person) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id: string) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default { getAll, create, update, deletePerson }