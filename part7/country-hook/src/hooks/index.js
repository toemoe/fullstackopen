import { useState, useEffect } from "react"
import CountriesService from "../services/countries"

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => setValue(event.target.value)
  return { type, value, onChange }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (!name) return
    CountriesService.getCountry(name)
    .then(data => setCountry(data))
    .catch(() => setCountry(null))
  }, [name])
  return country
}