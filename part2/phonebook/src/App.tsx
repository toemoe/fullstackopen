import { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const includePerson = persons.some(person => person.name === newName);
    if (includePerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
    const newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  const handleFilterChange = (value: string) => {
    setFilter(value);
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
    || person.number.includes(filter)
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App