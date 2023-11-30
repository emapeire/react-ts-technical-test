import { fetchUsers } from '../api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Users } from '../types'
import { useMemo } from 'react'

export default function useUsers() {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextPage?: number
      users: Users[]
    }>({
      queryKey: ['users'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1
    })

  const users = useMemo(() => {
    return data?.pages?.flatMap((page) => page.users) ?? []
  }, [data])

  return {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
