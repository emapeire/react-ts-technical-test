import { fetchUsers } from '../api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type Users } from '../types'

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

  const users = data?.pages?.flatMap((page) => page.users) ?? []

  return {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
