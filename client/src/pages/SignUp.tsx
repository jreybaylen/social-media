import axios from 'axios'
import { useRef, useState, ChangeEvent, FormEvent, MutableRefObject } from 'react'

type UserInfo = {
    lastName: string
    firstName: string
    email: string
    password: string
    location: string
    occupation: string
    picturePath: string
}

export function SignUpPage (): JSX.Element {
    const photoRef = useRef<HTMLInputElement>(null)
    const [ USER_INFO, setUserInfo ] = useState<UserInfo>()
    const handleChangeInput = (EVENT: ChangeEvent<HTMLInputElement>) => {
        const TARGET = EVENT.target
        const IS_PICTURE = TARGET.name === 'picturePath'
        const USER_INFO_VALUE = IS_PICTURE ? (TARGET.files as FileList)[0] : TARGET.value

        setUserInfo({
            ...(USER_INFO || {}),
            [ TARGET.name ]: USER_INFO_VALUE
        } as UserInfo)
    }
    const handleSubmit = async (EVENT: FormEvent<HTMLFormElement>) => {
        EVENT.preventDefault()

        try {
            const FORM_DATA = new FormData()

            for (let USER_INFO_KEY in USER_INFO) {
                FORM_DATA.append(
                    USER_INFO_KEY,
                    USER_INFO[ USER_INFO_KEY as keyof UserInfo ]
                )
            }

            await axios.post(
                'http://localhost:2022/user/register',
                USER_INFO,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            setUserInfo(undefined)

            if (photoRef.current) {
                photoRef.current.value = ''
            }
        } catch (ERROR: any) {
            console.error(ERROR)
        }
    }

    return (
        <main
            className="max-w-[450px] mt-[5%] mx-auto p-5 shadow-md border-[1px] rounded-md"
        >
            <h1
                className="mt-2 mb-5 font-axiformaSemibold text-[26px]"
            >
                Sign Up
            </h1>
            <form
                autoComplete="off"
                onSubmit={ handleSubmit }
            >
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="picturePath"
                        className="text-gray-500 text-[14px] cursor-pointer"
                    >
                        Photo
                    </label>
                    <input
                        type="file"
                        id="picturePath"
                        ref={ photoRef }
                        name="picturePath"
                        placeholder="e.g John"
                        onChange={ handleChangeInput }
                        className="cursor-pointer px-3 py-2 mt-1 w-full border-[1px] rounded file:cursor-pointer file:mr-4 file:font-axiformaRegular file:py-2 file:px-4 file:rounded-full file:border-0"
                    />
                </div>
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="firstName"
                        className="text-gray-500 text-[14px]"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="e.g John"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.firstName || '' }
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded"
                    />
                </div>
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="lastName"
                        className="text-gray-500 text-[14px]"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="e.g Doe"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.lastName || '' }
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded"
                    />
                </div>
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="email"
                        className="text-gray-500 text-[14px]"
                    >
                        Email / Username
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.email || '' }
                        placeholder="e.g john.doe@gmail.com"
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded"
                    />
                </div>
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="password"
                        className="text-gray-500 text-[14px]"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="e.g *******"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.password || '' }
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded tracking-widest"
                    />
                </div>
                <div
                    className="mb-3"
                >
                    <label
                        htmlFor="location"
                        className="text-gray-500 text-[14px]"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g New York"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.location || '' }
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded"
                    />
                </div>
                <div
                    className="mb-5"
                >
                    <label
                        htmlFor="occupation"
                        className="text-gray-500 text-[14px]"
                    >
                        Occupation
                    </label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        onChange={ handleChangeInput }
                        value={ USER_INFO?.occupation || '' }
                        placeholder="e.g Lead Software Engineer"
                        className="px-3 py-2 mt-1 w-full border-[1px] rounded"
                    />
                </div>
                <button
                    className="font-axiformaSemibold w-full py-3 bg-secondary rounded-[8px] text-white uppercase tracking-wider text-[18px]"
                >
                    Submit
                </button>
            </form>
        </main>
    )
}