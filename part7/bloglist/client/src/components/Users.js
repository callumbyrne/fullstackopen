import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
