import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { useAuth } from '@hooks/auth'

export function AuthRoute (): JSX.Element {
    const navigate = useNavigate()
    const { AUTH_USER } = useAuth()

    useEffect(() => {
        if (!Boolean(AUTH_USER)) {
            navigate(
                '/sign-in',
                { replace: true }
            )
        }
    }, [])

    return (
        <main
            className="max-w-5xl w-full mt-5 mx-auto"
        >
            <Outlet
                context={ AUTH_USER }
            />
        </main>
    )
}