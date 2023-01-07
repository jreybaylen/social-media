import { Link } from 'react-router-dom'
import { IoLocationSharp, IoPersonSharp, IoBriefcaseSharp, IoMailSharp } from 'react-icons/io5'

import { useAuth } from '@hooks/auth'
import { PROFILE_IMG } from '@config/constants'

export function Profile (): JSX.Element {
    const { AUTH_USER } = useAuth()
    const USER_INFO = AUTH_USER.user._doc
    const FULL_NAME = `${ USER_INFO.firstName } ${ USER_INFO.lastName }`

    return (
        <aside
            className="p-3 pb-4 w-[25%] h-[100%] bg-[#fff] shadow-sm rounded-md overflow-hidden"
        >
                <div
                    className="w-[200px] h-[200px] mx-auto border-2 p-1 rounded-[100%] mt-2 mb-3"
                >
                    <img
                        className="w-[100%] h-[100%] block rounded-[100%]"
                        src={ `${ PROFILE_IMG }/${ USER_INFO.picturePath }` }
                    />
                </div>
                <p
                    className="flex flex-row items-center mb-1"
                >
                    <IoPersonSharp
                        className="mr-2"
                    />
                    <Link
                        to="/profile"
                        className="text-primary hover:underline hover:decoration-1"
                    >
                        { FULL_NAME }
                    </Link>
                </p>
                <p
                    className="flex flex-row items-center mb-1"
                >
                    <IoLocationSharp
                        className="mr-2"
                    />
                    <span
                        className="text-[14px]"
                    >
                        { USER_INFO.location }
                    </span>
                </p>
                <p
                    className="flex flex-row items-center mb-1"
                >
                    <IoBriefcaseSharp
                        className="mr-2"
                    />
                    <span
                        className="text-[14px]"
                    >
                        { USER_INFO.occupation }
                    </span>
                </p>
                <p
                    className="flex flex-row items-center mb-1"
                >
                    <IoMailSharp
                        className="mr-2"
                    />
                    <span
                        className="text-[14px]"
                    >
                        { USER_INFO.email }
                    </span>
                </p>
        </aside>
    )
}