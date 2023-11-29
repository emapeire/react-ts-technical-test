import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { API_URL } from './constants'
import { SortBy, type APIResults, type Users } from './types'
import UserList from './components/UserList'

export default function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.None)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const originalUsers = useRef<Users[]>([])

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    setSorting(sorting === SortBy.Country ? SortBy.None : SortBy.Country)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.None) return filteredUsers

    const compareProperties: Record<string, (user: Users) => string> = {
      [SortBy.Country]: (user) => user.location.country,
      [SortBy.FirstName]: (user) => user.name.first,
      [SortBy.LastName]: (user) => user.name.last
    }

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filteredUsers])

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    if (sort === sorting) return setSorting(SortBy.None)
    setSorting(sort)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(`${API_URL}10`)
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong')
        return res.json() as Promise<APIResults>
      })
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err: SetStateAction<boolean>) => {
        setError(err)
      })
      .finally(() => setLoading(false))
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
        <button onClick={handleReset}>Reset users</button>
        <button onClick={toogleSortByCountry}>
          {sorting === SortBy.Country ? 'Unsort by country' : 'Sort by country'}
        </button>
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
        {loading && <strong>Loading...</strong>}
        {!loading && error && <strong>Something went wrong</strong>}
        {!loading && !error && sortedUsers.length === 0 && (
          <strong>No users found</strong>
        )}
        {!loading && !error && sortedUsers.length > 0 && (
          <UserList
            changeSort={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
      </main>
    </div>
  )
}
