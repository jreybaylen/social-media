import { useNavigate, Link } from 'react-router-dom'

export function Navbar (): JSX.Element {
    const navigate = useNavigate()
    const handleSignOut = () => {
        alert('Sign Out')
    }
    const handleClickLogo = () => {
        navigate(
            '/',
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
                <h1
                    onClick={ handleClickLogo }
                    className="font-axiformaBold text-[30px] cursor-pointer"
                >
                    SocialMedia
                </h1>
                <ul
                    className="ml-auto flex flex-row items-center"
                >
                    <li>
                        <button
                            onClick={ handleSignOut }
                            className="px-4 py-2 rounded-md"
                        >
                            Sign Out
                        </button>
                    </li>
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
                </ul>
            </nav>
        </header>
    )
}