import { useEffect, useState } from 'react'
import './App.css'
import { API_URL } from './constants'
import { type APIResults, type Users } from './types'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json() as Promise<APIResults>)
      .then((res) => {
        setUsers(res.results)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='App'>
      <UserList users={users} />
    </div>
  )
}

export default App
