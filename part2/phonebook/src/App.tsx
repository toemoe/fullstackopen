import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import type { Person } from "./types.ts";
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []); // empty array of dependencies

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const includePerson = persons.some(person => person.name === newName);
    if (includePerson) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      const checkPerson = persons.find(person => person.name === newName);
      if (confirmed && checkPerson) {
        personService
            .update(checkPerson.id, {name: newName, number: newNumber})
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === checkPerson.id ? updatedPerson : person))
              setNewName('')
              setNewNumber('')
            })
            .catch(() => {
              setNotification(`${checkPerson.name} has already been removed from server`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== checkPerson.id))
            })
      }
    } else {
    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(createPerson => {
        setPersons(persons.concat(createPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${newName} to phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          alert(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Notification message={notification} />
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <Numbers persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;