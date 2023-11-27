import { useEffect, useState } from 'react'
import './App.css'
import { API_URL } from './constants'
import { type APIResults, type Users } from './types'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [showColors, setShowColors] = useState(false)

  const toggleColor = () => {
    setShowColors(!showColors)
  }

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
      <h1>User Table</h1>
      <header>
        <button onClick={toggleColor}>Color rows</button>
      </header>
      <main>
        <UserList showColors={showColors} users={users} />
      </main>
    </div>
  )
}

export default App
