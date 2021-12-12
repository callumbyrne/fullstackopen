import React, { useEffect, useState } from 'react'
import axios from 'axios'

// COMPONENTS
const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Filter = ({ newFilter, handleFilterChange }) => (
  <p>filter shown with <input value={newFilter} onChange={handleFilterChange} /></p>
)

const PersonForm = ({ addPerson, states, handlers }) => (
  <form onSubmit={addPerson}>
    <div>name: <input
      value={states.newName}
      onChange={handlers.handleNameChange} />
    </div>
    <div>number: <input
      value={states.newNumber}
      onChange={handlers.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ peopleToShow }) => (
  <div>
    {peopleToShow.map(person => <Person key={person.name} person={person} />)}
  </div>
)

const App = () => {
  // useStates
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // Form submit function
  const addPerson = (e) => {
    e.preventDefault()
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  // Functions to handle onChange
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  // Filters persons array based on filter useState
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} states={{ newName, newNumber }} handlers={{ handleNameChange, handleNumberChange }} />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )
}

export default App