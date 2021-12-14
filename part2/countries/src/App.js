import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Components
const Filter = ({ value, handler }) => (
  <p>find countries <input value={value} onChange={handler} /></p>
)

const Country = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <div>
        {Object.values(country.languages).map(language => <ul>{language}</ul>)}
      </div>
      <img src={country.flags.png} alt='flag' />
    </div>
  )
}

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many mathces, specify another filter</p>
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => <p>{country.name.common}</p>)}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  } else {
    return null
  }
}

const App = () => {
  // useStates
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  // useEffect
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promised fulfilled')
        setCountries(response.data)
      })
  }, [])

  // eventHandlers
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value.toLowerCase())
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))

  return (
    <div>
      <Filter value={newFilter} handler={handleFilterChange} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App;
