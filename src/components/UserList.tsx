import { Users } from '../types'

interface Props {
  users: Users[]
  showColors: boolean
  deleteUser: (email: string) => void
}

export default function UserList({ users, showColors, deleteUser }: Props) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <table width='100%'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={showColors ? 'table--showColors' : ''}>
          {users.map((user) => {
            return (
              <tr key={user.email}>
                <td>
                  <img
                    style={{ display: 'block', margin: '0 auto' }}
                    src={user.picture.thumbnail}
                  />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => deleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
