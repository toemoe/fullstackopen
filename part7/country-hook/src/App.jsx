import React, { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks/index.js'

const App = () => {
  const nameInput = useField('text')
  const [nameCountry, setName] = useState('')
  const country = useCountry(nameCountry)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App