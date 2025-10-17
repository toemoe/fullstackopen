import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries/queries'

const SetBirthyear = (props) => {
  const [ editBorn, result ] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => { console.log('Error edit born: ', error) },
  })
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  useEffect(() => {
    if (result.data && result.data.editBorn === null) {
      alert(`There was an error updating the author's birthyear.`)
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()
    editBorn({ variables: { name, born: parseInt(born) } })
    console.log(`Edit author ${name} born ${born}`)

    setBorn('')
    setName('')
  }

  if (authors.loading) return <div>loading authors...</div>
  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)} >
          {authors.data.allAuthors.map(a => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <label>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} type="born" />
        </label>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear