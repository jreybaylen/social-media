import { useOutletContext } from 'react-router-dom'

import { Ads } from './Ads'
import { Profile } from './Profile'
import { NewsFeed } from './NewsFeed'

export function HomePage (): JSX.Element {
    const outletContext = useOutletContext()

    return (
        <div
            className="flex flex-row mb-5 mt-[95px]"
        >
            <Profile />
            <NewsFeed />
            <Ads />
        </div>
    )
}