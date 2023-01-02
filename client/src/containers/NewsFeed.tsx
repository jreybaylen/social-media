import { useAuth } from '@hooks/auth'
import { useEffect, useState } from 'react'

import { Card } from './Card'
import { ImageCircle } from './ImageCircle'
import FormTextArea from '@components/TextArea'

type NewsFeedPost = {
    _id: string
    lastName: string
    location: string
    firstName: string
    description: string
    picturePath: string
    occupation: string
}

export function NewsFeed (): JSX.Element {
    const { AUTH_USER } = useAuth()
    const [ NEWSFEED_POSTS, setNewsFeedPosts ] = useState<Array<NewsFeedPost>>([])
    const handlePostSubmit = () => {
        alert(123)
    }

    useEffect(() => {
        setNewsFeedPosts([
            {
                _id: '123123123',
                firstName: 'John',
                lastName: 'Doe',
                description: 'This is a test',
                picturePath: 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png',
                location: 'San Fran, CA',
                occupation: 'Software Engineer'
            }
        ])
    }, [])

    return (
        <section
            className="mx-2 w-[50%]"
        >
            <form
                onSubmit={ handlePostSubmit }
                className="flex flex-row mb-3"
            >
                <ImageCircle
                    src={ `${ import.meta.env.VITE_API_URL }/public/images/${ AUTH_USER.user._doc.picturePath }` }
                />
                <FormTextArea
                    testId="newsfeed-input"
                    inputId="newsfeed-input"
                    placeholder="What's on your mind?"
                    className="resize-none mt-0 block flex-1"
                />
            </form>
            { NEWSFEED_POSTS.map(
                (NEWSFEED_POST: NewsFeedPost) => (
                    <Card
                        key={ NEWSFEED_POST._id }
                        profile={ NEWSFEED_POST.picturePath }
                        content={ NEWSFEED_POST.description }
                        subHeader={ NEWSFEED_POST.occupation }
                        header={ `${ NEWSFEED_POST.firstName } ${ NEWSFEED_POST.lastName }` }
                    />
                )
            ) }
        </section>
    )
}