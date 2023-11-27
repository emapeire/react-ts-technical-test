import { Users } from '../types'

interface Props {
  showColors: boolean
  users: Users[]
}

export default function UserList({ users, showColors }: Props) {
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
        <tbody>
          {users.map((user, index) => {
            const bgColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? bgColor : 'transparent'

            return (
              <tr key={index} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
