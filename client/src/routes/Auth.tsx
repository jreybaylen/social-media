import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export function AuthRoute (): JSX.Element {
    const navigate = useNavigate()
    const user = false

    useEffect(() => {
        if (!user) {
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
                context={ user }
            />
        </main>
    )
}