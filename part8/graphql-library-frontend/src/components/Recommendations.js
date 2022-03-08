import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const user = useQuery(ME)

  const [favoriteGenre, setFavoriteGenre] = useState(null)

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (user.loading || filteredBooks.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
