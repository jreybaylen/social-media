import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '@hooks/auth'

export function Navbar (): JSX.Element {
    const navigate = useNavigate()
    const { AUTH_USER, queryClient } = useAuth()
    const handleSignOut = async () => {
        await queryClient.resetQueries({
            queryKey: [ 'authUser' ]
        })
        navigate(
            '/sign-in',
            { replace: true }
        )
    }

    return (
        <header
            className="shadow py-3"
        >
            <nav
                className="flex flex-row max-w-5xl w-full m-auto items-center"
            >
                <h1>
                    <Link
                        to={ Boolean(AUTH_USER) ? '/' : '#' }
                        className="font-axiformaBold text-[30px]"
                    >
                        SocialMedia
                    </Link>
                </h1>
                <ul
                    className="ml-auto flex flex-row items-center"
                >
                    { Boolean(AUTH_USER) ? (
                        <li>
                            <button
                                onClick={ handleSignOut }
                                className="px-4 py-2 rounded-md border-[1px]"
                            >
                                Sign Out
                            </button>
                        </li>
                    ) : (
                        <>
                            <li
                                className="p-4"
                            >
                                <Link
                                    replace
                                    to="/sign-in"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li>|</li>
                            <li
                                className="p-4"
                            >
                                <Link
                                    replace
                                    to="/sign-up"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) }
                </ul>
            </nav>
        </header>
    )
}