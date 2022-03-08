import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      let genres = ['All genres']
      allBooks.forEach((book) => {
        book.genres.forEach((g) => {
          if (!genres.includes(g)) {
            genres.push(g)
          }
        })
      })
      setGenres(genres)
      setSelectedGenre('All genres')
    }
  }, [result.data])

  useEffect(() => {
    if (selectedGenre === 'All genres') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter((b) => b.genres.includes(selectedGenre)))
    }
  }, [books, selectedGenre])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{selectedGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setSelectedGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
