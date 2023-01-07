import { useQueryClient } from '@tanstack/react-query'

type UserAuth = {
    token: string
    user: {
        _doc: {
            _id: string
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
    const AUTH_USER_STORAGE = localStorage.getItem('authUser') || ''
    const AUTH_USER_QUERY = queryClient.getQueryData([ 'authUser' ]) as UserAuth
    const AUTH_USER = AUTH_USER_QUERY || (AUTH_USER_STORAGE ? JSON.parse(AUTH_USER_STORAGE) : '')

    return {
        AUTH_USER,
        queryClient
    }
}