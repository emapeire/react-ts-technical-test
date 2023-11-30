import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type Users } from './types'
import UserList from './components/UserList'
import useUsers from './hook/useUsers'
import Results from './components/Results'

export default function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.None)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

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

  const sortedUsers: Users[] = useMemo(() => {
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
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleReset = () => {
    void refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    if (sort === sorting) return setSorting(SortBy.None)
    setSorting(sort)
  }

  return (
    <div>
      <h1>User Table</h1>
      <Results />
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
        {sortedUsers.length > 0 && (
          <UserList
            changeSort={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {isLoading && <strong>Loading...</strong>}

        {isError && <strong>Something went wrong</strong>}

        {!isLoading && !isError && sortedUsers.length === 0 && (
          <strong>No users found</strong>
        )}

        {!isLoading && !isError && hasNextPage === true && (
          <button
            style={{
              margin: '2rem',
              paddingInline: '5rem'
            }}
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Load more results
          </button>
        )}
        {!isLoading && !isError && hasNextPage === false && (
          <strong>No more results</strong>
        )}
      </main>
    </div>
  )
}
