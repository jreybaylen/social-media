import { Link } from 'react-router-dom'
import { SiGmail } from 'react-icons/si'
import { IoLocationSharp, IoBriefcaseSharp } from 'react-icons/io5'

import { useAuth } from '@hooks/auth'
import { PROFILE_IMG } from '@config/constants'

export function Profile (): JSX.Element {
    const { AUTH_USER } = useAuth()
    const USER_INFO = AUTH_USER.user._doc
    const FULL_NAME = `${ USER_INFO.firstName } ${ USER_INFO.lastName }`

    return (
        <aside
            className="py-4 px-5 w-[25%] h-[100%] bg-[#fff] shadow-sm rounded-md overflow-hidden"
        >
                <div
                    className="w-[100%] mx-auto mt-2 mb-3 flex flex-row"
                >
                    <img
                        src={ `${ PROFILE_IMG }/${ USER_INFO.picturePath }` }
                        className="block rounded-[100%] w-[70px] h-[70px] mr-4"
                    />
                    <div
                        className="flex flex-col justify-center mb-1 flex-1 text-[22px]"
                    >
                        <Link
                            to="/profile"
                            className="text-primary hover:underline hover:decoration-1 font-axiformaSemibold"
                        >
                            { FULL_NAME }
                        </Link>
                        <p
                            className="text-[14px]"
                        >
                            { USER_INFO.friends.length } Friends
                        </p>
                    </div>
                </div>
                <div
                    className="mb-7 mt-5"
                >
                    <p
                        className="mb-3 border-b-[1px] pb-2 opacity-50"
                    >
                        About Me
                    </p>
                    <p
                        className="flex flex-row items-center mb-2"
                    >
                        <IoLocationSharp
                            className="mr-3 text-[22px]"
                        />
                        <span
                            className="opacity-90"
                        >
                            { USER_INFO.location }
                        </span>
                    </p>
                    <p
                        className="flex flex-row items-center mb-1"
                    >
                        <IoBriefcaseSharp
                            className="mr-3 text-[22px]"
                        />
                        <span
                            className="opacity-90"
                        >
                            { USER_INFO.occupation }
                        </span>
                    </p>
                </div>
                <div>
                    <p
                        className="mb-3 border-b-[1px] pb-2 opacity-50"
                    >
                        Social Media Links
                    </p>
                    <p
                        className="flex flex-row items-center mb-1"
                    >
                        <SiGmail
                            className="mr-3 text-[22px]"
                        />
                        <span
                            className="opacity-90"
                        >
                            { USER_INFO.email }
                        </span>
                    </p>
                </div>
        </aside>
    )
}