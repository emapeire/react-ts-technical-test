import { useEffect, useRef, useState } from 'react'
import './App.css'
import { API_URL } from './constants'
import { type APIResults, type Users } from './types'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<Users[]>([])

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json() as Promise<APIResults>)
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h1>User Table</h1>
      <header
        style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
      >
        <button onClick={toggleColor}>
          {showColors ? 'Uncolor rows' : 'Color rows'}
        </button>
        <button onClick={toogleSortByCountry}>
          {sortByCountry ? 'Unsort by country' : 'Sort by country'}
        </button>
        <button onClick={handleReset}>Reset users</button>
        <input
          style={{
            borderRadius: '10px',
            border: '1px solid #ccc',
            textIndent: '10px'
          }}
          placeholder='Filter by country'
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        <UserList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  )
}

export default App
