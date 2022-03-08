import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ setError, show }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  const authors = useQuery(ALL_AUTHORS)

  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name: selectedOption.value, born } })

    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (authors.loading) {
    return <div>loading...</div>
  }

  const options = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name,
  }))

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          options={options}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
