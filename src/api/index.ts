import { API_URL } from '../constants'
import { APIResults } from '../types'

export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(`${API_URL}/api?results=10&seed=foobar&page=${pageParam}`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Something went wrong')
      return (await res.json()) as Promise<APIResults>
    })
    .then((res) => {
      const currentPage = res.info.page
      const nextPage = currentPage > 10 ? undefined : currentPage + 1

      return {
        users: res.results,
        nextPage
      }
    })
}
