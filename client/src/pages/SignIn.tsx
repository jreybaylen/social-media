import axios from 'axios'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { useAuth } from '@hooks/auth'
import { API_HOST } from '@config/constants'
import type { ChangeEvent, FormEvent } from 'react'
import type { AxiosResponse, AxiosError } from 'axios'

import FormInput from '@components/Input'
import FormButton from '@components/Button'

type SignInForm = {
    email: string
    password: string
}

type ErrorResponse = {
    error: string
}

const toastId = 'signInForm'

export function SignInPage (): JSX.Element {
    const navigate = useNavigate()
    const { AUTH_USER, queryClient } = useAuth()
    const [ CREDENTIALS, setCredentials ] = useState<SignInForm>()
    const mutation = useMutation({
        async mutationFn (USER_CREDENTIALS: SignInForm) {
            return await axios.post(`${ API_HOST }/auth/sign-in`, USER_CREDENTIALS)
        },
        onSuccess (RESULT: AxiosResponse) {
            queryClient.setQueryData(
                [ 'authUser' ],
                function () {
                    return RESULT.data
                }
            )
        },
        onError (ERROR: AxiosError<ErrorResponse>) {
            if (ERROR.response?.data.error) {
                toast.error(
                    ERROR.response?.data.error,
                    { toastId }
                )
            }
        }
    })
    const handleChangeInput = (EVENT: ChangeEvent<HTMLInputElement>) => {
        const TARGET = EVENT.target

        setCredentials({
            ...CREDENTIALS,
            [ TARGET.name ]: TARGET.value
        } as SignInForm)
    }
    const handleSubmit = (EVENT: FormEvent<HTMLFormElement>) => {
        EVENT.preventDefault()

        if (!Boolean(CREDENTIALS?.email && CREDENTIALS?.password)) {
            toast.error(
                `"${ !Boolean(CREDENTIALS?.email) ? 'Email' : 'Password' }" is required`,
                { toastId }
            )

            return
        }

        mutation.mutateAsync(CREDENTIALS as SignInForm).then(() => {
            setCredentials(undefined)
            navigate('/', { replace: true })
        })
    }

    useEffect(() => {
        if (Boolean(AUTH_USER)) {
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <main
            className="max-w-[400px] mt-[10%] mx-auto pt-5 px-8 pb-10 shadow-md border-[1px] rounded-md bg-[#fff]"
        >
            <h1
                data-testid="sign-up-heading"
                className="mt-2 mb-5 font-axiformaSemibold text-[26px]"
            >
                Sign In
            </h1>
            <form
                autoComplete="off"
                onSubmit={ handleSubmit }
                data-testid="sign-up-form"
            >
                <FormInput
                    type="email"
                    name="email"
                    inputId="email"
                    testId="sign-in-username"
                    inputLabel="Email / Username"
                    onChange={ handleChangeInput }
                    value={ CREDENTIALS?.email || '' }
                    placeholder="e.g john.doe@gmail.com"
                />
                <FormInput
                    type="password"
                    name="password"
                    inputId="password"
                    inputLabel="Password"
                    testId="sign-in-password"
                    placeholder="e.g *******"
                    onChange={ handleChangeInput }
                    value={ CREDENTIALS?.password || '' }
                />
                <FormButton
                    type="submit"
                    label="Submit"
                />
            </form>
        </main>
    )
}