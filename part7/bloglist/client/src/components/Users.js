import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <div>
      <div className="font-bold text-3xl pb-3 text-gray-700">Users</div>
      <table className="table-auto border-collapse">
        <thead className="border bg-gray-100">
          <tr>
            <td>&nbsp;</td>
            <td className="px-5 py-2 border">blogs created</td>
          </tr>
        </thead>
        <tbody className="border">
          {users.map((user) => (
            <tr className="border" key={user.id}>
              <td className="pl-5 pr-10 py-2 border">
                <Link className="hover:text-gray-600" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td className="px-5 py-2">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
