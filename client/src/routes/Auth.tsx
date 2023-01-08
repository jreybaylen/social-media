import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '@hooks/auth'

export function AuthRoute (): JSX.Element {
    const { AUTH_USER } = useAuth()

    if (!Boolean(AUTH_USER)) {
        return (
            <Navigate
                replace
                to="/sign-in"
            />
        )
    }

    return (
        <main
            className="max-w-7xl w-full mt-5 mx-auto"
        >
            <Outlet
                context={ AUTH_USER }
            />
        </main>
    )
}