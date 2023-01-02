import axios from 'axios'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { API_USER } from '@config/constants'
import type { ChangeEvent, FormEvent } from 'react'

import FormInput from '@components/Input'
import FormButton from '@components/Button'

type UserInfo = {
    lastName: string
    firstName: string
    email: string
    password: string
    location: string
    occupation: string
    picturePath: string
}

const toastId = 'signUpForm'

export function SignUpPage (): JSX.Element {
    const photoRef = useRef<HTMLInputElement>(null)
    const [ USER_INFO, setUserInfo ] = useState<UserInfo>()
    const mutation = useMutation({
        async mutationFn (USER_DATA: UserInfo) {
            return await axios.post(
                `${ API_USER }/sign-up`,
                USER_DATA,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        },
        onSuccess () {
            toast.success(
                `"${ USER_INFO?.firstName }" has been created`,
                { toastId }
            )

            if (photoRef.current) {
                photoRef.current.value = ''
            }

            setUserInfo(undefined)
        },
        onError () {
            toast.error(
                'Oops! Something went wrong. Try again',
                { toastId }
            )
        }
    })
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
        mutation.mutate(USER_INFO as UserInfo)
    }
    const DISABLED_FORM_BUTTON = !Boolean(
        USER_INFO?.email &&
        USER_INFO?.password &&
        USER_INFO.firstName &&
        USER_INFO.lastName
    )

    return (
        <main
            className="max-w-[450px] mt-[3%] mx-auto p-5 pb-10 shadow-md border-[1px] rounded-md bg-[#fff]"
        >
            <h1
                data-testid="sign-up-heading"
                className="mt-2 mb-5 font-axiformaSemibold text-[26px]"
            >
                Sign Up
            </h1>
            <form
                autoComplete="off"
                onSubmit={ handleSubmit }
                data-testid="sign-up-form"
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
                        data-testid="sign-up-photo"
                        onChange={ handleChangeInput }
                        className="cursor-pointer px-3 py-2 mt-1 w-full border-[1px] rounded file:cursor-pointer file:mr-4 file:font-axiformaRegular file:py-2 file:px-4 file:rounded-full file:border-0"
                    />
                </div>
                <FormInput
                    type="text"
                    name="firstName"
                    inputId="firstName"
                    placeholder="e.g John"
                    inputLabel="First Name"
                    testId="sign-up-firstName"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.firstName || '' }
                />
                <FormInput
                    type="text"
                    name="lastName"
                    inputId="lastName"
                    placeholder="e.g Doe"
                    testId="sign-up-lastName"
                    inputLabel="Last Name"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.lastName || '' }
                />
                <FormInput
                    type="email"
                    name="email"
                    inputId="email"
                    testId="sign-up-email"
                    inputLabel="Email / Username"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.email || '' }
                    placeholder="e.g john.doe@gmail.com"
                />
                <FormInput
                    type="password"
                    name="password"
                    inputId="password"
                    inputLabel="Password"
                    testId="sign-up-password"
                    placeholder="e.g *******"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.password || '' }
                />
                <FormInput
                    type="text"
                    name="location"
                    inputId="location"
                    inputLabel="Location"
                    testId="sign-up-location"
                    placeholder="e.g New York"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.location || '' }
                />
                <FormInput
                    type="text"
                    name="occupation"
                    inputId="occupation"
                    inputLabel="Occupation"
                    testId="sign-up-occupation"
                    onChange={ handleChangeInput }
                    value={ USER_INFO?.occupation || '' }
                    placeholder="e.g Lead Software Engineer"
                />
                <FormButton
                    type="submit"
                    label="Submit"
                    disabled={ DISABLED_FORM_BUTTON }
                />
            </form>
        </main>
    )
}