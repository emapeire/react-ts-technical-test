import { SortBy, type Users } from '../types'

interface Props {
  users: Users[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSort: (sort: SortBy) => void
}

export default function UserList({
  users,
  showColors,
  deleteUser,
  changeSort
}: Props) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <table width='100%'>
        <thead>
          <tr>
            <th style={{ cursor: 'default' }}>Photo</th>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                borderRadius: '10px',
                padding: '0.5rem'
              }}
              onClick={() => changeSort(SortBy.FirstName)}
            >
              First Name
            </th>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                borderRadius: '10px',
                padding: '0.5rem'
              }}
              onClick={() => changeSort(SortBy.LastName)}
            >
              Last Name
            </th>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                borderRadius: '10px',
                padding: '0.5rem'
              }}
              onClick={() => changeSort(SortBy.Country)}
            >
              Country
            </th>
            <th style={{ cursor: 'default' }}>Actions</th>
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
