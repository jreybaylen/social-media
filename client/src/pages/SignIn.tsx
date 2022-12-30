import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import { useAuth } from '@hooks/auth'

import FormInput from '@components/Input'
import FormButton from '@components/Button'

type SignInForm = {
    email: string
    password: string
}

export function SignInPage (): JSX.Element {
    const navigate = useNavigate()
    const { AUTH_USER, queryClient } = useAuth()
    const [ CREDENTIALS, setCredentials ] = useState<SignInForm>()
    const mutation = useMutation({
        async mutationFn (credentials: SignInForm) {
            const { VITE_API_URL } = import.meta.env
            const API_URL = `${ VITE_API_URL }/auth/sign-in`

            return await axios.post(API_URL, credentials)
        },
        onSuccess (result) {
            queryClient.setQueryData(
                [ 'authUser' ],
                function () {
                    return result.data
                }
            )
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

        mutation.mutateAsync(CREDENTIALS as SignInForm).then(() => {
            setCredentials(undefined)
            navigate('/', { replace: true })
        })
    }

    useEffect(() => {
        if (Boolean(AUTH_USER)) {
            navigate('/', { replace: true })
        }
    }, [ AUTH_USER ])

    return (
        <main
            className="max-w-[400px] mt-[10%] mx-auto pt-5 px-8 pb-8 shadow-md border-[1px] rounded-md"
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