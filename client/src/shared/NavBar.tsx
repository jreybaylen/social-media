export function Navbar (): JSX.Element {
    const handleSignUp = () => {

    }
    const handleSignIn = () => {

    }
    const handleSignOut = () => {
        
    }

    return (
        <header
            className="shadow py-3"
        >
            <nav
                className="flex flex-row max-w-5xl w-full m-auto items-center"
            >
                <h1
                    className="font-axiformaBold text-[30px]"
                >
                    SocialMedia
                </h1>
                <ul
                    className="ml-auto flex flex-row items-center"
                >
                    <li>
                        <button>
                            Sign Out
                        </button>
                    </li>
                    <li
                        className="p-4"
                    >
                        <button>
                            Sign Up
                        </button>
                    </li>
                    <li>|</li>
                    <li
                        className="p-4"
                    >
                        <button>
                            Sign In
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}