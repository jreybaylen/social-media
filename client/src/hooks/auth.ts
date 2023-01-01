import { useQueryClient } from '@tanstack/react-query'

type UserAuth = {
    token: string
    user: {
        _doc: {
            email: string
            createdAt: string
            firstName: string
            friends: Array<{
                [ key: string ]: boolean
            }>
            impressions: number
            lastName: string
            location: string
            occupation: string
            password: string
            picturePath: string
            updatedAt: string
            viewedProfile: number
        }
    }
}

export function useAuth () {
    const queryClient = useQueryClient()
    const AUTH_USER = queryClient.getQueryData([ 'authUser' ]) as UserAuth

    return {
        AUTH_USER,
        queryClient
    }
}