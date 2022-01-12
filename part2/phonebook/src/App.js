import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'


const App = () => {
  // useStates
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Form submit function
  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName && persons[i].number === newNumber) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      } else if (persons[i].name === newName) {
        if (window.confirm(`${persons[i].name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(persons[i].id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== persons[i].id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setSuccessMessage(`Updated ${returnedPerson.name}`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 3000)
            })
            .catch(error => {
              console.log(error.response.data.error)
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setNewName('')
              setNewNumber('')
            })
          return
        } else {
          setNewName('')
          setNewNumber('')
          return
        }
      }
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.deleteItem(id)
      setPersons(persons.filter(person => person.id !== id))
    }
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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} states={{ newName, newNumber }} handlers={{ handleNameChange, handleNumberChange }} />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App