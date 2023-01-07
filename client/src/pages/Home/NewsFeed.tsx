import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '@hooks/auth'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { FormEvent, ChangeEvent } from 'react'
import { API_POSTS, PROFILE_IMG } from '@config/constants'

import { Card } from '../../containers/Card'
import { ImageCircle } from '../../containers/ImageCircle'
import FormButton from '@components/Button'
import FormTextArea from '@components/TextArea'

type NewsFeedPost = {
    _id: string
    lastName: string
    location: string
    firstName: string
    description: string
    picturePath: string
    occupation: string
    userPicturePath: string
}

export function NewsFeed (): JSX.Element {
    const { AUTH_USER } = useAuth()
    const [ POST, setPost ] = useState<string>('')
    const HEADERS = {
        headers: {
            Authorization: AUTH_USER.token
        }
    }
    const query = useQuery({
        queryKey: [ 'newsFeed' ],
        async queryFn () {
            if (AUTH_USER.token) {
                return (await axios.get(API_POSTS, HEADERS)).data  
            }

            return []
        }
    })
    const mutation = useMutation({
        async mutationFn (DESCRIPTION: string) {
            const { _id, picturePath } = AUTH_USER.user._doc

            return await (
                axios.post(
                    `${ API_POSTS }/create`,
                    {
                        picturePath,
                        userId: _id,
                        description: DESCRIPTION
                    },
                    HEADERS
                )
            )
        },
        onSuccess () {
            query.refetch()
        },
        onError () {
            toast.error(
                'Oops! Something went wrong. Try again',
                { toastId: 'newsFeedForm' }
            )
        }
    })
    const handleChangeDescription = (EVENT: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(EVENT.target.value.trimStart())
    }
    const handlePostSubmit = (EVENT: FormEvent<HTMLFormElement>) => {
        EVENT.preventDefault()

        mutation.mutateAsync(POST).then(
            () => {
                setPost('')
            }
        )
    }

    return (
        <section
            className="mx-2 w-[50%]"
        >
            <form
                onSubmit={ handlePostSubmit }
                className="flex flex-row mb-3 bg-[#fff] px-3 py-5 rounded-md shadow-sm"
            >
                <ImageCircle
                    src={ `${ PROFILE_IMG }/${ AUTH_USER.user._doc.picturePath }` }
                />
                <div
                    className="flex-1"
                >
                    <>
                        <FormTextArea
                            value={ POST }
                            testId="newsfeed-input"
                            inputId="newsfeed-input"
                            placeholder="What's on your mind?"
                            onChange={ handleChangeDescription }
                            className="resize-none mt-0 block w-full"
                        />
                        <FormButton
                            label="Post"
                            disabled={ !Boolean(POST) }
                            className="py-2 text-[14px] font-axiformaRegular"
                        />
                    </>
                </div>
            </form>
            { query.data?.map(
                (NEWSFEED_POST: NewsFeedPost) => (
                    <Card
                        key={ NEWSFEED_POST._id }
                        content={ NEWSFEED_POST.description }
                        subHeader={ NEWSFEED_POST.occupation }
                        profile={ `${ PROFILE_IMG }/${ NEWSFEED_POST.userPicturePath }` }
                        header={ `${ NEWSFEED_POST.firstName } ${ NEWSFEED_POST.lastName }` }
                    />
                )
            ) }
        </section>
    )
}