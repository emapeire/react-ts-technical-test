import useUsers from '../hook/useUsers'

export default function Results() {
  const { users } = useUsers()
  return (
    <div>
      <h3>Results: {users.length}</h3>
    </div>
  )
}
