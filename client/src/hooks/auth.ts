import { useQueryClient } from '@tanstack/react-query'

export function useAuth () {
    const queryClient = useQueryClient()
    const AUTH_USER = queryClient.getQueryData([ 'authUser' ])

    return {
        AUTH_USER,
        queryClient
    }
}